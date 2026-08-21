'use client';

import { useMemo, useState } from 'react';
import { minifyCss, minifyHtml, byteSize, formatBytes } from '@/lib/minifier/utils';
import Tabs from '@/components/tools/Tabs';
import CopyButton from '@/components/tools/CopyButton';
import DownloadButton from '@/components/tools/DownloadButton';
import ResetButton from '@/components/tools/ResetButton';
import ValidationMessage from '@/components/tools/ValidationMessage';
import { fieldStyle } from '@/components/tools/Field';

const MODE_TABS = [
  { id: 'html', label: 'HTML' },
  { id: 'css', label: 'CSS' },
];

const EXAMPLES: Record<string, string> = {
  html: `<!DOCTYPE html>\n<html>\n  <head>\n    <!-- page title -->\n    <title>Example</title>\n  </head>\n  <body>\n    <main>\n      <h1>Hello, world</h1>\n      <p>\n        This is a paragraph with   extra   spacing.\n      </p>\n      <pre>  keep   this   spacing  </pre>\n    </main>\n  </body>\n</html>`,
  css: `.card {\n  /* card surface */\n  background: #ffffff;\n  padding: 16px;\n  border: 1px solid #e2e2e2;\n}\n\n.card   .title {\n  font-weight: 700;\n  content: "hello ; world";\n}`,
};

export default function MinifierTool() {
  const [mode, setMode] = useState<'html' | 'css'>('html');
  const [input, setInput] = useState('');
  const [mobileView, setMobileView] = useState<'input' | 'output'>('input');
  const [error, setError] = useState('');

  const output = useMemo(() => {
    if (!input.trim()) return '';
    try {
      setError('');
      return mode === 'html' ? minifyHtml(input) : minifyCss(input);
    } catch {
      setError('Could not process this input. Check for unmatched brackets or quotes.');
      return '';
    }
  }, [input, mode]);

  const originalSize = byteSize(input);
  const outputSize = byteSize(output);
  const saved = originalSize - outputSize;
  const savedPct = originalSize > 0 ? Math.round((saved / originalSize) * 100) : 0;

  function loadExample() {
    setInput(EXAMPLES[mode]);
  }

  function clearAll() {
    setInput('');
    setError('');
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs tabs={MODE_TABS} activeId={mode} onChange={(id) => setMode(id as 'html' | 'css')} ariaLabel="Minification mode" />
        <span className="rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wide" style={{ background: 'var(--color-warning-soft)', color: 'var(--color-warning)' }}>
          Basic Minification
        </span>
      </div>

      {/* Mobile tabs to switch between input/output */}
      <div className="lg:hidden">
        <Tabs tabs={[{ id: 'input', label: 'Input' }, { id: 'output', label: 'Output' }]} activeId={mobileView} onChange={(id) => setMobileView(id as 'input' | 'output')} ariaLabel="View" />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className={`flex flex-col gap-2 ${mobileView === 'input' ? '' : 'hidden lg:flex'}`}>
          <div className="flex items-center justify-between">
            <label htmlFor="minify-input" className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              Input {mode.toUpperCase()}
            </label>
            <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
              {formatBytes(originalSize)}
            </span>
          </div>
          <textarea
            id="minify-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={16}
            spellCheck={false}
            placeholder={`Paste ${mode.toUpperCase()} here…`}
            className="w-full resize-y rounded-2xl border p-3.5 font-mono text-xs leading-relaxed"
            style={fieldStyle}
          />
        </div>

        <div className={`flex flex-col gap-2 ${mobileView === 'output' ? '' : 'hidden lg:flex'}`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              Minified Output
            </span>
            <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
              {formatBytes(outputSize)}
            </span>
          </div>
          <div className="h-[calc(16*1.625rem+28px)] overflow-auto rounded-2xl border p-3.5" style={{ borderColor: 'var(--border-color)', background: 'var(--brand-ink)' }}>
            <pre className="whitespace-pre-wrap break-all text-xs leading-relaxed">
              <code style={{ color: '#e5e7eb', fontFamily: 'var(--font-mono)' }}>{output || '/* Minified output will appear here */'}</code>
            </pre>
          </div>
        </div>
      </div>

      {error && <ValidationMessage>{error}</ValidationMessage>}

      {input.trim() && !error && (
        <div className="flex flex-wrap items-center gap-4 rounded-xl border px-4 py-3" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
          <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {formatBytes(originalSize)} → {formatBytes(outputSize)}
          </span>
          <span className="font-mono text-sm font-bold" style={{ color: saved > 0 ? 'var(--color-success)' : 'var(--text-muted)' }}>
            {saved > 0 ? `−${savedPct}%` : 'No change'}
          </span>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <CopyButton getText={() => output} label="Copy Output" variant="primary" disabled={!output} />
        <DownloadButton getContent={() => output} filename={mode === 'html' ? 'minified.html' : 'minified.css'} label="Download" disabled={!output} />
        <button type="button" onClick={loadExample} className="inline-flex min-h-[40px] items-center justify-center rounded-full border px-4 text-xs font-bold" style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}>
          Load Example
        </button>
        <ResetButton onClick={clearAll} label="Clear" />
      </div>

      <p className="text-xs italic" style={{ color: 'var(--text-muted)' }}>
        This performs conservative whitespace and comment removal, not full parser-based optimization. Safe for production, but not the smallest possible output.
      </p>
    </div>
  );
}
