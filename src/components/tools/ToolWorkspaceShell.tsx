import type { CSSProperties, ReactNode } from 'react';
import Container from '@/components/Container';
import Button from '@/components/Button';
import ToolPrivacyIndicator from '@/components/tools/ToolPrivacyIndicator';
import ToolGuideAccordion from '@/components/tools/ToolGuideAccordion';
import RelatedTools from '@/components/tools/RelatedTools';

interface ToolWorkspaceShellProps {
  toolId: string;
  icon: ReactNode;
  title: string;
  description: string;
  accent: string;
  accentSoft: string;
  children: ReactNode;
  guideTitle?: string;
  guideTips?: string[];
  guideChildren?: ReactNode;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButtonLabel: string;
}

export default function ToolWorkspaceShell({
  toolId,
  icon,
  title,
  description,
  accent,
  accentSoft,
  children,
  guideTitle,
  guideTips,
  guideChildren,
  ctaEyebrow,
  ctaTitle,
  ctaDescription,
  ctaButtonLabel,
}: ToolWorkspaceShellProps) {
  return (
    <div style={{ '--tool-accent': accent, '--tool-accent-soft': accentSoft } as CSSProperties}>
      {/* Compact tool header */}
      <section className="pt-20 pb-6 sm:pt-24 sm:pb-8" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-4">
          <a href="/tools" className="inline-flex w-fit items-center gap-2 text-sm font-medium transition-colors hover:text-zinc-900" style={{ color: 'var(--text-secondary)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Tools
          </a>

          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl" style={{ background: 'var(--tool-accent-soft)', color: 'var(--tool-accent)' }}>
                {icon}
              </span>
              <div className="flex flex-col gap-0.5">
                <h1 className="text-xl font-bold sm:text-2xl" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                  {title}
                </h1>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {description}
                </p>
              </div>
            </div>
            <ToolPrivacyIndicator />
          </div>
        </Container>
      </section>

      {/* Main workspace */}
      <section style={{ background: 'var(--surface-white)' }} className="py-8 sm:py-10">
        <Container className="flex flex-col gap-8">{children}</Container>
      </section>

      {/* Guide + related + CTA */}
      <section style={{ background: 'var(--surface-warm)' }} className="py-10 sm:py-12">
        <Container className="flex flex-col gap-8">
          {(guideTips?.length || guideChildren) && (
            <ToolGuideAccordion title={guideTitle} tips={guideTips}>
              {guideChildren}
            </ToolGuideAccordion>
          )}
          <RelatedTools currentId={toolId} />
        </Container>
      </section>

      <section style={{ background: 'var(--brand-dark)' }} className="dark-grid-bg py-10 sm:py-12">
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="eyebrow" style={{ color: 'var(--brand-lavender)' }}>
              {ctaEyebrow}
            </span>
            <h2 className="text-lg font-bold sm:text-xl" style={{ color: 'var(--text-on-dark)', fontFamily: 'var(--font-heading)' }}>
              {ctaTitle}
            </h2>
            <p className="max-w-xl text-sm" style={{ color: 'var(--text-on-dark)', opacity: 0.75 }}>
              {ctaDescription}
            </p>
          </div>
          <Button href="/contact" variant="primary">
            {ctaButtonLabel}
          </Button>
        </Container>
      </section>
    </div>
  );
}
