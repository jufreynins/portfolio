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
  siAstro,
  siVercel,
  siNetlify,
  siCloudflare,
  siGithub,
  siStripe,
  siPaypal,
  siNextdotjs,
  siReact,
  siTypescript,
  siTailwindcss,
  siSupabase,
  siPostgresql,
  siLaravel,
  siMysql,
  siBootstrap,
  siClaude,
  siClaudecode,
  siCursor,
  siGoogleanalytics,
  siGooglesearchconsole,
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
      { name: 'Astro', path: icon(siAstro) },
      { name: 'Responsive Design' },
    ],
  },
  {
    category: 'Web Application Development',
    description: 'Custom web apps, dashboards, and SaaS-style tools built for scale.',
    icon: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M8 14h2M8 17h5"/>',
    items: [
      { name: 'Next.js', path: icon(siNextdotjs) },
      { name: 'React', path: icon(siReact) },
      { name: 'TypeScript', path: icon(siTypescript) },
      { name: 'Tailwind CSS', path: icon(siTailwindcss) },
      { name: 'Supabase', path: icon(siSupabase) },
      { name: 'PostgreSQL', path: icon(siPostgresql) },
    ],
  },
  {
    category: 'Backend & Frameworks',
    description: 'Server-side logic and legacy stack experience for admin tools and internal systems.',
    icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 8h.01M8 12h.01M8 16h.01"/><path d="M12 8h4M12 12h4M12 16h4"/>',
    items: [
      { name: 'PHP', path: icon(siPhp) },
      { name: 'Laravel', path: icon(siLaravel) },
      { name: 'CodeIgniter' },
      { name: 'MySQL', path: icon(siMysql) },
      { name: 'Bootstrap', path: icon(siBootstrap) },
      { name: 'Gentelella' },
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
    category: 'Automation, CRM & Payments',
    description: 'Connected workflows that keep leads, clients, and transactions moving.',
    icon: '<path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z"/>',
    items: [
      { name: 'GoHighLevel (GHL)' },
      { name: 'Zapier', path: icon(siZapier) },
      { name: 'Stripe', path: icon(siStripe) },
      { name: 'PayPal', path: icon(siPaypal) },
    ],
  },
  {
    category: 'AI-Assisted Development',
    description: 'AI tools built into a human-reviewed development workflow.',
    icon: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
    items: [
      { name: 'Claude', path: icon(siClaude) },
      { name: 'Claude Code', path: icon(siClaudecode) },
      { name: 'Cursor', path: icon(siCursor) },
      { name: 'ChatGPT' },
      { name: 'GitHub', path: icon(siGithub) },
    ],
  },
  {
    category: 'Analytics & Monitoring',
    description: 'Tracking performance and search visibility after launch.',
    icon: '<path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/>',
    items: [
      { name: 'Google Analytics 4', path: icon(siGoogleanalytics) },
      { name: 'Google Search Console', path: icon(siGooglesearchconsole) },
    ],
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
      { name: 'Vercel', path: icon(siVercel) },
      { name: 'Netlify', path: icon(siNetlify) },
      { name: 'Cloudflare', path: icon(siCloudflare) },
      { name: 'GitHub', path: icon(siGithub) },
    ],
  },
  {
    category: 'Design & Collaboration',
    description: 'Shared tools that keep design and feedback moving fast.',
    icon: '<path d="M12 2a10 10 0 1 0 0 20c1.4 0 2-.9 2-1.8 0-.5-.2-.9-.4-1.3-.2-.4-.4-.8-.4-1.3a1.8 1.8 0 0 1 1.8-1.8H17a3 3 0 0 0 3-3 10 10 0 0 0-8-10Z"/><circle cx="7.5" cy="10.5" r=".9"/><circle cx="11.5" cy="7" r=".9"/><circle cx="16" cy="10.5" r=".9"/>',
    items: [{ name: 'Canva' }],
  },
];
