import type { Metadata } from 'next';
import ToolPageChrome from '@/components/tools/ToolPageChrome';
import ContrastChecker from '@/components/tools/ContrastChecker';
import { siteConfig } from '@/config/site';
import { getToolById } from '@/data/tools';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Accessibility Contrast Checker | ${siteConfig.name}`,
  description: 'Check foreground and background color pairs against WCAG AA and AAA contrast requirements, with a live preview.',
  canonical: `${siteConfig.url}/tools/contrast-checker`,
});

const tool = getToolById('contrast-checker')!;

const guideTips = [
  'Large text (18pt+/24px, or 14pt+/19px bold) has a lower contrast requirement than normal body text.',
  'AA is the baseline most sites and legal requirements target; AAA is a stricter, optional standard.',
  'Contrast is calculated using the WCAG 2.x relative luminance formula, the same one browsers and accessibility auditing tools use.',
  'The suggested alternative only adjusts the foreground color; sometimes adjusting the background instead gives a better visual result.',
];

export default function ContrastCheckerPage() {
  return (
    <ToolPageChrome
      tool={tool}
      subtitle="Check foreground and background color pairs against WCAG AA and AAA contrast requirements."
      guideTips={guideTips}
      cta={{
        eyebrow: 'Need an accessibility pass?',
        title: 'Need your website reviewed for accessibility?',
        description: 'I review and fix color contrast, keyboard navigation, and semantic markup issues on WordPress and custom sites.',
      }}
    >
      <ContrastChecker />
    </ToolPageChrome>
  );
}
