export type ToolCategory = 'Images' | 'Branding' | 'SEO' | 'Design' | 'Developer' | 'Marketing';

export type ToolPreviewKind = 'image' | 'brand' | 'seo' | 'css' | 'json' | 'utm';

export interface Tool {
  id: string;
  title: string;
  category: ToolCategory;
  purpose: string;
  href: string;
  preview: ToolPreviewKind;
  accent: string;
  accentSoft: string;
  featured?: boolean;
  planned?: boolean;
}

export const CATEGORIES: Array<'All' | ToolCategory> = ['All', 'Images', 'Branding', 'SEO', 'Design', 'Developer', 'Marketing'];

export const TOOLS: Tool[] = [
  {
    id: 'image-toolkit',
    title: 'Image Toolkit',
    category: 'Images',
    purpose: 'Convert, compress, resize, crop, and prep images for social — all in one workspace.',
    href: '/tools/image-toolkit',
    preview: 'image',
    accent: '#1d4ed8',
    accentSoft: '#e7ecf8',
    featured: true,
  },
  {
    id: 'brand-asset-generator',
    title: 'Favicon Generator',
    category: 'Branding',
    purpose: 'Generate a full favicon set — favicon.ico plus Apple touch and Android/PWA icons.',
    href: '/tools/favicon-generator',
    preview: 'brand',
    accent: '#be123c',
    accentSoft: '#f8e7eb',
  },
  {
    id: 'seo-social-preview',
    title: 'SEO Meta Preview',
    category: 'SEO',
    purpose: 'Preview how a title and description will appear in Google and social shares.',
    href: '/tools/seo-meta-preview',
    preview: 'seo',
    accent: '#4338ca',
    accentSoft: '#e9e7f8',
  },
  {
    id: 'css-visual-generator',
    title: 'CSS Gradient Generator',
    category: 'Design',
    purpose: 'Design linear, radial, and conic gradients with a live preview, then copy the CSS.',
    href: '/tools/css-gradient-generator',
    preview: 'css',
    accent: '#a21caf',
    accentSoft: '#f7e7f8',
  },
  {
    id: 'developer-data-toolkit',
    title: 'JSON Formatter',
    category: 'Developer',
    purpose: 'Format, validate, and minify JSON with instant line/column error reporting.',
    href: '/tools/json-formatter',
    preview: 'json',
    accent: '#15803d',
    accentSoft: '#e7f8ee',
  },
];

export function getToolByHrefPrefix(pathname: string): Tool | undefined {
  return TOOLS.find((tool) => pathname === tool.href || pathname.startsWith(`${tool.href}/`));
}
