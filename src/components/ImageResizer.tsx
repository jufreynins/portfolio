'use client';

import { useEffect } from 'react';
import { MAX_BATCH_SIZE, type ConversionStatus, type OutputFormat } from '@/lib/imageConvert/types';
import { dedupeFilename, formatBytes, percentSaved } from '@/lib/imageConvert/format';
import { checkDimensions, decodeImage, validateFile } from '@/lib/imageConvert/convert';
import {
  DEFAULT_PERCENTAGE,
  MAX_PERCENTAGE,
  MIN_PERCENTAGE,
  SOCIAL_PRESETS,
  renderCroppedResize,
  renderPercentageResize,
  type AnchorPosition,
  type ResizeMode,
} from '@/lib/imageResize/utils';

const CONCURRENCY = 2;

interface ResizeItem {
  id: string;
  file: File;
  originalUrl: string;
  originalName: string;
  originalType: string;
  originalSize: number;
  sourceWidth: number;
  sourceHeight: number;
  outputWidth: number | null;
  outputHeight: number | null;
  status: ConversionStatus;
  outputFormat: OutputFormat;
  outputName: string;
  convertedBlob: Blob | null;
  convertedSize: number | null;
  errorMessage: string | null;
}

function detectedTypeToFormat(detectedType: string | undefined, ext: string): OutputFormat {
  const type = detectedType ?? (ext === '.png' ? 'PNG' : ext === '.webp' ? 'WEBP' : 'JPG');
  if (type === 'PNG') return 'png';
  if (type === 'WEBP') return 'webp';
  return 'jpeg';
}

interface ImageResizerProps {
  defaultMode?: ResizeMode;
}

