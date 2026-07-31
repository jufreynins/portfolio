export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export function isValidHex(hex: string): boolean {
  return /^#?[0-9a-fA-F]{6}$/.test(hex) || /^#?[0-9a-fA-F]{3}$/.test(hex);
}

export function normalizeHex(hex: string): string {
  let h = hex.trim().replace(/^#/, '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  return `#${h.toLowerCase()}`;
}

export function hexToRgb(hex: string): Rgb | null {
  if (!isValidHex(hex)) return null;
  const normalized = normalizeHex(hex).slice(1);
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return { r, g, b };
}

export function rgbToHex({ r, g, b }: Rgb): string {
  const toHex = (n: number) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function channelLuminance(c: number): number {
  const cs = c / 255;
  return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
}

export function relativeLuminance({ r, g, b }: Rgb): number {
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b);
}

export function contrastRatio(a: Rgb, b: Rgb): number {
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function isLargeText(fontSizePx: number, bold: boolean): boolean {
  return fontSizePx >= 24 || (fontSizePx >= 18.66 && bold);
}

export interface WcagResult {
  criterion: string;
  threshold: number;
  pass: boolean;
}

export function evaluateWcag(ratio: number, large: boolean): WcagResult[] {
  return [
    { criterion: 'AA — Normal Text', threshold: 4.5, pass: ratio >= 4.5 },
    { criterion: 'AA — Large Text', threshold: 3, pass: ratio >= 3 },
    { criterion: 'AAA — Normal Text', threshold: 7, pass: ratio >= 7 },
    { criterion: 'AAA — Large Text', threshold: 4.5, pass: ratio >= 4.5 },
  ].filter((r) => (large ? r.criterion.includes('Large') : r.criterion.includes('Normal')));
}

/** Darkens/lightens the foreground toward black or white in small steps until it passes the given ratio against the background, if possible. */
export function suggestPassingForeground(fg: Rgb, bg: Rgb, targetRatio: number): Rgb | null {
  if (contrastRatio(fg, bg) >= targetRatio) return null;
  const bgLum = relativeLuminance(bg);
  const towardBlack = bgLum > 0.4; // if background is light, darkening the foreground helps more predictably
  let current = { ...fg };
  for (let i = 0; i < 40; i++) {
    const step = towardBlack ? -6 : 6;
    current = { r: current.r + step, g: current.g + step, b: current.b + step };
    current = { r: Math.min(255, Math.max(0, current.r)), g: Math.min(255, Math.max(0, current.g)), b: Math.min(255, Math.max(0, current.b)) };
    if (contrastRatio(current, bg) >= targetRatio) return current;
    if ((current.r === 0 && current.g === 0 && current.b === 0) || (current.r === 255 && current.g === 255 && current.b === 255)) break;
  }
  return null;
}
