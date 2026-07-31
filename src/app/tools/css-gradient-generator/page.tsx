import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import ToolPrivacyIndicator from '@/components/tools/ToolPrivacyIndicator';
import ToolGuideAccordion from '@/components/tools/ToolGuideAccordion';
import RelatedTools from '@/components/tools/RelatedTools';
import GradientGenerator from '@/components/GradientGenerator';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `CSS Gradient Generator – Create Linear, Radial & Conic Gradients | ${siteConfig.name}`,
  description: 'Create custom CSS gradients with live preview controls. Generate linear, radial, and conic gradients, copy the CSS, and download the result as a PNG.',
  canonical: `${siteConfig.url}/tools/css-gradient-generator`,
});

const TOOL_ACCENT = '#a21caf';
const TOOL_ACCENT_SOFT = '#f7e7f8';

const guideTips = [
  'Click anywhere on the color rail to add a stop at that spot, or drag an existing marker to reposition it — arrow keys nudge the selected stop, Delete removes it.',
  'Linear gradients use an angle; radial gradients use a shape and position; conic gradients rotate around a starting angle and position.',
  'Reverse Colors flips the stop order without changing positions; Random Gradient keeps the current type but shuffles colors and positions.',
  'Download PNG renders the exact gradient you see to an image file, sized for use as a background or banner.',
];

export default function CssGradientGeneratorPage() {
  return (
    <div style={{ '--tool-accent': TOOL_ACCENT, '--tool-accent-soft': TOOL_ACCENT_SOFT } as CSSProperties}>
      {/* Minimal single-line top bar — the gradient studio itself is the focus, not a big header band */}
      <section className="pt-20 pb-4 sm:pt-24" style={{ background: 'var(--surface-white)' }}>
        <Container className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <a href="/tools" className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Tools
            </a>
            <span style={{ color: 'var(--border-color)' }}>/</span>
            <h1 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              CSS Gradient Generator
            </h1>
          </div>
          <ToolPrivacyIndicator />
        </Container>
      </section>

      <section className="pb-10 sm:pb-12" style={{ background: 'var(--surface-white)' }}>
        <Container className="flex flex-col gap-6">
          <GradientGenerator />
        </Container>
      </section>

      <section className="py-10 sm:py-12" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-8">
          <ToolGuideAccordion title="How it works" tips={guideTips} />
          <RelatedTools currentId="css-visual-generator" />
        </Container>
      </section>

      <section className="py-8 sm:py-10" style={{ background: 'var(--surface-white)' }}>
        <Container>
          <div className="flex flex-col items-start gap-4 rounded-2xl border-2 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8" style={{ borderColor: 'var(--tool-accent)', background: 'var(--tool-accent-soft)' }}>
            <div className="flex flex-col gap-1">
              <span className="eyebrow" style={{ color: 'var(--tool-accent)' }}>
                Need a custom design system?
              </span>
              <p className="max-w-xl text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                I can turn gradients, color systems, and UI details like this into a fast, polished WordPress site — built with Elementor, custom CSS, and clean, maintainable code.
              </p>
            </div>
            <Button href="/contact" variant="primary">
              Start a Project
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
