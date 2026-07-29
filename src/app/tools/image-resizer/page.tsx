import type { Metadata } from 'next';
import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/Button';
import ImageResizer from '@/components/ImageResizer';
import { SOCIAL_PRESETS, ANCHOR_POSITIONS, MIN_PERCENTAGE, MAX_PERCENTAGE, DEFAULT_PERCENTAGE } from '@/lib/imageResize/utils';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Free Image Resizer & Cropper | ${siteConfig.name}`,
  description: 'Resize and crop images by custom dimensions, percentage, or social media presets, right in your browser. Bulk resize a whole batch and download as a ZIP.',
  canonical: `${siteConfig.url}/tools/image-resizer`,
});

const badges = ['Browser-based', 'No uploads', 'No storage', 'Free to use'];

const presetsByCategory = SOCIAL_PRESETS.reduce<Record<string, typeof SOCIAL_PRESETS>>((acc, preset) => {
  (acc[preset.category] ??= []).push(preset);
  return acc;
}, {});

const infoCards = [
  {
    title: 'Three ways to resize',
    body: 'Set exact pixel dimensions with an aspect-ratio lock, scale everything by a percentage, or jump straight to a social media preset — whichever fits the job.',
  },
  {
    title: 'Cropping, not stretching',
    body: 'When a target size has a different aspect ratio than your source image, this tool crops to fit instead of distorting it. Choose which part of the image to keep with the anchor grid.',
  },
  {
    title: 'Built for batches',
    body: 'Add up to 10 images at once, apply the same resize settings to all of them, and download everything together as a ZIP.',
  },
  {
    title: 'Everything happens locally',
    body: 'This tool decodes and resizes your images entirely in your browser using the Canvas API. Your files are never uploaded, so they never leave your device.',
  },
];

export default function ImageResizerPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-24 pb-10 sm:pt-28 sm:pb-12" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-8">
          <a href="/tools" className="inline-flex w-fit items-center gap-2 text-sm font-medium transition-colors hover:text-zinc-900" style={{ color: 'var(--text-secondary)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Tools
          </a>

          <SectionHeading
            as="h1"
            eyebrow="Free Tool"
            title="Image Resizer & Cropper"
            description="Resize and crop images by exact dimensions, percentage, or social media preset, directly in your browser. No uploads, no storage, and no account required."
          />

          <ul className="flex flex-wrap gap-3" aria-label="Trust indicators">
            {badges.map((label) => (
              <li key={label} className="flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)', color: 'var(--text-primary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--brand-primary)' }} aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {label}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Tool */}
      <section style={{ background: 'var(--surface-white)' }} className="py-12 sm:py-14">
        <Container className="flex flex-col gap-8">
          <div role="status" aria-live="polite" className="sr-only" data-live-region />
          <div className="hidden rounded-xl border px-4 py-3 text-sm font-medium" style={{ borderColor: 'color-mix(in srgb, var(--color-error) 30%, white)', background: 'var(--color-error-soft)', color: 'var(--color-error)' }} data-error-banner />

          {/* Privacy notice */}
          <div className="flex items-start gap-3 rounded-2xl border p-4 sm:p-5" style={{ borderColor: 'var(--border-color)', background: 'var(--brand-soft)' }}>
            <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full" style={{ background: 'var(--brand-lavender)', color: 'var(--brand-primary)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4Z" />
              </svg>
            </span>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              <strong>Private and secure:</strong> Your images are processed directly in your browser. No files are uploaded to our server or stored in a database.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
            {/* Right column: controls */}
            <div className="order-1 flex flex-col gap-6 lg:order-2 lg:sticky lg:top-28">
              {/* Dropzone */}
              <div className="webp-dropzone flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed p-8 text-center transition-colors duration-200 sm:p-10" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }} data-dropzone>
                <span className="flex h-14 w-14 items-center justify-center rounded-full" style={{ background: 'var(--brand-lavender)', color: 'var(--brand-primary)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </span>
                <div className="flex flex-col gap-1">
                  <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Drag and drop images here
                  </p>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    or use the button below to browse your files
                  </p>
                </div>
                <label className="sr-only" htmlFor="resizer-file-input">
                  Choose JPG, PNG, or WebP images to resize
                </label>
                <input id="resizer-file-input" type="file" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" multiple className="sr-only" data-file-input />
                <button type="button" className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5" style={{ background: 'var(--brand-primary)' }} data-browse-btn>
                  Browse images
                </button>
                <div className="flex flex-col items-center gap-1 pt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <p>Accepted formats: JPG, JPEG, PNG, WebP</p>
                  <p>Maximum file size: 15 MB per image &bull; Maximum batch: 10 images</p>
                </div>
              </div>

              {/* Mode tabs */}
              <div className="flex flex-col gap-4 rounded-2xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }} id="resize-mode-label">
                  Resize mode
                </span>
                <div className="inline-flex w-fit flex-wrap gap-1 rounded-full border p-1" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }} role="group" aria-labelledby="resize-mode-label">
                  <button type="button" data-mode-btn data-mode="custom" aria-pressed="true" className="min-h-[40px] rounded-full px-4 text-sm font-bold transition-all duration-200" style={{ background: 'var(--brand-primary)', color: '#ffffff' }}>
                    Custom Size
                  </button>
                  <button type="button" data-mode-btn data-mode="percentage" aria-pressed="false" className="min-h-[40px] rounded-full px-4 text-sm font-bold transition-all duration-200" style={{ color: 'var(--text-secondary)' }}>
                    Percentage
                  </button>
                  <button type="button" data-mode-btn data-mode="preset" aria-pressed="false" className="min-h-[40px] rounded-full px-4 text-sm font-bold transition-all duration-200" style={{ color: 'var(--text-secondary)' }}>
                    Presets
                  </button>
                </div>

                {/* Custom size panel */}
                <div data-mode-panel="custom" className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-end gap-3">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="width-input" className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                        Width (px)
                      </label>
                      <input id="width-input" type="number" min={1} max={8000} defaultValue={1200} className="w-28 rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} data-width-input />
                    </div>
                    <button
                      type="button"
                      data-aspect-lock-btn
                      aria-pressed="false"
                      aria-label="Lock aspect ratio"
                      title="Lock aspect ratio"
                      className="mb-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border transition-colors"
                      style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </button>
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="height-input" className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                        Height (px)
                      </label>
                      <input id="height-input" type="number" min={1} max={8000} defaultValue={630} className="w-28 rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} data-height-input />
                    </div>
                  </div>
                </div>

                {/* Percentage panel */}
                <div data-mode-panel="percentage" className="hidden flex-col gap-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label htmlFor="percentage-slider" className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                      Scale
                    </label>
                    <output htmlFor="percentage-slider" className="text-sm font-semibold" style={{ color: 'var(--brand-primary)' }} data-percentage-value>
                      100%
                    </output>
                  </div>
                  <input type="range" id="percentage-slider" min={MIN_PERCENTAGE} max={MAX_PERCENTAGE} step={5} defaultValue={DEFAULT_PERCENTAGE} className="webp-range w-full" data-percentage-slider />
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    Scales the full image proportionally &mdash; no cropping.
                  </p>
                </div>

                {/* Preset panel */}
                <div data-mode-panel="preset" className="hidden flex-col gap-2">
                  <label htmlFor="preset-select" className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    Social media preset
                  </label>
                  <select id="preset-select" className="w-full rounded-lg border px-3 py-2.5 text-sm" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} data-preset-select>
                    {Object.entries(presetsByCategory).map(([category, presets]) => (
                      <optgroup key={category} label={category}>
                        {presets.map((preset) => {
                          const globalIndex = SOCIAL_PRESETS.indexOf(preset);
                          return (
                            <option key={preset.label} value={globalIndex}>
                              {preset.label} &mdash; {preset.width}&times;{preset.height}
                            </option>
                          );
                        })}
                      </optgroup>
                    ))}
                  </select>
                </div>

                {/* Anchor grid (shared by custom + preset modes) */}
                <div data-anchor-wrapper className="flex flex-col gap-2">
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }} id="anchor-grid-label">
                    Crop from
                  </span>
                  <div className="grid w-fit grid-cols-3 gap-1.5" role="group" aria-labelledby="anchor-grid-label">
                    {ANCHOR_POSITIONS.map((position) => (
                      <button
                        key={position.value}
                        type="button"
                        data-anchor-btn
                        data-anchor={position.value}
                        aria-label={position.label}
                        title={position.label}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border transition-colors duration-200"
                        style={{ borderColor: position.value === 'center' ? 'var(--brand-primary)' : 'var(--border-color)', background: position.value === 'center' ? 'var(--brand-lavender)' : undefined }}
                      >
                        <span className="h-2 w-2 rounded-full" data-anchor-dot style={{ background: position.value === 'center' ? 'var(--brand-primary)' : 'var(--text-muted)' }} aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Left column: results */}
            <div className="order-2 flex flex-col gap-6 lg:order-1">
              {/* Summary */}
              <div className="hidden grid-cols-2 gap-4 rounded-2xl border p-5 sm:grid-cols-5 sm:p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }} data-summary>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Images</span>
                  <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }} data-summary-count>0</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Resized</span>
                  <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }} data-summary-converted>0</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Original size</span>
                  <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }} data-summary-original-size>—</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>New size</span>
                  <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }} data-summary-converted-size>—</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Total saved</span>
                  <span className="text-xl font-bold" style={{ color: 'var(--brand-primary)' }} data-summary-saved>—</span>
                </div>
              </div>

              {/* Empty state */}
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed py-12 text-center" style={{ borderColor: 'var(--border-color)' }} data-empty-state>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Your resized images will appear here.</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Choose a resize mode and add images on the right to get started.</p>
              </div>

              <ul className="hidden flex-col gap-4" data-list aria-label="Uploaded images" />

              <div className="flex flex-wrap items-center gap-3">
                <button type="button" className="hidden min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5" style={{ background: 'var(--brand-primary)' }} data-download-all-btn>
                  Download All as ZIP
                </button>
                <button type="button" className="hidden min-h-[44px] items-center justify-center gap-2 rounded-full border-2 px-6 py-2.5 text-sm font-bold transition-all duration-300" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} data-clear-all-btn>
                  Clear All
                </button>
              </div>
            </div>
          </div>

          <ImageResizer defaultMode="custom" />
        </Container>
      </section>

      {/* Info */}
      <section style={{ background: 'var(--surface-warm)' }} className="py-12 sm:py-14">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Good to know" title="Getting clean, correctly sized images" description="A quick primer on resizing, cropping, and how this tool works." />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {infoCards.map((card) => (
              <div key={card.title} className="flex flex-col gap-2">
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{card.title}</h3>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{card.body}</p>
              </div>
            ))}
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Just need social media sizes? Try the{' '}
            <a href="/tools/social-media-image-resizer" className="underline" style={{ color: 'var(--brand-primary)' }}>
              Social Media Image Resizer
            </a>
            .
          </p>
        </Container>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--brand-dark)' }} className="dark-grid-bg py-14 sm:py-16">
        <Container className="flex flex-col items-start gap-6">
          <SectionHeading
            eyebrow="Need more speed?"
            title="Need help improving your website speed?"
            description="I can optimize images, improve Core Web Vitals, clean up WordPress performance issues, and make your website faster across desktop and mobile."
            dark
          />
          <Button href="/contact" variant="primary" size="large">
            Request a Website Performance Review
          </Button>
        </Container>
      </section>
    </>
  );
}
