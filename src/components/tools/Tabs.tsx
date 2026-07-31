'use client';

import { useRef } from 'react';

export interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  ariaLabel: string;
  className?: string;
}

export default function Tabs({ tabs, activeId, onChange, ariaLabel, className = '' }: TabsProps) {
  const listRef = useRef<HTMLDivElement>(null);

  function onKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const next = e.key === 'ArrowRight' ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
    onChange(tabs[next].id);
    const btn = listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next];
    btn?.focus();
  }

  return (
    <div ref={listRef} role="tablist" aria-label={ariaLabel} className={`inline-flex w-fit gap-1 rounded-full border p-1 ${className}`} style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
      {tabs.map((tab, i) => {
        const active = tab.id === activeId;
        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            id={`tab-${tab.id}`}
            aria-selected={active}
            aria-controls={`tabpanel-${tab.id}`}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className="min-h-[40px] rounded-full px-4 text-sm font-bold transition-all duration-200"
            style={active ? { background: 'var(--tool-accent)', color: '#fff' } : { color: 'var(--text-secondary)' }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
