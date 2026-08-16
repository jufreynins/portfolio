export interface TechSummaryGroup {
  label: string;
  items: string[];
}

/** Compact, curated technical summary — reused on the homepage hero strip, the homepage
 *  capabilities section, and the About page's Technology section. Deliberately not a full
 *  logo wall; every item here is drawn directly from the CV's skills list. */
export const techGroups: TechSummaryGroup[] = [
  {
    label: 'WordPress',
    items: ['WordPress', 'Elementor Pro', 'ACF', 'JetEngine', 'PHP'],
  },
  {
    label: 'Modern Web',
    items: ['Next.js', 'React', 'TypeScript', 'Astro', 'Laravel'],
  },
  {
    label: 'Web Operations',
    items: ['GitHub', 'Vercel', 'Hostinger', 'Cloudflare', 'DNS'],
  },
  {
    label: 'AI Workflow',
    items: ['Claude Code', 'ChatGPT', 'Cursor'],
  },
];
