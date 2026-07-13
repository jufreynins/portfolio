export interface Service {
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    title: 'WordPress Development',
    description:
      'Modern WordPress websites with clean, responsive layouts built for speed and long-term maintainability.',
    icon: 'wordpress',
  },
  {
    title: 'Elementor Website Development',
    description:
      'Pixel-precise builds with Elementor Pro, from custom sections to full site design and interactions.',
    icon: 'layout',
  },
  {
    title: 'Custom WordPress Development',
    description:
      'Advanced functionality using Custom Post Types, ACF, and JetEngine for content that goes beyond the basics.',
    icon: 'code',
  },
  {
    title: 'Landing Pages & Funnels',
    description:
      'Focused, conversion-minded landing pages designed to turn visitors into leads and customers.',
    icon: 'target',
  },
  {
    title: 'Website Maintenance',
    description:
      'Ongoing updates, backups, and monitoring so your site stays secure, current, and running smoothly.',
    icon: 'shield',
  },
  {
    title: 'Responsive & UI Fixes',
    description:
      'Troubleshooting and refining layouts so your site looks and works correctly on every device.',
    icon: 'devices',
  },
  {
    title: 'Performance Optimization',
    description:
      'Speed and technical improvements, including basic technical SEO, for faster, more discoverable pages.',
    icon: 'speed',
  },
  {
    title: 'Technical Web Support',
    description:
      'Migrations, hosting and domain coordination, and reliable troubleshooting for remote and international teams.',
    icon: 'support',
  },
];
