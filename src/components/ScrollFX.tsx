'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const EASE = 'power3.out';

function initReveals(reduced: boolean) {
  const els = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  if (!els.length) return;

  if (reduced) {
    gsap.set(els, { clearProps: 'all' });
    return;
  }

  const byType = (type: string) => els.filter((el) => (el.dataset.revealType || 'fade-up') === type);

  const fadeUp = byType('fade-up');
  if (fadeUp.length) {
    gsap.set(fadeUp, { opacity: 0, y: 18 });
    ScrollTrigger.batch(fadeUp, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: EASE, stagger: 0.1 }),
    });
  }

  const scaleEls = byType('scale');
  if (scaleEls.length) {
    gsap.set(scaleEls, { opacity: 0, scale: 0.94 });
    ScrollTrigger.batch(scaleEls, {
      start: 'top 85%',
      once: true,
      onEnter: (batch) => gsap.to(batch, { opacity: 1, scale: 1, duration: 1.1, ease: EASE, stagger: 0.1 }),
    });
  }

  const maskEls = byType('mask');
  maskEls.forEach((el) => {
    gsap.set(el, { clipPath: 'inset(0 0 100% 0)', scale: 0.96 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => gsap.to(el, { clipPath: 'inset(0 0 0% 0)', scale: 1, duration: 1.1, ease: EASE }),
    });
  });

  const staggerEls = byType('stagger');
  staggerEls.forEach((el) => {
    const children = Array.from(el.children) as HTMLElement[];
    if (!children.length) return;
    gsap.set(children, { opacity: 0, y: 20 });
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => gsap.to(children, { opacity: 1, y: 0, duration: 0.8, ease: EASE, stagger: 0.08 }),
    });
  });
}

function initHero(reduced: boolean) {
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
  gsap.set([eyebrow, ...support, scrollCue].filter(Boolean), { opacity: 0, y: 16 });

  const tl = gsap.timeline({ delay: 0.1 });
  if (eyebrow) tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.6, ease: EASE });
  tl.to(lines, { yPercent: 0, duration: 0.9, ease: EASE, stagger: 0.1 }, '-=0.2');
  if (support.length) tl.to(support, { opacity: 1, y: 0, duration: 0.7, ease: EASE, stagger: 0.08 }, '-=0.4');
  if (scrollCue) tl.to(scrollCue, { opacity: 1, y: 0, duration: 0.6, ease: EASE }, '-=0.2');

  // Depth + fade as visitor scrolls away from hero
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
    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      initHero(reduced);
      initReveals(reduced);

      if (reduced) return;

      ScrollTrigger.refresh();
    });

    const onFontsReady = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(onFontsReady);
    window.addEventListener('load', onFontsReady);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener('load', onFontsReady);
    };
  }, []);

  return null;
}
