// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://jufreyninobayogportfolio.com',
  integrations: [sitemap()],
  redirects: {
    '/systems': '/personal-projects',
    '/lab': '/personal-projects',
    '/services/website-wordpress': '/services',
    '/services/custom-web-apps': '/personal-projects',
  },
  vite: {
    plugins: [tailwindcss()]
  }
});