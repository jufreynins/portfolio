import type { ReactNode } from 'react';

interface ToolGuideAccordionProps {
  title?: string;
  tips?: string[];
  children?: ReactNode;
  defaultOpen?: boolean;
}

export default function ToolGuideAccordion({ title = 'How it works', tips, children, defaultOpen = false }: ToolGuideAccordionProps) {
  return (
    <details className="group rounded-2xl border" style={{ borderColor: 'var(--border-color)' }} open={defaultOpen}>
      <summary
        className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-5 py-4 text-sm font-bold"
        style={{ color: 'var(--text-primary)' }}
      >
        {title}
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
          className="flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </summary>
      <div className="flex flex-col gap-4 px-5 pb-5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {children}
        {tips && tips.length > 0 && (
          <ul className="flex flex-col gap-2">
            {tips.map((tip) => (
              <li key={tip} className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full" style={{ background: 'var(--tool-accent)' }} aria-hidden="true" />
                {tip}
              </li>
            ))}
          </ul>
        )}
      </div>
    </details>
  );
}
