import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import ToolPrivacyIndicator from '@/components/tools/ToolPrivacyIndicator';
import ToolGuideAccordion from '@/components/tools/ToolGuideAccordion';
import RelatedTools from '@/components/tools/RelatedTools';
import JsonFormatter from '@/components/JsonFormatter';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Free JSON Formatter & Validator | ${siteConfig.name}`,
  description: 'Format, minify, and validate JSON directly in your browser. Instant error messages with line and column numbers, adjustable indentation, and one-click copy.',
  canonical: `${siteConfig.url}/tools/json-formatter`,
});

const TOOL_ACCENT = '#15803d';
const TOOL_ACCENT_SOFT = '#e7f8ee';

const guideTips = [
  'Format switches to a readable, indented view; Minify collapses it to a compact single line — useful when you need the smallest possible payload.',
  'Invalid JSON highlights the approximate error line in the input pane and shows the parser’s message with line and column when available — your input is never cleared.',
  '2 spaces, 4 spaces, or tabs — pick whatever matches your project’s formatting convention.',
  'Parsing and formatting run entirely in your browser using the native JSON API — nothing you paste here is uploaded or stored anywhere.',
];

export default function JsonFormatterPage() {
  return (
    <div style={{ '--tool-accent': TOOL_ACCENT, '--tool-accent-soft': TOOL_ACCENT_SOFT } as CSSProperties}>
      {/* Code-editor-style title bar instead of a generic icon+description header */}
      <section className="pt-24 pb-0 sm:pt-28">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-t-2xl border border-b-0 px-5 py-3" style={{ borderColor: 'var(--border-color)', background: 'var(--brand-ink)' }}>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#ef4444' }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#f59e0b' }} />
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: '#22c55e' }} />
              </div>
              <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                formatter.json
              </span>
            </div>
            <a href="/tools" className="inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Tools
            </a>
          </div>
        </Container>
      </section>

      <section className="pb-2 pt-6" style={{ background: 'var(--surface-white)' }}>
        <Container className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-xl font-bold sm:text-2xl" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              JSON Formatter
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Format, validate, and minify JSON in a split editor with line numbers.
            </p>
          </div>
          <ToolPrivacyIndicator />
        </Container>
      </section>

      <section className="pt-4 pb-10 sm:pb-12" style={{ background: 'var(--surface-white)' }}>
        <Container>
          <JsonFormatter />
        </Container>
      </section>

      <section className="py-10 sm:py-12" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-8">
          <ToolGuideAccordion title="How it works" tips={guideTips} />
          <RelatedTools currentId="developer-data-toolkit" />
        </Container>
      </section>

      <section className="dark-grid-bg py-10 sm:py-12" style={{ background: 'var(--brand-ink)' }}>
        <Container className="flex flex-col items-center gap-4 text-center">
          <span className="eyebrow" style={{ color: 'var(--tool-accent-soft)' }}>
            Need dynamic content wired up?
          </span>
          <h2 className="max-w-xl text-lg font-bold sm:text-xl" style={{ color: 'var(--text-on-dark)', fontFamily: 'var(--font-heading)' }}>
            Need help with ACF, JetEngine, or a custom data structure?
          </h2>
          <p className="max-w-xl text-sm" style={{ color: 'var(--text-on-dark)', opacity: 0.75 }}>
            I can build custom fields, dynamic content, and structured data setups on WordPress that hold up as your site grows.
          </p>
          <Button href="/contact" variant="primary">
            Start a Project
          </Button>
        </Container>
      </section>
    </div>
  );
}
