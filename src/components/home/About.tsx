import FadeIn from '../ui/FadeIn';
import AnimatedText from '../ui/AnimatedText';
import GhostButton from '../ui/GhostButton';
import type { Link } from '../../lib/content';

interface Props { heading: string; paragraph: string; cta: Link }

export default function About({ heading, paragraph, cta }: Props) {
  return (
    <section id="about" className="flex min-h-screen flex-col items-center justify-center bg-ink px-5 py-20 text-center sm:px-8 md:px-10">
      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
            {heading}
          </h2>
        </FadeIn>
        <AnimatedText
          text={paragraph}
          className="max-w-[560px] font-medium leading-relaxed text-cream"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
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
