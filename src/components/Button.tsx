import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-[0.9375rem] font-bold transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 min-h-[48px]';

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--brand-primary)] text-[var(--text-on-dark)] hover:bg-[var(--brand-hover)] hover:-translate-y-0.5 active:translate-y-0 shadow-[0_8px_24px_-8px_rgba(103,61,230,0.45)]',
  secondary:
    'bg-[var(--surface-white)] border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-[var(--text-on-dark)] active:translate-y-0',
  ghost: 'text-[var(--text-primary)]/80 hover:text-[var(--brand-primary)]',
};

interface CommonProps {
  variant?: Variant;
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

export default function Button({ href, variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

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
