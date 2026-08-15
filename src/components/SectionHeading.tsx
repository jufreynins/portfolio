interface SectionHeadingProps {
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
  eyebrow,
  title,
  description,
  align = 'left',
  as: Tag = 'h2',
  dark = false,
  titleClass = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center';
  const hairlineColor = dark ? 'rgba(247, 245, 242, 0.3)' : 'var(--line-strong)';

  return (
    <div
      className={`relative flex flex-col gap-5 ${
        isCenter ? 'mx-auto max-w-2xl items-center text-center' : 'lg:grid lg:grid-cols-12 lg:items-baseline lg:gap-8'
      }`}
      data-reveal
    >
      {eyebrow && (
        <div className={`flex items-center gap-3 ${isCenter ? 'justify-center' : 'lg:col-span-3'}`}>
          <span className="h-px w-8 flex-shrink-0" style={{ background: hairlineColor }} />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      )}
      <div
        className={`flex flex-col gap-3 ${eyebrow && !isCenter ? 'lg:col-span-9' : !isCenter ? 'lg:col-span-12' : ''} ${
          Tag === 'h1' ? 'max-w-3xl' : 'max-w-2xl'
        } ${isCenter ? 'mx-auto' : ''}`}
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
