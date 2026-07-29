import type { Metadata } from 'next';
import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/Button';
import SeoMetaPreview from '@/components/SeoMetaPreview';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Free SEO Meta Preview Tool — Title & Description Snippet Checker | ${siteConfig.name}`,
  description: 'Preview how a page title and meta description will appear in Google search results on desktop and mobile, then copy ready-to-use meta tags. Runs entirely in your browser.',
  canonical: `${siteConfig.url}/tools/seo-meta-preview`,
});

const badges = ['Browser-based', 'No uploads', 'No storage', 'Free to use'];

const infoCards = [
  {
    title: 'Why length matters',
    body: 'Search engines truncate titles and descriptions that run too long, cutting them off with an ellipsis. Keeping both within a safe range helps your full message reach searchers.',
  },
  {
    title: 'Desktop vs. mobile',
    body: 'Mobile search results generally show less text than desktop before truncating. Check both views here so your snippet still makes sense either way.',
  },
  {
    title: 'These are guidelines, not guarantees',
    body: 'Google sometimes rewrites titles and descriptions automatically, and the real cutoff is based on pixel width, not a fixed character count. Treat this preview as a helpful approximation.',
  },
  {
    title: 'Everything happens locally',
    body: 'Your title, description, and URL are only used to render the preview in your browser. Nothing is sent to a server or stored anywhere.',
  },
];

export default function SeoMetaPreviewPage() {
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
            title="SEO Meta Preview"
            description="Preview how a page title and meta description will appear in search results, on both desktop and mobile, then copy ready-to-use meta tags."
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
              <strong>Private and secure:</strong> Your title, description, and URL stay in your browser to render the preview. Nothing is uploaded to a server or stored in a database.
            </p>
          </div>

          <SeoMetaPreview />
        </Container>
      </section>

      {/* Info */}
      <section style={{ background: 'var(--surface-warm)' }} className="py-12 sm:py-14">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Good to know" title="Getting the most out of your snippet" description="A quick primer on search snippet length and how this tool works." />
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
            eyebrow="Need SEO foundations built in?"
            title="Need help with your website's on-page SEO?"
            description="I can build clean, crawlable WordPress pages with proper titles, meta descriptions, and structured content baked in from the start — not bolted on afterward."
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
