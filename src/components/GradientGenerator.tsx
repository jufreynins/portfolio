'use client';

import { useEffect, useRef, useState } from 'react';
import { MAX_STOPS, MIN_STOPS, type ColorStop, type GradientState } from '@/lib/gradient/types';
import {
  LINEAR_DIRECTIONS,
  POSITION_KEYWORDS,
  buildGradientCode,
  buildGradientValue,
  clampAngle,
  clampPosition,
  generateId,
  isValidHex,
  normalizeHex,
  randomGradientState,
  renderGradientPng,
  reverseStops,
  triggerBlobDownload,
} from '@/lib/gradient/utils';
import { GRADIENT_PRESETS } from '@/lib/gradient/presets';

function stopsFromPreset(stops: Array<{ hex: string; position: number }>): ColorStop[] {
  return stops.map((s) => ({ id: generateId(), hex: s.hex, position: s.position }));
}

function createDefaultState(): GradientState {
  const preset = GRADIENT_PRESETS[0];
  return { ...preset.state, stops: stopsFromPreset(preset.state.stops) };
}

const primaryActionClass =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0';
const secondaryActionClass =
  'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border-2 px-5 py-2.5 text-sm font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50';

export default function GradientGenerator() {
  const [state, setState] = useState<GradientState>(createDefaultState);
  const [hexDrafts, setHexDrafts] = useState<Record<string, string>>({});
  const [hexErrors, setHexErrors] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [downloadError, setDownloadError] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    },
    []
  );

  const cssValue = buildGradientValue(state);
  const cssCode = buildGradientCode(state);
  const sortedStops = [...state.stops].sort((a, b) => a.position - b.position);

  function announce(message: string) {
    setAnnouncement(message);
  }

  function updateStopHexDraft(id: string, raw: string) {
    setHexDrafts((prev) => ({ ...prev, [id]: raw }));
    if (isValidHex(raw)) {
      const normalized = normalizeHex(raw);
      setState((prev) => ({ ...prev, stops: prev.stops.map((s) => (s.id === id ? { ...s, hex: normalized } : s)) }));
      setHexErrors((prev) => ({ ...prev, [id]: '' }));
    } else {
      setHexErrors((prev) => ({ ...prev, [id]: raw.trim() ? 'Enter a valid hex color, e.g. #3B82F6.' : '' }));
    }
  }

  function updateStopColorPicker(id: string, value: string) {
    setState((prev) => ({ ...prev, stops: prev.stops.map((s) => (s.id === id ? { ...s, hex: value } : s)) }));
    setHexDrafts((prev) => ({ ...prev, [id]: value }));
    setHexErrors((prev) => ({ ...prev, [id]: '' }));
  }

  function updateStopPosition(id: string, value: number) {
    const clamped = clampPosition(value);
    setState((prev) => ({ ...prev, stops: prev.stops.map((s) => (s.id === id ? { ...s, position: clamped } : s)) }));
  }

  function addStop() {
    setState((prev) => {
      if (prev.stops.length >= MAX_STOPS) return prev;
      const sorted = [...prev.stops].sort((a, b) => a.position - b.position);
      const last = sorted[sorted.length - 1];
      const secondLast = sorted[sorted.length - 2];
      const position = secondLast ? Math.round((last.position + secondLast.position) / 2) : Math.min(100, last.position);
      return { ...prev, stops: [...prev.stops, { id: generateId(), hex: '#ffffff', position }] };
    });
    announce('Color stop added.');
  }

  function removeStop(id: string) {
    setState((prev) => {
      if (prev.stops.length <= MIN_STOPS) return prev;
      return { ...prev, stops: prev.stops.filter((s) => s.id !== id) };
    });
    announce('Color stop removed.');
  }

  function applyPreset(preset: (typeof GRADIENT_PRESETS)[number]) {
    setState({ ...preset.state, stops: stopsFromPreset(preset.state.stops) });
    setHexDrafts({});
    setHexErrors({});
    announce(`${preset.name} preset applied.`);
  }

  function reverseColors() {
    setState((prev) => ({ ...prev, stops: reverseStops(prev.stops) }));
    announce('Colors reversed.');
  }

  function randomize() {
    setState((prev) => randomGradientState(prev));
    setHexDrafts({});
    setHexErrors({});
    announce('Random gradient generated.');
  }

  function resetAll() {
    setState(createDefaultState());
    setHexDrafts({});
    setHexErrors({});
    setDownloadError('');
    announce('Gradient reset to default.');
  }

  async function copyCss() {
    const text = `background: ${cssValue};`;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }
      setCopied(true);
      announce('CSS copied to clipboard.');
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      announce('Could not copy automatically. Please select and copy the CSS manually.');
    }
  }

  async function downloadPng() {
    setDownloadError('');
    setIsDownloading(true);
    try {
      const blob = await renderGradientPng(state);
      triggerBlobDownload(blob, 'gradient.png');
      announce('PNG download started.');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not generate a PNG for this gradient.';
      setDownloadError(message);
      announce(message);
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
        {/* Left column: live preview + CSS output — pinned on desktop so it stays visible while you adjust controls on the right */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-28">
          {/* Live preview */}
          <div className="gradient-checkerboard overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex h-56 w-full sm:h-72 lg:h-80" style={{ background: cssValue }} role="img" aria-label={`Live gradient preview: ${cssValue}`} />
          </div>

          {/* CSS output */}
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              CSS output
            </h2>
            <div className="relative overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--border-color)', background: 'var(--brand-ink)' }}>
              <pre className="overflow-x-auto p-4 pr-28 text-xs leading-relaxed sm:text-sm">
                <code style={{ color: '#e5e7eb', fontFamily: 'var(--font-mono)' }}>{cssCode}</code>
              </pre>
              <button
                type="button"
                onClick={copyCss}
                className="absolute right-3 top-3 inline-flex min-h-[36px] items-center justify-center rounded-full px-4 text-xs font-bold text-white transition-all duration-200"
                style={{ background: copied ? 'var(--color-success)' : 'var(--brand-primary)' }}
              >
                {copied ? 'Copied!' : 'Copy CSS'}
              </button>
            </div>
          </div>
        </div>

        {/* Right column: all controls */}
        <div className="flex flex-col gap-8">
          {/* Gradient type */}
      <div className="flex flex-col gap-3">
        <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }} id="gradient-type-label">
          Gradient type
        </span>
        <div className="inline-flex w-fit gap-1 rounded-full border p-1" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }} role="group" aria-labelledby="gradient-type-label">
          {(['linear', 'radial', 'conic'] as const).map((type) => (
            <button
              key={type}
              type="button"
              aria-pressed={state.type === type}
              onClick={() => setState((prev) => ({ ...prev, type }))}
              className="min-h-[40px] rounded-full px-4 text-sm font-bold capitalize transition-all duration-200"
              style={state.type === type ? { background: 'var(--brand-primary)', color: '#ffffff' } : { color: 'var(--text-secondary)' }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Color stops */}
      <div className="flex flex-col gap-4 rounded-2xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)' }}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            Colors
          </h2>
          <button
            type="button"
            onClick={addStop}
            disabled={state.stops.length >= MAX_STOPS}
            className={secondaryActionClass}
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
          >
            Add Color Stop
          </button>
        </div>
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {state.stops.length} of {MAX_STOPS} stops used &mdash; at least {MIN_STOPS} required.
        </p>

        <div className="flex flex-col gap-3">
          {sortedStops.map((stop, index) => {
            const draft = hexDrafts[stop.id] ?? stop.hex;
            const error = hexErrors[stop.id];
            return (
              <div key={stop.id} className="flex flex-wrap items-center gap-3 rounded-xl border p-3" style={{ borderColor: 'var(--border-color)' }}>
                <input
                  type="color"
                  value={isValidHex(stop.hex) ? normalizeHex(stop.hex) : '#000000'}
                  onChange={(e) => updateStopColorPicker(stop.id, e.target.value)}
                  aria-label={`Stop ${index + 1} color picker`}
                  title={`Stop ${index + 1} color picker`}
                  className="h-10 w-10 flex-shrink-0 cursor-pointer rounded-lg border p-0.5"
                  style={{ borderColor: 'var(--border-color)' }}
                />

                <div className="flex min-w-0 flex-col gap-1">
                  <label htmlFor={`hex-${stop.id}`} className="sr-only">
                    Stop {index + 1} hex value
                  </label>
                  <input
                    id={`hex-${stop.id}`}
                    type="text"
                    inputMode="text"
                    spellCheck={false}
                    value={draft}
                    onChange={(e) => updateStopHexDraft(stop.id, e.target.value)}
                    aria-invalid={!!error}
                    aria-describedby={error ? `hex-error-${stop.id}` : undefined}
                    className="w-24 rounded-lg border px-2.5 py-1.5 text-sm font-mono"
                    style={{ borderColor: error ? 'var(--color-error)' : 'var(--border-color)', color: 'var(--text-primary)' }}
                    placeholder="#000000"
                  />
                  {error && (
                    <p id={`hex-error-${stop.id}`} className="text-[11px] leading-snug" style={{ color: 'var(--color-error)' }} role="alert">
                      {error}
                    </p>
                  )}
                </div>

                <div className="flex min-w-[160px] flex-1 items-center gap-2">
                  <label htmlFor={`pos-range-${stop.id}`} className="sr-only">
                    Stop {index + 1} position percent
                  </label>
                  <input
                    id={`pos-range-${stop.id}`}
                    type="range"
                    min={0}
                    max={100}
                    value={stop.position}
                    onChange={(e) => updateStopPosition(stop.id, Number(e.target.value))}
                    className="webp-range flex-1"
                  />
                  <label htmlFor={`pos-num-${stop.id}`} className="sr-only">
                    Stop {index + 1} position number
                  </label>
                  <input
                    id={`pos-num-${stop.id}`}
                    type="number"
                    min={0}
                    max={100}
                    value={stop.position}
                    onChange={(e) => updateStopPosition(stop.id, Number(e.target.value))}
                    className="w-14 flex-shrink-0 rounded-lg border px-1.5 py-1 text-center text-xs"
                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                    aria-label={`Stop ${index + 1} position percent`}
                  />
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }} aria-hidden="true">
                    %
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => removeStop(stop.id)}
                  disabled={state.stops.length <= MIN_STOPS}
                  aria-label={`Remove color stop ${index + 1}`}
                  title="Remove this color stop"
                  className="ml-auto flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Linear controls */}
      {state.type === 'linear' && (
        <div className="flex flex-col gap-4 rounded-2xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)' }}>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            Direction
          </h2>

          <div className="flex flex-wrap items-center gap-4">
            <label htmlFor="linear-angle-range" className="sr-only">
              Angle in degrees
            </label>
            <input
              id="linear-angle-range"
              type="range"
              min={0}
              max={360}
              value={state.angle}
              onChange={(e) => setState((prev) => ({ ...prev, angle: clampAngle(Number(e.target.value)) }))}
              className="webp-range flex-1"
            />
            <div className="flex items-center gap-1.5">
              <label htmlFor="linear-angle-number" className="sr-only">
                Angle number, degrees
              </label>
              <input
                id="linear-angle-number"
                type="number"
                min={0}
                max={360}
                value={state.angle}
                onChange={(e) => setState((prev) => ({ ...prev, angle: clampAngle(Number(e.target.value)) }))}
                className="w-16 rounded-lg border px-2 py-1.5 text-center text-sm"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }} aria-hidden="true">
                deg
              </span>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
              Quick presets
            </span>
            <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-8">
              {LINEAR_DIRECTIONS.map((dir) => (
                <button
                  key={dir.label}
                  type="button"
                  onClick={() => setState((prev) => ({ ...prev, angle: dir.angle }))}
                  aria-pressed={state.angle === dir.angle}
                  aria-label={dir.label}
                  title={dir.label}
                  className="flex h-10 items-center justify-center rounded-lg border text-sm transition-colors duration-200"
                  style={
                    state.angle === dir.angle
                      ? { borderColor: 'var(--brand-primary)', background: 'var(--brand-lavender)', color: 'var(--brand-primary)' }
                      : { borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${dir.angle}deg)` }} aria-hidden="true">
                    <line x1="12" y1="19" x2="12" y2="5" />
                    <polyline points="6 11 12 5 18 11" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Radial controls */}
      {state.type === 'radial' && (
        <div className="flex flex-col gap-4 rounded-2xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)' }}>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            Shape &amp; position
          </h2>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }} id="radial-shape-label">
              Shape
            </span>
            <div className="inline-flex w-fit gap-1 rounded-full border p-1" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }} role="group" aria-labelledby="radial-shape-label">
              {(['circle', 'ellipse'] as const).map((shape) => (
                <button
                  key={shape}
                  type="button"
                  aria-pressed={state.shape === shape}
                  onClick={() => setState((prev) => ({ ...prev, shape }))}
                  className="min-h-[40px] rounded-full px-4 text-sm font-bold capitalize transition-all duration-200"
                  style={state.shape === shape ? { background: 'var(--brand-primary)', color: '#ffffff' } : { color: 'var(--text-secondary)' }}
                >
                  {shape}
                </button>
              ))}
            </div>
          </div>

          <PositionGrid position={state.position} onChange={(position) => setState((prev) => ({ ...prev, position }))} />
        </div>
      )}

      {/* Conic controls */}
      {state.type === 'conic' && (
        <div className="flex flex-col gap-4 rounded-2xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)' }}>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            Angle &amp; position
          </h2>

          <div className="flex flex-wrap items-center gap-4">
            <label htmlFor="conic-angle-range" className="sr-only">
              Starting angle in degrees
            </label>
            <input
              id="conic-angle-range"
              type="range"
              min={0}
              max={360}
              value={state.conicAngle}
              onChange={(e) => setState((prev) => ({ ...prev, conicAngle: clampAngle(Number(e.target.value)) }))}
              className="webp-range flex-1"
            />
            <div className="flex items-center gap-1.5">
              <label htmlFor="conic-angle-number" className="sr-only">
                Starting angle number, degrees
              </label>
              <input
                id="conic-angle-number"
                type="number"
                min={0}
                max={360}
                value={state.conicAngle}
                onChange={(e) => setState((prev) => ({ ...prev, conicAngle: clampAngle(Number(e.target.value)) }))}
                className="w-16 rounded-lg border px-2 py-1.5 text-center text-sm"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }} aria-hidden="true">
                deg
              </span>
            </div>
          </div>

          <PositionGrid position={state.position} onChange={(position) => setState((prev) => ({ ...prev, position }))} />
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={copyCss} className={primaryActionClass} style={{ background: 'var(--brand-primary)' }}>
            {copied ? 'Copied!' : 'Copy CSS'}
          </button>
          <button type="button" onClick={reverseColors} className={secondaryActionClass} style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
            Reverse Colors
          </button>
          <button type="button" onClick={randomize} className={secondaryActionClass} style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
            Random Gradient
          </button>
          <button type="button" onClick={resetAll} className={secondaryActionClass} style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
            Reset
          </button>
          <button type="button" onClick={downloadPng} disabled={isDownloading} className={secondaryActionClass} style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
            {isDownloading ? 'Generating…' : 'Download PNG'}
          </button>
        </div>
        {downloadError && (
          <p role="alert" className="text-xs font-medium" style={{ color: 'var(--color-error)' }}>
            {downloadError}
          </p>
        )}
      </div>

      {/* Presets */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
          Presets
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {GRADIENT_PRESETS.map((preset) => {
            const previewValue = buildGradientValue({ ...preset.state, stops: stopsFromPreset(preset.state.stops) });
            return (
              <button
                key={preset.name}
                type="button"
                onClick={() => applyPreset(preset)}
                title={`Apply ${preset.name} preset`}
                aria-label={`Apply ${preset.name} preset`}
                className="flex flex-col gap-2 rounded-xl border p-2 text-left transition-all duration-200 hover:-translate-y-0.5"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <span className="block h-12 w-full rounded-lg" style={{ background: previewValue }} aria-hidden="true" />
                <span className="truncate text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                  {preset.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}

interface PositionGridProps {
  position: GradientState['position'];
  onChange: (position: GradientState['position']) => void;
}

function PositionGrid({ position, onChange }: PositionGridProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }} id="position-grid-label">
        Position
      </span>
      <div className="grid w-fit grid-cols-3 gap-1.5" role="group" aria-labelledby="position-grid-label">
        {POSITION_KEYWORDS.map((keyword) => (
          <button
            key={keyword.value}
            type="button"
            onClick={() => onChange(keyword.value)}
            aria-pressed={position === keyword.value}
            aria-label={keyword.label}
            title={keyword.label}
            className="flex h-10 w-10 items-center justify-center rounded-lg border transition-colors duration-200"
            style={
              position === keyword.value
                ? { borderColor: 'var(--brand-primary)', background: 'var(--brand-lavender)' }
                : { borderColor: 'var(--border-color)' }
            }
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: position === keyword.value ? 'var(--brand-primary)' : 'var(--text-muted)' }}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
