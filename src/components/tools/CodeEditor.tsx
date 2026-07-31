'use client';

import { useMemo, useRef } from 'react';
import { tokenizeJson, type JsonTokenType } from '@/lib/jsonFormatter/utils';

const FONT_SIZE = 13;
const LINE_HEIGHT = 20;

const TOKEN_COLORS: Record<JsonTokenType, string> = {
  plain: '#e5e7eb',
  key: '#7dd3fc',
  string: '#86efac',
  number: '#fbbf24',
  boolean: '#c4b5fd',
  null: '#c4b5fd',
};

const surfaceStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: FONT_SIZE,
  lineHeight: `${LINE_HEIGHT}px`,
  whiteSpace: 'pre' as const,
  tabSize: 2,
};

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  errorLine?: number | null;
  placeholder?: string;
  ariaLabel: string;
  minHeightPx?: number;
}

export default function CodeEditor({ value, onChange, readOnly = false, errorLine, placeholder, ariaLabel, minHeightPx = 360 }: CodeEditorProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const tokens = useMemo(() => tokenizeJson(value), [value]);
  const lineCount = Math.max(1, value.split('\n').length);

  function syncScroll() {
    const textarea = textareaRef.current;
    if (!textarea) return;
    if (preRef.current) {
      preRef.current.scrollTop = textarea.scrollTop;
      preRef.current.scrollLeft = textarea.scrollLeft;
    }
    if (gutterRef.current) {
      gutterRef.current.scrollTop = textarea.scrollTop;
    }
  }

  const showPlaceholder = !value && placeholder;

  return (
    <div className="flex overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--border-color)', background: 'var(--brand-ink)', height: minHeightPx }}>
      {/* Line-number gutter */}
      <div
        ref={gutterRef}
        aria-hidden="true"
        className="select-none overflow-hidden py-4 pl-3 pr-2 text-right"
        style={{ ...surfaceStyle, color: '#6b7280', background: 'color-mix(in srgb, black 20%, var(--brand-ink))', minWidth: `${String(lineCount).length + 2}ch` }}
      >
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i} style={{ height: LINE_HEIGHT }}>
            {i + 1}
          </div>
        ))}
      </div>

      {/* Code surface */}
      <div className="relative flex-1">
        <pre ref={preRef} className="relative m-0 h-full overflow-auto p-4" style={surfaceStyle} aria-hidden="true">
          {errorLine != null && errorLine > 0 && (
            <div
              className="pointer-events-none absolute left-0 right-0"
              style={{ top: (errorLine - 1) * LINE_HEIGHT, height: LINE_HEIGHT, background: 'color-mix(in srgb, var(--color-error) 22%, transparent)' }}
            />
          )}
          <code>
            {showPlaceholder ? (
              <span style={{ color: '#6b7280' }}>{placeholder}</span>
            ) : (
              tokens.map((token, i) => (
                <span key={i} style={{ color: TOKEN_COLORS[token.type] }}>
                  {token.text}
                </span>
              ))
            )}
          </code>
        </pre>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onScroll={syncScroll}
          readOnly={readOnly}
          spellCheck={false}
          aria-label={ariaLabel}
          className="absolute inset-0 h-full w-full resize-none overflow-auto bg-transparent p-4 text-transparent caret-white outline-none"
          style={surfaceStyle}
        />
      </div>
    </div>
  );
}
