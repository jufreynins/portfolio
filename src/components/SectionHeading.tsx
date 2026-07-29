interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  dark?: boolean;
  watermark?: string;
  /** Override the default clamp() size for long headlines. */
  titleClass?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  as: Tag = 'h2',
  dark = false,
  watermark,
  titleClass = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';
  const widthClass = Tag === 'h1' ? 'max-w-3xl' : 'max-w-2xl';

  return (
    <div className={`reveal relative flex flex-col gap-3 ${widthClass} ${alignClass}`} data-reveal>
      {watermark && (
        <span
          className={`pointer-events-none absolute -top-5 left-0 -z-0 select-none whitespace-nowrap font-serif text-[3.5rem] leading-none tracking-tight opacity-[0.07] sm:text-[5rem] lg:-top-8 lg:text-[6rem] ${
            align === 'center' ? 'inset-x-0 text-center' : ''
          }`}
          style={{ color: dark ? 'var(--text-on-dark)' : 'var(--text-primary)' }}
          aria-hidden="true"
        >
          {watermark}
        </span>
      )}
      {eyebrow && (
        <div className={`relative flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="h-px w-8" style={{ background: dark ? 'var(--brand-lavender)' : 'var(--brand-primary)' }} />
          <span className="eyebrow" style={dark ? { color: 'var(--brand-lavender)' } : undefined}>
            {eyebrow}
          </span>
        </div>
      )}
      <Tag
        className={`relative text-balance break-words ${titleClass}`}
        style={{ color: dark ? 'var(--text-on-dark)' : 'var(--text-primary)' }}
      >
        {title}
      </Tag>
      {description && (
        <p
          className="relative mt-2 leading-relaxed"
          style={{ color: dark ? 'var(--text-on-dark)' : 'var(--text-secondary)', opacity: dark ? 0.75 : 1 }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
