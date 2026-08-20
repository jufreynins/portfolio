import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
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
    label: 'Hosting & Migrations',
    items: ['Cloudways, Hostinger, GoDaddy', 'WHM & cPanel', 'WPVivid backup & restore', 'Staging-to-production deployment'],
  },
  {
    label: 'Domains & DNS',
    items: ['Nameserver updates', 'A, CNAME, MX & TXT records', 'DNS propagation checks', 'SPF, DKIM & DMARC'],
  },
  {
    label: 'SSL & Security',
    items: ['SSL installation & verification', 'Plugin/theme update management', 'Backup workflows', 'Basic hardening'],
  },
  {
    label: 'Troubleshooting & Support',
    items: ['WP_DEBUG & error logs', 'Plugin/theme conflict resolution', 'PHP & frontend errors', 'Form/email delivery issues'],
  },
];

const developmentSkills = ['PHP', 'HTML', 'CSS', 'JavaScript', 'MySQL', 'Dynamic WordPress functionality (ACF, JetEngine, custom post types)'];

const Check = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--accent)' }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function AboutPage() {
  return (
    <>
      {/* Introduction */}
      <section className="pt-24 pb-10 sm:pt-28 sm:pb-12" style={{ background: 'var(--paper-000)' }}>
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7" data-reveal data-reveal-type="fade-up">
            <SectionHeading as="h1" eyebrow="About" title="A WordPress developer who understands the technical setup behind it." />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5" data-reveal data-reveal-type="fade-up">
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

      {/* WordPress Experience */}
      <section id="career" className="py-12 sm:py-16 lg:py-20" style={{ background: 'var(--paper-000)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="WordPress Experience"
            title="Building and maintaining production WordPress websites."
            description="A run of freelance and contract engagements with agencies and direct clients, bracketing a multi-year in-house role — most of it WordPress work."
          />
          <ExperienceTimeline entries={experience} />
        </Container>
      </section>

      {/* Technical Website Operations */}
      <section className="py-12 sm:py-16 lg:py-20" style={{ background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Technical Website Operations"
            title="The setup behind the website."
            description="Hosting, migrations, domains, DNS, SSL, and troubleshooting — the operational side of running a WordPress site, not just building one."
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {websiteOperationsGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-3" data-reveal>
                <span className="eyebrow">{group.label}</span>
                <ul className="flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--ink-950)' }}>
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full" style={{ background: 'var(--accent)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Development Skills */}
      <section className="py-12 sm:py-16 lg:py-20" style={{ background: 'var(--paper-000)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading eyebrow="Development Skills" title="The code behind the WordPress work." />
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {developmentSkills.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--ink-950)' }} data-reveal>
                <Check />
                {item}
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Broader Technical Interests — intentionally brief, secondary */}
      <section className="py-10 sm:py-12" style={{ background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-2 border-t pt-8" style={{ borderColor: 'var(--line)' }}>
          <span className="eyebrow">Broader Technical Interests</span>
          <p className="max-w-2xl text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
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
