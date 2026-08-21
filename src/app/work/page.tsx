import type { Metadata } from 'next';
import Container from '@/components/Container';
import Bleed from '@/components/Bleed';
import SectionHeading from '@/components/SectionHeading';
import WorkList from '@/components/WorkList';
import ContactCTA from '@/components/ContactCTA';
import { siteConfig } from '@/config/site';
import { projects } from '@/data/projects';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Selected WordPress Work — ${siteConfig.name}`,
  description: 'Real WordPress websites built for businesses, agencies, and nonprofits, from marketing agencies to e-commerce and community organizations.',
  canonical: `${siteConfig.url}/work`,
});

export default function WorkPage() {
  return (
    <>
      <section className="pt-24 pb-10 sm:pt-28 sm:pb-12" style={{ background: 'var(--paper-000)' }}>
        <Container className="flex flex-col gap-4">
          <SectionHeading as="h1" title="Real WordPress client work." description="The business need, my role, and the WordPress technology behind each site." />
          <p className="text-sm" style={{ color: 'var(--ink-700)' }}>
            Every project below is completed client work. Looking for personal systems instead? See{' '}
            <a href="/systems" className="font-medium underline" style={{ color: 'var(--accent)' }}>
              Systems
            </a>
            .
          </p>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16 lg:pb-20" style={{ background: 'var(--paper-000)' }}>
        <Bleed>
          <WorkList projects={projects} />
        </Bleed>
      </section>

      <section className="border-t py-10 sm:py-12" style={{ borderColor: 'var(--line)', background: 'var(--paper-050)' }}>
        <Container className="flex flex-wrap items-center gap-x-8 gap-y-3" data-reveal>
          <span className="eyebrow">Also explore</span>
          <a href="/systems" className="text-sm font-bold transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--ink-950)' }}>
            Personal Systems →
          </a>
          <a href="/tools" className="text-sm font-bold transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--ink-950)' }}>
            Developer Tools →
          </a>
        </Container>
      </section>

      <ContactCTA
        title="Need a website like this one?"
        description="Tell me a bit about what you're building: a website, a web system, or the technical setup behind it."
      />
    </>
  );
}
