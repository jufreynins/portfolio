import type { Metadata } from 'next';
import Image from 'next/image';
import Container from '@/components/Container';
import Bleed from '@/components/Bleed';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import ProjectFeature from '@/components/ProjectFeature';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import TechGroup from '@/components/TechGroup';
import BrowserFrame from '@/components/BrowserFrame';
import ContactCTA from '@/components/ContactCTA';
import { siteConfig } from '@/config/site';
import { projects } from '@/data/projects';
import { systems, type System } from '@/data/systems';
import { TOOLS } from '@/data/tools';
import { experience } from '@/data/experience';
import { techGroups } from '@/data/techSummary';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} | WordPress Developer & Website Technical Specialist`,
  description: siteConfig.description,
  canonical: siteConfig.url,
});

const { yearsExperience } = siteConfig;

const featuredProjects = projects.filter((p) => p.featured);
const heroProject = featuredProjects[0];
const featuredSystems = systems.filter(
  (s): s is System & { screenshot: NonNullable<System['screenshot']> } => Boolean(s.featured && s.screenshot)
);
const featuredTools = TOOLS.filter((t) => t.featured);

const wordpressCapabilities = [
  {
    title: 'WordPress Development',
    description: 'Custom layouts, Elementor Pro, Gutenberg, dynamic content with ACF and JetEngine, responsive implementation and frontend customization.',
  },
  {
    title: 'Website Management',
    description: 'Ongoing updates, content management, plugin and theme maintenance, backups, and production support for live sites.',
  },
  {
    title: 'Troubleshooting',
    description: 'Plugin conflicts, theme issues, PHP errors, frontend bugs, and form issues — reproduced and resolved.',
  },
  {
    title: 'Hosting & Deployment',
    description: 'Cloudways, Hostinger, GoDaddy, WHM/cPanel, staging environments, migrations, and deployment.',
  },
  {
    title: 'Domains, DNS & SSL',
    description: 'Domain configuration, A/CNAME/MX/TXT records, DNS troubleshooting, SSL setup, and email-authentication records.',
  },
  {
    title: 'Performance & Technical SEO',
    description: 'Caching, image optimization, redirects, GA4 and Search Console setup, and core technical SEO basics.',
  },
];

const websiteOperationsGroups = [
  {
    label: 'Hosting',
    items: ['Cloudways', 'Hostinger', 'GoDaddy', 'WHM & cPanel'],
  },
  {
    label: 'Domains & DNS',
    items: ['Nameserver updates', 'A, CNAME, MX & TXT records', 'DNS propagation checks', 'Domain & subdomain connection'],
  },
  {
    label: 'SSL & Security',
    items: ['SSL installation & verification', 'SPF, DKIM & DMARC setup', 'Form-delivery testing', 'Plugin/theme update management'],
  },
  {
    label: 'Migrations & Deployment',
    items: ['WordPress migrations', 'WPVivid backup & restore', 'Staging-to-production deployment', 'GitHub-based deployment workflows'],
  },
  {
    label: 'Monitoring & Maintenance',
    items: ['Ongoing updates', 'Content management', 'Performance monitoring', 'Broken link & form checks'],
  },
  {
    label: 'Troubleshooting & Support',
    items: ['WP_DEBUG & error logs', 'Plugin/theme conflict resolution', 'Frontend CSS/JS bugs', 'FTP/cPanel access & fixes'],
  },
];

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
                {siteConfig.name}
              </span>

              <h1 className="max-w-2xl text-balance" style={{ fontSize: 'var(--text-display)', lineHeight: 1.02, letterSpacing: '-0.03em' }}>
                <span className="block overflow-hidden">
                  <span className="block" data-hero-line>
                    WordPress Developer
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="block" data-hero-line>
                    &amp; Website Technical Specialist
                  </span>
                </span>
              </h1>

              <p className="meta-index" style={{ color: 'var(--accent)' }} data-hero-support>
                {yearsExperience}+ Years of Web Development Experience
              </p>

              <p className="max-w-lg leading-relaxed" style={{ color: 'var(--ink-700)', fontSize: 'var(--text-lead)' }} data-hero-support>
                I build, maintain, troubleshoot, and manage production WordPress websites — from custom layouts and dynamic content to hosting, DNS, migrations, integrations, performance, and
                ongoing technical support.
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-x-7 gap-y-4" data-hero-support>
                <Button href="/work" variant="primary" size="large">
                  View WordPress Work
                </Button>
                <Button href={siteConfig.cvPath} variant="ghost" target="_blank" rel="noopener noreferrer">
                  Download CV
                </Button>
              </div>

              <div className="flex flex-col gap-2 pt-1" data-hero-support>
                <a href="/about" className="w-fit text-sm font-bold transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--ink-950)' }}>
                  About Me →
                </a>
                <span className="meta-index flex items-center gap-2" style={{ color: 'var(--ink-400)' }}>
                  <span className="inline-flex h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  Open to remote WordPress opportunities
                </span>
              </div>
            </div>

            {heroProject && (
              <div className="lg:col-span-5" data-hero-support>
                <BrowserFrame label={heroProject.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}>
                  <Image
                    src={heroProject.image}
                    alt={`${heroProject.name} website preview`}
                    width={900}
                    height={720}
                    priority
                    className="aspect-[5/4] w-full object-cover object-top"
                    style={{ background: 'var(--paper-050)' }}
                  />
                </BrowserFrame>
                <p className="meta-index mt-3">{heroProject.name.toUpperCase()} · LIVE WORDPRESS BUILD</p>
              </div>
            )}
          </div>
        </Container>

        <div className="meta-index pointer-events-none absolute inset-x-0 bottom-6 hidden flex-col items-center gap-2 lg:flex" style={{ color: 'var(--ink-400)' }} data-scroll-cue>
          <span>Scroll</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* What I Handle in WordPress */}
      <section className="py-16 sm:py-20" style={{ background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="What I Handle" title="More than page building." description="A WordPress website's lifecycle doesn't end at launch — here's what I cover across it." />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {wordpressCapabilities.map((item) => (
              <div key={item.title} className="flex flex-col gap-2.5" data-reveal>
                <h3 className="text-base font-semibold" style={{ color: 'var(--ink-950)' }}>
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

      {/* Selected WordPress Work */}
      <section id="work" className="py-16 sm:py-20" style={{ background: 'var(--paper-000)' }}>
        <Container>
          <SectionHeading eyebrow="Selected WordPress Work" title="Websites built for real businesses." description="Real WordPress client projects — the business, my role, and what I delivered." />
        </Container>

        <Bleed className="mt-10 flex flex-col gap-12 sm:mt-12 sm:gap-16">
          {featuredProjects.map((project, i) => (
            <ProjectFeature key={project.slug} project={project} index={i + 1} priority={i === 0} />
          ))}
        </Bleed>

        <Container className="mt-14 sm:mt-16">
          <Button href="/work" variant="secondary" data-reveal>
            View All WordPress Work
          </Button>
        </Container>
      </section>

      {/* Website Operations & Support */}
      <section className="py-16 sm:py-20" style={{ background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Website Operations"
            title="I also handle what happens after the build."
            description="Hosting, domains, DNS, SSL, migrations, monitoring, and troubleshooting — the operational side that keeps a WordPress site running, not just launched."
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Experience */}
      <section className="py-16 sm:py-20" style={{ background: 'var(--paper-000)' }}>
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Experience" title={`${yearsExperience}+ Years of Web Development Experience`} />
          <ExperienceTimeline entries={experience} compact />
          <div className="flex flex-wrap items-center gap-6" data-reveal>
            <Button href="/about#career" variant="secondary">
              View Full Experience
            </Button>
            <Button href={siteConfig.cvPath} variant="ghost" target="_blank" rel="noopener noreferrer">
              Download CV
            </Button>
          </div>
        </Container>
      </section>

      {/* WordPress Tech Stack */}
      <section className="py-16 sm:py-20" style={{ background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Technical Stack" title="WordPress-first, with the tools to support it." />
          <TechGroup groups={techGroups} />
        </Container>
      </section>

      {/* Personal Projects + Developer Tools (combined, compact) */}
      <section className="py-14 sm:py-16" style={{ background: 'var(--paper-000)' }}>
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Beyond Client Work"
            title="Beyond client work."
            description="I also build internal tools, web systems, and small developer utilities to explore workflows beyond traditional WordPress development."
          />
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            <div className="flex flex-col gap-4">
              <span className="eyebrow">Personal Projects</span>
              <ul className="flex flex-col divide-y" style={{ borderColor: 'var(--line)' }}>
                {featuredSystems.map((system) => (
                  <li key={system.slug}>
                    <a href={`/systems/${system.slug}`} className="group flex items-center gap-3 py-3">
                      <span className="relative h-12 w-16 flex-shrink-0 overflow-hidden rounded-[var(--radius-sm)] border" style={{ borderColor: 'var(--line)' }}>
                        <Image src={system.screenshot} alt={`${system.name} screenshot`} fill className="object-cover object-top" />
                      </span>
                      <span className="flex flex-col gap-0.5">
                        <span className="text-sm font-bold transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ color: 'var(--ink-950)' }}>
                          {system.name}
                        </span>
                        <span className="text-xs" style={{ color: 'var(--ink-700)' }}>
                          {system.techDirection}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <a href="/systems" className="w-fit text-sm font-bold transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--ink-950)' }} data-reveal>
                View All Personal Projects →
              </a>
            </div>

            <div className="flex flex-col gap-4">
              <span className="eyebrow">Developer Tools</span>
              <ul className="flex flex-col divide-y" style={{ borderColor: 'var(--line)' }}>
                {featuredTools.map((tool) => (
                  <li key={tool.id}>
                    <a href={tool.href} className="group flex flex-col gap-0.5 py-3">
                      <span className="text-sm font-bold transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ color: 'var(--ink-950)' }}>
                        {tool.title}
                      </span>
                      <span className="text-xs" style={{ color: 'var(--ink-700)' }}>
                        {tool.purpose}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <a href="/tools" className="w-fit text-sm font-bold transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--ink-950)' }} data-reveal>
                View All Tools →
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* About preview */}
      <section id="about" className="py-16 sm:py-20" style={{ background: 'var(--paper-050)' }}>
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5" data-reveal data-reveal-type="fade-up">
            <span className="eyebrow">About</span>
            <h2 className="mt-2 max-w-md text-balance">WordPress developer behind the work.</h2>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-7" data-reveal data-reveal-type="fade-up">
            <p className="leading-relaxed" style={{ color: 'var(--ink-700)' }}>
              I&apos;m {siteConfig.name}, a WordPress developer with {yearsExperience}+ years building, maintaining, and troubleshooting business websites — through both a stable in-house role and
              an ongoing freelance/contract practice with agencies and direct clients across the United States, Canada, and the Philippines.
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--ink-700)' }}>
              Alongside builds, I handle hosting, domain, and DNS setup, ongoing website management, and production troubleshooting — with AI tools like Claude Code helping me move faster, while
              every change is still reviewed and finished by hand.
            </p>
            <a href="/about" className="w-fit text-sm font-bold transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--ink-950)' }}>
              More About Me →
            </a>
          </div>
        </Container>
      </section>

      {/* Contact */}
      <ContactCTA
        title="Let's connect."
        description="I'm currently open to remote WordPress development, WordPress support, website management, and technical web opportunities. I'm also open to selected development collaborations."
        primaryLabel="Contact Me"
        primaryHref="/contact"
        secondaryLabel="Download CV"
        secondaryHref={siteConfig.cvPath}
        secondaryExternal
      />
    </>
  );
}
