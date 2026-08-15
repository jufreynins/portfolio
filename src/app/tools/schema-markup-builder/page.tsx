import type { Metadata } from 'next';
import ToolPageChrome from '@/components/tools/ToolPageChrome';
import SchemaMarkupBuilder from '@/components/tools/SchemaMarkupBuilder';
import { siteConfig } from '@/config/site';
import { getToolById } from '@/data/tools';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Schema Markup Builder | ${siteConfig.name}`,
  description: 'Generate valid JSON-LD structured data for organizations, local businesses, services, people, FAQs, and breadcrumbs.',
  canonical: `${siteConfig.url}/tools/schema-markup-builder`,
});

const tool = getToolById('schema-markup-builder')!;

const guideTips = [
  "FAQPage markup can make questions eligible for rich results in Google Search, but eligibility depends on Google's current guidelines.",
  'BreadcrumbList should match the actual navigation path to the page, in order — position numbers are generated automatically.',
  'Only fields you fill in are included in the output; empty fields are left out rather than rendered as blank values.',
  "Validate the output with Google's Rich Results Test before publishing to a live page.",
];

export default function SchemaMarkupBuilderPage() {
  return (
    <ToolPageChrome
      tool={tool}
      subtitle="Generate valid JSON-LD structured data for organizations, local businesses, services, people, FAQs, and breadcrumbs."
      guideTips={guideTips}
      cta={{
        eyebrow: 'Need SEO foundations built in?',
        title: 'Need structured data wired into your WordPress site?',
        description: 'I can implement schema markup, meta tags, and technical SEO foundations directly in WordPress.',
      }}
    >
      <SchemaMarkupBuilder />
    </ToolPageChrome>
  );
}
