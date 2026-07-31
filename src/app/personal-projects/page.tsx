import type { Metadata } from 'next';
import Image from 'next/image';
import Container from '@/components/Container';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import SystemPreview from '@/components/SystemPreview';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';
import { systems, systemStatusStyle } from '@/data/systems';

export const metadata: Metadata = buildMetadata({
  title: `Web Systems — ${siteConfig.name}`,
  description: 'Personal web system concepts and live deployments — admin dashboards, task tracking, and internal tools, clearly labeled by status.',
  canonical: `${siteConfig.url}/personal-projects`,
});

export default function WebSystemsPage() {
  return (
    <>
      <section className="pt-24 pb-10 sm:pt-28 sm:pb-12" style={{ background: 'var(--surface-warm)' }}>
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Web Systems"
            title="Web systems designed around real workflows."
            description="Admin dashboards, task tracking, and internal tools — a mix of live personal deployments and concept designs, clearly labeled by status, never presented as client production systems."
          />
        </Container>
      </section>

      <section className="py-12 sm:py-14" style={{ background: 'var(--surface-white)' }}>
        <Container className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {systems.map((system, i) => {
            const status = systemStatusStyle[system.status];
            return (
              <div key={system.slug} className="concept-card flex flex-col gap-4 rounded-2xl border p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)', boxShadow: 'var(--shadow-sm)' }} data-reveal>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="eyebrow">{system.category}</span>
                    <h3 className="text-xl">{system.name}</h3>
                  </div>
                  <span
                    className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide"
                    style={{ borderColor: status.border, color: status.color, background: status.bg }}
                  >
                    {system.status}
                  </span>
                </div>

                {system.screenshot ? (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl border" style={{ borderColor: 'var(--border-color)' }}>
                    <Image src={system.screenshot} alt={`${system.name} dashboard screenshot`} className="h-full w-full object-cover object-top" />
                  </div>
                ) : (
                  <SystemPreview routeLabel={system.routeLabel} activeNav={i % 4} />
                )}

                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  <span className="font-bold uppercase tracking-wide">Built for:</span> {system.users}
                </p>

                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {system.problem}
                </p>

                <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {system.modules.map((feature) => (
                    <li key={feature} className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--text-primary)' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0" style={{ color: 'var(--brand-primary)' }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <span className="font-bold uppercase tracking-wide">Tech direction:</span> {system.techDirection}
                </p>

                <div className="mt-1 flex flex-wrap gap-3">
                  <Button href={`/personal-projects/${system.slug}`} variant="secondary">
                    View Details
                  </Button>
                  {system.href && (
                    <Button href={system.href} variant="primary" target="_blank" rel="noopener noreferrer">
                      Visit Live Demo
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      <section className="py-12 sm:py-14" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col items-start gap-5">
          <span className="eyebrow">Need something similar?</span>
          <p className="max-w-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            If a workflow like this sounds familiar — spreadsheets, email threads, or disconnected tools — tell me about it and I&apos;ll recommend a practical next step.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/services" variant="secondary">
              Explore Services
            </Button>
            <Button href="/contact" variant="primary">
              Request a Similar System
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
