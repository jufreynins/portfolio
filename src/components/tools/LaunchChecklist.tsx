'use client';

import { useEffect, useMemo, useState } from 'react';
import { CATEGORIES, PROJECT_TYPES, itemsForProjectType, type ProjectType, type ChecklistItemDef } from '@/lib/launchChecklist/data';
import CopyButton from '@/components/tools/CopyButton';
import DownloadButton from '@/components/tools/DownloadButton';
import ResetButton from '@/components/tools/ResetButton';

const STORAGE_KEY = 'launch-checklist-state-v1';

interface CustomItem {
  id: string;
  category: string;
  label: string;
}

interface PersistedState {
  projectType: ProjectType;
  checked: string[];
  customItems: CustomItem[];
}

function loadState(): PersistedState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return null;
  }
}

export default function LaunchChecklist() {
  const [projectType, setProjectType] = useState<ProjectType>('new-wordpress');
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [customItems, setCustomItems] = useState<CustomItem[]>([]);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'complete' | 'incomplete'>('all');
  const [newItemText, setNewItemText] = useState<Record<string, string>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadState();
    if (saved) {
      setProjectType(saved.projectType);
      setChecked(new Set(saved.checked));
      setCustomItems(saved.customItems);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const state: PersistedState = { projectType, checked: Array.from(checked), customItems };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Storage unavailable (private browsing, quota) — progress just won't persist across reloads.
    }
  }, [projectType, checked, customItems, hydrated]);

  const presetItems = useMemo(() => itemsForProjectType(projectType), [projectType]);

  const itemsByCategory = useMemo(() => {
    const map = new Map<string, ChecklistItemDef[]>();
    for (const cat of CATEGORIES) map.set(cat, []);
    for (const item of presetItems) map.get(item.category)?.push(item);
    for (const item of customItems) {
      if (!map.has(item.category)) map.set(item.category, []);
      map.get(item.category)?.push({ ...item, appliesTo: 'all' });
    }
    return map;
  }, [presetItems, customItems]);

  const allItems = useMemo(() => [...presetItems, ...customItems], [presetItems, customItems]);
  const totalCount = allItems.length;
  const doneCount = allItems.filter((i) => checked.has(i.id)).length;
  const overallPct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleCollapsed(cat: string) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  }

  function addCustomItem(category: string) {
    const text = (newItemText[category] ?? '').trim();
    if (!text) return;
    setCustomItems((prev) => [...prev, { id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, category, label: text }]);
    setNewItemText((prev) => ({ ...prev, [category]: '' }));
  }

  function removeCustomItem(id: string) {
    setCustomItems((prev) => prev.filter((i) => i.id !== id));
    setChecked((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  function reset() {
    setChecked(new Set());
    setCustomItems([]);
    setFilter('all');
  }

  function buildTextExport() {
    const lines = [`Website Launch Checklist — ${PROJECT_TYPES.find((p) => p.id === projectType)?.label}`, `Progress: ${doneCount}/${totalCount} (${overallPct}%)`, ''];
    for (const cat of Array.from(itemsByCategory.keys())) {
      const items = itemsByCategory.get(cat) ?? [];
      if (items.length === 0) continue;
      lines.push(cat.toUpperCase());
      for (const item of items) lines.push(`  [${checked.has(item.id) ? 'x' : ' '}] ${item.label}`);
      lines.push('');
    }
    return lines.join('\n');
  }

  function buildJsonExport() {
    return JSON.stringify(
      {
        projectType,
        progress: { done: doneCount, total: totalCount, percent: overallPct },
        categories: Array.from(itemsByCategory.entries())
          .filter(([, items]) => items.length > 0)
          .map(([category, items]) => ({
            category,
            items: items.map((i) => ({ label: i.label, complete: checked.has(i.id) })),
          })),
      },
      null,
      2
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
      {/* Setup + sticky progress/actions panel */}
      <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border p-4" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
          <label htmlFor="project-type" className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
            Project type
          </label>
          <select
            id="project-type"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value as ProjectType)}
            className="mt-2 w-full min-h-[44px] rounded-xl border px-3 text-sm"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)', background: 'var(--surface-white)' }}
          >
            {PROJECT_TYPES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div className="rounded-2xl border p-4" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)' }}>
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              Overall progress
            </span>
            <span className="font-mono text-sm font-bold" style={{ color: 'var(--tool-accent)' }}>
              {overallPct}%
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full" style={{ background: 'var(--surface-warm)' }}>
            <div className="h-full rounded-full transition-all duration-300" style={{ width: `${overallPct}%`, background: 'var(--tool-accent)' }} />
          </div>
          <p className="mt-1.5 text-xs" style={{ color: 'var(--text-muted)' }}>
            {doneCount} of {totalCount} items complete
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by completion">
          {(['all', 'incomplete', 'complete'] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className="min-h-[36px] rounded-full px-3 text-xs font-bold capitalize transition-colors"
              style={filter === f ? { background: 'var(--tool-accent)', color: '#fff' } : { border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <CopyButton getText={buildTextExport} label="Copy Checklist" />
          <DownloadButton getContent={buildTextExport} filename="launch-checklist.txt" label="Export .txt" />
          <DownloadButton getContent={buildJsonExport} filename="launch-checklist.json" mimeType="application/json" label="Export .json" />
          <button type="button" onClick={() => window.print()} className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full px-4 text-xs font-bold" style={{ border: '1.5px solid var(--border-strong)', color: 'var(--text-primary)' }}>
            Print
          </button>
          <ResetButton onClick={reset} />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-3">
        {CATEGORIES.map((cat) => {
          const items = (itemsByCategory.get(cat) ?? []).filter((item) => {
            if (filter === 'complete') return checked.has(item.id);
            if (filter === 'incomplete') return !checked.has(item.id);
            return true;
          });
          if ((itemsByCategory.get(cat)?.length ?? 0) === 0) return null;
          const isCollapsed = collapsed.has(cat);
          const catTotal = itemsByCategory.get(cat)?.length ?? 0;
          const catDone = (itemsByCategory.get(cat) ?? []).filter((i) => checked.has(i.id)).length;

          return (
            <div key={cat} className="rounded-2xl border" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)' }}>
              <button
                type="button"
                onClick={() => toggleCollapsed(cat)}
                aria-expanded={!isCollapsed}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
              >
                <span className="flex items-center gap-2 font-bold" style={{ color: 'var(--text-primary)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`flex-shrink-0 transition-transform duration-200 ${isCollapsed ? '' : 'rotate-90'}`} aria-hidden="true">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  {cat}
                </span>
                <span className="font-mono text-xs font-bold" style={{ color: catDone === catTotal ? 'var(--color-success)' : 'var(--text-muted)' }}>
                  {catDone}/{catTotal}
                </span>
              </button>

              {!isCollapsed && (
                <div className="flex flex-col gap-1 px-4 pb-4">
                  {items.map((item) => {
                    const isCustom = item.id.startsWith('custom-');
                    return (
                      <div key={item.id} className="flex items-start gap-2.5 rounded-lg px-2 py-1.5 hover:bg-black/[0.02]">
                        <input
                          id={item.id}
                          type="checkbox"
                          checked={checked.has(item.id)}
                          onChange={() => toggle(item.id)}
                          className="mt-0.5 h-[18px] w-[18px] flex-shrink-0 cursor-pointer rounded"
                          style={{ accentColor: 'var(--tool-accent)' }}
                        />
                        <label htmlFor={item.id} className={`flex-1 cursor-pointer text-sm ${checked.has(item.id) ? 'line-through' : ''}`} style={{ color: checked.has(item.id) ? 'var(--text-muted)' : 'var(--text-primary)' }}>
                          {item.label}
                        </label>
                        {isCustom && (
                          <button type="button" onClick={() => removeCustomItem(item.id)} aria-label={`Remove "${item.label}"`} className="flex-shrink-0 text-xs font-bold" style={{ color: 'var(--color-error)' }}>
                            Remove
                          </button>
                        )}
                      </div>
                    );
                  })}

                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="text"
                      value={newItemText[cat] ?? ''}
                      onChange={(e) => setNewItemText((prev) => ({ ...prev, [cat]: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addCustomItem(cat);
                        }
                      }}
                      placeholder="Add a custom item…"
                      aria-label={`Add a custom item to ${cat}`}
                      className="min-h-[36px] flex-1 rounded-lg border px-2.5 text-xs"
                      style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                    />
                    <button type="button" onClick={() => addCustomItem(cat)} className="min-h-[36px] rounded-lg px-3 text-xs font-bold text-white" style={{ background: 'var(--tool-accent)' }}>
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
