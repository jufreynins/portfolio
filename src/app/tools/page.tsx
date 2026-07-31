import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import ToolsDashboard from '@/components/tools/ToolsDashboard';
import ToolPrivacyIndicator from '@/components/tools/ToolPrivacyIndicator';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Web Tools — ${siteConfig.name}`,
  description: 'Practical tools for building, launching, auditing, and maintaining websites — DNS checks, launch checklists, schema markup, redirects, accessibility, and more.',
  canonical: `${siteConfig.url}/tools`,
});

export default function ToolsPage() {
  return (
    <>
      <section className="pt-20 pb-6 sm:pt-24 sm:pb-8" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-2">
          <span className="eyebrow">Web Tools</span>
          <h1 className="text-2xl font-bold sm:text-3xl" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            Practical tools for building, launching, auditing, and maintaining websites.
          </h1>
          <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
            Free, focused utilities — most run entirely in your browser with no account or upload required.
          </p>
        </Container>
      </section>

      <section className="py-8 sm:py-10" style={{ background: 'var(--surface-white)' }}>
        <Container>
          <ToolsDashboard />
        </Container>
      </section>

      <section className="py-6" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex justify-center">
          <ToolPrivacyIndicator />
        </Container>
      </section>

      <section className="py-10 sm:py-12" style={{ background: 'var(--surface-white)' }}>
        <Container className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border p-6 sm:p-8" style={{ borderColor: 'var(--border-color)', background: 'var(--brand-soft)' }}>
          <div className="flex flex-col gap-1">
            <span className="eyebrow">Looking for WordPress work instead?</span>
            <p className="max-w-xl text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              This page is a look at what I build outside of client projects. For professional WordPress websites, see Services and Portfolio.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/services" variant="secondary">
              Services
            </Button>
            <Button href="/portfolio" variant="primary">
              Portfolio
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
