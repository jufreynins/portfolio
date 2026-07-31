interface ValidationMessageProps {
  id?: string;
  children: string;
  tone?: 'error' | 'warning';
}

export default function ValidationMessage({ id, children, tone = 'error' }: ValidationMessageProps) {
  const color = tone === 'error' ? 'var(--color-error)' : 'var(--color-warning)';
  return (
    <p id={id} role="alert" className="flex items-start gap-1.5 text-xs leading-snug" style={{ color }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {children}
    </p>
  );
}
