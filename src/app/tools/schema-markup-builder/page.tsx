import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import ToolBreadcrumbs from '@/components/tools/ToolBreadcrumbs';
import StatusBadge from '@/components/tools/StatusBadge';
import ProcessingNote from '@/components/tools/ProcessingNote';
import ToolGuideAccordion from '@/components/tools/ToolGuideAccordion';
import RelatedTools from '@/components/tools/RelatedTools';
import SchemaMarkupBuilder from '@/components/tools/SchemaMarkupBuilder';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Schema Markup Builder | ${siteConfig.name}`,
  description: 'Generate valid JSON-LD structured data for organizations, local businesses, services, people, FAQs, and breadcrumbs.',
  canonical: `${siteConfig.url}/tools/schema-markup-builder`,
});

const TOOL_ACCENT = '#7c3aed';
const TOOL_ACCENT_SOFT = '#efe7fb';

const guideTips = [
  'FAQPage markup can make questions eligible for rich results in Google Search, but eligibility depends on Google\'s current guidelines.',
  'BreadcrumbList should match the actual navigation path to the page, in order — position numbers are generated automatically.',
  'Only fields you fill in are included in the output; empty fields are left out rather than rendered as blank values.',
  'Validate the output with Google\'s Rich Results Test before publishing to a live page.',
];

export default function SchemaMarkupBuilderPage() {
  return (
    <div style={{ '--tool-accent': TOOL_ACCENT, '--tool-accent-soft': TOOL_ACCENT_SOFT } as CSSProperties}>
      <section className="pt-20 pb-5 sm:pt-24" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-3">
          <ToolBreadcrumbs category="SEO & Marketing" title="Schema Markup Builder" />
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status="Available" />
            <ProcessingNote>Runs locally in your browser</ProcessingNote>
          </div>
          <h1 className="text-xl font-bold sm:text-2xl" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            Schema Markup Builder
          </h1>
          <p className="max-w-2xl text-sm" style={{ color: 'var(--text-secondary)' }}>
            Generate valid JSON-LD structured data for organizations, local businesses, services, people, FAQs, and breadcrumbs.
          </p>
        </Container>
      </section>

      <section className="py-6 sm:py-8" style={{ background: 'var(--surface-white)' }}>
        <Container>
          <SchemaMarkupBuilder />
        </Container>
      </section>

      <section className="py-10 sm:py-12" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-8">
          <ToolGuideAccordion title="How it works" tips={guideTips} />
          <RelatedTools currentId="schema-markup-builder" />
        </Container>
      </section>

      <section className="dark-grid-bg py-10 sm:py-12" style={{ background: 'var(--brand-dark)' }}>
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="eyebrow" style={{ color: 'var(--brand-lavender)' }}>
              Need SEO foundations built in?
            </span>
            <h2 className="text-lg font-bold sm:text-xl" style={{ color: 'var(--text-on-dark)', fontFamily: 'var(--font-heading)' }}>
              Need structured data wired into your WordPress site?
            </h2>
            <p className="max-w-xl text-sm" style={{ color: 'var(--text-on-dark)', opacity: 0.75 }}>
              I can implement schema markup, meta tags, and technical SEO foundations directly in WordPress.
            </p>
          </div>
          <Button href="/contact" variant="primary">
            Start a Project
          </Button>
        </Container>
      </section>
    </div>
  );
}
