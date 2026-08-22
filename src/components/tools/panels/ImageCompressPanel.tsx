import ImageCompressor from '@/components/ImageCompressor';
import ImageDropzone from '@/components/tools/panels/shared/ImageDropzone';
import ImageBeforeAfterPreview from '@/components/tools/panels/shared/ImageBeforeAfterPreview';
import ImageResultsSummary from '@/components/tools/panels/shared/ImageResultsSummary';
import ImageQualityControl from '@/components/tools/panels/shared/ImageQualityControl';

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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr] lg:items-start">
        {/* Left: upload + settings, one coherent panel */}
        <div className="flex flex-col gap-5">
          <ImageDropzone inputId="compressor-file-input" srLabel="Choose JPG, PNG, or WebP images to compress" />

          <div className="flex flex-col gap-4 rounded-2xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)' }}>
            <ImageQualityControl note="Applies to JPG and WebP. PNG is lossless, so it won't shrink much from this slider alone." />
          </div>
        </div>

        {/* Right: one merged preview + results workspace */}
        <div className="flex flex-col gap-5">
          <span className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
            Workspace
          </span>

          <ImageBeforeAfterPreview
            emptyTitle="Your before &amp; after comparison will appear here."
            emptyDescription="Add an image on the left to see the original next to the compressed result."
            processedLabel="Compressed"
          />

          <ImageResultsSummary processedLabel="Compressed" processedSizeLabel="New size" />

          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed py-10 text-center" style={{ borderColor: 'var(--border-color)' }} data-empty-state>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              Your compressed images will appear here.
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Add images on the left to get started.
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

      <ImageCompressor />
    </div>
  );
}
