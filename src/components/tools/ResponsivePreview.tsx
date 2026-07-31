'use client';

import { useEffect, useRef, useState } from 'react';
import { DEVICE_PRESETS, normalizeUrl } from '@/lib/responsivePreview/presets';
import CopyButton from '@/components/tools/CopyButton';
import ValidationMessage from '@/components/tools/ValidationMessage';
import { fieldClass, fieldStyle } from '@/components/tools/Field';

const STAGE_MAX_WIDTH = 900;
const STAGE_MAX_HEIGHT = 640;

export default function ResponsivePreview() {
  const [urlInput, setUrlInput] = useState('');
  const [activeUrl, setActiveUrl] = useState<string | null>(null);
  const [presetId, setPresetId] = useState('laptop-1366');
  const [customWidth, setCustomWidth] = useState(400);
  const [customHeight, setCustomHeight] = useState(800);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [loadState, setLoadState] = useState<'idle' | 'loading' | 'loaded' | 'blocked'>('idle');
  const [error, setError] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const preset = DEVICE_PRESETS.find((p) => p.id === presetId) ?? DEVICE_PRESETS[0];
  let width = presetId === 'custom' ? customWidth : preset.width;
  let height = presetId === 'custom' ? customHeight : preset.height;
  if (orientation === 'landscape') [width, height] = [height, width];

  const scale = Math.min(1, STAGE_MAX_WIDTH / width, STAGE_MAX_HEIGHT / height);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  function loadUrl(e?: React.FormEvent) {
    e?.preventDefault();
    const normalized = normalizeUrl(urlInput);
    if (!normalized) {
      setError('Enter a valid website URL, e.g. example.com.');
      return;
    }
    setError('');
    setActiveUrl(normalized);
    setLoadState('loading');

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setLoadState((current) => (current === 'loading' ? 'blocked' : current));
    }, 6000);
  }

  function handleIframeLoad() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setLoadState('loaded');
  }

  function handleIframeError() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setLoadState('blocked');
  }

  return (
    <div className="flex flex-col gap-6">
      <form onSubmit={loadUrl} className="flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-end" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
        <div className="flex flex-1 flex-col gap-1.5">
          <label htmlFor="preview-url" className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
            Website URL
          </label>
          <input id="preview-url" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="example.com" className={fieldClass} style={fieldStyle} />
        </div>
        <button type="submit" className="inline-flex min-h-[44px] items-center justify-center rounded-full px-6 text-sm font-bold text-white" style={{ background: 'var(--tool-accent)' }}>
          Load Preview
        </button>
        {activeUrl && (
          <a href={activeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[44px] items-center justify-center rounded-full border px-4 text-sm font-bold" style={{ borderColor: 'var(--border-strong)', color: 'var(--text-primary)' }}>
            Open in New Window
          </a>
        )}
      </form>

      {error && <ValidationMessage>{error}</ValidationMessage>}

      <div className="flex flex-wrap items-center gap-3">
        <select value={presetId} onChange={(e) => setPresetId(e.target.value)} className="min-h-[40px] rounded-full border px-3 text-sm font-bold" style={fieldStyle} aria-label="Device preset">
          {DEVICE_PRESETS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>

        {presetId === 'custom' && (
          <>
            <input type="number" value={customWidth} onChange={(e) => setCustomWidth(Number(e.target.value))} className="min-h-[40px] w-24 rounded-lg border px-2 text-sm" style={fieldStyle} aria-label="Custom width" />
            <span style={{ color: 'var(--text-muted)' }}>×</span>
            <input type="number" value={customHeight} onChange={(e) => setCustomHeight(Number(e.target.value))} className="min-h-[40px] w-24 rounded-lg border px-2 text-sm" style={fieldStyle} aria-label="Custom height" />
          </>
        )}

        <button
          type="button"
          onClick={() => setOrientation((o) => (o === 'portrait' ? 'landscape' : 'portrait'))}
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border px-3 text-xs font-bold"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
        >
          {orientation === 'portrait' ? 'Portrait' : 'Landscape'}
        </button>

        <span className="font-mono text-xs font-bold" style={{ color: 'var(--tool-accent)' }}>
          {width}×{height}
        </span>
        <CopyButton getText={() => `${width}×${height}`} label="Copy Dimensions" />
      </div>

      <div className="flex flex-col items-center gap-3 rounded-2xl border p-4 sm:p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
        {!activeUrl && (
          <p className="py-16 text-sm" style={{ color: 'var(--text-secondary)' }}>
            Enter a URL above to preview it at {width}×{height}.
          </p>
        )}

        {activeUrl && (
          <>
            <div style={{ width: width * scale, height: height * scale, borderColor: 'var(--brand-ink)' }} className="relative overflow-hidden rounded-xl border-4">
              <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: 'top left' }} className="relative">
                <iframe
                  key={activeUrl}
                  src={activeUrl}
                  title="Website preview"
                  width={width}
                  height={height}
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  className="bg-white"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
              {loadState === 'blocked' && (
                <div className="absolute inset-0 flex items-center justify-center p-4" style={{ background: 'rgba(255,255,255,0.97)' }}>
                  <p className="max-w-xs text-center text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    This website may prevent external previews. Open it in a new window and resize your browser to the selected dimensions.
                  </p>
                </div>
              )}
            </div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Showing at {Math.round(scale * 100)}% scale · {preset.label !== 'Custom' ? preset.label : 'Custom size'}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
