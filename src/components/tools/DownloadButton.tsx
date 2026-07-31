'use client';

interface DownloadButtonProps {
  getContent: () => string | Blob;
  filename: string;
  mimeType?: string;
  label?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
}

export default function DownloadButton({ getContent, filename, mimeType = 'text/plain', label = 'Download', variant = 'secondary', className = '', disabled = false }: DownloadButtonProps) {
  const base = 'inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full px-4 text-xs font-bold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50';
  const style =
    variant === 'primary'
      ? { background: 'var(--tool-accent)', color: '#fff' }
      : { border: '1.5px solid var(--border-strong)', color: 'var(--text-primary)', background: 'var(--surface-white)' };

  function handleClick() {
    const content = getContent();
    const blob = content instanceof Blob ? content : new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <button type="button" onClick={handleClick} disabled={disabled} className={`${base} ${className}`} style={style}>
      {label}
    </button>
  );
}
