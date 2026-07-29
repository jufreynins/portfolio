import type { OutputFormat } from '@/lib/imageConvert/types';

export type ResizeMode = 'custom' | 'percentage' | 'preset';

/** Interactive crop position: cx/cy is the crop box's center as a fraction (0-1) of the source image; zoom >= 1 shrinks the crop box (magnifies). */
export interface CropState {
  cx: number;
  cy: number;
  zoom: number;
}

export const DEFAULT_CROP: CropState = { cx: 0.5, cy: 0.5, zoom: 1 };
export const MIN_ZOOM = 1;
export const MAX_ZOOM = 4;

export interface SizePreset {
  label: string;
  category: string;
  width: number;
  height: number;
}

export const SOCIAL_PRESETS: SizePreset[] = [
  { label: 'Facebook Post', category: 'Facebook', width: 1200, height: 630 },
  { label: 'Facebook Cover', category: 'Facebook', width: 820, height: 312 },
  { label: 'Instagram Post', category: 'Instagram', width: 1080, height: 1080 },
  { label: 'Instagram Story', category: 'Instagram', width: 1080, height: 1920 },
  { label: 'Instagram Reel Cover', category: 'Instagram', width: 1080, height: 1920 },
  { label: 'LinkedIn Banner', category: 'LinkedIn', width: 1584, height: 396 },
  { label: 'YouTube Thumbnail', category: 'YouTube', width: 1280, height: 720 },
  { label: 'X / Twitter Post', category: 'X / Twitter', width: 1600, height: 900 },
];

export const MIN_PERCENTAGE = 10;
export const MAX_PERCENTAGE = 200;
export const DEFAULT_PERCENTAGE = 100;

/**
 * Resolves a `CropState` (center fraction + zoom) against actual source/target
 * dimensions into a source-pixel crop rect. Shared by the live overlay preview
 * (using the reference image's natural size) and the real per-item render pass
 * (using each item's decoded size), so both agree pixel-for-pixel.
 */
export function computeCropBox(
  sourceWidth: number,
  sourceHeight: number,
  targetWidth: number,
  targetHeight: number,
  crop: CropState
): { sx: number; sy: number; cropWidth: number; cropHeight: number } {
  const targetRatio = targetWidth / targetHeight;
  const sourceRatio = sourceWidth / sourceHeight;

  let maxCropWidth = sourceWidth;
  let maxCropHeight = sourceHeight;
  if (sourceRatio > targetRatio) {
    maxCropWidth = sourceHeight * targetRatio;
  } else {
    maxCropHeight = sourceWidth / targetRatio;
  }

  const zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, crop.zoom));
  const cropWidth = maxCropWidth / zoom;
  const cropHeight = maxCropHeight / zoom;

  const idealSx = crop.cx * sourceWidth - cropWidth / 2;
  const idealSy = crop.cy * sourceHeight - cropHeight / 2;
  const sx = Math.min(Math.max(idealSx, 0), sourceWidth - cropWidth);
  const sy = Math.min(Math.max(idealSy, 0), sourceHeight - cropHeight);

  return { sx, sy, cropWidth, cropHeight };
}

/**
 * Crops the source per `crop` (center + zoom) then scales to targetWidth x targetHeight.
 * Used by custom-size and preset resize modes.
 */
export function renderCroppedResize(
  source: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number,
  targetWidth: number,
  targetHeight: number,
  crop: CropState,
  format: OutputFormat,
  quality: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Canvas is not supported in this browser.'));
      return;
    }

    const { sx, sy, cropWidth, cropHeight } = computeCropBox(sourceWidth, sourceHeight, targetWidth, targetHeight, crop);

    if (format === 'jpeg') {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, targetWidth, targetHeight);
    }
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    try {
      ctx.drawImage(source, sx, sy, cropWidth, cropHeight, 0, 0, targetWidth, targetHeight);
    } catch {
      reject(new Error('This image could not be drawn to canvas.'));
      return;
    }

    const mime = format === 'png' ? 'image/png' : format === 'webp' ? 'image/webp' : 'image/jpeg';
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Resize failed.'));
      },
      mime,
      format === 'png' ? undefined : quality
    );
  });
}

/** Proportional scale by percentage — no cropping, keeps the full source image. */
export function renderPercentageResize(
  source: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number,
  percentage: number,
  format: OutputFormat,
  quality: number
): Promise<Blob> {
  const targetWidth = Math.max(1, Math.round((sourceWidth * percentage) / 100));
  const targetHeight = Math.max(1, Math.round((sourceHeight * percentage) / 100));

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Canvas is not supported in this browser.'));
      return;
    }

    if (format === 'jpeg') {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, targetWidth, targetHeight);
    }
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    try {
      ctx.drawImage(source, 0, 0, targetWidth, targetHeight);
    } catch {
      reject(new Error('This image could not be drawn to canvas.'));
      return;
    }

    const mime = format === 'png' ? 'image/png' : format === 'webp' ? 'image/webp' : 'image/jpeg';
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Resize failed.'));
      },
      mime,
      format === 'png' ? undefined : quality
    );
  });
}
