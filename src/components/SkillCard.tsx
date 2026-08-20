interface SkillCardProps {
  title: string;
  description?: string;
  items: string[];
  icon?: React.ReactNode;
}

/** Compact card for a skills/tools/tech category — title, one-line description, and a
 *  bullet list. Deliberately plain body/heading type throughout (no mono eyebrow, no
 *  comma-joined run-on text) so every instance of this pattern reads the same way. */
export default function SkillCard({ title, description, items, icon }: SkillCardProps) {
  return (
    <div className="card-surface group flex h-full flex-col gap-3 p-5" style={{ background: 'var(--paper-050)' }} data-reveal>
      {icon && (
        <span
          className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border transition-transform duration-300 group-hover:scale-105"
          style={{ background: 'var(--accent-soft)', color: 'var(--accent)', borderColor: 'var(--line)' }}
        >
          {icon}
        </span>
      )}
      <h3 className="text-base font-semibold" style={{ color: 'var(--ink-950)' }}>
        {title}
      </h3>
      {description && (
        <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
          {description}
        </p>
      )}
      <ul className="mt-1 flex flex-col gap-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--ink-950)' }}>
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full" style={{ background: 'var(--accent)' }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
