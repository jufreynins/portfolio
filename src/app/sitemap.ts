import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/services', '/portfolio', '/contact', '/tools', '/tools/image-format-converter', '/tools/css-gradient-generator', '/personal-projects'];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));
}
