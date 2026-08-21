import { getTechLogo } from '@/data/techLogos';

interface TechBadgeProps {
  name: string;
}

const monogram = (name: string) =>
  name
    .replace(/[^A-Za-z0-9]/g, '')
    .slice(0, 2)
    .toUpperCase();

/** Tech-stack pill — brand logo mark when one exists in techLogos.ts, otherwise a plain
 *  monogram in the site's accent color. Used on the homepage Stack section and the
 *  /services Tools and technologies section so both share one look. */
export default function TechBadge({ name }: TechBadgeProps) {
  const logo = getTechLogo(name);

  return (
    <span
      className="meta-index inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 normal-case"
      style={{ borderColor: 'var(--line)', color: 'var(--ink-700)' }}
    >
      {logo ? (
        <svg viewBox="0 0 24 24" width="14" height="14" fill={`#${logo.hex}`} aria-hidden="true">
          <path d={logo.path} />
        </svg>
      ) : (
        <span
          className="flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full text-[7px] font-bold"
          style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
          aria-hidden="true"
        >
          {monogram(name)}
        </span>
      )}
      {name}
    </span>
  );
}
