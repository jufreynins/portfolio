'use client';

import { useMemo, useRef, useState } from 'react';
import CodeEditor from '@/components/tools/CodeEditor';
import {
  EXAMPLE_JSON,
  byteSize,
  formatBytes,
  formatJson,
  minifyJson,
  triggerBlobDownload,
  validateJson,
  type IndentOption,
} from '@/lib/jsonFormatter/utils';

type ViewMode = 'pretty' | 'minified';
type MobilePane = 'input' | 'output';

const toolbarButtonClass =
  'inline-flex min-h-[38px] items-center justify-center gap-1.5 rounded-full border px-3.5 text-xs font-bold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50';

export default function JsonFormatter() {
  const [input, setInput] = useState(EXAMPLE_JSON);
  const [viewMode, setViewMode] = useState<ViewMode>('pretty');
  const [indent, setIndent] = useState<IndentOption>(2);
  const [copied, setCopied] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [mobilePane, setMobilePane] = useState<MobilePane>('input');
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  function downloadJson() {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json' });
    triggerBlobDownload(blob, viewMode === 'minified' ? 'data.min.json' : 'data.json');
    announce('JSON download started.');
  }

  const inputSize = byteSize(input);
  const outputSize = byteSize(output);

  return (
    <div className="flex flex-col gap-6">
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border p-3" style={{ borderColor: 'var(--border-color)' }}>
        <div className="inline-flex gap-1 rounded-full border p-1" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }} role="group" aria-label="Output view">
          {(['pretty', 'minified'] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              aria-pressed={viewMode === mode}
              onClick={() => setViewMode(mode)}
              className="min-h-[38px] rounded-full px-3.5 text-xs font-bold transition-all duration-200"
              style={viewMode === mode ? { background: 'var(--tool-accent)', color: '#ffffff' } : { color: 'var(--text-secondary)' }}
            >
              {mode === 'pretty' ? 'Format' : 'Minify'}
            </button>
          ))}
        </div>

        {viewMode === 'pretty' && (
          <div className="inline-flex gap-1 rounded-full border p-1" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }} role="group" aria-label="Indent size">
            {([2, 4, 'tab'] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={indent === option}
                onClick={() => setIndent(option)}
                className="min-h-[38px] rounded-full px-3 text-xs font-bold transition-all duration-200"
                style={indent === option ? { background: 'var(--tool-accent)', color: '#ffffff' } : { color: 'var(--text-secondary)' }}
              >
                {option === 'tab' ? 'Tab' : `${option}sp`}
              </button>
            ))}
          </div>
        )}

        <span className="mx-1 h-6 w-px" style={{ background: 'var(--border-color)' }} aria-hidden="true" />

        <button type="button" onClick={copyOutput} disabled={!output} className={toolbarButtonClass} style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
          {copied ? 'Copied!' : 'Copy Output'}
        </button>
        <button type="button" onClick={downloadJson} disabled={!output} className={toolbarButtonClass} style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
          Download JSON
        </button>
        <button type="button" onClick={loadExample} className={toolbarButtonClass} style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
          Load Example
        </button>
        <button type="button" onClick={clearAll} className={toolbarButtonClass} style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
          Clear
        </button>

        <span
          className="ml-auto inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-wide"
          style={
            validation.valid
              ? { borderColor: 'color-mix(in srgb, var(--color-success) 35%, white)', color: 'var(--color-success)', background: 'var(--color-success-soft)' }
              : { borderColor: 'color-mix(in srgb, var(--color-error) 30%, white)', color: 'var(--color-error)', background: 'var(--color-error-soft)' }
          }
          role="status"
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'currentColor' }} aria-hidden="true" />
          {validation.valid ? 'Valid' : 'Invalid'}
        </span>
      </div>

      {!validation.valid && (
        <p className="text-xs leading-relaxed" style={{ color: 'var(--color-error)' }} role="alert">
          {validation.error}
          {validation.line != null && !/line\s+\d+/i.test(validation.error ?? '') && ` (line ${validation.line}, column ${validation.column})`}
        </p>
      )}

      {/* Mobile pane switch */}
      <div className="inline-flex w-fit gap-1 rounded-full border p-1 lg:hidden" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }} role="group" aria-label="Editor pane">
        {(['input', 'output'] as const).map((pane) => (
          <button
            key={pane}
            type="button"
            aria-pressed={mobilePane === pane}
            onClick={() => setMobilePane(pane)}
            className="min-h-[38px] rounded-full px-4 text-xs font-bold capitalize transition-all duration-200"
            style={mobilePane === pane ? { background: 'var(--tool-accent)', color: '#ffffff' } : { color: 'var(--text-secondary)' }}
          >
            {pane}
          </button>
        ))}
      </div>

      {/* Editors */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className={`flex flex-col gap-2 ${mobilePane === 'input' ? '' : 'hidden lg:flex'}`}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Input
            </span>
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {formatBytes(inputSize)}
            </span>
          </div>
          <CodeEditor
            value={input}
            onChange={setInput}
            errorLine={!validation.valid ? validation.line : null}
            placeholder='{ "key": "value" }'
            ariaLabel="JSON input"
          />
        </div>

        <div className={`flex flex-col gap-2 ${mobilePane === 'output' ? '' : 'hidden lg:flex'}`}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Output
            </span>
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {output ? formatBytes(outputSize) : '—'}
            </span>
          </div>
          <CodeEditor value={output} readOnly placeholder="Fix the errors above to see formatted output here." ariaLabel="Formatted JSON output" />
        </div>
      </div>
    </div>
  );
}
