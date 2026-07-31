export type ProjectType = 'new-wordpress' | 'redesign' | 'migration' | 'landing-page' | 'ecommerce' | 'staging-to-production';

export const PROJECT_TYPES: { id: ProjectType; label: string }[] = [
  { id: 'new-wordpress', label: 'New WordPress Website' },
  { id: 'redesign', label: 'Website Redesign' },
  { id: 'migration', label: 'Hosting Migration' },
  { id: 'landing-page', label: 'Landing Page' },
  { id: 'ecommerce', label: 'Ecommerce Website' },
  { id: 'staging-to-production', label: 'Staging-to-Production Launch' },
];

export interface ChecklistItemDef {
  id: string;
  category: string;
  label: string;
  appliesTo: ProjectType[] | 'all';
}

const ALL: ProjectType[] | 'all' = 'all';

export const CATEGORIES = [
  'Content',
  'Responsive Design',
  'Navigation and Links',
  'Forms',
  'Email Delivery',
  'Domain and DNS',
  'Hosting',
  'SSL',
  'Backups',
  'SEO Metadata',
  'Sitemap and Robots',
  'Redirects',
  'Analytics',
  'Performance',
  'Security',
  'Accessibility',
  'Legal and Privacy',
  'Final QA',
  'Post-Launch Checks',
] as const;

