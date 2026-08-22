interface ImageBeforeAfterPreviewProps {
  emptyTitle: string;
  emptyDescription: string;
  processedLabel: string;
}

/** Before/after comparison workspace shared by Convert and Compress (Resize has its own
 *  crop preview instead). The data-preview-* hooks are written to directly by each panel's
 *  vanilla-DOM logic component, so their names and nesting must stay exactly as-is. */
export default function ImageBeforeAfterPreview({ emptyTitle, emptyDescription, processedLabel }: ImageBeforeAfterPreviewProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border p-5 sm:p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)' }}>
      <div className="flex flex-col gap-2" data-preview-empty>
        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          {emptyTitle}
        </p>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {emptyDescription}
        </p>
      </div>

      <div className="hidden flex-col gap-4" data-preview-content>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--text-secondary)' }}>
              Original
            </span>
            <div className="gradient-checkerboard flex aspect-square items-center justify-center overflow-hidden rounded-xl border" style={{ borderColor: 'var(--border-color)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- runtime-generated blob URL, not a static asset next/image can optimize */}
              <img data-preview-original-img alt="Original image" className="max-h-full max-w-full" />
            </div>
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }} data-preview-original-label />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--tool-accent)' }}>
              {processedLabel}
            </span>
            <div className="gradient-checkerboard relative flex aspect-square items-center justify-center overflow-hidden rounded-xl border" style={{ borderColor: 'var(--tool-accent)' }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- runtime-generated blob URL, not a static asset next/image can optimize */}
              <img data-preview-converted-img alt={`${processedLabel} image`} className="hidden max-h-full max-w-full" />
              <span data-preview-converted-placeholder className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                Queued&hellip;
              </span>
            </div>
            <span className="text-xs" style={{ color: 'var(--text-secondary)' }} data-preview-converted-label />
          </div>
        </div>
        <p className="text-sm font-bold" data-preview-saved style={{ color: 'var(--tool-accent)' }} />
        <p className="text-xs" style={{ color: 'var(--text-secondary)' }} data-preview-multi-note />
      </div>
    </div>
  );
}
