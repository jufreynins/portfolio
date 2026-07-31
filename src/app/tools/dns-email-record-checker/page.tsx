import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import ToolBreadcrumbs from '@/components/tools/ToolBreadcrumbs';
import StatusBadge from '@/components/tools/StatusBadge';
import ProcessingNote from '@/components/tools/ProcessingNote';
import ToolGuideAccordion from '@/components/tools/ToolGuideAccordion';
import RelatedTools from '@/components/tools/RelatedTools';
import DnsEmailChecker from '@/components/tools/DnsEmailChecker';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `DNS & Email Record Checker | ${siteConfig.name}`,
  description: 'Inspect public DNS, mail-routing, and email-authentication records (A, MX, SPF, DKIM, DMARC) in one organized report.',
  canonical: `${siteConfig.url}/tools/dns-email-record-checker`,
});

const TOOL_ACCENT = '#0f766e';
const TOOL_ACCENT_SOFT = '#e3f3f1';

const guideTips = [
  'A missing DKIM row usually means the selector wasn’t provided — check your email provider’s setup guide for the exact selector name (e.g. “google” for Google Workspace).',
  'Multiple SPF records at the same host is invalid and can break mail delivery — merge them into one record.',
  'DMARC lives at _dmarc.yourdomain.com, not at the root — this tool queries that automatically.',
  'Results come from a public DNS resolver (Cloudflare), so they reflect what the internet currently sees, not your registrar’s dashboard.',
];

export default function DnsEmailCheckerPage() {
  return (
    <div style={{ '--tool-accent': TOOL_ACCENT, '--tool-accent-soft': TOOL_ACCENT_SOFT } as CSSProperties}>
      <section className="pt-20 pb-5 sm:pt-24" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-3">
          <ToolBreadcrumbs category="Website & Infrastructure" title="DNS & Email Record Checker" />
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status="Available" />
            <ProcessingNote>Uses public DNS data</ProcessingNote>
          </div>
          <h1 className="text-xl font-bold sm:text-2xl" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            DNS &amp; Email Record Checker
          </h1>
          <p className="max-w-2xl text-sm" style={{ color: 'var(--text-secondary)' }}>
            Inspect public DNS, mail-routing, and email-authentication records for a domain in one organized report.
          </p>
        </Container>
      </section>

      <section className="py-6 sm:py-8" style={{ background: 'var(--surface-white)' }}>
        <Container>
          <DnsEmailChecker />
        </Container>
      </section>

      <section className="py-10 sm:py-12" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-8">
          <ToolGuideAccordion title="How it works" tips={guideTips} />
          <RelatedTools currentId="dns-email-record-checker" />
        </Container>
      </section>

      <section className="dark-grid-bg py-10 sm:py-12" style={{ background: 'var(--brand-dark)' }}>
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="eyebrow" style={{ color: 'var(--brand-lavender)' }}>
              Need this fixed, not just checked?
            </span>
            <h2 className="text-lg font-bold sm:text-xl" style={{ color: 'var(--text-on-dark)', fontFamily: 'var(--font-heading)' }}>
              Need help configuring DNS, email, or SSL?
            </h2>
            <p className="max-w-xl text-sm" style={{ color: 'var(--text-on-dark)', opacity: 0.75 }}>
              I handle domain, DNS, and business-email setup as part of website launches and migrations.
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
