'use client';

import { useState } from 'react';
import ImageConvertPanel from '@/components/tools/panels/ImageConvertPanel';
import ImageCompressPanel from '@/components/tools/panels/ImageCompressPanel';
import ImageResizePanel from '@/components/tools/panels/ImageResizePanel';

type Mode = 'convert' | 'compress' | 'resize';

const MODES: Array<{ id: Mode; label: string }> = [
  { id: 'convert', label: 'Convert' },
  { id: 'compress', label: 'Compress' },
  { id: 'resize', label: 'Resize & Crop' },
];

export default function ImageToolkitWorkspace() {
  const [mode, setMode] = useState<Mode>('convert');

  return (
    <div className="flex flex-col gap-8">
      <div className="inline-flex w-fit flex-wrap gap-1 rounded-full border p-1" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }} role="tablist" aria-label="Image tool mode">
        {MODES.map((m) => {
          const isActive = mode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setMode(m.id)}
              className="min-h-[40px] rounded-full px-5 text-sm font-bold transition-all duration-200"
              style={isActive ? { background: 'var(--tool-accent)', color: '#ffffff' } : { color: 'var(--text-secondary)' }}
            >
              {m.label}
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
