'use client';

import { useEffect, useRef, useState } from 'react';
import { decodeImage } from '@/lib/imageConvert/convert';
import {
  ICO_SIZES,
  PNG_SIZES,
  buildHtmlSnippet,
  buildIco,
  renderSquarePng,
  triggerBlobDownload,
  validateSourceFile,
  type FitMode,
} from '@/lib/faviconGenerator/utils';

type Status = 'empty' | 'ready' | 'processing' | 'generated' | 'error';

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
const ROUNDED_SIZES = new Set<number>([192, 512]);
const BG_SWATCHES: Array<{ label: string; value: string | null }> = [
  { label: 'Transparent', value: null },
  { label: 'White', value: '#ffffff' },
  { label: 'Black', value: '#000000' },
];

function StepLabel({ n, children }: { n: number; children: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
        style={{ background: 'var(--tool-accent)' }}
        aria-hidden="true"
      >
        {n}
      </span>
      <span className="text-sm font-bold uppercase tracking-wide" style={{ color: 'var(--text-primary)' }}>
        {children}
      </span>
    </div>
  );
}

function SampleSizeGrid() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
        Upload a logo to preview every favicon size.
      </span>
      <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
        {ALL_SIZES.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <div
              className={`flex h-14 w-14 items-center justify-center border-2 border-dashed ${ROUNDED_SIZES.has(size) ? 'rounded-full' : 'rounded-lg'}`}
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
              aria-hidden="true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
            <span className="text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>
              {size}px
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FaviconGenerator() {
  const [status, setStatus] = useState<Status>('empty');
  const [errorMessage, setErrorMessage] = useState('');
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourceUrl, setSourceUrl] = useState('');
  const [fitMode, setFitMode] = useState<FitMode>('cover');
  const [bgColor, setBgColor] = useState<string | null>(null);
  const [customColorDraft, setCustomColorDraft] = useState('#ffffff');
  const [generated, setGenerated] = useState<GeneratedSet | null>(null);
  const [isZipping, setIsZipping] = useState(false);
  const [copied, setCopied] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [settingsDirty, setSettingsDirty] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (sourceUrl) URL.revokeObjectURL(sourceUrl);
      if (generated?.previewUrl) URL.revokeObjectURL(generated.previewUrl);
      generated?.urlBySize.forEach((url) => URL.revokeObjectURL(url));
    },
    []
  );

  function announce(message: string) {
    setAnnouncement(message);
  }

  function handleFile(file: File) {
    const result = validateSourceFile(file);
    if (!result.valid) {
      setStatus('error');
      setErrorMessage(result.reason ?? 'This file could not be used.');
      announce(result.reason ?? 'This file could not be used.');
      return;
    }

    if (sourceUrl) URL.revokeObjectURL(sourceUrl);
    setSourceFile(file);
    setSourceUrl(URL.createObjectURL(file));
    setStatus('ready');
    setSettingsDirty(false);
    setErrorMessage('');
    announce(`${file.name} loaded — ready to generate.`);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  }

  function reset() {
    if (sourceUrl) URL.revokeObjectURL(sourceUrl);
    if (generated?.previewUrl) URL.revokeObjectURL(generated.previewUrl);
    generated?.urlBySize.forEach((url) => URL.revokeObjectURL(url));
    setSourceFile(null);
    setSourceUrl('');
    setGenerated(null);
    setStatus('empty');
    setErrorMessage('');
    setFitMode('cover');
    setBgColor(null);
    setSettingsDirty(false);
    announce('Cleared.');
  }

  async function generate() {
    if (!sourceFile) return;
    setStatus('processing');
    setErrorMessage('');
    announce('Generating favicon set…');

    try {
      const decoded = await decodeImage(sourceFile);
      const bySize = new Map<number, Blob>();

      for (const size of ALL_SIZES) {
        const blob = await renderSquarePng(decoded.source, decoded.width, decoded.height, size, { fitMode, backgroundColor: bgColor });
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
      setStatus('generated');
      setSettingsDirty(false);
      announce('Favicon set generated.');
    } catch (err) {
      setStatus('error');
      const message = err instanceof Error ? err.message : 'This image could not be processed.';
      setErrorMessage(message);
      announce(message);
    }
  }

  function updateFitMode(mode: FitMode) {
    setFitMode(mode);
    if (status === 'generated') setSettingsDirty(true);
  }

  function updateBgColor(value: string | null) {
    setBgColor(value);
    if (status === 'generated') setSettingsDirty(true);
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
        {/* Left column: upload + prep controls (Step 1) */}
        <div className="flex flex-col gap-5">
          <StepLabel n={1}>Upload &amp; prepare</StepLabel>

          {!sourceFile ? (
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
              <span className="flex h-14 w-14 items-center justify-center rounded-full" style={{ background: 'var(--tool-accent-soft)', color: 'var(--tool-accent)' }}>
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
                style={{ background: 'var(--tool-accent)' }}
              >
                Browse image
              </button>

              <div className="flex flex-col items-center gap-1 pt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                <p>Accepted formats: JPG, PNG, WebP, SVG</p>
                <p>Maximum file size: 10 MB &bull; A square source image works best</p>
              </div>

              {!sourceFile && status === 'error' && (
                <div className="mt-2 w-full rounded-xl border px-4 py-3 text-sm font-medium" style={{ borderColor: 'color-mix(in srgb, var(--color-error) 30%, white)', background: 'var(--color-error-soft)', color: 'var(--color-error)' }} role="alert">
                  {errorMessage}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-5 rounded-2xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)' }}>
              {/* Source preview + swap */}
              <div className="flex items-center gap-3">
                <div className="gradient-checkerboard flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl border" style={{ borderColor: 'var(--border-color)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- runtime-generated blob URL, not a static asset next/image can optimize */}
                  {sourceUrl && <img src={sourceUrl} alt="" className="max-h-full max-w-full" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold" style={{ color: 'var(--text-primary)' }} title={sourceFile?.name}>
                    {sourceFile?.name}
                  </p>
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="text-xs font-semibold underline-offset-2 hover:underline" style={{ color: 'var(--tool-accent)' }}>
                    Use a different image
                  </button>
                  <label className="sr-only" htmlFor="favicon-file-input-2">
                    Choose a different source image
                  </label>
                  <input
                    id="favicon-file-input-2"
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/svg+xml,.jpg,.jpeg,.png,.webp,.svg"
                    className="sr-only"
                    onChange={onInputChange}
                  />
                </div>
              </div>

              {/* Fit mode */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }} id="fit-mode-label">
                  Fit mode
                </span>
                <div className="inline-flex w-fit gap-1 rounded-full border p-1" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }} role="group" aria-labelledby="fit-mode-label">
                  <button
                    type="button"
                    aria-pressed={fitMode === 'cover'}
                    onClick={() => updateFitMode('cover')}
                    className="min-h-[36px] rounded-full px-4 text-xs font-bold transition-all duration-200"
                    style={fitMode === 'cover' ? { background: 'var(--tool-accent)', color: '#ffffff' } : { color: 'var(--text-secondary)' }}
                  >
                    Cover (crop to square)
                  </button>
                  <button
                    type="button"
                    aria-pressed={fitMode === 'contain'}
                    onClick={() => updateFitMode('contain')}
                    className="min-h-[36px] rounded-full px-4 text-xs font-bold transition-all duration-200"
                    style={fitMode === 'contain' ? { background: 'var(--tool-accent)', color: '#ffffff' } : { color: 'var(--text-secondary)' }}
                  >
                    Contain (fit, no crop)
                  </button>
                </div>
              </div>

              {/* Background color */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }} id="bg-color-label">
                  Background for transparent areas
                </span>
                <div className="flex flex-wrap items-center gap-2" role="group" aria-labelledby="bg-color-label">
                  {BG_SWATCHES.map((swatch) => (
                    <button
                      key={swatch.label}
                      type="button"
                      onClick={() => updateBgColor(swatch.value)}
                      aria-pressed={bgColor === swatch.value}
                      title={swatch.label}
                      className="flex h-9 items-center gap-2 rounded-full border px-3 text-xs font-semibold transition-colors"
                      style={
                        bgColor === swatch.value
                          ? { borderColor: 'var(--tool-accent)', background: 'var(--tool-accent-soft)', color: 'var(--tool-accent)' }
                          : { borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }
                      }
                    >
                      <span
                        className="gradient-checkerboard h-4 w-4 flex-shrink-0 rounded-full border"
                        style={{ borderColor: 'var(--border-color)', background: swatch.value ?? undefined }}
                        aria-hidden="true"
                      />
                      {swatch.label}
                    </button>
                  ))}
                  <label className="flex h-9 items-center gap-2 rounded-full border px-3 text-xs font-semibold" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                    <input
                      type="color"
                      value={customColorDraft}
                      onChange={(e) => {
                        setCustomColorDraft(e.target.value);
                        updateBgColor(e.target.value);
                      }}
                      className="h-5 w-5 cursor-pointer rounded border-0 p-0"
                      aria-label="Custom background color"
                    />
                    Custom
                  </label>
                </div>
              </div>

              {status === 'error' && (
                <div className="rounded-xl border px-4 py-3 text-sm font-medium" style={{ borderColor: 'color-mix(in srgb, var(--color-error) 30%, white)', background: 'var(--color-error-soft)', color: 'var(--color-error)' }} role="alert">
                  {errorMessage}
                </div>
              )}

              {/* Generate / reset */}
              <div className="flex flex-wrap items-center gap-3">
                <button type="button" onClick={generate} disabled={status === 'processing'} className={primaryActionClass} style={{ background: 'var(--tool-accent)' }}>
                  {status === 'processing' ? 'Generating…' : settingsDirty ? 'Regenerate' : status === 'generated' ? 'Regenerate' : 'Generate favicon set'}
                </button>
                <button type="button" onClick={reset} className={secondaryActionClass} style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                  Reset
                </button>
              </div>
              {settingsDirty && status === 'generated' && (
                <p className="text-xs font-medium" style={{ color: 'var(--color-warning)' }}>
                  Settings changed — click Regenerate to apply them.
                </p>
              )}

              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Non-square images are automatically {fitMode === 'cover' ? 'center-cropped' : 'letterboxed'} to fit a square canvas.
              </p>
            </div>
          )}
        </div>

        {/* Right column: preview + download (Steps 2-3) */}
        <div className="flex flex-col gap-5">
          {status !== 'generated' && status !== 'processing' && <StepLabel n={2}>Preview generated sizes</StepLabel>}

          {(status === 'empty' || status === 'ready' || status === 'error') && (
            <div className="rounded-2xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)' }}>
              <SampleSizeGrid />
            </div>
          )}

          {status === 'processing' && (
            <div className="flex items-center gap-2 rounded-2xl border p-6 text-sm font-medium" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
              Generating favicon set…
            </div>
          )}

          {status === 'generated' && generated && (
            <>
              <StepLabel n={2}>Preview</StepLabel>

              {/* Browser tab mockup */}
              <div className="rounded-2xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)' }}>
                <span className="mb-3 block text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                  Browser tab preview
                </span>
                <div className="inline-flex max-w-[240px] items-center gap-2 rounded-t-lg border border-b-0 px-3 py-2" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- runtime-generated blob URL, not a static asset next/image can optimize */}
                  <img src={generated.previewUrl} alt="" width={16} height={16} className="h-4 w-4 flex-shrink-0 rounded-sm" />
                  <span className="truncate text-xs" style={{ color: 'var(--text-primary)' }}>
                    {sourceFile?.name || 'Your Page Title'}
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
                        <div
                          className={`gradient-checkerboard flex h-14 w-14 items-center justify-center overflow-hidden border ${ROUNDED_SIZES.has(size) ? 'rounded-full' : 'rounded-lg'}`}
                          style={{ borderColor: 'var(--border-color)' }}
                        >
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

              <StepLabel n={3}>Download</StepLabel>

              <div className="flex flex-wrap items-center gap-3">
                <button type="button" onClick={downloadZip} disabled={isZipping} className={primaryActionClass} style={{ background: 'var(--tool-accent)' }}>
                  {isZipping ? 'Preparing ZIP…' : 'Download All as ZIP'}
                </button>
              </div>

              {/* HTML tags */}
              <div className="flex flex-col gap-3">
                <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
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
                    style={{ background: copied ? 'var(--color-success)' : 'var(--tool-accent)' }}
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
      </div>
    </div>
  );
}
