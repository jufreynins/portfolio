export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
export const ACCEPTED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];

export const ICO_SIZES = [16, 32, 48] as const;
export const PNG_SIZES = [
  { size: 180, filename: 'apple-touch-icon.png', label: 'Apple Touch Icon' },
  { size: 192, filename: 'icon-192.png', label: 'Android / PWA' },
  { size: 512, filename: 'icon-512.png', label: 'Android / PWA (large)' },
] as const;

export interface ValidationResult {
  valid: boolean;
  reason?: string;
}

export function validateSourceFile(file: File): ValidationResult {
  const dot = file.name.lastIndexOf('.');
  const ext = dot >= 0 ? file.name.slice(dot).toLowerCase() : '';

  if (!ACCEPTED_EXTENSIONS.includes(ext)) {
    return { valid: false, reason: `"${file.name}" is not a JPG, PNG, WebP, or SVG file.` };
  }
  if (file.type && !ACCEPTED_MIME_TYPES.includes(file.type)) {
    return { valid: false, reason: `"${file.name}" isn't a supported image type.` };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, reason: `"${file.name}" is larger than the 10 MB limit.` };
  }
  if (file.size === 0) {
    return { valid: false, reason: `"${file.name}" is empty or unreadable.` };
  }

  return { valid: true };
}

/** Draws the source image, center-cropped to a square, onto a canvas at the target size and returns a PNG blob. */
export function renderSquarePng(source: CanvasImageSource, sourceWidth: number, sourceHeight: number, targetSize: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = targetSize;
    canvas.height = targetSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Canvas is not supported in this browser.'));
      return;
    }

    const side = Math.min(sourceWidth, sourceHeight);
    const sx = (sourceWidth - side) / 2;
    const sy = (sourceHeight - side) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    try {
      ctx.drawImage(source, sx, sy, side, side, 0, 0, targetSize, targetSize);
    } catch {
      reject(new Error('This image could not be drawn to canvas.'));
      return;
    }

    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('PNG generation failed.'));
    }, 'image/png');
  });
}

interface IcoImage {
  size: number;
  blob: Blob;
}

/** Builds a real multi-resolution .ico file from PNG-encoded images (supported since Windows Vista — no legacy BMP encoding needed). */
export async function buildIco(images: IcoImage[]): Promise<Blob> {
  const buffers = await Promise.all(images.map((img) => img.blob.arrayBuffer()));

  const headerSize = 6;
  const entrySize = 16;
  const dirSize = headerSize + entrySize * images.length;

  const header = new Uint8Array(dirSize);
  const view = new DataView(header.buffer);
  view.setUint16(0, 0, true); // reserved
  view.setUint16(2, 1, true); // type: 1 = icon
  view.setUint16(4, images.length, true); // image count

  let offset = dirSize;
  images.forEach((img, i) => {
    const entryOffset = headerSize + i * entrySize;
    const dataSize = buffers[i].byteLength;
    const dimensionByte = img.size >= 256 ? 0 : img.size; // ICO encodes 256 as 0

    header[entryOffset + 0] = dimensionByte; // width
    header[entryOffset + 1] = dimensionByte; // height
    header[entryOffset + 2] = 0; // color palette count (0 = no palette)
    header[entryOffset + 3] = 0; // reserved
    view.setUint16(entryOffset + 4, 1, true); // color planes
    view.setUint16(entryOffset + 6, 32, true); // bits per pixel
    view.setUint32(entryOffset + 8, dataSize, true); // size of image data
    view.setUint32(entryOffset + 12, offset, true); // offset of image data from file start

    offset += dataSize;
  });

  return new Blob([header, ...buffers], { type: 'image/x-icon' });
}

export function buildHtmlSnippet(): string {
  return [
    '<link rel="icon" href="/favicon.ico" sizes="any" />',
    '<link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />',
    '<link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />',
    '<link rel="apple-touch-icon" href="/apple-touch-icon.png" />',
  ].join('\n');
}

export function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
