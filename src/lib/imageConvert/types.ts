export type ConversionStatus = 'queued' | 'processing' | 'completed' | 'failed' | 'removed';
export type OutputFormat = 'webp' | 'jpeg' | 'png';

export interface FormatOption {
  value: OutputFormat;
  label: string;
  mime: string;
  extension: string;
}

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
  outputFormat: OutputFormat;
  outputName: string;
  convertedBlob: Blob | null;
  convertedSize: number | null;
  errorMessage: string | null;
}

export const MAX_FILE_SIZE = 15 * 1024 * 1024;
export const MAX_BATCH_SIZE = 10;
export const MAX_DIMENSION = 12000;
export const DEFAULT_QUALITY = 0.8;
export const DEFAULT_OUTPUT_FORMAT: OutputFormat = 'webp';

export const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
export const ACCEPTED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const OUTPUT_FORMATS: FormatOption[] = [
  { value: 'webp', label: 'WebP', mime: 'image/webp', extension: '.webp' },
  { value: 'jpeg', label: 'JPG', mime: 'image/jpeg', extension: '.jpg' },
  { value: 'png', label: 'PNG', mime: 'image/png', extension: '.png' },
];

export function formatMime(format: OutputFormat): string {
  return OUTPUT_FORMATS.find((f) => f.value === format)?.mime ?? 'image/webp';
}

export function formatExtension(format: OutputFormat): string {
  return OUTPUT_FORMATS.find((f) => f.value === format)?.extension ?? '.webp';
}

export function formatLabel(format: OutputFormat): string {
  return OUTPUT_FORMATS.find((f) => f.value === format)?.label ?? 'WebP';
}
