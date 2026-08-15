import type { Metadata } from 'next';
import Container from '@/components/Container';
import Bleed from '@/components/Bleed';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import PortfolioFilterGrid from '@/components/PortfolioFilterGrid';
import { siteConfig } from '@/config/site';
import { projects } from '@/data/projects';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Selected Websites & Client Work — ${siteConfig.name}`,
  description: 'Real WordPress websites built for businesses, agencies, and nonprofits — from marketing agencies to e-commerce and community organizations.',
  canonical: `${siteConfig.url}/portfolio`,
});

export default function PortfolioPage() {
  return (
    <>
      <section className="pt-28 pb-12 sm:pt-32 sm:pb-14" style={{ background: 'var(--paper-000)' }}>
        <Container className="flex flex-col gap-4">
          <SectionHeading
            as="h1"
            eyebrow="Portfolio"
            title="Selected WordPress projects."
            description="Real client work — the business need, my contribution, and the WordPress technology behind each site."
          />
          <p className="text-sm" style={{ color: 'var(--ink-700)' }}>
            Every project below is completed client work. Looking for personal projects instead? See{' '}
            <a href="/personal-projects" className="font-medium underline" style={{ color: 'var(--accent)' }}>
              Personal Projects
            </a>
            .
          </p>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20" style={{ background: 'var(--paper-000)' }}>
        <Bleed>
          <PortfolioFilterGrid projects={projects} />
        </Bleed>
      </section>

      {/* Personal Projects & Tools cross-sell (after client work, visually distinct) */}
      <section className="border-t py-14 sm:py-16" style={{ borderColor: 'var(--line)', background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading eyebrow="Also Explore" title="Personal Projects & Tools" description="Personal system concepts and browser-based tools — separate from the client work above." />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <a
              href="/personal-projects"
              className="flex flex-col gap-4 rounded-[var(--radius-md)] border p-6 transition-colors duration-300 hover:border-[var(--line-strong)]"
              style={{ borderColor: 'var(--line)', background: 'var(--paper-000)' }}
              data-reveal
            >
              <div className="flex items-start justify-between gap-3">
                <span className="eyebrow">Personal Concept</span>
              </div>
              <h3 className="text-lg" style={{ color: 'var(--ink-950)' }}>
                Personal Projects
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
                Personal system concepts and prototypes for task management, inventory, and internal operations.
              </p>
            </a>
            <a
              href="/tools"
              className="flex flex-col gap-4 rounded-[var(--radius-md)] border p-6 transition-colors duration-300 hover:border-[var(--line-strong)]"
              style={{ borderColor: 'var(--line)', background: 'var(--paper-000)' }}
              data-reveal
            >
              <div className="flex items-start justify-between gap-3">
                <span className="eyebrow">Free Tool</span>
              </div>
              <h3 className="text-lg" style={{ color: 'var(--ink-950)' }}>
                Tools
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
                Small privacy-focused utilities such as image conversion, with more planned.
              </p>
            </a>
          </div>
        </Container>
      </section>

      <section className="dark-grid-bg py-16 sm:py-20" style={{ background: 'var(--ink-canvas)' }}>
        <Container className="flex flex-col items-start gap-6">
          <SectionHeading eyebrow="Let's build something" title="Ready to start a project?" description="Tell me a bit about what you're building. I typically reply within one business day." dark />
          <Button href="/contact" variant="primary" size="large" tone="dark">
            Start a Project
          </Button>
        </Container>
      </section>
    </>
  );
}
