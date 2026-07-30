import ImageCompressor from '@/components/ImageCompressor';

export default function ImageCompressPanel() {
  return (
    <div className="flex flex-col gap-6">
      <div role="status" aria-live="polite" className="sr-only" data-live-region />

      <div className="hidden rounded-xl border px-4 py-3 text-sm font-medium" style={{ borderColor: 'color-mix(in srgb, var(--color-error) 30%, white)', background: 'var(--color-error-soft)', color: 'var(--color-error)' }} data-error-banner />

      <div
        className="hidden rounded-xl border px-4 py-3 text-sm font-medium"
        style={{ borderColor: 'color-mix(in srgb, var(--color-warning) 30%, white)', background: 'var(--color-warning-soft)', color: 'var(--color-warning)' }}
        data-unsupported-banner
      >
        Your browser can&apos;t re-encode WebP files. JPG and PNG files can still be compressed.
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
        {/* Left column: controls — pinned on desktop so they stay reachable while you review results on the right */}
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

            <label className="sr-only" htmlFor="compressor-file-input">
              Choose JPG, PNG, or WebP images to compress
            </label>
            <input id="compressor-file-input" type="file" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" multiple className="sr-only" data-file-input />

            <button type="button" className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5" style={{ background: 'var(--tool-accent)' }} data-browse-btn>
              Browse images
            </button>

            <div className="flex flex-col items-center gap-1 pt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <p>Accepted formats: JPG, JPEG, PNG, WebP</p>
              <p>Maximum file size: 15 MB per image &bull; Maximum batch: 10 images</p>
            </div>
          </div>

          {/* Quality settings */}
          <div className="flex flex-col gap-4 rounded-2xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <label htmlFor="quality-slider" className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                Quality
              </label>
              <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'var(--tool-accent)' }}>
                <output htmlFor="quality-slider" data-quality-value>
                  80%
                </output>
                <span aria-hidden="true" style={{ color: 'var(--border-color)' }}>
                  &bull;
                </span>
                <span data-quality-label>Balanced</span>
              </div>
            </div>
            <input type="range" id="quality-slider" min={10} max={100} step={5} defaultValue={80} className="webp-range w-full" data-quality-slider />
            <div className="flex justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
              <span>Smaller file</span>
              <span>Balanced</span>
              <span>Higher quality</span>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              Applies to JPG and WebP. PNG is lossless, so it won&apos;t shrink much from this slider alone.
            </p>
          </div>
        </div>

        {/* Right column: results */}
        <div className="order-2 flex flex-col gap-6">
          {/* Summary */}
          <div className="hidden grid-cols-2 gap-4 rounded-2xl border p-5 sm:grid-cols-5 sm:p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }} data-summary>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                Images
              </span>
              <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }} data-summary-count>
                0
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                Compressed
              </span>
              <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }} data-summary-converted>
                0
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                Original size
              </span>
              <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }} data-summary-original-size>
                —
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                New size
              </span>
              <span className="text-xl font-bold" style={{ color: 'var(--text-primary)' }} data-summary-converted-size>
                —
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                Total saved
              </span>
              <span className="text-xl font-bold" style={{ color: 'var(--tool-accent)' }} data-summary-saved>
                —
              </span>
            </div>
          </div>

          {/* Empty state */}
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed py-12 text-center" style={{ borderColor: 'var(--border-color)' }} data-empty-state>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Your compressed images will appear here.
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Add JPG, PNG, or WebP files on the left to get started.
            </p>
          </div>

          {/* Image list */}
          <ul className="hidden flex-col gap-4" data-list aria-label="Uploaded images" />

          {/* Actions */}
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

      <ImageCompressor />
    </div>
  );
}
