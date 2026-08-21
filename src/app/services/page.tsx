import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import SkillCard from '@/components/SkillCard';
import ServiceCard from '@/components/ServiceCard';
import ContactCTA from '@/components/ContactCTA';
import { siteConfig } from '@/config/site';
import { techGroups } from '@/data/techSummary';
import { wordpressServices, type ServiceVisual } from '@/data/services';
import { projects } from '@/data/projects';
import { systems } from '@/data/systems';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Expertise — WordPress Development & Website Operations — ${siteConfig.name}`,
  description: 'WordPress development, website operations, web systems, and AI-assisted development — the full scope of what I build and maintain.',
  canonical: `${siteConfig.url}/services`,
});

const iconProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const visualIcons: Record<ServiceVisual, ReactNode> = {
  website: (
    <svg {...iconProps}>
      <rect x="2" y="4" width="20" height="16" rx="1.5" />
      <line x1="2" y1="8.5" x2="22" y2="8.5" />
      <line x1="5.5" y1="6.25" x2="5.51" y2="6.25" />
      <line x1="8.5" y1="6.25" x2="8.51" y2="6.25" />
    </svg>
  ),
  'content-model': (
    <svg {...iconProps}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  dashboard: (
    <svg {...iconProps}>
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="9" y1="10" x2="9" y2="21" />
    </svg>
  ),
  tool: (
    <svg {...iconProps}>
      <path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.4 2.4-3-3z" />
    </svg>
  ),
  'connection-flow': (
    <svg {...iconProps}>
      <circle cx="5" cy="12" r="2.5" />
      <circle cx="19" cy="6" r="2.5" />
      <circle cx="19" cy="18" r="2.5" />
      <path d="M7.2 11l9.6-4M7.2 13l9.6 4" />
    </svg>
  ),
  checklist: (
    <svg {...iconProps}>
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <polyline points="7 12 10 15 16 8" />
    </svg>
  ),
};

const relatedLookup = (slug: string | undefined, source: { slug: string; name: string }[], base: string) => {
  if (!slug) return null;
  const match = source.find((entry) => entry.slug === slug);
  return match ? { href: `${base}/${match.slug}`, label: match.name } : null;
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-24 pb-10 sm:pt-28 sm:pb-12" style={{ background: 'var(--paper-000)' }}>
        <Container>
          <SectionHeading
            as="h1"
            eyebrow={`${wordpressServices.length} Service Areas`}
            title="WordPress first, with the range to go further."
            description="WordPress development and website operations are the core of what I do — with web systems and AI-assisted workflows supporting it. Every service below links to real client work or a personal system that demonstrates it."
          />
        </Container>
      </section>

      <section className="py-12 sm:py-16 lg:py-20" style={{ background: 'var(--paper-000)' }}>
        <Container className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {wordpressServices.map((service) => {
            const related = relatedLookup(service.relatedProjectSlug, projects, '/work') ?? relatedLookup(service.relatedSystemSlug, systems, '/systems');
            return (
              <ServiceCard
                key={service.title}
                service={service}
                icon={visualIcons[service.visual]}
                relatedHref={related?.href}
                relatedLabel={related?.label}
              />
            );
          })}
        </Container>
      </section>

      <section className="py-12 sm:py-16 lg:py-20" style={{ background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading title="Tools and technologies." />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {techGroups.map((group) => (
              <SkillCard key={group.label} title={group.label} items={group.items} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16 lg:py-20" style={{ background: 'var(--paper-000)' }}>
        <Container className="flex flex-col items-start gap-5 border-t pt-10" style={{ borderColor: 'var(--line)' }}>
          <span className="eyebrow">Beyond Client Work</span>
          <p className="max-w-xl leading-relaxed" style={{ color: 'var(--ink-700)' }}>
            Alongside client work, I also build{' '}
            <a href="/systems" className="underline" style={{ color: 'var(--accent)' }}>
              personal systems
            </a>{' '}
            and{' '}
            <a href="/tools" className="underline" style={{ color: 'var(--accent)' }}>
              browser tools
            </a>
            .
          </p>
        </Container>
      </section>

      <ContactCTA eyebrow="Not sure which one you need?" title="Let's talk about your project." description="Tell me what you're building and I'll point you in the right direction." />
    </>
  );
}
