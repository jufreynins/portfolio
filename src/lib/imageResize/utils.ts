import type { OutputFormat } from '@/lib/imageConvert/types';

export type ResizeMode = 'custom' | 'percentage' | 'preset';

export type AnchorPosition = 'top left' | 'top' | 'top right' | 'left' | 'center' | 'right' | 'bottom left' | 'bottom' | 'bottom right';

export const ANCHOR_POSITIONS: Array<{ label: string; value: AnchorPosition }> = [
  { label: 'Top Left', value: 'top left' },
  { label: 'Top', value: 'top' },
  { label: 'Top Right', value: 'top right' },
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
  { label: 'Bottom Left', value: 'bottom left' },
  { label: 'Bottom', value: 'bottom' },
  { label: 'Bottom Right', value: 'bottom right' },
];

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

function anchorFractions(anchor: AnchorPosition): { fx: number; fy: number } {
  const fx = anchor.includes('left') ? 0 : anchor.includes('right') ? 1 : 0.5;
  const fy = anchor.includes('top') ? 0 : anchor.includes('bottom') ? 1 : 0.5;
  return { fx, fy };
}

/**
 * Crops the source to the target aspect ratio (anchored per `anchor`) then scales to
 * targetWidth x targetHeight. Used by custom-size and preset resize modes.
 */
export function renderCroppedResize(
  source: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number,
  targetWidth: number,
  targetHeight: number,
  anchor: AnchorPosition,
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

    const targetRatio = targetWidth / targetHeight;
    const sourceRatio = sourceWidth / sourceHeight;

    let cropWidth = sourceWidth;
    let cropHeight = sourceHeight;
    if (sourceRatio > targetRatio) {
      cropWidth = sourceHeight * targetRatio;
    } else {
      cropHeight = sourceWidth / targetRatio;
    }

    const { fx, fy } = anchorFractions(anchor);
    const sx = (sourceWidth - cropWidth) * fx;
    const sy = (sourceHeight - cropHeight) * fy;

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
