import Image from 'next/image';
import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';
import { ProjectModalProvider } from '@/components/ProjectModalContext';
import ProcessTimeline from '@/components/ProcessTimeline';
import { siteConfig } from '@/config/site';
import { wordpressServices } from '@/data/services';
import { projects } from '@/data/projects';
import { processSteps } from '@/data/process';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `${siteConfig.name} | WordPress Developer & Frontend Specialist`,
  description: siteConfig.description,
  canonical: siteConfig.url,
});

const { yearsExperience } = siteConfig;
const [featuredService, ...supportingServices] = wordpressServices;

const credibilityPoints = [
  {
    label: `${yearsExperience}+ Years WordPress Experience`,
    icon: '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/>',
  },
  {
    label: 'Responsive, Performance-Focused Builds',
    icon: '<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/>',
  },
  {
    label: 'Agency & Remote Team Collaboration',
    icon: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a13 13 0 0 1 0 18a13 13 0 0 1 0-18Z"/>',
  },
  {
    label: 'Dynamic Content & Frontend Customization',
    icon: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  },
];

const capabilityGroups = [
  {
    label: 'Structured Content',
    items: [
      { label: 'Custom Post Types & Taxonomies', icon: '<path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="M3 16l9 5 9-5"/><path d="M3 12l9 5 9-5"/>' },
      { label: 'Advanced Custom Fields', icon: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18"/><circle cx="6.5" cy="6.5" r=".5" fill="currentColor"/>' },
      { label: 'JetEngine & Dynamic Listings', icon: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>' },
      { label: 'Search & Filtering', icon: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>' },
    ],
  },
  {
    label: 'Elementor Development',
    items: [
      { label: 'Custom Templates', icon: '<rect x="4" y="4" width="16" height="16" rx="4"/>' },
      { label: 'Reusable Global Widgets', icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>' },
    ],
  },
  {
    label: 'Frontend Improvements',
    items: [
      { label: 'Custom CSS & JavaScript', icon: '<polyline points="9 6 3 12 9 18"/><polyline points="15 6 21 12 15 18"/>' },
      { label: 'Responsive Troubleshooting', icon: '<rect x="2" y="4" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/>' },
    ],
  },
  {
    label: 'Website Operations',
    items: [
      { label: 'Forms & Integrations', icon: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>' },
      { label: 'Performance Optimization', icon: '<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/>' },
    ],
  },
];

const aboutProofPoints = [
  'WordPress & Elementor Pro experience',
  'Agency collaboration',
  'Dynamic-content builds (ACF, JetEngine)',
  'Frontend customization',
  'AI-assisted development, human-reviewed',
];

const [firstProject, secondProject, thirdProject] = projects;

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
                WordPress Developer &amp; Frontend Specialist
              </span>

              <h1 className="max-w-2xl text-balance text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.1]" style={{ color: 'var(--text-primary)' }}>
                <span className="block overflow-hidden">
                  <span className="block" data-hero-line>
                    WordPress Websites
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="block" data-hero-line>
                    Built for Real
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="block" data-hero-line>
                    Business Goals
                  </span>
                </span>
              </h1>

              <p className="max-w-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }} data-hero-support>
                I build and improve WordPress websites using Elementor Pro, dynamic content, responsive frontend development, and custom functionality.
              </p>

              <div className="mt-2 flex flex-col gap-4 sm:flex-row" data-hero-support>
                <Button href="/portfolio" variant="primary" size="large" data-magnetic="">
                  View WordPress Projects
                </Button>
                <Button href="/contact" variant="secondary" size="large" data-magnetic="">
                  Discuss Your Website
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-1 text-sm" style={{ color: 'var(--text-secondary)' }} data-hero-support>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: 'var(--brand-primary)' }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: 'var(--brand-primary)' }} />
                </span>
                <span>WordPress &bull; Elementor Pro &bull; ACF &bull; JetEngine &bull; Custom CSS &amp; JavaScript</span>
              </div>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }} data-hero-support>
                Also building{' '}
                <a href="/tools" className="underline" style={{ color: 'var(--brand-primary)' }}>
                  Tools
                </a>{' '}
                and{' '}
                <a href="/personal-projects" className="underline" style={{ color: 'var(--brand-primary)' }}>
                  Personal Projects
                </a>{' '}
                on the side.
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
      <section className="py-10 sm:py-12" style={{ background: 'var(--surface-white)' }}>
        <Container>
          <div className="grid grid-cols-1 divide-y sm:grid-cols-4 sm:divide-x sm:divide-y-0" style={{ borderColor: 'var(--border-color)' }} data-reveal data-reveal-type="stagger">
            {credibilityPoints.map((point) => (
              <div key={point.label} className="flex flex-col items-center gap-3 px-4 py-6 text-center sm:py-0" style={{ borderColor: 'var(--border-color)' }}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full" style={{ background: 'var(--brand-lavender)', color: 'var(--brand-primary)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: point.icon }} />
                </span>
                <p className="max-w-[14rem] text-sm font-medium leading-snug" style={{ color: 'var(--text-primary)' }}>
                  {point.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Core WordPress Services */}
      <section className="py-14 sm:py-16" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="WordPress Services"
            title="WordPress services built around your business."
            description="New builds, redesigns, and ongoing support — websites that are easy to manage and built to grow."
          />

          <div className="flex flex-col gap-6 rounded-2xl border p-8 sm:p-10" style={{ borderColor: 'var(--brand-primary)', background: 'var(--brand-soft)', boxShadow: 'var(--shadow-brand)' }} data-reveal>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full" style={{ background: 'var(--brand-lavender)', color: 'var(--brand-primary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 5h16v11H4z" />
                  <path d="M2 20h20" />
                  <path d="M9 20l1-4h4l1 4" />
                </svg>
              </span>
              <span className="eyebrow rounded-full border px-3 py-1" style={{ borderColor: 'var(--brand-primary)', background: 'var(--surface-white)' }}>
                Most Requested
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-2xl sm:text-3xl">{featuredService.title}</h3>
              <p className="max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {featuredService.outcome}
              </p>
            </div>
            <ul className="grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
              {featuredService.deliverables.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-primary)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0" style={{ color: 'var(--brand-primary)' }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-2">
              <Button href="/services" variant="primary">
                Explore WordPress Services
              </Button>
            </div>
          </div>

          <div className="flex flex-col border-t" style={{ borderColor: 'var(--border-color)' }}>
            {supportingServices.map((service, i) => (
              <a
                key={service.title}
                href="/services"
                className="service-row group flex flex-col gap-4 border-b py-8 transition-colors duration-300 sm:-mx-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10 sm:px-6"
                style={{ borderColor: 'var(--border-color)', animationDelay: `${i * 50}ms` }}
                data-reveal
              >
                <div className="flex items-start gap-5">
                  <span className="font-mono text-sm" style={{ color: 'var(--brand-primary)' }}>
                    {String(i + 2).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl">{service.title}</h3>
                    <p className="max-w-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {service.outcome}
                    </p>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ color: 'var(--brand-primary)' }}>
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured WordPress Work */}
      <ProjectModalProvider>
        <section id="work" className="py-14 sm:py-16" style={{ background: 'var(--surface-white)' }}>
          <Container className="flex flex-col gap-10 sm:gap-12">
            <div className="relative overflow-hidden">
              <SectionHeading
                eyebrow="Selected WordPress Work"
                title="Websites built for real businesses."
                description="Recent WordPress projects — the client, the goal, and what I delivered."
              />
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <ProjectCard project={firstProject} index={1} priority />
              <ProjectCard project={secondProject} index={2} priority />
              <ProjectCard project={thirdProject} index={3} priority />
            </div>

            <div data-reveal>
              <Button href="/portfolio" variant="secondary">
                View WordPress Projects
              </Button>
            </div>
          </Container>
          <ProjectModal />
        </section>
      </ProjectModalProvider>

      {/* Advanced WordPress Capabilities */}
      <section className="py-12 sm:py-14" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Advanced WordPress Capabilities"
            title="More than basic page building."
            description="WordPress tools plus frontend development — manageable for editors, reliable across devices."
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {capabilityGroups.map((group) => (
              <div key={group.label} className="flex flex-col gap-4">
                <span className="eyebrow" style={{ color: 'var(--brand-primary)' }}>
                  {group.label}
                </span>
                <div className="flex flex-col gap-3">
                  {group.items.map((cap) => (
                    <div key={cap.label} className="flex items-center gap-3 rounded-2xl border p-4" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)', boxShadow: 'var(--shadow-sm)' }} data-reveal>
                      <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full" style={{ background: 'var(--brand-lavender)', color: 'var(--brand-primary)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: cap.icon }} />
                      </span>
                      <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>
                        {cap.label}
                      </p>
                    </div>
                  ))}
                </div>
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

      {/* Tools & Personal Projects preview */}
      <section className="py-12 sm:py-14" style={{ background: 'var(--surface-white)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Side Projects"
            title="Tools and personal projects, on the side."
            description="Small, separate from client work — see Tools and Personal Projects for details."
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <a href="/personal-projects" className="lab-card flex flex-col gap-3 rounded-2xl border p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)', boxShadow: 'var(--shadow-sm)' }} data-reveal>
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full" style={{ background: 'var(--brand-lavender)', color: 'var(--brand-primary)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="9" rx="1" />
                    <rect x="14" y="3" width="7" height="5" rx="1" />
                    <rect x="14" y="12" width="7" height="9" rx="1" />
                    <rect x="3" y="16" width="7" height="5" rx="1" />
                  </svg>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                  Personal Concept
                </span>
              </div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                Personal Projects
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Web system concepts for task management, inventory, and internal operations.
              </p>
            </a>
            <a href="/tools" className="lab-card flex flex-col gap-3 rounded-2xl border p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)', boxShadow: 'var(--shadow-sm)' }} data-reveal>
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full" style={{ background: 'var(--brand-lavender)', color: 'var(--brand-primary)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a2 2 0 0 0 3 3l6-6a4 4 0 0 0 5.4-5.4l-3 3-2-2 3-3Z" />
                  </svg>
                </span>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide"
                  style={{ borderColor: 'color-mix(in srgb, var(--color-success) 35%, white)', color: 'var(--color-success)', background: 'var(--color-success-soft)' }}
                >
                  Free Tool
                </span>
              </div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                Tools
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Free browser tools — image conversion, with more planned.
              </p>
            </a>
          </div>
        </Container>
      </section>

      {/* Short About */}
      <section id="about" className="py-12 sm:py-14" style={{ background: 'var(--surface-warm)' }}>
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7" data-reveal data-reveal-type="fade-up">
            <span className="eyebrow">About</span>
            <h2 className="mt-2 max-w-xl text-balance">
              A <span style={{ color: 'var(--brand-primary)' }}>WordPress developer</span> who understands existing websites.
            </h2>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-5" data-reveal data-reveal-type="fade-up">
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              I build new WordPress websites, improve existing builds, and fix frontend or content issues — without adding unnecessary complexity.
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
            title="Need help with a WordPress website?"
            description="Tell me what you need — a new build, redesign, dynamic content, or ongoing support. I'll recommend a practical next step."
            dark
          />
          <div className="flex flex-wrap gap-4" data-reveal>
            <Button href="/contact" variant="primary" size="large">
              Discuss Your Project
            </Button>
            <Button href="/portfolio" variant="secondary" size="large">
              View WordPress Work
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
