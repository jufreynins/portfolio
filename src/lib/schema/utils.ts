export type SchemaType = 'Organization' | 'LocalBusiness' | 'Service' | 'Person' | 'FAQPage' | 'BreadcrumbList';

export const SCHEMA_TYPES: { id: SchemaType; label: string }[] = [
  { id: 'Organization', label: 'Organization' },
  { id: 'LocalBusiness', label: 'Local Business' },
  { id: 'Service', label: 'Service' },
  { id: 'Person', label: 'Person' },
  { id: 'FAQPage', label: 'FAQ Page' },
  { id: 'BreadcrumbList', label: 'Breadcrumb List' },
];

export interface SimpleFields {
  [key: string]: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface CrumbItem {
  id: string;
  name: string;
  url: string;
}

function clean(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === '' || v === undefined || v === null) continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = v;
  }
  return out;
}

export function buildAddress(f: SimpleFields) {
  const addr = clean({
    '@type': 'PostalAddress',
    streetAddress: f.street,
    addressLocality: f.city,
    addressRegion: f.region,
    postalCode: f.postal,
    addressCountry: f.country,
  });
  return Object.keys(addr).length > 1 ? addr : undefined;
}

export function buildJsonLd(type: SchemaType, fields: SimpleFields, faqItems: FaqItem[], crumbItems: CrumbItem[]): Record<string, unknown> {
  if (type === 'FAQPage') {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems
        .filter((f) => f.question.trim())
        .map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
    };
  }

  if (type === 'BreadcrumbList') {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbItems
        .filter((c) => c.name.trim())
        .map((c, i) => clean({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url || undefined })),
    };
  }

  if (type === 'Organization') {
    return {
      '@context': 'https://schema.org',
      ...clean({
        '@type': 'Organization',
        name: fields.name,
        url: fields.url,
        logo: fields.logo,
        description: fields.description,
        telephone: fields.telephone,
        email: fields.email,
        address: buildAddress(fields),
        sameAs: (fields.sameAs ?? '')
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      }),
    };
  }

  if (type === 'LocalBusiness') {
    return {
      '@context': 'https://schema.org',
      ...clean({
        '@type': 'LocalBusiness',
        name: fields.name,
        url: fields.url,
        telephone: fields.telephone,
        image: fields.image,
        priceRange: fields.priceRange,
        openingHours: fields.openingHours,
        address: buildAddress(fields),
      }),
    };
  }

  if (type === 'Service') {
    return {
      '@context': 'https://schema.org',
      ...clean({
        '@type': 'Service',
        name: fields.name,
        serviceType: fields.serviceType,
        description: fields.description,
        areaServed: fields.areaServed,
        url: fields.url,
        provider: fields.provider ? { '@type': 'Organization', name: fields.provider } : undefined,
      }),
    };
  }

  // Person
  return {
    '@context': 'https://schema.org',
    ...clean({
      '@type': 'Person',
      name: fields.name,
      jobTitle: fields.jobTitle,
      url: fields.url,
      email: fields.email,
      telephone: fields.telephone,
      sameAs: (fields.sameAs ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    }),
  };
}

/** Safe for embedding inside an actual <script> tag — escapes sequences that could close it early. */
export function serializeForScript(obj: unknown): string {
  return JSON.stringify(obj, null, 2).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
}

export const REQUIRED_FIELDS: Record<SchemaType, string[]> = {
  Organization: ['name', 'url'],
  LocalBusiness: ['name', 'url', 'telephone', 'street', 'city', 'region', 'postal', 'country'],
  Service: ['name', 'provider'],
  Person: ['name'],
  FAQPage: [],
  BreadcrumbList: [],
};

export const EXAMPLES: Record<SchemaType, { fields: SimpleFields; faq?: FaqItem[]; crumbs?: CrumbItem[] }> = {
  Organization: {
    fields: {
      name: 'Jufrey Niño Bayog',
      url: 'https://jufreyninobayogportfolio.com',
      logo: 'https://jufreyninobayogportfolio.com/favicon.svg',
      description: 'WordPress and web systems developer.',
      email: 'jufreyninsbayog@gmail.com',
      sameAs: '',
    },
  },
  LocalBusiness: {
    fields: {
      name: 'Riverside Plumbing Co.',
      url: 'https://example.com',
      telephone: '+1-555-0100',
      priceRange: '$$',
      openingHours: 'Mo-Fr 08:00-17:00',
      street: '123 Main St',
      city: 'Springfield',
      region: 'IL',
      postal: '62701',
      country: 'US',
    },
  },
  Service: {
    fields: {
      name: 'WordPress Website Development',
      serviceType: 'Web Development',
      provider: 'Jufrey Niño Bayog',
      areaServed: 'Worldwide',
      description: 'Custom WordPress websites built with Elementor Pro and dynamic content.',
      url: 'https://jufreyninobayogportfolio.com/services',
    },
  },
  Person: {
    fields: {
      name: 'Jufrey Niño Bayog',
      jobTitle: 'WordPress and Web Systems Developer',
      url: 'https://jufreyninobayogportfolio.com',
      email: 'jufreyninsbayog@gmail.com',
      sameAs: '',
    },
  },
  FAQPage: {
    fields: {},
    faq: [
      { id: 'ex-1', question: 'How long does a WordPress website take to build?', answer: 'Most business websites take two to four weeks depending on scope and content readiness.' },
      { id: 'ex-2', question: 'Do you offer ongoing maintenance?', answer: 'Yes — maintenance and support plans are available after launch.' },
    ],
  },
  BreadcrumbList: {
    fields: {},
    crumbs: [
      { id: 'ex-1', name: 'Home', url: 'https://example.com' },
      { id: 'ex-2', name: 'Services', url: 'https://example.com/services' },
      { id: 'ex-3', name: 'WordPress Development', url: 'https://example.com/services/wordpress' },
    ],
  },
};
