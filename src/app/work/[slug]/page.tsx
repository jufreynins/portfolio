import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Container from '@/components/Container';
import Bleed from '@/components/Bleed';
import Button from '@/components/Button';
import ContactCTA from '@/components/ContactCTA';
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
    canonical: `${siteConfig.url}/work/${project.slug}`,
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
      <section className="pt-28 pb-10 sm:pt-32 sm:pb-12" style={{ background: 'var(--paper-000)' }}>
        <Container className="flex flex-col gap-5">
          <a href="/work" className="inline-flex w-fit items-center gap-1.5 text-sm font-medium transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--ink-700)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="17" y1="7" x2="7" y2="17" />
              <polyline points="17 17 7 17 7 7" />
            </svg>
            Back to Selected Work
          </a>

          <p className="meta-index">
            {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')} — {project.category.toUpperCase()}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <h1 style={{ color: 'var(--ink-950)' }}>{project.name}</h1>
            <span
              className="meta-index inline-flex items-center gap-1.5 rounded-full border px-3 py-1"
              style={{ borderColor: 'color-mix(in srgb, var(--status-success) 35%, white)', color: 'var(--status-success)', background: 'var(--status-success-soft)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--status-success)' }} />
              {project.status}
            </span>
          </div>

          <p className="max-w-2xl leading-relaxed" style={{ color: 'var(--ink-700)', fontSize: 'var(--text-lead)' }}>
            {project.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-1">
            <Button href={project.url} target="_blank" rel="noopener noreferrer" variant="primary">
              Visit Live Website
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-10 sm:py-12" style={{ background: 'var(--paper-000)' }}>
        <Bleed>
          <div className="corner-marks overflow-hidden rounded-[var(--radius-md)]" style={{ color: 'var(--ink-950)' }}>
            <Image
              src={project.image}
              alt={`Screenshot of the ${project.name} website`}
              width={1920}
              height={1080}
              priority
              className="aspect-[16/9] w-full object-cover object-top"
              style={{ background: 'var(--paper-050)' }}
            />
          </div>
        </Bleed>
      </section>

      <section className="py-10 sm:py-14" style={{ background: 'var(--paper-000)' }}>
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-10 lg:col-span-8">
            <div className="flex flex-col gap-3">
              <span className="eyebrow">Project Overview</span>
              <p className="leading-relaxed" style={{ color: 'var(--ink-950)' }}>
                {project.description}
              </p>
              <p className="leading-relaxed" style={{ color: 'var(--ink-950)' }}>
                {project.goal}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="eyebrow">My Role</span>
              <p className="leading-relaxed" style={{ color: 'var(--ink-950)' }}>
                {project.contribution}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="eyebrow">WordPress Implementation</span>
              <p className="leading-relaxed" style={{ color: 'var(--ink-950)' }}>
                Built on {project.technologies.join(', ')}, following the business&apos;s existing brand and content requirements end to end.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <span className="eyebrow">Result</span>
              <p className="leading-relaxed" style={{ color: 'var(--ink-950)' }}>
                {project.results}
              </p>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="flex flex-col gap-8 border-t pt-8 lg:sticky lg:top-32 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0" style={{ borderColor: 'var(--line)' }}>
              <div className="flex flex-col gap-1.5">
                <span className="meta-index" style={{ color: 'var(--ink-400)' }}>
                  Role
                </span>
                <p className="text-sm font-medium" style={{ color: 'var(--ink-950)' }}>
                  {project.role}
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="meta-index" style={{ color: 'var(--ink-400)' }}>
                  Category
                </span>
                <p className="text-sm font-medium" style={{ color: 'var(--ink-950)' }}>
                  {project.category}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="meta-index" style={{ color: 'var(--ink-400)' }}>
                  Stack
                </span>
                <ul className="flex flex-col gap-1" aria-label="Technologies used">
                  {project.technologies.map((tech) => (
                    <li key={tech} className="text-sm font-medium" style={{ color: 'var(--ink-950)' }}>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      <section className="border-t py-14 sm:py-16" style={{ borderColor: 'var(--line)', background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <span className="eyebrow">Related Project</span>
            <a href={`/work/${related.slug}`} className="text-xl transition-colors hover:text-[var(--accent)]" style={{ color: 'var(--ink-950)' }}>
              {related.name}
            </a>
            <span className="text-sm" style={{ color: 'var(--ink-700)' }}>
              {related.category}
            </span>
          </div>
          <Button href={`/work/${related.slug}`} variant="secondary">
            View Case Study
          </Button>
        </Container>
      </section>

      <ContactCTA title="Need a website like this one?" description="Tell me a bit about your business and goals." />
    </>
  );
}
