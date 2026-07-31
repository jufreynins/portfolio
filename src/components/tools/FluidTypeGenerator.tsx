'use client';

import { useMemo, useState } from 'react';
import { buildClamp, valueAtViewport, validateFluidInput, PRESETS, type FluidInput, type FluidUnit } from '@/lib/fluidType/utils';
import CopyButton from '@/components/tools/CopyButton';
import ValidationMessage from '@/components/tools/ValidationMessage';
import Field, { fieldClass, fieldStyle } from '@/components/tools/Field';
import Tabs from '@/components/tools/Tabs';

const MODE_TABS = [
  { id: 'type', label: 'Typography' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'custom', label: 'Custom Property' },
];

const SLIDER_MIN = 320;
const SLIDER_MAX = 1920;

export default function FluidTypeGenerator() {
  const [mode, setMode] = useState('type');
  const [propertyName, setPropertyName] = useState('--fluid-space-md');
  const [input, setInput] = useState<FluidInput>({ minValue: 1, maxValue: 1.125, minViewport: 360, maxViewport: 1280, unit: 'rem', rootFontSize: 16 });
  const [viewport, setViewport] = useState(768);

  function set<K extends keyof FluidInput>(key: K, value: FluidInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  const error = validateFluidInput(input);
  const result = useMemo(() => (error ? null : buildClamp(input)), [input, error]);
  const previewValue = useMemo(() => (error ? input.minValue : valueAtViewport(input, viewport)), [input, viewport, error]);

  function applyPreset(preset: (typeof PRESETS)[number]) {
    setMode(preset.mode);
    setInput(preset.input);
  }

  function reset() {
    setInput({ minValue: 1, maxValue: 1.125, minViewport: 360, maxViewport: 1280, unit: 'rem', rootFontSize: 16 });
    setViewport(768);
  }

  const cssOutput = result ? (mode === 'custom' ? `${propertyName || '--fluid-value'}: ${result.clamp};` : mode === 'type' ? `font-size: ${result.clamp};` : `padding: ${result.clamp};`) : '';

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-start">
      {/* Left: inputs */}
      <div className="flex flex-col gap-4">
        <Tabs tabs={MODE_TABS} activeId={mode} onChange={setMode} ariaLabel="Fluid value mode" />

        {mode === 'custom' && (
          <Field label="CSS custom property name" htmlFor="prop-name" hint="e.g. --fluid-space-md">
            <input id="prop-name" value={propertyName} onChange={(e) => setPropertyName(e.target.value)} className={fieldClass} style={fieldStyle} />
          </Field>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Field label="Minimum value" htmlFor="min-value" required>
            <input id="min-value" type="number" step="0.01" value={input.minValue} onChange={(e) => set('minValue', Number(e.target.value))} className={fieldClass} style={fieldStyle} />
          </Field>
          <Field label="Maximum value" htmlFor="max-value" required>
            <input id="max-value" type="number" step="0.01" value={input.maxValue} onChange={(e) => set('maxValue', Number(e.target.value))} className={fieldClass} style={fieldStyle} />
          </Field>
          <Field label="Minimum viewport (px)" htmlFor="min-vp" required>
            <input id="min-vp" type="number" value={input.minViewport} onChange={(e) => set('minViewport', Number(e.target.value))} className={fieldClass} style={fieldStyle} />
          </Field>
          <Field label="Maximum viewport (px)" htmlFor="max-vp" required>
            <input id="max-vp" type="number" value={input.maxViewport} onChange={(e) => set('maxViewport', Number(e.target.value))} className={fieldClass} style={fieldStyle} />
          </Field>
          <Field label="Unit" htmlFor="unit">
            <select id="unit" value={input.unit} onChange={(e) => set('unit', e.target.value as FluidUnit)} className={fieldClass} style={fieldStyle}>
              <option value="rem">rem</option>
              <option value="px">px</option>
            </select>
          </Field>
          {input.unit === 'rem' && (
            <Field label="Root font size (px)" htmlFor="root-fs">
              <input id="root-fs" type="number" value={input.rootFontSize} onChange={(e) => set('rootFontSize', Number(e.target.value))} className={fieldClass} style={fieldStyle} />
            </Field>
          )}
        </div>

        {error && <ValidationMessage>{error}</ValidationMessage>}

        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
            Presets
          </span>
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((p) => (
              <button key={p.label} type="button" onClick={() => applyPreset(p)} className="min-h-[36px] rounded-full border px-3 text-xs font-bold" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                {p.label}
              </button>
            ))}
            <button type="button" onClick={reset} className="min-h-[36px] rounded-full px-3 text-xs font-bold" style={{ color: 'var(--color-error)' }}>
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Right: live preview + output */}
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border p-5" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
          <div className="mb-3 flex items-center justify-between">
            <label htmlFor="vp-slider" className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              Simulated viewport
            </label>
            <span className="font-mono text-xs font-bold" style={{ color: 'var(--tool-accent)' }}>
              {viewport}px
            </span>
          </div>
          <input
            id="vp-slider"
            type="range"
            min={SLIDER_MIN}
            max={SLIDER_MAX}
            value={viewport}
            onChange={(e) => setViewport(Number(e.target.value))}
            className="webp-range w-full"
            aria-valuetext={`${viewport} pixels`}
          />
          <div className="mt-1 flex justify-between text-[10px]" style={{ color: 'var(--text-muted)' }}>
            <span>{SLIDER_MIN}px</span>
            <span>min {input.minViewport}px</span>
            <span>max {input.maxViewport}px</span>
            <span>{SLIDER_MAX}px</span>
          </div>

          <div className="mt-5 flex min-h-[140px] items-center justify-center overflow-hidden rounded-xl border p-4" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)' }}>
            {mode === 'spacing' || mode === 'custom' ? (
              <div
                className="rounded-lg text-center text-xs font-bold"
                style={{ padding: `${previewValue}${input.unit}`, background: 'var(--tool-accent-soft)', color: 'var(--tool-accent)', border: '1px dashed var(--tool-accent)' }}
              >
                {Number(previewValue.toFixed(2))}
                {input.unit} padding
              </div>
            ) : (
              <p className="text-center font-bold" style={{ fontSize: `${previewValue}${input.unit}`, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                Aa Bg
              </p>
            )}
          </div>
          <p className="mt-2 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
            Computed value at {viewport}px: <strong>{Number(previewValue.toFixed(3))}{input.unit}</strong>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
              Generated CSS
            </h2>
            <div className="flex gap-2">
              <CopyButton getText={() => (result ? result.clamp : '')} label="Copy clamp()" disabled={!result} />
              <CopyButton getText={() => cssOutput} label="Copy CSS" variant="primary" disabled={!result} />
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--border-color)', background: 'var(--brand-ink)' }}>
            <pre className="overflow-x-auto p-4 text-xs leading-relaxed">
              <code style={{ color: '#e5e7eb', fontFamily: 'var(--font-mono)' }}>{cssOutput || '/* Fix the range above to generate CSS */'}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
