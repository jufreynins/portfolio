import type { Metadata } from 'next';
import ToolWorkspaceShell from '@/components/tools/ToolWorkspaceShell';
import FaviconGenerator from '@/components/FaviconGenerator';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Free Favicon Generator — Full Icon Set from One Image | ${siteConfig.name}`,
  description: 'Generate a complete favicon set — favicon.ico plus Apple touch and Android/PWA icons — from a single source image, directly in your browser. No uploads.',
  canonical: `${siteConfig.url}/tools/favicon-generator`,
});

const TOOL_ACCENT = '#be123c';
const TOOL_ACCENT_SOFT = '#f8e7eb';

const guideTips = [
  'This tool builds an actual multi-resolution favicon.ico (16, 32, and 48px in one file) — the format modern browsers and Windows both expect, not just a renamed PNG.',
  'Alongside favicon.ico, you get 180×180 (Apple touch icon), 192×192, and 512×512 PNGs for Android home screens and installable web apps.',
  'For the cleanest result, start with a square-ish image. Use Cover to crop a non-square image to fill the square, or Contain to fit the whole image with a background fill instead.',
  'Everything decodes and resizes locally in your browser using the Canvas API — your file is never uploaded.',
];

export default function FaviconGeneratorPage() {
  return (
    <ToolWorkspaceShell
      toolId="brand-asset-generator"
      accent={TOOL_ACCENT}
      accentSoft={TOOL_ACCENT_SOFT}
      title="Favicon Generator"
      description="Generate a full favicon set — favicon.ico plus Apple touch and Android/PWA icons — from a single source image."
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="4" width="16" height="16" rx="4" />
          <path d="M4 15l4-4a2 2 0 0 1 3 0l5 5" />
          <circle cx="9" cy="9" r="1.5" />
        </svg>
      }
      guideTitle="How it works"
      guideTips={guideTips}
      ctaEyebrow="Need it wired into your site?"
      ctaTitle="Need help getting your favicon and branding set up properly?"
      ctaDescription="I can implement favicons, touch icons, and web app manifests correctly across your WordPress site so they show up everywhere they should."
      ctaButtonLabel="Discuss Your Website"
    >
      <FaviconGenerator />
    </ToolWorkspaceShell>
  );
}
