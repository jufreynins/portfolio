interface ImageDropzoneProps {
  inputId: string;
  srLabel: string;
}

/** Upload dropzone shared by all three Image Toolkit panels — identical markup and copy
 *  across Convert/Compress/Resize, parameterized only by the file input's id and its
 *  accessible label. Purely presentational: each panel's vanilla-DOM logic component
 *  wires behavior via the data-* attributes below, so every one of them (data-dropzone,
 *  data-file-input, data-browse-btn) must stay exactly as-is. */
export default function ImageDropzone({ inputId, srLabel }: ImageDropzoneProps) {
  return (
    <div
      className="webp-dropzone flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed p-8 text-center transition-colors duration-200 sm:p-10"
      style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}
      data-dropzone
    >
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
          or click anywhere in this box to browse your files
        </p>
      </div>

      <label className="sr-only" htmlFor={inputId}>
        {srLabel}
      </label>
      <input id={inputId} type="file" accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp" multiple className="sr-only" data-file-input />

      <button
        type="button"
        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5"
        style={{ background: 'var(--tool-accent)' }}
        data-browse-btn
      >
        Browse images
      </button>

      <div className="flex flex-col items-center gap-1 pt-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
        <p>Accepted formats: JPG, JPEG, PNG, WebP</p>
        <p>Maximum file size: 15 MB per image &bull; Maximum batch: 10 images</p>
      </div>
    </div>
  );
}
