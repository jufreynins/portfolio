import type { Tool } from '@/data/tools';
import ToolMiniPreview from '@/components/tools/ToolMiniPreview';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const status = tool.planned ? 'Planned' : 'Available';
  const Wrapper = tool.planned ? 'div' : 'a';

  return (
    <Wrapper
      {...(!tool.planned ? { href: tool.href } : {})}
      className={`card-surface group flex flex-col gap-3 p-4 transition-transform hover:-translate-y-0.5 ${tool.featured ? 'card-surface--featured sm:col-span-2' : ''} ${tool.planned ? 'opacity-70' : ''}`}
      style={{ background: 'var(--surface-white)' }}
    >
      <ToolMiniPreview preview={tool.preview} accent={tool.accent} accentSoft={tool.accentSoft} />
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            {tool.title}
          </h3>
          <div className="flex flex-shrink-0 items-center gap-1.5">
            <span
              className="rounded-full px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wide"
              style={
                tool.planned
                  ? { color: 'var(--text-secondary)', background: 'var(--surface-warm)' }
                  : { color: 'var(--color-success)', background: 'var(--color-success-soft)' }
              }
            >
              {status}
            </span>
            <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide" style={{ color: tool.accent, background: tool.accentSoft }}>
              {tool.category}
            </span>
          </div>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {tool.purpose}
        </p>
      </div>
      {!tool.planned && (
        <span className="mt-auto inline-flex items-center gap-1 text-xs font-bold" style={{ color: tool.accent }}>
          Open Tool
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      )}
    </Wrapper>
  );
}
