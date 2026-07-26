export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(kb < 10 ? 2 : 1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

export function sanitizeFilename(name: string): string {
  const cleaned = name.replace(/[/\\?%*:|"<>\x00-\x1f]/g, '-').trim();
  return cleaned || 'image';
}

export function toWebpFilename(originalName: string): string {
  const sanitized = sanitizeFilename(originalName);
  const dot = sanitized.lastIndexOf('.');
  const base = dot > 0 ? sanitized.slice(0, dot) : sanitized;
  return `${base || 'image'}.webp`;
}

/** Returns a name unique against `used`, appending "-2", "-3", etc. before the extension. Mutates `used`. */
export function dedupeFilename(name: string, used: Set<string>): string {
  if (!used.has(name)) {
    used.add(name);
    return name;
  }
  const dot = name.lastIndexOf('.');
  const base = dot > 0 ? name.slice(0, dot) : name;
  const ext = dot > 0 ? name.slice(dot) : '';
  let i = 2;
  let candidate = `${base}-${i}${ext}`;
  while (used.has(candidate)) {
    i += 1;
    candidate = `${base}-${i}${ext}`;
  }
  used.add(candidate);
  return candidate;
}

export function percentSaved(originalSize: number, convertedSize: number): number {
  if (originalSize <= 0) return 0;
  return ((originalSize - convertedSize) / originalSize) * 100;
}

export function qualityLabel(percent: number): string {
  if (percent <= 40) return 'Smaller file';
  if (percent <= 75) return 'Balanced';
  return 'Higher quality';
}

export function getExtension(filename: string): string {
  const dot = filename.lastIndexOf('.');
  return dot >= 0 ? filename.slice(dot).toLowerCase() : '';
}
