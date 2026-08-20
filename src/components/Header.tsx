'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import Container from './Container';
import Button from './Button';

export default function Header() {
  const currentPath = usePathname();

  const isNavActive = (href: string) => {
    if (!currentPath) return false;
    if (href === '/') return currentPath === '/';
    return currentPath === href || currentPath.startsWith(`${href}/`);
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const header = document.querySelector<HTMLElement>('[data-header]');
    const headerInner = document.querySelector<HTMLElement>('[data-header-inner]');
    const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
    const menu = document.querySelector<HTMLElement>('[data-mobile-menu]');
    const iconOpen = toggle?.querySelector('[data-icon-open]');
    const iconClose = toggle?.querySelector('[data-icon-close]');
    const mobileLinks = menu?.querySelectorAll<HTMLElement>('a') ?? [];

    if (!header) return;

    const closeMenu = () => {
      menu?.classList.add('hidden');
      toggle?.setAttribute('aria-expanded', 'false');
      iconOpen?.classList.remove('hidden');
      iconClose?.classList.add('hidden');
      document.body.classList.remove('no-scroll');
    };

    toggle?.addEventListener(
      'click',
      () => {
        const isOpen = toggle.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
          closeMenu();
        } else {
          menu?.classList.remove('hidden');
          toggle.setAttribute('aria-expanded', 'true');
          iconOpen?.classList.add('hidden');
          iconClose?.classList.remove('hidden');
          document.body.classList.add('no-scroll');
        }
      },
      { signal }
    );

    mobileLinks.forEach((link) => {
      link.addEventListener('click', closeMenu, { signal });
    });

    const onScroll = () => {
      const scrollY = window.scrollY;
      if (headerInner) headerInner.classList.toggle('py-2.5', scrollY > 24);
      if (headerInner) headerInner.classList.toggle('py-4', scrollY <= 24);
      header.classList.toggle('is-scrolled', scrollY > 24);
    };

    window.addEventListener('scroll', onScroll, { signal, passive: true });
    onScroll();

    return () => controller.abort();
  }, []);

  return (
    <header
      id="site-header"
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      data-header
    >
      <div
        className="absolute inset-0 -z-10 border-b"
        style={{ background: 'var(--surface-white)', borderColor: 'var(--border-color)', boxShadow: 'var(--shadow-sm)' }}
      />

      <Container className="flex items-center justify-between py-4 transition-[padding] duration-300" data-header-inner>
        <a href="/" className="site-logo-link flex items-center gap-2.5 text-xl font-heading tracking-tight" style={{ color: 'var(--ink-950)' }} aria-label={`${siteConfig.name} — Home`}>
          <span
            className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] border font-mono text-xs font-medium"
            style={{ background: 'var(--accent-soft)', color: 'var(--accent)', borderColor: 'var(--line)' }}
          >
            {siteConfig.initials}
          </span>
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </a>

        <nav className="hidden lg:flex items-center gap-4" aria-label="Primary">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link relative whitespace-nowrap py-1 text-sm font-medium transition-colors ${
                isNavActive(item.href) ? 'is-active' : ''
              }`}
              style={{ color: isNavActive(item.href) ? 'var(--ink-950)' : 'var(--ink-700)' }}
              aria-current={isNavActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-5">
          <Button href="/contact" variant="primary">
            Let&apos;s Talk
          </Button>
        </div>

        <button
          type="button"
          className="header-mobile-toggle lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-sm)] border"
          style={{ borderColor: 'var(--line)', color: 'var(--ink-950)' }}
          aria-expanded="false"
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
          data-menu-toggle
        >
          <svg data-icon-open xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <svg data-icon-close className="hidden" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </Container>

      <div id="mobile-menu" className="lg:hidden hidden glass mx-4 mb-4 rounded-[var(--radius-md)] px-6 py-6" data-mobile-menu>
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-[var(--radius-sm)] px-3 py-3 text-base font-medium transition-colors"
              style={{
                color: isNavActive(item.href) ? 'var(--ink-950)' : 'var(--ink-700)',
                background: isNavActive(item.href) ? 'var(--paper-100)' : 'transparent',
              }}
              aria-current={isNavActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mt-4 flex flex-col gap-3 border-t pt-4" style={{ borderColor: 'var(--line)' }}>
          <Button href="/contact" variant="primary" className="w-full">
            Let&apos;s Talk
          </Button>
        </div>
      </div>

      <style jsx>{`
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          height: 1.5px;
          width: 0;
          background: var(--accent);
          transition: width 0.25s ease;
        }
        .nav-link:hover::after,
        .nav-link:focus-visible::after,
        .nav-link.is-active::after {
          width: 100%;
        }
      `}</style>
    </header>
  );
}
