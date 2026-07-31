import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import ToolBreadcrumbs from '@/components/tools/ToolBreadcrumbs';
import StatusBadge from '@/components/tools/StatusBadge';
import ProcessingNote from '@/components/tools/ProcessingNote';
import ToolGuideAccordion from '@/components/tools/ToolGuideAccordion';
import RelatedTools from '@/components/tools/RelatedTools';
import MinifierTool from '@/components/tools/MinifierTool';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `HTML/CSS Minifier | ${siteConfig.name}`,
  description: 'Reduce HTML or CSS file size by safely stripping whitespace and comments, with a before/after size comparison.',
  canonical: `${siteConfig.url}/tools/html-css-minifier`,
});

const TOOL_ACCENT = '#b45309';
const TOOL_ACCENT_SOFT = '#faf0e1';

const guideTips = [
  'This is "Basic Minification": safe whitespace and comment removal, not a full parser-based optimizer — it never touches content inside strings, or inside <script>, <style>, <pre>, or <textarea>.',
  'For CSS, spaces are only removed directly around { } and ; — spaces inside selectors and calc() expressions are preserved on purpose.',
  'For maximum compression in production, pair this with build-time tooling (Webpack, Vite, a WordPress minification plugin) rather than relying on manual minification alone.',
  'On mobile, switch between the Input and Output panels using the tabs above the editor.',
];

export default function HtmlCssMinifierPage() {
  return (
    <div style={{ '--tool-accent': TOOL_ACCENT, '--tool-accent-soft': TOOL_ACCENT_SOFT } as CSSProperties}>
      <section className="pt-20 pb-5 sm:pt-24" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-3">
          <ToolBreadcrumbs category="Developer Utilities" title="HTML/CSS Minifier" />
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status="Available" />
            <ProcessingNote>Runs locally in your browser</ProcessingNote>
          </div>
          <h1 className="text-xl font-bold sm:text-2xl" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            HTML/CSS Minifier
          </h1>
          <p className="max-w-2xl text-sm" style={{ color: 'var(--text-secondary)' }}>
            Reduce HTML or CSS file size by safely stripping whitespace and comments, with a before/after size comparison.
          </p>
        </Container>
      </section>

      <section className="py-6 sm:py-8" style={{ background: 'var(--surface-white)' }}>
        <Container>
          <MinifierTool />
        </Container>
      </section>

      <section className="py-10 sm:py-12" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-8">
          <ToolGuideAccordion title="How it works" tips={guideTips} />
          <RelatedTools currentId="html-css-minifier" />
        </Container>
      </section>

      <section className="dark-grid-bg py-10 sm:py-12" style={{ background: 'var(--brand-dark)' }}>
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="eyebrow" style={{ color: 'var(--brand-lavender)' }}>
              Need real performance work?
            </span>
            <h2 className="text-lg font-bold sm:text-xl" style={{ color: 'var(--text-on-dark)', fontFamily: 'var(--font-heading)' }}>
              Need your whole site optimized, not just one file?
            </h2>
            <p className="max-w-xl text-sm" style={{ color: 'var(--text-on-dark)', opacity: 0.75 }}>
              I handle performance optimization, caching, and asset delivery as part of WordPress builds and audits.
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
