import type { ColorStop, GradientState, PositionKeyword } from './types';

const HEX_PATTERN = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;

export function isValidHex(value: string): boolean {
  return HEX_PATTERN.test(value.trim());
}

export function normalizeHex(value: string): string {
  const trimmed = value.trim();
  if (!HEX_PATTERN.test(trimmed)) return trimmed;
  if (trimmed.length === 4) {
    const [, r, g, b] = trimmed;
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return trimmed.toLowerCase();
}

/** Linearly interpolates between two normalized 6-digit hex colors at t (0-1). */
export function interpolateHex(hexA: string, hexB: string, t: number): string {
  const a = normalizeHex(hexA);
  const b = normalizeHex(hexB);
  const parse = (hex: string) => [hex.slice(1, 3), hex.slice(3, 5), hex.slice(5, 7)].map((h) => parseInt(h, 16));
  const [ar, ag, ab] = parse(a);
  const [br, bg, bb] = parse(b);
  const mix = (x: number, y: number) => Math.round(x + (y - x) * t);
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  return `#${toHex(mix(ar, br))}${toHex(mix(ag, bg))}${toHex(mix(ab, bb))}`;
}

export function clampPosition(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, Math.round(value)));
}

export function clampAngle(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(360, Math.max(0, Math.round(value)));
}

export function generateId(): string {
  return typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function sortStops(stops: ColorStop[]): ColorStop[] {
  return [...stops].sort((a, b) => a.position - b.position);
}

export function randomHex(): string {
  const n = Math.floor(Math.random() * 0xffffff);
  return `#${n.toString(16).padStart(6, '0')}`;
}

export const LINEAR_DIRECTIONS: Array<{ label: string; angle: number }> = [
  { label: 'Top', angle: 0 },
  { label: 'Top Right', angle: 45 },
  { label: 'Right', angle: 90 },
  { label: 'Bottom Right', angle: 135 },
  { label: 'Bottom', angle: 180 },
  { label: 'Bottom Left', angle: 225 },
  { label: 'Left', angle: 270 },
  { label: 'Top Left', angle: 315 },
];

export const POSITION_KEYWORDS: Array<{ label: string; value: PositionKeyword }> = [
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

function stopsToCssList(stops: ColorStop[]): string[] {
  return sortStops(stops).map((s) => `${s.hex} ${s.position}%`);
}

/** The gradient function value only, e.g. "linear-gradient(135deg, #fff 0%, #000 100%)" — used for the live preview. */
export function buildGradientValue(state: GradientState): string {
  const stopList = stopsToCssList(state.stops).join(', ');

  if (state.type === 'linear') {
    return `linear-gradient(${state.angle}deg, ${stopList})`;
  }
  if (state.type === 'radial') {
    return `radial-gradient(${state.shape} at ${state.position}, ${stopList})`;
  }
  return `conic-gradient(from ${state.conicAngle}deg at ${state.position}, ${stopList})`;
}

/** Formatted, multi-line `background: ...;` block for the code output panel. */
export function buildGradientCode(state: GradientState): string {
  const stops = sortStops(state.stops);
  const stopLines = stops.map((s, i) => `  ${s.hex} ${s.position}%${i < stops.length - 1 ? ',' : ''}`).join('\n');

  let header: string;
  if (state.type === 'linear') {
    header = `  ${state.angle}deg,`;
  } else if (state.type === 'radial') {
    header = `  ${state.shape} at ${state.position},`;
  } else {
    header = `  from ${state.conicAngle}deg at ${state.position},`;
  }

  const fn = state.type === 'linear' ? 'linear-gradient' : state.type === 'radial' ? 'radial-gradient' : 'conic-gradient';

  return `background: ${fn}(\n${header}\n${stopLines}\n);`;
}

export function reverseStops(stops: ColorStop[]): ColorStop[] {
  const positions = stops.map((s) => s.position).sort((a, b) => a - b);
  const sorted = sortStops(stops);
  const reversedPositions = [...positions].reverse();
  return sorted.map((s, i) => ({ ...s, position: reversedPositions[i] }));
}

export function randomGradientState(base: GradientState): GradientState {
  const count = Math.floor(Math.random() * 3) + 2; // 2-4 stops
  const stops: ColorStop[] = Array.from({ length: count }, (_, i) => ({
    id: generateId(),
    hex: randomHex(),
    position: count === 1 ? 0 : Math.round((i / (count - 1)) * 100),
  }));

  const types: GradientState['type'][] = ['linear', 'radial', 'conic'];
  const type = types[Math.floor(Math.random() * types.length)];

  return {
    ...base,
    type,
    stops,
    angle: Math.floor(Math.random() * 361),
    conicAngle: Math.floor(Math.random() * 361),
    shape: Math.random() > 0.5 ? 'circle' : 'ellipse',
    position: POSITION_KEYWORDS[Math.floor(Math.random() * POSITION_KEYWORDS.length)].value,
  };
}

interface ExportOptions {
  width?: number;
  height?: number;
}

/** Renders the current gradient to an offscreen canvas and resolves a PNG blob. Runs entirely client-side. */
export async function renderGradientPng(state: GradientState, options: ExportOptions = {}): Promise<Blob> {
  const width = options.width ?? 1600;
  const height = options.height ?? 900;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is not supported in this browser.');

  const stops = sortStops(state.stops);

  if (state.type === 'linear') {
    const rad = (state.angle * Math.PI) / 180;
    const dx = Math.sin(rad);
    const dy = -Math.cos(rad);
    const length = Math.abs(width * dx) + Math.abs(height * dy);
    const cx = width / 2;
    const cy = height / 2;
    const gradient = ctx.createLinearGradient(cx - (dx * length) / 2, cy - (dy * length) / 2, cx + (dx * length) / 2, cy + (dy * length) / 2);
    stops.forEach((s) => gradient.addColorStop(s.position / 100, s.hex));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  } else if (state.type === 'radial') {
    const [cx, cy] = positionToPoint(state.position, width, height);
    const rx = Math.max(cx, width - cx) || 1;
    const ry = Math.max(cy, height - cy) || 1;

    ctx.save();
    ctx.translate(cx, cy);
    if (state.shape === 'ellipse') {
      ctx.scale(rx, ry);
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      stops.forEach((s) => gradient.addColorStop(s.position / 100, s.hex));
      ctx.fillStyle = gradient;
      ctx.fillRect(-1, -1, 2, 2);
    } else {
      const radius = Math.max(rx, ry);
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      stops.forEach((s) => gradient.addColorStop(s.position / 100, s.hex));
      ctx.fillStyle = gradient;
      ctx.fillRect(-radius, -radius, radius * 2, radius * 2);
    }
    ctx.restore();
  } else {
    if (typeof ctx.createConicGradient !== 'function') {
      throw new Error('This browser does not support exporting conic gradients as PNG. Try linear or radial, or copy the CSS instead.');
    }
    const [cx, cy] = positionToPoint(state.position, width, height);
    const gradient = ctx.createConicGradient((state.conicAngle * Math.PI) / 180, cx, cy);
    stops.forEach((s) => gradient.addColorStop(s.position / 100, s.hex));
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error('Could not generate a PNG from this gradient.'));
    }, 'image/png');
  });
}

function positionToPoint(position: PositionKeyword, width: number, height: number): [number, number] {
  const x = position.includes('left') ? 0 : position.includes('right') ? width : width / 2;
  const y = position.includes('top') ? 0 : position.includes('bottom') ? height : height / 2;
  return [x, y];
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
