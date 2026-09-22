import { useEffect, useRef, type RefObject } from 'react';

interface Item { src: string; alt: string }

/** Two rows of tiles that drift in opposite directions as the page scrolls. */
export default function MediaMarquee({ items }: { items: Item[] }) {
  const section = useRef<HTMLElement>(null);
  const row1 = useRef<HTMLDivElement>(null);
  const row2 = useRef<HTMLDivElement>(null);
  const half = Math.ceil(items.length / 2);
  const first = items.slice(0, half);
  const second = items.slice(half);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const el = section.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - top + window.innerHeight) * 0.3;
      if (row1.current) row1.current.style.transform = `translateX(calc(-33.333% + ${(offset - 200).toFixed(1)}px))`;
      if (row2.current) row2.current.style.transform = `translateX(calc(-33.333% - ${(offset - 200).toFixed(1)}px))`;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const row = (list: Item[], ref: RefObject<HTMLDivElement | null>) => (
    <div ref={ref} className="flex w-max gap-3" style={{ willChange: 'transform', transform: 'translateX(-33.333%)' }}>
      {[...list, ...list, ...list].map((it, i) => (
        <img
          key={i}
          src={it.src}
          alt={i < list.length ? it.alt : ''}
          aria-hidden={i >= list.length ? true : undefined}
          loading="lazy"
          decoding="async"
          width={420}
          height={270}
          className="h-[180px] w-[280px] shrink-0 rounded-xl object-cover ring-1 ring-cream/10 sm:h-[270px] sm:w-[420px]"
        />
      ))}
    </div>
  );

  return (
    <section ref={section} className="overflow-hidden bg-ink pb-10 pt-24 sm:pt-32 md:pt-40" aria-label="Recent media">
      <div className="flex flex-col gap-3">
        {row(first, row1)}
        {row(second, row2)}
      </div>
    </section>
  );
}
