interface SectionHeadingProps {
  /** @deprecated no longer rendered — the eyebrow-above-heading pattern was dropped
   *  sitewide for shorter, more consistent headings. Kept so call sites keep compiling. */
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  dark?: boolean;
  /** @deprecated no longer rendered — kept so pre-rebuild call sites keep compiling. */
  watermark?: string;
  /** Override the default clamp() size for long headlines. */
  titleClass?: string;
}

export default function SectionHeading({
  title,
  description,
  align = 'left',
  as: Tag = 'h2',
  dark = false,
  titleClass = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={`relative flex flex-col gap-5 ${isCenter ? 'mx-auto max-w-2xl items-center text-center' : ''}`}
      data-reveal
    >
      <div
        className={`flex flex-col gap-3 ${Tag === 'h1' ? 'max-w-3xl' : 'max-w-2xl'} ${isCenter ? 'mx-auto' : ''}`}
      >
        <Tag className={`relative text-balance break-words ${titleClass}`} style={{ color: dark ? 'var(--on-dark)' : 'var(--ink-950)' }}>
          {title}
        </Tag>
        {description && (
          <p className="relative leading-relaxed" style={{ color: dark ? 'var(--on-dark)' : 'var(--ink-700)', opacity: dark ? 0.75 : 1 }}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
