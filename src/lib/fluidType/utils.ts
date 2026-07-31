export type FluidUnit = 'px' | 'rem';

export interface FluidInput {
  minValue: number;
  maxValue: number;
  minViewport: number;
  maxViewport: number;
  unit: FluidUnit;
  rootFontSize: number;
}

export interface FluidResult {
  clamp: string;
  minPx: number;
  maxPx: number;
  slopeVw: number;
  intersection: number;
}

export function validateFluidInput(input: FluidInput): string | null {
  if (input.minViewport <= 0 || input.maxViewport <= 0) return 'Viewport widths must be greater than zero.';
  if (input.maxViewport <= input.minViewport) return 'Maximum viewport must be greater than minimum viewport.';
  if (input.rootFontSize <= 0) return 'Root font size must be greater than zero.';
  return null;
}

export function buildClamp(input: FluidInput): FluidResult {
  const toPx = (v: number) => (input.unit === 'rem' ? v * input.rootFontSize : v);
  const minPx = toPx(input.minValue);
  const maxPx = toPx(input.maxValue);

  const slope = (maxPx - minPx) / (input.maxViewport - input.minViewport);
  const slopeVw = slope * 100;
  const intersectionPx = minPx - input.minViewport * slope;
  const intersection = input.unit === 'rem' ? intersectionPx / input.rootFontSize : intersectionPx;

  const fmt = (n: number) => Number(n.toFixed(4)).toString();
  const lower = Math.min(input.minValue, input.maxValue);
  const upper = Math.max(input.minValue, input.maxValue);

  const clamp = `clamp(${fmt(lower)}${input.unit}, ${fmt(intersection)}${input.unit} + ${fmt(slopeVw)}vw, ${fmt(upper)}${input.unit})`;

  return { clamp, minPx, maxPx, slopeVw, intersection };
}

/** Numerically computes the value at a given real viewport width — used for the live preview, since CSS vw can't respond to a resizable demo box. */
export function valueAtViewport(input: FluidInput, viewportPx: number): number {
  const toPx = (v: number) => (input.unit === 'rem' ? v * input.rootFontSize : v);
  const minPx = toPx(Math.min(input.minValue, input.maxValue));
  const maxPx = toPx(Math.max(input.minValue, input.maxValue));
  const growing = input.maxValue >= input.minValue;

  if (viewportPx <= input.minViewport) return growing ? minPx : maxPx;
  if (viewportPx >= input.maxViewport) return growing ? maxPx : minPx;

  const t = (viewportPx - input.minViewport) / (input.maxViewport - input.minViewport);
  const px = growing ? minPx + t * (maxPx - minPx) : maxPx - t * (maxPx - minPx);
  return input.unit === 'rem' ? px / input.rootFontSize : px;
}

export const PRESETS: { label: string; mode: 'type' | 'spacing'; input: FluidInput }[] = [
  { label: 'Body text', mode: 'type', input: { minValue: 1, maxValue: 1.125, minViewport: 360, maxViewport: 1280, unit: 'rem', rootFontSize: 16 } },
  { label: 'H1 heading', mode: 'type', input: { minValue: 2, maxValue: 3.5, minViewport: 360, maxViewport: 1280, unit: 'rem', rootFontSize: 16 } },
  { label: 'Section spacing', mode: 'spacing', input: { minValue: 40, maxValue: 96, minViewport: 360, maxViewport: 1280, unit: 'px', rootFontSize: 16 } },
  { label: 'Card padding', mode: 'spacing', input: { minValue: 16, maxValue: 32, minViewport: 360, maxViewport: 1280, unit: 'px', rootFontSize: 16 } },
];
