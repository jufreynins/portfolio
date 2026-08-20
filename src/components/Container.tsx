import type { HTMLAttributes, ReactNode } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export default function Container({ className = '', children, ...rest }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[75rem] px-5 sm:px-6 lg:px-8 ${className}`} {...rest}>
      {children}
    </div>
  );
}
