import FadeIn from '../ui/FadeIn';

interface Item { name: string; description: string }
interface Props { heading: string; items: Item[] }

export default function Services({ heading, items }: Props) {
  return (
    <section id="services" className="rounded-t-[40px] bg-cream px-5 py-20 text-ink sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <FadeIn y={40}>
        <h2 className="mb-16 text-center font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
          {heading}
        </h2>
      </FadeIn>
      <ol className="mx-auto max-w-5xl divide-y divide-ink/15 border-y border-ink/15">
        {items.map((it, i) => (
          <li key={it.name} className="py-8 sm:py-10 md:py-12">
            <FadeIn delay={i * 0.1}>
              <div className="flex items-start gap-5 sm:gap-10 md:gap-14">
                <span className="font-black leading-none" style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="pt-1 sm:pt-3">
                  <h3 className="font-medium uppercase" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>{it.name}</h3>
                  <p className="mt-2 max-w-2xl font-light leading-relaxed opacity-60" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}>{it.description}</p>
                </div>
              </div>
            </FadeIn>
          </li>
        ))}
      </ol>
    </section>
  );
}
