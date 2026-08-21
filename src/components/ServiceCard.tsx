import type { ReactNode } from 'react';
import type { WordPressService } from '@/data/services';

interface ServiceCardProps {
  service: WordPressService;
  icon: ReactNode;
}

/** Simple, scannable service card — icon, title, one-line outcome, and the top 3
 *  deliverables. Deliberately trims WordPressService's fuller schema (whoFor, technology,
 *  related-project link) to stay easy to read across 9 cards. */
export default function ServiceCard({ service, icon }: ServiceCardProps) {
  return (
    <div className="card-surface group flex h-full flex-col gap-3 p-5" style={{ background: 'var(--paper-050)' }} data-reveal>
      <span
        className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border transition-transform duration-300 group-hover:scale-105"
        style={{ background: 'var(--accent-soft)', color: 'var(--accent)', borderColor: 'var(--line)' }}
      >
        {icon}
      </span>

      <h3 className="text-base font-semibold" style={{ color: 'var(--ink-950)' }}>
        {service.title}
      </h3>

      <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
        {service.outcome}
      </p>

      <ul className="mt-1 flex flex-col gap-1.5">
        {service.deliverables.slice(0, 3).map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--ink-950)' }}>
            <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full" style={{ background: 'var(--accent)' }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
