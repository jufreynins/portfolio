export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: 'WordPress',
    items: ['WordPress Core', 'Elementor Pro', 'Divi Builder', 'WPBakery'],
  },
  {
    category: 'Frontend',
    items: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
  },
  {
    category: 'Dynamic Content',
    items: ['Advanced Custom Fields (ACF)', 'JetEngine', 'Custom Post Types'],
  },
  {
    category: 'E-commerce',
    items: ['WooCommerce', 'Shopify'],
  },
  {
    category: 'Hosting & Deployment',
    items: ['WHM', 'Cloudways', 'Hostinger', 'GoDaddy', 'HostPapa'],
  },
  {
    category: 'Design & Collaboration',
    items: ['Canva', 'PHP'],
  },
];
