import type { Tool } from '@/data/tools';
import ToolMiniPreview from '@/components/tools/ToolMiniPreview';
import StatusBadge from '@/components/tools/StatusBadge';

interface ToolCardProps {
  tool: Tool;
}

function OpenAction({ tool }: { tool: Tool }) {
  if (tool.status === 'Planned' || tool.status === 'In Development') return null;
  return (
    <span className="mt-auto inline-flex items-center gap-1 text-xs font-bold" style={{ color: 'var(--accent)' }}>
      Open Tool
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    </span>
  );
}

export default function ToolCard({ tool }: ToolCardProps) {
  const disabled = tool.status === 'Planned' || tool.status === 'In Development';
  const Wrapper = disabled ? 'div' : 'a';
  const wrapperProps = disabled ? {} : { href: tool.href };

  if (tool.cardVariant === 'utility') {
    return (
      <Wrapper
        {...wrapperProps}
        className={`card-surface group flex flex-col gap-2.5 p-4 transition-transform hover:-translate-y-0.5 ${disabled ? 'opacity-70' : ''}`}
        style={{ background: 'var(--paper-000)' }}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="meta-index" style={{ color: 'var(--ink-400)' }}>
            {tool.category}
          </span>
          <StatusBadge status={tool.status} />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-20 flex-shrink-0">
            <ToolMiniPreview variant={tool.cardVariant} accent={tool.accent} accentSoft={tool.accentSoft} />
          </div>
          <div className="flex flex-col gap-0.5">
            <h3 className="text-sm" style={{ color: 'var(--ink-950)' }}>
              {tool.title}
            </h3>
          </div>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--ink-700)' }}>
          {tool.purpose}
        </p>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10.5px]" style={{ color: 'var(--ink-400)' }}>
            {tool.processing}
          </span>
          <OpenAction tool={tool} />
        </div>
      </Wrapper>
    );
  }

  if (tool.cardVariant === 'diagnostic') {
    return (
      <Wrapper
        {...wrapperProps}
        className={`card-surface group flex flex-col gap-3 p-4 transition-transform hover:-translate-y-0.5 ${tool.featured ? 'card-surface--featured sm:col-span-2' : ''} ${disabled ? 'opacity-70' : ''}`}
        style={{ background: 'var(--paper-000)' }}
      >
        <ToolMiniPreview variant={tool.cardVariant} accent={tool.accent} accentSoft={tool.accentSoft} />
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm" style={{ color: 'var(--ink-950)' }}>
              {tool.title}
            </h3>
            <StatusBadge status={tool.status} />
          </div>
          <span className="meta-index" style={{ color: 'var(--ink-400)' }}>
            {tool.category}
          </span>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--ink-700)' }}>
            {tool.purpose}
          </p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <span className="text-[10.5px]" style={{ color: 'var(--ink-400)' }}>
            {tool.processing}
          </span>
          <OpenAction tool={tool} />
        </div>
      </Wrapper>
    );
  }

  // builder (default)
  return (
    <Wrapper
      {...wrapperProps}
      className={`card-surface group flex flex-col gap-3 p-4 transition-transform hover:-translate-y-0.5 ${tool.featured ? 'card-surface--featured sm:col-span-2' : ''} ${disabled ? 'opacity-70' : ''}`}
      style={{ background: 'var(--paper-000)' }}
    >
      <ToolMiniPreview variant={tool.cardVariant} accent={tool.accent} accentSoft={tool.accentSoft} />
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm" style={{ color: 'var(--ink-950)' }}>
            {tool.title}
          </h3>
          <div className="flex flex-shrink-0 items-center gap-2">
            <StatusBadge status={tool.status} />
            <span className="meta-index" style={{ color: 'var(--ink-400)' }}>
              {tool.category}
            </span>
          </div>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--ink-700)' }}>
          {tool.purpose}
        </p>
      </div>
      <div className="mt-auto flex items-center justify-between gap-2 pt-1">
        <span className="text-[10.5px]" style={{ color: 'var(--ink-400)' }}>
          {tool.processing}
        </span>
        <OpenAction tool={tool} />
      </div>
    </Wrapper>
  );
}
