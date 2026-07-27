// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://jufreyninobayogportfolio.com',
  integrations: [sitemap()],
  redirects: {
    '/systems': '/lab#systems',
    '/tools': '/lab#tools',
    '/services/website-wordpress': '/services',
    '/services/custom-web-apps': '/lab',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});