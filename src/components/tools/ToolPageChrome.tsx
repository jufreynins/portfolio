import type { CSSProperties, ReactNode } from 'react';
import Container from '@/components/Container';
import Button from '@/components/Button';
import ToolBreadcrumbs from './ToolBreadcrumbs';
import StatusBadge from './StatusBadge';
import ProcessingNote from './ProcessingNote';
import ToolGuideAccordion from './ToolGuideAccordion';
import RelatedTools from './RelatedTools';
import type { Tool } from '@/data/tools';

interface ToolPageChromeCta {
  eyebrow: string;
  /** Omit for the light/soft-card CTA variant, which reads as one paragraph, not a headline. */
  title?: string;
  description: string;
  buttonLabel?: string;
  variant?: 'dark' | 'light';
}

interface ToolPageChromeProps {
  tool: Tool;
  /** Override the standard breadcrumb + badges + H1 + subtitle header entirely — for the
   *  handful of tools with a bespoke identity treatment (fake editor bar, format-badge row,
   *  numbered step strip, browser-address-bar pill). Those flourishes are intentional
   *  per-tool character, not inconsistency to flatten away. */
  header?: ReactNode;
  subtitle?: string;
  children: ReactNode;
  guideTips: string[];
  guideTitle?: string;
  relatedLimit?: number;
  cta: ToolPageChromeCta;
}

/** Shared presentational shell for /tools/* pages — back link/breadcrumb, header, guide
 *  accordion, related tools, and CTA band. The workspace `children` (GradientGenerator,
 *  ImageToolkitWorkspace, etc.) stays a separate, untouched component per tool; this only
 *  unifies the chrome around it. Not a revival of the deliberately-deleted
 *  ToolWorkspaceShell, which unified workspace logic — this unifies presentation only. */
export default function ToolPageChrome({ tool, header, subtitle, children, guideTips, guideTitle, relatedLimit, cta }: ToolPageChromeProps) {
  const ctaVariant = cta.variant ?? 'dark';

  return (
    <div style={{ '--tool-accent': tool.accent, '--tool-accent-soft': tool.accentSoft } as CSSProperties}>
      {header ?? (
        <section className="pt-28 pb-6 sm:pt-32" style={{ background: 'var(--paper-050)' }}>
          <Container className="flex flex-col gap-3">
            <ToolBreadcrumbs category={tool.category} title={tool.title} />
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={tool.status} />
              <ProcessingNote>{tool.processing}</ProcessingNote>
            </div>
            <h1 className="text-xl sm:text-2xl" style={{ color: 'var(--ink-950)' }}>
              {tool.title}
            </h1>
            {subtitle && (
              <p className="max-w-2xl text-sm" style={{ color: 'var(--ink-700)' }}>
                {subtitle}
              </p>
            )}
          </Container>
        </section>
      )}

      <section className="py-7 sm:py-9" style={{ background: 'var(--paper-000)' }}>
        <Container>{children}</Container>
      </section>

      <section className="py-12 sm:py-14" style={{ background: 'var(--paper-050)' }}>
        <Container className="flex flex-col gap-8">
          <ToolGuideAccordion title={guideTitle} tips={guideTips} />
          <RelatedTools currentId={tool.id} limit={relatedLimit} />
        </Container>
      </section>

      {ctaVariant === 'dark' ? (
        <section className="dark-grid-bg py-12 sm:py-14" style={{ background: 'var(--ink-canvas)' }}>
          <Container className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-col gap-1">
              <span className="eyebrow">{cta.eyebrow}</span>
              {cta.title && (
                <h2 className="text-lg sm:text-xl" style={{ color: 'var(--on-dark)' }}>
                  {cta.title}
                </h2>
              )}
              <p className="max-w-xl text-sm" style={{ color: 'rgba(247,245,242,0.75)' }}>
                {cta.description}
              </p>
            </div>
            <Button href="/contact" variant="primary" tone="dark">
              {cta.buttonLabel ?? 'Start a Project'}
            </Button>
          </Container>
        </section>
      ) : (
        <section className="py-12 sm:py-14" style={{ background: 'var(--paper-000)' }}>
          <Container>
            <div
              className="flex flex-wrap items-center justify-between gap-6 rounded-[var(--radius-md)] p-6 sm:p-8"
              style={{ background: 'var(--tool-accent-soft)' }}
            >
              <div className="flex flex-col gap-1">
                <span className="eyebrow">{cta.eyebrow}</span>
                <p className="max-w-xl text-sm" style={{ color: 'var(--ink-950)' }}>
                  {cta.description}
                </p>
              </div>
              <Button href="/contact" variant="primary">
                {cta.buttonLabel ?? 'Start a Project'}
              </Button>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
