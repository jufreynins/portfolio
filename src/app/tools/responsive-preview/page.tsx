import type { Metadata } from 'next';
import ToolPageChrome from '@/components/tools/ToolPageChrome';
import ResponsivePreview from '@/components/tools/ResponsivePreview';
import { siteConfig } from '@/config/site';
import { getToolById } from '@/data/tools';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Responsive Website Preview | ${siteConfig.name}`,
  description: 'Preview a public website at common desktop and mobile viewport sizes before you ship a redesign.',
  canonical: `${siteConfig.url}/tools/responsive-preview`,
});

const tool = getToolById('responsive-preview')!;

const guideTips = [
  'Many websites (including this one) send security headers that block embedding in an iframe — if a preview stays blank, use "Open in New Window" and resize your browser instead.',
  "This tool loads the real live page, so interactions like scrolling and hover states work — it isn't a static screenshot.",
  'Landscape flips the width and height of the selected preset, useful for checking tablets and phones rotated sideways.',
  'Nothing you preview here is stored, proxied, or sent through a server — the browser loads the page directly.',
];

export default function ResponsivePreviewPage() {
  return (
    <ToolPageChrome
      tool={tool}
      subtitle="Preview a public website at common desktop and mobile viewport sizes before you ship a redesign."
      guideTips={guideTips}
      cta={{
        eyebrow: 'Need it fixed across every device?',
        title: 'Need real responsive troubleshooting, not just a preview?',
        description: 'I fix responsive layout issues across real devices and browsers, not just simulated viewports.',
      }}
    >
      <ResponsivePreview />
    </ToolPageChrome>
  );
}
