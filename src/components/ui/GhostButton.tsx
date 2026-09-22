import type { ReactNode } from 'react';

interface Props {
  href: string;
  className?: string;
  children: ReactNode;
}

/** The only button style on the home page: a cream hairline pill with a nested arrow. */
export default function GhostButton({ href, className = '', children }: Props) {
  return (
    <a
      href={href}
      className={`group inline-flex min-h-[44px] items-center gap-3 rounded-full border border-cream/40 py-2 pl-6 pr-2 text-[12px] font-medium uppercase tracking-[0.16em] text-cream transition-[border-color,background-color,transform] duration-300 ease-premium hover:border-cream hover:bg-cream/5 active:scale-[0.98] sm:text-[13px] ${className}`}
    >
      <span>{children}</span>
      <span
        className="flex h-7 w-7 items-center justify-center rounded-full bg-cream/10 transition-transform duration-300 ease-premium group-hover:-translate-y-px group-hover:translate-x-px group-hover:scale-105"
        aria-hidden="true"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 9.5 9.5 2.5M4 2.5h5.5V8" />
        </svg>
      </span>
    </a>
  );
}
