import type { TechSummaryGroup } from '@/data/techSummary';

interface TechGroupProps {
  groups: TechSummaryGroup[];
  dark?: boolean;
}

/** Compact grouped tech summary — mono labels and a plain item list, not a logo wall. */
export default function TechGroup({ groups, dark = false }: TechGroupProps) {
  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4" data-reveal data-reveal-type="stagger">
      {groups.map((group) => (
        <div key={group.label} className="flex flex-col gap-2">
          <span className="eyebrow" style={dark ? { color: 'var(--accent)' } : undefined}>
            {group.label}
          </span>
          <p className="text-sm leading-relaxed" style={{ color: dark ? 'var(--on-dark)' : 'var(--ink-950)' }}>
            {group.items.join(' · ')}
          </p>
        </div>
      ))}
    </div>
  );
}
