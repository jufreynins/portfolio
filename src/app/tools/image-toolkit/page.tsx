import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import ToolPrivacyIndicator from '@/components/tools/ToolPrivacyIndicator';
import ToolGuideAccordion from '@/components/tools/ToolGuideAccordion';
import RelatedTools from '@/components/tools/RelatedTools';
import ImageToolkitWorkspace from '@/components/tools/ImageToolkitWorkspace';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Free Image Toolkit — Convert, Compress & Resize | ${siteConfig.name}`,
  description: 'Convert between JPG, PNG, and WebP, compress file size, and resize or crop images by custom dimensions, percentage, or social media preset — all in one browser-based workspace. No uploads.',
  canonical: `${siteConfig.url}/tools/image-toolkit`,
});

const TOOL_ACCENT = '#1d4ed8';
const TOOL_ACCENT_SOFT = '#e7ecf8';

const guideTips = [
  'Convert either direction between JPG, PNG, and WebP — including WebP back to JPG or PNG for broader compatibility.',
  'Compress keeps your original format; Convert changes it. Reach for Compress when you just need a smaller file, Convert when you need a different one.',
  'Resize by exact pixel dimensions, a percentage scale, or a social media preset, then drag the crop box (or its corner handles) to control what stays in frame.',
  'PNG is lossless, so quality sliders have little effect on it — convert to WebP first if you need a meaningfully smaller PNG.',
  'Add up to 10 images at once in any mode and download everything together as a ZIP.',
  'Everything runs locally in your browser using the Canvas API. Your files are never uploaded or stored.',
];

const formats = ['JPG', 'PNG', 'WebP'];

export default function ImageToolkitPage() {
  return (
    <div style={{ '--tool-accent': TOOL_ACCENT, '--tool-accent-soft': TOOL_ACCENT_SOFT } as CSSProperties}>
      <section className="pt-20 pb-6 sm:pt-24" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <a href="/tools" className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Tools
            </a>
            <ToolPrivacyIndicator />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-xl font-bold sm:text-2xl" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              Image Toolkit
            </h1>
            <div className="flex items-center gap-1.5" aria-label="Supported formats">
              {formats.map((format) => (
                <span key={format} className="rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold" style={{ borderColor: 'var(--tool-accent)', color: 'var(--tool-accent)', background: 'var(--tool-accent-soft)' }}>
                  {format}
                </span>
              ))}
            </div>
          </div>
          <p className="max-w-xl text-sm" style={{ color: 'var(--text-secondary)' }}>
            Convert, compress, resize, and crop images — all in one browser-based workspace. No uploads, no storage, no account.
          </p>
        </Container>
      </section>

      <section className="py-8 sm:py-10" style={{ background: 'var(--surface-white)' }}>
        <Container>
          <ImageToolkitWorkspace />
        </Container>
      </section>

      <section className="py-10 sm:py-12" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-8">
          <ToolGuideAccordion title="How it works" tips={guideTips} />
          <RelatedTools currentId="image-toolkit" />
        </Container>
      </section>

      <section className="dark-grid-bg py-10 sm:py-12" style={{ background: 'var(--brand-dark)' }}>
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="eyebrow" style={{ color: 'var(--brand-lavender)' }}>
              Need more speed?
            </span>
            <h2 className="text-lg font-bold sm:text-xl" style={{ color: 'var(--text-on-dark)', fontFamily: 'var(--font-heading)' }}>
              Need help improving your website speed?
            </h2>
            <p className="max-w-xl text-sm" style={{ color: 'var(--text-on-dark)', opacity: 0.75 }}>
              I can optimize images, improve Core Web Vitals, clean up WordPress performance issues, and make your website faster across desktop and mobile.
            </p>
          </div>
          <Button href="/contact" variant="primary">
            Request a Website Performance Review
          </Button>
        </Container>
      </section>
    </div>
  );
}
