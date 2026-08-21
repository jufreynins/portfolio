import type { Metadata } from 'next';
import Container from '@/components/Container';
import ToolPageChrome from '@/components/tools/ToolPageChrome';
import ToolPrivacyIndicator from '@/components/tools/ToolPrivacyIndicator';
import GradientGenerator from '@/components/GradientGenerator';
import { siteConfig } from '@/config/site';
import { getToolById } from '@/data/tools';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `CSS Gradient Generator – Create Linear, Radial & Conic Gradients | ${siteConfig.name}`,
  description: 'Create custom CSS gradients with live preview controls. Generate linear, radial, and conic gradients, copy the CSS, and download the result as a PNG.',
  canonical: `${siteConfig.url}/tools/css-gradient-generator`,
});

const tool = getToolById('css-visual-generator')!;

const guideTips = [
  'Click anywhere on the color rail to add a stop at that spot, or drag an existing marker to reposition it. Arrow keys nudge the selected stop, Delete removes it.',
  'Linear gradients use an angle; radial gradients use a shape and position; conic gradients rotate around a starting angle and position.',
  'Reverse Colors flips the stop order without changing positions; Random Gradient keeps the current type but shuffles colors and positions.',
  'Download PNG renders the exact gradient you see to an image file, sized for use as a background or banner.',
];

// Minimal single-line top bar — the gradient studio itself is the focus, not a big header band
const header = (
  <section className="pt-28 pb-4 sm:pt-32" style={{ background: 'var(--paper-000)' }}>
    <Container className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <a href="/tools" className="inline-flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--ink-700)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Tools
        </a>
        <span style={{ color: 'var(--line)' }}>/</span>
        <h1 className="text-lg" style={{ color: 'var(--ink-950)' }}>
          CSS Gradient Generator
        </h1>
      </div>
      <ToolPrivacyIndicator />
    </Container>
  </section>
);

export default function CssGradientGeneratorPage() {
  return (
    <ToolPageChrome
      tool={tool}
      header={header}
      guideTips={guideTips}
      cta={{
        eyebrow: 'Need a custom design system?',
        description:
          'I can turn gradients, color systems, and UI details like this into a fast, polished WordPress site, built with Elementor, custom CSS, and clean, maintainable code.',
        variant: 'light',
      }}
    >
      <GradientGenerator />
    </ToolPageChrome>
  );
}
