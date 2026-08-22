interface ImageResultsSummaryProps {
  countLabel?: string;
  processedLabel: string;
  processedSizeLabel: string;
}

/** Output stats grid shared by all three Image Toolkit panels. Labels vary slightly per
 *  panel ("Converted"/"Compressed"/"Resized", "Converted size"/"New size") but the
 *  data-summary-* hooks stay fixed — the vanilla-DOM logic components write into these
 *  by attribute, not by panel identity. */
export default function ImageResultsSummary({ countLabel = 'Images', processedLabel, processedSizeLabel }: ImageResultsSummaryProps) {
  return (
    <div className="hidden grid-cols-2 gap-4 rounded-2xl border p-4" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }} data-summary>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
          {countLabel}
        </span>
        <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }} data-summary-count>
          0
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
          {processedLabel}
        </span>
        <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }} data-summary-converted>
          0
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
          Original size
        </span>
        <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }} data-summary-original-size>
          &mdash;
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
          {processedSizeLabel}
        </span>
        <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }} data-summary-converted-size>
          &mdash;
        </span>
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
          Total saved
        </span>
        <span className="text-lg font-bold" style={{ color: 'var(--tool-accent)' }} data-summary-saved>
          &mdash;
        </span>
      </div>
    </div>
  );
}
