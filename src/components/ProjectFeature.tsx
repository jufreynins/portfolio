import Image from 'next/image';
import type { Project } from '@/data/projects';
import BrowserFrame from './BrowserFrame';

interface ProjectFeatureProps {
  project: Project;
  index: number;
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

/** Large-format editorial project row — always image-left/text-right, same orientation
 *  for every project (no alternating "zigzag" layout, by explicit request). */
export default function ProjectFeature({ project, index, priority = false }: ProjectFeatureProps) {
  const indexLabel = String(index).padStart(2, '0');

  return (
    <a href={`/work/${project.slug}`} className="group grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-10" data-reveal data-reveal-type="fade-up">
      <div className="lg:col-span-6">
        <BrowserFrame label={project.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}>
          <Image
            src={project.image}
            alt={`${project.name} website preview`}
            width={1200}
            height={750}
            priority={priority}
            className="aspect-[16/9] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            style={{ background: 'var(--paper-050)' }}
          />
        </BrowserFrame>
        <p className="meta-index mt-2">
          FIG.{indexLabel} — {project.name.toUpperCase()}
        </p>
      </div>

      <div className="lg:col-span-6">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xl" style={{ color: 'var(--line-strong)' }}>
            {indexLabel}
          </span>
          <div className="flex flex-col gap-1.5">
            <span className="eyebrow">{project.category}</span>
            <h3 className="text-lg transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ color: 'var(--ink-950)' }}>
              {project.name}
            </h3>
          </div>
          <p className="max-w-md text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
            {project.results}
          </p>
          <p className="meta-index" style={{ color: 'var(--ink-400)' }}>
            {project.technologies.join(' · ')}
          </p>
          <span className="mt-0.5 inline-flex w-fit items-center gap-1.5 text-sm font-bold" style={{ color: 'var(--ink-950)' }}>
            View Case Study
            <Arrow />
          </span>
        </div>
      </div>
    </a>
  );
}
