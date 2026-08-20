import Image from 'next/image';
import type { Project } from '@/data/projects';
import BrowserFrame from './BrowserFrame';

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
}

const Arrow = () => (
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
    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

/** One project per card — screenshot, business, role, and what was delivered. */
export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  return (
    <a
      href={`/work/${project.slug}`}
      className="card-surface group flex flex-col gap-4 p-5"
      style={{ background: 'var(--paper-050)' }}
      data-reveal
      data-reveal-type="fade-up"
    >
      <BrowserFrame label={project.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}>
        <Image
          src={project.image}
          alt={`${project.name} website preview`}
          width={800}
          height={500}
          priority={priority}
          className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          style={{ background: 'var(--paper-050)' }}
        />
      </BrowserFrame>

      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <span className="eyebrow">{project.category}</span>
          <h3 className="text-lg transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ color: 'var(--ink-950)' }}>
            {project.name}
          </h3>
        </div>

        <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
          {project.business}
        </p>

        <div className="flex flex-col gap-1 border-t pt-3" style={{ borderColor: 'var(--line)' }}>
          <span className="meta-index" style={{ color: 'var(--ink-400)' }}>
            My Role
          </span>
          <p className="text-sm font-medium" style={{ color: 'var(--ink-950)' }}>
            {project.role}
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <span className="meta-index" style={{ color: 'var(--ink-400)' }}>
            What I Delivered
          </span>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-950)' }}>
            {project.results}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="meta-index rounded-full border px-2.5 py-1 normal-case"
              style={{ borderColor: 'var(--line)', color: 'var(--ink-700)' }}
            >
              {tech}
            </span>
          ))}
        </div>

        <span className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-bold" style={{ color: 'var(--ink-950)' }}>
          View Case Study
          <Arrow />
        </span>
      </div>
    </a>
  );
}
