import ImageResizer from '@/components/ImageResizer';
import { SOCIAL_PRESETS, MIN_PERCENTAGE, MAX_PERCENTAGE, DEFAULT_PERCENTAGE } from '@/lib/imageResize/utils';
import ImageDropzone from '@/components/tools/panels/shared/ImageDropzone';
import ImageResultsSummary from '@/components/tools/panels/shared/ImageResultsSummary';

const presetsByCategory = SOCIAL_PRESETS.reduce<Record<string, typeof SOCIAL_PRESETS>>((acc, preset) => {
  (acc[preset.category] ??= []).push(preset);
  return acc;
}, {});

export default function ImageResizePanel() {
  return (
    <div className="flex flex-col gap-6">
      <div role="status" aria-live="polite" className="sr-only" data-live-region />
      <div className="hidden rounded-xl border px-4 py-3 text-sm font-medium" style={{ borderColor: 'color-mix(in srgb, var(--color-error) 30%, white)', background: 'var(--color-error-soft)', color: 'var(--color-error)' }} data-error-banner />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
        {/* Left: upload + mode/size settings, one coherent panel */}
        <div className="flex flex-col gap-5">
          <ImageDropzone inputId="resizer-file-input" srLabel="Choose JPG, PNG, or WebP images to resize" />

          <div className="flex flex-col gap-4 rounded-2xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)' }}>
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }} id="resize-mode-label">
              Resize mode
            </span>
            <div className="inline-flex w-fit flex-wrap gap-1 rounded-full border p-1" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }} role="group" aria-labelledby="resize-mode-label">
              <button type="button" data-mode-btn data-mode="custom" aria-pressed="true" className="min-h-[40px] rounded-full px-4 text-sm font-bold transition-all duration-200" style={{ background: 'var(--tool-accent)', color: '#ffffff' }}>
                Custom Size
              </button>
              <button type="button" data-mode-btn data-mode="percentage" aria-pressed="false" className="min-h-[40px] rounded-full px-4 text-sm font-bold transition-all duration-200" style={{ color: 'var(--text-secondary)' }}>
                Percentage
              </button>
              <button type="button" data-mode-btn data-mode="preset" aria-pressed="false" className="min-h-[40px] rounded-full px-4 text-sm font-bold transition-all duration-200" style={{ color: 'var(--text-secondary)' }}>
                Presets
              </button>
            </div>

            {/* Custom size panel */}
            <div data-mode-panel="custom" className="flex flex-col gap-3">
              <div className="flex flex-wrap items-end gap-3">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="width-input" className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    Width (px)
                  </label>
                  <input id="width-input" type="number" min={1} max={8000} defaultValue={1200} className="w-24 rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} data-width-input />
                </div>
                <button
                  type="button"
                  data-aspect-lock-btn
                  aria-pressed="false"
                  aria-label="Lock aspect ratio"
                  title="Lock aspect ratio"
                  className="mb-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border transition-colors"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </button>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="height-input" className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    Height (px)
                  </label>
                  <input id="height-input" type="number" min={1} max={8000} defaultValue={630} className="w-24 rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} data-height-input />
                </div>
              </div>
            </div>

            {/* Percentage panel */}
            <div data-mode-panel="percentage" className="hidden flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label htmlFor="percentage-slider" className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Scale
                </label>
                <output htmlFor="percentage-slider" className="text-sm font-semibold" style={{ color: 'var(--tool-accent)' }} data-percentage-value>
                  100%
                </output>
              </div>
              <input type="range" id="percentage-slider" min={MIN_PERCENTAGE} max={MAX_PERCENTAGE} step={5} defaultValue={DEFAULT_PERCENTAGE} className="webp-range w-full" data-percentage-slider />
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Scales the full image proportionally, no cropping.
              </p>
            </div>

            {/* Preset panel */}
            <div data-mode-panel="preset" className="hidden flex-col gap-2">
              <label htmlFor="preset-select" className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                Social media preset
              </label>
              <select id="preset-select" className="w-full rounded-lg border px-3 py-2.5 text-sm" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} data-preset-select>
                {Object.entries(presetsByCategory).map(([category, presets]) => (
                  <optgroup key={category} label={category}>
                    {presets.map((preset) => {
                      const globalIndex = SOCIAL_PRESETS.indexOf(preset);
                      return (
                        <option key={preset.label} value={globalIndex}>
                          {preset.label} &mdash; {preset.width}&times;{preset.height}
                        </option>
                      );
                    })}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right: one merged crop-preview + results workspace */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              Workspace
            </span>
            <button type="button" data-crop-reset-btn className="text-xs font-semibold underline-offset-2 hover:underline" style={{ color: 'var(--tool-accent)' }}>
              Reset crop
            </button>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)' }}>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }} data-dims-readout>
              Add an image to see its dimensions.
            </p>

            <div data-crop-wrapper className="flex flex-col gap-2">
              <p data-crop-placeholder className="rounded-2xl border border-dashed p-8 text-center text-sm" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                Add an image to position the crop.
              </p>

              <div data-crop-interactive className="relative hidden w-full overflow-hidden rounded-2xl" style={{ background: 'var(--surface-warm)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element -- runtime-generated blob URL, not a static asset next/image can optimize */}
                <img data-crop-preview-img alt="" draggable={false} className="block w-full select-none" />
                <div
                  data-crop-box
                  tabIndex={0}
                  role="group"
                  aria-label="Crop area. Drag to move. Use the corner handles, or arrow and plus/minus keys, to reposition and zoom."
                  className="absolute touch-none cursor-move outline-none"
                  style={{ border: '2px solid var(--tool-accent)', boxShadow: '0 0 0 9999px rgba(0,0,0,0.5)' }}
                >
                  {/* 3x3 grid guide */}
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-0 h-full w-px" style={{ left: '33.333%', background: 'rgba(255,255,255,0.7)' }} />
                    <div className="absolute top-0 h-full w-px" style={{ left: '66.666%', background: 'rgba(255,255,255,0.7)' }} />
                    <div className="absolute left-0 h-px w-full" style={{ top: '33.333%', background: 'rgba(255,255,255,0.7)' }} />
                    <div className="absolute left-0 h-px w-full" style={{ top: '66.666%', background: 'rgba(255,255,255,0.7)' }} />
                  </div>

                  {/* Corner resize/zoom handles */}
                  {(['nw', 'ne', 'sw', 'se'] as const).map((corner) => (
                    <button
                      key={corner}
                      type="button"
                      data-crop-handle={corner}
                      tabIndex={-1}
                      aria-hidden="true"
                      className="touch-none absolute h-4 w-4 rounded-full border-2 bg-white"
                      style={{
                        borderColor: 'var(--tool-accent)',
                        cursor: corner === 'nw' || corner === 'se' ? 'nwse-resize' : 'nesw-resize',
                        top: corner.includes('n') ? '-8px' : undefined,
                        bottom: corner.includes('s') ? '-8px' : undefined,
                        left: corner.includes('w') ? '-8px' : undefined,
                        right: corner.includes('e') ? '-8px' : undefined,
                      }}
                    />
                  ))}

                  <span
                    data-crop-zoom-label
                    className="pointer-events-none absolute top-1 left-1 rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                    style={{ background: 'rgba(0,0,0,0.55)' }}
                  >
                    100%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <ImageResultsSummary processedLabel="Resized" processedSizeLabel="New size" />

          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed py-10 text-center" style={{ borderColor: 'var(--border-color)' }} data-empty-state>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Your resized images will appear here.
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Choose a resize mode and add images on the left to get started.
            </p>
          </div>

          <ul className="hidden flex-col gap-3" data-list aria-label="Uploaded images" />

          <div className="flex flex-wrap items-center gap-3">
            <button type="button" className="hidden min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5" style={{ background: 'var(--tool-accent)' }} data-download-all-btn>
              Download All as ZIP
            </button>
            <button type="button" className="hidden min-h-[44px] items-center justify-center gap-2 rounded-full border-2 px-6 py-2.5 text-sm font-bold transition-all duration-300" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} data-clear-all-btn>
              Clear All
            </button>
          </div>
        </div>
      </div>

      <ImageResizer defaultMode="custom" />
    </div>
  );
}
