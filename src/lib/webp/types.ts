export type ConversionStatus = 'queued' | 'processing' | 'completed' | 'failed' | 'removed';

export interface ImageItem {
  id: string;
  file: File;
  originalUrl: string;
  originalName: string;
  originalType: string;
  originalSize: number;
  width: number;
  height: number;
  status: ConversionStatus;
  quality: number;
  outputName: string;
  convertedBlob: Blob | null;
  convertedSize: number | null;
  errorMessage: string | null;
}

export const MAX_FILE_SIZE = 15 * 1024 * 1024;
export const MAX_BATCH_SIZE = 10;
export const MAX_DIMENSION = 12000;
export const DEFAULT_QUALITY = 0.8;
export const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];
export const ACCEPTED_MIME_TYPES = ['image/jpeg', 'image/png'];
