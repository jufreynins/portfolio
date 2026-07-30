import type { ToolPreviewKind } from '@/data/tools';

interface ToolMiniPreviewProps {
  preview: ToolPreviewKind;
  accent: string;
  accentSoft: string;
}

export default function ToolMiniPreview({ preview, accent, accentSoft }: ToolMiniPreviewProps) {
  return (
    <div className="flex h-24 items-center justify-center overflow-hidden rounded-xl" style={{ background: accentSoft }} aria-hidden="true">
      {preview === 'image' && (
        <div className="flex items-center gap-2 px-4">
          <div className="h-14 w-14 flex-shrink-0 rounded-lg" style={{ background: accent, opacity: 0.85 }} />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
          <div className="flex flex-col gap-1.5">
            <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: accent }}>
              WebP
            </span>
            <span className="text-[10px] font-semibold" style={{ color: accent }}>
              -68% size
            </span>
          </div>
        </div>
      )}

      {preview === 'brand' && (
        <div className="flex items-center gap-3 px-4">
          <div className="flex flex-col items-center gap-1 rounded-md border bg-white px-2 py-1" style={{ borderColor: accent }}>
            <div className="flex items-center gap-1">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: accent }} />
              <span className="h-1.5 w-10 rounded-full" style={{ background: 'rgba(0,0,0,0.12)' }} />
            </div>
          </div>
          {[8, 12, 16].map((size) => (
            <span key={size} className="flex-shrink-0 rounded-md" style={{ width: size, height: size, background: accent }} />
          ))}
        </div>
      )}

      {preview === 'seo' && (
        <div className="flex w-full flex-col gap-1 px-5">
          <span className="text-[10px] font-medium" style={{ color: 'var(--color-success)' }}>
            www.example.com
          </span>
          <span className="h-2 w-4/5 rounded-full" style={{ background: accent }} />
          <span className="h-1.5 w-full rounded-full" style={{ background: 'rgba(0,0,0,0.12)' }} />
          <span className="h-1.5 w-3/5 rounded-full" style={{ background: 'rgba(0,0,0,0.12)' }} />
        </div>
      )}

      {preview === 'css' && (
        <div
          className="h-14 w-4/5 rounded-xl"
          style={{ background: `linear-gradient(135deg, ${accent}, ${accentSoft})`, boxShadow: 'var(--shadow-sm)' }}
        />
      )}

      {preview === 'json' && (
        <div className="flex w-full flex-col gap-1 px-5 font-mono text-[10px]" style={{ color: accent }}>
          <span>{'{'}</span>
          <span className="pl-3" style={{ color: 'var(--text-secondary)' }}>
            &quot;valid&quot;: <span style={{ color: accent }}>true</span>
          </span>
          <span className="pl-3" style={{ color: 'var(--text-secondary)' }}>
            &quot;lines&quot;: <span style={{ color: accent }}>12</span>
          </span>
          <span>{'}'}</span>
        </div>
      )}

      {preview === 'utm' && (
        <div className="flex w-full flex-col gap-1 px-5 text-[10px] font-mono" style={{ color: accent }}>
          <span>?utm_source=</span>
          <span>&amp;utm_medium=</span>
          <span>&amp;utm_campaign=</span>
        </div>
      )}
    </div>
  );
}