export default function ImageResizer({ defaultMode = 'custom' }: ImageResizerProps) {
  useEffect(() => {
    let items: ResizeItem[] = [];
    const usedOutputNames = new Set<string>();
    const queue: string[] = [];
    let activeCount = 0;

    let mode: ResizeMode = defaultMode;
    let customWidth = 1200;
    let customHeight = 630;
    let aspectLocked = false;
    let aspectRatio = customWidth / customHeight;
    let percentage = DEFAULT_PERCENTAGE;
    let anchor: AnchorPosition = 'center';
    let selectedPresetIndex = 0;

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

    // --- DOM refs ---
    const dropzone = document.querySelector<HTMLElement>('[data-dropzone]');
    const fileInput = document.querySelector<HTMLInputElement>('[data-file-input]');
    const browseBtn = document.querySelector<HTMLButtonElement>('[data-browse-btn]');
    const modeButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-mode-btn]'));
    const modePanels = Array.from(document.querySelectorAll<HTMLElement>('[data-mode-panel]'));
    const widthInput = document.querySelector<HTMLInputElement>('[data-width-input]');
    const heightInput = document.querySelector<HTMLInputElement>('[data-height-input]');
    const aspectLockBtn = document.querySelector<HTMLButtonElement>('[data-aspect-lock-btn]');
    const percentageSlider = document.querySelector<HTMLInputElement>('[data-percentage-slider]');
    const percentageValueEl = document.querySelector<HTMLElement>('[data-percentage-value]');
    const presetSelect = document.querySelector<HTMLSelectElement>('[data-preset-select]');
    const anchorWrapper = document.querySelector<HTMLElement>('[data-anchor-wrapper]');
    const anchorButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-anchor-btn]'));
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
    const liveRegion = document.querySelector<HTMLElement>('[data-live-region]');

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

    function getPresetDimensions(): { width: number; height: number } {
      const preset = SOCIAL_PRESETS[selectedPresetIndex] ?? SOCIAL_PRESETS[0];
      return { width: preset.width, height: preset.height };
    }

    function renderItemHTML(item: ResizeItem): string {
      const name = escapeHtml(item.originalName);
      const sourceDims = item.sourceWidth && item.sourceHeight ? `${item.sourceWidth}×${item.sourceHeight}px` : 'Reading…';
      const outputDims = item.outputWidth && item.outputHeight ? `${item.outputWidth}×${item.outputHeight}px` : '';
      const metaLine = `${item.originalType} · ${sourceDims}${outputDims ? ` &rarr; ${outputDims}` : ''} · ${formatBytes(item.originalSize)}`;

      let statusHtml = '';
      let canDownload = false;

      if (item.status === 'queued') {
        statusHtml = `<p class="mt-2 flex items-center gap-1.5 text-xs font-medium" style="color: var(--text-secondary)">Queued</p>`;
      } else if (item.status === 'processing') {
        statusHtml = `<p class="mt-2 flex items-center gap-1.5 text-xs font-medium" style="color: var(--brand-primary)"><span class="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true"></span> Resizing…</p>`;
      } else if (item.status === 'completed' && item.convertedSize != null) {
        canDownload = true;
        const saved = percentSaved(item.originalSize, item.convertedSize);
        statusHtml =
          saved >= 0
            ? `<p class="mt-2 text-xs font-semibold" style="color:var(--color-success)">Completed — ${formatBytes(item.convertedSize)} · ${saved.toFixed(0)}% smaller</p>`
            : `<p class="mt-2 text-xs font-semibold" style="color:var(--color-warning)">Completed — ${formatBytes(item.convertedSize)} (${Math.abs(saved).toFixed(0)}% larger)</p>`;
      } else if (item.status === 'failed') {
        statusHtml = `<p class="mt-2 text-xs font-semibold" style="color:var(--color-error)">${escapeHtml(item.errorMessage ?? 'Resize failed.')}</p>`;
      }

      return `
        <li class="flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5" style="border-color: var(--border-color); background: var(--surface-white);" data-item-id="${item.id}">
          <img src="${item.originalUrl}" alt="" loading="lazy" class="h-20 w-20 flex-shrink-0 rounded-xl object-cover" style="background: var(--brand-lavender);" />
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
              style="background: var(--brand-primary);"
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
        savedEl.style.color = totalSaved >= 0 ? 'var(--brand-primary)' : 'var(--color-warning)';
      }
    }

    function updateActionButtons() {
      const completedCount = items.filter((i) => i.status === 'completed').length;
      downloadAllBtn?.classList.toggle('hidden', completedCount < 2);
      downloadAllBtn?.classList.toggle('inline-flex', completedCount >= 2);
      clearAllBtn?.classList.toggle('hidden', items.length === 0);
      clearAllBtn?.classList.toggle('inline-flex', items.length > 0);
    }

    function render() {
      renderList();
      renderSummary();
      updateActionButtons();
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

    async function processItem(item: ResizeItem) {
      item.status = 'processing';
      render();
      try {
        const decoded = await decodeImage(item.file);
        const dimCheck = checkDimensions(decoded.width, decoded.height);
        if (!dimCheck.valid) {
          if (decoded.isBitmap) (decoded.source as ImageBitmap).close();
          throw new Error(dimCheck.reason);
        }

        item.sourceWidth = decoded.width;
        item.sourceHeight = decoded.height;

        let blob: Blob;
        let outW: number;
        let outH: number;

        if (mode === 'percentage') {
          blob = await renderPercentageResize(decoded.source, decoded.width, decoded.height, percentage, item.outputFormat, 0.9);
          outW = Math.max(1, Math.round((decoded.width * percentage) / 100));
          outH = Math.max(1, Math.round((decoded.height * percentage) / 100));
        } else {
          const target = mode === 'preset' ? getPresetDimensions() : { width: customWidth, height: customHeight };
          blob = await renderCroppedResize(decoded.source, decoded.width, decoded.height, target.width, target.height, anchor, item.outputFormat, 0.9);
          outW = target.width;
          outH = target.height;
        }

        if (decoded.isBitmap) (decoded.source as ImageBitmap).close();

        item.convertedBlob = blob;
        item.convertedSize = blob.size;
        item.outputWidth = outW;
        item.outputHeight = outH;
        item.status = 'completed';
        announce(`${item.originalName} resized successfully.`);
      } catch (err) {
        item.status = 'failed';
        item.convertedBlob = null;
        item.convertedSize = null;
        item.errorMessage = err instanceof Error ? err.message : 'This image could not be resized.';
        announce(`${item.originalName} failed to resize.`);
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
      const outputName = dedupeFilename(file.name, usedOutputNames);

      const item: ResizeItem = {
        id,
        file,
        originalUrl,
        originalName: file.name,
        originalType,
        originalSize: file.size,
        sourceWidth: 0,
        sourceHeight: 0,
        outputWidth: null,
        outputHeight: null,
        status: 'queued',
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
        triggerDownload(blob, 'resized-images.zip');
        announce('ZIP download started.');
      } catch {
        showGlobalError('Could not generate the ZIP file. Please try downloading images individually.');
      } finally {
        downloadAllBtn.disabled = false;
        downloadAllBtn.textContent = originalLabel;
      }
    }

    function reprocessAll() {
      for (const item of items) {
        if (item.status === 'removed') continue;
        item.status = 'queued';
        enqueueProcessing(item.id);
      }
      render();
    }

    const debouncedReprocess = debounce(() => reprocessAll(), 400);
    function triggerReprocess() {
      if (items.length) debouncedReprocess();
    }

    // --- Mode switching ---
    function setMode(next: ResizeMode) {
      mode = next;
      modeButtons.forEach((btn) => {
        const isActive = btn.dataset.mode === mode;
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        btn.style.background = isActive ? 'var(--brand-primary)' : '';
        btn.style.color = isActive ? '#ffffff' : '';
      });
      modePanels.forEach((panel) => {
        panel.classList.toggle('hidden', panel.dataset.modePanel !== mode);
      });
      anchorWrapper?.classList.toggle('hidden', mode === 'percentage');
      triggerReprocess();
    }

    modeButtons.forEach((btn) => {
      btn.addEventListener(
        'click',
        () => {
          const next = btn.dataset.mode as ResizeMode | undefined;
          if (next) setMode(next);
        },
        { signal }
      );
    });

    // --- Custom size inputs ---
    function updateAspectIcon() {
      if (!aspectLockBtn) return;
      aspectLockBtn.setAttribute('aria-pressed', aspectLocked ? 'true' : 'false');
      aspectLockBtn.style.background = aspectLocked ? 'var(--brand-lavender)' : '';
      aspectLockBtn.style.color = aspectLocked ? 'var(--brand-primary)' : '';
    }

    aspectLockBtn?.addEventListener(
      'click',
      () => {
        aspectLocked = !aspectLocked;
        if (aspectLocked) aspectRatio = customWidth / customHeight;
        updateAspectIcon();
      },
      { signal }
    );

    widthInput?.addEventListener(
      'input',
      () => {
        const value = Math.max(1, Math.round(Number(widthInput.value) || 1));
        customWidth = value;
        if (aspectLocked) {
          customHeight = Math.max(1, Math.round(value / aspectRatio));
          if (heightInput) heightInput.value = String(customHeight);
        } else {
          aspectRatio = customWidth / customHeight;
        }
        triggerReprocess();
      },
      { signal }
    );

    heightInput?.addEventListener(
      'input',
      () => {
        const value = Math.max(1, Math.round(Number(heightInput.value) || 1));
        customHeight = value;
        if (aspectLocked) {
          customWidth = Math.max(1, Math.round(value * aspectRatio));
          if (widthInput) widthInput.value = String(customWidth);
        } else {
          aspectRatio = customWidth / customHeight;
        }
        triggerReprocess();
      },
      { signal }
    );

    // --- Percentage ---
    percentageSlider?.addEventListener(
      'input',
      () => {
        percentage = Math.min(MAX_PERCENTAGE, Math.max(MIN_PERCENTAGE, Number(percentageSlider.value)));
        if (percentageValueEl) percentageValueEl.textContent = `${percentage}%`;
        triggerReprocess();
      },
      { signal }
    );

    // --- Preset select ---
    presetSelect?.addEventListener(
      'change',
      () => {
        selectedPresetIndex = Number(presetSelect.value) || 0;
        triggerReprocess();
      },
      { signal }
    );

    // --- Anchor grid ---
    function updateAnchorButtons() {
      anchorButtons.forEach((btn) => {
        const isActive = btn.dataset.anchor === anchor;
        btn.style.borderColor = isActive ? 'var(--brand-primary)' : 'var(--border-color)';
        btn.style.background = isActive ? 'var(--brand-lavender)' : '';
        const dot = btn.querySelector<HTMLElement>('[data-anchor-dot]');
        if (dot) dot.style.background = isActive ? 'var(--brand-primary)' : 'var(--text-muted)';
      });
    }

    anchorButtons.forEach((btn) => {
      btn.addEventListener(
        'click',
        () => {
          const value = btn.dataset.anchor as AnchorPosition | undefined;
          if (!value) return;
          anchor = value;
          updateAnchorButtons();
          triggerReprocess();
        },
        { signal }
      );
    });

    // --- Upload wiring ---
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

    // --- Initial state ---
    setMode(mode);
    updateAspectIcon();
    updateAnchorButtons();
    if (widthInput) widthInput.value = String(customWidth);
    if (heightInput) heightInput.value = String(customHeight);
    if (percentageValueEl) percentageValueEl.textContent = `${percentage}%`;
    render();

    return () => {
      controller.abort();
      cleanupAllUrls();
    };
  }, [defaultMode]);

  return null;
}
