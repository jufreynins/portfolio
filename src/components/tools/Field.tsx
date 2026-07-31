import type { ReactNode } from 'react';

export const fieldClass =
  'w-full min-h-[44px] rounded-xl border px-3.5 py-2.5 text-sm transition-all focus:outline-none focus:ring-2';

export const fieldStyle = { borderColor: 'var(--border-color)', color: 'var(--text-primary)', background: 'var(--surface-white)' } as const;

interface FieldProps {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export default function Field({ label, htmlFor, hint, error, required, children, className = '' }: FieldProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={htmlFor} className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {hint}
        </p>
      )}
      {error && (
        <p role="alert" className="text-xs" style={{ color: 'var(--color-error)' }}>
          {error}
        </p>
      )}
    </div>
  );
}
