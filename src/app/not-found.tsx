import Container from '@/components/Container';
import Button from '@/components/Button';

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center py-24" style={{ background: 'var(--paper-000)' }}>
      <Container className="flex flex-col items-start gap-6">
        <span className="eyebrow">404 Error</span>
        <h1 style={{ color: 'var(--ink-950)' }}>This page doesn&apos;t exist.</h1>
        <p className="max-w-xl leading-relaxed" style={{ color: 'var(--ink-700)', fontSize: 'var(--text-lead)' }}>
          The page you&apos;re looking for may have been moved or removed. Let&apos;s get you back on track.
        </p>
        <Button href="/" variant="primary">
          Back to Home
        </Button>
      </Container>
    </section>
  );
}
