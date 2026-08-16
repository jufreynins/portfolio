import { CATEGORIES, TOOLS } from '@/data/tools';

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-1"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/** One card per tool category, each listing just the tools within it — replaces the
 *  old searchable/filterable flat grid of every tool card at once. */
export default function ToolCategoryGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {CATEGORIES.map((category) => {
        const tools = TOOLS.filter((tool) => tool.category === category);
        if (!tools.length) return null;

        return (
          <div
            key={category}
            className="flex flex-col gap-1 rounded-[var(--radius-md)] border p-6"
            style={{ borderColor: 'var(--line)', background: 'var(--paper-050)' }}
          >
            <div className="flex items-center justify-between gap-2 pb-3">
              <h3 className="text-lg" style={{ color: 'var(--ink-950)' }}>
                {category}
              </h3>
              <span className="meta-index" style={{ color: 'var(--ink-400)' }}>
                {tools.length}
              </span>
            </div>
            <ul className="flex flex-col divide-y" style={{ borderColor: 'var(--line)' }}>
              {tools.map((tool) => (
                <li key={tool.id}>
                  <a href={tool.href} className="group flex items-center justify-between gap-3 py-2.5 text-sm font-medium transition-colors" style={{ color: 'var(--ink-950)' }}>
                    <span className="transition-colors duration-300 group-hover:text-[var(--accent)]">{tool.title}</span>
                    <Arrow />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