export const CHECKLIST_ITEMS: ChecklistItemDef[] = [
  // Content
  { id: 'content-1', category: 'Content', label: 'All page copy reviewed and finalized', appliesTo: ALL },
  { id: 'content-2', category: 'Content', label: 'Images have descriptive alt text', appliesTo: ALL },
  { id: 'content-3', category: 'Content', label: 'No placeholder or lorem ipsum text remains', appliesTo: ALL },
  { id: 'content-4', category: 'Content', label: 'Blog and legal pages migrated with correct content', appliesTo: ['migration', 'redesign'] },
  { id: 'content-5', category: 'Content', label: 'Product descriptions and pricing verified', appliesTo: ['ecommerce'] },

  // Responsive Design
  { id: 'responsive-1', category: 'Responsive Design', label: 'Tested on common mobile, tablet, and desktop widths', appliesTo: ALL },
  { id: 'responsive-2', category: 'Responsive Design', label: 'No horizontal scrolling or overflow on mobile', appliesTo: ALL },
  { id: 'responsive-3', category: 'Responsive Design', label: 'Touch targets are at least 44px', appliesTo: ALL },
  { id: 'responsive-4', category: 'Responsive Design', label: 'Images scale correctly at all breakpoints', appliesTo: ALL },

  // Navigation and Links
  { id: 'nav-1', category: 'Navigation and Links', label: 'All internal links tested and working', appliesTo: ALL },
  { id: 'nav-2', category: 'Navigation and Links', label: 'No broken links carried over from the previous site', appliesTo: ['migration', 'redesign'] },
  { id: 'nav-3', category: 'Navigation and Links', label: 'External links open appropriately and use rel="noopener"', appliesTo: ALL },
  { id: 'nav-4', category: 'Navigation and Links', label: 'Mobile menu opens, closes, and scrolls correctly', appliesTo: ALL },
  { id: 'nav-5', category: 'Navigation and Links', label: 'Footer navigation matches header navigation intent', appliesTo: ALL },

  // Forms
  { id: 'forms-1', category: 'Forms', label: 'All forms submit successfully', appliesTo: ALL },
  { id: 'forms-2', category: 'Forms', label: 'Form validation shows clear error messages', appliesTo: ALL },
  { id: 'forms-3', category: 'Forms', label: 'Honeypot or spam protection in place', appliesTo: ALL },
  { id: 'forms-4', category: 'Forms', label: 'Required fields marked and enforced', appliesTo: ALL },
  { id: 'forms-5', category: 'Forms', label: 'Cart and checkout forms tested end-to-end', appliesTo: ['ecommerce'] },

  // Email Delivery
  { id: 'email-1', category: 'Email Delivery', label: 'Form notification emails arrive in the inbox, not spam', appliesTo: ALL },
  { id: 'email-2', category: 'Email Delivery', label: 'SPF, DKIM, and DMARC records configured', appliesTo: ['new-wordpress', 'migration', 'staging-to-production'] },
  { id: 'email-3', category: 'Email Delivery', label: 'SMTP plugin configured instead of default PHP mail', appliesTo: ['new-wordpress', 'migration'] },
  { id: 'email-4', category: 'Email Delivery', label: 'Reply-to address set correctly on forms', appliesTo: ALL },

  // Domain and DNS
  { id: 'dns-1', category: 'Domain and DNS', label: 'Domain points to the correct hosting environment', appliesTo: ['new-wordpress', 'migration', 'staging-to-production'] },
  { id: 'dns-2', category: 'Domain and DNS', label: 'DNS records (A, CNAME, MX, TXT) verified', appliesTo: ['new-wordpress', 'migration', 'staging-to-production'] },
  { id: 'dns-3', category: 'Domain and DNS', label: 'DNS propagation confirmed before final cutover', appliesTo: ['migration', 'staging-to-production'] },
  { id: 'dns-4', category: 'Domain and DNS', label: 'www and non-www versions resolve as intended', appliesTo: ALL },

  // Hosting
  { id: 'hosting-1', category: 'Hosting', label: 'Hosting plan matches expected traffic and resource needs', appliesTo: ['new-wordpress', 'migration', 'ecommerce'] },
  { id: 'hosting-2', category: 'Hosting', label: 'PHP version is current and supported', appliesTo: ['new-wordpress', 'migration', 'staging-to-production'] },
  { id: 'hosting-3', category: 'Hosting', label: 'Staging environment matches production configuration', appliesTo: ['staging-to-production'] },
  { id: 'hosting-4', category: 'Hosting', label: 'Server-level caching configured correctly', appliesTo: ALL },

  // SSL
  { id: 'ssl-1', category: 'SSL', label: 'SSL certificate installed and valid', appliesTo: ALL },
  { id: 'ssl-2', category: 'SSL', label: 'Site loads over HTTPS with no mixed-content warnings', appliesTo: ALL },
  { id: 'ssl-3', category: 'SSL', label: 'HTTP requests redirect to HTTPS', appliesTo: ALL },
  { id: 'ssl-4', category: 'SSL', label: 'Certificate auto-renewal confirmed', appliesTo: ['new-wordpress', 'migration'] },

  // Backups
  { id: 'backup-1', category: 'Backups', label: 'Fresh backup taken immediately before launch', appliesTo: ALL },
  { id: 'backup-2', category: 'Backups', label: 'Backup restore process tested at least once', appliesTo: ['new-wordpress', 'migration', 'staging-to-production'] },
  { id: 'backup-3', category: 'Backups', label: 'Automatic backup schedule configured going forward', appliesTo: ALL },

  // SEO Metadata
  { id: 'seo-1', category: 'SEO Metadata', label: 'Unique title and meta description on every page', appliesTo: ALL },
  { id: 'seo-2', category: 'SEO Metadata', label: 'Open Graph and social preview tags configured', appliesTo: ALL },
  { id: 'seo-3', category: 'SEO Metadata', label: 'Canonical URLs set correctly', appliesTo: ALL },
  { id: 'seo-4', category: 'SEO Metadata', label: "Old URLs' SEO value preserved via redirects", appliesTo: ['migration', 'redesign'] },

  // Sitemap and Robots
  { id: 'sitemap-1', category: 'Sitemap and Robots', label: 'XML sitemap generated and accessible', appliesTo: ALL },
  { id: 'sitemap-2', category: 'Sitemap and Robots', label: 'Sitemap submitted to Google Search Console', appliesTo: ALL },
  { id: 'sitemap-3', category: 'Sitemap and Robots', label: 'robots.txt does not block important pages', appliesTo: ALL },
  { id: 'sitemap-4', category: 'Sitemap and Robots', label: 'Staging environment no longer blocked from indexing after launch', appliesTo: ['staging-to-production'] },

  // Redirects
  { id: 'redirects-1', category: 'Redirects', label: 'Old URLs redirect to their new equivalents', appliesTo: ['migration', 'redesign'] },
  { id: 'redirects-2', category: 'Redirects', label: 'Redirects use 301 (permanent), not 302', appliesTo: ['migration', 'redesign'] },
  { id: 'redirects-3', category: 'Redirects', label: 'No redirect chains or loops', appliesTo: ALL },
  { id: 'redirects-4', category: 'Redirects', label: 'Redirect rules tested on the live domain after DNS cutover', appliesTo: ['migration', 'staging-to-production'] },

  // Analytics
  { id: 'analytics-1', category: 'Analytics', label: 'Analytics tracking code installed and firing', appliesTo: ALL },
  { id: 'analytics-2', category: 'Analytics', label: 'Key conversion events configured (goals, form submits, purchases)', appliesTo: ALL },
  { id: 'analytics-3', category: 'Analytics', label: 'Search Console verified for the domain', appliesTo: ALL },
  { id: 'analytics-4', category: 'Analytics', label: 'Ecommerce tracking configured for purchases', appliesTo: ['ecommerce'] },

  // Performance
  { id: 'perf-1', category: 'Performance', label: 'Images compressed and served in modern formats', appliesTo: ALL },
  { id: 'perf-2', category: 'Performance', label: 'Caching and minification enabled', appliesTo: ALL },
  { id: 'perf-3', category: 'Performance', label: 'Core Web Vitals checked on key pages', appliesTo: ALL },
  { id: 'perf-4', category: 'Performance', label: 'Unused plugins and scripts removed', appliesTo: ALL },

  // Security
  { id: 'security-1', category: 'Security', label: 'Admin usernames are not generic ("admin")', appliesTo: ['new-wordpress', 'migration'] },
  { id: 'security-2', category: 'Security', label: 'Login attempts are rate-limited or protected', appliesTo: ['new-wordpress', 'migration'] },
  { id: 'security-3', category: 'Security', label: 'Plugins and core software updated to latest versions', appliesTo: ALL },
  { id: 'security-4', category: 'Security', label: 'File and directory permissions reviewed', appliesTo: ['new-wordpress', 'migration'] },

  // Accessibility
  { id: 'a11y-1', category: 'Accessibility', label: 'Color contrast meets WCAG AA', appliesTo: ALL },
  { id: 'a11y-2', category: 'Accessibility', label: 'Images have meaningful alt text', appliesTo: ALL },
  { id: 'a11y-3', category: 'Accessibility', label: 'Site is fully keyboard-navigable', appliesTo: ALL },
  { id: 'a11y-4', category: 'Accessibility', label: 'Form fields have associated labels', appliesTo: ALL },

  // Legal and Privacy
  { id: 'legal-1', category: 'Legal and Privacy', label: 'Privacy policy published and linked', appliesTo: ALL },
  { id: 'legal-2', category: 'Legal and Privacy', label: 'Cookie consent banner configured if required', appliesTo: ALL },
  { id: 'legal-3', category: 'Legal and Privacy', label: 'Terms of service published where applicable', appliesTo: ['ecommerce'] },
  { id: 'legal-4', category: 'Legal and Privacy', label: 'Contact information accurate in the footer', appliesTo: ALL },

  // Final QA
  { id: 'qa-1', category: 'Final QA', label: 'Cross-browser check (Chrome, Safari, Firefox, Edge)', appliesTo: ALL },
  { id: 'qa-2', category: 'Final QA', label: 'Spelling and grammar pass on all pages', appliesTo: ALL },
  { id: 'qa-3', category: 'Final QA', label: 'Favicon and browser tab title correct', appliesTo: ALL },
  { id: 'qa-4', category: 'Final QA', label: '404 page configured and on-brand', appliesTo: ALL },

  // Post-Launch Checks
  { id: 'post-1', category: 'Post-Launch Checks', label: 'Site monitored for errors in the first 24 hours', appliesTo: ALL },
  { id: 'post-2', category: 'Post-Launch Checks', label: 'Search engines can crawl and index the live site', appliesTo: ALL },
  { id: 'post-3', category: 'Post-Launch Checks', label: 'Client or stakeholder sign-off received', appliesTo: ALL },
  { id: 'post-4', category: 'Post-Launch Checks', label: 'Old staging or dev URLs no longer publicly accessible', appliesTo: ['migration', 'staging-to-production'] },
];

export function itemsForProjectType(type: ProjectType): ChecklistItemDef[] {
  return CHECKLIST_ITEMS.filter((item) => item.appliesTo === 'all' || item.appliesTo.includes(type));
}
