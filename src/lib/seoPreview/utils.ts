export type FieldStatus = 'short' | 'good' | 'long';

export interface FieldRange {
  min: number;
  good: number;
  max: number;
}

export const TITLE_RANGE: FieldRange = { min: 30, good: 60, max: 60 };
export const DESCRIPTION_RANGE: FieldRange = { min: 70, good: 160, max: 160 };

export type DeviceMode = 'desktop' | 'mobile';

/** Search snippets truncate shorter on mobile than desktop — these are close, commonly-cited approximations, not exact Google behavior. */
export const DEVICE_PREVIEW_LIMITS: Record<DeviceMode, { title: number; description: number }> = {
  desktop: { title: 60, description: 160 },
  mobile: { title: 50, description: 120 },
};

/** Approximate pixel-width truncation limits Google commonly applies (varies by actual rendering — a guideline, not a guarantee). */
export const PIXEL_WIDTH_LIMITS: Record<DeviceMode, { title: number; description: number }> = {
  desktop: { title: 600, description: 920 },
  mobile: { title: 320, description: 400 },
};

let measureCanvas: HTMLCanvasElement | null = null;

/** Approximates Google's Arial-based rendering width for a string, in CSS pixels. Returns 0 outside the browser. */
export function measureTextWidth(text: string, font = '400 20px arial'): number {
  if (typeof document === 'undefined') return 0;
  if (!measureCanvas) measureCanvas = document.createElement('canvas');
  const ctx = measureCanvas.getContext('2d');
  if (!ctx) return 0;
  ctx.font = font;
  return ctx.measureText(text).width;
}

export function getFieldStatus(length: number, range: FieldRange): FieldStatus {
  if (length === 0) return 'short';
  if (length < range.min) return 'short';
  if (length > range.max) return 'long';
  return 'good';
}

export function getFieldStatusLabel(status: FieldStatus, empty: boolean): string {
  if (empty) return 'Not set yet';
  if (status === 'short') return 'Could be longer';
  if (status === 'long') return 'May get truncated in search results';
  return 'Good length';
}

export function getFieldStatusColor(status: FieldStatus): string {
  if (status === 'short') return 'var(--color-warning)';
  if (status === 'long') return 'var(--color-error)';
  return 'var(--color-success)';
}

/** Character-based approximation of how Google typically truncates long titles/descriptions. */
export function truncateForPreview(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength).trimEnd();
  return `${cut}…`;
}

export function extractDisplayUrl(rawUrl: string): { host: string; breadcrumb: string } {
  const trimmed = rawUrl.trim();
  if (!trimmed) return { host: 'example.com', breadcrumb: 'example.com' };

  try {
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const url = new URL(withProtocol);
    const host = url.hostname.replace(/^www\./, '');
    const segments = url.pathname.split('/').filter(Boolean);
    const breadcrumb = segments.length ? `${host} › ${segments.join(' › ')}` : host;
    return { host, breadcrumb };
  } catch {
    return { host: trimmed, breadcrumb: trimmed };
  }
}

export interface MetaFields {
  title: string;
  description: string;
  url: string;
}

export function buildMetaTagsCode({ title, description, url }: MetaFields): string {
  const safeTitle = title.trim() || 'Untitled page';
  const safeDescription = description.trim() || 'Add a meta description for this page.';
  const safeUrl = url.trim();

  const lines = [`<title>${safeTitle}</title>`, `<meta name="description" content="${safeDescription}" />`];
  if (safeUrl) lines.push(`<link rel="canonical" href="${safeUrl}" />`);
  lines.push('', `<meta property="og:title" content="${safeTitle}" />`, `<meta property="og:description" content="${safeDescription}" />`);
  if (safeUrl) lines.push(`<meta property="og:url" content="${safeUrl}" />`);

  return lines.join('\n');
}

export const EXAMPLE_FIELDS: MetaFields = {
  title: 'WordPress Website Design & Development Services',
  description: 'Custom WordPress websites built with Elementor Pro, dynamic content, and clean, maintainable code. Fast, reliable, and easy for you to manage.',
  url: 'https://example.com/services',
};

export const EMPTY_FIELDS: MetaFields = { title: '', description: '', url: '' };
