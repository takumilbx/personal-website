import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import FadeIn from '../ui/FadeIn';
import GhostButton from '../ui/GhostButton';

export interface Project {
  slug: string;
  category: string;
  title: string;
  href: string;
  images: string[];
}

interface CardProps {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
  buttonLabel: string;
}

function Card({ project, index, total, progress, reduce, buttonLabel }: CardProps) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  return (
    <div className="sticky top-24 h-[85vh] md:top-32">
      {/* Outer shell and inner core: a nested enclosure with concentric radii. */}
      <motion.article
        style={{ scale: reduce ? 1 : scale, top: index * 28 }}
        className="relative origin-top rounded-[2rem] border border-cream/10 bg-cream/[0.03] p-1.5"
      >
        <div className="rounded-[calc(2rem-0.375rem)] bg-ink p-5 shadow-[inset_0_1px_0_rgba(239,238,233,0.06)] sm:p-7 md:p-9">
          <div className="flex flex-wrap items-start justify-between gap-5 sm:gap-8">
            <div className="flex min-w-0 items-start gap-5 sm:gap-8">
              <span className="font-light leading-none tracking-[-0.03em] text-cream/40" style={{ fontSize: 'clamp(2rem, 6vw, 5.5rem)' }} aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 pt-1 sm:pt-2">
                <p className="text-[10px] uppercase tracking-[0.22em] text-cream/45 sm:text-[11px]">{project.category}</p>
                <h3 className="mt-2 max-w-[22em] font-medium leading-tight tracking-[-0.02em]" style={{ fontSize: 'clamp(1.25rem, 2.4vw, 2rem)' }}>{project.title}</h3>
              </div>
            </div>
            <GhostButton href={project.href}>{buttonLabel}</GhostButton>
          </div>
          <div className="mt-7 grid grid-cols-[2fr_3fr] gap-3 sm:mt-9 sm:gap-4">
            <div className="flex flex-col gap-3 sm:gap-4">
              <img src={project.images[0]} alt="" loading="lazy" decoding="async" className="w-full rounded-2xl object-cover ring-1 ring-cream/10" style={{ height: 'clamp(130px, 16vw, 230px)' }} />
              <img src={project.images[1]} alt="" loading="lazy" decoding="async" className="w-full rounded-2xl object-cover ring-1 ring-cream/10" style={{ height: 'clamp(160px, 22vw, 340px)' }} />
            </div>
            <img src={project.images[2]} alt="" loading="lazy" decoding="async" className="h-full w-full rounded-2xl object-cover ring-1 ring-cream/10" />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

interface Props { heading: string; buttonLabel: string; items: Project[] }

export default function Projects({ heading, buttonLabel, items }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <section id="projects" className="relative z-10 -mt-8 rounded-t-[32px] bg-ink px-5 pb-28 pt-28 sm:-mt-10 sm:rounded-t-[40px] sm:px-8 md:-mt-12 md:rounded-t-[48px] md:px-10 md:pt-40">
      <FadeIn y={40}>
        <h2 className="hero-heading mb-20 text-center leading-[0.95] sm:mb-24 md:mb-32" style={{ fontSize: 'clamp(2.75rem, 9vw, 8rem)' }}>
          {heading}
        </h2>
      </FadeIn>
      <div ref={ref} className="mx-auto max-w-6xl">
        {items.map((p, i) => (
          <Card key={p.slug} project={p} index={i} total={items.length} progress={scrollYProgress} reduce={!!reduce} buttonLabel={buttonLabel} />
        ))}
      </div>
    </section>
  );
}
