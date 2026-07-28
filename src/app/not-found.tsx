import Container from '@/components/Container';
import Button from '@/components/Button';

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center py-24">
      <Container className="flex flex-col items-start gap-6">
        <span className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--color-accent)' }}>
          404 Error
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 sm:text-5xl">This page doesn&apos;t exist.</h1>
        <p className="max-w-xl text-lg leading-relaxed" style={{ color: 'var(--color-muted)' }}>
          The page you&apos;re looking for may have been moved or removed. Let&apos;s get you back on track.
        </p>
        <Button href="/" variant="primary">
          Back to Home
        </Button>
      </Container>
    </section>
  );
}
