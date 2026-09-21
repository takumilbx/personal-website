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

const radius = 'rounded-[40px] sm:rounded-[50px] md:rounded-[60px]';

function Card({ project, index, total, progress, reduce, buttonLabel }: CardProps) {
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  return (
    <div className="sticky top-24 h-[85vh] md:top-32">
      <motion.article
        style={{ scale: reduce ? 1 : scale, top: index * 28 }}
        className={`relative origin-top border-2 border-cream bg-ink p-4 sm:p-6 md:p-8 ${radius}`}
      >
        <div className="flex flex-wrap items-start justify-between gap-4 sm:gap-6">
          <div className="flex min-w-0 items-start gap-4 sm:gap-6">
            <span className="font-black leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }} aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0 pt-1 sm:pt-3">
              <p className="text-xs uppercase tracking-widest text-cream/60 sm:text-sm">{project.category}</p>
              <h3 className="mt-1 font-medium uppercase" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>{project.title}</h3>
            </div>
          </div>
          <GhostButton href={project.href}>{buttonLabel}</GhostButton>
        </div>
        <div className="mt-6 grid grid-cols-[2fr_3fr] gap-3 sm:mt-8 sm:gap-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            <img src={project.images[0]} alt="" loading="lazy" decoding="async" className={`w-full object-cover ${radius}`} style={{ height: 'clamp(130px, 16vw, 230px)' }} />
            <img src={project.images[1]} alt="" loading="lazy" decoding="async" className={`w-full object-cover ${radius}`} style={{ height: 'clamp(160px, 22vw, 340px)' }} />
          </div>
          <img src={project.images[2]} alt="" loading="lazy" decoding="async" className={`h-full w-full object-cover ${radius}`} />
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
    <section id="projects" className="relative z-10 -mt-10 rounded-t-[40px] bg-ink px-5 pb-24 pt-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32">
      <FadeIn y={40}>
        <h2 className="hero-heading mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
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
