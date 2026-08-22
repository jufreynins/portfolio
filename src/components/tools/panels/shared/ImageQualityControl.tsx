interface ImageQualityControlProps {
  note?: string;
}

// Chosen to land cleanly inside qualityLabel()'s own bands (<=40 Smaller file, <=75
// Balanced, else Higher quality) so the preset name and the auto-updating label agree.
const PRESETS = [
  { value: 95, label: 'Best Quality' },
  { value: 70, label: 'Balanced' },
  { value: 35, label: 'Smallest File' },
];

/** Quality slider + one-click presets, shared by Convert and Compress. The preset buttons
 *  set the slider's value and dispatch a real 'input' event so each panel's existing
 *  vanilla-DOM slider listener (data-quality-slider) picks up the change exactly as if the
 *  user had dragged it — no separate wiring needed. */
export default function ImageQualityControl({ note }: ImageQualityControlProps) {
  return (
    <div className="flex flex-col gap-3">
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

      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Quality presets">
        {PRESETS.map((preset) => (
          <button
            key={preset.value}
            type="button"
            data-quality-preset
            data-preset-value={preset.value}
            className="min-h-[32px] rounded-full border px-3 text-xs font-bold transition-colors"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
          >
            {preset.label}
          </button>
        ))}
      </div>

      <input type="range" id="quality-slider" min={10} max={100} step={5} defaultValue={80} className="webp-range w-full" data-quality-slider />
      <div className="flex justify-between text-xs" style={{ color: 'var(--text-secondary)' }}>
        <span>Smaller file</span>
        <span>Balanced</span>
        <span>Higher quality</span>
      </div>
      {note && (
        <p className="hidden text-xs font-medium" style={{ color: 'var(--text-secondary)' }} data-quality-note>
          {note}
        </p>
      )}
    </div>
  );
}
