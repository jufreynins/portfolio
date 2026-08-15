import Image from 'next/image';
import type { Metadata } from 'next';
import Container from '@/components/Container';
import Bleed from '@/components/Bleed';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import ProjectSpread from '@/components/ProjectSpread';
import SystemPreview from '@/components/SystemPreview';
import ProcessTimeline from '@/components/ProcessTimeline';
import { siteConfig } from '@/config/site';
import { projects } from '@/data/projects';
import { systems, systemStatusStyle } from '@/data/systems';
import { TOOLS } from '@/data/tools';
import { processSteps } from '@/data/process';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} | WordPress and Web Systems Developer`,
  description: siteConfig.description,
  canonical: siteConfig.url,
});

const { yearsExperience } = siteConfig;

const credibilityPoints = [
  `${yearsExperience}+ Years of Web Development`,
  'WordPress and Elementor Specialist',
  'Dynamic Content and Frontend Development',
  'Personal Projects and Browser Tools',
  'Hosting, Domain, DNS and Email Support',
  'Agency and Remote Collaboration',
];

const technicalGroups = [
  {
    label: 'WordPress & Dynamic Content',
    items: ['Elementor Pro', 'Advanced Custom Fields', 'JetEngine', 'Custom Post Types', 'Dynamic templates', 'Search & filtering'],
  },
  {
    label: 'Frontend Development',
    items: ['HTML', 'CSS', 'JavaScript', 'Responsive implementation', 'UI troubleshooting', 'Reusable components'],
  },
  {
    label: 'Hosting, Domain, DNS & Email',
    items: ['Website migrations', 'Hosting coordination', 'Nameservers & DNS records', 'SSL verification', 'SPF, DKIM & DMARC', 'Form delivery testing'],
  },
  {
    label: 'Website Operations',
    items: ['Cloudways', 'Hostinger', 'GoDaddy', 'WHM & cPanel', 'WPVivid backups', 'Staging-to-production launch QA'],
  },
];

const aboutProofPoints = [
  'WordPress & Elementor Pro',
  'Web Systems & Dashboards',
  'Hosting, DNS & Email Setup',
  'Agency Collaboration',
  'AI-assisted, human-reviewed',
];

const [firstProject, secondProject, thirdProject] = projects;

// A representative spread across categories, not just the first N tools alphabetically/by-insertion-order.
const FEATURED_TOOL_IDS = ['dns-email-record-checker', 'website-launch-checklist', 'schema-markup-builder', 'image-toolkit', 'qr-code-generator'];
const featuredSystems = systems.filter((s) => s.screenshot).slice(0, 2);
const featuredTools = FEATURED_TOOL_IDS.map((id) => TOOLS.find((t) => t.id === id)).filter((tool): tool is (typeof TOOLS)[number] => !!tool);

const Check = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0" style={{ color: 'var(--accent)' }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section id="home" className="grid-overlay relative flex items-center overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20" style={{ background: 'var(--paper-000)' }} data-hero-section>
        <div className="pointer-events-none absolute inset-0 -z-10" data-hero-bg />

        <Container>
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10" data-hero-content>
            <div className="flex flex-col items-start gap-6 lg:col-span-7">
              <span className="eyebrow" data-hero-eyebrow>
                WordPress · Web Systems · Digital Tools
              </span>

              <h1 className="max-w-2xl text-balance" style={{ fontSize: 'var(--text-display)', lineHeight: 1.02, letterSpacing: '-0.03em' }}>
                <span className="block overflow-hidden">
                  <span className="block" data-hero-line>
                    Web Solutions
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="block" data-hero-line>
                    Built for Real
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="block" data-hero-line>
                    Business Work
                  </span>
                </span>
              </h1>

              <p className="max-w-lg leading-relaxed" style={{ color: 'var(--ink-700)', fontSize: 'var(--text-lead)' }} data-hero-support>
                I build professional WordPress websites, practical web systems, and browser-based tools — with the frontend, hosting, domain, DNS, and technical configuration needed to launch and maintain them reliably.
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-x-7 gap-y-4" data-hero-support>
                <Button href="/portfolio" variant="primary" size="large" data-magnetic="">
                  View Selected Work
                </Button>
                <Button href="/contact" variant="ghost">
                  Start a Project
                </Button>
              </div>

              <div className="meta-index flex flex-wrap items-center gap-x-3 gap-y-2 pt-1" style={{ color: 'var(--ink-400)' }} data-hero-support>
                <span className="inline-flex h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                WordPress · Elementor Pro · Web Systems · Hosting · DNS · Technical Support
              </div>
            </div>

            <div className="lg:col-span-5" data-hero-support>
              <div className="corner-marks overflow-hidden rounded-[var(--radius-md)]" style={{ color: 'var(--ink-950)' }}>
                <Image
                  src={firstProject.image}
                  alt={`${firstProject.name} website shown on desktop and mobile`}
                  width={900}
                  height={720}
                  priority
                  className="aspect-[5/4] w-full object-cover object-top"
                  style={{ background: 'var(--paper-050)' }}
                />
              </div>
              <p className="meta-index mt-3">FIG.01 — {firstProject.name.toUpperCase()} · LIVE CLIENT BUILD</p>
            </div>
          </div>
        </Container>

        <div className="meta-index pointer-events-none absolute inset-x-0 bottom-6 hidden flex-col items-center gap-2 lg:flex" style={{ color: 'var(--ink-400)' }} data-scroll-cue>
          <span>Scroll</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* Credibility strip */}
      <section className="py-7 sm:py-8" style={{ background: 'var(--paper-000)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <Container>
          <div className="meta-index flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:justify-between" style={{ color: 'var(--ink-700)' }} data-reveal>
            {credibilityPoints.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>
        </Container>
      </section>

      {/* Core Capabilities */}
      <section className="py-16 sm:py-20" style={{ background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-14">
          <SectionHeading
            eyebrow="Core Capabilities"
            title="Web Solutions for Business, Operations, and Growth"
            description="Three ways I help businesses get more from their website — professional WordPress builds, internal systems for real workflows, and free tools for common web tasks."
          />

          {/* WordPress Websites — full-width, image-led */}
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14" data-reveal>
            <div className="lg:col-span-6">
              <div className="corner-marks overflow-hidden rounded-[var(--radius-md)]" style={{ color: 'var(--ink-950)' }}>
                <Image
                  src={firstProject.image}
                  alt={`${firstProject.name} website preview`}
                  width={900}
                  height={620}
                  className="aspect-[16/11] w-full object-cover object-top"
                  style={{ background: 'var(--paper-000)' }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-6">
              <span className="eyebrow">WordPress Websites</span>
              <h3 className="text-2xl" style={{ color: 'var(--ink-950)' }}>
                Professional websites built to manage.
              </h3>
              <p className="max-w-md leading-relaxed" style={{ color: 'var(--ink-700)' }}>
                Responsive, manageable WordPress websites for businesses, agencies, nonprofits, and service providers — built on Elementor Pro and dynamic content.
              </p>
              <p className="meta-index" style={{ color: 'var(--ink-400)' }}>
                New builds · Elementor Pro · Dynamic WordPress · Redesigns &amp; maintenance
              </p>
              <Button href="/services" variant="ghost" className="mt-1 w-fit">
                Explore Services
              </Button>
            </div>
          </div>

          {/* Personal Projects + Web Tools — lighter, paired */}
          <div className="grid grid-cols-1 gap-10 border-t pt-12 sm:grid-cols-2 lg:gap-16" style={{ borderColor: 'var(--line)' }}>
            <div className="flex flex-col gap-4" data-reveal>
              <SystemPreview routeLabel="app.system/admin/overview" activeNav={1} />
              <span className="eyebrow mt-2">Personal Projects</span>
              <h3 className="text-xl" style={{ color: 'var(--ink-950)' }}>
                Internal systems built around real workflows.
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
                Admin dashboards and internal tools for task management, inventory, records, and reporting — designed around how a team actually works.
              </p>
              <Button href="/personal-projects" variant="ghost" className="mt-1 w-fit">
                View Personal Projects
              </Button>
            </div>

            <div className="flex flex-col gap-4" data-reveal>
              <div className="grid grid-cols-3 gap-2">
                {['image-toolkit', 'qr-code-generator', 'developer-data-toolkit']
                  .map((id) => TOOLS.find((t) => t.id === id))
                  .filter((tool): tool is (typeof TOOLS)[number] => !!tool)
                  .map((tool) => (
                    <div
                      key={tool.id}
                      className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-[var(--radius-sm)] border px-1"
                      style={{ borderColor: 'var(--line)', background: 'var(--paper-000)' }}
                    >
                      <span className="meta-index text-center leading-tight">{tool.title}</span>
                    </div>
                  ))}
              </div>
              <span className="eyebrow mt-2">Web Tools</span>
              <h3 className="text-xl" style={{ color: 'var(--ink-950)' }}>
                Free browser tools for everyday tasks.
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
                Focused browser utilities for common technical tasks — image conversion, SEO previews, favicons, and JSON formatting, processed locally.
              </p>
              <Button href="/tools" variant="ghost" className="mt-1 w-fit">
                Explore Web Tools
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Selected Client Work */}
      <section id="work" className="py-16 sm:py-20" style={{ background: 'var(--paper-000)' }}>
        <Container>
          <SectionHeading
            eyebrow="Selected Client Work"
            title="Websites built for real businesses."
            description="Recent WordPress projects — the client, the goal, and what I delivered."
          />
        </Container>

        <Bleed className="mt-14 flex flex-col gap-20 sm:mt-16 sm:gap-24">
          <ProjectSpread project={firstProject} index={1} priority />
          <ProjectSpread project={secondProject} index={2} reversed />
          <ProjectSpread project={thirdProject} index={3} />
        </Bleed>

        <Container className="mt-14 sm:mt-16">
          <Button href="/portfolio" variant="secondary" data-reveal>
            View All Client Work
          </Button>
        </Container>
      </section>

      {/* Featured Personal Projects */}
      <section className="py-16 sm:py-20" style={{ background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Featured Personal Projects"
            title="Internal systems built for real operations."
            description="Personal systems and prototypes — clearly labeled by status, not presented as client production work."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {featuredSystems.map((system) => {
              const statusStyle = systemStatusStyle[system.status];
              return (
                <a
                  key={system.slug}
                  href={`/personal-projects/${system.slug}`}
                  className="flex flex-col gap-4 overflow-hidden rounded-[var(--radius-md)] border p-6 transition-colors duration-300 hover:border-[var(--line-strong)]"
                  style={{ borderColor: 'var(--line)', background: 'var(--paper-000)' }}
                  data-reveal
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="eyebrow">{system.category}</span>
                      <h3 className="text-xl" style={{ color: 'var(--ink-950)' }}>
                        {system.name}
                      </h3>
                    </div>
                    <span
                      className="meta-index inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border px-3 py-1"
                      style={{ borderColor: statusStyle.border, color: statusStyle.color, background: statusStyle.bg }}
                    >
                      {system.status}
                    </span>
                  </div>
                  {system.screenshot && (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-sm)] border" style={{ borderColor: 'var(--line)' }}>
                      <Image src={system.screenshot} alt={`${system.name} dashboard screenshot`} className="h-full w-full object-cover object-top" />
                    </div>
                  )}
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
                    {system.problem}
                  </p>
                  <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
                    {system.modules.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--ink-950)' }}>
                        <Check />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </a>
              );
            })}
          </div>

          <Button href="/personal-projects" variant="secondary" data-reveal>
            View All Personal Projects
          </Button>
        </Container>
      </section>

      {/* Featured Tools */}
      <section className="py-16 sm:py-20" style={{ background: 'var(--paper-000)' }}>
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="Featured Tools"
            title="Free browser tools, ready to use."
            description="No account, uploads, or permanent storage — everything runs in your browser."
          />

          <div className="grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-5" style={{ borderColor: 'var(--line)' }} data-reveal data-reveal-type="stagger">
            {featuredTools.map((tool) => (
              <a key={tool.id} href={tool.href} className="group flex flex-col gap-2 py-5 transition-colors duration-300 sm:px-5">
                <span className="meta-index">{tool.category}</span>
                <h3 className="text-base font-bold transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ color: 'var(--ink-950)' }}>
                  {tool.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--ink-700)' }}>
                  {tool.purpose}
                </p>
              </a>
            ))}
          </div>

          <Button href="/tools" variant="secondary" data-reveal>
            Explore All Tools
          </Button>
        </Container>
      </section>

      {/* Technical Capabilities */}
      <section className="py-14 sm:py-16" style={{ background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Technical Capabilities"
            title="From WordPress Builds to Hosting, DNS, and Deployment"
            description="I connect websites to hosting and domains, configure required DNS and email records, verify SSL and form delivery, and support migrations from staging to production."
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {technicalGroups.map((group) => (
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

      {/* Process */}
      <section className="dark-grid-bg py-14 sm:py-16" style={{ background: 'var(--ink-canvas)' }}>
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[38fr_62fr] lg:gap-12">
          <div className="min-w-0">
            <div className="lg:sticky lg:top-32">
              <SectionHeading eyebrow="How I Work" title="A practical process from brief to launch." titleClass="max-w-[460px] break-words" dark />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <ProcessTimeline steps={processSteps} />
          </div>
        </Container>
      </section>

      {/* Short About */}
      <section id="about" className="py-14 sm:py-16" style={{ background: 'var(--paper-050)' }}>
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7" data-reveal data-reveal-type="fade-up">
            <span className="eyebrow">About</span>
            <h2 className="mt-2 max-w-xl text-balance">
              A <span style={{ color: 'var(--accent)' }}>WordPress developer</span> who also handles the technical side.
            </h2>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5" data-reveal data-reveal-type="fade-up">
            <p className="leading-relaxed" style={{ color: 'var(--ink-700)' }}>
              I build and improve WordPress websites, then handle what comes after: hosting setup, domain and DNS configuration, SSL, and business email delivery. Alongside client work, I also build personal web systems and browser tools. Every project is planned with AI-assisted tools, reviewed and finished by hand.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
              {yearsExperience}+ years of experience spanning an in-house role and freelance/contract work with agencies and direct clients across the United States, Canada, and the Philippines.
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {aboutProofPoints.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--ink-950)' }}>
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-6">
              <Button href="/about" variant="secondary">
                More About Me
              </Button>
              <Button href={siteConfig.cvPath} variant="ghost" target="_blank" rel="noopener noreferrer">
                Download CV
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section id="contact" className="dark-grid-bg py-16 sm:py-20" style={{ background: 'var(--ink-canvas)' }}>
        <Container className="flex flex-col items-start gap-6">
          <SectionHeading
            eyebrow="Contact"
            title="Ready to start a project?"
            description="Tell me what you're building — a website, an internal system, or technical setup like hosting and DNS. I'll recommend a practical next step."
            dark
          />
          <div className="flex flex-wrap items-center gap-6" data-reveal>
            <Button href="/contact" variant="primary" size="large" tone="dark">
              Start a Project
            </Button>
            <Button href="/portfolio" variant="ghost" tone="dark">
              View Selected Work
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
