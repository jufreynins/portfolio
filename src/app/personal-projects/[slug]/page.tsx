import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Container from '@/components/Container';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import SystemPreview from '@/components/SystemPreview';
import { siteConfig } from '@/config/site';
import { systems, getSystemBySlug, systemStatusStyle } from '@/data/systems';
import { buildMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return systems.map((system) => ({ slug: system.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const system = getSystemBySlug(slug);
  if (!system) return buildMetadata({ noindex: true });

  return buildMetadata({
    title: `${system.name} — Web System — ${siteConfig.name}`,
    description: system.problem,
    canonical: `${siteConfig.url}/personal-projects/${system.slug}`,
  });
}

export default async function SystemCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const system = getSystemBySlug(slug);
  if (!system) notFound();

  const index = systems.findIndex((s) => s.slug === system.slug);
  const related = systems[(index + 1) % systems.length];
  const status = systemStatusStyle[system.status];

  return (
    <>
      <section className="pt-24 pb-10 sm:pt-28 sm:pb-12" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-5">
          <a href="/personal-projects" className="inline-flex w-fit items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="17" y1="7" x2="7" y2="17" />
              <polyline points="17 17 7 17 7 7" />
            </svg>
            Back to Web Systems
          </a>

          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">{system.category}</span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide"
              style={{ borderColor: status.border, color: status.color, background: status.bg }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: status.color }} />
              {system.status}
            </span>
          </div>

          <h1 style={{ color: 'var(--text-primary)' }}>{system.name}</h1>
          <p className="max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {system.users}
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            {system.href && (
              <Button href={system.href} target="_blank" rel="noopener noreferrer" variant="primary">
                Visit Live Demo
              </Button>
            )}
            <Button href="/contact" variant={system.href ? 'secondary' : 'primary'}>
              Request a Similar System
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-12" style={{ background: 'var(--surface-white)' }}>
        <Container>
          {system.screenshot ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
              <Image src={system.screenshot} alt={`${system.name} dashboard screenshot`} width={1600} height={900} className="h-full w-full object-cover object-top" priority />
            </div>
          ) : (
            <div className="mx-auto max-w-2xl">
              <SystemPreview routeLabel={system.routeLabel} activeNav={index % 4} />
            </div>
          )}
        </Container>
      </section>

      <section className="py-10 sm:py-12" style={{ background: 'var(--surface-white)' }}>
        <Container>
          <div className="flex flex-col gap-2 border-t pt-10" style={{ borderColor: 'var(--border-color)' }}>
            <span className="eyebrow">The Business Problem</span>
            <p className="max-w-2xl leading-relaxed" style={{ color: 'var(--text-primary)' }}>
              {system.problem}
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t pt-10" style={{ borderColor: 'var(--border-color)' }}>
            <span className="eyebrow">Core Modules</span>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {system.modules.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-primary)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0" style={{ color: 'var(--brand-primary)' }}>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {system.caseStudy && (
            <dl className="mt-10 grid grid-cols-1 gap-8 border-t pt-10 sm:grid-cols-2" style={{ borderColor: 'var(--border-color)' }}>
              {system.caseStudy.scope && (
                <div className="flex flex-col gap-2">
                  <dt className="eyebrow">Scope</dt>
                  <dd className="leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                    {system.caseStudy.scope}
                  </dd>
                </div>
              )}
              {system.caseStudy.implementation && (
                <div className="flex flex-col gap-2">
                  <dt className="eyebrow">Implementation</dt>
                  <dd className="leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                    {system.caseStudy.implementation}
                  </dd>
                </div>
              )}
              {system.caseStudy.technicalChallenges && (
                <div className="flex flex-col gap-2">
                  <dt className="eyebrow">Technical Notes</dt>
                  <dd className="leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                    {system.caseStudy.technicalChallenges}
                  </dd>
                </div>
              )}
              {system.caseStudy.outcome && (
                <div className="flex flex-col gap-2">
                  <dt className="eyebrow">Outcome</dt>
                  <dd className="leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                    {system.caseStudy.outcome}
                  </dd>
                </div>
              )}
            </dl>
          )}

          <div className="mt-10 flex flex-col gap-3 border-t pt-10" style={{ borderColor: 'var(--border-color)' }}>
            <span className="eyebrow">Technology Direction</span>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {system.techDirection}
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t py-12 sm:py-14" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <span className="eyebrow">Related System</span>
            <a href={`/personal-projects/${related.slug}`} className="text-xl font-bold underline-offset-4 hover:underline" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              {related.name}
            </a>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {related.category}
            </span>
          </div>
          <Button href={`/personal-projects/${related.slug}`} variant="secondary">
            View System
          </Button>
        </Container>
      </section>

      <section className="dark-grid-bg py-14 sm:py-16" style={{ background: 'var(--brand-dark)' }}>
        <Container className="flex flex-col items-start gap-6">
          <SectionHeading
            eyebrow="Let's build something"
            title="Need a system like this one?"
            description="Tell me about your workflow and I'll recommend a practical next step within one business day."
            dark
          />
          <Button href="/contact" variant="primary" size="large">
            Start a Project
          </Button>
        </Container>
      </section>
    </>
  );
}
