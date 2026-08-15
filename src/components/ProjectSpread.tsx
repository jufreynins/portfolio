import Image from 'next/image';
import type { Project } from '@/data/projects';

interface ProjectSpreadProps {
  project: Project;
  index: number;
  reversed?: boolean;
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

/** Large-format editorial project row — supersedes the identical-card grid. Links
 *  straight to the case-study page (no modal); alternates image/text sides via `reversed`. */
export default function ProjectSpread({ project, index, reversed = false, priority = false }: ProjectSpreadProps) {
  const indexLabel = String(index).padStart(2, '0');

  return (
    <a
      href={`/portfolio/${project.slug}`}
      className="group grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14"
      data-reveal
      data-reveal-type="fade-up"
    >
      <div className={`lg:col-span-7 ${reversed ? 'lg:order-2' : ''}`}>
        <div className="corner-marks overflow-hidden rounded-[var(--radius-md)]" style={{ color: 'var(--ink-950)' }}>
          <Image
            src={project.image}
            alt={`${project.name} website preview`}
            width={1200}
            height={750}
            priority={priority}
            className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            style={{ background: 'var(--paper-050)' }}
          />
        </div>
        <p className="meta-index mt-3">
          FIG.{indexLabel} — {project.name.toUpperCase()}
        </p>
      </div>

      <div className={`flex flex-col gap-5 lg:col-span-5 ${reversed ? 'lg:order-1' : ''}`}>
        <span className="font-mono text-4xl" style={{ color: 'var(--line-strong)' }}>
          {indexLabel}
        </span>
        <div className="flex flex-col gap-2">
          <span className="eyebrow">{project.category}</span>
          <h3 className="text-2xl transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ color: 'var(--ink-950)' }}>
            {project.name}
          </h3>
        </div>
        <p className="max-w-md text-base leading-relaxed" style={{ color: 'var(--ink-700)' }}>
          {project.results}
        </p>
        <p className="meta-index" style={{ color: 'var(--ink-400)' }}>
          {project.technologies.join(' · ')}
        </p>
        <span className="mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-bold" style={{ color: 'var(--ink-950)' }}>
          View Case Study
          <Arrow />
        </span>
      </div>
    </a>
  );
}
