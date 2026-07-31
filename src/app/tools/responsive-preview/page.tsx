import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import ToolBreadcrumbs from '@/components/tools/ToolBreadcrumbs';
import StatusBadge from '@/components/tools/StatusBadge';
import ProcessingNote from '@/components/tools/ProcessingNote';
import ToolGuideAccordion from '@/components/tools/ToolGuideAccordion';
import RelatedTools from '@/components/tools/RelatedTools';
import ResponsivePreview from '@/components/tools/ResponsivePreview';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Responsive Website Preview | ${siteConfig.name}`,
  description: 'Preview a public website at common desktop and mobile viewport sizes before you ship a redesign.',
  canonical: `${siteConfig.url}/tools/responsive-preview`,
});

const TOOL_ACCENT = '#0369a1';
const TOOL_ACCENT_SOFT = '#e4f0f8';

const guideTips = [
  'Many websites (including this one) send security headers that block embedding in an iframe — if a preview stays blank, use "Open in New Window" and resize your browser instead.',
  'This tool loads the real live page, so interactions like scrolling and hover states work — it isn\'t a static screenshot.',
  'Landscape flips the width and height of the selected preset, useful for checking tablets and phones rotated sideways.',
  'Nothing you preview here is stored, proxied, or sent through a server — the browser loads the page directly.',
];

export default function ResponsivePreviewPage() {
  return (
    <div style={{ '--tool-accent': TOOL_ACCENT, '--tool-accent-soft': TOOL_ACCENT_SOFT } as CSSProperties}>
      <section className="pt-20 pb-5 sm:pt-24" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-3">
          <ToolBreadcrumbs category="Website & Infrastructure" title="Responsive Website Preview" />
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status="Available" />
            <ProcessingNote>Requires a public website URL</ProcessingNote>
          </div>
          <h1 className="text-xl font-bold sm:text-2xl" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            Responsive Website Preview
          </h1>
          <p className="max-w-2xl text-sm" style={{ color: 'var(--text-secondary)' }}>
            Preview a public website at common desktop and mobile viewport sizes before you ship a redesign.
          </p>
        </Container>
      </section>

      <section className="py-6 sm:py-8" style={{ background: 'var(--surface-white)' }}>
        <Container>
          <ResponsivePreview />
        </Container>
      </section>

      <section className="py-10 sm:py-12" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-8">
          <ToolGuideAccordion title="How it works" tips={guideTips} />
          <RelatedTools currentId="responsive-preview" />
        </Container>
      </section>

      <section className="dark-grid-bg py-10 sm:py-12" style={{ background: 'var(--brand-dark)' }}>
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="eyebrow" style={{ color: 'var(--brand-lavender)' }}>
              Need it fixed across every device?
            </span>
            <h2 className="text-lg font-bold sm:text-xl" style={{ color: 'var(--text-on-dark)', fontFamily: 'var(--font-heading)' }}>
              Need real responsive troubleshooting, not just a preview?
            </h2>
            <p className="max-w-xl text-sm" style={{ color: 'var(--text-on-dark)', opacity: 0.75 }}>
              I fix responsive layout issues across real devices and browsers, not just simulated viewports.
            </p>
          </div>
          <Button href="/contact" variant="primary">
            Start a Project
          </Button>
        </Container>
      </section>
    </div>
  );
}
