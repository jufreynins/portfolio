export interface TechSummaryGroup {
  label: string;
  items: string[];
}

/** WordPress-dominant technical stack — reused on the homepage's WordPress Tech Stack
 *  section and the About/Expertise pages. WordPress leads; AI workflow tools stay last,
 *  positioned as workflow support rather than a competing identity. Every item here is
 *  drawn directly from the CV's skills list — nothing invented. */
export const techGroups: TechSummaryGroup[] = [
  {
    label: 'WordPress',
    items: ['WordPress', 'Elementor Pro', 'Bricks', 'WPBakery', 'Divi', 'ACF / ACF Pro', 'JetEngine', 'Gutenberg', 'WooCommerce'],
  },
  {
    label: 'Development',
    items: ['PHP', 'HTML', 'CSS', 'JavaScript', 'jQuery', 'MySQL'],
  },
  {
    label: 'Hosting & Operations',
    items: ['Cloudways', 'Hostinger', 'cPanel', 'WHM', 'Cloudflare'],
  },
  {
    label: 'Analytics & SEO',
    items: ['GA4', 'Google Search Console'],
  },
  {
    label: 'Workflow',
    items: ['GitHub', 'Claude Code', 'ChatGPT', 'Cursor'],
  },
];
