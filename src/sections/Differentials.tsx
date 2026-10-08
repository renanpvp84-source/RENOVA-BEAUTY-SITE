import { differentials } from '@/data/content';

/** Faixa de diferenciais, logo abaixo do hero. Edite os textos em data/content.ts. */
export function Differentials() {
  return (
    <section
      data-theme="light"
      aria-labelledby="diferenciais-titulo"
      className="bg-bone text-ink"
    >
      <div className="container-site pb-4 pt-16 lg:pt-24">
        <h2
          id="diferenciais-titulo"
          data-reveal="up"
          className="eyebrow flex items-center gap-4 text-bronze"
        >
          <span aria-hidden className="h-px w-10 bg-current opacity-60" />
          Uma experiência pensada para você
        </h2>

        <ol
          data-reveal-group
          className="mt-10 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {differentials.map((item, index) => (
            <li key={item.title} data-reveal-item className="border-t border-ink/20 pt-5">
              <span aria-hidden className="font-display text-2xl italic leading-none text-bronze">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-[0.8125rem] font-medium uppercase leading-snug tracking-[0.16em]">
                {item.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-stone">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
