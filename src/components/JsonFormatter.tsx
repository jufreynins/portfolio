'use client';

import { useId, useMemo, useRef, useState } from 'react';
import {
  EXAMPLE_JSON,
  byteSize,
  formatBytes,
  formatJson,
  minifyJson,
  validateJson,
  type IndentOption,
} from '@/lib/jsonFormatter/utils';

type ViewMode = 'pretty' | 'minified';

const secondaryActionClass =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50';

export default function JsonFormatter() {
  const [input, setInput] = useState(EXAMPLE_JSON);
  const [viewMode, setViewMode] = useState<ViewMode>('pretty');
  const [indent, setIndent] = useState<IndentOption>(2);
  const [copied, setCopied] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputId = useId();

  const validation = useMemo(() => validateJson(input), [input]);

  const output = useMemo(() => {
    if (!validation.valid) return '';
    try {
      return viewMode === 'pretty' ? formatJson(input, indent) : minifyJson(input);
    } catch {
      return '';
    }
  }, [input, viewMode, indent, validation.valid]);

  function announce(message: string) {
    setAnnouncement(message);
  }

  function loadExample() {
    setInput(EXAMPLE_JSON);
    announce('Example JSON loaded.');
  }

  function clearAll() {
    setInput('');
    announce('Input cleared.');
  }

  async function copyOutput() {
    if (!output) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(output);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = output;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }
      setCopied(true);
      announce('Output copied to clipboard.');
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      announce('Could not copy automatically. Please select and copy the output manually.');
    }
  }

  const inputSize = byteSize(input);
  const outputSize = byteSize(output);

  return (
    <div className="flex flex-col gap-8">
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
        {/* Left column: live output — pinned on desktop so it stays visible while you edit */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-28">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wide"
              style={
                validation.valid
                  ? { borderColor: 'color-mix(in srgb, var(--color-success) 35%, white)', color: 'var(--color-success)', background: 'var(--color-success-soft)' }
                  : { borderColor: 'color-mix(in srgb, var(--color-error) 30%, white)', color: 'var(--color-error)', background: 'var(--color-error-soft)' }
              }
              role="status"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'currentColor' }} aria-hidden="true" />
              {validation.valid ? 'Valid JSON' : 'Invalid JSON'}
            </span>
            {validation.valid && (
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {formatBytes(inputSize)} &rarr; {formatBytes(outputSize)}
              </span>
            )}
          </div>

          {!validation.valid && (
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-error)' }} role="alert">
              {validation.error}
              {validation.line != null && !/line\s+\d+/i.test(validation.error ?? '') && ` (line ${validation.line}, column ${validation.column})`}
            </p>
          )}

          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex w-fit gap-1 rounded-full border p-1" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }} role="group" aria-label="Output view">
                {(['pretty', 'minified'] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    aria-pressed={viewMode === mode}
                    onClick={() => setViewMode(mode)}
                    className="min-h-[40px] rounded-full px-4 text-sm font-bold capitalize transition-all duration-200"
                    style={viewMode === mode ? { background: 'var(--brand-primary)', color: '#ffffff' } : { color: 'var(--text-secondary)' }}
                  >
                    {mode}
                  </button>
                ))}
              </div>

              {viewMode === 'pretty' && (
                <div className="inline-flex w-fit gap-1 rounded-full border p-1" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }} role="group" aria-label="Indent size">
                  {([2, 4, 'tab'] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={indent === option}
                      onClick={() => setIndent(option)}
                      className="min-h-[40px] rounded-full px-3 text-xs font-bold transition-all duration-200"
                      style={indent === option ? { background: 'var(--brand-primary)', color: '#ffffff' } : { color: 'var(--text-secondary)' }}
                    >
                      {option === 'tab' ? 'Tab' : `${option} spaces`}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--border-color)', background: 'var(--brand-ink)' }}>
              <pre className="max-h-[480px] overflow-auto p-4 pr-28 text-xs leading-relaxed sm:text-sm">
                <code style={{ color: '#e5e7eb', fontFamily: 'var(--font-mono)' }}>{output || '// Fix the errors above to see formatted output here.'}</code>
              </pre>
              <button
                type="button"
                onClick={copyOutput}
                disabled={!output}
                className="absolute right-3 top-3 inline-flex min-h-[36px] items-center justify-center rounded-full px-4 text-xs font-bold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50"
                style={{ background: copied ? 'var(--color-success)' : 'var(--brand-primary)' }}
              >
                {copied ? 'Copied!' : 'Copy Output'}
              </button>
            </div>
          </div>
        </div>

        {/* Right column: input + actions */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor={inputId} className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Paste your JSON
            </label>
            <textarea
              id={inputId}
              rows={16}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
              placeholder='{ "key": "value" }'
              className="w-full resize-y rounded-2xl border p-4 font-mono text-sm leading-relaxed"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={loadExample} className={secondaryActionClass} style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
              Load Example
            </button>
            <button type="button" onClick={clearAll} className={secondaryActionClass} style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
              Clear
            </button>
          </div>

          <div className="rounded-2xl border p-5 text-sm leading-relaxed sm:p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)', color: 'var(--text-secondary)' }}>
            <p>
              <strong style={{ color: 'var(--text-primary)' }}>How it works:</strong> paste or type JSON on the left, and the formatted or minified result updates instantly. Invalid JSON shows the
              parser&apos;s error message with a line and column when available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
