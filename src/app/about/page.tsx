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
  'Personal Projects (secondary interest)',
];

type ExperienceEntry = {
  period: string;
  role: string;
  org: string;
  summary: string;
  projects?: { client: string; period: string; detail: string }[];
};

const experience: ExperienceEntry[] = [
  {
    period: 'Jan 2024 — Present',
    role: 'Freelance / Contract WordPress Developer',
    org: 'Independent — Philippines, United States, Canada',
    summary:
      'Working independently with agencies and direct clients on fixed-scope WordPress projects — site builds, ongoing maintenance, hosting & DNS support, and migrations.',
    projects: [
      {
        client: 'Spirit Media (United States) — AI Agency',
        period: 'Jan – Jun 2026',
        detail:
          'Returned as an AI-Assisted Developer after the agency’s pivot from WordPress web design to AI-driven books and websites; contributed to AI-generated book production and platform workflows.',
      },
      {
        client: 'Business Registry Corporation (Canada)',
        period: 'May – Nov 2025',
        detail: 'WordPress development for business registration services; custom Gravity Forms workflows for government filings, including logic, validation, and secure submission handling.',
      },
      {
        client: 'Neighborhood Plumbing and Drain',
        period: 'Aug – Sep 2025',
        detail: 'Ongoing maintenance, service pages, and conversion-focused landing pages; content and blog management.',
      },
      {
        client: 'Whitehead Agency Group (Canada)',
        period: 'Jul 2024 – Apr 2025',
        detail: 'Led development across multiple client sites with Elementor, Bricks, WPBakery, and Divi; managed hosting, domains, DNS, backups, and migrations.',
      },
      {
        client: 'Rava Digital (Philippines)',
        period: 'Apr – Jun 2024',
        detail: 'Agency-client WordPress development, layout updates, responsive fixes, and performance improvements.',
      },
      {
        client: 'Spirit Media (United States)',
        period: 'Jan – Apr 2024',
        detail:
          'Converted Figma designs into fully functional WordPress builds; WP Rocket optimization and responsive testing. Engagement concluded as the agency shifted its model from WordPress web design to AI-driven books and websites.',
      },
    ],
  },
  {
    period: '2021 — 2023',
    role: 'Website Developer',
    org: 'National Meat Inspection Service — Philippines',
    summary:
      'Built and customized WordPress websites alongside internal system development; backend customization, updates, maintenance, and bug fixing.',
  },
  {
    period: '2019 — 2020',
    role: 'Freelance WordPress CMS Designer',
    org: 'Independent — Philippines',
    summary:
      'Designed user-friendly WordPress themes and templates, implemented plugins and widgets, and optimized for mobile responsiveness and on-page SEO. Clients: Meler Production, Elopement Wedding Planner, United Realty Group, Randell Tiongson Personal Finance.',
  },
];

const aiCapabilities = [
  'Website & landing page development',
  'WordPress development & troubleshooting',
  'Frontend development',
  'Web application & system development',
  'Code generation & refactoring',
  'Debugging',
  'UI/UX implementation',
  'Responsive & performance optimization',
  'API integration',
  'Deployment automation',
  'Technical documentation',
  'Code & security review',
  'Testing & QA',
  'Legacy code & existing codebase auditing',
];

const aiTools = ['Claude', 'Claude Code', 'ChatGPT', 'Cursor', 'GitHub'];

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
                Personal Projects
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
            <div>
              <Button href={siteConfig.cvPath} variant="secondary" target="_blank" rel="noopener noreferrer">
                Download CV
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Experience */}
      <section className="py-12 sm:py-14" style={{ background: 'var(--surface-white)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Experience"
            title="How the work has been organized."
            description="A run of freelance and contract engagements with agencies and direct clients, bracketing a multi-year in-house role."
          />
          <div className="flex flex-col divide-y" style={{ borderColor: 'var(--border-color)' }}>
            {experience.map((entry) => (
              <div key={`${entry.role}-${entry.period}`} className="grid grid-cols-1 gap-4 py-8 first:pt-0 lg:grid-cols-12 lg:gap-8" data-reveal>
                <div className="lg:col-span-3">
                  <span className="eyebrow" style={{ color: 'var(--brand-primary)' }}>
                    {entry.period}
                  </span>
                </div>
                <div className="flex flex-col gap-3 lg:col-span-9">
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {entry.role}
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {entry.org}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {entry.summary}
                  </p>
                  {entry.projects && (
                    <ul className="mt-2 flex flex-col gap-3">
                      {entry.projects.map((project) => (
                        <li key={project.client} className="flex flex-col gap-1 border-l-2 pl-4" style={{ borderColor: 'var(--border-color)' }}>
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                              {project.client}
                            </span>
                            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                              {project.period}
                            </span>
                          </div>
                          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                            {project.detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
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
            title="AI-assisted software & web development. Human-led execution."
            description="AI helps accelerate implementation, analysis, debugging, and repetitive development tasks — architecture, validation, testing, security decisions, deployment, and final quality control stay developer-driven."
          />
          <AIWorkflowVisual />

          <div className="grid grid-cols-1 gap-8 pt-4 lg:grid-cols-2">
            <div className="flex flex-col gap-3">
              <span className="eyebrow" style={{ color: 'var(--brand-primary)' }}>
                Where AI fits in
              </span>
              <div className="flex flex-wrap gap-2">
                {aiCapabilities.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border px-3 py-1.5 text-xs font-medium"
                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="eyebrow" style={{ color: 'var(--brand-primary)' }}>
                Tools
              </span>
              <div className="flex flex-wrap gap-2">
                {aiTools.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border px-3 py-1.5 text-xs font-medium"
                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="pt-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Stack is chosen per project, not applied uniformly — Astro or WordPress for marketing sites, Next.js and Supabase for web applications, and AI tools throughout to speed up
                implementation without skipping human review.
              </p>
            </div>
          </div>
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
