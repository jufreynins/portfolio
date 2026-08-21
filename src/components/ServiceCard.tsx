import type { ReactNode } from 'react';
import type { WordPressService } from '@/data/services';

interface ServiceCardProps {
  service: WordPressService;
  icon: ReactNode;
  relatedHref?: string;
  relatedLabel?: string;
}

/** Simple, scannable service card — icon, title, one-line outcome, top 3 deliverables,
 *  and an optional link to the real project/system that demonstrates it. Deliberately
 *  trims WordPressService's fuller schema (whoFor, technology) to stay easy to read
 *  across 9 cards rather than turning each one into a small case study. */
export default function ServiceCard({ service, icon, relatedHref, relatedLabel }: ServiceCardProps) {
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

      {relatedHref && (
        <a
          href={relatedHref}
          className="mt-auto inline-flex w-fit items-center gap-1.5 pt-2 text-sm font-bold"
          style={{ color: 'var(--ink-950)' }}
        >
          See it in {relatedLabel}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      )}
    </div>
  );
}
