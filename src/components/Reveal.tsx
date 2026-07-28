import type { ElementType, ReactNode } from 'react';

interface RevealProps {
  as?: ElementType;
  type?: 'fade-up' | 'stagger' | 'scale' | 'mask';
  className?: string;
  children?: ReactNode;
}

export default function Reveal({ as: Tag = 'div', type = 'fade-up', className = '', children }: RevealProps) {
  return (
    <Tag className={className} data-reveal data-reveal-type={type}>
      {children}
    </Tag>
  );
}
