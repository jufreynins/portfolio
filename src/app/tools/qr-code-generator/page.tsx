import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Container from '@/components/Container';
import Button from '@/components/Button';
import ToolBreadcrumbs from '@/components/tools/ToolBreadcrumbs';
import StatusBadge from '@/components/tools/StatusBadge';
import ProcessingNote from '@/components/tools/ProcessingNote';
import ToolGuideAccordion from '@/components/tools/ToolGuideAccordion';
import RelatedTools from '@/components/tools/RelatedTools';
import QrCodeGenerator from '@/components/tools/QrCodeGenerator';
import { siteConfig } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: `QR Code Generator | ${siteConfig.name}`,
  description: 'Create a QR code for a URL, text, email, phone number, or Wi-Fi network, styled and ready to download as PNG or SVG.',
  canonical: `${siteConfig.url}/tools/qr-code-generator`,
});

const TOOL_ACCENT = '#1e293b';
const TOOL_ACCENT_SOFT = '#e9ecf0';

const guideTips = [
  'Higher error correction lets a QR code still scan if part of it is damaged or covered — useful if you plan to add branding around it.',
  'Very low contrast between foreground and background colors can make a code unreliable to scan — keep it high-contrast.',
  'SVG downloads stay crisp at any print size; PNG is simpler for quick digital use.',
  'The Wi-Fi format follows the standard used by phone camera apps to auto-join a network.',
];

export default function QrCodeGeneratorPage() {
  return (
    <div style={{ '--tool-accent': TOOL_ACCENT, '--tool-accent-soft': TOOL_ACCENT_SOFT } as CSSProperties}>
      <section className="pt-20 pb-5 sm:pt-24" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-3">
          <ToolBreadcrumbs category="Image & Media" title="QR Code Generator" />
          <div className="flex flex-wrap items-center gap-3">
            <StatusBadge status="Available" />
            <ProcessingNote>Runs locally in your browser</ProcessingNote>
          </div>
          <h1 className="text-xl font-bold sm:text-2xl" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
            QR Code Generator
          </h1>
          <p className="max-w-2xl text-sm" style={{ color: 'var(--text-secondary)' }}>
            Create a QR code for a URL, text, email, phone number, or Wi-Fi network, styled and ready to download.
          </p>
        </Container>
      </section>

      <section className="py-6 sm:py-8" style={{ background: 'var(--surface-white)' }}>
        <Container>
          <QrCodeGenerator />
        </Container>
      </section>

      <section className="py-10 sm:py-12" style={{ background: 'var(--surface-warm)' }}>
        <Container className="flex flex-col gap-8">
          <ToolGuideAccordion title="How it works" tips={guideTips} />
          <RelatedTools currentId="qr-code-generator" />
        </Container>
      </section>

      <section className="dark-grid-bg py-10 sm:py-12" style={{ background: 'var(--brand-dark)' }}>
        <Container className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <span className="eyebrow" style={{ color: 'var(--brand-lavender)' }}>
              Need this on printed materials?
            </span>
            <h2 className="text-lg font-bold sm:text-xl" style={{ color: 'var(--text-on-dark)', fontFamily: 'var(--font-heading)' }}>
              Need branded assets or print materials designed?
            </h2>
            <p className="max-w-xl text-sm" style={{ color: 'var(--text-on-dark)', opacity: 0.75 }}>
              I can build branded landing pages and assets to pair with print and marketing materials.
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
