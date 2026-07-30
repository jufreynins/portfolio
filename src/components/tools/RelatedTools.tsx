import { TOOLS } from '@/data/tools';

interface RelatedToolsProps {
  currentId: string;
  limit?: number;
}

export default function RelatedTools({ currentId, limit = 3 }: RelatedToolsProps) {
  const related = TOOLS.filter((tool) => tool.id !== currentId).slice(0, limit);
  if (!related.length) return null;

  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
        Related tools
      </span>
      <div className="flex flex-wrap gap-2">
        {related.map((tool) => (
          <a
            key={tool.id}
            href={tool.href}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors hover:border-[var(--tool-accent)]"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)', background: 'var(--surface-white)' }}
          >
            {tool.title}
          </a>
        ))}
      </div>
    </div>
  );
}
