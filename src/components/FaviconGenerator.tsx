'use client';

import { useRef, useState } from 'react';
import { decodeImage } from '@/lib/imageConvert/convert';
import {
  ICO_SIZES,
  PNG_SIZES,
  buildHtmlSnippet,
  buildIco,
  renderSquarePng,
  triggerBlobDownload,
  validateSourceFile,
} from '@/lib/faviconGenerator/utils';

type Status = 'idle' | 'processing' | 'ready' | 'error';

interface GeneratedSet {
  previewUrl: string;
  bySize: Map<number, Blob>;
  urlBySize: Map<number, string>;
}

const secondaryActionClass =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50';
const primaryActionClass =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0';

const ALL_SIZES = [...ICO_SIZES, ...PNG_SIZES.map((p) => p.size)];

export default function FaviconGenerator() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [sourceName, setSourceName] = useState('');
  const [generated, setGenerated] = useState<GeneratedSet | null>(null);
  const [isZipping, setIsZipping] = useState(false);
  const [copied, setCopied] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function announce(message: string) {
    setAnnouncement(message);
  }

  async function handleFile(file: File) {
    const result = validateSourceFile(file);
    if (!result.valid) {
      setStatus('error');
      setErrorMessage(result.reason ?? 'This file could not be used.');
      announce(result.reason ?? 'This file could not be used.');
      return;
    }

    setStatus('processing');
    setErrorMessage('');
    setSourceName(file.name);
    announce('Generating favicon set…');

    try {
      const decoded = await decodeImage(file);
      const bySize = new Map<number, Blob>();

      for (const size of ALL_SIZES) {
        const blob = await renderSquarePng(decoded.source, decoded.width, decoded.height, size);
        bySize.set(size, blob);
      }
      if (decoded.isBitmap) (decoded.source as ImageBitmap).close();

      const previewBlob = bySize.get(192);
      const previewUrl = previewBlob ? URL.createObjectURL(previewBlob) : '';
      const urlBySize = new Map<number, string>();
      for (const [size, blob] of bySize) {
        urlBySize.set(size, URL.createObjectURL(blob));
      }

      setGenerated((prev) => {
        if (prev?.previewUrl) URL.revokeObjectURL(prev.previewUrl);
        if (prev?.urlBySize) prev.urlBySize.forEach((url) => URL.revokeObjectURL(url));
        return { previewUrl, bySize, urlBySize };
      });
      setStatus('ready');
      announce('Favicon set generated.');
    } catch (err) {
      setStatus('error');
      const message = err instanceof Error ? err.message : 'This image could not be processed.';
      setErrorMessage(message);
      announce(message);
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  }

  function reset() {
    setGenerated((prev) => {
      if (prev?.previewUrl) URL.revokeObjectURL(prev.previewUrl);
      if (prev?.urlBySize) prev.urlBySize.forEach((url) => URL.revokeObjectURL(url));
      return null;
    });
    setStatus('idle');
    setErrorMessage('');
    setSourceName('');
    announce('Cleared.');
  }

  function downloadSingle(size: number) {
    const blob = generated?.bySize.get(size);
    if (!blob) return;
    const preset = PNG_SIZES.find((p) => p.size === size);
    triggerBlobDownload(blob, preset ? preset.filename : `icon-${size}.png`);
  }

  async function downloadZip() {
    if (!generated || isZipping) return;
    setIsZipping(true);
    try {
      const icoImages = ICO_SIZES.map((size) => ({ size, blob: generated.bySize.get(size)! })).filter((img) => img.blob);
      const icoBlob = await buildIco(icoImages);

      const { default: JSZip } = await import('jszip');
      const zip = new JSZip();
      zip.file('favicon.ico', icoBlob);
      for (const preset of PNG_SIZES) {
        const blob = generated.bySize.get(preset.size);
        if (blob) zip.file(preset.filename, blob);
      }
      zip.file('favicon-html-tags.txt', buildHtmlSnippet());

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      triggerBlobDownload(zipBlob, 'favicon-set.zip');
      announce('ZIP download started.');
    } catch {
      setErrorMessage('Could not generate the ZIP file. Try downloading sizes individually instead.');
      announce('Could not generate the ZIP file.');
    } finally {
      setIsZipping(false);
    }
  }

  async function copyHtmlSnippet() {
    const snippet = buildHtmlSnippet();
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(snippet);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = snippet;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }
      setCopied(true);
      announce('HTML tags copied to clipboard.');
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      announce('Could not copy automatically. Please select and copy the code manually.');
    }
  }

  const hasFiles = (e: React.DragEvent) => !!e.dataTransfer?.types?.includes('Files');

  return (
    <div className="flex flex-col gap-8">
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
        {/* Left column: results — preview, size grid, HTML tags */}
        <div className="order-2 flex flex-col gap-6 lg:order-1">
          {status === 'idle' && (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed py-12 text-center" style={{ borderColor: 'var(--border-color)' }}>
              <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                Your favicon set will appear here.
              </p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Add a square-ish JPG, PNG, WebP, or SVG on the right to get started.
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="rounded-xl border px-4 py-3 text-sm font-medium" style={{ borderColor: 'color-mix(in srgb, var(--color-error) 30%, white)', background: 'var(--color-error-soft)', color: 'var(--color-error)' }} role="alert">
              {errorMessage}
            </div>
          )}

          {status === 'processing' && (
            <div className="flex items-center gap-2 rounded-2xl border p-6 text-sm font-medium" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
              Generating favicon set…
            </div>
          )}

          {status === 'ready' && generated && (
            <>
              {/* Browser tab mockup */}
              <div className="rounded-2xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)' }}>
                <span className="mb-3 block text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                  Browser tab preview
                </span>
                <div className="inline-flex max-w-[240px] items-center gap-2 rounded-t-lg border border-b-0 px-3 py-2" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- runtime-generated blob URL, not a static asset next/image can optimize */}
                  <img src={generated.previewUrl} alt="" width={16} height={16} className="h-4 w-4 flex-shrink-0 rounded-sm" />
                  <span className="truncate text-xs" style={{ color: 'var(--text-primary)' }}>
                    {sourceName || 'Your Page Title'}
                  </span>
                </div>
                <div className="h-1 rounded-b-lg" style={{ background: 'var(--border-color)' }} />
              </div>

              {/* Size grid */}
              <div className="rounded-2xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)' }}>
                <span className="mb-4 block text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                  Generated sizes
                </span>
                <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
                  {ALL_SIZES.map((size) => {
                    const url = generated.urlBySize.get(size) ?? '';
                    return (
                      <div key={size} className="flex flex-col items-center gap-2">
                        <div className="gradient-checkerboard flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg border" style={{ borderColor: 'var(--border-color)' }}>
                          {url && (
                            // eslint-disable-next-line @next/next/no-img-element -- runtime-generated blob URL, not a static asset next/image can optimize
                            <img src={url} alt={`${size}×${size} favicon preview`} width={size > 56 ? 56 : size} height={size > 56 ? 56 : size} className="max-h-full max-w-full" />
                          )}
                        </div>
                        <span className="text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                          {size}px
                        </span>
                        <button
                          type="button"
                          onClick={() => downloadSingle(size)}
                          aria-label={`Download ${size}x${size} PNG`}
                          title={`Download ${size}×${size} PNG`}
                          className="flex h-7 w-7 items-center justify-center rounded-full border transition-colors"
                          style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* HTML tags */}
              <div className="flex flex-col gap-3">
                <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                  HTML tags
                </h2>
                <div className="relative overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--border-color)', background: 'var(--brand-ink)' }}>
                  <pre className="overflow-x-auto p-4 pr-32 text-xs leading-relaxed sm:text-sm">
                    <code style={{ color: '#e5e7eb', fontFamily: 'var(--font-mono)' }}>{buildHtmlSnippet()}</code>
                  </pre>
                  <button
                    type="button"
                    onClick={copyHtmlSnippet}
                    className="absolute right-3 top-3 inline-flex min-h-[36px] items-center justify-center rounded-full px-4 text-xs font-bold text-white transition-all duration-200"
                    style={{ background: copied ? 'var(--color-success)' : 'var(--brand-primary)' }}
                  >
                    {copied ? 'Copied!' : 'Copy Tags'}
                  </button>
                </div>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Upload the files from the ZIP to your site&apos;s root folder, then paste these tags into your <code>&lt;head&gt;</code>.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Right column: controls */}
        <div className="order-1 flex flex-col gap-6 lg:order-2 lg:sticky lg:top-28">
          <div
            className="webp-dropzone flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed p-8 text-center transition-colors duration-200 sm:p-10"
            style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}
            onDragOver={(e) => {
              e.preventDefault();
              if (hasFiles(e)) e.currentTarget.classList.add('is-dragover');
            }}
            onDragLeave={(e) => e.currentTarget.classList.remove('is-dragover')}
            onDrop={(e) => {
              e.preventDefault();
              e.currentTarget.classList.remove('is-dragover');
              const file = e.dataTransfer.files?.[0];
              if (file) handleFile(file);
            }}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full" style={{ background: 'var(--brand-lavender)', color: 'var(--brand-primary)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </span>

            <div className="flex flex-col gap-1">
              <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                Drag and drop an image here
              </p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                or use the button below to browse your files
              </p>
            </div>

            <label className="sr-only" htmlFor="favicon-file-input">
              Choose a source image for your favicon set
            </label>
            <input
              id="favicon-file-input"
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/svg+xml,.jpg,.jpeg,.png,.webp,.svg"
              className="sr-only"
              onChange={onInputChange}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'var(--brand-primary)' }}
            >
              Browse image
            </button>

            <div className="flex flex-col items-center gap-1 pt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <p>Accepted formats: JPG, PNG, WebP, SVG</p>
              <p>Maximum file size: 10 MB &bull; A square source image works best</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={downloadZip} disabled={status !== 'ready' || isZipping} className={primaryActionClass}>
              {isZipping ? 'Preparing ZIP…' : 'Download All as ZIP'}
            </button>
            <button type="button" onClick={reset} disabled={status === 'idle'} className={secondaryActionClass} style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
              Clear
            </button>
          </div>

          <div className="rounded-2xl border p-5 text-sm leading-relaxed sm:p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)', color: 'var(--text-secondary)' }}>
            <p>
              <strong style={{ color: 'var(--text-primary)' }}>What you get:</strong> a real multi-resolution <code>favicon.ico</code> (16, 32, and 48px), plus separate 180, 192, and 512px PNGs for
              Apple touch icons and Android / PWA use. Non-square images are automatically center-cropped.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
