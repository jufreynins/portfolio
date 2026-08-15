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
  title: `Personal Projects — ${siteConfig.name}`,
  description: 'Personal web system concepts and live deployments — clearly labeled experiments outside client work, not existing production systems.',
  canonical: `${siteConfig.url}/personal-projects`,
});

export default function WebSystemsPage() {
  return (
    <>
      <section className="pt-28 pb-12 sm:pt-32 sm:pb-14" style={{ background: 'var(--paper-000)' }}>
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Personal Projects"
            title="Personal systems, outside client work."
            description="A mix of live personal deployments and concept designs for internal tools — clearly labeled, never existing client or production systems."
          />
        </Container>
      </section>

      <section className="py-14 sm:py-16" style={{ background: 'var(--paper-000)' }}>
        <Container className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {systems.map((system, i) => {
            const status = systemStatusStyle[system.status];
            return (
              <div
                key={system.slug}
                className="flex flex-col gap-4 rounded-[var(--radius-md)] border p-6 transition-colors duration-300 hover:border-[var(--line-strong)]"
                style={{ borderColor: 'var(--line)', background: 'var(--paper-050)' }}
                data-reveal
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <span className="eyebrow">{system.category}</span>
                    <h3 className="text-xl" style={{ color: 'var(--ink-950)' }}>
                      {system.name}
                    </h3>
                  </div>
                  <span
                    className="meta-index inline-flex flex-shrink-0 items-center gap-1.5 rounded-full border px-3 py-1"
                    style={{ borderColor: status.border, color: status.color, background: status.bg }}
                  >
                    {system.status}
                  </span>
                </div>

                {system.screenshot ? (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius-sm)] border" style={{ borderColor: 'var(--line)' }}>
                    <Image src={system.screenshot} alt={`${system.name} dashboard screenshot`} className="h-full w-full object-cover object-top" />
                  </div>
                ) : (
                  <SystemPreview routeLabel={system.routeLabel} activeNav={i % 4} />
                )}

                <p className="meta-index" style={{ color: 'var(--ink-400)' }}>
                  Built for: {system.users}
                </p>

                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-700)' }}>
                  {system.problem}
                </p>

                <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {system.modules.map((feature) => (
                    <li key={feature} className="flex items-center gap-1.5 text-sm" style={{ color: 'var(--ink-950)' }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="flex-shrink-0"
                        style={{ color: 'var(--accent)' }}
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <p className="meta-index" style={{ color: 'var(--ink-400)' }}>
                  Tech direction: {system.techDirection}
                </p>

                <div className="mt-1 flex flex-wrap items-center gap-6">
                  <Button href={`/personal-projects/${system.slug}`} variant="secondary">
                    View Details
                  </Button>
                  {system.href && (
                    <Button href={system.href} variant="ghost" target="_blank" rel="noopener noreferrer">
                      Visit Live Demo
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      <section className="py-14 sm:py-16" style={{ background: 'var(--paper-050)' }}>
        <Container className="flex flex-col items-start gap-5">
          <span className="eyebrow">Need something similar?</span>
          <p className="max-w-xl leading-relaxed" style={{ color: 'var(--ink-700)' }}>
            If a workflow like this sounds familiar — spreadsheets, email threads, or disconnected tools — tell me about it and I&apos;ll recommend a practical next step.
          </p>
          <div className="flex flex-wrap items-center gap-6">
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
