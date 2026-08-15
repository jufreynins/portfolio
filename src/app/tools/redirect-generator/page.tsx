import type { Metadata } from 'next';
import ToolPageChrome from '@/components/tools/ToolPageChrome';
import RedirectGenerator from '@/components/tools/RedirectGenerator';
import { siteConfig } from '@/config/site';
import { getToolById } from '@/data/tools';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `301 Redirect Generator | ${siteConfig.name}`,
  description: 'Create and validate redirect mappings for migrations, URL changes, and website redesigns — export as .htaccess, Nginx, Netlify, or CSV.',
  canonical: `${siteConfig.url}/tools/redirect-generator`,
});

const tool = getToolById('redirect-generator')!;

const guideTips = [
  'Use 301 for permanent moves (most redesigns and migrations) and 302 only for temporary changes — search engines treat them differently.',
  'A "chain" warning means the destination is itself redirected elsewhere — point the source directly at the final destination instead.',
  'Bulk paste accepts "source -> destination", "source, destination", or lines separated by whitespace.',
  'Always test generated rules on a staging copy of the server before deploying to production.',
];

export default function RedirectGeneratorPage() {
  return (
    <ToolPageChrome
      tool={tool}
      subtitle="Create and validate redirect mappings for migrations, URL changes, and website redesigns."
      guideTips={guideTips}
      cta={{
        eyebrow: 'Migrating a whole site?',
        title: 'Need help with a full migration or redesign?',
        description: 'I handle redirect mapping, DNS cutover, and SEO preservation as part of website migrations.',
      }}
    >
      <RedirectGenerator />
    </ToolPageChrome>
  );
}
