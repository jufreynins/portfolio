import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import SectionHeading from '@/components/SectionHeading';
import ProjectModal from '@/components/ProjectModal';
import { ProjectModalProvider } from '@/components/ProjectModalContext';
import PortfolioFilterGrid from '@/components/PortfolioFilterGrid';
import { siteConfig } from '@/config/site';
import { projects } from '@/data/projects';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `Selected Websites & Client Work — ${siteConfig.name}`,
  description: 'Real WordPress websites built for businesses, agencies, and nonprofits — from marketing agencies to e-commerce and community organizations.',
  canonical: `${siteConfig.url}/portfolio`,
});

export default function PortfolioPage() {
  return (
    <>
      <section className="pt-24 pb-10 sm:pt-28 sm:pb-12" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-4">
          <SectionHeading
            as="h1"
            eyebrow="Portfolio"
            title="Selected WordPress projects."
            description="Real client work — the business need, my contribution, and the WordPress technology behind each site."
          />
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Every project below is completed client work. Looking for personal projects instead? See{' '}
            <a href="/personal-projects" className="font-medium underline" style={{ color: 'var(--brand-primary)' }}>
              Personal Projects
            </a>
            .
          </p>
        </Container>
      </section>

      <ProjectModalProvider>
        <section className="pb-14 sm:pb-16" style={{ background: 'var(--surface-white)' }}>
          <Container>
            <PortfolioFilterGrid projects={projects} />
          </Container>
          <ProjectModal />
        </section>
      </ProjectModalProvider>

      {/* Personal Projects & Tools cross-sell (after client work, visually distinct) */}
      <section className="border-t py-12 sm:py-14" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-8">
          <SectionHeading eyebrow="Also Explore" title="Personal Projects & Tools" description="Personal system concepts and browser-based tools — separate from the client work above." />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <a href="/personal-projects" className="lab-card flex flex-col gap-4 rounded-2xl border p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)', boxShadow: 'var(--shadow-sm)' }} data-reveal>
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full" style={{ background: 'var(--brand-lavender)', color: 'var(--brand-primary)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="9" rx="1" />
                    <rect x="14" y="3" width="7" height="5" rx="1" />
                    <rect x="14" y="12" width="7" height="9" rx="1" />
                    <rect x="3" y="16" width="7" height="5" rx="1" />
                  </svg>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>
                  Personal Concept
                </span>
              </div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                Personal Projects
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Personal system concepts and prototypes for task management, inventory, and internal operations.
              </p>
            </a>
            <a href="/tools" className="lab-card flex flex-col gap-4 rounded-2xl border p-6" style={{ borderColor: 'var(--border-color)', background: 'var(--surface-white)', boxShadow: 'var(--shadow-sm)' }} data-reveal>
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full" style={{ background: 'var(--brand-lavender)', color: 'var(--brand-primary)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a2 2 0 0 0 3 3l6-6a4 4 0 0 0 5.4-5.4l-3 3-2-2 3-3Z" />
                  </svg>
                </span>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wide"
                  style={{ borderColor: 'color-mix(in srgb, var(--color-success) 35%, white)', color: 'var(--color-success)', background: 'var(--color-success-soft)' }}
                >
                  Free Tool
                </span>
              </div>
              <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                Tools
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Small privacy-focused utilities such as image conversion, with more planned.
              </p>
            </a>
          </div>
        </Container>
      </section>

      <section className="dark-grid-bg py-14 sm:py-16" style={{ background: 'var(--brand-dark)' }}>
        <Container className="flex flex-col items-start gap-6">
          <SectionHeading eyebrow="Let's build something" title="Ready to start a project?" description="Tell me a bit about what you're building. I typically reply within one business day." dark />
          <Button href="/contact" variant="primary" size="large">
            Start a Project
          </Button>
        </Container>
      </section>
    </>
  );
}
