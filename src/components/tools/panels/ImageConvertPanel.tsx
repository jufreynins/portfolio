import ImageFormatConverter from '@/components/ImageFormatConverter';
import ImageDropzone from '@/components/tools/panels/shared/ImageDropzone';
import ImageBeforeAfterPreview from '@/components/tools/panels/shared/ImageBeforeAfterPreview';
import ImageResultsSummary from '@/components/tools/panels/shared/ImageResultsSummary';
import ImageQualityControl from '@/components/tools/panels/shared/ImageQualityControl';

export default function ImageConvertPanel() {
  return (
    <div className="flex flex-col gap-6">
      <div role="status" aria-live="polite" className="sr-only" data-live-region />

      <div className="hidden rounded-xl border px-4 py-3 text-sm font-medium" style={{ borderColor: 'color-mix(in srgb, var(--color-error) 30%, white)', background: 'var(--color-error-soft)', color: 'var(--color-error)' }} data-error-banner />

      <div
        className="hidden rounded-xl border px-4 py-3 text-sm font-medium"
        style={{ borderColor: 'color-mix(in srgb, var(--color-warning) 30%, white)', background: 'var(--color-warning-soft)', color: 'var(--color-warning)' }}
        data-unsupported-banner
      >
        Your browser doesn&apos;t support WebP output. You can still convert to JPG or PNG.
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
        {/* Left: upload + settings, one coherent panel */}
        <div className="flex flex-col gap-5">
          <ImageDropzone inputId="format-file-input" srLabel="Choose JPG, PNG, or WebP images to convert" />

          <div className="flex flex-col gap-4 rounded-2xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)' }}>
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }} id="format-select-label">
              Convert to
            </span>
            <div className="inline-flex w-fit gap-1 rounded-full border p-1" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }} role="group" aria-labelledby="format-select-label">
              <button type="button" data-format-btn data-format="webp" aria-pressed="true" className="min-h-[40px] rounded-full px-4 text-sm font-bold transition-all duration-200" style={{ background: 'var(--tool-accent)', color: '#ffffff' }}>
                WebP
              </button>
              <button type="button" data-format-btn data-format="jpeg" aria-pressed="false" className="min-h-[40px] rounded-full px-4 text-sm font-bold transition-all duration-200" style={{ color: 'var(--text-secondary)' }}>
                JPG
              </button>
              <button type="button" data-format-btn data-format="png" aria-pressed="false" className="min-h-[40px] rounded-full px-4 text-sm font-bold transition-all duration-200" style={{ color: 'var(--text-secondary)' }}>
                PNG
              </button>
            </div>

            <div className="border-t pt-4" style={{ borderColor: 'var(--border-color)' }}>
              <ImageQualityControl note="PNG is lossless; quality doesn't apply to this format." />
            </div>
          </div>
        </div>

        {/* Right: one merged preview + results workspace */}
        <div className="flex flex-col gap-5">
          <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
            Workspace
          </span>

          <ImageBeforeAfterPreview
            emptyTitle="Your before &amp; after comparison will appear here."
            emptyDescription="Add an image on the left to see the original next to the converted result."
            processedLabel="Converted"
          />

          <ImageResultsSummary processedLabel="Converted" processedSizeLabel="Converted size" />

          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed py-10 text-center" style={{ borderColor: 'var(--border-color)' }} data-empty-state>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Your converted images will appear here.
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Pick a format on the left, then add images to get started.
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

      <ImageFormatConverter />
    </div>
  );
}
