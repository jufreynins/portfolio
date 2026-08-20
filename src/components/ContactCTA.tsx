import Container from './Container';
import SectionHeading from './SectionHeading';
import Button from './Button';

interface ContactCTAProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  /** Set when the secondary link is a file download (e.g. the CV PDF) rather than internal nav. */
  secondaryExternal?: boolean;
}

/** One consolidated dark CTA band, reused at the end of every major page instead of each
 *  page hand-rolling its own copy of the same markup. */
export default function ContactCTA({
  eyebrow = "Let's connect",
  title,
  description,
  primaryLabel = 'Contact Me',
  primaryHref = '/contact',
  secondaryLabel,
  secondaryHref,
  secondaryExternal = false,
}: ContactCTAProps) {
  return (
    <section className="dark-grid-bg py-16 sm:py-20 lg:py-24" style={{ background: 'var(--ink-canvas)' }}>
      <Container className="flex flex-col items-start gap-6">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} dark />
        <div className="flex flex-wrap items-center gap-6" data-reveal>
          <Button href={primaryHref} variant="primary" size="large" tone="dark">
            {primaryLabel}
          </Button>
          {secondaryLabel && secondaryHref && (
            <Button href={secondaryHref} variant="ghost" tone="dark" {...(secondaryExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              {secondaryLabel}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
