import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { projects } from '@/data/projects';
import { systems } from '@/data/systems';
import { TOOLS } from '@/data/tools';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/services', '/work', '/contact', '/tools', '/systems'];

  const toolRoutes = TOOLS.filter((tool) => tool.status === 'Available' || tool.status === 'Beta').map((tool) => tool.href);
  const projectRoutes = projects.map((project) => `/work/${project.slug}`);
  const systemRoutes = systems.map((system) => `/systems/${system.slug}`);

  const routes = [...staticRoutes, ...toolRoutes, ...projectRoutes, ...systemRoutes];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));
}
