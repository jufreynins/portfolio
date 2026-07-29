import type { GradientPreset } from './types';

export const GRADIENT_PRESETS: GradientPreset[] = [
  {
    name: 'Signal Violet',
    state: {
      type: 'linear',
      angle: 135,
      shape: 'circle',
      position: 'center',
      conicAngle: 0,
      stops: [
        { hex: '#673de6', position: 0 },
        { hex: '#9f7aea', position: 50 },
        { hex: '#22d3ee', position: 100 },
      ],
    },
  },
  {
    name: 'Nightshift',
    state: {
      type: 'linear',
      angle: 160,
      shape: 'circle',
      position: 'center',
      conicAngle: 0,
      stops: [
        { hex: '#0f172a', position: 0 },
        { hex: '#1e293b', position: 50 },
        { hex: '#334155', position: 100 },
      ],
    },
  },
  {
    name: 'Ember Glow',
    state: {
      type: 'linear',
      angle: 120,
      shape: 'circle',
      position: 'center',
      conicAngle: 0,
      stops: [
        { hex: '#f97316', position: 0 },
        { hex: '#f43f5e', position: 100 },
      ],
    },
  },
  {
    name: 'Aurora Mint',
    state: {
      type: 'linear',
      angle: 110,
      shape: 'circle',
      position: 'center',
      conicAngle: 0,
      stops: [
        { hex: '#10b981', position: 0 },
        { hex: '#06b6d4', position: 50 },
        { hex: '#3b82f6', position: 100 },
      ],
    },
  },
  {
    name: 'Sunset Boulevard',
    state: {
      type: 'linear',
      angle: 135,
      shape: 'circle',
      position: 'center',
      conicAngle: 0,
      stops: [
        { hex: '#f59e0b', position: 0 },
        { hex: '#ec4899', position: 50 },
        { hex: '#8b5cf6', position: 100 },
      ],
    },
  },
  {
    name: 'Deep Ocean',
    state: {
      type: 'radial',
      angle: 135,
      shape: 'circle',
      position: 'center',
      conicAngle: 0,
      stops: [
        { hex: '#0ea5e9', position: 0 },
        { hex: '#082f49', position: 100 },
      ],
    },
  },
  {
    name: 'Solar Flare',
    state: {
      type: 'conic',
      angle: 135,
      shape: 'circle',
      position: 'center',
      conicAngle: 0,
      stops: [
        { hex: '#fde047', position: 0 },
        { hex: '#f97316', position: 50 },
        { hex: '#dc2626', position: 100 },
      ],
    },
  },
  {
    name: 'Frosted Glass',
    state: {
      type: 'linear',
      angle: 100,
      shape: 'circle',
      position: 'center',
      conicAngle: 0,
      stops: [
        { hex: '#e0e7ff', position: 0 },
        { hex: '#c7d2fe', position: 50 },
        { hex: '#a5b4fc', position: 100 },
      ],
    },
  },
];
