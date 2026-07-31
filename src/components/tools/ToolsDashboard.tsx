'use client';

import { useMemo, useState } from 'react';
import { CATEGORIES, STATUSES, TOOLS, type ToolStatus } from '@/data/tools';
import ToolCard from '@/components/tools/ToolCard';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export default function ToolsDashboard() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<'All' | ToolStatus>('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOOLS.filter((tool) => {
      const matchesStatus = status === 'All' || tool.status === status;
      const matchesQuery = !q || tool.title.toLowerCase().includes(q) || tool.purpose.toLowerCase().includes(q) || tool.category.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [query, status]);

  const groups = CATEGORIES.map((category) => ({ category, tools: filtered.filter((t) => t.category === category) })).filter((g) => g.tools.length > 0);

  return (
    <div className="flex flex-col gap-8">
      {/* Search + status filter + count */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2"
              style={{ color: 'var(--text-muted)' }}
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <label htmlFor="tool-search" className="sr-only">
              Search tools
            </label>
            <input
              id="tool-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools…"
              className="w-full min-h-[44px] rounded-full border py-2 pl-9 pr-4 text-sm"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)', background: 'var(--surface-white)' }}
            />
          </div>
          <p className="text-xs font-medium" style={{ color: 'var(--text-muted)' }} aria-live="polite">
            Showing {filtered.length} of {TOOLS.length} tools
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter tools by status">
          {(['All', ...STATUSES] as const).map((s) => {
            const isActive = status === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                aria-pressed={isActive}
                className="min-h-[36px] rounded-full px-3.5 text-xs font-bold transition-colors"
                style={isActive ? { background: 'var(--brand-primary)', color: '#ffffff' } : { color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
              >
                {s}
              </button>
            );
          })}
        </div>

        {/* Category quick-nav */}
        <nav aria-label="Jump to category" className="flex flex-wrap gap-x-4 gap-y-1.5 border-t pt-3" style={{ borderColor: 'var(--border-color)' }}>
          {CATEGORIES.map((category) => (
            <a key={category} href={`#${slugify(category)}`} className="text-xs font-semibold underline-offset-2 hover:underline" style={{ color: 'var(--brand-primary)' }}>
              {category}
            </a>
          ))}
        </nav>
      </div>

      {/* Category groups */}
      {groups.length === 0 ? (
        <p className="py-10 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
          No tools match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        groups.map(({ category, tools }) => (
          <section key={category} id={slugify(category)} className="scroll-mt-28">
            <div className="mb-3 flex items-baseline justify-between gap-3">
              <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                {category}
              </h2>
              <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                {tools.length}
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
