'use client';

import { useEffect, useMemo, useState } from 'react';
import { buildUtmUrl, validateUtm, UTM_FIELD_EXPLANATIONS, type UtmFields } from '@/lib/utm/utils';
import Field, { fieldClass, fieldStyle } from '@/components/tools/Field';
import CopyButton from '@/components/tools/CopyButton';
import DownloadButton from '@/components/tools/DownloadButton';
import ResetButton from '@/components/tools/ResetButton';
import ValidationMessage from '@/components/tools/ValidationMessage';

const STORAGE_KEY = 'utm-builder-history-v1';
const EMPTY: UtmFields = { url: '', source: '', medium: '', campaign: '', term: '', content: '' };
const EXAMPLE: UtmFields = { url: 'https://example.com/landing', source: 'newsletter', medium: 'email', campaign: 'spring-sale', term: '', content: 'header-button' };

interface HistoryRow extends UtmFields {
  id: string;
  finalUrl: string;
  createdAt: string;
}

export default function UtmBuilder() {
  const [fields, setFields] = useState<UtmFields>(EMPTY);
  const [history, setHistory] = useState<HistoryRow[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      // storage unavailable — history just won't persist
    }
  }, [history, hydrated]);

  function set<K extends keyof UtmFields>(key: K, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }));
  }

  const error = validateUtm(fields);
  const finalUrl = useMemo(() => (error ? '' : buildUtmUrl(fields)), [fields, error]);

  function saveToHistory() {
    if (!finalUrl) return;
    setHistory((prev) => [{ ...fields, id: `h-${Date.now()}`, finalUrl, createdAt: new Date().toISOString() }, ...prev].slice(0, 20));
  }

  function loadExample() {
    setFields(EXAMPLE);
  }

  function clearAll() {
    setFields(EMPTY);
  }

  function exportCsv() {
    const header = 'url,source,medium,campaign,term,content,finalUrl,createdAt';
    const rows = history.map((h) => [h.url, h.source, h.medium, h.campaign, h.term, h.content, h.finalUrl, h.createdAt].map((v) => `"${v.replace(/"/g, '""')}"`).join(','));
    return [header, ...rows].join('\n') + '\n';
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
      {/* Form */}
      <div className="flex flex-col gap-3">
        <Field label="Destination URL" htmlFor="utm-url" required>
          <input id="utm-url" value={fields.url} onChange={(e) => set('url', e.target.value)} placeholder="https://example.com/landing-page" className={fieldClass} style={fieldStyle} />
        </Field>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Campaign source" htmlFor="utm-source" required hint={UTM_FIELD_EXPLANATIONS.source}>
            <input id="utm-source" value={fields.source} onChange={(e) => set('source', e.target.value)} placeholder="newsletter" className={fieldClass} style={fieldStyle} />
          </Field>
          <Field label="Campaign medium" htmlFor="utm-medium" required hint={UTM_FIELD_EXPLANATIONS.medium}>
            <input id="utm-medium" value={fields.medium} onChange={(e) => set('medium', e.target.value)} placeholder="email" className={fieldClass} style={fieldStyle} />
          </Field>
        </div>
        <Field label="Campaign name" htmlFor="utm-campaign" required hint={UTM_FIELD_EXPLANATIONS.campaign}>
          <input id="utm-campaign" value={fields.campaign} onChange={(e) => set('campaign', e.target.value)} placeholder="spring-sale" className={fieldClass} style={fieldStyle} />
        </Field>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field label="Campaign term" htmlFor="utm-term" hint={UTM_FIELD_EXPLANATIONS.term}>
            <input id="utm-term" value={fields.term} onChange={(e) => set('term', e.target.value)} className={fieldClass} style={fieldStyle} />
          </Field>
          <Field label="Campaign content" htmlFor="utm-content" hint={UTM_FIELD_EXPLANATIONS.content}>
            <input id="utm-content" value={fields.content} onChange={(e) => set('content', e.target.value)} className={fieldClass} style={fieldStyle} />
          </Field>
        </div>

        {error && fields.url && <ValidationMessage>{error}</ValidationMessage>}

        <div className="flex flex-wrap gap-2 pt-1">
          <button type="button" onClick={loadExample} className="inline-flex min-h-[40px] items-center justify-center rounded-full border px-4 text-xs font-bold" style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}>
            Load Example
          </button>
          <ResetButton onClick={clearAll} label="Clear" />
        </div>
      </div>

      {/* Live output */}
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border p-4" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
          <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
            Final URL
          </span>
          <p className="mt-2 break-all rounded-lg border p-3 font-mono text-xs" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)', color: 'var(--text-primary)' }}>
            {finalUrl || '—'}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <CopyButton getText={() => finalUrl} label="Copy URL" variant="primary" disabled={!finalUrl} />
            <button type="button" onClick={saveToHistory} disabled={!finalUrl} className="inline-flex min-h-[40px] items-center justify-center rounded-full border px-4 text-xs font-bold disabled:opacity-40" style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}>
              Save to History
            </button>
          </div>
        </div>

        {finalUrl && (
          <div className="flex flex-col gap-1.5 rounded-2xl border p-4" style={{ borderColor: 'var(--border-color)' }}>
            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              Parameters
            </span>
            {(['source', 'medium', 'campaign', 'term', 'content'] as const)
              .filter((k) => fields[k].trim())
              .map((k) => (
                <div key={k} className="flex items-center justify-between text-xs">
                  <span className="font-mono" style={{ color: 'var(--tool-accent)' }}>
                    utm_{k}
                  </span>
                  <span style={{ color: 'var(--text-primary)' }}>{fields[k]}</span>
                </div>
              ))}
          </div>
        )}

        {history.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
                Recent campaigns ({history.length})
              </span>
              <DownloadButton getContent={exportCsv} filename="utm-campaigns.csv" mimeType="text/csv" label="Export CSV" />
            </div>
            <div className="flex flex-col gap-1.5 max-h-64 overflow-y-auto">
              {history.map((h) => (
                <div key={h.id} className="flex items-center justify-between gap-2 rounded-lg border px-3 py-2" style={{ borderColor: 'var(--border-color)' }}>
                  <span className="truncate text-xs" style={{ color: 'var(--text-secondary)' }} title={h.finalUrl}>
                    {h.campaign} · {h.source}/{h.medium}
                  </span>
                  <CopyButton getText={() => h.finalUrl} label="Copy" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
