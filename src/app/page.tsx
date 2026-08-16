import type { Metadata } from 'next';
import Image from 'next/image';
import Container from '@/components/Container';
import Bleed from '@/components/Bleed';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import ProjectFeature from '@/components/ProjectFeature';
import SystemFeature from '@/components/SystemFeature';
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
  title: `${siteConfig.name} | WordPress and Web Systems Developer`,
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

const capabilityGroups = [
  {
    title: 'WordPress Development',
    description: 'Dynamic WordPress websites, Elementor Pro, ACF, JetEngine, custom frontend work, troubleshooting and maintenance.',
  },
  {
    title: 'Web Systems',
    description: 'React, Next.js, TypeScript, Laravel and custom internal workflows.',
  },
  {
    title: 'Web Operations',
    description: 'Hosting, DNS, SSL, migrations, deployments, GitHub, Cloudflare and production troubleshooting.',
  },
  {
    title: 'AI-Assisted Development',
    description: 'Claude Code, ChatGPT and Cursor integrated into the development workflow — human review and validation stay central to every change.',
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
                    &amp; Web Systems Developer
                  </span>
                </span>
              </h1>

              <p className="meta-index" style={{ color: 'var(--accent)' }} data-hero-support>
                {yearsExperience}+ Years of Web Development Experience
              </p>

              <p className="max-w-lg leading-relaxed" style={{ color: 'var(--ink-700)', fontSize: 'var(--text-lead)' }} data-hero-support>
                I build and maintain production websites, web systems, and the infrastructure behind them — from WordPress and dynamic content to deployments, DNS, integrations, and AI-assisted
                development workflows.
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-x-7 gap-y-4" data-hero-support>
                <Button href="/work" variant="primary" size="large">
                  View Selected Work
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
                  Open to remote opportunities
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
                <p className="meta-index mt-3">{heroProject.name.toUpperCase()} · LIVE CLIENT BUILD</p>
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

      {/* Technical Summary strip */}
      <section className="py-8 sm:py-10" style={{ background: 'var(--paper-000)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <Container>
          <TechGroup groups={techGroups} />
        </Container>
      </section>

      {/* Selected Work */}
      <section id="work" className="py-16 sm:py-20" style={{ background: 'var(--paper-000)' }}>
        <Container>
          <SectionHeading eyebrow="Selected Work" title="Websites built for real businesses." description="Recent WordPress projects — the client, the goal, and what I delivered." />
        </Container>

        <Bleed className="mt-10 flex flex-col gap-12 sm:mt-12 sm:gap-16">
          {featuredProjects.map((project, i) => (
            <ProjectFeature key={project.slug} project={project} index={i + 1} priority={i === 0} />
          ))}
        </Bleed>

        <Container className="mt-14 sm:mt-16">
          <Button href="/work" variant="secondary" data-reveal>
            View All Client Work
          </Button>
        </Container>
      </section>

      {/* Experience */}
      <section className="py-16 sm:py-20" style={{ background: 'var(--paper-050)' }}>
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

      {/* Beyond WordPress */}
      {featuredSystems.length > 0 && (
        <section className="py-16 sm:py-20" style={{ background: 'var(--paper-000)' }}>
          <Container className="flex flex-col gap-12">
            <SectionHeading eyebrow="Beyond WordPress" title="Beyond WordPress." description="Personal systems built outside client work — clearly labeled, never presented as production or paid work." />
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
              {featuredSystems.map((system, i) => (
                <SystemFeature key={system.slug} system={system} index={i + 1} />
              ))}
            </div>
            <Button href="/systems" variant="secondary" data-reveal>
              View All Systems
            </Button>
          </Container>
        </section>
      )}

      {/* What I Work With */}
      <section className="py-16 sm:py-20" style={{ background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Capabilities" title="What I work with." />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {capabilityGroups.map((group) => (
              <div key={group.title} className="flex flex-col gap-2.5" data-reveal>
                <h3 className="text-base font-semibold" style={{ color: 'var(--ink-950)' }}>
                  {group.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
                  {group.description}
                </p>
              </div>
            ))}
          </div>
          <a href="/services" className="w-fit text-sm font-bold transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--ink-950)' }} data-reveal>
            View Full Capabilities →
          </a>
        </Container>
      </section>

      {/* Developer Tools */}
      <section className="py-16 sm:py-20" style={{ background: 'var(--paper-000)' }}>
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Developer Tools" title="Free browser tools, ready to use." description="No account, uploads, or permanent storage — everything runs in your browser." />
          <div className="grid grid-cols-1 divide-y sm:grid-cols-3 sm:divide-y-0 sm:divide-x" style={{ borderColor: 'var(--line)' }} data-reveal data-reveal-type="stagger">
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
            View All Tools
          </Button>
        </Container>
      </section>

      {/* About preview */}
      <section id="about" className="py-16 sm:py-20" style={{ background: 'var(--paper-050)' }}>
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5" data-reveal data-reveal-type="fade-up">
            <span className="eyebrow">About</span>
            <h2 className="mt-2 max-w-md text-balance">Developer behind the work.</h2>
          </div>

          <div className="flex flex-col gap-5 lg:col-span-7" data-reveal data-reveal-type="fade-up">
            <p className="leading-relaxed" style={{ color: 'var(--ink-700)' }}>
              I&apos;m {siteConfig.name}, a WordPress developer with {yearsExperience}+ years building business websites, dynamic content, and web systems — through both a stable in-house role and
              an ongoing freelance/contract practice with agencies and direct clients across the United States, Canada, and the Philippines.
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--ink-700)' }}>
              Alongside client work, I handle hosting, domain, and DNS setup, build personal web systems, and use AI tools like Claude Code to move faster — with every change still reviewed and
              finished by hand.
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
        description="I'm currently open to remote web development opportunities, agency collaborations, and selected technical projects."
        primaryLabel="Contact Me"
        primaryHref="/contact"
        secondaryLabel="Download CV"
        secondaryHref={siteConfig.cvPath}
        secondaryExternal
      />
    </>
  );
}
