'use client';

import { useMemo, useState } from 'react';
import { hexToRgb, rgbToHex, contrastRatio, isLargeText, evaluateWcag, suggestPassingForeground, isValidHex, normalizeHex } from '@/lib/contrast/utils';
import CopyButton from '@/components/tools/CopyButton';
import ResetButton from '@/components/tools/ResetButton';
import ValidationMessage from '@/components/tools/ValidationMessage';

export default function ContrastChecker() {
  const [fgHex, setFgHex] = useState('#17131f');
  const [bgHex, setBgHex] = useState('#ffffff');
  const [fontSize, setFontSize] = useState(16);
  const [bold, setBold] = useState(false);

  const fgValid = isValidHex(fgHex);
  const bgValid = isValidHex(bgHex);
  const fg = fgValid ? hexToRgb(fgHex) : null;
  const bg = bgValid ? hexToRgb(bgHex) : null;

  const ratio = useMemo(() => (fg && bg ? contrastRatio(fg, bg) : null), [fg, bg]);
  const large = isLargeText(fontSize, bold);
  const results = useMemo(() => (ratio ? evaluateWcag(ratio, large) : []), [ratio, large]);

  const suggestion = useMemo(() => {
    if (!fg || !bg || !ratio || ratio >= 4.5) return null;
    const better = suggestPassingForeground(fg, bg, large ? 3 : 4.5);
    return better ? rgbToHex(better) : null;
  }, [fg, bg, ratio, large]);

  function swap() {
    setFgHex(bgHex);
    setBgHex(fgHex);
  }

  function reset() {
    setFgHex('#17131f');
    setBgHex('#ffffff');
    setFontSize(16);
    setBold(false);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
      {/* Controls */}
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="fg-hex" className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Foreground (text) color
            </label>
            <div className="flex items-center gap-2">
              <input type="color" value={fgValid ? normalizeHex(fgHex) : '#000000'} onChange={(e) => setFgHex(e.target.value)} aria-label="Foreground color picker" className="h-11 w-11 flex-shrink-0 cursor-pointer rounded-lg border p-0.5" style={{ borderColor: 'var(--border-color)' }} />
              <input id="fg-hex" value={fgHex} onChange={(e) => setFgHex(e.target.value)} className="min-h-[44px] flex-1 rounded-xl border px-3 font-mono text-sm" style={{ borderColor: fgValid ? 'var(--border-color)' : 'var(--color-error)', color: 'var(--text-primary)' }} aria-invalid={!fgValid} />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="bg-hex" className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Background color
            </label>
            <div className="flex items-center gap-2">
              <input type="color" value={bgValid ? normalizeHex(bgHex) : '#ffffff'} onChange={(e) => setBgHex(e.target.value)} aria-label="Background color picker" className="h-11 w-11 flex-shrink-0 cursor-pointer rounded-lg border p-0.5" style={{ borderColor: 'var(--border-color)' }} />
              <input id="bg-hex" value={bgHex} onChange={(e) => setBgHex(e.target.value)} className="min-h-[44px] flex-1 rounded-xl border px-3 font-mono text-sm" style={{ borderColor: bgValid ? 'var(--border-color)' : 'var(--color-error)', color: 'var(--text-primary)' }} aria-invalid={!bgValid} />
            </div>
          </div>
        </div>

        {(!fgValid || !bgValid) && <ValidationMessage>Enter valid 6-digit (or 3-digit) hex colors, e.g. #3B82F6.</ValidationMessage>}

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="font-size" className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Font size (px)
            </label>
            <input id="font-size" type="number" min={8} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="min-h-[44px] rounded-xl border px-3 text-sm" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Font weight
            </span>
            <label className="flex min-h-[44px] items-center gap-2 rounded-xl border px-3 text-sm" style={{ borderColor: 'var(--border-color)' }}>
              <input type="checkbox" checked={bold} onChange={(e) => setBold(e.target.checked)} style={{ accentColor: 'var(--tool-accent)' }} />
              Bold (700+)
            </label>
          </div>
        </div>

        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {large ? 'Evaluated as large text (18pt+, or 14pt+ bold).' : 'Evaluated as normal text.'}
        </p>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={swap} className="inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full border px-4 text-xs font-bold" style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}>
            Swap Colors
          </button>
          <CopyButton getText={() => `${normalizeHex(fgHex)} / ${normalizeHex(bgHex)}`} label="Copy Colors" />
          <ResetButton onClick={reset} />
        </div>
      </div>

      {/* Live preview + results */}
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border p-6" style={{ borderColor: 'var(--border-color)', background: bgValid ? normalizeHex(bgHex) : '#fff' }}>
          <p className="mb-1 text-2xl font-bold" style={{ color: fgValid ? normalizeHex(fgHex) : '#000', fontFamily: 'var(--font-heading)' }}>
            Sample Heading
          </p>
          <p className="mb-3 text-sm leading-relaxed" style={{ color: fgValid ? normalizeHex(fgHex) : '#000', fontSize, fontWeight: bold ? 700 : 400 }}>
            The quick brown fox jumps over the lazy dog. This paragraph shows body text at your chosen size and weight.
          </p>
          <button
            type="button"
            className="rounded-full border-2 px-4 py-2 text-sm font-bold"
            style={{ borderColor: fgValid ? normalizeHex(fgHex) : '#000', color: fgValid ? normalizeHex(fgHex) : '#000' }}
          >
            Sample Button
          </button>
        </div>

        {ratio && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between rounded-xl border px-4 py-3" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
              <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                Contrast Ratio
              </span>
              <span className="font-mono text-lg font-bold" style={{ color: 'var(--tool-accent)' }}>
                {ratio.toFixed(2)}:1
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {results.map((r) => (
                <div key={r.criterion} className="flex items-center justify-between rounded-lg border px-3.5 py-2.5" style={{ borderColor: 'var(--border-color)' }}>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {r.criterion}
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold"
                    style={r.pass ? { background: 'var(--color-success-soft)', color: 'var(--color-success)' } : { background: 'var(--color-error-soft)', color: 'var(--color-error)' }}
                  >
                    {r.pass ? '✓ Pass' : '✕ Fail'} <span className="font-mono opacity-70">(needs {r.threshold}:1)</span>
                  </span>
                </div>
              ))}
            </div>

            {suggestion && (
              <div className="flex items-center justify-between gap-3 rounded-xl border px-3.5 py-2.5" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Try <code className="font-mono font-bold">{suggestion}</code> as the foreground to pass this background.
                </span>
                <button type="button" onClick={() => setFgHex(suggestion)} className="flex-shrink-0 text-xs font-bold underline-offset-2 hover:underline" style={{ color: 'var(--tool-accent)' }}>
                  Use it
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
