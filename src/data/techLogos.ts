import {
  siWordpress,
  siElementor,
  siHtml5,
  siCss,
  siJavascript,
  siWoocommerce,
  siShopify,
  siCloudways,
  siHostinger,
  siGodaddy,
  siPhp,
  siZapier,
  siTrello,
  siAsana,
  siClickup,
} from 'simple-icons';

export interface TechLogo {
  name: string;
  path?: string;
}

export interface TechCategory {
  category: string;
  description: string;
  icon: string;
  items: TechLogo[];
}

const icon = (i: { path: string }) => i.path;

export const techCategories: TechCategory[] = [
  {
    category: 'WordPress',
    description: 'Custom, scalable websites built for easy content management.',
    icon: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9.5h18"/><path d="M7 7.2h.01"/>',
    items: [
      { name: 'WordPress Core', path: icon(siWordpress) },
      { name: 'Elementor Pro', path: icon(siElementor) },
      { name: 'Divi Builder' },
      { name: 'WPBakery' },
    ],
  },
  {
    category: 'Frontend Development',
    description: 'Clean, responsive interfaces that hold up on every screen.',
    icon: '<polyline points="9 6 3 12 9 18"/><polyline points="15 6 21 12 15 18"/>',
    items: [
      { name: 'HTML5', path: icon(siHtml5) },
      { name: 'CSS3', path: icon(siCss) },
      { name: 'JavaScript', path: icon(siJavascript) },
      { name: 'Responsive Design' },
    ],
  },
  {
    category: 'Dynamic Content',
    description: 'Structured, editable content models built to scale with the site.',
    icon: '<path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="M3 16l9 5 9-5"/><path d="M3 12l9 5 9-5"/>',
    items: [
      { name: 'Advanced Custom Fields (ACF)' },
      { name: 'JetEngine' },
      { name: 'Custom Post Types' },
      { name: 'PHP', path: icon(siPhp) },
    ],
  },
  {
    category: 'E-Commerce',
    description: 'Storefronts built to convert, from checkout to catalog.',
    icon: '<path d="M6 2 3.5 6v14a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V6L18 2Z"/><path d="M3.5 6h17"/><path d="M15.5 10a3.5 3.5 0 0 1-7 0"/>',
    items: [
      { name: 'WooCommerce', path: icon(siWoocommerce) },
      { name: 'Shopify', path: icon(siShopify) },
    ],
  },
  {
    category: 'Automation & CRM',
    description: 'Connected workflows that keep leads and clients moving.',
    icon: '<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/>',
    items: [{ name: 'GoHighLevel (GHL)' }, { name: 'Zapier', path: icon(siZapier) }],
  },
  {
    category: 'Project Management',
    description: 'Organized delivery, from scoping to sign-off.',
    icon: '<rect x="3" y="3" width="7" height="18" rx="1.2"/><rect x="14" y="3" width="7" height="10" rx="1.2"/>',
    items: [
      { name: 'Trello', path: icon(siTrello) },
      { name: 'Asana', path: icon(siAsana) },
      { name: 'ClickUp', path: icon(siClickup) },
    ],
  },
  {
    category: 'Hosting & Deployment',
    description: 'Reliable environments and clean, repeatable deployments.',
    icon: '<rect x="2.5" y="3.5" width="19" height="7" rx="1.2"/><rect x="2.5" y="13.5" width="19" height="7" rx="1.2"/><path d="M6.5 7h.01M6.5 17h.01"/>',
    items: [
      { name: 'WHM' },
      { name: 'Cloudways', path: icon(siCloudways) },
      { name: 'Hostinger', path: icon(siHostinger) },
      { name: 'GoDaddy', path: icon(siGodaddy) },
      { name: 'HostPapa' },
    ],
  },
  {
    category: 'Design & Collaboration',
    description: 'Shared tools that keep design and feedback moving fast.',
    icon: '<path d="M12 2a10 10 0 1 0 0 20c1.4 0 2-.9 2-1.8 0-.5-.2-.9-.4-1.3-.2-.4-.4-.8-.4-1.3a1.8 1.8 0 0 1 1.8-1.8H17a3 3 0 0 0 3-3 10 10 0 0 0-8-10Z"/><circle cx="7.5" cy="10.5" r=".9"/><circle cx="11.5" cy="7" r=".9"/><circle cx="16" cy="10.5" r=".9"/>',
    items: [{ name: 'Canva' }],
  },
];
