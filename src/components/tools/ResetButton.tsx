interface ResetButtonProps {
  onClick: () => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export default function ResetButton({ onClick, label = 'Reset', className = '', disabled = false }: ResetButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full px-4 text-xs font-bold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      style={{ color: 'var(--text-secondary)' }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
      </svg>
      {label}
    </button>
  );
}
