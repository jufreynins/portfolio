'use client';

import Image from 'next/image';
import type { Project } from '@/data/projects';
import { useProjectModal } from './ProjectModalContext';

interface ProjectCardProps {
  project: Project;
  index: number;
  priority?: boolean;
}

export default function ProjectCard({ project, index, priority = false }: ProjectCardProps) {
  const { openProject } = useProjectModal();

  return (
    <article
      className="project-card reveal flex flex-col overflow-hidden rounded-2xl border"
      style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)' }}
      data-reveal
      data-reveal-type="fade-up"
    >
      <div className="relative aspect-[4/3] overflow-hidden" style={{ background: 'var(--surface-warm)' }}>
        <Image
          src={project.image}
          alt={`Screenshot of the ${project.name} website`}
          width={900}
          height={675}
          loading={priority ? 'eager' : 'lazy'}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <span
          className="absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[11px]"
          style={{ background: 'var(--surface-white)', color: 'var(--text-primary)' }}
        >
          {String(index).padStart(2, '0')}
        </span>
        <span
          className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wide"
          style={{ background: 'var(--surface-white)', color: 'var(--text-secondary)' }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--color-success)' }} />
          Client Project
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <span className="eyebrow">{project.category}</span>
        <h3 className="text-xl" style={{ color: 'var(--text-primary)' }}>
          {project.name}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', maxWidth: 'none' }}>
          {project.results}
        </p>

        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full px-2.5 py-1 font-mono text-[10px] font-medium"
              style={{ background: 'var(--surface-warm)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          <button
            type="button"
            onClick={() => openProject(project)}
            className="view-details-btn inline-flex min-h-[38px] items-center justify-center rounded-full border-2 px-3.5 text-xs font-bold transition-colors duration-300"
            style={{ borderColor: 'var(--brand-primary)', color: 'var(--brand-primary)' }}
          >
            View Details
          </button>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-full px-3.5 text-xs font-bold transition-colors duration-300"
            style={{ background: 'var(--brand-primary)', color: 'var(--text-on-dark)' }}
          >
            Visit Site
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>
      </div>

      <style jsx>{`
        .project-card {
          box-shadow: var(--shadow-sm);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .project-card:hover {
          box-shadow: 0 20px 40px -20px rgba(37, 19, 79, 0.25);
          border-color: var(--border-strong);
          transform: translateY(-4px);
        }
        .view-details-btn:hover {
          background: var(--brand-primary);
          color: var(--text-on-dark);
        }
      `}</style>
    </article>
  );
}
