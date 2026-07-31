'use client';

import { useMemo, useState } from 'react';
import { HANDOFF_SECTIONS } from '@/lib/handoff/data';
import CopyButton from '@/components/tools/CopyButton';
import DownloadButton from '@/components/tools/DownloadButton';
import ResetButton from '@/components/tools/ResetButton';
import { fieldClass, fieldStyle } from '@/components/tools/Field';

interface Contact {
  id: string;
  name: string;
  role: string;
  info: string;
}

function genId() {
  return `c-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

const ALL_SECTION_IDS = [...HANDOFF_SECTIONS.map((s) => s.id), 'contacts'];

const EXAMPLE_VALUES: Record<string, Record<string, string>> = {
  overview: { projectName: 'Riverside Plumbing Website', clientName: 'Riverside Plumbing Co.', projectType: 'New WordPress website', summary: 'A service-focused website for a local plumbing company, built on WordPress with Elementor Pro.' },
  urls: { production: 'https://riversideplumbing.com', staging: 'https://staging.riversideplumbing.com', admin: 'https://riversideplumbing.com/wp-admin' },
  cms: { cms: 'WordPress', builder: 'Elementor Pro', notes: 'Uses Advanced Custom Fields for service listings.' },
  hosting: { provider: 'Cloudways', plan: 'DigitalOcean 2GB', accessStoredAt: "Client's 1Password vault, \"Hosting\" folder" },
  domain: { registrar: 'GoDaddy', renewal: 'March 2027', accessStoredAt: "Client's GoDaddy account" },
};

export default function HandoffBuilder() {
  const [values, setValues] = useState<Record<string, Record<string, string>>>({});
  const [included, setIncluded] = useState<Set<string>>(new Set(ALL_SECTION_IDS));
  const [order, setOrder] = useState<string[]>(ALL_SECTION_IDS);
  const [contacts, setContacts] = useState<Contact[]>([{ id: genId(), name: '', role: '', info: '' }]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set([ALL_SECTION_IDS[0]]));

  function setField(sectionId: string, key: string, value: string) {
    setValues((prev) => ({ ...prev, [sectionId]: { ...prev[sectionId], [key]: value } }));
  }

  function toggleIncluded(id: string) {
    setIncluded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleExpanded(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function move(id: string, dir: -1 | 1) {
    setOrder((prev) => {
      const idx = prev.indexOf(id);
      const target = idx + dir;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  }

  function addContact() {
    setContacts((prev) => [...prev, { id: genId(), name: '', role: '', info: '' }]);
  }
  function removeContact(id: string) {
    setContacts((prev) => (prev.length > 1 ? prev.filter((c) => c.id !== id) : prev));
  }

  function loadExample() {
    setValues(EXAMPLE_VALUES);
    setContacts([
      { id: genId(), name: 'Jufrey Niño Bayog', role: 'Developer', info: 'jufreyninobayog@gmail.com' },
      { id: genId(), name: 'Client contact', role: 'Site owner', info: 'Primary point of contact for content updates.' },
    ]);
  }

  function clearAll() {
    setValues({});
    setContacts([{ id: genId(), name: '', role: '', info: '' }]);
  }

  const sectionById = useMemo(() => new Map(HANDOFF_SECTIONS.map((s) => [s.id, s])), []);

  const totalFilledSections = useMemo(() => {
    let count = 0;
    for (const id of order) {
      if (!included.has(id)) continue;
      if (id === 'contacts') {
        if (contacts.some((c) => c.name.trim())) count += 1;
        continue;
      }
      const sectionValues = values[id] ?? {};
      if (Object.values(sectionValues).some((v) => v?.trim())) count += 1;
    }
    return count;
  }, [order, included, values, contacts]);
  const includedCount = included.size;

  function buildMarkdown(): string {
    const lines: string[] = ['# Website Handoff Document', ''];
    for (const id of order) {
      if (!included.has(id)) continue;
      if (id === 'contacts') {
        const rows = contacts.filter((c) => c.name.trim());
        if (rows.length === 0) continue;
        lines.push('## Contacts and Responsibilities', '');
        for (const c of rows) lines.push(`- **${c.name}** — ${c.role}${c.info ? ` (${c.info})` : ''}`);
        lines.push('');
        continue;
      }
      const section = sectionById.get(id);
      if (!section) continue;
      const sectionValues = values[id] ?? {};
      const filled = section.fields.filter((f) => sectionValues[f.key]?.trim());
      if (filled.length === 0) continue;
      lines.push(`## ${section.title}`, '');
      for (const f of filled) lines.push(`- **${f.label}:** ${sectionValues[f.key]}`);
      lines.push('');
    }
    lines.push('---', '_Note: this document intentionally excludes passwords, API keys, and other credentials — see where each is stored instead._');
    return lines.join('\n');
  }

  function buildJson() {
    const data: Record<string, unknown> = {};
    for (const id of order) {
      if (!included.has(id)) continue;
      if (id === 'contacts') {
        data.contacts = contacts.filter((c) => c.name.trim());
        continue;
      }
      const section = sectionById.get(id);
      if (section) data[id] = values[id] ?? {};
    }
    return JSON.stringify(data, null, 2);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-3 rounded-2xl border p-4" style={{ borderColor: 'color-mix(in srgb, var(--color-warning) 40%, white)', background: 'var(--color-warning-soft)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-warning)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0" aria-hidden="true">
          <path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L14.71 3.86a2 2 0 0 0-3.42 0Z" />
        </svg>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-primary)' }}>
          <strong>Never enter actual passwords, API keys, or recovery codes.</strong> Note where access is stored (a password manager, a client&apos;s account) — not the credential itself.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        {/* Editor */}
        <div className="flex flex-col gap-2.5">
          {order.map((id, i) => {
            if (id === 'contacts') {
              const isOpen = expanded.has('contacts');
              return (
                <div key="contacts" className="rounded-2xl border" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)' }}>
                  <div className="flex items-center justify-between gap-2 px-4 py-3">
                    <label className="flex items-center gap-2 text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                      <input type="checkbox" checked={included.has('contacts')} onChange={() => toggleIncluded('contacts')} style={{ accentColor: 'var(--tool-accent)' }} />
                      Contacts and Responsibilities
                    </label>
                    <div className="flex items-center gap-2">
                      <button type="button" disabled={i === 0} onClick={() => move('contacts', -1)} className="text-xs font-bold disabled:opacity-30" style={{ color: 'var(--tool-accent)' }} aria-label="Move up">↑</button>
                      <button type="button" disabled={i === order.length - 1} onClick={() => move('contacts', 1)} className="text-xs font-bold disabled:opacity-30" style={{ color: 'var(--tool-accent)' }} aria-label="Move down">↓</button>
                      <button type="button" onClick={() => toggleExpanded('contacts')} className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
                        {isOpen ? 'Collapse' : 'Expand'}
                      </button>
                    </div>
                  </div>
                  {isOpen && (
                    <div className="flex flex-col gap-2 px-4 pb-4">
                      {contacts.map((c, ci) => (
                        <div key={c.id} className="grid grid-cols-1 gap-2 rounded-xl border p-3 sm:grid-cols-3" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
                          <input value={c.name} onChange={(e) => setContacts((prev) => prev.map((x) => (x.id === c.id ? { ...x, name: e.target.value } : x)))} placeholder="Name" className={fieldClass} style={fieldStyle} aria-label={`Contact ${ci + 1} name`} />
                          <input value={c.role} onChange={(e) => setContacts((prev) => prev.map((x) => (x.id === c.id ? { ...x, role: e.target.value } : x)))} placeholder="Role" className={fieldClass} style={fieldStyle} aria-label={`Contact ${ci + 1} role`} />
                          <div className="flex gap-2">
                            <input value={c.info} onChange={(e) => setContacts((prev) => prev.map((x) => (x.id === c.id ? { ...x, info: e.target.value } : x)))} placeholder="Contact info / responsibility" className={`${fieldClass} flex-1`} style={fieldStyle} aria-label={`Contact ${ci + 1} info`} />
                            <button type="button" onClick={() => removeContact(c.id)} disabled={contacts.length <= 1} className="text-xs font-bold disabled:opacity-30" style={{ color: 'var(--color-error)' }}>
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                      <button type="button" onClick={addContact} className="min-h-[36px] rounded-full border px-3 text-xs font-bold" style={{ borderColor: 'var(--border-strong)', color: 'var(--tool-accent)' }}>
                        + Add Contact
                      </button>
                    </div>
                  )}
                </div>
              );
            }

            const section = sectionById.get(id);
            if (!section) return null;
            const isOpen = expanded.has(id);
            return (
              <div key={id} className="rounded-2xl border" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)' }}>
                <div className="flex items-center justify-between gap-2 px-4 py-3">
                  <label className="flex items-center gap-2 text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                    <input type="checkbox" checked={included.has(id)} onChange={() => toggleIncluded(id)} style={{ accentColor: 'var(--tool-accent)' }} />
                    {section.title}
                  </label>
                  <div className="flex items-center gap-2">
                    <button type="button" disabled={i === 0} onClick={() => move(id, -1)} className="text-xs font-bold disabled:opacity-30" style={{ color: 'var(--tool-accent)' }} aria-label="Move up">↑</button>
                    <button type="button" disabled={i === order.length - 1} onClick={() => move(id, 1)} className="text-xs font-bold disabled:opacity-30" style={{ color: 'var(--tool-accent)' }} aria-label="Move down">↓</button>
                    <button type="button" onClick={() => toggleExpanded(id)} className="text-xs font-bold" style={{ color: 'var(--text-secondary)' }}>
                      {isOpen ? 'Collapse' : 'Expand'}
                    </button>
                  </div>
                </div>
                {isOpen && (
                  <div className="flex flex-col gap-2.5 px-4 pb-4">
                    {section.fields.map((f) => (
                      <div key={f.key} className="flex flex-col gap-1">
                        <label htmlFor={`${id}-${f.key}`} className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                          {f.label}
                        </label>
                        {f.type === 'textarea' ? (
                          <textarea id={`${id}-${f.key}`} rows={2} value={values[id]?.[f.key] ?? ''} onChange={(e) => setField(id, f.key, e.target.value)} placeholder={f.placeholder} className={fieldClass} style={fieldStyle} />
                        ) : (
                          <input id={`${id}-${f.key}`} value={values[id]?.[f.key] ?? ''} onChange={(e) => setField(id, f.key, e.target.value)} placeholder={f.placeholder} className={fieldClass} style={fieldStyle} />
                        )}
                        {f.hint && (
                          <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                            {f.hint}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <div className="flex flex-wrap gap-2 border-t pt-3" style={{ borderColor: 'var(--border-color)' }}>
            <button type="button" onClick={loadExample} className="inline-flex min-h-[40px] items-center justify-center rounded-full border px-4 text-xs font-bold" style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}>
              Load Example
            </button>
            <ResetButton onClick={clearAll} label="Clear All" />
          </div>
        </div>

        {/* Preview + actions */}
        <div className="flex flex-col gap-3 lg:sticky lg:top-24">
          <div className="flex items-center justify-between rounded-xl border px-4 py-3" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              Completion
            </span>
            <span className="font-mono text-sm font-bold" style={{ color: 'var(--tool-accent)' }}>
              {totalFilledSections}/{includedCount} sections filled
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <CopyButton getText={buildMarkdown} label="Copy Document" />
            <DownloadButton getContent={buildMarkdown} filename="website-handoff.md" label="Export .md" />
            <DownloadButton getContent={buildJson} filename="website-handoff.json" mimeType="application/json" label="Export .json" />
            <button type="button" onClick={() => window.print()} className="inline-flex min-h-[40px] items-center justify-center rounded-full border px-4 text-xs font-bold" style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}>
              Print
            </button>
          </div>

          <div className="max-h-[560px] overflow-y-auto rounded-2xl border p-4" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)' }}>
            <pre className="whitespace-pre-wrap text-xs leading-relaxed" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              {buildMarkdown()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
