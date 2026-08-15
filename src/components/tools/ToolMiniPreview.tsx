import type { ToolCardVariant } from '@/data/tools';

interface ToolMiniPreviewProps {
  variant: ToolCardVariant;
  accent: string;
  accentSoft: string;
}

/** Small preview keyed off the tool's card variant (not a bespoke preview per tool) — keeps 17+ tools maintainable. */
export default function ToolMiniPreview({ variant, accent, accentSoft }: ToolMiniPreviewProps) {
  return (
    <div className="flex h-20 items-center justify-center overflow-hidden rounded-[var(--radius-sm)]" style={{ background: accentSoft }} aria-hidden="true">
      {variant === 'diagnostic' && (
        <div className="flex items-center gap-2 px-4 font-mono text-[10px] font-bold" style={{ color: accent }}>
          {['A', 'MX', 'TXT', 'SPF'].map((label, i) => (
            <span key={label} className="flex flex-col items-center gap-1">
              <span className="h-2 w-2 rounded-full" style={{ background: accent, opacity: i === 2 ? 0.35 : 1 }} />
              {label}
            </span>
          ))}
        </div>
      )}

      {variant === 'builder' && <div className="h-12 w-4/5 rounded-lg" style={{ background: `linear-gradient(135deg, ${accent}, ${accentSoft})`, boxShadow: 'var(--shadow-sm)' }} />}

      {variant === 'utility' && (
        <div className="flex items-center gap-2 px-4 font-mono text-[10px]" style={{ color: accent }}>
          <span className="rounded border px-2 py-1" style={{ borderColor: accent }}>
            input
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
          <span className="rounded px-2 py-1 font-bold text-white" style={{ background: accent }}>
            output
          </span>
        </div>
      )}
    </div>
  );
}
