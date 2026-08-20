import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'default' | 'large';
type Tone = 'light' | 'dark';

const base =
  'group relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-bold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2';

const sizes: Record<Size, string> = {
  default: 'px-5 py-2.5 text-sm min-h-[44px]',
  large: 'px-6 py-3 text-[0.9375rem] min-h-[48px]',
};

const ghostBase =
  'gap-1.5 rounded-none bg-[linear-gradient(var(--accent),var(--accent))] bg-no-repeat bg-left-bottom bg-[length:0%_1px] pb-0.5 transition-[background-size,color] duration-300 hover:bg-[length:100%_1px] min-h-0 px-0 py-0';

// Pill treatment for the dark tone's ghost variant, cloned from the reference site's
// .btn-ghost-white (white/10 bg, white/30 border, backdrop-blur) — used specifically on
// dark surfaces like ContactCTA's band, where a plain underline link reads too quiet.
const ghostDark =
  'rounded-[var(--radius-md)] gap-1.5 px-5 py-2.5 min-h-[44px] border border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.1)] backdrop-blur-sm text-[var(--on-dark)] hover:bg-[rgba(255,255,255,0.18)] active:translate-y-0';

// Two tones because the same variant needs opposite treatment on the ink-canvas dark
// sections (Process, Final CTA, Contact) vs. the paper-000 light sections — a plain
// ink-950 "primary" button would nearly disappear against an equally dark background.
const variantsByTone: Record<Tone, Record<Variant, string>> = {
  light: {
    primary:
      'rounded-[var(--radius-md)] bg-[var(--accent)] text-[var(--on-accent)] hover:bg-[var(--accent-ink)] hover:-translate-y-0.5 active:translate-y-0 shadow-[var(--shadow-sm)]',
    secondary:
      'rounded-[var(--radius-md)] bg-transparent border border-[var(--line-strong)] text-[var(--ink-950)] hover:border-[var(--accent)] hover:text-[var(--accent)] active:translate-y-0',
    ghost: `${ghostBase} text-[var(--ink-700)] hover:text-[var(--ink-950)]`,
  },
  dark: {
    primary:
      'rounded-[var(--radius-md)] bg-[var(--accent)] text-[var(--on-accent)] hover:bg-[var(--accent-ink)] hover:-translate-y-0.5 active:translate-y-0 shadow-[var(--shadow-brand)]',
    secondary:
      'rounded-[var(--radius-md)] bg-transparent border border-[rgba(247,245,242,0.3)] text-[var(--on-dark)] hover:border-[var(--accent)] hover:text-[var(--accent)] active:translate-y-0',
    ghost: ghostDark,
  },
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  tone?: Tone;
  className?: string;
  children?: ReactNode;
  [dataAttr: `data-${string}`]: unknown;
}

type ButtonProps =
  | (CommonProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className'>)
  | (CommonProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>);

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-all duration-300 group-hover:translate-x-1"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

export default function Button({ href, variant = 'primary', size = 'default', tone = 'light', className = '', children, ...rest }: ButtonProps) {
  const sizeClasses = variant === 'ghost' ? 'text-sm' : sizes[size];
  const classes = `${base} ${sizeClasses} ${variantsByTone[tone][variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
        <Arrow />
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      <Arrow />
    </button>
  );
}
