import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import TechGrid from '@/components/TechGrid';
import ProcessTimeline from '@/components/ProcessTimeline';
import AIWorkflowVisual from '@/components/AIWorkflowVisual';
import { siteConfig } from '@/config/site';
import { processSteps } from '@/data/process';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `About — WordPress & Web Systems Developer — ${siteConfig.name}`,
  description:
    'A closer look at Jufrey Niño Bayog — WordPress specialization, web systems, hosting and DNS support, agency collaboration, and the AI-assisted, human-led process behind every project.',
  canonical: `${siteConfig.url}/about`,
});

const { yearsExperience } = siteConfig;

const professionalFacts = [
  { label: 'Experience', value: `${yearsExperience}+ years building for the web` },
  { label: 'Focus', value: 'WordPress development, web systems & technical setup' },
  { label: 'Workflow', value: 'AI-assisted with Claude Code and Cursor, human-reviewed' },
  { label: 'Availability', value: 'Remote, working with clients worldwide' },
];

const capabilityHighlights = [
  'WordPress development',
  'Elementor Pro',
  'Dynamic content (ACF, JetEngine)',
  'Frontend customization',
  'Hosting, DNS & email setup',
  'Agency collaboration',
  'Web Systems (secondary interest)',
];

const technicalOpsGroups = [
  {
    label: 'Hosting & Migrations',
    items: ['Hosting environment review', 'WordPress migrations', 'WPVivid backup & restore', 'Staging-to-production deployment'],
  },
  {
    label: 'Domain & DNS',
    items: ['Nameserver updates', 'A, CNAME, MX & TXT records', 'DNS propagation checks', 'Domain & subdomain connection'],
  },
  {
    label: 'SSL & Email Delivery',
    items: ['SSL installation & verification', 'SPF, DKIM & DMARC setup', 'WordPress form delivery testing', 'WP Mail SMTP / Post SMTP configuration'],
  },
  {
    label: 'Launch & Operations',
    items: ['Cloudways, Hostinger, GoDaddy', 'WHM & cPanel', 'Cache configuration', 'Launch checks & QA'],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <section className="pt-24 pb-12 sm:pt-28 sm:pb-14" style={{ background: 'var(--surface-warm)' }}>
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7" data-reveal data-reveal-type="fade-up">
            <SectionHeading as="h1" eyebrow="About" title="A developer who understands both the interface and the technical setup behind it." />
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5" data-reveal data-reveal-type="fade-up">
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              I&apos;m {siteConfig.name}, a WordPress developer with {yearsExperience}+ years building business websites and dynamic-content sites with Elementor Pro, ACF, and
              JetEngine — often alongside agencies and remote teams, following their existing design systems. My work also covers what happens after launch: hosting, domain and DNS
              configuration, and business email delivery.
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              As a secondary interest, I also build{' '}
              <a href="/personal-projects" className="underline" style={{ color: 'var(--brand-primary)' }}>
                Web Systems
              </a>{' '}
              and{' '}
              <a href="/tools" className="underline" style={{ color: 'var(--brand-primary)' }}>
                Tools
              </a>{' '}
              — a way to explore problems beyond page-builder work.
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {capabilityHighlights.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--brand-primary)' }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <dl className="flex flex-col divide-y" style={{ borderColor: 'var(--border-color)' }}>
              {professionalFacts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-3 gap-4 py-4">
                  <dt className="eyebrow col-span-1">{fact.label}</dt>
                  <dd className="col-span-2 text-sm" style={{ color: 'var(--text-primary)' }}>
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Skills */}
      <section className="py-12 sm:py-14" style={{ background: 'var(--surface-white)' }}>
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="relative overflow-hidden lg:sticky lg:top-32">
              <SectionHeading
                eyebrow="Skills & Technology"
                title="Tools that power my work"
                description="WordPress, Elementor Pro, dynamic content, frontend development, hosting, and AI-assisted development tools."
              />
            </div>
          </div>
          <div className="lg:col-span-8">
            <TechGrid />
          </div>
        </Container>
      </section>

      {/* Technical Web Operations */}
      <section className="py-12 sm:py-14" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Technical Web Operations"
            title="The setup behind the website."
            description="My work also covers what comes after launch. I coordinate hosting environments, migrate WordPress installations, connect domains, configure DNS and email-authentication records, verify SSL, test form delivery, and support staging-to-production launches."
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {technicalOpsGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-3" data-reveal>
                <span className="eyebrow" style={{ color: 'var(--brand-primary)' }}>
                  {group.label}
                </span>
                <ul className="flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-primary)' }}>
                      <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full" style={{ background: 'var(--brand-primary)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="dark-grid-bg py-12 sm:py-14" style={{ background: '#25134f' }}>
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[38fr_62fr] lg:gap-12">
          <div className="min-w-0">
            <div className="lg:sticky lg:top-32">
              <SectionHeading eyebrow="How I Work" title="A practical process from brief to launch." titleClass="max-w-[460px] break-words" dark />
            </div>
          </div>

          <div>
            <ProcessTimeline steps={processSteps} />
          </div>
        </Container>
      </section>

      {/* AI-assisted development */}
      <section className="py-12 sm:py-14" style={{ background: 'var(--surface-white)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Workflow"
            title="AI-assisted development. Human-led execution."
            description="I use Claude Code and Cursor for planning and scaffolding — architecture, design judgment, and final review stay human-led."
          />
          <AIWorkflowVisual />
        </Container>
      </section>

      {/* CTA */}
      <section className="dark-grid-bg py-14 sm:py-16" style={{ background: 'var(--brand-dark)' }}>
        <Container className="flex flex-col items-start gap-6">
          <SectionHeading eyebrow="Let's build something" title="Ready to start a project?" description="Tell me a bit about what you're building. I typically reply within one business day." dark />
          <Button href="/contact" variant="primary" size="large">
            Start a Project
          </Button>
        </Container>
      </section>
    </>
  );
}
