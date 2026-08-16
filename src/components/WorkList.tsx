'use client';

import { useMemo, useState } from 'react';
import type { Project } from '@/data/projects';
import ProjectFeature from './ProjectFeature';

const FILTERS = ['All', 'Dynamic WordPress', 'E-Commerce'] as const;
type Filter = (typeof FILTERS)[number];

function projectTags(project: Project): Filter[] {
  const tags: Filter[] = [];
  if (project.technologies.includes('JetEngine') || project.technologies.includes('Custom Post Types')) tags.push('Dynamic WordPress');
  if (project.technologies.includes('WooCommerce')) tags.push('E-Commerce');
  return tags;
}

export default function WorkList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Filter>('All');

  const filtered = useMemo(() => {
    if (active === 'All') return projects;
    return projects.filter((project) => projectTags(project).includes(active));
  }, [active, projects]);

  return (
    <div className="flex flex-col gap-14 sm:gap-16">
      <div className="flex flex-wrap gap-x-7 gap-y-2 border-b pb-5" style={{ borderColor: 'var(--line)' }} role="group" aria-label="Filter projects by type">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            aria-pressed={active === filter}
            onClick={() => setActive(filter)}
            className="min-h-[32px] text-sm font-bold transition-colors duration-200"
            style={{ color: active === filter ? 'var(--ink-950)' : 'var(--ink-400)' }}
          >
            {filter}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm" style={{ color: 'var(--ink-700)' }}>
          No projects match this filter yet.
        </p>
      ) : (
        <div className="flex flex-col gap-14 sm:gap-16">
          {filtered.map((project, i) => (
            <ProjectFeature key={project.slug} project={project} index={i + 1} priority={i < 2} />
          ))}
        </div>
      )}
    </div>
  );
}
