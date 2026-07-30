import ImageResizer from '@/components/ImageResizer';
import { SOCIAL_PRESETS, MIN_PERCENTAGE, MAX_PERCENTAGE, DEFAULT_PERCENTAGE } from '@/lib/imageResize/utils';

const presetsByCategory = SOCIAL_PRESETS.reduce<Record<string, typeof SOCIAL_PRESETS>>((acc, preset) => {
  (acc[preset.category] ??= []).push(preset);
  return acc;
}, {});

export default function ImageResizePanel() {
  return (
    <div className="flex flex-col gap-6">
      <div role="status" aria-live="polite" className="sr-only" data-live-region />
      <div className="hidden rounded-xl border px-4 py-3 text-sm font-medium" style={{ borderColor: 'color-mix(in srgb, var(--color-error) 30%, white)', background: 'var(--color-error-soft)', color: 'var(--color-error)' }} data-error-banner />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
        {/* Left column: controls */}
        <div className="order-1 flex flex-col gap-6 lg:sticky lg:top-28">
          {/* Dropzone */}
          <div className="webp-dropzone flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed p-8 text-center transition-colors duration-200 sm:p-10" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }} data-dropzone>
            <span className="flex h-14 w-14 items-center justify-center rounded-full" style={{ background: 'var(--tool-accent-soft)', color: 'var(--tool-accent)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </span>
            <div className="flex flex-col gap-1">
              <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                Drag and drop images here
              </p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                or use the button below to browse your files
              </p>
            </div>
            <label className="sr-only" htmlFor="resizer-file-input">
              Choose JPG, PNG, or WebP images to resize
            </label>
            <input id="resizer-file-input" type="file" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" multiple className="sr-only" data-file-input />
            <button type="button" className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5" style={{ background: 'var(--tool-accent)' }} data-browse-btn>
              Browse images
            </button>
            <div className="flex flex-col items-center gap-1 pt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <p>Accepted formats: JPG, JPEG, PNG, WebP</p>
              <p>Maximum file size: 15 MB per image &bull; Maximum batch: 10 images</p>
            </div>
          </div>

          {/* Mode tabs */}
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
                  <input id="width-input" type="number" min={1} max={8000} defaultValue={1200} className="w-28 rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} data-width-input />
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
                  <input id="height-input" type="number" min={1} max={8000} defaultValue={630} className="w-28 rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} data-height-input />
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
                Scales the full image proportionally &mdash; no cropping.
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

            {/* Interactive crop box (shared by custom + preset modes) */}
            <div data-crop-wrapper className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }} id="crop-box-label">
                  Crop area
                </span>
                <button type="button" data-crop-reset-btn className="text-xs font-semibold underline-offset-2 hover:underline" style={{ color: 'var(--tool-accent)' }}>
                  Reset
                </button>
              </div>

              <p data-crop-placeholder className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                Add an image to position the crop.
              </p>

              <div data-crop-interactive className="relative hidden w-full overflow-hidden rounded-2xl" style={{ background: 'var(--surface-warm)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element -- runtime-generated blob URL, not a static asset next/image can optimize */}
                <img data-crop-preview-img alt="" draggable={false} className="block w-full select-none" />
                <div
                  data-crop-box
                  tabIndex={0}
                  role="group"
                  aria-labelledby="crop-box-label"
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
        </div>

        {/* Right column: results */}
        <div className="order-2 flex flex-col gap-6">
          {/* Summary */}
          <div className="hidden grid-cols-2 gap-4 rounded-2xl border p-5 sm:grid-cols-5 sm:p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }} data-summary>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Images</span>
              <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }} data-summary-count>0</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Resized</span>
              <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }} data-summary-converted>0</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Original size</span>
              <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }} data-summary-original-size>—</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>New size</span>
              <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }} data-summary-converted-size>—</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Total saved</span>
              <span className="text-xl font-bold" style={{ color: 'var(--tool-accent)' }} data-summary-saved>—</span>
            </div>
          </div>

          {/* Empty state */}
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed py-12 text-center" style={{ borderColor: 'var(--border-color)' }} data-empty-state>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Your resized images will appear here.</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Choose a resize mode and add images on the left to get started.</p>
          </div>

          <ul className="hidden flex-col gap-4" data-list aria-label="Uploaded images" />

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
