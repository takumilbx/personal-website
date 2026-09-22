import FadeIn from '../ui/FadeIn';
import AnimatedText from '../ui/AnimatedText';
import GhostButton from '../ui/GhostButton';
import type { Link } from '../../lib/content';

interface Props { heading: string; paragraph: string; cta: Link }

export default function About({ heading, paragraph, cta }: Props) {
  return (
    <section id="about" className="flex min-h-[100dvh] flex-col items-center justify-center bg-ink px-5 py-28 text-center sm:px-8 md:px-10 md:py-40">
      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn y={40}>
          <h2 className="hero-heading leading-[0.95]" style={{ fontSize: 'clamp(2.75rem, 9vw, 8rem)' }}>
            {heading}
          </h2>
        </FadeIn>
        <AnimatedText
          text={paragraph}
          className="max-w-[34em] font-normal leading-[1.5] tracking-[-0.01em] text-cream"
          style={{ fontSize: 'clamp(1.125rem, 1.8vw, 1.5rem)' }}
        />
      </div>
      <div className="mt-16 sm:mt-20 md:mt-24">
        <FadeIn delay={0.15}>
          <GhostButton href={cta.href}>{cta.label}</GhostButton>
        </FadeIn>
      </div>
    </section>
  );
}
