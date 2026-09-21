import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef, type CSSProperties } from 'react';

function Char({ char, progress, range }: { char: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block">
      <span className="opacity-20">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>{char}</motion.span>
    </span>
  );
}

interface Props {
  text: string;
  className?: string;
  style?: CSSProperties;
}

/** Reveals a paragraph character by character as it scrolls through the viewport. */
export default function AnimatedText({ text, className, style }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });

  if (reduce) {
    return <p ref={ref} className={className} style={style}>{text}</p>;
  }

  const total = text.length;
  let index = 0;
  return (
    <p ref={ref} className={className} style={style}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(' ').map((word, wi) => {
          const start = index;
          index += word.length + 1;
          return (
            <span key={wi} className="mr-[0.28em] inline-block whitespace-nowrap">
              {Array.from(word).map((ch, ci) => {
                const i = start + ci;
                return <Char key={ci} char={ch} progress={scrollYProgress} range={[i / total, (i + 1) / total]} />;
              })}
            </span>
          );
        })}
      </span>
    </p>
  );
}
