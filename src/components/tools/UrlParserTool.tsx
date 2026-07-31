'use client';

import { useMemo, useState } from 'react';
import { parseUrl, paramsFromUrl, rebuildUrl, type QueryParamRow } from '@/lib/urlParser/utils';
import CopyButton from '@/components/tools/CopyButton';
import ValidationMessage from '@/components/tools/ValidationMessage';
import { fieldClass, fieldStyle } from '@/components/tools/Field';

const EXAMPLE = 'https://user@shop.example.com:8443/products/shoes?color=blue&size=10&color=blue#reviews';

function genId() {
  return `q-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export default function UrlParserTool() {
  const [input, setInput] = useState('');
  const [params, setParams] = useState<QueryParamRow[] | null>(null);
  const [baseUrl, setBaseUrl] = useState<URL | null>(null);
  const [hash, setHash] = useState('');
  const [error, setError] = useState('');
  const [protocol, setProtocol] = useState('');
  const [username, setUsername] = useState('');
  const [hasPassword, setHasPassword] = useState(false);
  const [hostname, setHostname] = useState('');
  const [port, setPort] = useState('');
  const [pathname, setPathname] = useState('');
  const [origin, setOrigin] = useState('');

  function parse(text: string) {
    const result = parseUrl(text);
    if ('error' in result) {
      setError(result.error);
      setParams(null);
      setBaseUrl(null);
      return;
    }
    setError('');
    setBaseUrl(result.url);
    setParams(paramsFromUrl(result.url));
    setHash(result.info.hash);
    setProtocol(result.info.protocol);
    setUsername(result.info.username);
    setHasPassword(result.info.hasPassword);
    setHostname(result.info.hostname);
    setPort(result.info.port);
    setPathname(result.info.pathname);
    setOrigin(result.info.origin);
  }

  function handleParse(e?: React.FormEvent) {
    e?.preventDefault();
    parse(input);
  }

  function loadExample() {
    setInput(EXAMPLE);
    parse(EXAMPLE);
  }

  function clearAll() {
    setInput('');
    setParams(null);
    setBaseUrl(null);
    setError('');
  }

  const rebuiltUrl = useMemo(() => (baseUrl && params ? rebuildUrl(baseUrl, params, hash) : ''), [baseUrl, params, hash]);

  function updateParam(id: string, patch: Partial<QueryParamRow>) {
    setParams((prev) => (prev ? prev.map((p) => (p.id === id ? { ...p, ...patch } : p)) : prev));
  }
  function addParam() {
    setParams((prev) => [...(prev ?? []), { id: genId(), key: '', value: '' }]);
  }
  function removeParam(id: string) {
    setParams((prev) => (prev ? prev.filter((p) => p.id !== id) : prev));
  }
  function sortParams() {
    setParams((prev) => (prev ? [...prev].sort((a, b) => a.key.localeCompare(b.key)) : prev));
  }
  function decodeAll() {
    setParams((prev) => (prev ? prev.map((p) => ({ ...p, value: safeDecode(p.value) })) : prev));
  }
  function encodeAll() {
    setParams((prev) => (prev ? prev.map((p) => ({ ...p, value: encodeURIComponent(p.value) })) : prev));
  }
  function safeDecode(v: string) {
    try {
      return decodeURIComponent(v);
    } catch {
      return v;
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={handleParse} className="flex flex-col gap-3 sm:flex-row">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="https://example.com/path?query=value" className={`${fieldClass} flex-1`} style={fieldStyle} aria-label="URL to parse" />
        <div className="flex gap-2">
          <button type="submit" className="inline-flex min-h-[44px] items-center justify-center rounded-full px-5 text-sm font-bold text-white" style={{ background: 'var(--tool-accent)' }}>
            Parse URL
          </button>
          <button type="button" onClick={loadExample} className="inline-flex min-h-[44px] items-center justify-center rounded-full border px-4 text-sm font-bold" style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}>
            Example
          </button>
          {baseUrl && (
            <button type="button" onClick={clearAll} className="inline-flex min-h-[44px] items-center justify-center rounded-full px-4 text-sm font-bold" style={{ color: 'var(--color-error)' }}>
              Clear
            </button>
          )}
        </div>
      </form>

      {error && <ValidationMessage>{error}</ValidationMessage>}

      {baseUrl && (
        <>
          {/* Structured breakdown */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Protocol', value: protocol },
              { label: 'Hostname', value: hostname },
              { label: 'Port', value: port || 'default' },
              { label: 'Pathname', value: pathname || '/' },
              { label: 'Hash', value: hash || '(none)' },
              { label: 'Origin', value: origin },
            ].map((row) => (
              <div key={row.label} className="flex flex-col gap-1 rounded-xl border p-3" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
                <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                  {row.label}
                </span>
                <span className="truncate font-mono text-sm" style={{ color: 'var(--text-primary)' }} title={row.value}>
                  {row.value}
                </span>
              </div>
            ))}
            {username && (
              <div className="flex flex-col gap-1 rounded-xl border p-3" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
                <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>
                  Username
                </span>
                <span className="font-mono text-sm" style={{ color: 'var(--text-primary)' }}>
                  {username}
                </span>
              </div>
            )}
            {hasPassword && (
              <div className="flex flex-col gap-1 rounded-xl border p-3" style={{ borderColor: 'color-mix(in srgb, var(--color-warning) 35%, white)', background: 'var(--color-warning-soft)' }}>
                <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: 'var(--color-warning)' }}>
                  Password
                </span>
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  Present in URL (not shown)
                </span>
              </div>
            )}
          </div>

          {/* Query parameter editor */}
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                Query Parameters
              </h2>
              <div className="flex flex-wrap gap-1.5">
                <button type="button" onClick={sortParams} className="min-h-[32px] rounded-full border px-3 text-xs font-bold" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                  Sort
                </button>
                <button type="button" onClick={decodeAll} className="min-h-[32px] rounded-full border px-3 text-xs font-bold" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                  Decode All
                </button>
                <button type="button" onClick={encodeAll} className="min-h-[32px] rounded-full border px-3 text-xs font-bold" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                  Encode All
                </button>
              </div>
            </div>

            {(params ?? []).length === 0 && (
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                No query parameters.
              </p>
            )}

            <div className="flex flex-col gap-2">
              {(params ?? []).map((p) => (
                <div key={p.id} className="flex items-center gap-2">
                  <input value={p.key} onChange={(e) => updateParam(p.id, { key: e.target.value })} placeholder="key" className="min-h-[40px] w-1/3 rounded-lg border px-2.5 font-mono text-xs" style={fieldStyle} aria-label="Parameter key" />
                  <input value={p.value} onChange={(e) => updateParam(p.id, { value: e.target.value })} placeholder="value" className="min-h-[40px] flex-1 rounded-lg border px-2.5 font-mono text-xs" style={fieldStyle} aria-label="Parameter value" />
                  <CopyButton getText={() => p.value} label="Copy" />
                  <button type="button" onClick={() => removeParam(p.id)} aria-label="Remove parameter" className="text-xs font-bold" style={{ color: 'var(--color-error)' }}>
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button type="button" onClick={addParam} className="min-h-[36px] w-fit rounded-full border px-3 text-xs font-bold" style={{ borderColor: 'var(--border-strong)', color: 'var(--tool-accent)' }}>
              + Add Parameter
            </button>
          </div>

          {/* Rebuilt URL */}
          <div className="flex flex-col gap-2 rounded-2xl border p-4" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              Rebuilt URL
            </span>
            <p className="break-all rounded-lg border p-3 font-mono text-xs" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)', color: 'var(--text-primary)' }}>
              {rebuiltUrl}
            </p>
            <div>
              <CopyButton getText={() => rebuiltUrl} label="Copy Full URL" variant="primary" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
