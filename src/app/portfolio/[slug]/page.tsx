import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Container from '@/components/Container';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import { siteConfig } from '@/config/site';
import { projects, getProjectBySlug } from '@/data/projects';
import { buildMetadata } from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return buildMetadata({ noindex: true });

  return buildMetadata({
    title: `${project.name} — WordPress Case Study — ${siteConfig.name}`,
    description: project.description,
    canonical: `${siteConfig.url}/portfolio/${project.slug}`,
  });
}

export default async function ProjectCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const related = projects[(index + 1) % projects.length];

  return (
    <>
      <section className="pt-24 pb-10 sm:pt-28 sm:pb-12" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-5">
          <a href="/portfolio" className="inline-flex w-fit items-center gap-1.5 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="17" y1="7" x2="7" y2="17" />
              <polyline points="17 17 7 17 7 7" />
            </svg>
            Back to Portfolio
          </a>

          <div className="flex flex-wrap items-center gap-3">
            <span className="eyebrow">{project.category}</span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide"
              style={{ borderColor: 'color-mix(in srgb, var(--color-success) 35%, white)', color: 'var(--color-success)', background: 'var(--color-success-soft)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--color-success)' }} />
              {project.status}
            </span>
          </div>

          <h1 style={{ color: 'var(--text-primary)' }}>{project.name}</h1>
          <p className="max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Button href={project.url} target="_blank" rel="noopener noreferrer" variant="primary">
              Visit Live Website
            </Button>
            <Button href="/contact" variant="secondary">
              Start a Similar Project
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-12" style={{ background: 'var(--surface-white)' }}>
        <Container>
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
            <Image src={project.image} alt={`Screenshot of the ${project.name} website`} width={1600} height={900} className="h-full w-full object-cover" priority />
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-12" style={{ background: 'var(--surface-white)' }}>
        <Container>
          <dl className="grid grid-cols-1 gap-8 border-t pt-10 sm:grid-cols-2" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex flex-col gap-2">
              <dt className="eyebrow">The Business</dt>
              <dd className="leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {project.business}
              </dd>
            </div>
            <div className="flex flex-col gap-2">
              <dt className="eyebrow">The Goal</dt>
              <dd className="leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {project.goal}
              </dd>
            </div>
            <div className="flex flex-col gap-2">
              <dt className="eyebrow">My Role &amp; Contribution</dt>
              <dd className="leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {project.contribution}
              </dd>
              <span className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
                Role: {project.role}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <dt className="eyebrow">Practical Outcome</dt>
              <dd className="leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {project.results}
              </dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-col gap-3 border-t pt-10" style={{ borderColor: 'var(--border-color)' }}>
            <span className="eyebrow">Technologies Used</span>
            <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full px-3 py-1 font-mono text-xs font-medium"
                  style={{ background: 'var(--surface-warm)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="border-t py-12 sm:py-14" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <span className="eyebrow">Related Project</span>
            <a href={`/portfolio/${related.slug}`} className="text-xl font-bold underline-offset-4 hover:underline" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              {related.name}
            </a>
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {related.category}
            </span>
          </div>
          <Button href={`/portfolio/${related.slug}`} variant="secondary">
            View Case Study
          </Button>
        </Container>
      </section>

      <section className="dark-grid-bg py-14 sm:py-16" style={{ background: 'var(--brand-dark)' }}>
        <Container className="flex flex-col items-start gap-6">
          <SectionHeading
            eyebrow="Let's build something"
            title="Need a website like this one?"
            description="Tell me a bit about your business and goals. I'll recommend a practical next step within one business day."
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
