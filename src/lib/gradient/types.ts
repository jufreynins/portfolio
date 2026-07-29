export type GradientType = 'linear' | 'radial' | 'conic';
export type RadialShape = 'circle' | 'ellipse';

export type PositionKeyword = 'top left' | 'top' | 'top right' | 'left' | 'center' | 'right' | 'bottom left' | 'bottom' | 'bottom right';

export interface ColorStop {
  id: string;
  hex: string;
  position: number;
}

export interface GradientState {
  type: GradientType;
  stops: ColorStop[];
  angle: number;
  shape: RadialShape;
  position: PositionKeyword;
  conicAngle: number;
}

export interface GradientPreset {
  name: string;
  state: {
    type: GradientType;
    angle: number;
    shape: RadialShape;
    position: PositionKeyword;
    conicAngle: number;
    stops: Array<{ hex: string; position: number }>;
  };
}

export const MIN_STOPS = 2;
export const MAX_STOPS = 6;
