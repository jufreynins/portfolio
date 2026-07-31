import type { Metadata } from 'next';
import ToolWorkspaceShell from '@/components/tools/ToolWorkspaceShell';
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
    <ToolWorkspaceShell
      toolId="seo-social-preview"
      accent={TOOL_ACCENT}
      accentSoft={TOOL_ACCENT_SOFT}
      title="SEO Meta Preview"
      description="Preview how a page title and description will appear in search results, then copy ready-to-use meta tags."
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      }
      guideTitle="How it works"
      guideTips={guideTips}
      ctaEyebrow="Need SEO foundations built in?"
      ctaTitle="Need help with your website's on-page SEO?"
      ctaDescription="I can build clean, crawlable WordPress pages with proper titles, meta descriptions, and structured content baked in from the start — not bolted on afterward."
      ctaButtonLabel="Discuss Your Website"
    >
      <SeoMetaPreview />
    </ToolWorkspaceShell>
  );
}
