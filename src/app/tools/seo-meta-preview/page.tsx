import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import ToolPrivacyIndicator from '@/components/tools/ToolPrivacyIndicator';
import ToolGuideAccordion from '@/components/tools/ToolGuideAccordion';
import RelatedTools from '@/components/tools/RelatedTools';
import SeoMetaPreview from '@/components/SeoMetaPreview';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Free SEO Meta Preview Tool — Title & Description Snippet Checker | ${siteConfig.name}`,
  description: 'Preview how a page title and meta description will appear in Google search results on desktop and mobile, then copy ready-to-use meta tags. Runs entirely in your browser.',
  canonical: `${siteConfig.url}/tools/seo-meta-preview`,
});

const TOOL_ACCENT = '#4338ca';
const TOOL_ACCENT_SOFT = '#e9e7f8';

const guideTips = [
  'Search engines truncate titles and descriptions that run too long — the pixel-width bars approximate that cutoff more closely than a character count alone.',
  'Mobile search results generally show less text than desktop before truncating — check both device previews here.',
  'These are guidelines, not guarantees: Google sometimes rewrites titles and descriptions automatically regardless of length.',
  'Everything here runs locally in your browser — your title, description, and URL are only used to render the preview.',
];

export default function SeoMetaPreviewPage() {
  return (
    <div style={{ '--tool-accent': TOOL_ACCENT, '--tool-accent-soft': TOOL_ACCENT_SOFT } as CSSProperties}>
      {/* Browser address-bar chrome — sets the "search result simulator" framing immediately */}
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
          <div className="flex items-center gap-3 rounded-full border px-5 py-3 shadow-sm" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--tool-accent)' }}>
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              SEO Meta Preview
            </span>
            <span className="hidden text-xs sm:inline" style={{ color: 'var(--text-secondary)' }}>
              — see how your title and description render in search results
            </span>
          </div>
        </Container>
      </section>

      <section className="py-8 sm:py-10" style={{ background: 'var(--surface-white)' }}>
        <Container>
          <SeoMetaPreview />
        </Container>
      </section>

      <section className="py-10 sm:py-12" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-8">
          <ToolGuideAccordion title="How it works" tips={guideTips} />
          <RelatedTools currentId="seo-social-preview" />
        </Container>
      </section>

      <section className="py-10 sm:py-12" style={{ background: 'var(--surface-white)' }}>
        <Container className="flex flex-col items-start gap-4 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8" style={{ background: 'var(--tool-accent-soft)' }}>
          <div className="flex flex-col gap-1">
            <span className="eyebrow" style={{ color: 'var(--tool-accent)' }}>
              Need SEO foundations built in?
            </span>
            <p className="max-w-xl text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              I can build clean, crawlable WordPress pages with proper titles, meta descriptions, and structured content baked in from the start — not bolted on afterward.
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
