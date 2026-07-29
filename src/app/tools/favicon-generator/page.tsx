import type { Metadata } from 'next';
import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/Button';
import FaviconGenerator from '@/components/FaviconGenerator';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Free Favicon Generator — Full Icon Set from One Image | ${siteConfig.name}`,
  description: 'Generate a complete favicon set — favicon.ico plus Apple touch and Android/PWA icons — from a single source image, directly in your browser. No uploads.',
  canonical: `${siteConfig.url}/tools/favicon-generator`,
});

const badges = ['Browser-based', 'No uploads', 'No storage', 'Free to use'];

const infoCards = [
  {
    title: 'A real multi-resolution .ico',
    body: 'This tool builds an actual favicon.ico file containing 16, 32, and 48px versions in one package — the format modern browsers and Windows both expect, not just a renamed PNG.',
  },
  {
    title: 'Covers Apple and Android too',
    body: 'Alongside favicon.ico, you get 180×180 (Apple touch icon), 192×192, and 512×512 PNGs for Android home screens and installable web apps.',
  },
  {
    title: 'Start with a square image',
    body: 'For the cleanest result, use a source image that’s already square. Non-square images are automatically center-cropped, which can trim the edges of a wide or tall logo.',
  },
  {
    title: 'Everything happens locally',
    body: 'This tool decodes and resizes your image entirely in your browser using the Canvas API. Your file is never uploaded, so it never leaves your device.',
  },
];

export default function FaviconGeneratorPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-24 pb-10 sm:pt-28 sm:pb-12" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-8">
          <a href="/tools" className="inline-flex w-fit items-center gap-2 text-sm font-medium transition-colors hover:text-zinc-900" style={{ color: 'var(--text-secondary)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Tools
          </a>

          <SectionHeading
            as="h1"
            eyebrow="Free Tool"
            title="Favicon Generator"
            description="Generate a full favicon set — favicon.ico plus Apple touch and Android/PWA icons — from a single source image. No uploads, no storage, and no account required."
          />

          <ul className="flex flex-wrap gap-3" aria-label="Trust indicators">
            {badges.map((label) => (
              <li key={label} className="flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)', color: 'var(--text-primary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--brand-primary)' }} aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {label}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Tool */}
      <section style={{ background: 'var(--surface-white)' }} className="py-12 sm:py-14">
        <Container className="flex flex-col gap-8">
          {/* Privacy notice */}
          <div className="flex items-start gap-3 rounded-2xl border p-4 sm:p-5" style={{ borderColor: 'var(--border-color)', background: 'var(--brand-soft)' }}>
            <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full" style={{ background: 'var(--brand-lavender)', color: 'var(--brand-primary)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4Z" />
              </svg>
            </span>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              <strong>Private and secure:</strong> Your image is processed directly in your browser. No files are uploaded to our server or stored in a database.
            </p>
          </div>

          <FaviconGenerator />
        </Container>
      </section>

      {/* Info */}
      <section style={{ background: 'var(--surface-warm)' }} className="py-12 sm:py-14">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Good to know" title="Getting a clean favicon set" description="A quick primer on favicon formats and how this tool works." />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {infoCards.map((card) => (
              <div key={card.title} className="flex flex-col gap-2">
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                  {card.title}
                </h3>
                <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--brand-dark)' }} className="dark-grid-bg py-14 sm:py-16">
        <Container className="flex flex-col items-start gap-6">
          <SectionHeading
            eyebrow="Need it wired into your site?"
            title="Need help getting your favicon and branding set up properly?"
            description="I can implement favicons, touch icons, and web app manifests correctly across your WordPress site so they show up everywhere they should."
            dark
          />
          <Button href="/contact" variant="primary" size="large">
            Discuss Your Website
          </Button>
        </Container>
      </section>
    </>
  );
}
