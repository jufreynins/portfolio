import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Container from '@/components/Container';
import Bleed from '@/components/Bleed';
import Button from '@/components/Button';
import ConceptPlaceholder from '@/components/ConceptPlaceholder';
import ContactCTA from '@/components/ContactCTA';
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
    title: `${system.name} — Personal System — ${siteConfig.name}`,
    description: system.problem,
    canonical: `${siteConfig.url}/systems/${system.slug}`,
  });
}

const CASE_STUDY_LABELS = {
  scope: 'Scope',
  implementation: 'Implementation',
  technicalChallenges: 'Technical Notes',
  outcome: 'Outcome',
} as const;

export default async function SystemCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const system = getSystemBySlug(slug);
  if (!system) notFound();

  const index = systems.findIndex((s) => s.slug === system.slug);
  const related = systems[(index + 1) % systems.length];
  const status = systemStatusStyle[system.status];
  const label = system.status === 'Concept' ? 'SYSTEM CONCEPT' : 'PERSONAL SYSTEM';

  return (
    <>
      <section className="pt-24 pb-8 sm:pt-28 sm:pb-10" style={{ background: 'var(--paper-000)' }}>
        <Container className="flex flex-col gap-5">
          <a href="/systems" className="inline-flex w-fit items-center gap-1.5 text-sm font-medium transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--ink-700)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="17" y1="7" x2="7" y2="17" />
              <polyline points="17 17 7 17 7 7" />
            </svg>
            Back to Systems
          </a>

          <p className="meta-index">
            {label} / {String(index + 1).padStart(2, '0')} — {system.category.toUpperCase()}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <h1 style={{ color: 'var(--ink-950)' }}>{system.name}</h1>
            <span className="meta-index inline-flex items-center gap-1.5 rounded-full border px-3 py-1" style={{ borderColor: status.border, color: status.color, background: status.bg }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: status.color }} />
              {system.status}
            </span>
          </div>

          <p className="max-w-2xl leading-relaxed" style={{ color: 'var(--ink-700)', fontSize: 'var(--text-lead)' }}>
            {system.users}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-1">
            {system.href && (
              <Button href={system.href} target="_blank" rel="noopener noreferrer" variant="primary">
                Visit Live Demo
              </Button>
            )}
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-12" style={{ background: 'var(--paper-000)' }}>
        {system.screenshot ? (
          <Bleed>
            <div className="corner-marks overflow-hidden rounded-[var(--radius-md)]" style={{ color: 'var(--ink-950)' }}>
              <Image
                src={system.screenshot}
                alt={`${system.name} screenshot`}
                width={1920}
                height={1080}
                priority
                className="aspect-[16/9] w-full object-cover object-top"
                style={{ background: 'var(--paper-050)' }}
              />
            </div>
          </Bleed>
        ) : (
          <Container>
            <div className="mx-auto max-w-2xl">
              <ConceptPlaceholder routeLabel={system.routeLabel} isConcept={system.status === 'Concept'} />
            </div>
          </Container>
        )}
      </section>

      <section className="py-8 sm:py-10 lg:py-12" style={{ background: 'var(--paper-000)' }}>
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-10 lg:col-span-8">
            <div className="flex flex-col gap-3">
              <span className="eyebrow">The Business Problem</span>
              <p className="leading-relaxed" style={{ color: 'var(--ink-950)' }}>
                {system.problem}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <span className="eyebrow">Core Modules</span>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {system.modules.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm" style={{ color: 'var(--ink-950)' }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="flex-shrink-0"
                      style={{ color: 'var(--accent)' }}
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {system.caseStudy &&
              (Object.keys(CASE_STUDY_LABELS) as (keyof typeof CASE_STUDY_LABELS)[])
                .filter((key) => system.caseStudy?.[key])
                .map((key) => (
                  <div key={key} className="flex flex-col gap-3">
                    <span className="eyebrow">{CASE_STUDY_LABELS[key]}</span>
                    <p className="leading-relaxed" style={{ color: 'var(--ink-950)' }}>
                      {system.caseStudy?.[key]}
                    </p>
                  </div>
                ))}
          </div>

          <aside className="lg:col-span-4">
            <div className="flex flex-col gap-8 border-t pt-8 lg:sticky lg:top-32 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0" style={{ borderColor: 'var(--line)' }}>
              <div className="flex flex-col gap-1.5">
                <span className="meta-index" style={{ color: 'var(--ink-400)' }}>
                  Category
                </span>
                <p className="text-sm font-medium" style={{ color: 'var(--ink-950)' }}>
                  {system.category}
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="meta-index" style={{ color: 'var(--ink-400)' }}>
                  Status
                </span>
                <p className="text-sm font-medium" style={{ color: 'var(--ink-950)' }}>
                  {system.status}
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="meta-index" style={{ color: 'var(--ink-400)' }}>
                  Built For
                </span>
                <p className="text-sm font-medium" style={{ color: 'var(--ink-950)' }}>
                  {system.users}
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="meta-index" style={{ color: 'var(--ink-400)' }}>
                  Technology Direction
                </span>
                <p className="text-sm font-medium" style={{ color: 'var(--ink-950)' }}>
                  {system.techDirection}
                </p>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      <section className="border-t py-10 sm:py-12 lg:py-14" style={{ borderColor: 'var(--line)', background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <span className="eyebrow">Related System</span>
            <a href={`/systems/${related.slug}`} className="text-xl transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--ink-950)' }}>
              {related.name}
            </a>
            <span className="text-sm" style={{ color: 'var(--ink-700)' }}>
              {related.category}
            </span>
          </div>
          <Button href={`/systems/${related.slug}`} variant="secondary">
            View System
          </Button>
        </Container>
      </section>

      <ContactCTA title="Need a system like this one?" description="Tell me about your workflow and I'll recommend a practical next step." />
    </>
  );
}
