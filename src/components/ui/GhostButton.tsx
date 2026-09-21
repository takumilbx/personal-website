import type { ReactNode } from 'react';

interface Props {
  href: string;
  className?: string;
  children: ReactNode;
}

/** The only button style on the home page: a cream outline pill. */
export default function GhostButton({ href, className = '', children }: Props) {
  return (
    <a
      href={href}
      className={`inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-cream px-8 py-3 text-sm font-medium uppercase tracking-widest text-cream transition-[background-color,transform] duration-200 hover:bg-cream/10 active:scale-[0.98] sm:px-10 sm:py-3.5 sm:text-base ${className}`}
    >
      {children}
    </a>
  );
}
