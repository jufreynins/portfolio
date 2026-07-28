'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useProjectModal } from './ProjectModalContext';

export default function ProjectModal() {
  const { activeProject, closeProject } = useProjectModal();
  const panelRef = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  // Close on route change, same as the old astro:before-preparation hook.
  useEffect(() => {
    closeProject();
    // Deliberately reacting to pathname changes only, not closeProject identity.
  }, [pathname]);

  useEffect(() => {
    if (!activeProject) return;

    lastTrigger.current = document.activeElement as HTMLElement;
    document.body.classList.add('no-scroll');

    const getFocusable = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );

    const focusable = getFocusable();
    (focusable[0] ?? null)?.focus();

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeProject();
        return;
      }
      if (e.key === 'Tab') {
        const items = getFocusable();
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeydown);
    return () => {
      document.removeEventListener('keydown', onKeydown);
      document.body.classList.remove('no-scroll');
      lastTrigger.current?.focus();
    };
  }, [activeProject, closeProject]);

  return (
    <div
      className="project-modal fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label="Project details"
      hidden={!activeProject}
      style={{ display: activeProject ? 'flex' : 'none' }}
    >
      <div className="absolute inset-0" style={{ background: 'rgba(19,11,36,0.65)' }} onClick={closeProject} />

      <div
        ref={panelRef}
        className="project-modal-panel relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-y-auto rounded-2xl p-6 sm:p-8"
        style={{ background: 'var(--surface-white)' }}
      >
        <button
          type="button"
          onClick={closeProject}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border"
          style={{ borderColor: 'var(--border-color)', color: 'var(--brand-ink)', background: 'var(--surface-white)' }}
          aria-label="Close project details"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {activeProject && (
          <div className="flex flex-col gap-6">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl" style={{ background: 'var(--surface-warm)' }}>
              <Image
                src={activeProject.image}
                alt={`Screenshot of the ${activeProject.name} website`}
                width={1200}
                height={675}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col gap-2">
              <span className="eyebrow">{activeProject.category}</span>
              <h3 className="text-3xl" style={{ color: 'var(--text-primary)' }}>
                {activeProject.name}
              </h3>
              <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {activeProject.description}
              </p>
            </div>

            <dl className="grid grid-cols-1 gap-5 border-t pt-6 hairline sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <dt className="eyebrow" style={{ color: 'var(--text-secondary)' }}>
                  Role
                </dt>
                <dd className="text-sm" style={{ color: 'var(--text-primary)' }}>
                  {activeProject.role}
                </dd>
              </div>
              <div className="flex flex-col gap-1.5">
                <dt className="eyebrow" style={{ color: 'var(--text-secondary)' }}>
                  Business Objective
                </dt>
                <dd className="text-sm" style={{ color: 'var(--text-primary)' }}>
                  {activeProject.goal}
                </dd>
              </div>
              <div className="flex flex-col gap-1.5">
                <dt className="eyebrow" style={{ color: 'var(--text-secondary)' }}>
                  Work Delivered
                </dt>
                <dd className="text-sm" style={{ color: 'var(--text-primary)' }}>
                  {activeProject.contribution}
                </dd>
              </div>
              <div className="flex flex-col gap-1.5">
                <dt className="eyebrow" style={{ color: 'var(--text-secondary)' }}>
                  Results
                </dt>
                <dd className="text-sm" style={{ color: 'var(--text-primary)' }}>
                  {activeProject.results}
                </dd>
              </div>
            </dl>

            <div className="flex flex-wrap gap-2">
              {activeProject.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{ background: 'var(--surface-warm)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={activeProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex w-fit min-h-[48px] items-center justify-center gap-1.5 rounded-full px-6 text-[0.9375rem] font-bold transition-colors duration-300"
              style={{ background: 'var(--brand-primary)', color: 'var(--text-on-dark)' }}
            >
              Visit Live Website
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
