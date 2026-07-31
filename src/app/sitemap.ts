import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';
import { projects } from '@/data/projects';
import { systems } from '@/data/systems';
import { TOOLS } from '@/data/tools';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/services', '/portfolio', '/contact', '/tools', '/personal-projects'];

  const toolRoutes = TOOLS.filter((tool) => tool.status === 'Available' || tool.status === 'Beta').map((tool) => tool.href);
  const projectRoutes = projects.map((project) => `/portfolio/${project.slug}`);
  const systemRoutes = systems.map((system) => `/personal-projects/${system.slug}`);

  const routes = [...staticRoutes, ...toolRoutes, ...projectRoutes, ...systemRoutes];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));
}
