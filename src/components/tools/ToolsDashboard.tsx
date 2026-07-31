'use client';

import { useMemo, useState } from 'react';
import { CATEGORIES, TOOLS } from '@/data/tools';
import ToolCard from '@/components/tools/ToolCard';

export default function ToolsDashboard() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOOLS.filter((tool) => {
      const matchesCategory = category === 'All' || tool.category === category;
      const matchesQuery = !q || tool.title.toLowerCase().includes(q) || tool.purpose.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const featured = filtered.find((t) => t.featured);
  const rest = filtered.filter((t) => !t.featured);

  return (
    <div className="flex flex-col gap-6">
      {/* Search + category filters */}
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
            placeholder="Search tools&hellip;"
            className="w-full min-h-[40px] rounded-full border py-2 pl-9 pr-4 text-sm"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)', background: 'var(--surface-white)' }}
          />
        </div>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter tools by category">
          {CATEGORIES.map((cat) => {
            const isActive = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                aria-pressed={isActive}
                className="min-h-[36px] rounded-full px-3.5 text-xs font-bold transition-colors"
                style={isActive ? { background: 'var(--brand-primary)', color: '#ffffff' } : { color: 'var(--text-secondary)', border: '1px solid var(--border-color)' }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tool grid */}
      {filtered.length === 0 ? (
        <p className="py-10 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
          No tools match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured && <ToolCard key={featured.id} tool={featured} />}
          {rest.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
}
