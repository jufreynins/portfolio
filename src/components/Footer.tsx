import { siteConfig } from '@/config/site';
import Container from './Container';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t py-12 sm:py-14" style={{ borderColor: 'var(--border-color)' }}>
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-3">
          <span className="font-serif text-xl" style={{ color: 'var(--text-primary)' }}>
            {siteConfig.name}
          </span>
          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            WordPress and Web Systems Developer
          </span>
          <span className="max-w-xs text-sm" style={{ color: 'var(--text-muted)' }}>
            Websites, browser tools, hosting, DNS, and technical web support.
          </span>
          <span
            className="mt-1 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold"
            style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: 'var(--brand-primary)' }} />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: 'var(--brand-primary)' }} />
            </span>
            Available for new projects
          </span>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer">
          {siteConfig.nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium transition-colors" style={{ color: 'var(--text-secondary)' }}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-[var(--brand-primary)]">
            {siteConfig.email}
          </a>
          <a href={`tel:${siteConfig.phone}`} className="transition-colors hover:text-[var(--brand-primary)]">
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </Container>

      <Container className="mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'var(--border-color)' }}>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          &copy; {year} {siteConfig.name}. All rights reserved.
        </p>
        <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
          Built with Next.js &amp; Tailwind CSS
        </p>
      </Container>
    </footer>
  );
}
