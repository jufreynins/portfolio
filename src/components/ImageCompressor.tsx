'use client';

import { useEffect } from 'react';
import { DEFAULT_QUALITY, MAX_BATCH_SIZE, type ImageItem, type OutputFormat } from '@/lib/imageConvert/types';
import { dedupeFilename, formatBytes, percentSaved, qualityLabel, toOutputFilename } from '@/lib/imageConvert/format';
import { checkDimensions, checkFormatSupport, convertToFormat, decodeImage, validateFile } from '@/lib/imageConvert/convert';

const CONCURRENCY = 2;

function detectedTypeToFormat(detectedType: string | undefined, ext: string): OutputFormat {
  const type = detectedType ?? (ext === '.png' ? 'PNG' : ext === '.webp' ? 'WEBP' : 'JPG');
  if (type === 'PNG') return 'png';
  if (type === 'WEBP') return 'webp';
  return 'jpeg';
}

export default function ImageCompressor() {
  useEffect(() => {
    let items: ImageItem[] = [];
    const usedOutputNames = new Set<string>();
    let currentQuality = DEFAULT_QUALITY;
    const queue: string[] = [];
    let activeCount = 0;
    let previewUrl: string | null = null;
    let previewForId: string | null = null;

    const controller = new AbortController();
    const { signal } = controller;

    function escapeHtml(value: string): string {
      return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): T {
      let timer: ReturnType<typeof setTimeout>;
      return ((...args: never[]) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
      }) as T;
    }

    function cleanupAllUrls() {
      for (const item of items) {
        if (item.originalUrl) URL.revokeObjectURL(item.originalUrl);
      }
    }

    function triggerDownload(blob: Blob, filename: string) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.rel = 'noopener';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    }

    const dropzone = document.querySelector<HTMLElement>('[data-dropzone]');
    const fileInput = document.querySelector<HTMLInputElement>('[data-file-input]');
    const browseBtn = document.querySelector<HTMLButtonElement>('[data-browse-btn]');
    const qualitySlider = document.querySelector<HTMLInputElement>('[data-quality-slider]');
    const qualityValueEl = document.querySelector<HTMLElement>('[data-quality-value]');
    const qualityLabelEl = document.querySelector<HTMLElement>('[data-quality-label]');
    const listEl = document.querySelector<HTMLElement>('[data-list]');
    const emptyStateEl = document.querySelector<HTMLElement>('[data-empty-state]');
    const summaryEl = document.querySelector<HTMLElement>('[data-summary]');
    const countEl = document.querySelector<HTMLElement>('[data-summary-count]');
    const convertedCountEl = document.querySelector<HTMLElement>('[data-summary-converted]');
    const originalSizeEl = document.querySelector<HTMLElement>('[data-summary-original-size]');
    const convertedSizeEl = document.querySelector<HTMLElement>('[data-summary-converted-size]');
    const savedEl = document.querySelector<HTMLElement>('[data-summary-saved]');
    const downloadAllBtn = document.querySelector<HTMLButtonElement>('[data-download-all-btn]');
    const clearAllBtn = document.querySelector<HTMLButtonElement>('[data-clear-all-btn]');
    const errorBannerEl = document.querySelector<HTMLElement>('[data-error-banner]');
    const unsupportedBannerEl = document.querySelector<HTMLElement>('[data-unsupported-banner]');
    const liveRegion = document.querySelector<HTMLElement>('[data-live-region]');
    const previewEmptyEl = document.querySelector<HTMLElement>('[data-preview-empty]');
    const previewContentEl = document.querySelector<HTMLElement>('[data-preview-content]');
    const previewOriginalImgEl = document.querySelector<HTMLImageElement>('[data-preview-original-img]');
    const previewOriginalLabelEl = document.querySelector<HTMLElement>('[data-preview-original-label]');
    const previewConvertedImgEl = document.querySelector<HTMLImageElement>('[data-preview-converted-img]');
    const previewConvertedPlaceholderEl = document.querySelector<HTMLElement>('[data-preview-converted-placeholder]');
    const previewConvertedLabelEl = document.querySelector<HTMLElement>('[data-preview-converted-label]');
    const previewSavedEl = document.querySelector<HTMLElement>('[data-preview-saved]');
    const previewMultiNoteEl = document.querySelector<HTMLElement>('[data-preview-multi-note]');

    if (!dropzone || !fileInput || !listEl) return;

    function announce(message: string) {
      if (liveRegion) liveRegion.textContent = message;
    }

    function showGlobalError(message: string) {
      if (errorBannerEl) {
        errorBannerEl.textContent = message;
        errorBannerEl.classList.remove('hidden');
      }
      announce(message);
    }

    function clearGlobalError() {
      errorBannerEl?.classList.add('hidden');
      if (errorBannerEl) errorBannerEl.textContent = '';
    }

    function renderItemHTML(item: ImageItem): string {
      const name = escapeHtml(item.originalName);
      const dims = item.width && item.height ? `${item.width}×${item.height}px` : 'Reading…';
      const qualityPart = item.outputFormat === 'png' ? 'lossless' : `${Math.round(item.quality * 100)}% quality`;
      const metaLine = `${item.originalType} · ${dims} · ${formatBytes(item.originalSize)} · ${qualityPart}`;

      let statusHtml = '';
      let canDownload = false;

      if (item.status === 'queued') {
        statusHtml = `<p class="mt-2 flex items-center gap-1.5 text-xs font-medium" style="color: var(--text-secondary)">Queued</p>`;
      } else if (item.status === 'processing') {
        statusHtml = `<p class="mt-2 flex items-center gap-1.5 text-xs font-medium" style="color: var(--tool-accent)"><span class="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true"></span> Compressing…</p>`;
      } else if (item.status === 'completed' && item.convertedSize != null) {
        canDownload = true;
        const saved = percentSaved(item.originalSize, item.convertedSize);
        if (saved >= 0) {
          statusHtml = `<p class="mt-2 text-xs font-semibold" style="color:var(--color-success)">Completed · ${formatBytes(item.convertedSize)} · Saved ${saved.toFixed(0)}%</p>`;
        } else {
          statusHtml = `<p class="mt-2 text-xs font-semibold" style="color:var(--color-warning)">File size increased by ${Math.abs(saved).toFixed(0)}%. Try a lower quality.</p>`;
        }
      } else if (item.status === 'failed') {
        statusHtml = `<p class="mt-2 text-xs font-semibold" style="color:var(--color-error)">${escapeHtml(item.errorMessage ?? 'Compression failed.')}</p>`;
      }

      return `
        <li class="flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5" style="border-color: var(--border-color); background: var(--surface-white);" data-item-id="${item.id}">
          <img src="${item.originalUrl}" alt="" loading="lazy" class="h-20 w-20 flex-shrink-0 rounded-xl object-cover" style="background: var(--tool-accent-soft);" />
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-semibold" style="color: var(--text-primary);" title="${name}">${name}</p>
            <p class="mt-0.5 text-xs" style="color: var(--text-secondary);">${metaLine}</p>
            ${statusHtml}
          </div>
          <div class="flex flex-shrink-0 items-center gap-2">
            <button
              type="button"
              data-action="download"
              data-id="${item.id}"
              ${canDownload ? '' : 'disabled'}
              class="inline-flex min-h-[40px] items-center justify-center rounded-full px-4 py-2 text-xs font-bold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40"
              style="background: var(--tool-accent);"
            >
              Download
            </button>
            <button
              type="button"
              data-action="remove"
              data-id="${item.id}"
              aria-label="Remove ${name}"
              class="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border transition-colors"
              style="border-color: var(--border-color); color: var(--text-secondary);"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </li>
      `;
    }

    function renderList() {
      if (!items.length) {
        listEl!.innerHTML = '';
        listEl!.classList.add('hidden');
        listEl!.classList.remove('flex');
        emptyStateEl?.classList.remove('hidden');
        return;
      }
      emptyStateEl?.classList.add('hidden');
      listEl!.classList.remove('hidden');
      listEl!.classList.add('flex');
      listEl!.innerHTML = items.map(renderItemHTML).join('');
    }

    function renderSummary() {
      if (!summaryEl) return;
      if (!items.length) {
        summaryEl.classList.add('hidden');
        summaryEl.classList.remove('grid');
        return;
      }
      summaryEl.classList.remove('hidden');
      summaryEl.classList.add('grid');

      const completed = items.filter((i) => i.status === 'completed' && i.convertedSize != null);
      const totalOriginal = completed.reduce((sum, i) => sum + i.originalSize, 0);
      const totalConverted = completed.reduce((sum, i) => sum + (i.convertedSize ?? 0), 0);

      if (countEl) countEl.textContent = String(items.length);
      if (convertedCountEl) convertedCountEl.textContent = String(completed.length);

      if (!completed.length) {
        if (originalSizeEl) originalSizeEl.textContent = '—';
        if (convertedSizeEl) convertedSizeEl.textContent = '—';
        if (savedEl) savedEl.textContent = '—';
        return;
      }

      const totalSaved = percentSaved(totalOriginal, totalConverted);
      if (originalSizeEl) originalSizeEl.textContent = formatBytes(totalOriginal);
      if (convertedSizeEl) convertedSizeEl.textContent = formatBytes(totalConverted);
      if (savedEl) {
        savedEl.textContent = totalSaved >= 0 ? `${totalSaved.toFixed(0)}% saved` : `${Math.abs(totalSaved).toFixed(0)}% larger`;
        savedEl.style.color = totalSaved >= 0 ? 'var(--tool-accent)' : 'var(--color-warning)';
      }
    }

    function updateActionButtons() {
      const completedCount = items.filter((i) => i.status === 'completed').length;
      downloadAllBtn?.classList.toggle('hidden', completedCount < 2);
      downloadAllBtn?.classList.toggle('inline-flex', completedCount >= 2);
      clearAllBtn?.classList.toggle('hidden', items.length === 0);
      clearAllBtn?.classList.toggle('inline-flex', items.length > 0);
    }

    function renderPreview() {
      if (!previewEmptyEl || !previewContentEl) return;
      const first = items[0];

      if (!first) {
        previewContentEl.classList.add('hidden');
        previewContentEl.classList.remove('flex');
        previewEmptyEl.classList.remove('hidden');
        previewEmptyEl.classList.add('flex');
        return;
      }

      previewEmptyEl.classList.add('hidden');
      previewEmptyEl.classList.remove('flex');
      previewContentEl.classList.remove('hidden');
      previewContentEl.classList.add('flex');

      if (previewOriginalImgEl) previewOriginalImgEl.src = first.originalUrl;
      const originalDims = first.width && first.height ? `${first.width}×${first.height}px` : 'Reading…';
      if (previewOriginalLabelEl) previewOriginalLabelEl.textContent = `${first.originalType} · ${originalDims} · ${formatBytes(first.originalSize)}`;

      if (first.status === 'completed' && first.convertedBlob) {
        if (previewForId !== first.id || !previewUrl) {
          if (previewUrl) URL.revokeObjectURL(previewUrl);
          previewUrl = URL.createObjectURL(first.convertedBlob);
          previewForId = first.id;
        }
        if (previewConvertedImgEl) {
          previewConvertedImgEl.src = previewUrl;
          previewConvertedImgEl.classList.remove('hidden');
        }
        previewConvertedPlaceholderEl?.classList.add('hidden');

        const saved = percentSaved(first.originalSize, first.convertedSize ?? first.originalSize);
        if (previewConvertedLabelEl) previewConvertedLabelEl.textContent = `${formatBytes(first.convertedSize ?? 0)}`;
        if (previewSavedEl) {
          previewSavedEl.textContent = saved >= 0 ? `${saved.toFixed(0)}% smaller` : `${Math.abs(saved).toFixed(0)}% larger`;
          previewSavedEl.style.color = saved >= 0 ? 'var(--color-success)' : 'var(--color-warning)';
        }
      } else {
        previewConvertedImgEl?.classList.add('hidden');
        previewConvertedPlaceholderEl?.classList.remove('hidden');
        if (previewConvertedPlaceholderEl) {
          previewConvertedPlaceholderEl.textContent = first.status === 'processing' ? 'Compressing…' : first.status === 'failed' ? 'Failed' : 'Queued…';
        }
        if (previewSavedEl) previewSavedEl.textContent = '';
      }

      if (previewMultiNoteEl) {
        previewMultiNoteEl.textContent = items.length > 1 ? `Showing 1 of ${items.length} images. See the full list on the right.` : '';
      }
    }

    function render() {
      renderList();
      renderSummary();
      updateActionButtons();
      renderPreview();
    }

    function pump() {
      while (activeCount < CONCURRENCY && queue.length > 0) {
        const id = queue.shift();
        if (!id) continue;
        const item = items.find((i) => i.id === id);
        if (!item || item.status === 'removed' || item.status === 'processing') continue;

        activeCount++;
        processItem(item)
          .catch(() => {})
          .finally(() => {
            activeCount--;
            pump();
          });
      }
    }

    async function processItem(item: ImageItem) {
      item.status = 'processing';
      render();
      try {
        const decoded = await decodeImage(item.file);
        const dimCheck = checkDimensions(decoded.width, decoded.height);
        if (!dimCheck.valid) {
          if (decoded.isBitmap) (decoded.source as ImageBitmap).close();
          throw new Error(dimCheck.reason);
        }

        item.width = decoded.width;
        item.height = decoded.height;

        const blob = await convertToFormat(decoded.source, decoded.width, decoded.height, item.quality, item.outputFormat);
        if (decoded.isBitmap) (decoded.source as ImageBitmap).close();

        item.convertedBlob = blob;
        item.convertedSize = blob.size;
        item.status = 'completed';
        announce(`${item.originalName} compressed successfully.`);
      } catch (err) {
        item.status = 'failed';
        item.convertedBlob = null;
        item.convertedSize = null;
        item.errorMessage = err instanceof Error ? err.message : 'This image could not be compressed.';
        announce(`${item.originalName} failed to compress.`);
      }
      render();
    }

    function enqueueProcessing(id: string) {
      if (!queue.includes(id)) queue.push(id);
      pump();
    }

    function addItem(file: File, detectedType?: string) {
      const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      const originalUrl = URL.createObjectURL(file);
      const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();
      const originalType = detectedType ?? (ext === '.png' ? 'PNG' : ext === '.webp' ? 'WEBP' : 'JPG');
      const outputFormat = detectedTypeToFormat(detectedType, ext);
      const outputName = dedupeFilename(toOutputFilename(file.name, outputFormat), usedOutputNames);

      const item: ImageItem = {
        id,
        file,
        originalUrl,
        originalName: file.name,
        originalType,
        originalSize: file.size,
        width: 0,
        height: 0,
        status: 'queued',
        quality: currentQuality,
        outputFormat,
        outputName,
        convertedBlob: null,
        convertedSize: null,
        errorMessage: null,
      };

      items.push(item);
      announce(`${file.name} added to the queue.`);
      enqueueProcessing(id);
    }

    async function handleFiles(fileList: FileList | File[]) {
      const incoming = Array.from(fileList);
      if (!incoming.length) return;

      clearGlobalError();

      const currentCount = items.filter((i) => i.status !== 'removed').length;
      const availableSlots = MAX_BATCH_SIZE - currentCount;

      if (availableSlots <= 0) {
        showGlobalError(`You can only add up to ${MAX_BATCH_SIZE} images per batch.`);
        return;
      }

      const filesToAdd = incoming.slice(0, availableSlots);
      const rejectedForBatch = incoming.length - filesToAdd.length;
      const errors: string[] = [];

      for (const file of filesToAdd) {
        const result = await validateFile(file);
        if (!result.valid) {
          errors.push(result.reason ?? `"${file.name}" could not be added.`);
          continue;
        }
        addItem(file, result.detectedType);
      }

      if (rejectedForBatch > 0) {
        errors.push(`Only ${MAX_BATCH_SIZE} images are allowed per batch. ${rejectedForBatch} file${rejectedForBatch === 1 ? '' : 's'} ${rejectedForBatch === 1 ? 'was' : 'were'} not added.`);
      }

      if (errors.length) showGlobalError(errors.join(' '));

      render();
    }

    function removeItem(id: string) {
      const idx = items.findIndex((i) => i.id === id);
      if (idx === -1) return;
      const [item] = items.splice(idx, 1);
      item.status = 'removed';
      if (item.originalUrl) URL.revokeObjectURL(item.originalUrl);
      usedOutputNames.delete(item.outputName);
      announce(`${item.originalName} removed.`);
      render();
    }

    function clearAll() {
      if (!items.length) return;
      const completedCount = items.filter((i) => i.status === 'completed').length;
      if (completedCount >= 3) {
        const confirmed = window.confirm(`Clear all ${items.length} images? This removes ${completedCount} compressed file${completedCount === 1 ? '' : 's'} from this session.`);
        if (!confirmed) return;
      }
      cleanupAllUrls();
      items = [];
      usedOutputNames.clear();
      announce('All images cleared.');
      render();
    }

    function downloadItem(id: string) {
      const item = items.find((i) => i.id === id);
      if (!item || !item.convertedBlob) return;
      triggerDownload(item.convertedBlob, item.outputName);
      announce(`Downloading ${item.outputName}.`);
    }

    async function downloadAllAsZip() {
      const completed = items.filter((i) => i.status === 'completed' && i.convertedBlob);
      if (completed.length < 2 || !downloadAllBtn) return;

      const originalLabel = downloadAllBtn.textContent;
      downloadAllBtn.disabled = true;
      downloadAllBtn.textContent = 'Preparing ZIP…';

      try {
        const { default: JSZip } = await import('jszip');
        const zip = new JSZip();
        for (const item of completed) {
          zip.file(item.outputName, item.convertedBlob as Blob);
        }
        const blob = await zip.generateAsync({ type: 'blob' });
        triggerDownload(blob, 'compressed-images.zip');
        announce('ZIP download started.');
      } catch {
        showGlobalError('Could not generate the ZIP file. Please try downloading images individually.');
      } finally {
        downloadAllBtn.disabled = false;
        downloadAllBtn.textContent = originalLabel;
      }
    }

    function updateQualityDisplay(percent: number) {
      if (qualityValueEl) qualityValueEl.textContent = `${percent}%`;
      if (qualityLabelEl) qualityLabelEl.textContent = qualityLabel(percent);
    }

    function reconvertAll() {
      for (const item of items) {
        if (item.status === 'removed') continue;
        item.quality = currentQuality;
        item.status = 'queued';
        enqueueProcessing(item.id);
      }
      render();
    }

    const debouncedReconvert = debounce(() => reconvertAll(), 400);

    // --- Wiring ---

    browseBtn?.addEventListener('click', () => fileInput.click(), { signal });

    fileInput.addEventListener(
      'change',
      () => {
        if (fileInput.files?.length) handleFiles(fileInput.files);
        fileInput.value = '';
      },
      { signal }
    );

    const hasFiles = (e: DragEvent) => !!e.dataTransfer?.types?.includes('Files');
    let dragCounter = 0;

    dropzone.addEventListener(
      'dragenter',
      (e) => {
        e.preventDefault();
        if (!hasFiles(e)) return;
        dragCounter++;
        dropzone.classList.add('is-dragover');
      },
      { signal }
    );
    dropzone.addEventListener('dragover', (e) => e.preventDefault(), { signal });
    dropzone.addEventListener(
      'dragleave',
      (e) => {
        e.preventDefault();
        dragCounter = Math.max(0, dragCounter - 1);
        if (dragCounter === 0) dropzone.classList.remove('is-dragover');
      },
      { signal }
    );
    dropzone.addEventListener(
      'drop',
      (e) => {
        e.preventDefault();
        dragCounter = 0;
        dropzone.classList.remove('is-dragover');
        const files = e.dataTransfer?.files;
        if (files?.length) handleFiles(files);
      },
      { signal }
    );

    window.addEventListener('dragover', (e) => hasFiles(e) && e.preventDefault(), { signal });
    window.addEventListener('drop', (e) => hasFiles(e) && e.preventDefault(), { signal });

    if (qualitySlider) {
      qualitySlider.addEventListener(
        'input',
        () => {
          const percent = Number(qualitySlider.value);
          currentQuality = percent / 100;
          updateQualityDisplay(percent);
          if (items.length) debouncedReconvert();
        },
        { signal }
      );
    }

    listEl.addEventListener(
      'click',
      (e) => {
        const target = (e.target as HTMLElement).closest<HTMLElement>('[data-action]');
        if (!target) return;
        const id = target.dataset.id;
        if (!id) return;
        if (target.dataset.action === 'download') downloadItem(id);
        if (target.dataset.action === 'remove') removeItem(id);
      },
      { signal }
    );

    clearAllBtn?.addEventListener('click', clearAll, { signal });
    downloadAllBtn?.addEventListener('click', downloadAllAsZip, { signal });

    checkFormatSupport('webp').then((supported) => {
      if (supported) return;
      unsupportedBannerEl?.classList.remove('hidden');
      announce('Your browser cannot re-encode WebP files. JPG and PNG files can still be compressed.');
    });

    updateQualityDisplay(Math.round(currentQuality * 100));
    render();

    return () => {
      controller.abort();
      cleanupAllUrls();
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, []);

  return null;
}
