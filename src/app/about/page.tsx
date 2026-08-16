import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import TechGroup from '@/components/TechGroup';
import ContactCTA from '@/components/ContactCTA';
import { siteConfig } from '@/config/site';
import { experience } from '@/data/experience';
import { techGroups } from '@/data/techSummary';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `About — WordPress & Web Systems Developer — ${siteConfig.name}`,
  description: 'A closer look at Jufrey Niño Bayog — WordPress specialization, web systems, hosting and DNS support, agency collaboration, and AI-assisted development workflows.',
  canonical: `${siteConfig.url}/about`,
});

const { yearsExperience } = siteConfig;

const professionalFacts = [
  { label: 'Experience', value: `${yearsExperience}+ years building for the web` },
  { label: 'Focus', value: 'WordPress development, web systems & technical operations' },
  { label: 'Workflow', value: 'AI-assisted with Claude Code and Cursor, human-reviewed' },
  { label: 'Availability', value: 'Remote, working with clients worldwide' },
];

const capabilityHighlights = ['WordPress development', 'Elementor Pro', 'Dynamic content (ACF, JetEngine)', 'Frontend customization', 'Hosting, DNS & email setup', 'Agency collaboration'];

const evolution = ['WordPress', 'Dynamic Websites', 'Technical Operations', 'Web Systems', 'AI-Assisted Development'];

const currentFocus = [
  { title: 'WordPress', description: 'Custom builds, dynamic content, and ongoing maintenance for businesses and agencies.' },
  { title: 'Web Systems', description: 'React, Next.js, TypeScript, and Laravel for internal tools that go beyond page-builder work.' },
  { title: 'AI Web Operations', description: 'Hosting, DNS, and deployment workflows accelerated by AI tools, with every change reviewed by hand.' },
];

const Check = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function AboutPage() {
  return (
    <>
      {/* Introduction */}
      <section className="pt-28 pb-14 sm:pt-32 sm:pb-16" style={{ background: 'var(--paper-000)' }}>
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7" data-reveal data-reveal-type="fade-up">
            <SectionHeading as="h1" eyebrow="About" title="A developer who understands both the interface and the technical setup behind it." />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5" data-reveal data-reveal-type="fade-up">
            <p className="leading-relaxed" style={{ color: 'var(--ink-700)' }}>
              I&apos;m {siteConfig.name}, a WordPress developer with {yearsExperience}+ years building business websites and dynamic-content sites with Elementor Pro, ACF, and JetEngine — often
              alongside agencies and remote teams, following their existing design systems. My work also covers what happens after launch: hosting, domain and DNS configuration, and business
              email delivery.
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--ink-700)' }}>
              Alongside client work, I also build{' '}
              <a href="/systems" className="underline" style={{ color: 'var(--accent)' }}>
                personal systems
              </a>{' '}
              and{' '}
              <a href="/tools" className="underline" style={{ color: 'var(--accent)' }}>
                browser tools
              </a>{' '}
              — a way to explore problems beyond page-builder work.
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {capabilityHighlights.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--ink-950)' }}>
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
            <dl className="flex flex-col divide-y" style={{ borderColor: 'var(--line)' }}>
              {professionalFacts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-3 gap-4 py-4">
                  <dt className="eyebrow col-span-1">{fact.label}</dt>
                  <dd className="col-span-2 text-sm" style={{ color: 'var(--ink-950)' }}>
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div>
              <Button href={siteConfig.cvPath} variant="secondary" target="_blank" rel="noopener noreferrer">
                Download CV
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Career */}
      <section id="career" className="py-14 sm:py-16" style={{ background: 'var(--paper-000)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading eyebrow="Career" title="How the work has been organized." description="A run of freelance and contract engagements with agencies and direct clients, bracketing a multi-year in-house role." />
          <ExperienceTimeline entries={experience} />
        </Container>
      </section>

      {/* Areas of Expertise */}
      <section className="py-14 sm:py-16" style={{ background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading eyebrow="Areas of Expertise" title="Where I focus." />
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {capabilityHighlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--ink-950)' }} data-reveal>
                <Check />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Evolution of My Work */}
      <section className="py-14 sm:py-16" style={{ background: 'var(--paper-000)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading eyebrow="Evolution" title="Evolution of my work." />
          <div className="flex flex-wrap items-center gap-3" data-reveal data-reveal-type="stagger">
            {evolution.map((stage, i) => (
              <span key={stage} className="flex items-center gap-3">
                <span className="text-sm font-bold" style={{ color: i === evolution.length - 1 ? 'var(--accent)' : 'var(--ink-950)' }}>
                  {stage}
                </span>
                {i < evolution.length - 1 && (
                  <span aria-hidden="true" style={{ color: 'var(--ink-400)' }}>
                    →
                  </span>
                )}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Current Focus */}
      <section className="py-14 sm:py-16" style={{ background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading eyebrow="Current Focus" title="What I'm focused on now." />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {currentFocus.map((item) => (
              <div key={item.title} className="flex flex-col gap-2" data-reveal>
                <h3 className="text-lg" style={{ color: 'var(--ink-950)' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Technology */}
      <section className="py-14 sm:py-16" style={{ background: 'var(--paper-000)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading eyebrow="Technology" title="Tools that power my work." />
          <TechGroup groups={techGroups} />
        </Container>
      </section>

      <ContactCTA eyebrow="Let's build something" title="Ready to start a project?" description="Tell me a bit about what you're building. I typically reply within one business day." />
    </>
  );
}
