'use client';

import { useId, useMemo, useRef, useState } from 'react';
import ToolGuideAccordion from '@/components/tools/ToolGuideAccordion';
import {
  DESCRIPTION_RANGE,
  DEVICE_PREVIEW_LIMITS,
  EMPTY_FIELDS,
  EXAMPLE_FIELDS,
  PIXEL_WIDTH_LIMITS,
  TITLE_RANGE,
  buildMetaTagsCode,
  extractDisplayUrl,
  getFieldStatus,
  getFieldStatusColor,
  getFieldStatusLabel,
  measureTextWidth,
  truncateForPreview,
  type DeviceMode,
} from '@/lib/seoPreview/utils';

const secondaryActionClass =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50';

function PixelWidthBar({ label, px, limit }: { label: string; px: number; limit: number }) {
  const ratio = Math.min(1, px / limit);
  const color = ratio > 1 ? 'var(--color-error)' : ratio > 0.85 ? 'var(--color-warning)' : 'var(--color-success)';
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-[11px] font-medium" style={{ color: 'var(--text-secondary)' }}>
        <span>{label} pixel width</span>
        <span>
          ~{Math.round(px)}px / {limit}px
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ background: 'var(--surface-warm)' }}>
        <div className="h-full rounded-full transition-all duration-200" style={{ width: `${Math.min(100, ratio * 100)}%`, background: color }} />
      </div>
    </div>
  );
}

