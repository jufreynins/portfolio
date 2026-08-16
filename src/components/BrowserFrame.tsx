import type { ReactNode } from 'react';

interface BrowserFrameProps {
  /** Real, truthful label shown in the chrome bar — a project's live URL or a route path. Never invented UI. */
  label: string;
  children: ReactNode;
  className?: string;
}

/** Clean, neutral browser chrome around a real screenshot — a credibility device, not a
 *  decorative mockup. No fake sidebar/rows; the image itself does the work. */
export default function BrowserFrame({ label, children, className = '' }: BrowserFrameProps) {
  return (
    <div className={`corner-marks overflow-hidden rounded-[var(--radius-sm)] border ${className}`} style={{ borderColor: 'var(--line)', color: 'var(--ink-950)' }}>
      <div className="flex items-center gap-1.5 border-b px-3 py-2" style={{ borderColor: 'var(--line)', background: 'var(--paper-050)' }}>
        <span className="h-2 w-2 rounded-full" style={{ background: 'var(--line-strong)' }} />
        <span className="h-2 w-2 rounded-full" style={{ background: 'var(--line-strong)' }} />
        <span className="h-2 w-2 rounded-full" style={{ background: 'var(--line-strong)' }} />
        <span className="meta-index ml-2 truncate normal-case" style={{ color: 'var(--ink-400)' }}>
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}
