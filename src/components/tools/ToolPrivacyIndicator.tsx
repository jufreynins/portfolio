'use client';

import { useState } from 'react';

export default function ToolPrivacyIndicator() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border px-3 py-1.5 text-xs font-semibold transition-colors"
        style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)', background: 'var(--surface-white)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--tool-accent)' }} aria-hidden="true">
          <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4Z" />
        </svg>
        Runs locally in your browser &middot; No uploads &middot; Free
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          className="absolute left-0 top-full z-10 mt-2 w-72 rounded-[var(--radius-md)] border p-4 text-xs leading-relaxed shadow-lg"
          style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)', color: 'var(--text-secondary)', boxShadow: 'var(--shadow-md)' }}
        >
          Everything here runs client-side using your browser&apos;s own APIs (Canvas, JSZip, etc.). Your files and data are never uploaded to a server or stored in a database. Closing or refreshing this page clears everything.
        </div>
      )}
    </div>
  );
}
