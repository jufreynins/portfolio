import type { TechSummaryGroup } from '@/data/techSummary';

interface TechGroupProps {
  groups: TechSummaryGroup[];
  dark?: boolean;
}

/** Compact grouped tech summary — mono labels and a plain item list, not a logo wall.
 *  The first group (WordPress) always gets a full-width, larger lead treatment so it
 *  visually dominates the rest of the stack, per the site's WordPress-first positioning. */
export default function TechGroup({ groups, dark = false }: TechGroupProps) {
  const [lead, ...rest] = groups;
  const hairline = dark ? 'rgba(247,245,242,0.15)' : 'var(--line)';

  return (
    <div className="flex flex-col gap-6">
      {lead && (
        <div className="flex flex-col gap-2 border-b pb-6" style={{ borderColor: hairline }} data-reveal>
          <span className="eyebrow" style={{ color: 'var(--accent)' }}>
            {lead.label}
          </span>
          <p className="text-lg font-medium leading-relaxed" style={{ color: dark ? 'var(--on-dark)' : 'var(--ink-950)' }}>
            {lead.items.join(' · ')}
          </p>
        </div>
      )}

      {rest.length > 0 && (
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4" data-reveal data-reveal-type="stagger">
          {rest.map((group) => (
            <div key={group.label} className="flex flex-col gap-2">
              <span className="eyebrow" style={dark ? { color: 'rgba(247,245,242,0.6)' } : { color: 'var(--ink-400)' }}>
                {group.label}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: dark ? 'var(--on-dark)' : 'var(--ink-950)' }}>
                {group.items.join(' · ')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
