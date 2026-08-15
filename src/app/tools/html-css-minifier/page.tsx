import type { Metadata } from 'next';
import ToolPageChrome from '@/components/tools/ToolPageChrome';
import MinifierTool from '@/components/tools/MinifierTool';
import { siteConfig } from '@/config/site';
import { getToolById } from '@/data/tools';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `HTML/CSS Minifier | ${siteConfig.name}`,
  description: 'Reduce HTML or CSS file size by safely stripping whitespace and comments, with a before/after size comparison.',
  canonical: `${siteConfig.url}/tools/html-css-minifier`,
});

const tool = getToolById('html-css-minifier')!;

const guideTips = [
  'This is "Basic Minification": safe whitespace and comment removal, not a full parser-based optimizer — it never touches content inside strings, or inside <script>, <style>, <pre>, or <textarea>.',
  'For CSS, spaces are only removed directly around { } and ; — spaces inside selectors and calc() expressions are preserved on purpose.',
  'For maximum compression in production, pair this with build-time tooling (Webpack, Vite, a WordPress minification plugin) rather than relying on manual minification alone.',
  'On mobile, switch between the Input and Output panels using the tabs above the editor.',
];

export default function HtmlCssMinifierPage() {
  return (
    <ToolPageChrome
      tool={tool}
      subtitle="Reduce HTML or CSS file size by safely stripping whitespace and comments, with a before/after size comparison."
      guideTips={guideTips}
      cta={{
        eyebrow: 'Need real performance work?',
        title: 'Need your whole site optimized, not just one file?',
        description: 'I handle performance optimization, caching, and asset delivery as part of WordPress builds and audits.',
      }}
    >
      <MinifierTool />
    </ToolPageChrome>
  );
}
