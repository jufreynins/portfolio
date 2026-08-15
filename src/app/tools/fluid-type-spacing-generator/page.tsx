import type { Metadata } from 'next';
import ToolPageChrome from '@/components/tools/ToolPageChrome';
import FluidTypeGenerator from '@/components/tools/FluidTypeGenerator';
import { siteConfig } from '@/config/site';
import { getToolById } from '@/data/tools';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Fluid Type & Spacing Generator | ${siteConfig.name}`,
  description: 'Generate responsive CSS clamp() values for typography and spacing between two viewport sizes, with a live preview.',
  canonical: `${siteConfig.url}/tools/fluid-type-spacing-generator`,
});

const tool = getToolById('fluid-type-spacing-generator')!;

const guideTips = [
  'The slider simulates a real browser viewport by computing the value mathematically — the generated clamp() itself uses real vw units once you paste it into your site.',
  'Typography usually looks best scaling by about 1.25–1.5× between minimum and maximum viewport.',
  'Root font size only matters when using rem — it converts your rem values to px to calculate the slope correctly.',
  'A reversed range (max value smaller than min value) is valid — useful for spacing that should shrink on larger screens.',
];

export default function FluidTypeSpacingGeneratorPage() {
  return (
    <ToolPageChrome
      tool={tool}
      subtitle="Generate CSS clamp() values for responsive typography and spacing, with a live preview across viewport sizes."
      guideTips={guideTips}
      cta={{
        eyebrow: 'Need a full responsive system?',
        title: 'Need a consistent type and spacing scale across your site?',
        description: 'I build responsive design systems and implement them directly in WordPress or custom frontend code.',
      }}
    >
      <FluidTypeGenerator />
    </ToolPageChrome>
  );
}
