/** Decorative hero graphic — an abstract browser-window wireframe representing "a WordPress
 *  website," not a screenshot of any real project. Pure CSS/tokens, no image asset required.
 *  Distinct from BrowserFrame (which wraps a real project screenshot) and ConceptPlaceholder
 *  (an honest "no screenshot yet" stand-in for a real system) — this one never claims to be
 *  real, so the "no fake dashboards" rule those two follow doesn't apply here. */
export default function HeroWebsiteMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[300px] sm:max-w-sm lg:max-w-none" aria-hidden="true">
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full blur-3xl" style={{ background: 'var(--accent)', opacity: 0.14 }} />

      <div
        className="corner-marks overflow-hidden rounded-[var(--radius-lg)] border"
        style={{ borderColor: 'var(--line)', background: 'var(--paper-050)', boxShadow: 'var(--shadow-lg)', color: 'var(--line-strong)' }}
      >
        <div className="flex items-center gap-1.5 border-b px-4 py-3" style={{ borderColor: 'var(--line)', background: 'var(--paper-000)' }}>
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--line-strong)' }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--line-strong)' }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: 'var(--line-strong)' }} />
          <span
            className="meta-index ml-2 flex-1 truncate rounded-full px-3 py-1 normal-case"
            style={{ background: 'var(--paper-050)', border: '1px solid var(--line)', color: 'var(--ink-400)' }}
          >
            yoursite.com
          </span>
        </div>

        <div className="flex flex-col gap-4 p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <span className="h-2 w-14 rounded-full" style={{ background: 'var(--accent-soft)' }} />
            <div className="flex gap-1.5">
              <span className="h-1.5 w-6 rounded-full" style={{ background: 'var(--line)' }} />
              <span className="h-1.5 w-6 rounded-full" style={{ background: 'var(--line)' }} />
              <span className="h-1.5 w-6 rounded-full" style={{ background: 'var(--line)' }} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="h-3 w-4/5 rounded-full" style={{ background: 'var(--ink-950)', opacity: 0.85 }} />
            <span className="h-3 w-3/5 rounded-full" style={{ background: 'var(--ink-950)', opacity: 0.85 }} />
            <span className="h-2 w-2/3 rounded-full" style={{ background: 'var(--line-strong)' }} />
          </div>

          <span className="h-7 w-24 rounded-[var(--radius-sm)]" style={{ background: 'var(--accent)' }} />

          <div className="mt-1 grid grid-cols-3 gap-2.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-1.5 rounded-[var(--radius-sm)] p-2.5" style={{ background: 'var(--paper-000)', border: '1px solid var(--line)' }}>
                <span className="h-6 w-6 rounded-[var(--radius-xs)]" style={{ background: 'var(--accent-soft)' }} />
                <span className="h-1.5 w-full rounded-full" style={{ background: 'var(--line)' }} />
                <span className="h-1.5 w-2/3 rounded-full" style={{ background: 'var(--line)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="absolute -top-4 -right-4 hidden items-center gap-2 rounded-[var(--radius-md)] border px-3 py-2 sm:flex"
        style={{ background: 'var(--paper-050)', borderColor: 'var(--line)', boxShadow: 'var(--shadow-md)' }}
      >
        <span className="inline-flex h-2 w-2 rounded-full" style={{ background: 'var(--status-success)' }} />
        <span className="meta-index normal-case" style={{ color: 'var(--ink-700)' }}>
          Live on WordPress
        </span>
      </div>

      <div
        className="absolute -bottom-4 -left-4 hidden items-center gap-2 rounded-[var(--radius-md)] border px-3 py-2 sm:flex"
        style={{ background: 'var(--ink-canvas)', borderColor: 'var(--line-strong)', boxShadow: 'var(--shadow-md)' }}
      >
        <span className="font-mono text-xs font-medium" style={{ color: 'var(--on-dark)' }}>
          {'</>'}
        </span>
      </div>
    </div>
  );
}
