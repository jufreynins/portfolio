import { ACCEPTED_EXTENSIONS, ACCEPTED_MIME_TYPES, MAX_DIMENSION, MAX_FILE_SIZE, formatMime, type OutputFormat } from './types';
import { getExtension } from './format';

export interface ValidationResult {
  valid: boolean;
  reason?: string;
}

/** Reads the first bytes of a file to confirm it is actually a JPEG, PNG, or WebP, regardless of its extension or reported MIME type. */
async function detectImageSignature(file: File): Promise<'jpeg' | 'png' | 'webp' | null> {
  const head = new Uint8Array(await file.slice(0, 12).arrayBuffer());
  if (head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff) return 'jpeg';
  if (
    head[0] === 0x89 &&
    head[1] === 0x50 &&
    head[2] === 0x4e &&
    head[3] === 0x47 &&
    head[4] === 0x0d &&
    head[5] === 0x0a &&
    head[6] === 0x1a &&
    head[7] === 0x0a
  ) {
    return 'png';
  }
  if (
    head[0] === 0x52 &&
    head[1] === 0x49 &&
    head[2] === 0x46 &&
    head[3] === 0x46 &&
    head[8] === 0x57 &&
    head[9] === 0x45 &&
    head[10] === 0x42 &&
    head[11] === 0x50
  ) {
    return 'webp';
  }
  return null;
}

export function signatureLabel(signature: 'jpeg' | 'png' | 'webp'): string {
  if (signature === 'jpeg') return 'JPG';
  if (signature === 'png') return 'PNG';
  return 'WEBP';
}

export async function validateFile(file: File): Promise<ValidationResult & { detectedType?: string }> {
  const ext = getExtension(file.name);
  if (!ACCEPTED_EXTENSIONS.includes(ext)) {
    return { valid: false, reason: `"${file.name}" is not a JPG, PNG, or WebP file.` };
  }

  if (file.type && !ACCEPTED_MIME_TYPES.includes(file.type)) {
    return { valid: false, reason: `"${file.name}" isn't a supported image type.` };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, reason: `"${file.name}" is larger than the 15 MB limit.` };
  }

  if (file.size === 0) {
    return { valid: false, reason: `"${file.name}" is empty or unreadable.` };
  }

  const signature = await detectImageSignature(file);
  if (!signature) {
    return { valid: false, reason: `"${file.name}" doesn't look like a valid JPG, PNG, or WebP file.` };
  }

  return { valid: true, detectedType: signatureLabel(signature) };
}

interface DecodedImage {
  source: ImageBitmap | HTMLImageElement;
  width: number;
  height: number;
  isBitmap: boolean;
}

function decodeWithImageElement(file: File): Promise<DecodedImage> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const { naturalWidth: width, naturalHeight: height } = img;
      URL.revokeObjectURL(url);
      if (!width || !height) {
        reject(new Error('Unable to read image dimensions.'));
        return;
      }
      resolve({ source: img, width, height, isBitmap: false });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Unable to decode image data.'));
    };
    img.src = url;
  });
}

export async function decodeImage(file: File): Promise<DecodedImage> {
  if (typeof createImageBitmap === 'function') {
    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
      return { source: bitmap, width: bitmap.width, height: bitmap.height, isBitmap: true };
    } catch {
      // Fall back to the <img> element path below (older Safari, unsupported option, etc.)
    }
  }
  return decodeWithImageElement(file);
}

export function checkDimensions(width: number, height: number): ValidationResult {
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    return {
      valid: false,
      reason: `Image dimensions (${width}×${height}px) exceed the 12,000 × 12,000px limit.`,
    };
  }
  return { valid: true };
}

/** Draws the decoded image to a canvas and re-encodes it as the requested output format. PNG output ignores `quality` (lossless format). */
export function convertToFormat(
  source: ImageBitmap | HTMLImageElement,
  width: number,
  height: number,
  quality: number,
  format: OutputFormat
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Canvas is not supported in this browser.'));
      return;
    }
    if (format === 'jpeg') {
      // JPEG has no alpha channel — flatten onto white first so transparent PNGs/WebPs don't turn black.
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
    }
    try {
      ctx.drawImage(source, 0, 0, width, height);
    } catch {
      reject(new Error('This image could not be drawn to canvas.'));
      return;
    }
    const mime = formatMime(format);
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error(`${mime.replace('image/', '').toUpperCase()} conversion failed.`));
      },
      mime,
      format === 'png' ? undefined : quality
    );
  });
}

const formatSupportCache = new Map<string, Promise<boolean>>();

export function checkFormatSupport(format: OutputFormat): Promise<boolean> {
  const mime = formatMime(format);
  const cached = formatSupportCache.get(mime);
  if (cached) return cached;

  const promise = new Promise<boolean>((resolve) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      canvas.toBlob((blob) => resolve(!!blob && blob.type === mime), mime);
    } catch {
      resolve(false);
    }
  });
  formatSupportCache.set(mime, promise);
  return promise;
}
