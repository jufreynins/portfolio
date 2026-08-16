import type { Metadata } from 'next';
import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import TechGroup from '@/components/TechGroup';
import ContactCTA from '@/components/ContactCTA';
import { siteConfig } from '@/config/site';
import { techGroups } from '@/data/techSummary';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `What I Work With — ${siteConfig.name}`,
  description: 'WordPress development, web systems, web operations, and AI-assisted development — the full scope of what I build and maintain.',
  canonical: `${siteConfig.url}/services`,
});

const capabilities = [
  {
    title: 'WordPress Development',
    description:
      'Custom WordPress builds and dynamic content with Elementor Pro, ACF, and JetEngine — plus the custom frontend work, troubleshooting, and maintenance that keeps a site reliable after launch.',
  },
  {
    title: 'Web Systems',
    description: 'React, Next.js, TypeScript, and Laravel for internal tools and workflows that go beyond what a page builder can deliver on its own.',
  },
  {
    title: 'Web Operations',
    description: 'Hosting coordination, domain and DNS configuration, SSL verification, migrations, deployments, and production troubleshooting across GitHub, Cloudflare, and common hosting providers.',
  },
  {
    title: 'AI-Assisted Development',
    description:
      'Claude Code, ChatGPT, and Cursor integrated into the day-to-day workflow — for faster iteration, research, and debugging support. Technical judgment and final review stay human, on every change.',
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="pt-28 pb-12 sm:pt-32 sm:pb-14" style={{ background: 'var(--paper-000)' }}>
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Capabilities"
            title="What I work with."
            description="WordPress development, web systems, web operations, and AI-assisted development — the full scope of what I build and maintain."
          />
        </Container>
      </section>

      <section className="py-14 sm:py-16" style={{ background: 'var(--paper-000)' }}>
        <Container className="flex flex-col gap-10 divide-y" style={{ borderColor: 'var(--line)' }}>
          {capabilities.map((capability, i) => (
            <div key={capability.title} className="grid grid-cols-1 gap-4 pt-10 first:pt-0 lg:grid-cols-12 lg:gap-8" data-reveal>
              <div className="lg:col-span-1">
                <span className="font-mono text-sm" style={{ color: 'var(--line-strong)' }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="lg:col-span-4">
                <h2 className="text-2xl" style={{ color: 'var(--ink-950)' }}>
                  {capability.title}
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="max-w-xl leading-relaxed" style={{ color: 'var(--ink-700)' }}>
                  {capability.description}
                </p>
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-14 sm:py-16" style={{ background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading eyebrow="Technology" title="Tools and technologies." />
          <TechGroup groups={techGroups} />
        </Container>
      </section>

      <section className="py-14 sm:py-16" style={{ background: 'var(--paper-000)' }}>
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
