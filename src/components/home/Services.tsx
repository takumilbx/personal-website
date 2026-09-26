import FadeIn from '../ui/FadeIn';

interface Item { name: string; description: string }
interface Props { heading: string; items: Item[] }

/** Tag each word of a mixed-script heading with its language so Thai and Japanese get their own spacing. */
function scriptSpans(text: string) {
  return text.split(' ').map((word, i) => {
    const lang = /[฀-๿]/.test(word) ? 'th' : /[぀-ヿ一-鿿]/.test(word) ? 'ja' : undefined;
    return (
      <span key={i} lang={lang} className="mx-[0.18em] inline-block">
        {word}
      </span>
    );
  });
}

export default function Services({ heading, items }: Props) {
  return (
    <section id="services" className="rounded-t-[32px] bg-cream px-5 py-28 text-ink sm:rounded-t-[40px] sm:px-8 md:rounded-t-[48px] md:px-10 md:py-40">
      <FadeIn y={40}>
        <h2 className="mb-20 text-center font-medium leading-[1.1] tracking-[-0.03em] sm:mb-24 md:mb-32" style={{ fontSize: 'clamp(2.75rem, 9vw, 8rem)' }}>
          {scriptSpans(heading)}
        </h2>
      </FadeIn>
      <ol className="mx-auto max-w-5xl divide-y divide-ink/10 border-y border-ink/10">
        {items.map((it, i) => (
          <li key={it.name} className="py-9 sm:py-12 md:py-14">
            <FadeIn delay={i * 0.08}>
              <div className="grid grid-cols-[3.5rem_1fr] items-start gap-5 sm:grid-cols-[8rem_1fr] sm:gap-10 md:grid-cols-[10rem_1fr] md:gap-14">
                <span className="font-light leading-none tracking-[-0.03em] text-ink/35" style={{ fontSize: 'clamp(2rem, 6vw, 5.5rem)' }} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="pt-1 sm:pt-2">
                  <h3 className="font-medium leading-tight tracking-[-0.015em]" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}>{it.name}</h3>
                  <p className="mt-3 max-w-[38em] font-normal leading-[1.55] text-ink/65" style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.125rem)' }}>{it.description}</p>
                </div>
              </div>
            </FadeIn>
          </li>
        ))}
      </ol>
    </section>
  );
}
