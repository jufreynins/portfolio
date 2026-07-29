import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import { siteConfig } from '@/config/site';
import { wordpressServices } from '@/data/services';
import { projects } from '@/data/projects';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `WordPress Services — ${siteConfig.name}`,
  description:
    'Professional WordPress development for business websites, landing pages, dynamic content, and ongoing improvements — Elementor Pro, ACF, JetEngine, and custom functionality.',
  canonical: `${siteConfig.url}/services`,
});

const projectBySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

const whyWorkWithMe = [
  'Comfortable working inside existing websites, not just building from scratch',
  'Can follow an existing design system instead of imposing my own',
  'Strong responsive troubleshooting across real devices and browsers',
  'Experience with dynamic content: ACF, JetEngine, custom post types',
  'Collaborates well with agencies, designers, and other developers',
  'Does not unnecessarily rebuild systems that are already working',
  'Uses AI tools to move faster — every change is still human-reviewed',
];

export default function ServicesPage() {
  return (
    <>
      <section className="pt-24 pb-10 sm:pt-28 sm:pb-12" style={{ background: 'var(--surface-warm)' }}>
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="WordPress Services"
            title="WordPress development for websites that need to perform."
            description="Business websites, landing pages, dynamic content, and ongoing improvements."
          />
        </Container>
      </section>

      <section className="py-12 sm:py-14" style={{ background: 'var(--surface-white)' }}>
        <Container className="flex flex-col gap-10">
          {wordpressServices.map((service, i) => {
            const project = service.relatedProjectSlug ? projectBySlug[service.relatedProjectSlug] : undefined;
            return (
              <div key={service.title} className="grid grid-cols-1 gap-6 border-t pt-8 lg:grid-cols-12 lg:gap-10" style={{ borderColor: 'var(--border-color)' }} data-reveal>
                <div className="flex items-start gap-4 lg:col-span-4">
                  <span className="font-mono text-sm" style={{ color: 'var(--brand-primary)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl">{service.title}</h2>
                    <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {service.outcome}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 lg:col-span-8">
                  <p className="text-sm" style={{ color: 'var(--text-primary)' }}>
                    <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                      Who it helps:
                    </span>{' '}
                    {service.whoFor}
                  </p>

                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {service.deliverables.map((item) => (
                      <span key={item} className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--brand-primary)' }}>
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-4" style={{ borderColor: 'var(--border-color)' }}>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                      <span className="font-bold uppercase tracking-wide">Technology:</span> {service.technology}
                    </p>
                    {project && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: 'var(--brand-primary)' }}>
                        Related project: {project.name}
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      {/* Why work with me */}
      <section className="py-12 sm:py-14" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading eyebrow="Why Work With Me" title="A developer who fits into how you already work" description="Truthful differentiators, not sales language." />
          <ul className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
            {whyWorkWithMe.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-2xl border p-5" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)', boxShadow: 'var(--shadow-sm)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0" style={{ color: 'var(--brand-primary)' }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-sm leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="py-12 sm:py-14" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col items-start gap-5 border-t pt-10" style={{ borderColor: 'var(--border-color)' }}>
          <span className="eyebrow">Beyond WordPress</span>
          <p className="max-w-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            I also build{' '}
            <a href="/personal-projects" className="underline" style={{ color: 'var(--brand-primary)' }}>
              Personal Projects
            </a>{' '}
            and{' '}
            <a href="/tools" className="underline" style={{ color: 'var(--brand-primary)' }}>
              Tools
            </a>{' '}
            as a secondary interest.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/personal-projects" variant="secondary">
              Personal Projects
            </Button>
            <Button href="/tools" variant="secondary">
              Tools
            </Button>
          </div>
        </Container>
      </section>

      <section className="dark-grid-bg py-14 sm:py-16" style={{ background: 'var(--brand-dark)' }}>
        <Container className="flex flex-col items-start gap-6">
          <SectionHeading
            eyebrow="Not sure which one you need?"
            title="Let's talk about your project"
            description="Tell me what you're building and I'll point you in the right direction — no pressure, no obligation."
            dark
          />
          <Button href="/contact" variant="primary" size="large">
            Discuss Your Website
          </Button>
        </Container>
      </section>
    </>
  );
}
