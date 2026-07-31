'use client';

import { useMemo, useState } from 'react';
import { validateRows, toApache, toNginx, toNetlify, toCsv, toSimpleMapping, parseBulkText, type RedirectRow, type RedirectType } from '@/lib/redirects/utils';
import Tabs from '@/components/tools/Tabs';
import CopyButton from '@/components/tools/CopyButton';
import DownloadButton from '@/components/tools/DownloadButton';
import ResetButton from '@/components/tools/ResetButton';
import { fieldClass, fieldStyle } from '@/components/tools/Field';

function genId() {
  return `r-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

const FORMAT_TABS = [
  { id: 'apache', label: '.htaccess' },
  { id: 'nginx', label: 'Nginx' },
  { id: 'netlify', label: 'Netlify' },
  { id: 'csv', label: 'CSV' },
  { id: 'simple', label: 'Simple' },
];

export default function RedirectGenerator() {
  const [rows, setRows] = useState<RedirectRow[]>([{ id: genId(), source: '', destination: '', type: '301' }]);
  const [domainBase, setDomainBase] = useState('');
  const [bulkText, setBulkText] = useState('');
  const [format, setFormat] = useState('apache');

  const issues = useMemo(() => validateRows(rows), [rows]);

  const summary = useMemo(() => {
    let valid = 0;
    let warning = 0;
    let invalid = 0;
    for (const row of rows) {
      const rowIssues = issues.get(row.id) ?? [];
      if (rowIssues.some((i) => i.level === 'error')) invalid += 1;
      else if (rowIssues.some((i) => i.level === 'warning')) warning += 1;
      else if (row.source && row.destination) valid += 1;
    }
    return { valid, warning, invalid };
  }, [rows, issues]);

  const validRows = useMemo(() => rows.filter((r) => r.source && r.destination && !(issues.get(r.id) ?? []).some((i) => i.level === 'error')), [rows, issues]);

  function updateRow(id: string, patch: Partial<RedirectRow>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function addRow() {
    setRows((prev) => [...prev, { id: genId(), source: '', destination: '', type: '301' }]);
  }

  function removeRow(id: string) {
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));
  }

  function applyBulk() {
    const parsed = parseBulkText(bulkText);
    if (parsed.length === 0) return;
    setRows((prev) => {
      const existing = prev.filter((r) => r.source || r.destination);
      const added = parsed.map((p) => ({ id: genId(), source: p.source, destination: p.destination, type: '301' as RedirectType }));
      return [...existing, ...added];
    });
    setBulkText('');
  }

  function clearAll() {
    setRows([{ id: genId(), source: '', destination: '', type: '301' }]);
    setBulkText('');
  }

  const outputText = useMemo(() => {
    if (format === 'apache') return toApache(validRows);
    if (format === 'nginx') return toNginx(validRows);
    if (format === 'netlify') return toNetlify(validRows);
    if (format === 'csv') return toCsv(validRows, domainBase);
    return toSimpleMapping(validRows);
  }, [format, validRows, domainBase]);

  const filenames: Record<string, string> = { apache: '.htaccess', nginx: 'redirects.conf', netlify: '_redirects', csv: 'redirects.csv', simple: 'redirects.txt' };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 rounded-2xl border p-4" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
        <label htmlFor="bulk-paste" className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
          Bulk paste (one per line: /old-path → /new-path)
        </label>
        <textarea
          id="bulk-paste"
          rows={3}
          value={bulkText}
          onChange={(e) => setBulkText(e.target.value)}
          placeholder={'/old-page -> /new-page\n/blog/old-post, /blog/new-post'}
          className={fieldClass}
          style={fieldStyle}
        />
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={applyBulk} className="inline-flex min-h-[40px] items-center justify-center rounded-full px-4 text-xs font-bold text-white" style={{ background: 'var(--tool-accent)' }}>
            Add Parsed Rows
          </button>
          <div className="flex items-center gap-2">
            <label htmlFor="domain-base" className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
              Domain base (optional, used for CSV):
            </label>
            <input id="domain-base" value={domainBase} onChange={(e) => setDomainBase(e.target.value)} placeholder="https://example.com" className="min-h-[36px] w-56 rounded-lg border px-2.5 text-xs" style={fieldStyle} />
          </div>
        </div>
      </div>

      {/* Editable table */}
      <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: 'var(--border-color)' }}>
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr style={{ background: 'var(--surface-warm)' }}>
              <th className="p-3 text-left text-xs font-bold uppercase" style={{ color: 'var(--text-secondary)' }}>
                Source
              </th>
              <th className="p-3 text-left text-xs font-bold uppercase" style={{ color: 'var(--text-secondary)' }}>
                Destination
              </th>
              <th className="p-3 text-left text-xs font-bold uppercase" style={{ color: 'var(--text-secondary)' }}>
                Type
              </th>
              <th className="p-3 text-left text-xs font-bold uppercase" style={{ color: 'var(--text-secondary)' }}>
                Status
              </th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const rowIssues = issues.get(row.id) ?? [];
              const hasError = rowIssues.some((i) => i.level === 'error');
              const hasWarning = rowIssues.some((i) => i.level === 'warning');
              return (
                <tr key={row.id} className="border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <td className="p-2">
                    <input
                      value={row.source}
                      onChange={(e) => updateRow(row.id, { source: e.target.value })}
                      placeholder="/old-path"
                      className="min-h-[40px] w-full rounded-lg border px-2.5 font-mono text-xs"
                      style={fieldStyle}
                      aria-label="Source path"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      value={row.destination}
                      onChange={(e) => updateRow(row.id, { destination: e.target.value })}
                      placeholder="/new-path"
                      className="min-h-[40px] w-full rounded-lg border px-2.5 font-mono text-xs"
                      style={fieldStyle}
                      aria-label="Destination path"
                    />
                  </td>
                  <td className="p-2">
                    <select value={row.type} onChange={(e) => updateRow(row.id, { type: e.target.value as RedirectType })} className="min-h-[40px] rounded-lg border px-2 text-xs" style={fieldStyle} aria-label="Redirect type">
                      <option value="301">301</option>
                      <option value="302">302</option>
                    </select>
                  </td>
                  <td className="p-2">
                    {rowIssues.length === 0 && row.source && row.destination && (
                      <span className="rounded-full px-2 py-1 text-[10px] font-bold" style={{ background: 'var(--color-success-soft)', color: 'var(--color-success)' }}>
                        Valid
                      </span>
                    )}
                    {rowIssues.length > 0 && (
                      <span className="block max-w-[220px] text-[10px] leading-snug" style={{ color: hasError ? 'var(--color-error)' : hasWarning ? 'var(--color-warning)' : 'var(--text-muted)' }}>
                        {rowIssues.map((i) => i.message).join(' ')}
                      </span>
                    )}
                  </td>
                  <td className="p-2">
                    <button type="button" onClick={() => removeRow(row.id)} disabled={rows.length <= 1} aria-label="Remove row" className="text-xs font-bold disabled:opacity-30" style={{ color: 'var(--color-error)' }}>
                      ✕
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={addRow} className="inline-flex min-h-[40px] items-center justify-center rounded-full border px-4 text-xs font-bold" style={{ borderColor: 'var(--border-strong)', color: 'var(--tool-accent)' }}>
          + Add Row
        </button>
        <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
          <span style={{ color: 'var(--color-success)' }}>{summary.valid} valid</span>
          <span style={{ color: 'var(--color-warning)' }}>{summary.warning} warning</span>
          <span style={{ color: 'var(--color-error)' }}>{summary.invalid} invalid</span>
          <ResetButton onClick={clearAll} label="Clear All" />
        </div>
      </div>

      {/* Output */}
      <div className="flex flex-col gap-3 border-t pt-6" style={{ borderColor: 'var(--border-color)' }}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Tabs tabs={FORMAT_TABS} activeId={format} onChange={setFormat} ariaLabel="Output format" />
          <div className="flex gap-2">
            <CopyButton getText={() => outputText} />
            <DownloadButton getContent={() => outputText} filename={filenames[format]} label="Download" />
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--border-color)', background: 'var(--brand-ink)' }}>
          <pre className="max-h-72 overflow-auto p-4 text-xs leading-relaxed">
            <code style={{ color: '#e5e7eb', fontFamily: 'var(--font-mono)' }}>{outputText || '# Add at least one valid redirect above.'}</code>
          </pre>
        </div>
        <p className="text-xs italic" style={{ color: 'var(--text-muted)' }}>
          Review these rules before deploying to production — this tool validates the mapping you provide, not your live server configuration.
        </p>
      </div>
    </div>
  );
}
