'use client';

import { useEffect, useRef, useState } from 'react';
import ToolGuideAccordion from '@/components/tools/ToolGuideAccordion';
import { MAX_STOPS, MIN_STOPS, type ColorStop, type GradientState } from '@/lib/gradient/types';
import {
  LINEAR_DIRECTIONS,
  POSITION_KEYWORDS,
  buildGradientCode,
  buildGradientValue,
  clampAngle,
  clampPosition,
  generateId,
  interpolateHex,
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
  const [selectedStopId, setSelectedStopId] = useState<string | null>(null);
  const [hexDraft, setHexDraft] = useState('');
  const [hexError, setHexError] = useState('');
  const [copied, setCopied] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const [downloadError, setDownloadError] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const draggingIdRef = useRef<string | null>(null);

  useEffect(
    () => () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    },
    []
  );

  const cssValue = buildGradientValue(state);
  const cssCode = buildGradientCode(state);
  const sortedStops = [...state.stops].sort((a, b) => a.position - b.position);
  const selectedStop = sortedStops.find((s) => s.id === selectedStopId) ?? sortedStops[0];
  const selectedIndex = sortedStops.findIndex((s) => s.id === selectedStop?.id);
  const railBackground = `linear-gradient(to right, ${sortedStops.map((s) => `${normalizeHex(s.hex)} ${s.position}%`).join(', ')})`;

  useEffect(() => {
    setHexDraft(selectedStop ? normalizeHex(selectedStop.hex) : '');
    setHexError('');
  }, [selectedStop?.id]);

  function announce(message: string) {
    setAnnouncement(message);
  }

  function positionFromClientX(clientX: number): number {
    const rail = railRef.current;
    if (!rail) return 0;
    const rect = rail.getBoundingClientRect();
    const t = rect.width ? (clientX - rect.left) / rect.width : 0;
    return clampPosition(t * 100);
  }

  function updateStopHexDraft(raw: string) {
    if (!selectedStop) return;
    setHexDraft(raw);
    if (isValidHex(raw)) {
      const normalized = normalizeHex(raw);
      setState((prev) => ({ ...prev, stops: prev.stops.map((s) => (s.id === selectedStop.id ? { ...s, hex: normalized } : s)) }));
      setHexError('');
    } else {
      setHexError(raw.trim() ? 'Enter a valid hex color, e.g. #3B82F6.' : '');
    }
  }

  function updateStopColorPicker(value: string) {
    if (!selectedStop) return;
    setState((prev) => ({ ...prev, stops: prev.stops.map((s) => (s.id === selectedStop.id ? { ...s, hex: value } : s)) }));
    setHexDraft(value);
    setHexError('');
  }

  function updateStopPosition(id: string, value: number) {
    const clamped = clampPosition(value);
    setState((prev) => ({ ...prev, stops: prev.stops.map((s) => (s.id === id ? { ...s, position: clamped } : s)) }));
  }

  function addStopAt(position: number) {
    setState((prev) => {
      if (prev.stops.length >= MAX_STOPS) return prev;
      const sorted = [...prev.stops].sort((a, b) => a.position - b.position);
      const left = [...sorted].reverse().find((s) => s.position <= position) ?? sorted[0];
      const right = sorted.find((s) => s.position >= position) ?? sorted[sorted.length - 1];
      const span = right.position - left.position;
      const t = span > 0 ? (position - left.position) / span : 0;
      const hex = interpolateHex(left.hex, right.hex, t);
      const id = generateId();
      setSelectedStopId(id);
      return { ...prev, stops: [...prev.stops, { id, hex, position }] };
    });
    announce('Color stop added.');
  }

  function addStop() {
    setState((prev) => {
      if (prev.stops.length >= MAX_STOPS) return prev;
      const sorted = [...prev.stops].sort((a, b) => a.position - b.position);
      const last = sorted[sorted.length - 1];
      const secondLast = sorted[sorted.length - 2];
      const position = secondLast ? Math.round((last.position + secondLast.position) / 2) : Math.min(100, last.position);
      const id = generateId();
      setSelectedStopId(id);
      return { ...prev, stops: [...prev.stops, { id, hex: '#ffffff', position }] };
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
    setSelectedStopId(null);
    announce(`${preset.name} preset applied.`);
  }

  function reverseColors() {
    setState((prev) => ({ ...prev, stops: reverseStops(prev.stops) }));
    announce('Colors reversed.');
  }

  function randomize() {
    setState((prev) => randomGradientState(prev));
    setSelectedStopId(null);
    announce('Random gradient generated.');
  }

  function resetAll() {
    setState(createDefaultState());
    setSelectedStopId(null);
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

  function handleRailClick(e: React.MouseEvent<HTMLDivElement>) {
    if (state.stops.length >= MAX_STOPS) return;
    const position = positionFromClientX(e.clientX);
    addStopAt(position);
  }

  function handleMarkerPointerDown(e: React.PointerEvent<HTMLButtonElement>, id: string) {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    draggingIdRef.current = id;
    setSelectedStopId(id);
  }

  function handleMarkerPointerMove(e: React.PointerEvent<HTMLButtonElement>) {
    if (draggingIdRef.current == null) return;
    updateStopPosition(draggingIdRef.current, positionFromClientX(e.clientX));
  }

  function handleMarkerPointerUp() {
    draggingIdRef.current = null;
  }

  function handleMarkerKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, stop: ColorStop) {
    const step = e.shiftKey ? 5 : 1;
    if (e.key === 'ArrowLeft') {
      updateStopPosition(stop.id, stop.position - step);
      e.preventDefault();
    } else if (e.key === 'ArrowRight') {
      updateStopPosition(stop.id, stop.position + step);
      e.preventDefault();
    } else if ((e.key === 'Delete' || e.key === 'Backspace') && state.stops.length > MIN_STOPS) {
      removeStop(stop.id);
      e.preventDefault();
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
                style={{ background: copied ? 'var(--color-success)' : 'var(--tool-accent)' }}
              >
                {copied ? 'Copied!' : 'Copy CSS'}
              </button>
            </div>
          </div>
        </div>

        {/* Right column: all controls */}
        <div className="flex flex-col gap-5">
          {/* Gradient type — kept outside any collapsible section since it's the first decision to make */}
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
                  style={state.type === type ? { background: 'var(--tool-accent)', color: '#ffffff' } : { color: 'var(--text-secondary)' }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Colors — the draggable stop rail, visually connected to the preview */}
          <ToolGuideAccordion title="Colors" defaultOpen>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  Click the rail to add a stop, drag a marker to reposition it.
                </p>
                <button type="button" onClick={addStop} disabled={state.stops.length >= MAX_STOPS} className={secondaryActionClass} style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                  Add Stop
                </button>
              </div>

              {/* Rail */}
              <div
                ref={railRef}
                onClick={handleRailClick}
                role="presentation"
                className="relative h-11 w-full cursor-copy rounded-full border"
                style={{ background: railBackground, borderColor: 'var(--border-color)' }}
              >
                {sortedStops.map((stop, index) => {
                  const isSelected = stop.id === selectedStop?.id;
                  return (
                    <button
                      key={stop.id}
                      type="button"
                      onPointerDown={(e) => handleMarkerPointerDown(e, stop.id)}
                      onPointerMove={handleMarkerPointerMove}
                      onPointerUp={handleMarkerPointerUp}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStopId(stop.id);
                      }}
                      onKeyDown={(e) => handleMarkerKeyDown(e, stop)}
                      aria-label={`Stop ${index + 1}: ${normalizeHex(stop.hex)} at ${stop.position}%. Use arrow keys to move, Delete to remove.`}
                      title={`Stop ${index + 1}: ${normalizeHex(stop.hex)} at ${stop.position}%`}
                      className="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none rounded-full border-2 border-white shadow-md transition-transform active:cursor-grabbing"
                      style={{
                        left: `${stop.position}%`,
                        background: normalizeHex(stop.hex),
                        boxShadow: isSelected ? `0 0 0 3px var(--tool-accent), 0 2px 6px rgba(0,0,0,0.35)` : '0 2px 6px rgba(0,0,0,0.35)',
                        zIndex: isSelected ? 2 : 1,
                      }}
                    />
                  );
                })}
              </div>

              {/* Selected-stop mini editor */}
              {selectedStop && (
                <div className="flex flex-wrap items-center gap-3 rounded-xl border p-3" style={{ borderColor: selectedStop.hex ? normalizeHex(selectedStop.hex) : 'var(--border-color)' }}>
                  <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    Stop {selectedIndex + 1} of {sortedStops.length}
                  </span>

                  <input
                    type="color"
                    value={isValidHex(selectedStop.hex) ? normalizeHex(selectedStop.hex) : '#000000'}
                    onChange={(e) => updateStopColorPicker(e.target.value)}
                    aria-label={`Stop ${selectedIndex + 1} color picker`}
                    className="h-9 w-9 flex-shrink-0 cursor-pointer rounded-lg border p-0.5"
                    style={{ borderColor: 'var(--border-color)' }}
                  />

                  <div className="flex min-w-0 flex-col gap-1">
                    <label htmlFor="selected-stop-hex" className="sr-only">
                      Stop {selectedIndex + 1} hex value
                    </label>
                    <input
                      id="selected-stop-hex"
                      type="text"
                      inputMode="text"
                      spellCheck={false}
                      value={hexDraft}
                      onChange={(e) => updateStopHexDraft(e.target.value)}
                      aria-invalid={!!hexError}
                      className="w-24 rounded-lg border px-2.5 py-1.5 text-sm font-mono"
                      style={{ borderColor: hexError ? 'var(--color-error)' : 'var(--border-color)', color: 'var(--text-primary)' }}
                      placeholder="#000000"
                    />
                    {hexError && (
                      <p className="text-[11px] leading-snug" style={{ color: 'var(--color-error)' }} role="alert">
                        {hexError}
                      </p>
                    )}
                  </div>

                  <div className="flex min-w-[140px] flex-1 items-center gap-2">
                    <label htmlFor="selected-stop-position" className="sr-only">
                      Stop {selectedIndex + 1} position percent
                    </label>
                    <input
                      id="selected-stop-position"
                      type="number"
                      min={0}
                      max={100}
                      value={selectedStop.position}
                      onChange={(e) => updateStopPosition(selectedStop.id, Number(e.target.value))}
                      className="w-16 flex-shrink-0 rounded-lg border px-1.5 py-1 text-center text-xs"
                      style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                    />
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }} aria-hidden="true">
                      %
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeStop(selectedStop.id)}
                    disabled={state.stops.length <= MIN_STOPS}
                    aria-label={`Remove stop ${selectedIndex + 1}`}
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
              )}

              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {state.stops.length} of {MAX_STOPS} stops used (at least {MIN_STOPS} required).
              </p>
            </div>
          </ToolGuideAccordion>

          {/* Direction / shape / position — grouped per type */}
          {state.type === 'linear' && (
            <ToolGuideAccordion title="Direction" defaultOpen>
              <div className="flex flex-col gap-4">
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
                            ? { borderColor: 'var(--tool-accent)', background: 'var(--tool-accent-soft)', color: 'var(--tool-accent)' }
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
            </ToolGuideAccordion>
          )}

          {state.type === 'radial' && (
            <ToolGuideAccordion title="Shape & Position" defaultOpen>
              <div className="flex flex-col gap-4">
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
                        style={state.shape === shape ? { background: 'var(--tool-accent)', color: '#ffffff' } : { color: 'var(--text-secondary)' }}
                      >
                        {shape}
                      </button>
                    ))}
                  </div>
                </div>

                <PositionGrid position={state.position} onChange={(position) => setState((prev) => ({ ...prev, position }))} />
              </div>
            </ToolGuideAccordion>
          )}

          {state.type === 'conic' && (
            <ToolGuideAccordion title="Angle & Position" defaultOpen>
              <div className="flex flex-col gap-4">
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
            </ToolGuideAccordion>
          )}

          {/* Output settings */}
          <ToolGuideAccordion title="Output & Presets">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <button type="button" onClick={reverseColors} className={secondaryActionClass} style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                    Reverse Colors
                  </button>
                  <button type="button" onClick={randomize} className={secondaryActionClass} style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                    Random Gradient
                  </button>
                  <button type="button" onClick={resetAll} className={secondaryActionClass} style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}>
                    Reset
                  </button>
                  <button type="button" onClick={downloadPng} disabled={isDownloading} className={primaryActionClass} style={{ background: 'var(--tool-accent)' }}>
                    {isDownloading ? 'Generating…' : 'Download PNG'}
                  </button>
                </div>
                {downloadError && (
                  <p role="alert" className="text-xs font-medium" style={{ color: 'var(--color-error)' }}>
                    {downloadError}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Presets
                </span>
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
          </ToolGuideAccordion>
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
                ? { borderColor: 'var(--tool-accent)', background: 'var(--tool-accent-soft)' }
                : { borderColor: 'var(--border-color)' }
            }
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: position === keyword.value ? 'var(--tool-accent)' : 'var(--text-muted)' }}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
