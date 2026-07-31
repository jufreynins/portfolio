'use client';

import { useMemo, useState } from 'react';
import type { Project } from '@/data/projects';
import ProjectCard from './ProjectCard';

const FILTERS = ['All', 'Dynamic WordPress', 'E-Commerce'] as const;
type Filter = (typeof FILTERS)[number];

function projectTags(project: Project): Filter[] {
  const tags: Filter[] = [];
  if (project.technologies.includes('JetEngine') || project.technologies.includes('Custom Post Types')) tags.push('Dynamic WordPress');
  if (project.technologies.includes('WooCommerce')) tags.push('E-Commerce');
  return tags;
}

export default function PortfolioFilterGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>('All');

  const filtered = useMemo(() => {
    if (active === 'All') return projects;
    return projects.filter((project) => projectTags(project).includes(active));
  }, [active, projects]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by type">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={active === filter}
            onClick={() => setActive(filter)}
            className="min-h-[44px] rounded-full border px-4 text-sm font-semibold transition-colors duration-200"
            style={
              active === filter
                ? { background: 'var(--brand-primary)', borderColor: 'var(--brand-primary)', color: 'var(--text-on-dark)' }
                : { background: 'var(--surface-white)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }
            }
          >
            {filter}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          No projects match this filter yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i + 1} priority={i < 3} />
          ))}
        </div>
      )}
    </div>
  );
}
