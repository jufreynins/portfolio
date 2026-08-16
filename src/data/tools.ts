export type ToolCategory = 'Website & Infrastructure' | 'SEO & Marketing' | 'Frontend & Accessibility' | 'Agency Workflow' | 'Developer Utilities' | 'Image & Media';

export type ToolStatus = 'Available' | 'Beta' | 'In Development' | 'Planned';

/** Drives which of the three card layouts a tool renders with on the directory page. */
export type ToolCardVariant = 'diagnostic' | 'builder' | 'utility';

export const CATEGORIES: ToolCategory[] = ['Website & Infrastructure', 'SEO & Marketing', 'Frontend & Accessibility', 'Agency Workflow', 'Developer Utilities', 'Image & Media'];

export const STATUSES: ToolStatus[] = ['Available', 'Beta', 'In Development', 'Planned'];

export interface Tool {
  id: string;
  title: string;
  category: ToolCategory;
  purpose: string;
  href: string;
  status: ToolStatus;
  cardVariant: ToolCardVariant;
  /** Short, accurate processing/privacy label shown on the card and tool page. */
  processing: string;
  accent: string;
  accentSoft: string;
  featured?: boolean;
}

export const TOOLS: Tool[] = [
  // --- Website & Infrastructure ---
  {
    id: 'dns-email-record-checker',
    title: 'DNS & Email Record Checker',
    category: 'Website & Infrastructure',
    purpose: 'Inspect public DNS, mail-routing, and email-authentication records in one organized report.',
    href: '/tools/dns-email-record-checker',
    status: 'Available',
    cardVariant: 'diagnostic',
    processing: 'Uses public DNS data',
    accent: '#0f766e',
    accentSoft: '#e3f3f1',
    featured: true,
  },
  {
    id: 'website-launch-checklist',
    title: 'Website Launch Checklist',
    category: 'Website & Infrastructure',
    purpose: 'Build a project-specific checklist for website launches, migrations, redesigns, and staging-to-production releases.',
    href: '/tools/website-launch-checklist',
    status: 'Available',
    cardVariant: 'builder',
    processing: 'Runs locally in your browser · saved on this device',
    accent: '#1d4ed8',
    accentSoft: '#e7ecf8',
  },
  {
    id: 'redirect-generator',
    title: '301 Redirect Generator',
    category: 'Website & Infrastructure',
    purpose: 'Create and validate redirect mappings for migrations, URL changes, and website redesigns.',
    href: '/tools/redirect-generator',
    status: 'Available',
    cardVariant: 'builder',
    processing: 'Runs locally in your browser',
    accent: '#334155',
    accentSoft: '#eaedf1',
  },
  {
    id: 'responsive-preview',
    title: 'Responsive Website Preview',
    category: 'Website & Infrastructure',
    purpose: 'Preview a public website at common desktop and mobile viewport sizes before you ship a redesign.',
    href: '/tools/responsive-preview',
    status: 'Available',
    cardVariant: 'diagnostic',
    processing: 'Requires a public website URL',
    accent: '#0369a1',
    accentSoft: '#e4f0f8',
  },

  // --- SEO & Marketing ---
  {
    id: 'schema-markup-builder',
    title: 'Schema Markup Builder',
    category: 'SEO & Marketing',
    purpose: 'Generate valid JSON-LD structured data for organizations, services, people, FAQs, and breadcrumbs.',
    href: '/tools/schema-markup-builder',
    status: 'Available',
    cardVariant: 'builder',
    processing: 'Runs locally in your browser',
    accent: '#7c3aed',
    accentSoft: '#efe7fb',
    featured: true,
  },
  {
    id: 'utm-builder',
    title: 'UTM Campaign Builder',
    category: 'SEO & Marketing',
    purpose: 'Build and validate campaign tracking URLs with source, medium, and campaign parameters.',
    href: '/tools/utm-builder',
    status: 'Available',
    cardVariant: 'builder',
    processing: 'Runs locally in your browser',
    accent: '#c2410c',
    accentSoft: '#faeade',
  },
  {
    id: 'seo-social-preview',
    title: 'SEO Meta Preview',
    category: 'SEO & Marketing',
    purpose: 'Preview how a title and description will appear in Google and social shares.',
    href: '/tools/seo-meta-preview',
    status: 'Available',
    cardVariant: 'diagnostic',
    processing: 'Runs locally in your browser',
    accent: '#4338ca',
    accentSoft: '#e9e7f8',
  },

  // --- Frontend & Accessibility ---
  {
    id: 'fluid-type-spacing-generator',
    title: 'Fluid Type & Spacing Generator',
    category: 'Frontend & Accessibility',
    purpose: 'Generate responsive CSS clamp() values for typography and spacing between two viewport sizes.',
    href: '/tools/fluid-type-spacing-generator',
    status: 'Available',
    cardVariant: 'builder',
    processing: 'Runs locally in your browser',
    accent: '#0891b2',
    accentSoft: '#e2f3f6',
  },
  {
    id: 'contrast-checker',
    title: 'Accessibility Contrast Checker',
    category: 'Frontend & Accessibility',
    purpose: 'Check foreground and background color pairs against WCAG AA and AAA contrast requirements.',
    href: '/tools/contrast-checker',
    status: 'Available',
    cardVariant: 'diagnostic',
    processing: 'Runs locally in your browser',
    accent: '#166534',
    accentSoft: '#e5f3e9',
  },
  {
    id: 'css-visual-generator',
    title: 'CSS Gradient Generator',
    category: 'Frontend & Accessibility',
    purpose: 'Design linear, radial, and conic gradients with a live preview, then copy the CSS.',
    href: '/tools/css-gradient-generator',
    status: 'Available',
    cardVariant: 'builder',
    processing: 'Runs locally in your browser',
    accent: '#a21caf',
    accentSoft: '#f7e7f8',
  },

  // --- Agency Workflow ---
  {
    id: 'website-handoff-builder',
    title: 'Website Handoff Document Builder',
    category: 'Agency Workflow',
    purpose: 'Prepare a structured technical handoff document covering hosting, DNS, forms, and access — never credentials.',
    href: '/tools/website-handoff-builder',
    status: 'Available',
    cardVariant: 'builder',
    processing: 'Runs locally in your browser · no credentials stored',
    accent: '#9d174d',
    accentSoft: '#fae7ef',
  },

  // --- Developer Utilities ---
  {
    id: 'url-parser',
    title: 'URL Parser',
    category: 'Developer Utilities',
    purpose: 'Break a URL into its parts and edit query parameters, then rebuild a clean, encoded URL.',
    href: '/tools/url-parser',
    status: 'Available',
    cardVariant: 'utility',
    processing: 'Runs locally in your browser',
    accent: '#475569',
    accentSoft: '#ebeef2',
  },
  {
    id: 'html-css-minifier',
    title: 'HTML/CSS Minifier',
    category: 'Developer Utilities',
    purpose: 'Reduce HTML or CSS file size by safely stripping whitespace and comments, with a before/after size comparison.',
    href: '/tools/html-css-minifier',
    status: 'Available',
    cardVariant: 'utility',
    processing: 'Runs locally in your browser',
    accent: '#b45309',
    accentSoft: '#faf0e1',
  },
  {
    id: 'developer-data-toolkit',
    title: 'JSON Formatter',
    category: 'Developer Utilities',
    purpose: 'Format, validate, and minify JSON with instant line/column error reporting.',
    href: '/tools/json-formatter',
    status: 'Available',
    cardVariant: 'utility',
    processing: 'Runs locally in your browser',
    accent: '#15803d',
    accentSoft: '#e7f8ee',
  },

  // --- Image & Media ---
  {
    id: 'qr-code-generator',
    title: 'QR Code Generator',
    category: 'Image & Media',
    purpose: 'Create a QR code for a URL, text, email, phone number, or Wi-Fi network, styled and ready to download.',
    href: '/tools/qr-code-generator',
    status: 'Available',
    cardVariant: 'builder',
    processing: 'Runs locally in your browser',
    accent: '#1e293b',
    accentSoft: '#e9ecf0',
  },
  {
    id: 'image-toolkit',
    title: 'Image Toolkit',
    category: 'Image & Media',
    purpose: 'Convert, compress, resize, crop, and prep images for social — all in one workspace.',
    href: '/tools/image-toolkit',
    status: 'Available',
    cardVariant: 'utility',
    processing: 'Runs locally in your browser',
    accent: '#1d4ed8',
    accentSoft: '#e7ecf8',
    featured: true,
  },
  {
    id: 'brand-asset-generator',
    title: 'Favicon Generator',
    category: 'Image & Media',
    purpose: 'Generate a full favicon set — favicon.ico plus Apple touch and Android/PWA icons.',
    href: '/tools/favicon-generator',
    status: 'Available',
    cardVariant: 'builder',
    processing: 'Runs locally in your browser',
    accent: '#be123c',
    accentSoft: '#f8e7eb',
  },
];

export function getToolById(id: string): Tool | undefined {
  return TOOLS.find((tool) => tool.id === id);
}

export function getToolByHrefPrefix(pathname: string): Tool | undefined {
  return TOOLS.find((tool) => pathname === tool.href || pathname.startsWith(`${tool.href}/`));
}

export function getToolsByCategory(category: ToolCategory): Tool[] {
  return TOOLS.filter((tool) => tool.category === category);
}
