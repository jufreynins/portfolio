import type { HTMLAttributes, ReactNode } from 'react';

interface BleedProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/** Full-bleed wrapper for large project imagery — breaks out of Container's text
 *  column up to --canvas-max instead of staying pinned to the 71rem reading width. */
export default function Bleed({ className = '', children, ...rest }: BleedProps) {
  return (
    <div className={`mx-auto w-full max-w-[var(--canvas-max)] px-4 sm:px-6 ${className}`} {...rest}>
      {children}
    </div>
  );
}
