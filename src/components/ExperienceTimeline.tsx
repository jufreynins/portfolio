import type { ExperienceEntry } from '@/data/experience';

interface ExperienceTimelineProps {
  entries: ExperienceEntry[];
  /** Compact mode drops the nested per-client project list — used on the homepage. */
  compact?: boolean;
}

/** Thin-separator list, not cards — role/org/period plus a short summary. */
export default function ExperienceTimeline({ entries, compact = false }: ExperienceTimelineProps) {
  return (
    <div className="flex flex-col divide-y" style={{ borderColor: 'var(--line)' }}>
      {entries.map((entry) => (
        <div key={`${entry.role}-${entry.period}`} className="grid grid-cols-1 gap-4 py-8 first:pt-0 lg:grid-cols-12 lg:gap-8" data-reveal>
          <div className="lg:col-span-3">
            <span className="eyebrow">{entry.period}</span>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-9">
            <div>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--ink-950)' }}>
                {entry.role}
              </h3>
              <p className="text-sm" style={{ color: 'var(--ink-700)' }}>
                {entry.org}
              </p>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
              {entry.summary}
            </p>
            {!compact && entry.projects && (
              <ul className="mt-2 flex flex-col gap-3">
                {entry.projects.map((project) => (
                  <li key={project.client} className="flex flex-col gap-1 border-l-2 pl-4" style={{ borderColor: 'var(--line)' }}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-sm font-medium" style={{ color: 'var(--ink-950)' }}>
                        {project.client}
                      </span>
                      <span className="meta-index">{project.period}</span>
                    </div>
                    <span className="text-sm" style={{ color: 'var(--ink-700)' }}>
                      {project.detail}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
