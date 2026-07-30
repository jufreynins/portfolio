import type { Metadata } from 'next';
import ToolWorkspaceShell from '@/components/tools/ToolWorkspaceShell';
import ImageToolkitWorkspace from '@/components/tools/ImageToolkitWorkspace';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Free Image Toolkit — Convert, Compress & Resize | ${siteConfig.name}`,
  description: 'Convert between JPG, PNG, and WebP, compress file size, and resize or crop images by custom dimensions, percentage, or social media preset — all in one browser-based workspace. No uploads.',
  canonical: `${siteConfig.url}/tools/image-toolkit`,
});

const TOOL_ACCENT = '#1d4ed8';
const TOOL_ACCENT_SOFT = '#e7ecf8';

const guideTips = [
  'Convert either direction between JPG, PNG, and WebP — including WebP back to JPG or PNG for broader compatibility.',
  'Compress keeps your original format; Convert changes it. Reach for Compress when you just need a smaller file, Convert when you need a different one.',
  'Resize by exact pixel dimensions, a percentage scale, or a social media preset, then drag the crop box (or its corner handles) to control what stays in frame.',
  'PNG is lossless, so quality sliders have little effect on it — convert to WebP first if you need a meaningfully smaller PNG.',
  'Add up to 10 images at once in any mode and download everything together as a ZIP.',
  'Everything runs locally in your browser using the Canvas API. Your files are never uploaded or stored.',
];

export default function ImageToolkitPage() {
  return (
    <ToolWorkspaceShell
      toolId="image-toolkit"
      accent={TOOL_ACCENT}
      accentSoft={TOOL_ACCENT_SOFT}
      title="Image Toolkit"
      description="Convert, compress, resize, and crop images — all in one browser-based workspace. No uploads, no storage, no account."
      icon={
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="13" height="13" rx="2" />
          <path d="M9 21h9a2 2 0 0 0 2-2V9" />
        </svg>
      }
      guideTitle="How it works"
      guideTips={guideTips}
      ctaEyebrow="Need more speed?"
      ctaTitle="Need help improving your website speed?"
      ctaDescription="I can optimize images, improve Core Web Vitals, clean up WordPress performance issues, and make your website faster across desktop and mobile."
      ctaButtonLabel="Request a Website Performance Review"
    >
      <ImageToolkitWorkspace />
    </ToolWorkspaceShell>
  );
}
