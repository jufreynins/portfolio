import type { Metadata } from 'next';
import ToolPageChrome from '@/components/tools/ToolPageChrome';
import UtmBuilder from '@/components/tools/UtmBuilder';
import { siteConfig } from '@/config/site';
import { getToolById } from '@/data/tools';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `UTM Campaign Builder | ${siteConfig.name}`,
  description: 'Build and validate campaign tracking URLs with source, medium, and campaign parameters, preserving any existing query string.',
  canonical: `${siteConfig.url}/tools/utm-builder`,
});

const tool = getToolById('utm-builder')!;

const guideTips = [
  'Existing query parameters on your destination URL are preserved — UTM parameters are added alongside them, not instead of them.',
  'Keep source/medium/campaign values lowercase and consistent (e.g. always "email" not sometimes "Email") so analytics reports group them correctly.',
  '"Save to History" keeps a local list in this browser only — nothing is sent anywhere.',
  'Use utm_content to A/B test different links or placements within the same campaign.',
];

export default function UtmBuilderPage() {
  return (
    <ToolPageChrome
      tool={tool}
      subtitle="Build and validate campaign tracking URLs with source, medium, and campaign parameters."
      guideTips={guideTips}
      cta={{
        eyebrow: 'Need campaign tracking set up?',
        title: 'Need analytics and conversion tracking configured?',
        description: 'I set up analytics, goal tracking, and campaign attribution as part of website builds.',
      }}
    >
      <UtmBuilder />
    </ToolPageChrome>
  );
}
