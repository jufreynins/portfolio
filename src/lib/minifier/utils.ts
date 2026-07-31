/**
 * Conservative, string/tag-aware whitespace-and-comment stripping — deliberately not a full
 * parser-based minifier. Labeled "Basic Minification" in the UI; never claims production-grade
 * output. Protects string literals (CSS) and script/style/pre/textarea contents (HTML) so it
 * can't corrupt code the way a blind regex over the whole document could.
 */

// A control-character placeholder that contains no whitespace and none of the punctuation the
// passes below look for, so it survives whitespace-collapsing and punctuation-tightening intact
// even when it ends up sitting directly against a brace or semicolon.
const SENTINEL = String.fromCharCode(0);

function sentinelFor(index: number): string {
  return SENTINEL + index + SENTINEL;
}

const SENTINEL_PATTERN = new RegExp(SENTINEL + '(\\d+)' + SENTINEL, 'g');

/**
 * Replaces every match of `pattern` with a sentinel token, returning the transformed text plus a
 * `restore` function that swaps the sentinels back for the original matched text.
 */
function protectRegions(input: string, pattern: RegExp): { text: string; restore: (text: string) => string } {
  const placeholders: string[] = [];
  const text = input.replace(pattern, (match) => {
    placeholders.push(match);
    return sentinelFor(placeholders.length - 1);
  });
  const restore = (minified: string) => minified.replace(SENTINEL_PATTERN, (_, i: string) => placeholders[Number(i)]);
  return { text, restore };
}

export function minifyCss(input: string): string {
  // Protect string literals so whitespace/comment stripping never touches content inside quotes.
  const { text: withoutStrings, restore } = protectRegions(input, /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g);

  const withoutComments = withoutStrings.replace(/\/\*[\s\S]*?\*\//g, '');
  const collapsedWhitespace = withoutComments.replace(/\s+/g, ' ').trim();
  const tightened = collapsedWhitespace.replace(/\s*([{};])\s*/g, '$1').replace(/;}/g, '}');

  return restore(tightened);
}

const HTML_PROTECTED_TAGS = /<(script|style|pre|textarea)\b[^>]*>[\s\S]*?<\/\1>/gi;

export function minifyHtml(input: string): string {
  const { text: withoutProtected, restore } = protectRegions(input, HTML_PROTECTED_TAGS);
  const withoutComments = withoutProtected.replace(/<!--(?!\[if)[\s\S]*?-->/g, '');
  const collapsedWhitespace = withoutComments.replace(/\s+/g, ' ').trim();
  const tightened = collapsedWhitespace.replace(/>\s+</g, '><');

  return restore(tightened);
}

export function byteSize(text: string): number {
  return new TextEncoder().encode(text).length;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(2)} KB`;
}
