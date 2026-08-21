import type { Metadata } from 'next';
import ToolPageChrome from '@/components/tools/ToolPageChrome';
import UrlParserTool from '@/components/tools/UrlParserTool';
import { siteConfig } from '@/config/site';
import { getToolById } from '@/data/tools';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `URL Parser | ${siteConfig.name}`,
  description: 'Break a URL into its parts and edit query parameters, then rebuild a clean, encoded URL.',
  canonical: `${siteConfig.url}/tools/url-parser`,
});

const tool = getToolById('url-parser')!;

const guideTips = [
  'A password shown as "present" is never displayed. This tool only flags that one exists in the URL, which is itself worth knowing since credentials in URLs are a common leak.',
  'Duplicate parameter keys (like two "color" params) are both preserved when parsing and rebuilding.',
  '"Decode All" and "Encode All" apply to parameter values only, not keys.',
  "Registrable-domain analysis (e.g. distinguishing \"example.co.uk\" from a subdomain) isn't included; it needs a public suffix list this tool doesn't bundle.",
];

export default function UrlParserPage() {
  return (
    <ToolPageChrome
      tool={tool}
      subtitle="Break a URL into its parts and edit query parameters, then rebuild a clean, encoded URL."
      guideTips={guideTips}
      cta={{
        eyebrow: 'Debugging something bigger?',
        title: 'Need help with a custom integration or API connection?',
        description: 'I build and debug custom functionality, integrations, and API connections on WordPress and custom sites.',
      }}
    >
      <UrlParserTool />
    </ToolPageChrome>
  );
}
