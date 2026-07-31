interface ProcessingNoteProps {
  children: string;
  className?: string;
}

/** Compact, contextual processing/privacy label — not a repeated full-width banner. */
export default function ProcessingNote({ children, className = '' }: ProcessingNoteProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${className}`} style={{ color: 'var(--text-secondary)' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--tool-accent)' }} aria-hidden="true">
        <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4Z" />
      </svg>
      {children}
    </span>
  );
}
