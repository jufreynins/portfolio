import { siteConfig } from '@/config/site';
import Container from './Container';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t py-12 sm:py-14" style={{ borderColor: 'var(--line)' }}>
      <Container className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-heading text-xl" style={{ color: 'var(--ink-950)' }}>
            {siteConfig.name}
          </span>
          <span className="text-sm font-medium" style={{ color: 'var(--ink-700)' }}>
            WordPress Developer &amp; Website Technical Specialist
          </span>
        </div>

        <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer">
          {siteConfig.nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium transition-colors" style={{ color: 'var(--ink-700)' }}>
              {item.label}
            </a>
          ))}
          <a href="/systems" className="text-sm font-medium transition-colors" style={{ color: 'var(--ink-700)' }}>
            Systems
          </a>
        </nav>

        <div className="flex flex-col gap-2.5 text-sm" style={{ color: 'var(--ink-700)' }}>
          <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-[var(--accent)]">
            {siteConfig.email}
          </a>
          <a href={`tel:${siteConfig.phone}`} className="transition-colors hover:text-[var(--accent)]">
            {siteConfig.phoneDisplay}
          </a>
        </div>
      </Container>

      <Container className="mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'var(--line)' }}>
        <p className="text-sm" style={{ color: 'var(--ink-400)' }}>
          &copy; {year} {siteConfig.name}. All rights reserved.
        </p>
        <p className="meta-index">Built with Next.js &amp; Tailwind CSS</p>
      </Container>
    </footer>
  );
}
