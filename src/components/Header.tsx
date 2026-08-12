'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import Container from './Container';
import Button from './Button';

export default function Header() {
  const currentPath = usePathname();
  // Only the homepage hero is designed to sit under a transparent header — every other
  // page's header stays solid from the start so it never has to guess what's behind it.
  const isHome = currentPath === '/';

  const isNavActive = (href: string) => {
    if (!currentPath) return false;
    if (href === '/') return currentPath === '/';
    return currentPath === href || currentPath.startsWith(`${href}/`);
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const header = document.querySelector<HTMLElement>('[data-header]');
    const headerBg = document.querySelector<HTMLElement>('[data-header-bg]');
    const headerInner = document.querySelector<HTMLElement>('[data-header-inner]');
    const progress = document.querySelector<HTMLElement>('[data-scroll-progress]');
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
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

      if (progress) progress.style.width = `${pct}%`;
      if (headerBg) headerBg.style.opacity = isHome ? (scrollY > 24 ? '1' : '0') : '1';
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
        className={`absolute inset-0 -z-10 border-b transition-opacity duration-300 ${isHome ? 'opacity-0' : 'opacity-100'}`}
        style={{ background: 'var(--surface-white)', borderColor: 'var(--border-color)', boxShadow: 'var(--shadow-sm)' }}
        data-header-bg
      />
      <div
        className="absolute bottom-0 left-0 h-px bg-white/0 transition-[width] duration-150 ease-out"
        data-scroll-progress
        style={{ background: 'var(--color-accent)', width: '0%' }}
      />

      <Container className="flex items-center justify-between py-4 transition-[padding] duration-300" data-header-inner>
        <a href="/" className="site-logo-link flex items-center gap-2.5 text-xl font-serif tracking-tight text-zinc-900" aria-label={`${siteConfig.name} — Home`}>
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 font-mono text-xs font-medium"
            style={{ background: 'var(--brand-lavender)', color: 'var(--brand-primary)' }}
          >
            {siteConfig.initials}
          </span>
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </a>

        <nav className="hidden 2xl:flex items-center gap-5" aria-label="Primary">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link relative whitespace-nowrap text-sm font-medium text-zinc-900/70 transition-colors hover:text-zinc-900 py-1 ${
                isNavActive(item.href) ? 'is-active' : ''
              }`}
              aria-current={isNavActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden 2xl:flex items-center gap-2">
          <Button href={siteConfig.cvPath} variant="ghost" target="_blank" rel="noopener noreferrer">
            Download CV
          </Button>
          <Button href="/contact" variant="primary">
            Start a Project
          </Button>
        </div>

        <button
          type="button"
          className="header-mobile-toggle 2xl:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-zinc-900"
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

      <div id="mobile-menu" className="2xl:hidden hidden glass mx-4 mb-4 rounded-2xl px-6 py-6" data-mobile-menu>
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-3 text-base font-medium hover:bg-black/5 ${
                isNavActive(item.href) ? 'text-zinc-900 bg-black/5' : 'text-zinc-900/85 hover:text-zinc-900'
              }`}
              aria-current={isNavActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="mt-4 flex flex-col gap-3 border-t border-black/10 pt-4">
          <Button href={siteConfig.cvPath} variant="secondary" className="w-full" target="_blank" rel="noopener noreferrer">
            Download CV
          </Button>
          <Button href="/contact" variant="primary" className="w-full">
            Start a Project
          </Button>
        </div>
      </div>

      <style jsx>{`
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          height: 2px;
          width: 0;
          background: var(--color-accent);
          transition: width 0.25s ease;
        }
        .nav-link:hover::after,
        .nav-link:focus-visible::after,
        .nav-link.is-active::after {
          width: 100%;
        }
        .nav-link.is-active {
          color: #18181b;
        }
      `}</style>
    </header>
  );
}
