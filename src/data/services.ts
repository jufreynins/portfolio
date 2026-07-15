export interface ServiceCard {
  title: string;
  outcome: string;
  inclusions: string[];
  visual: 'build' | 'grow' | 'support';
}

export const serviceCards: ServiceCard[] = [
  {
    title: 'WordPress Development',
    outcome: 'A custom-built WordPress site that looks premium and holds up long-term.',
    inclusions: [
      'Custom WordPress builds',
      'Elementor Pro development',
      'Custom Post Types & ACF',
      'Clean, maintainable code',
    ],
    visual: 'build',
  },
  {
    title: 'Landing Pages & Optimization',
    outcome: 'Focused pages built to convert, with the technical foundation to back it up.',
    inclusions: [
      'Conversion-focused landing pages',
      'Speed & performance optimization',
      'Technical SEO foundations',
      'Clean markup & fast load times',
    ],
    visual: 'grow',
  },
  {
    title: 'Maintenance & AI-Assisted Support',
    outcome: 'Ongoing support that keeps your site current, secure, and running smoothly.',
    inclusions: [
      'Website maintenance & updates',
      'Responsive & UI fixes',
      'AI-assisted frontend development',
      'Fast turnaround, human-reviewed',
    ],
    visual: 'support',
  },
  {
    title: 'E-Commerce Development',
    outcome: 'A fully functional online store built to convert browsers into buyers.',
    inclusions: [
      'WooCommerce & Shopify setup',
      'Product catalog & checkout flow',
      'Payment gateway integration',
      'Mobile-optimized shopping experience',
    ],
    visual: 'grow',
  },
  {
    title: 'Automation & CRM Setup',
    outcome: 'Connected systems that capture leads and keep your pipeline moving automatically.',
    inclusions: [
      'GoHighLevel & Zapier workflows',
      'Lead capture & follow-up automation',
      'CRM integration & pipeline setup',
      'Reduced manual admin work',
    ],
    visual: 'support',
  },
  {
    title: 'Website Redesign & Migration',
    outcome: 'A modern rebuild of your existing site with zero disruption to your business.',
    inclusions: [
      'Legacy site migration to WordPress',
      'Design refresh with improved UX',
      'Content and SEO preserved',
      'Careful, tested go-live process',
    ],
    visual: 'build',
  },
];
