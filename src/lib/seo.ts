import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

interface PageMetaOptions {
  title?: string;
  description?: string;
  canonical?: string;
  noindex?: boolean;
}

const ogImage = `${siteConfig.url}/og-image.svg`;

export function buildMetadata({ title, description, canonical, noindex = false }: PageMetaOptions = {}): Metadata {
  const resolvedTitle = title ?? `${siteConfig.name} — ${siteConfig.title}`;
  const resolvedDescription = description ?? siteConfig.description;
  const resolvedCanonical = canonical ?? siteConfig.url;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: { canonical: resolvedCanonical },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: 'website',
      title: resolvedTitle,
      description: resolvedDescription,
      url: resolvedCanonical,
      siteName: siteConfig.name,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
      images: [ogImage],
    },
  };
}

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  jobTitle: siteConfig.title,
};
