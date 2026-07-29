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
