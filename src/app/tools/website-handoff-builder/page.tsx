import type { Metadata } from 'next';
import ToolPageChrome from '@/components/tools/ToolPageChrome';
import HandoffBuilder from '@/components/tools/HandoffBuilder';
import { siteConfig } from '@/config/site';
import { getToolById } from '@/data/tools';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Website Handoff Document Builder | ${siteConfig.name}`,
  description: 'Prepare a structured technical website handoff document covering hosting, DNS, forms, and access — never credentials.',
  canonical: `${siteConfig.url}/tools/website-handoff-builder`,
});

const tool = getToolById('website-handoff-builder')!;

const guideTips = [
  "Uncheck any section that doesn't apply to this project — it will be left out of the exported document entirely.",
  'Reorder sections with the arrows to match how you want the handoff document read.',
  'For every access field, note where credentials are stored (a password manager, a client account) — never the credential itself.',
  'Export as Markdown to paste into Notion, GitHub, or a wiki, or as JSON to feed into another system.',
];

export default function WebsiteHandoffBuilderPage() {
  return (
    <ToolPageChrome
      tool={tool}
      subtitle="Prepare a structured technical handoff document covering hosting, DNS, forms, and access — never credentials."
      guideTips={guideTips}
      cta={{
        eyebrow: 'Need a project handed off properly?',
        title: 'Need help documenting or taking over a website?',
        description: 'I support agency handoffs and take over existing WordPress sites without disruption.',
      }}
    >
      <HandoffBuilder />
    </ToolPageChrome>
  );
}
