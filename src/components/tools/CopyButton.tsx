'use client';

import { useRef, useState } from 'react';

interface CopyButtonProps {
  getText: () => string;
  label?: string;
  copiedLabel?: string;
  variant?: 'primary' | 'secondary';
  className?: string;
  disabled?: boolean;
}

async function copyToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
}

export default function CopyButton({ getText, label = 'Copy', copiedLabel = 'Copied!', variant = 'secondary', className = '', disabled = false }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const base = 'inline-flex min-h-[40px] items-center justify-center gap-1.5 rounded-full px-4 text-xs font-bold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50';
  const style =
    variant === 'primary'
      ? { background: copied ? 'var(--color-success)' : 'var(--tool-accent)', color: '#fff' }
      : { border: `1.5px solid ${copied ? 'var(--color-success)' : 'var(--border-strong)'}`, color: copied ? 'var(--color-success)' : 'var(--text-primary)', background: 'var(--surface-white)' };

  async function handleClick() {
    const text = getText();
    if (!text) return;
    try {
      await copyToClipboard(text);
      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access denied or unavailable — the button simply won't confirm; no crash.
    }
  }

  return (
    <button type="button" onClick={handleClick} disabled={disabled} className={`${base} ${className}`} style={style} aria-live="polite">
      {copied ? copiedLabel : label}
    </button>
  );
}
