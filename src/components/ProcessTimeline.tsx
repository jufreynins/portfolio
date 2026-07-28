'use client';

import { useEffect } from 'react';
import ProcessVisual from './ProcessVisual';

interface Step {
  title: string;
  description: string;
  type: 'discover' | 'plan' | 'design-build' | 'test-refine';
}

interface ProcessTimelineProps {
  steps: Step[];
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    let observer: IntersectionObserver | null = null;

    const root = document.querySelector<HTMLElement>('[data-process-timeline]');
    if (!root) return;

    const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-process-row]'));
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-process-node]'));
    const track = root.querySelector<HTMLElement>('[data-process-track]');
    const fill = root.querySelector<HTMLElement>('[data-process-fill]');
    if (!rows.length || !track || !fill || nodes.length < 2) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const measure = () => {
      const rootRect = root.getBoundingClientRect();
      const firstRect = nodes[0].getBoundingClientRect();
      const lastRect = nodes[nodes.length - 1].getBoundingClientRect();
      const top = firstRect.top - rootRect.top + firstRect.height / 2;
      const bottom = lastRect.top - rootRect.top + lastRect.height / 2;
      track.style.top = `${top}px`;
      track.style.height = `${Math.max(0, bottom - top)}px`;
      fill.style.top = `${top}px`;
      fill.style.height = `${Math.max(0, bottom - top)}px`;
    };

    measure();
    window.addEventListener('resize', measure, { signal });

    if (reduced) {
      fill.style.transform = 'scaleY(1)';
      rows[0]?.classList.add('is-active');
      return () => controller.abort();
    }

    let ticking = false;
    const updateFill = () => {
      ticking = false;
      const first = nodes[0].getBoundingClientRect();
      const last = nodes[nodes.length - 1].getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const span = last.top - first.top;
      const progress = span > 0 ? Math.min(1, Math.max(0, (viewportCenter - first.top) / span)) : 0;
      fill.style.transform = `scaleY(${progress})`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateFill);
      }
    };

    window.addEventListener('scroll', onScroll, { signal, passive: true });
    updateFill();

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            rows.forEach((row) => row.classList.toggle('is-active', row === target));
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    rows.forEach((row) => observer?.observe(row));

    return () => {
      controller.abort();
      observer?.disconnect();
    };
  }, []);

  return (
    <div className="relative" data-process-timeline>
      <div className="absolute w-0.5" data-process-track style={{ left: '27px', background: 'rgba(255,255,255,0.12)' }} />
      <div className="absolute w-0.5 origin-top" data-process-fill style={{ left: '27px', background: 'var(--brand-primary)', transform: 'scaleY(0)' }} />

      <div className="flex flex-col">
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="process-row relative flex flex-col gap-5 border-b py-9 transition-colors duration-500 sm:flex-row sm:items-center sm:gap-8"
            style={{ borderColor: 'rgba(255,255,255,0.12)' }}
            data-process-row
          >
            <span
              className="process-node relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border font-mono text-sm transition-all duration-500"
              data-process-node
              style={{ borderColor: 'rgba(255,255,255,0.35)', color: 'rgba(255,255,255,0.8)' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            <div className="flex flex-1 flex-col gap-2.5">
              <h3 className="process-title text-xl transition-colors duration-500 sm:text-2xl" style={{ color: 'rgba(255,255,255,0.82)' }}>
                {step.title}
              </h3>
              <p className="process-desc max-w-sm text-sm leading-relaxed transition-colors duration-500" style={{ color: 'rgba(224,218,240,0.85)' }}>
                {step.description}
              </p>
            </div>

            <div className="process-visual h-24 w-full flex-shrink-0 opacity-50 transition-all duration-500 sm:h-28 sm:w-44">
              <ProcessVisual type={step.type} uid={`row-${i}`} />
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .process-row:last-child {
          border-bottom: none;
        }
        .process-row.is-active {
          background: rgba(67, 39, 128, 0.18);
        }
        .process-row.is-active .process-node {
          background: var(--brand-primary);
          border-color: var(--brand-primary);
          color: #ffffff;
        }
        .process-row.is-active .process-title {
          color: #ffffff;
        }
        .process-row.is-active .process-desc {
          color: #ffffff;
          opacity: 0.85;
        }
        .process-row.is-active .process-visual {
          opacity: 1;
          transform: translateY(-4px);
        }
      `}</style>
    </div>
  );
}
