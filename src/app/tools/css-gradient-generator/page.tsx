import type { Metadata } from 'next';
import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import Button from '@/components/Button';
import GradientGenerator from '@/components/GradientGenerator';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `CSS Gradient Generator – Create Linear, Radial & Conic Gradients | ${siteConfig.name}`,
  description: 'Create custom CSS gradients with live preview controls. Generate linear, radial, and conic gradients, copy the CSS, and download the result as a PNG.',
  canonical: `${siteConfig.url}/tools/css-gradient-generator`,
});

const badges = ['Browser-based', 'No uploads', 'No storage', 'Free to use'];

export default function CssGradientGeneratorPage() {
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
            title="CSS Gradient Generator"
            description="Design custom linear, radial, and conic gradients directly in your browser. Adjust the colors, positions, angles, and shape, then copy clean CSS or download the gradient as an image."
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
              <strong>Your gradient settings stay in your browser.</strong> Nothing is uploaded or stored on a server — every preview, export, and download happens locally on your device.
            </p>
          </div>

          <GradientGenerator />
        </Container>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--brand-dark)' }} className="dark-grid-bg py-14 sm:py-16">
        <Container className="flex flex-col items-start gap-6">
          <SectionHeading
            eyebrow="Need a custom design system?"
            title="Need help building this into a real website?"
            description="I can turn gradients, color systems, and UI details like this into a fast, polished WordPress site — built with Elementor, custom CSS, and clean, maintainable code."
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
