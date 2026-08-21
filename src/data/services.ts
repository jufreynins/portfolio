export type ServiceVisual = 'website' | 'content-model' | 'dashboard' | 'tool' | 'connection-flow' | 'checklist';

export interface WordPressService {
  title: string;
  outcome: string;
  whoFor: string;
  problem: string;
  deliverables: string[];
  technology: string;
  visual: ServiceVisual;
  relatedProjectSlug?: string;
  relatedSystemSlug?: string;
}

export const wordpressServices: WordPressService[] = [
  {
    title: 'WordPress Website Development',
    outcome: 'A custom-built WordPress site that looks premium and holds up long-term.',
    whoFor: 'Businesses, agencies, and organizations that need a professional website built from the ground up.',
    problem: 'A generic template does not reflect the business, and a slow or fragile build creates ongoing headaches.',
    deliverables: ['Custom WordPress builds', 'Clean, maintainable code', 'Mobile-first responsive layouts', 'On-page SEO foundations'],
    technology: 'WordPress, Elementor Pro, Advanced Custom Fields',
    visual: 'website',
    relatedProjectSlug: 'medic-media',
  },
  {
    title: 'Dynamic WordPress Systems',
    outcome: 'Structured, filterable content that scales instead of a wall of static pages.',
    whoFor: 'Sites with repeating content: listings, team members, case studies, products, or resources.',
    problem: 'Managing dozens of similar pages by hand is slow and error-prone, and it does not scale as content grows.',
    deliverables: ['Custom post types & taxonomies', 'Advanced Custom Fields', 'JetEngine dynamic listings', 'Search and filtering'],
    technology: 'Advanced Custom Fields, JetEngine, Custom Post Types',
    visual: 'content-model',
    relatedProjectSlug: 'martin-county-humane-society',
  },
  {
    title: 'Website Redesign & Frontend Improvement',
    outcome: 'A modern rebuild of an existing site with zero disruption to the business.',
    whoFor: 'Businesses with a working but dated, slow, or hard-to-manage website.',
    problem: 'The current site no longer represents the business well, but a full rebuild feels risky for content and SEO.',
    deliverables: ['Legacy site migration to WordPress', 'Design refresh with improved UX', 'Content and SEO preserved', 'Careful, tested go-live process'],
    technology: 'WordPress, Elementor Pro, staging-based migration workflow',
    visual: 'website',
    relatedProjectSlug: 'neighborhood-plumbing-drain',
  },
  {
    title: 'Landing Pages',
    outcome: 'A focused, fast-loading page built around a single goal: sign-ups, bookings, or leads.',
    whoFor: 'Campaigns, product launches, and offers that need a dedicated page instead of a full site rebuild.',
    problem: 'Squeezing a focused campaign message onto a general-purpose homepage buries the call to action.',
    deliverables: ['Elementor Pro page building', 'Reusable global templates', 'Conversion-focused layout', 'Editor-friendly structure for future changes'],
    technology: 'Elementor Pro, global widgets, theme builder templates',
    visual: 'website',
    relatedProjectSlug: 'the-pedal-shack',
  },
  {
    title: 'Web Systems & Dashboards',
    outcome: 'An internal system built around how your team actually works, not a generic template.',
    whoFor: 'Businesses and agencies that need task tracking, inventory, records, or reporting handled in one place instead of spreadsheets.',
    problem: 'Spreadsheets and email threads make it hard to track ownership, status, and history as a team grows.',
    deliverables: ['Admin dashboards', 'Role-based access', 'Searchable records', 'Reporting views'],
    technology: 'Laravel, React + TypeScript, MySQL',
    visual: 'dashboard',
    relatedSystemSlug: 'revisiondesk',
  },
  {
    title: 'Browser-Based Web Tools',
    outcome: 'A focused utility that solves one task well, without an account or upload.',
    whoFor: 'Teams that repeatedly need a small technical task done (image conversion, SEO checks, formatting) without extra software.',
    problem: 'General-purpose software is overkill for a single repeated task, and uploading files to a third-party service raises privacy questions.',
    deliverables: ['Client-side, local processing', 'No account or file uploads', 'Instant, downloadable results'],
    technology: 'TypeScript, Canvas API, JSZip',
    visual: 'tool',
  },
  {
    title: 'Custom Functionality & Integrations',
    outcome: 'The specific behavior a page builder cannot deliver on its own, done properly.',
    whoFor: 'Projects that need something beyond what plugins and page builders offer out of the box.',
    problem: 'A business process depends on a workflow, form, or integration that standard WordPress plugins do not quite handle.',
    deliverables: ['Custom CSS & JavaScript', 'Form workflows & integrations', 'GoHighLevel & Zapier automation', 'Third-party API connections'],
    technology: 'Custom CSS/JS, PHP, GoHighLevel, Zapier',
    visual: 'checklist',
  },
  {
    title: 'Hosting, Domain & Launch Support',
    outcome: 'A website connected to the right domain, hosting, and email setup, verified before launch instead of after.',
    whoFor: 'Businesses launching a new site, changing hosting providers, or dealing with a domain, SSL, or email-delivery issue.',
    problem: 'Domain, DNS, SSL, and email settings are easy to misconfigure, and a single wrong record can break a website or its email.',
    deliverables: [
      'Hosting environment review',
      'Domain & DNS setup (A, CNAME, MX, TXT records)',
      'Nameserver updates',
      'SSL verification',
      'SPF, DKIM & DMARC setup',
      'Website form delivery testing',
      'Backup verification',
      'Staging-to-live deployment',
    ],
    technology: 'Cloudways, Hostinger, GoDaddy, WHM/cPanel, WPVivid',
    visual: 'connection-flow',
  },
  {
    title: 'Maintenance & Agency Support',
    outcome: 'A site that stays fast, secure, and current without you having to think about it.',
    whoFor: 'Site owners who want ongoing peace of mind after launch, and agencies who need reliable development support.',
    problem: 'Websites need upkeep: plugin updates, small fixes, content changes. Neglecting it leads to slow, insecure, or broken pages.',
    deliverables: ['Website maintenance & updates', 'Performance optimization', 'Responsive & UI fixes', 'Agency development support'],
    technology: 'Cloudways, Hostinger, WHM/cPanel, performance auditing',
    visual: 'checklist',
    relatedProjectSlug: 'daviess-county-rural-water',
  },
];
