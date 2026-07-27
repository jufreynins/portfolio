export interface WordPressService {
  title: string;
  outcome: string;
  whoFor: string;
  problem: string;
  deliverables: string[];
  technology: string;
  relatedProjectSlug?: string;
}

export const wordpressServices: WordPressService[] = [
  {
    title: 'WordPress Website Development',
    outcome: 'A custom-built WordPress site that looks premium and holds up long-term.',
    whoFor: 'Businesses, agencies, and organizations that need a professional website built from the ground up.',
    problem: 'A generic template does not reflect the business, and a slow or fragile build creates ongoing headaches.',
    deliverables: ['Custom WordPress builds', 'Clean, maintainable code', 'Mobile-first responsive layouts', 'On-page SEO foundations'],
    technology: 'WordPress, Elementor Pro, Advanced Custom Fields',
    relatedProjectSlug: 'medic-media',
  },
  {
    title: 'Dynamic WordPress Development',
    outcome: 'Structured, filterable content that scales instead of a wall of static pages.',
    whoFor: 'Sites with repeating content: listings, team members, case studies, products, or resources.',
    problem: 'Managing dozens of similar pages by hand is slow and error-prone, and it does not scale as content grows.',
    deliverables: ['Custom post types & taxonomies', 'Advanced Custom Fields', 'JetEngine dynamic listings', 'Search and filtering'],
    technology: 'Advanced Custom Fields, JetEngine, Custom Post Types',
    relatedProjectSlug: 'martin-county-humane-society',
  },
  {
    title: 'Website Redesign & Support',
    outcome: 'A modern rebuild of an existing site with zero disruption to the business.',
    whoFor: 'Businesses with a working but dated, slow, or hard-to-manage website.',
    problem: 'The current site no longer represents the business well, but a full rebuild feels risky for content and SEO.',
    deliverables: ['Legacy site migration to WordPress', 'Design refresh with improved UX', 'Content and SEO preserved', 'Careful, tested go-live process'],
    technology: 'WordPress, Elementor Pro, staging-based migration workflow',
    relatedProjectSlug: 'neighborhood-plumbing-drain',
  },
  {
    title: 'Elementor Pro Development',
    outcome: 'Flexible, editable page layouts your team can actually update without breaking anything.',
    whoFor: 'Site owners and teams who need to make content changes themselves after launch.',
    problem: 'Page builders can turn messy fast — inconsistent spacing, broken layouts, sections that only the original developer can safely touch.',
    deliverables: ['Elementor Pro page building', 'Reusable global templates', 'Consistent design system across pages', 'Editor-friendly structure'],
    technology: 'Elementor Pro, global widgets, theme builder templates',
    relatedProjectSlug: 'the-pedal-shack',
  },
  {
    title: 'Custom Functionality & Integrations',
    outcome: 'The specific behavior a page builder cannot deliver on its own, done properly.',
    whoFor: 'Projects that need something beyond what plugins and page builders offer out of the box.',
    problem: 'A business process depends on a workflow, form, or integration that standard WordPress plugins do not quite handle.',
    deliverables: ['Custom CSS & JavaScript', 'Form workflows & integrations', 'GoHighLevel & Zapier automation', 'Third-party API connections'],
    technology: 'Custom CSS/JS, PHP, GoHighLevel, Zapier',
  },
  {
    title: 'Performance, Maintenance & Support',
    outcome: 'A site that stays fast, secure, and current without you having to think about it.',
    whoFor: 'Site owners who want ongoing peace of mind after launch.',
    problem: 'Websites need upkeep — plugin updates, small fixes, content changes — and neglecting it leads to slow, insecure, or broken pages.',
    deliverables: ['Website maintenance & updates', 'Performance optimization', 'Responsive & UI fixes', 'Hosting & deployment support'],
    technology: 'Cloudways, Hostinger, WHM/cPanel, performance auditing',
    relatedProjectSlug: 'daviess-county-rural-water',
  },
];

// Kept for any legacy references; prefer wordpressServices for new content.
export interface ServiceCard {
  title: string;
  outcome: string;
  inclusions: string[];
  visual: 'build' | 'grow' | 'support';
}

export const serviceCards: ServiceCard[] = wordpressServices.map((s) => ({
  title: s.title,
  outcome: s.outcome,
  inclusions: s.deliverables,
  visual: 'build',
}));
