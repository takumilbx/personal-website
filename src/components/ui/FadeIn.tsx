import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  children: ReactNode;
}

/** Fades and slides children in the first time they enter the viewport. */
export default function FadeIn({ delay = 0, duration = 0.7, x = 0, y = 30, className, children }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
