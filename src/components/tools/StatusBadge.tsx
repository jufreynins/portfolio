import type { ToolStatus } from '@/data/tools';

const STATUS_STYLE: Record<ToolStatus, { color: string; border: string; bg: string; dot: string }> = {
  Available: { color: 'var(--color-success)', border: 'color-mix(in srgb, var(--color-success) 35%, white)', bg: 'var(--color-success-soft)', dot: 'Live and ready to use' },
  Beta: { color: '#1d4ed8', border: 'color-mix(in srgb, #1d4ed8 30%, white)', bg: '#e7ecf8', dot: 'Working, still being refined' },
  'In Development': { color: 'var(--color-warning)', border: 'color-mix(in srgb, var(--color-warning) 35%, white)', bg: 'var(--color-warning-soft)', dot: 'Being built, not yet usable' },
  Planned: { color: 'var(--text-secondary)', border: 'var(--border-color)', bg: 'var(--surface-white)', dot: 'On the roadmap, not started' },
};

interface StatusBadgeProps {
  status: ToolStatus;
  className?: string;
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const s = STATUS_STYLE[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide ${className}`}
      style={{ borderColor: s.border, color: s.color, background: s.bg }}
      title={s.dot}
    >
      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: s.color }} aria-hidden="true" />
      {status}
    </span>
  );
}
