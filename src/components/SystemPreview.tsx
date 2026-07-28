interface SystemPreviewProps {
  /** Monospace route label shown in the mock browser chrome, e.g. "/dashboard/inventory" */
  routeLabel: string;
  /** Index (0-3) of the active sidebar item. */
  activeNav?: number;
}

export default function SystemPreview({ routeLabel, activeNav = 0 }: SystemPreviewProps) {
  const navItems = [0, 1, 2, 3];
  const rows = [0, 1, 2];

  return (
    <div
      className="system-preview relative overflow-hidden rounded-xl border"
      style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)' }}
      aria-hidden="true"
    >
      <div
        className="flex items-center gap-1.5 border-b px-3 py-2"
        style={{ borderColor: 'var(--border-color)', background: 'var(--brand-soft)' }}
      >
        <span className="h-2 w-2 rounded-full" style={{ background: 'var(--border-color)' }} />
        <span className="h-2 w-2 rounded-full" style={{ background: 'var(--border-color)' }} />
        <span className="h-2 w-2 rounded-full" style={{ background: 'var(--border-color)' }} />
        <span className="ml-2 truncate font-mono text-[10px]" style={{ color: 'var(--text-secondary)' }}>
          {routeLabel}
        </span>
      </div>

      <div className="flex">
        <div className="hidden w-10 flex-col gap-2 border-r p-2 sm:flex" style={{ borderColor: 'var(--border-color)' }}>
          {navItems.map((i) => (
            <span
              key={i}
              className="h-2 w-full rounded-full"
              style={{ background: i === activeNav ? 'var(--brand-primary)' : 'var(--border-color)' }}
            />
          ))}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-3">
          <div className="grid grid-cols-3 gap-1.5">
            <span className="h-7 rounded-lg" style={{ background: 'var(--brand-lavender)' }} />
            <span className="h-7 rounded-lg" style={{ background: 'var(--brand-soft)' }} />
            <span className="h-7 rounded-lg" style={{ background: 'var(--brand-soft)' }} />
          </div>
          <div className="flex flex-col gap-1.5">
            {rows.map((i) => (
              <span key={i} className="flex items-center gap-2 rounded-md px-2 py-1.5" style={{ background: 'var(--surface-warm)' }}>
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: 'var(--brand-primary)' }} />
                <span className="h-1.5 rounded-full" style={{ width: `${62 - i * 12}%`, background: 'var(--border-color)' }} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
