import Image from 'next/image';
import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';
import { ProjectModalProvider } from '@/components/ProjectModalContext';
import SystemPreview from '@/components/SystemPreview';
import ProcessTimeline from '@/components/ProcessTimeline';
import { siteConfig } from '@/config/site';
import { projects } from '@/data/projects';
import { systems } from '@/data/systems';
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
  {
    label: `${yearsExperience}+ Years of Web Development`,
    icon: '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/>',
  },
  {
    label: 'WordPress and Elementor Specialist',
    icon: '<path d="M4 5h16v11H4z"/><path d="M2 20h20"/><path d="M9 20l1-4h4l1 4"/>',
  },
  {
    label: 'Dynamic Content and Frontend Development',
    icon: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  },
  {
    label: 'Web Systems and Browser Tools',
    icon: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
  },
  {
    label: 'Hosting, Domain, DNS and Email Support',
    icon: '<path d="M12 2 3 7l9 5 9-5-9-5Z"/><path d="M3 12l9 5 9-5"/><path d="M3 17l9 5 9-5"/>',
  },
  {
    label: 'Agency and Remote Collaboration',
    icon: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a13 13 0 0 1 0 18a13 13 0 0 1 0-18Z"/>',
  },
];

const capabilityCards = [
  {
    id: 'wordpress',
    eyebrow: 'WordPress Websites',
    title: 'Professional websites built to manage.',
    description: 'Responsive, manageable WordPress websites for businesses, agencies, nonprofits, and service providers — built on Elementor Pro and dynamic content.',
    highlights: ['New website builds', 'Elementor Pro', 'Dynamic WordPress', 'Redesigns & maintenance'],
    cta: { label: 'Explore Services', href: '/services' },
  },
  {
    id: 'systems',
    eyebrow: 'Web Systems',
    title: 'Internal systems built around real workflows.',
    description: 'Admin dashboards and internal tools for task management, inventory, records, and reporting — designed around how a team actually works.',
    highlights: ['Admin dashboards', 'Task management', 'Inventory & records', 'User roles & reports'],
    cta: { label: 'View Web Systems', href: '/personal-projects' },
  },
  {
    id: 'tools',
    eyebrow: 'Web Tools',
    title: 'Free browser tools for everyday tasks.',
    description: 'Focused browser utilities for common technical tasks — image conversion, SEO previews, favicons, and JSON formatting, processed locally.',
    highlights: ['Image tools', 'SEO tools', 'Favicon tools', 'CSS & JSON tools'],
    cta: { label: 'Explore Web Tools', href: '/tools' },
  },
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

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section id="home" className="relative flex items-center overflow-hidden pt-24 pb-12 sm:pt-28" style={{ background: 'var(--brand-lavender)' }} data-hero-section>
        <div className="pointer-events-none absolute inset-0 -z-10" data-hero-bg>
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(19,11,36,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(19,11,36,0.6) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
              maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)',
            }}
          />
          <div className="absolute left-[8%] top-[12%] h-[520px] w-[520px] rounded-full opacity-[0.16] blur-3xl" style={{ background: 'radial-gradient(circle, var(--brand-primary), transparent 70%)' }} />
          <div className="absolute right-[-8%] bottom-[-10%] h-[480px] w-[480px] rounded-full opacity-[0.12] blur-3xl" style={{ background: 'radial-gradient(circle, var(--brand-primary), transparent 70%)' }} />
        </div>

        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8" data-hero-content>
            <div className="flex flex-col items-start gap-5 lg:col-span-7">
              <span className="eyebrow" data-hero-eyebrow>
                WordPress &middot; Web Systems &middot; Digital Tools
              </span>

              <h1 className="max-w-2xl text-balance text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.1]" style={{ color: 'var(--text-primary)' }}>
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

              <p className="max-w-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }} data-hero-support>
                I build professional WordPress websites, practical web systems, and browser-based tools — with the frontend, hosting, domain, DNS, and technical configuration needed to launch and maintain them reliably.
              </p>

              <div className="mt-2 flex flex-col gap-4 sm:flex-row" data-hero-support>
                <Button href="/portfolio" variant="primary" size="large" data-magnetic="">
                  View Selected Work
                </Button>
                <Button href="/contact" variant="secondary" size="large" data-magnetic="">
                  Start a Project
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-1 text-sm" style={{ color: 'var(--text-secondary)' }} data-hero-support>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: 'var(--brand-primary)' }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: 'var(--brand-primary)' }} />
                </span>
                <span>WordPress &bull; Elementor Pro &bull; Web Systems &bull; Hosting &bull; DNS &bull; Technical Support</span>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }} data-hero-support>
                <a href="/tools" className="underline" style={{ color: 'var(--brand-primary)' }}>
                  Explore Web Tools
                </a>{' '}
                or see the systems I build in{' '}
                <a href="/personal-projects" className="underline" style={{ color: 'var(--brand-primary)' }}>
                  Web Systems
                </a>
                .
              </p>
            </div>

            <div className="relative lg:col-span-5" data-hero-support>
              <div className="pointer-events-none absolute -inset-8 -z-10 hidden rounded-full opacity-40 blur-3xl lg:block" style={{ background: 'radial-gradient(circle, var(--brand-primary), transparent 70%)' }} />
              <Image
                src={firstProject.image}
                alt={`${firstProject.name} website shown on desktop and mobile`}
                width={900}
                height={900}
                className="mx-auto h-auto w-full max-w-[420px] drop-shadow-2xl lg:max-w-none"
              />
              <div className="hero-badge absolute left-0 top-4 flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 sm:-left-4" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)', boxShadow: 'var(--shadow-md)' }}>
                <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: 'var(--brand-lavender)', color: 'var(--brand-primary)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </span>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold" style={{ color: 'var(--brand-ink)', fontFamily: 'var(--font-heading)' }}>
                    Elementor Pro
                  </span>
                  <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>
                    Live client build
                  </span>
                </div>
              </div>
              <div className="hero-badge absolute bottom-6 right-0 flex items-center gap-2 rounded-full border px-4 py-2 sm:-right-3" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)', boxShadow: 'var(--shadow-md)' }}>
                <span className="h-2 w-2 rounded-full" style={{ background: 'var(--color-success)' }} />
                <span className="text-xs font-bold" style={{ color: 'var(--brand-ink)' }}>
                  Responsive Layout
                </span>
              </div>
            </div>
          </div>
        </Container>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 hidden flex-col items-center gap-2 lg:flex" style={{ color: 'var(--text-secondary)' }} data-scroll-cue>
          <span className="eyebrow text-[10px]" style={{ color: 'inherit' }}>
            Scroll
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </section>

      {/* Credibility strip */}
      <section className="py-8 sm:py-10" style={{ background: 'var(--surface-white)' }}>
        <Container>
          <div className="grid grid-cols-2 divide-y divide-x sm:grid-cols-3 sm:divide-y-0 lg:grid-cols-6" style={{ borderColor: 'var(--border-color)' }} data-reveal data-reveal-type="stagger">
            {credibilityPoints.map((point) => (
              <div key={point.label} className="flex flex-col items-center gap-2.5 px-3 py-5 text-center" style={{ borderColor: 'var(--border-color)' }}>
                <span className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: 'var(--brand-lavender)', color: 'var(--brand-primary)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: point.icon }} />
                </span>
                <p className="max-w-[10rem] text-xs font-medium leading-snug" style={{ color: 'var(--text-primary)' }}>
                  {point.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Core Capabilities */}
      <section className="py-14 sm:py-16" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Core Capabilities"
            title="Web Solutions for Business, Operations, and Growth"
            description="Three ways I help businesses get more from their website — professional WordPress builds, internal systems for real workflows, and free tools for common web tasks."
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* WordPress Websites — real project preview */}
            <div className="card-surface flex flex-col overflow-hidden rounded-2xl" style={{ background: 'var(--surface-white)' }} data-reveal>
              <div className="relative aspect-[16/10] overflow-hidden" style={{ background: 'var(--surface-warm)' }}>
                <Image src={firstProject.image} alt={`${firstProject.name} website preview`} width={640} height={400} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <span className="eyebrow">{capabilityCards[0].eyebrow}</span>
                <h3 className="text-xl">{capabilityCards[0].title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', maxWidth: 'none' }}>
                  {capabilityCards[0].description}
                </p>
                <ul className="flex flex-wrap gap-1.5 pt-1">
                  {capabilityCards[0].highlights.map((h) => (
                    <li key={h} className="rounded-full px-2.5 py-1 text-[11px] font-medium" style={{ background: 'var(--surface-warm)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-3">
                  <Button href={capabilityCards[0].cta.href} variant="secondary">
                    {capabilityCards[0].cta.label}
                  </Button>
                </div>
              </div>
            </div>

            {/* Web Systems — dashboard mock preview */}
            <div className="card-surface flex flex-col overflow-hidden rounded-2xl" style={{ background: 'var(--surface-white)' }} data-reveal>
              <div className="p-6 pb-0">
                <SystemPreview routeLabel="app.system/admin/overview" activeNav={1} />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <span className="eyebrow">{capabilityCards[1].eyebrow}</span>
                <h3 className="text-xl">{capabilityCards[1].title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', maxWidth: 'none' }}>
                  {capabilityCards[1].description}
                </p>
                <ul className="flex flex-wrap gap-1.5 pt-1">
                  {capabilityCards[1].highlights.map((h) => (
                    <li key={h} className="rounded-full px-2.5 py-1 text-[11px] font-medium" style={{ background: 'var(--surface-warm)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-3">
                  <Button href={capabilityCards[1].cta.href} variant="secondary">
                    {capabilityCards[1].cta.label}
                  </Button>
                </div>
              </div>
            </div>

            {/* Web Tools — compact launcher grid preview */}
            <div className="card-surface flex flex-col overflow-hidden rounded-2xl" style={{ background: 'var(--surface-white)' }} data-reveal>
              <div className="grid grid-cols-3 gap-2 p-6 pb-0">
                {['image-toolkit', 'qr-code-generator', 'developer-data-toolkit']
                  .map((id) => TOOLS.find((t) => t.id === id))
                  .filter((tool): tool is (typeof TOOLS)[number] => !!tool)
                  .map((tool) => (
                  <div
                    key={tool.id}
                    className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border"
                    style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}
                  >
                    <span className="h-2 w-2 rounded-full" style={{ background: tool.accent }} />
                    <span className="px-1 text-center text-[9px] font-bold leading-tight" style={{ color: 'var(--text-secondary)' }}>
                      {tool.title}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <span className="eyebrow">{capabilityCards[2].eyebrow}</span>
                <h3 className="text-xl">{capabilityCards[2].title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', maxWidth: 'none' }}>
                  {capabilityCards[2].description}
                </p>
                <ul className="flex flex-wrap gap-1.5 pt-1">
                  {capabilityCards[2].highlights.map((h) => (
                    <li key={h} className="rounded-full px-2.5 py-1 text-[11px] font-medium" style={{ background: 'var(--surface-warm)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-3">
                  <Button href={capabilityCards[2].cta.href} variant="secondary">
                    {capabilityCards[2].cta.label}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Selected Client Work */}
      <ProjectModalProvider>
        <section id="work" className="py-14 sm:py-16" style={{ background: 'var(--surface-white)' }}>
          <Container className="flex flex-col gap-10 sm:gap-12">
            <SectionHeading
              eyebrow="Selected Client Work"
              title="Websites built for real businesses."
              description="Recent WordPress projects — the client, the goal, and what I delivered."
            />

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <ProjectCard project={firstProject} index={1} priority />
              <ProjectCard project={secondProject} index={2} priority />
              <ProjectCard project={thirdProject} index={3} priority />
            </div>

            <div data-reveal>
              <Button href="/portfolio" variant="secondary">
                View All Client Work
              </Button>
            </div>
          </Container>
          <ProjectModal />
        </section>
      </ProjectModalProvider>

      {/* Featured Web Systems */}
      <section className="py-14 sm:py-16" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Featured Web Systems"
            title="Internal systems built for real operations."
            description="Personal systems and prototypes — clearly labeled by status, not presented as client production work."
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {featuredSystems.map((system) => (
              <a
                key={system.slug}
                href={`/personal-projects/${system.slug}`}
                className="card-surface flex flex-col gap-4 overflow-hidden rounded-2xl p-6"
                style={{ background: 'var(--surface-white)' }}
                data-reveal
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="eyebrow">{system.category}</span>
                    <h3 className="text-xl">{system.name}</h3>
                  </div>
                  <span
                    className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wide"
                    style={{ borderColor: 'color-mix(in srgb, var(--color-success) 35%, white)', color: 'var(--color-success)', background: 'var(--color-success-soft)' }}
                  >
                    {system.status}
                  </span>
                </div>
                {system.screenshot && (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl border" style={{ borderColor: 'var(--border-color)' }}>
                    <Image src={system.screenshot} alt={`${system.name} dashboard screenshot`} className="h-full w-full object-cover object-top" />
                  </div>
                )}
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {system.problem}
                </p>
                <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {system.modules.slice(0, 3).map((feature) => (
                    <li key={feature} className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-primary)' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0" style={{ color: 'var(--brand-primary)' }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </a>
            ))}
          </div>

          <div data-reveal>
            <Button href="/personal-projects" variant="secondary">
              View All Web Systems
            </Button>
          </div>
        </Container>
      </section>

      {/* Featured Tools */}
      <section className="py-14 sm:py-16" style={{ background: 'var(--surface-white)' }}>
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Featured Tools"
            title="Free browser tools, ready to use."
            description="No account, uploads, or permanent storage — everything runs in your browser."
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {FEATURED_TOOL_IDS.map((id) => TOOLS.find((t) => t.id === id))
              .filter((tool): tool is (typeof TOOLS)[number] => !!tool)
              .map((tool) => (
              <a
                key={tool.id}
                href={tool.href}
                className="card-surface flex flex-col gap-3 rounded-2xl p-5"
                style={{ background: 'var(--surface-white)', borderTop: `3px solid ${tool.accent}` }}
                data-reveal
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold" style={{ background: tool.accentSoft, color: tool.accent }}>
                  {tool.title.charAt(0)}
                </span>
                <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                  {tool.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {tool.purpose}
                </p>
              </a>
            ))}
          </div>

          <div data-reveal>
            <Button href="/tools" variant="secondary">
              Explore All Tools
            </Button>
          </div>
        </Container>
      </section>

      {/* Technical Capabilities */}
      <section className="py-12 sm:py-14" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Technical Capabilities"
            title="From WordPress Builds to Hosting, DNS, and Deployment"
            description="I connect websites to hosting and domains, configure required DNS and email records, verify SSL and form delivery, and support migrations from staging to production."
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {technicalGroups.map((group) => (
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

          <div className="flex flex-col gap-8">
            <ProcessTimeline steps={processSteps} />
          </div>
        </Container>
      </section>

      {/* Short About */}
      <section id="about" className="py-12 sm:py-14" style={{ background: 'var(--surface-warm)' }}>
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7" data-reveal data-reveal-type="fade-up">
            <span className="eyebrow">About</span>
            <h2 className="mt-2 max-w-xl text-balance">
              A <span style={{ color: 'var(--brand-primary)' }}>WordPress developer</span> who also handles the technical side.
            </h2>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5" data-reveal data-reveal-type="fade-up">
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              I build and improve WordPress websites, then handle what comes after: hosting setup, domain and DNS configuration, SSL, and business email delivery. Alongside client work, I also build personal web systems and browser tools. Every project is planned with AI-assisted tools, reviewed and finished by hand.
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {aboutProofPoints.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--brand-primary)' }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <div>
              <Button href="/about" variant="secondary">
                More About Me
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section id="contact" className="dark-grid-bg py-14 sm:py-16" style={{ background: 'var(--brand-dark)' }}>
        <Container className="flex flex-col items-start gap-6">
          <SectionHeading
            eyebrow="Contact"
            title="Ready to start a project?"
            description="Tell me what you're building — a website, an internal system, or technical setup like hosting and DNS. I'll recommend a practical next step."
            dark
          />
          <div className="flex flex-wrap gap-4" data-reveal>
            <Button href="/contact" variant="primary" size="large">
              Start a Project
            </Button>
            <Button href="/portfolio" variant="secondary" size="large">
              View Selected Work
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