export default function SeoMetaPreview() {
  const [title, setTitle] = useState(EXAMPLE_FIELDS.title);
  const [description, setDescription] = useState(EXAMPLE_FIELDS.description);
  const [url, setUrl] = useState(EXAMPLE_FIELDS.url);
  const [device, setDevice] = useState<DeviceMode>('desktop');
  const [copied, setCopied] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const titleId = useId();
  const descriptionId = useId();
  const urlId = useId();

  const titleStatus = getFieldStatus(title.trim().length, TITLE_RANGE);
  const descriptionStatus = getFieldStatus(description.trim().length, DESCRIPTION_RANGE);

  const limits = DEVICE_PREVIEW_LIMITS[device];
  const pixelLimits = PIXEL_WIDTH_LIMITS[device];
  const previewTitle = truncateForPreview(title.trim() || 'Untitled page', limits.title);
  const previewDescription = truncateForPreview(description.trim() || 'Add a meta description to see how it will appear here.', limits.description);
  const { host, breadcrumb } = extractDisplayUrl(url);
  const metaCode = buildMetaTagsCode({ title, description, url });

  const titlePx = useMemo(() => measureTextWidth(title.trim(), '400 20px arial'), [title]);
  const descriptionPx = useMemo(() => measureTextWidth(description.trim(), '400 14px arial'), [description]);

  const canonicalReady = url.trim().length > 0;
  const ogReady = title.trim().length > 0 && description.trim().length > 0;

  function announce(message: string) {
    setAnnouncement(message);
  }

  function loadExample() {
    setTitle(EXAMPLE_FIELDS.title);
    setDescription(EXAMPLE_FIELDS.description);
    setUrl(EXAMPLE_FIELDS.url);
    announce('Example content loaded.');
  }

  function resetAll() {
    setTitle(EMPTY_FIELDS.title);
    setDescription(EMPTY_FIELDS.description);
    setUrl(EMPTY_FIELDS.url);
    announce('Fields cleared.');
  }

  async function copyMetaTags() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(metaCode);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = metaCode;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }
      setCopied(true);
      announce('Meta tags copied to clipboard.');
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      announce('Could not copy automatically. Please select and copy the code manually.');
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
        {/* Left column: live preview — pinned on desktop so it stays visible while you edit */}
        <div className="flex flex-col gap-5 lg:sticky lg:top-28">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }} id="device-toggle-label">
              Preview device
            </span>
            <div className="inline-flex w-fit gap-1 rounded-full border p-1" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }} role="group" aria-labelledby="device-toggle-label">
              {(['desktop', 'mobile'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  aria-pressed={device === mode}
                  onClick={() => setDevice(mode)}
                  className="min-h-[40px] rounded-full px-4 text-sm font-bold capitalize transition-all duration-200"
                  style={device === mode ? { background: 'var(--tool-accent)', color: '#ffffff' } : { color: 'var(--text-secondary)' }}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)' }}>
            <div className={`mx-auto flex flex-col gap-1 ${device === 'mobile' ? 'max-w-[380px]' : 'max-w-full'}`} style={{ fontFamily: 'arial, sans-serif' }}>
              <div className="flex items-center gap-2">
                <span
                  className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold uppercase text-white"
                  style={{ background: 'var(--tool-accent)' }}
                  aria-hidden="true"
                >
                  {host.charAt(0)}
                </span>
                <span className="truncate text-sm" style={{ color: '#202124' }}>
                  {breadcrumb}
                </span>
              </div>
              <p className="text-xl leading-snug" style={{ color: '#1a0dab' }}>
                {previewTitle}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: '#4d5156' }}>
                {previewDescription}
              </p>
            </div>
          </div>

          {/* Pixel-width guidance */}
          <div className="flex flex-col gap-3 rounded-2xl border p-4" style={{ borderColor: 'var(--border-color)' }}>
            <PixelWidthBar label="Title" px={titlePx} limit={pixelLimits.title} />
            <PixelWidthBar label="Description" px={descriptionPx} limit={pixelLimits.description} />
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Pixel width is an approximation of Google&apos;s rendering — treat it as guidance, not a guarantee. The real cutoff varies by device and font rendering.
            </p>
          </div>

          {/* Compact quality summary */}
          <div className="flex flex-wrap gap-2" aria-label="Readiness summary">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold"
              style={{ borderColor: 'var(--border-color)', color: getFieldStatusColor(titleStatus) }}
            >
              Title: {getFieldStatusLabel(titleStatus, title.trim().length === 0)}
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold"
              style={{ borderColor: 'var(--border-color)', color: getFieldStatusColor(descriptionStatus) }}
            >
              Description: {getFieldStatusLabel(descriptionStatus, description.trim().length === 0)}
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold"
              style={{ borderColor: 'var(--border-color)', color: canonicalReady ? 'var(--color-success)' : 'var(--text-secondary)' }}
            >
              Canonical URL: {canonicalReady ? 'Set' : 'Not set'}
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold"
              style={{ borderColor: 'var(--border-color)', color: ogReady ? 'var(--color-success)' : 'var(--text-secondary)' }}
            >
              Open Graph: {ogReady ? 'Ready' : 'Incomplete'}
            </span>
          </div>

          {/* Generated HTML — collapsible so it doesn't compete with the preview */}
          <ToolGuideAccordion title="Generated HTML">
            <div className="relative overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--border-color)', background: 'var(--brand-ink)' }}>
              <pre className="overflow-x-auto p-4 pr-32 text-xs leading-relaxed sm:text-sm">
                <code style={{ color: '#e5e7eb', fontFamily: 'var(--font-mono)' }}>{metaCode}</code>
              </pre>
              <button
                type="button"
                onClick={copyMetaTags}
                className="absolute right-3 top-3 inline-flex min-h-[36px] items-center justify-center rounded-full px-4 text-xs font-bold text-white transition-all duration-200"
                style={{ background: copied ? 'var(--color-success)' : 'var(--tool-accent)' }}
              >
                {copied ? 'Copied!' : 'Copy Tags'}
              </button>
            </div>
          </ToolGuideAccordion>
        </div>

        {/* Right column: controls */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 rounded-2xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label htmlFor={titleId} className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Page title
                </label>
                <span className="text-xs font-semibold" style={{ color: getFieldStatusColor(titleStatus) }}>
                  {title.length} / {TITLE_RANGE.max} &mdash; {getFieldStatusLabel(titleStatus, title.trim().length === 0)}
                </span>
              </div>
              <input
                id={titleId}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. WordPress Website Design & Development Services"
                className="w-full rounded-lg border px-3 py-2.5 text-sm"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label htmlFor={descriptionId} className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Meta description
                </label>
                <span className="text-xs font-semibold" style={{ color: getFieldStatusColor(descriptionStatus) }}>
                  {description.length} / {DESCRIPTION_RANGE.max} &mdash; {getFieldStatusLabel(descriptionStatus, description.trim().length === 0)}
                </span>
              </div>
              <textarea
                id={descriptionId}
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A short, compelling summary of what this page offers."
                className="w-full resize-none rounded-lg border px-3 py-2.5 text-sm"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor={urlId} className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                Page URL
              </label>
              <input
                id={urlId}
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/page-path"
                className="w-full rounded-lg border px-3 py-2.5 text-sm"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={loadExample} className={secondaryActionClass} style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
              Load Example
            </button>
            <button type="button" onClick={resetAll} className={secondaryActionClass} style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
              Reset
            </button>
          </div>

          <div className="rounded-2xl border p-5 text-sm leading-relaxed sm:p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)', color: 'var(--text-secondary)' }}>
            <p>
              <strong style={{ color: 'var(--text-primary)' }}>Guidelines:</strong> aim for a title around 50&ndash;60 characters and a description around 70&ndash;160 characters. Search engines
              may still rewrite either one, and the exact cutoff is based on pixel width, not character count &mdash; treat both this and the pixel-width bars above as helpful targets, not hard rules.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
