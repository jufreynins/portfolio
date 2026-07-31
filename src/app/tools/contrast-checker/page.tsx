import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import ToolBreadcrumbs from '@/components/tools/ToolBreadcrumbs';
import StatusBadge from '@/components/tools/StatusBadge';
import ProcessingNote from '@/components/tools/ProcessingNote';
import ToolGuideAccordion from '@/components/tools/ToolGuideAccordion';
import RelatedTools from '@/components/tools/RelatedTools';
import ContrastChecker from '@/components/tools/ContrastChecker';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Accessibility Contrast Checker | ${siteConfig.name}`,
  description: 'Check foreground and background color pairs against WCAG AA and AAA contrast requirements, with a live preview.',
  canonical: `${siteConfig.url}/tools/contrast-checker`,
});

const TOOL_ACCENT = '#166534';
const TOOL_ACCENT_SOFT = '#e5f3e9';

const guideTips = [
  'Large text (18pt+/24px, or 14pt+/19px bold) has a lower contrast requirement than normal body text.',
  'AA is the baseline most sites and legal requirements target; AAA is a stricter, optional standard.',
  'Contrast is calculated using the WCAG 2.x relative luminance formula, the same one browsers and accessibility auditing tools use.',
  'The suggested alternative only adjusts the foreground color — sometimes adjusting the background instead gives a better visual result.',
];

export default function ContrastCheckerPage() {
  return (
    <div style={{ '--tool-accent': TOOL_ACCENT, '--tool-accent-soft': TOOL_ACCENT_SOFT } as CSSProperties}>
      <section className="pt-20 pb-5 sm:pt-24" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-3">
          <ToolBreadcrumbs category="Frontend & Accessibility" title="Accessibility Contrast Checker" />
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status="Available" />
            <ProcessingNote>Runs locally in your browser</ProcessingNote>
          </div>
          <h1 className="text-xl font-bold sm:text-2xl" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            Accessibility Contrast Checker
          </h1>
          <p className="max-w-2xl text-sm" style={{ color: 'var(--text-secondary)' }}>
            Check foreground and background color pairs against WCAG AA and AAA contrast requirements.
          </p>
        </Container>
      </section>

      <section className="py-6 sm:py-8" style={{ background: 'var(--surface-white)' }}>
        <Container>
          <ContrastChecker />
        </Container>
      </section>

      <section className="py-10 sm:py-12" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-8">
          <ToolGuideAccordion title="How it works" tips={guideTips} />
          <RelatedTools currentId="contrast-checker" />
        </Container>
      </section>

      <section className="dark-grid-bg py-10 sm:py-12" style={{ background: 'var(--brand-dark)' }}>
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="eyebrow" style={{ color: 'var(--brand-lavender)' }}>
              Need an accessibility pass?
            </span>
            <h2 className="text-lg font-bold sm:text-xl" style={{ color: 'var(--text-on-dark)', fontFamily: 'var(--font-heading)' }}>
              Need your website reviewed for accessibility?
            </h2>
            <p className="max-w-xl text-sm" style={{ color: 'var(--text-on-dark)', opacity: 0.75 }}>
              I review and fix color contrast, keyboard navigation, and semantic markup issues on WordPress and custom sites.
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
