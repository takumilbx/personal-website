import { useEffect, useRef, type ReactNode } from 'react';

interface Props {
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
  children: ReactNode;
}

/** Moves its children a fraction of the cursor's offset from their centre. Pointer devices only. */
export default function Magnet({
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)',
  inactiveTransition = 'transform 0.7s cubic-bezier(0.32, 0.72, 0, 1)',
  className,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let active = false;
    const reset = () => {
      active = false;
      el.style.transition = inactiveTransition;
      el.style.transform = 'translate3d(0, 0, 0)';
    };
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const within =
        e.clientX > r.left - padding && e.clientX < r.right + padding &&
        e.clientY > r.top - padding && e.clientY < r.bottom + padding;
      if (within) {
        const dx = (e.clientX - (r.left + r.width / 2)) / strength;
        const dy = (e.clientY - (r.top + r.height / 2)) / strength;
        active = true;
        el.style.transition = activeTransition;
        el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
      } else if (active) {
        reset();
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', reset);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', reset);
    };
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}
