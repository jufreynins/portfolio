import type { Metadata } from 'next';
import ToolWorkspaceShell from '@/components/tools/ToolWorkspaceShell';
import GradientGenerator from '@/components/GradientGenerator';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `CSS Gradient Generator – Create Linear, Radial & Conic Gradients | ${siteConfig.name}`,
  description: 'Create custom CSS gradients with live preview controls. Generate linear, radial, and conic gradients, copy the CSS, and download the result as a PNG.',
  canonical: `${siteConfig.url}/tools/css-gradient-generator`,
});

const TOOL_ACCENT = '#a21caf';
const TOOL_ACCENT_SOFT = '#f7e7f8';

const guideTips = [
  'Click anywhere on the color rail to add a stop at that spot, or drag an existing marker to reposition it — arrow keys nudge the selected stop, Delete removes it.',
  'Linear gradients use an angle; radial gradients use a shape and position; conic gradients rotate around a starting angle and position.',
  'Reverse Colors flips the stop order without changing positions; Random Gradient keeps the current type but shuffles colors and positions.',
  'Download PNG renders the exact gradient you see to an image file, sized for use as a background or banner.',
];

export default function CssGradientGeneratorPage() {
  return (
    <ToolWorkspaceShell
      toolId="css-visual-generator"
      accent={TOOL_ACCENT}
      accentSoft={TOOL_ACCENT_SOFT}
      title="CSS Gradient Generator"
      description="Design linear, radial, and conic gradients with a live preview, then copy the CSS or download it as an image."
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3a9 9 0 0 1 0 18" fill="currentColor" fillOpacity="0.25" stroke="none" />
        </svg>
      }
      guideTitle="How it works"
      guideTips={guideTips}
      ctaEyebrow="Need a custom design system?"
      ctaTitle="Need help building this into a real website?"
      ctaDescription="I can turn gradients, color systems, and UI details like this into a fast, polished WordPress site — built with Elementor, custom CSS, and clean, maintainable code."
      ctaButtonLabel="Discuss Your Website"
    >
      <GradientGenerator />
    </ToolWorkspaceShell>
  );
}
