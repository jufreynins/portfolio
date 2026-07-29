import type { Metadata } from 'next';
import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/Button';
import ImageFormatConverter from '@/components/ImageFormatConverter';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Free Image Format Converter — JPG, PNG & WebP | ${siteConfig.name}`,
  description: 'Convert images between JPG, PNG, and WebP directly in your browser, in either direction. Compare size savings and download individually or as a ZIP. No uploads.',
  canonical: `${siteConfig.url}/tools/image-format-converter`,
});

const badges = ['Browser-based', 'No uploads', 'No storage', 'Free to use'];

const infoCards = [
  {
    title: 'Convert either direction',
    body: 'Upload JPG, PNG, or WebP files and convert to any of the three — including WebP back to JPG or PNG when you need broader compatibility or an editable format.',
  },
  {
    title: 'Why WebP usually wins',
    body: 'At equivalent visual quality, WebP typically produces smaller files than JPG or PNG, especially for photos and complex graphics — which means faster page loads and better Core Web Vitals.',
  },
  {
    title: 'Everything happens locally',
    body: 'This tool decodes and re-encodes your images entirely in your browser using the Canvas API. Your files are never uploaded, so they never leave your device.',
  },
  {
    title: 'When to pick JPG or PNG instead',
    body: 'Use JPG for maximum compatibility with older software, or PNG when you need lossless quality or transparency support. PNG output ignores the quality slider since it never loses data.',
  },
];

export default function ImageFormatConverterPage() {
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
            title="Image Format Converter"
            description="Convert images between JPG, PNG, and WebP directly in your browser — in either direction. No uploads, no storage, and no account required."
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

          <div
            className="hidden rounded-xl border px-4 py-3 text-sm font-medium"
            style={{ borderColor: 'color-mix(in srgb, var(--color-warning) 30%, white)', background: 'var(--color-warning-soft)', color: 'var(--color-warning)' }}
            data-unsupported-banner
          >
            Your browser doesn&apos;t support WebP output. You can still convert to JPG or PNG.
          </div>

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
            {/* Right column: controls — pinned on desktop so they stay reachable while you review results on the left */}
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

                <label className="sr-only" htmlFor="format-file-input">
                  Choose JPG, PNG, or WebP images to convert
                </label>
                <input id="format-file-input" type="file" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" multiple className="sr-only" data-file-input />

                <button type="button" className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5" style={{ background: 'var(--brand-primary)' }} data-browse-btn>
                  Browse images
                </button>

                <div className="flex flex-col items-center gap-1 pt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <p>Accepted formats: JPG, JPEG, PNG, WebP</p>
                  <p>Maximum file size: 15 MB per image &bull; Maximum batch: 10 images</p>
                </div>
              </div>

              {/* Format selector */}
              <div className="flex flex-col gap-3 rounded-2xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }} id="format-select-label">
                  Convert to
                </span>
                <div className="inline-flex w-fit gap-1 rounded-full border p-1" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }} role="group" aria-labelledby="format-select-label">
                  <button type="button" data-format-btn data-format="webp" aria-pressed="true" className="min-h-[40px] rounded-full px-4 text-sm font-bold transition-all duration-200" style={{ background: 'var(--brand-primary)', color: '#ffffff' }}>
                    WebP
                  </button>
                  <button type="button" data-format-btn data-format="jpeg" aria-pressed="false" className="min-h-[40px] rounded-full px-4 text-sm font-bold transition-all duration-200" style={{ color: 'var(--text-secondary)' }}>
                    JPG
                  </button>
                  <button type="button" data-format-btn data-format="png" aria-pressed="false" className="min-h-[40px] rounded-full px-4 text-sm font-bold transition-all duration-200" style={{ color: 'var(--text-secondary)' }}>
                    PNG
                  </button>
                </div>
              </div>

              {/* Quality settings */}
              <div className="flex flex-col gap-4 rounded-2xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)' }}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <label htmlFor="quality-slider" className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    Quality
                  </label>
                  <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--brand-primary)' }}>
                    <output htmlFor="quality-slider" data-quality-value>
                      80%
                    </output>
                    <span aria-hidden="true" style={{ color: 'var(--border-color)' }}>
                      &bull;
                    </span>
                    <span data-quality-label>Balanced</span>
                  </div>
                </div>
                <input type="range" id="quality-slider" min={10} max={100} step={5} defaultValue={80} className="webp-range w-full" data-quality-slider />
                <div className="flex justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <span>Smaller file</span>
                  <span>Balanced</span>
                  <span>Higher quality</span>
                </div>
                <p className="hidden text-xs font-medium" style={{ color: 'var(--text-secondary)' }} data-quality-note>
                  PNG is lossless — quality doesn&apos;t apply to this format.
                </p>
              </div>
            </div>

            {/* Left column: results */}
            <div className="order-2 flex flex-col gap-6 lg:order-1">
              {/* Summary */}
              <div className="hidden grid-cols-2 gap-4 rounded-2xl border p-5 sm:grid-cols-5 sm:p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }} data-summary>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Images
                  </span>
                  <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }} data-summary-count>
                    0
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Converted
                  </span>
                  <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }} data-summary-converted>
                    0
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Original size
                  </span>
                  <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }} data-summary-original-size>
                    —
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Converted size
                  </span>
                  <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }} data-summary-converted-size>
                    —
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                    Total saved
                  </span>
                  <span className="text-xl font-bold" style={{ color: 'var(--brand-primary)' }} data-summary-saved>
                    —
                  </span>
                </div>
              </div>

              {/* Empty state */}
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed py-12 text-center" style={{ borderColor: 'var(--border-color)' }} data-empty-state>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Your converted images will appear here.
                </p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Pick a format on the right, then add JPG, PNG, or WebP files to get started.
                </p>
              </div>

              {/* Image list */}
              <ul className="hidden flex-col gap-4" data-list aria-label="Uploaded images" />

              {/* Actions */}
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

          <ImageFormatConverter />
        </Container>
      </section>

      {/* Info */}
      <section style={{ background: 'var(--surface-warm)' }} className="py-12 sm:py-14">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Good to know" title="About these formats" description="A quick primer on JPG, PNG, and WebP, and how this tool works." />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {infoCards.map((card) => (
              <div key={card.title} className="flex flex-col gap-2">
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                  {card.title}
                </h3>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>
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
