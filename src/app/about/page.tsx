import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import SkillCard from '@/components/SkillCard';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import ContactCTA from '@/components/ContactCTA';
import { siteConfig } from '@/config/site';
import { experience } from '@/data/experience';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `About — WordPress Developer & Website Technical Specialist — ${siteConfig.name}`,
  description: 'A closer look at Jufrey Niño Bayog — WordPress specialization, technical website operations, hosting and DNS support, and AI-assisted development workflows.',
  canonical: `${siteConfig.url}/about`,
});

const { yearsExperience } = siteConfig;

const professionalFacts = [
  { label: 'Experience', value: `${yearsExperience}+ years building for the web` },
  { label: 'Focus', value: 'WordPress development, website management & technical operations' },
  { label: 'Workflow', value: 'AI-assisted with Claude Code and Cursor, human-reviewed' },
  { label: 'Availability', value: 'Remote, working with clients worldwide' },
];

const capabilityHighlights = ['WordPress development', 'Elementor Pro', 'Dynamic content (ACF, JetEngine)', 'Website management', 'Hosting, DNS & SSL', 'Troubleshooting & support'];

const websiteOperationsGroups = [
  {
    title: 'Hosting & Migrations',
    description: 'Where sites are hosted and deployed.',
    items: ['Cloudways, Hostinger, GoDaddy', 'WHM & cPanel', 'WPVivid backup & restore', 'Staging-to-production deployment'],
  },
  {
    title: 'Domains & DNS',
    description: 'Domain and DNS configuration.',
    items: ['Nameserver updates', 'A, CNAME, MX & TXT records', 'DNS propagation checks', 'SPF, DKIM & DMARC'],
  },
  {
    title: 'SSL & Security',
    description: 'Keeping sites secure and current.',
    items: ['SSL installation & verification', 'Plugin/theme update management', 'Backup workflows', 'Basic hardening'],
  },
  {
    title: 'Troubleshooting & Support',
    description: 'Diagnosing and resolving issues.',
    items: ['WP_DEBUG & error logs', 'Plugin/theme conflict resolution', 'PHP & frontend errors', 'Form/email delivery issues'],
  },
];

const developmentSkills = ['PHP', 'HTML', 'CSS', 'JavaScript', 'MySQL', 'ACF', 'JetEngine', 'Custom Post Types'];

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="pt-24 pb-12 sm:pt-28 sm:pb-16" style={{ background: 'var(--paper-000)' }}>
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="flex flex-col gap-5 lg:col-span-7" data-reveal data-reveal-type="fade-up">
            <SectionHeading as="h1" eyebrow="About" title="A WordPress developer who understands the technical setup behind it." />
            <p className="leading-relaxed" style={{ color: 'var(--ink-700)' }}>
              I&apos;m {siteConfig.name}, a WordPress developer with {yearsExperience}+ years building, maintaining, and troubleshooting business websites with Elementor Pro, ACF, and JetEngine —
              often alongside agencies and remote teams, following their existing design systems. My work also covers what happens after launch: hosting, domain and DNS configuration, SSL, and
              business email delivery.
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
            <div>
              <Button href={siteConfig.cvPath} variant="secondary" target="_blank" rel="noopener noreferrer">
                Download CV
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5" data-reveal data-reveal-type="fade-up">
            <div className="flex flex-col gap-6 rounded-[var(--radius-lg)] border p-6" style={{ background: 'var(--paper-050)', borderColor: 'var(--line)' }}>
              <div className="flex items-center gap-3">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] font-mono text-lg font-semibold"
                  style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                >
                  {siteConfig.initials}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold" style={{ color: 'var(--ink-950)' }}>
                    {siteConfig.name}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--ink-700)' }}>
                    WordPress Developer
                  </span>
                </div>
              </div>

              <dl className="flex flex-col divide-y" style={{ borderColor: 'var(--line)' }}>
                {professionalFacts.map((fact) => (
                  <div key={fact.label} className="flex flex-col gap-0.5 py-3 first:pt-0">
                    <dt className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--ink-400)' }}>
                      {fact.label}
                    </dt>
                    <dd className="text-sm" style={{ color: 'var(--ink-950)' }}>
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-wrap gap-1.5 border-t pt-4" style={{ borderColor: 'var(--line)' }}>
                {capabilityHighlights.map((item) => (
                  <span key={item} className="rounded-full border px-2.5 py-1 text-xs" style={{ borderColor: 'var(--line)', color: 'var(--ink-700)', background: 'var(--paper-000)' }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* WordPress Experience */}
      <section id="career" className="py-12 sm:py-16 lg:py-20" style={{ background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Experience"
            title="Building and maintaining production WordPress websites."
            description="A run of freelance and contract engagements with agencies and direct clients, bracketing a multi-year in-house role — most of it WordPress work."
          />
          <ExperienceTimeline entries={experience} />
        </Container>
      </section>

      {/* Technical Website Operations */}
      <section className="py-12 sm:py-16 lg:py-20" style={{ background: 'var(--paper-000)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Technical Operations"
            title="The setup behind the website."
            description="Hosting, migrations, domains, DNS, SSL, and troubleshooting — the operational side of running a WordPress site, not just building one."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {websiteOperationsGroups.map((group) => (
              <SkillCard key={group.title} title={group.title} description={group.description} items={group.items} />
            ))}
          </div>
        </Container>
      </section>

      {/* Development Skills + Broader Interests */}
      <section className="py-12 sm:py-16 lg:py-20" style={{ background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading eyebrow="Beyond WordPress" title="The code behind the work, and what's next to it." />
          <div className="flex flex-wrap gap-1.5" data-reveal>
            {developmentSkills.map((item) => (
              <span key={item} className="rounded-full border px-3 py-1.5 text-sm" style={{ borderColor: 'var(--line)', color: 'var(--ink-700)', background: 'var(--paper-000)' }}>
                {item}
              </span>
            ))}
          </div>
          <p className="max-w-2xl text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }} data-reveal>
            Outside client WordPress work, I build a handful of{' '}
            <a href="/systems" className="underline" style={{ color: 'var(--accent)' }}>
              personal web systems
            </a>{' '}
            with React, Next.js, and Laravel, and small{' '}
            <a href="/tools" className="underline" style={{ color: 'var(--accent)' }}>
              browser tools
            </a>
            , using Claude Code and other AI tools to move faster while reviewing every change by hand.
          </p>
        </Container>
      </section>

      <ContactCTA eyebrow="Let's build something" title="Ready to start a project?" description="Tell me a bit about what you're building. I typically reply within one business day." />
    </>
  );
}
