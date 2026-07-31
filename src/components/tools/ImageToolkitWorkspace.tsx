'use client';

import { useState } from 'react';
import ImageConvertPanel from '@/components/tools/panels/ImageConvertPanel';
import ImageCompressPanel from '@/components/tools/panels/ImageCompressPanel';
import ImageResizePanel from '@/components/tools/panels/ImageResizePanel';

type Mode = 'convert' | 'compress' | 'resize';

interface TaskCard {
  id: Mode;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const TASKS: TaskCard[] = [
  {
    id: 'convert',
    label: 'Convert',
    description: 'Switch between JPG, PNG, and WebP.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 2l4 4-4 4" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <path d="M7 22l-4-4 4-4" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
  },
  {
    id: 'compress',
    label: 'Compress',
    description: 'Shrink file size, same format.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="8 6 4 12 8 18" />
        <polyline points="16 6 20 12 16 18" />
      </svg>
    ),
  },
  {
    id: 'resize',
    label: 'Resize & Crop',
    description: 'Set dimensions or a social preset, then crop.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 3h6v6" />
        <path d="M9 21H3v-6" />
        <path d="M21 3l-7 7" />
        <path d="M3 21l7-7" />
      </svg>
    ),
  },
];

export default function ImageToolkitWorkspace() {
  const [mode, setMode] = useState<Mode>('convert');

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3" role="group" aria-label="Choose an image task">
        {TASKS.map((task) => {
          const isActive = mode === task.id;
          return (
            <button
              key={task.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setMode(task.id)}
              className="flex items-start gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-200"
              style={
                isActive
                  ? { borderColor: 'var(--tool-accent)', background: 'var(--tool-accent-soft)' }
                  : { borderColor: 'var(--border-color)', background: 'var(--surface-white)' }
              }
            >
              <span
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl"
                style={isActive ? { background: 'var(--tool-accent)', color: '#ffffff' } : { background: 'var(--surface-warm)', color: 'var(--text-secondary)' }}
              >
                {task.icon}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-bold" style={{ color: isActive ? 'var(--tool-accent)' : 'var(--text-primary)' }}>
                  {task.label}
                </span>
                <span className="text-xs leading-snug" style={{ color: 'var(--text-secondary)' }}>
                  {task.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {mode === 'convert' && <ImageConvertPanel />}
      {mode === 'compress' && <ImageCompressPanel />}
      {mode === 'resize' && <ImageResizePanel />}
    </div>
  );
}
