import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import ToolPrivacyIndicator from '@/components/tools/ToolPrivacyIndicator';
import ToolGuideAccordion from '@/components/tools/ToolGuideAccordion';
import RelatedTools from '@/components/tools/RelatedTools';
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

const steps = ['Upload', 'Preview sizes', 'Download'];

export default function FaviconGeneratorPage() {
  return (
    <div style={{ '--tool-accent': TOOL_ACCENT, '--tool-accent-soft': TOOL_ACCENT_SOFT } as CSSProperties}>
      {/* Numbered step strip instead of an icon+description header — matches the tool's 3-step workflow */}
      <section className="pt-20 pb-6 sm:pt-24" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-5">
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

          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-bold sm:text-2xl" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              Favicon Generator
            </h1>
            <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>
              {steps.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold" style={{ background: 'var(--tool-accent)', color: '#fff' }}>
                    {i + 1}
                  </span>
                  {step}
                  {i < steps.length - 1 && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--border-strong)' }}>
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="py-8 sm:py-10" style={{ background: 'var(--surface-white)' }}>
        <Container>
          <FaviconGenerator />
        </Container>
      </section>

      <section className="py-10 sm:py-12" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-8">
          <ToolGuideAccordion title="How it works" tips={guideTips} />
          <RelatedTools currentId="brand-asset-generator" />
        </Container>
      </section>

      <section className="dark-grid-bg py-10 sm:py-12" style={{ background: 'var(--brand-dark)' }}>
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="eyebrow" style={{ color: 'var(--brand-lavender)' }}>
              Need it wired into your site?
            </span>
            <h2 className="text-lg font-bold sm:text-xl" style={{ color: 'var(--text-on-dark)', fontFamily: 'var(--font-heading)' }}>
              Need help getting your favicon and branding set up properly?
            </h2>
            <p className="max-w-xl text-sm" style={{ color: 'var(--text-on-dark)', opacity: 0.75 }}>
              I can implement favicons, touch icons, and web app manifests correctly across your WordPress site so they show up everywhere they should.
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
