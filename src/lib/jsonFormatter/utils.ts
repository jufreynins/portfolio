export interface JsonValidationResult {
  valid: boolean;
  error?: string;
  line?: number;
  column?: number;
}

function positionToLineColumn(text: string, position: number): { line: number; column: number } {
  const upToPos = text.slice(0, Math.max(0, position));
  const lines = upToPos.split('\n');
  return { line: lines.length, column: lines[lines.length - 1].length + 1 };
}

export function validateJson(input: string): JsonValidationResult {
  if (!input.trim()) return { valid: false, error: 'Enter some JSON to validate.' };

  try {
    JSON.parse(input);
    return { valid: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid JSON.';

    const posMatch = message.match(/position (\d+)/i);
    if (posMatch) {
      const { line, column } = positionToLineColumn(input, Number(posMatch[1]));
      return { valid: false, error: message, line, column };
    }

    const lineColMatch = message.match(/line (\d+) column (\d+)/i);
    if (lineColMatch) {
      return { valid: false, error: message, line: Number(lineColMatch[1]), column: Number(lineColMatch[2]) };
    }

    return { valid: false, error: message };
  }
}

export type IndentOption = 2 | 4 | 'tab';

export function formatJson(input: string, indent: IndentOption): string {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed, null, indent === 'tab' ? '\t' : indent);
}

export function minifyJson(input: string): string {
  const parsed = JSON.parse(input);
  return JSON.stringify(parsed);
}

export function byteSize(text: string): number {
  return new TextEncoder().encode(text).length;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(kb < 10 ? 2 : 1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
}

export type JsonTokenType = 'plain' | 'key' | 'string' | 'number' | 'boolean' | 'null';

export interface JsonToken {
  text: string;
  type: JsonTokenType;
}

const TOKEN_PATTERN = /("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*")(\s*:)?|\b(?:true|false)\b|\bnull\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;

/** Splits JSON-like text (valid or partial) into colorable tokens — works while the user is still typing invalid JSON. */
export function tokenizeJson(text: string): JsonToken[] {
  const tokens: JsonToken[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  TOKEN_PATTERN.lastIndex = 0;
  while ((match = TOKEN_PATTERN.exec(text))) {
    if (match.index > lastIndex) {
      tokens.push({ text: text.slice(lastIndex, match.index), type: 'plain' });
    }

    const [full, stringPart, colonPart] = match;
    if (stringPart) {
      tokens.push({ text: stringPart, type: colonPart ? 'key' : 'string' });
      if (colonPart) tokens.push({ text: colonPart, type: 'plain' });
    } else if (full === 'true' || full === 'false') {
      tokens.push({ text: full, type: 'boolean' });
    } else if (full === 'null') {
      tokens.push({ text: full, type: 'null' });
    } else {
      tokens.push({ text: full, type: 'number' });
    }

    lastIndex = match.index + full.length;
  }

  if (lastIndex < text.length) {
    tokens.push({ text: text.slice(lastIndex), type: 'plain' });
  }

  return tokens;
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

export const EXAMPLE_JSON = `{
  "name": "Jufrey Niño Bayog",
  "title": "WordPress Developer & Frontend Specialist",
  "yearsExperience": 7,
  "skills": ["WordPress", "Elementor Pro", "ACF", "JetEngine"],
  "availableForWork": true,
  "contact": {
    "email": "jufreyninobayog@gmail.com",
    "location": "Remote"
  }
}`;
