import type { Metadata } from 'next';
import ToolWorkspaceShell from '@/components/tools/ToolWorkspaceShell';
import JsonFormatter from '@/components/JsonFormatter';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Free JSON Formatter & Validator | ${siteConfig.name}`,
  description: 'Format, minify, and validate JSON directly in your browser. Instant error messages with line and column numbers, adjustable indentation, and one-click copy.',
  canonical: `${siteConfig.url}/tools/json-formatter`,
});

const TOOL_ACCENT = '#15803d';
const TOOL_ACCENT_SOFT = '#e7f8ee';

const guideTips = [
  'Format switches to a readable, indented view; Minify collapses it to a compact single line — useful when you need the smallest possible payload.',
  'Invalid JSON highlights the approximate error line in the input pane and shows the parser’s message with line and column when available — your input is never cleared.',
  '2 spaces, 4 spaces, or tabs — pick whatever matches your project’s formatting convention.',
  'Parsing and formatting run entirely in your browser using the native JSON API — nothing you paste here is uploaded or stored anywhere.',
];

export default function JsonFormatterPage() {
  return (
    <ToolWorkspaceShell
      toolId="developer-data-toolkit"
      accent={TOOL_ACCENT}
      accentSoft={TOOL_ACCENT_SOFT}
      title="JSON Formatter"
      description="Format, validate, and minify JSON in a split code editor with line numbers and syntax highlighting."
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M8 3H6a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2h2" />
          <path d="M16 3h2a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2h-2" />
        </svg>
      }
      guideTitle="How it works"
      guideTips={guideTips}
      ctaEyebrow="Need dynamic content wired up?"
      ctaTitle="Need help with ACF, JetEngine, or a custom data structure?"
      ctaDescription="I can build custom fields, dynamic content, and structured data setups on WordPress that hold up as your site grows."
      ctaButtonLabel="Discuss Your Website"
    >
      <JsonFormatter />
    </ToolWorkspaceShell>
  );
}
