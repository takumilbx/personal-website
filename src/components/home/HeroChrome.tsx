import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { Link } from '../../lib/content';

interface Props {
  homeHref: string;
  brand: string;
  year: string;
  nav: Link[];
  social: Link[];
  navLabel: string;
  socialLabel: string;
}

const EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';

/** Header, hamburger, and the mobile drawer. Entrance delays follow the brief's schedule. */
export default function HeroChrome({ homeHref, brand, year, nav, social, navLabel, socialLabel }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const reveal = (delay: number, distance = 24) => ({
    transitionDelay: open ? `${delay}ms` : '0ms',
    opacity: open ? 1 : 0,
    transform: open ? 'none' : `translateY(${distance}px)`,
  });

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8">
        <span className="anim-fade-up" style={{ animationDelay: '800ms' }}>
          <a href={homeHref} className="text-[15px] font-medium tracking-[0.02em] text-cream">{brand}</a>
        </span>
        <div className="hidden items-start gap-16 sm:flex lg:gap-24">
          <span className="anim-fade-up text-[13px] text-cream/80" style={{ animationDelay: '900ms' }}>{year}</span>
          <nav aria-label="Site" className="flex flex-col gap-0.5 text-[13px]">
            {nav.map((l, i) => (
              <span key={l.href} className="anim-fade-up" style={{ animationDelay: `${1000 + i * 80}ms` }}>
                <a href={l.href} className="text-cream/90 transition-opacity duration-300 ease-premium hover:opacity-50">{l.label}</a>
              </span>
            ))}
          </nav>
          <nav aria-label="Elsewhere" className="flex flex-col gap-0.5 text-[13px]">
            {social.map((l, i) => (
              <span key={l.href} className="anim-fade-up" style={{ animationDelay: `${1150 + i * 80}ms` }}>
                <a href={l.href} target="_blank" rel="noopener" className="text-cream/90 transition-opacity duration-300 ease-premium hover:opacity-50">{l.label}</a>
              </span>
            ))}
          </nav>
        </div>
      </header>

      <span className="anim-fade-up fixed right-6 top-6 z-50 sm:hidden" style={{ animationDelay: '900ms' }}>
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="site-drawer"
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center transition-opacity duration-300"
          style={{ opacity: open ? 0 : 1, pointerEvents: open ? 'none' : 'auto' }}
        >
          <span className="relative block h-4 w-6">
            <span className="absolute left-0 top-0 h-0.5 w-6 bg-cream transition-transform duration-500" style={{ transitionTimingFunction: EASE, transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span className="absolute left-0 top-[7px] h-0.5 w-6 bg-cream transition-opacity duration-300" style={{ opacity: open ? 0 : 1 }} />
            <span className="absolute bottom-0 left-0 h-0.5 w-6 bg-cream transition-transform duration-500" style={{ transitionTimingFunction: EASE, transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </span>
        </button>
      </span>

      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-500 sm:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside
        id="site-drawer"
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-40 w-[80%] max-w-sm border-l border-cream/10 bg-panel px-8 py-10 transition-transform duration-[600ms] sm:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ transitionTimingFunction: EASE, paddingTop: 'calc(2.5rem + env(safe-area-inset-top, 0px))' }}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="absolute right-6 top-6 z-50 flex h-10 w-10 items-center justify-center text-cream transition-[opacity,transform] duration-300"
          style={{ transform: open ? 'rotate(0deg)' : 'rotate(90deg)', opacity: open ? 1 : 0, transitionDelay: open ? '300ms' : '0ms' }}
          tabIndex={open ? 0 : -1}
        >
          <X size={26} strokeWidth={1.5} />
        </button>

        <p className="text-[10px] uppercase tracking-[0.22em] text-cream/45 transition-[opacity,transform] duration-500" style={reveal(250, 12)}>{navLabel}</p>
        <nav aria-label="Site" className="mt-4 flex flex-col gap-2">
          {nav.map((l, i) => (
            <a key={l.href} href={l.href} tabIndex={open ? 0 : -1} className="text-4xl font-light tracking-[-0.02em] text-cream transition-[opacity,transform] duration-500" style={reveal(300 + i * 80, 24)}>{l.label}</a>
          ))}
        </nav>

        <p className="mt-10 text-[10px] uppercase tracking-[0.22em] text-cream/45 transition-[opacity,transform] duration-500" style={reveal(500, 12)}>{socialLabel}</p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
          {social.map((l, i) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener" tabIndex={open ? 0 : -1} className="text-cream/90 transition-[opacity,transform] duration-500" style={reveal(550 + i * 60, 16)}>{l.label}</a>
          ))}
        </div>
      </aside>
    </>
  );
}
