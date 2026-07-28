import { techCategories } from '@/data/techLogos';

export default function TechGrid() {
  return (
    <div className="flex flex-col gap-4">
      {techCategories.map((cat, i) => (
        <div
          key={cat.category}
          className="capability-row reveal grid grid-cols-1 gap-6 rounded-2xl border p-6 transition-all duration-300 sm:grid-cols-12 sm:items-start sm:p-7"
          data-reveal
          data-reveal-type="fade-up"
          style={{
            animationDelay: `${i * 60}ms`,
            borderColor: 'var(--border-color)',
            background: 'var(--surface-white)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div className="flex items-start gap-4 sm:col-span-5">
            <span className="font-mono text-sm" style={{ color: 'var(--brand-primary)' }}>
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full"
              style={{ background: 'var(--brand-lavender)', color: 'var(--brand-primary)' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                dangerouslySetInnerHTML={{ __html: cat.icon }}
              />
            </span>
            <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
              {cat.category}
            </h3>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 sm:col-span-7 sm:pt-1">
            {cat.items.map((tool) => (
              <div key={tool.name} className="flex items-center gap-2.5">
                <span
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border"
                  style={{ background: 'var(--surface-white)', borderColor: 'var(--border-color)' }}
                >
                  {tool.path ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="13"
                      height="13"
                      fill="currentColor"
                      style={{ color: 'var(--brand-primary)' }}
                      dangerouslySetInnerHTML={{ __html: `<path d="${tool.path}"/>` }}
                    />
                  ) : (
                    <span className="text-[10px] font-semibold" style={{ color: 'var(--brand-primary)' }}>
                      {tool.name.charAt(0)}
                    </span>
                  )}
                </span>
                <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
