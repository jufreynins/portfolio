'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const EASE = 'power3.out';

// Safety net: if a ScrollTrigger callback never fires (layout edge case, script error
// mid-setup, etc.), nothing must stay permanently invisible. This runs regardless of
// whether GSAP init succeeded.
function revealFallback() {
  const selector = '[data-reveal], [data-hero-eyebrow], [data-hero-line], [data-hero-support], [data-scroll-cue]';
  document.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    if (getComputedStyle(el).opacity === '0') {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.clipPath = 'none';
    }
  });
}

function initReveals(reduced: boolean, desktop: boolean) {
  const els = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  if (!els.length) return;

  if (reduced) {
    gsap.set(els, { clearProps: 'all' });
    return;
  }

  const byType = (type: string) => els.filter((el) => (el.dataset.revealType || 'fade-up') === type);

  // fade-up is the one reveal that also runs on mobile — short and cheap.
  const fadeUp = byType('fade-up').concat(desktop ? [] : byType('scale').concat(byType('mask')));
  if (fadeUp.length) {
    gsap.set(fadeUp, { opacity: 0, y: 12 });
    ScrollTrigger.batch(fadeUp, {
      start: 'top 90%',
      once: true,
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.45, ease: EASE, stagger: 0.04 }),
    });
  }

  if (!desktop) {
    // Heavier reveal types are desktop-only; mobile already got them via fade-up above.
    gsap.set(byType('stagger').flatMap((el) => Array.from(el.children) as HTMLElement[]), { clearProps: 'all' });
    return;
  }

  const scaleEls = byType('scale');
  if (scaleEls.length) {
    gsap.set(scaleEls, { opacity: 0, scale: 0.96 });
    ScrollTrigger.batch(scaleEls, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => gsap.to(batch, { opacity: 1, scale: 1, duration: 0.5, ease: EASE, stagger: 0.04 }),
    });
  }

  const maskEls = byType('mask');
  maskEls.forEach((el) => {
    gsap.set(el, { clipPath: 'inset(0 0 100% 0)', scale: 0.98 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => gsap.to(el, { clipPath: 'inset(0 0 0% 0)', scale: 1, duration: 0.5, ease: EASE }),
    });
  });

  const staggerEls = byType('stagger');
  staggerEls.forEach((el) => {
    const children = Array.from(el.children) as HTMLElement[];
    if (!children.length) return;
    gsap.set(children, { opacity: 0, y: 14 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => gsap.to(children, { opacity: 1, y: 0, duration: 0.45, ease: EASE, stagger: 0.04 }),
    });
  });
}

function initHero(reduced: boolean, desktop: boolean) {
  const eyebrow = document.querySelector<HTMLElement>('[data-hero-eyebrow]');
  const lines = gsap.utils.toArray<HTMLElement>('[data-hero-line]');
  const support = gsap.utils.toArray<HTMLElement>('[data-hero-support]');
  const scrollCue = document.querySelector<HTMLElement>('[data-scroll-cue]');

  const targets = [eyebrow, ...lines, ...support].filter(Boolean) as HTMLElement[];
  if (!targets.length) return;

  if (reduced) {
    gsap.set(targets, { clearProps: 'all' });
    if (scrollCue) scrollCue.style.display = 'none';
    return;
  }

  gsap.set(lines, { yPercent: 100 });
  gsap.set([eyebrow, ...support, scrollCue].filter(Boolean), { opacity: 0, y: 12 });

  const tl = gsap.timeline({ delay: 0.05 });
  if (eyebrow) tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.35, ease: EASE });
  tl.to(lines, { yPercent: 0, duration: 0.5, ease: EASE, stagger: 0.05 }, '-=0.15');
  if (support.length) tl.to(support, { opacity: 1, y: 0, duration: 0.4, ease: EASE, stagger: 0.04 }, '-=0.25');
  if (scrollCue) tl.to(scrollCue, { opacity: 1, y: 0, duration: 0.3, ease: EASE }, '-=0.15');

  // Depth + fade as visitor scrolls away from hero — desktop only, matches other
  // scroll-driven decoration in this file being gated behind the same breakpoint.
  if (!desktop) return;

  const heroSection = document.querySelector<HTMLElement>('[data-hero-section]');
  const heroContent = document.querySelector<HTMLElement>('[data-hero-content]');
  const heroBg = document.querySelector<HTMLElement>('[data-hero-bg]');
  if (heroSection && heroContent) {
    gsap.to(heroContent, {
      yPercent: -8,
      opacity: 0.55,
      ease: 'none',
      scrollTrigger: { trigger: heroSection, start: 'top top', end: 'bottom top', scrub: true },
    });
  }
  if (heroSection && heroBg) {
    gsap.to(heroBg, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: { trigger: heroSection, start: 'top top', end: 'bottom top', scrub: true },
    });
  }
}

export default function ScrollFX() {
  useEffect(() => {
    const fallbackTimer = window.setTimeout(revealFallback, 2500);

    let ctx: gsap.Context | undefined;
    let onFontsReady: (() => void) | undefined;

    try {
      gsap.registerPlugin(ScrollTrigger);

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const desktop = window.matchMedia('(min-width: 1024px)').matches;

      ctx = gsap.context(() => {
        initHero(reduced, desktop);
        initReveals(reduced, desktop);

        if (reduced) return;

        ScrollTrigger.refresh();
      });

      onFontsReady = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(onFontsReady);
      window.addEventListener('load', onFontsReady);
    } catch {
      revealFallback();
    }

    return () => {
      window.clearTimeout(fallbackTimer);
      ctx?.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      if (onFontsReady) window.removeEventListener('load', onFontsReady);
    };
  }, []);

  return null;
}
