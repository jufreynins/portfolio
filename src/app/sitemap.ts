import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { projects } from '@/data/projects';
import { systems } from '@/data/systems';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/contact',
    '/tools',
    '/tools/image-toolkit',
    '/tools/css-gradient-generator',
    '/tools/seo-meta-preview',
    '/tools/favicon-generator',
    '/tools/json-formatter',
    '/personal-projects',
  ];

  const projectRoutes = projects.map((project) => `/portfolio/${project.slug}`);
  const systemRoutes = systems.map((system) => `/personal-projects/${system.slug}`);

  const routes = [...staticRoutes, ...projectRoutes, ...systemRoutes];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));
}
