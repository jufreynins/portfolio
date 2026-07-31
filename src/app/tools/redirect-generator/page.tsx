import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import ToolBreadcrumbs from '@/components/tools/ToolBreadcrumbs';
import StatusBadge from '@/components/tools/StatusBadge';
import ProcessingNote from '@/components/tools/ProcessingNote';
import ToolGuideAccordion from '@/components/tools/ToolGuideAccordion';
import RelatedTools from '@/components/tools/RelatedTools';
import RedirectGenerator from '@/components/tools/RedirectGenerator';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `301 Redirect Generator | ${siteConfig.name}`,
  description: 'Create and validate redirect mappings for migrations, URL changes, and website redesigns — export as .htaccess, Nginx, Netlify, or CSV.',
  canonical: `${siteConfig.url}/tools/redirect-generator`,
});

const TOOL_ACCENT = '#334155';
const TOOL_ACCENT_SOFT = '#eaedf1';

const guideTips = [
  'Use 301 for permanent moves (most redesigns and migrations) and 302 only for temporary changes — search engines treat them differently.',
  'A "chain" warning means the destination is itself redirected elsewhere — point the source directly at the final destination instead.',
  'Bulk paste accepts "source -> destination", "source, destination", or lines separated by whitespace.',
  'Always test generated rules on a staging copy of the server before deploying to production.',
];

export default function RedirectGeneratorPage() {
  return (
    <div style={{ '--tool-accent': TOOL_ACCENT, '--tool-accent-soft': TOOL_ACCENT_SOFT } as CSSProperties}>
      <section className="pt-20 pb-5 sm:pt-24" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-3">
          <ToolBreadcrumbs category="Website & Infrastructure" title="301 Redirect Generator" />
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status="Available" />
            <ProcessingNote>Runs locally in your browser</ProcessingNote>
          </div>
          <h1 className="text-xl font-bold sm:text-2xl" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            301 Redirect Generator
          </h1>
          <p className="max-w-2xl text-sm" style={{ color: 'var(--text-secondary)' }}>
            Create and validate redirect mappings for migrations, URL changes, and website redesigns.
          </p>
        </Container>
      </section>

      <section className="py-6 sm:py-8" style={{ background: 'var(--surface-white)' }}>
        <Container>
          <RedirectGenerator />
        </Container>
      </section>

      <section className="py-10 sm:py-12" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-8">
          <ToolGuideAccordion title="How it works" tips={guideTips} />
          <RelatedTools currentId="redirect-generator" />
        </Container>
      </section>

      <section className="dark-grid-bg py-10 sm:py-12" style={{ background: 'var(--brand-dark)' }}>
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="eyebrow" style={{ color: 'var(--brand-lavender)' }}>
              Migrating a whole site?
            </span>
            <h2 className="text-lg font-bold sm:text-xl" style={{ color: 'var(--text-on-dark)', fontFamily: 'var(--font-heading)' }}>
              Need help with a full migration or redesign?
            </h2>
            <p className="max-w-xl text-sm" style={{ color: 'var(--text-on-dark)', opacity: 0.75 }}>
              I handle redirect mapping, DNS cutover, and SEO preservation as part of website migrations.
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
