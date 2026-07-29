import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/services',
    '/portfolio',
    '/contact',
    '/tools',
    '/tools/image-format-converter',
    '/tools/image-compressor',
    '/tools/css-gradient-generator',
    '/tools/seo-meta-preview',
    '/tools/favicon-generator',
    '/tools/json-formatter',
    '/personal-projects',
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));
}
