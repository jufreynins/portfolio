import type { Metadata } from 'next';
import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import SkillCard from '@/components/SkillCard';
import ContactCTA from '@/components/ContactCTA';
import { siteConfig } from '@/config/site';
import { techGroups } from '@/data/techSummary';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Expertise — WordPress Development & Website Operations — ${siteConfig.name}`,
  description: 'WordPress development, website operations, web systems, and AI-assisted development — the full scope of what I build and maintain.',
  canonical: `${siteConfig.url}/services`,
});

const capabilities = [
  {
    title: 'WordPress Development',
    description: 'Custom builds and dynamic content, start to finish.',
    items: ['Elementor Pro, ACF & JetEngine', 'Custom frontend work', 'Troubleshooting & maintenance'],
  },
  {
    title: 'Website Operations',
    description: 'Hosting, domains, and production support.',
    items: ['Hosting coordination (Cloudways, Hostinger)', 'Domain & DNS configuration', 'SSL, migrations & deployments'],
  },
  {
    title: 'Web Systems',
    description: 'Internal tools beyond page builders.',
    items: ['React & Next.js', 'TypeScript', 'Laravel'],
  },
  {
    title: 'AI-Assisted Development',
    description: 'Faster iteration, human-reviewed.',
    items: ['Claude Code', 'ChatGPT', 'Cursor'],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="pt-24 pb-10 sm:pt-28 sm:pb-12" style={{ background: 'var(--paper-000)' }}>
        <Container>
          <SectionHeading
            as="h1"
            title="WordPress first, with the range to go further."
            description="WordPress development and website operations are the core of what I do — with web systems and AI-assisted workflows supporting it."
          />
        </Container>
      </section>

      <section className="py-12 sm:py-16 lg:py-20" style={{ background: 'var(--paper-000)' }}>
        <Container className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {capabilities.map((capability) => (
            <SkillCard key={capability.title} title={capability.title} description={capability.description} items={capability.items} />
          ))}
        </Container>
      </section>

      <section className="py-12 sm:py-16 lg:py-20" style={{ background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading title="Tools and technologies." />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {techGroups.map((group) => (
              <SkillCard key={group.label} title={group.label} items={group.items} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16 lg:py-20" style={{ background: 'var(--paper-000)' }}>
        <Container className="flex flex-col items-start gap-5 border-t pt-10" style={{ borderColor: 'var(--line)' }}>
          <span className="eyebrow">Beyond Client Work</span>
          <p className="max-w-xl leading-relaxed" style={{ color: 'var(--ink-700)' }}>
            Alongside client work, I also build{' '}
            <a href="/systems" className="underline" style={{ color: 'var(--accent)' }}>
              personal systems
            </a>{' '}
            and{' '}
            <a href="/tools" className="underline" style={{ color: 'var(--accent)' }}>
              browser tools
            </a>
            .
          </p>
        </Container>
      </section>

      <ContactCTA eyebrow="Not sure which one you need?" title="Let's talk about your project." description="Tell me what you're building and I'll point you in the right direction." />
    </>
  );
}
