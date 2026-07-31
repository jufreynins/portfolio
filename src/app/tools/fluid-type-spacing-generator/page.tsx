import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import ToolBreadcrumbs from '@/components/tools/ToolBreadcrumbs';
import StatusBadge from '@/components/tools/StatusBadge';
import ProcessingNote from '@/components/tools/ProcessingNote';
import ToolGuideAccordion from '@/components/tools/ToolGuideAccordion';
import RelatedTools from '@/components/tools/RelatedTools';
import FluidTypeGenerator from '@/components/tools/FluidTypeGenerator';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Fluid Type & Spacing Generator | ${siteConfig.name}`,
  description: 'Generate responsive CSS clamp() values for typography and spacing between two viewport sizes, with a live preview.',
  canonical: `${siteConfig.url}/tools/fluid-type-spacing-generator`,
});

const TOOL_ACCENT = '#0891b2';
const TOOL_ACCENT_SOFT = '#e2f3f6';

const guideTips = [
  'The slider simulates a real browser viewport by computing the value mathematically — the generated clamp() itself uses real vw units once you paste it into your site.',
  'Typography usually looks best scaling by about 1.25–1.5× between minimum and maximum viewport.',
  'Root font size only matters when using rem — it converts your rem values to px to calculate the slope correctly.',
  'A reversed range (max value smaller than min value) is valid — useful for spacing that should shrink on larger screens.',
];

export default function FluidTypeSpacingGeneratorPage() {
  return (
    <div style={{ '--tool-accent': TOOL_ACCENT, '--tool-accent-soft': TOOL_ACCENT_SOFT } as CSSProperties}>
      <section className="pt-20 pb-5 sm:pt-24" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-3">
          <ToolBreadcrumbs category="Frontend & Accessibility" title="Fluid Type & Spacing Generator" />
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status="Available" />
            <ProcessingNote>Runs locally in your browser</ProcessingNote>
          </div>
          <h1 className="text-xl font-bold sm:text-2xl" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            Fluid Type &amp; Spacing Generator
          </h1>
          <p className="max-w-2xl text-sm" style={{ color: 'var(--text-secondary)' }}>
            Generate CSS clamp() values for responsive typography and spacing, with a live preview across viewport sizes.
          </p>
        </Container>
      </section>

      <section className="py-6 sm:py-8" style={{ background: 'var(--surface-white)' }}>
        <Container>
          <FluidTypeGenerator />
        </Container>
      </section>

      <section className="py-10 sm:py-12" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-8">
          <ToolGuideAccordion title="How it works" tips={guideTips} />
          <RelatedTools currentId="fluid-type-spacing-generator" />
        </Container>
      </section>

      <section className="dark-grid-bg py-10 sm:py-12" style={{ background: 'var(--brand-dark)' }}>
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="eyebrow" style={{ color: 'var(--brand-lavender)' }}>
              Need a full responsive system?
            </span>
            <h2 className="text-lg font-bold sm:text-xl" style={{ color: 'var(--text-on-dark)', fontFamily: 'var(--font-heading)' }}>
              Need a consistent type and spacing scale across your site?
            </h2>
            <p className="max-w-xl text-sm" style={{ color: 'var(--text-on-dark)', opacity: 0.75 }}>
              I build responsive design systems and implement them directly in WordPress or custom frontend code.
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
