import { BeforeAfter } from '@/components/BeforeAfter';
import { CTAButton } from '@/components/ui/CTAButton';
import { FramedImage } from '@/components/ui/FramedImage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { beforeAfterPairs, results } from '@/data/content';
import { bookingHref } from '@/data/navigation';
import { siteConfig } from '@/data/siteConfig';

export function Results() {
  /* Em produção só entram pares completos (com foto de antes). */
  const pairs = siteConfig.demoMode
    ? beforeAfterPairs
    : beforeAfterPairs.filter((pair) => pair.before !== null);
  const pair = pairs[0];

  return (
    <section
      id="resultados"
      data-theme="dark"
      aria-labelledby="resultados-titulo"
      className="section-y overflow-hidden bg-ink text-bone"
    >
      <div className="container-site">
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="resultados-titulo"
            className="lg:col-span-7"
            tone="dark"
            eyebrow="Resultados"
            title={
              <>
                Resultados que <em>falam por si.</em>
              </>
            }
          />
          <p data-reveal="up" className="max-w-md text-lg leading-relaxed text-mist lg:col-span-5">
            Sem banco de imagens: cada foto desta página foi feita no salão, com clientes de
            verdade.
          </p>
        </div>

        <div className="mt-14 grid gap-x-12 gap-y-16 lg:mt-20 lg:grid-cols-12 lg:items-center">
          {pair && (
            <div data-reveal="up" className="mx-auto w-full max-w-[32rem] lg:col-span-6 lg:mx-0">
              <BeforeAfter pair={pair} />
            </div>
          )}

          <div className={pair ? 'lg:col-span-5 lg:col-start-8' : 'lg:col-span-12'}>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-10">
              {results.map((result, index) => (
                <li key={result.image.alt} className={index % 2 === 1 ? 'pt-14 lg:pt-24' : undefined}>
                  <figure>
                    <FramedImage
                      image={result.image}
                      ratio="aspect-[3/4]"
                      halo
                      sizes="(min-width: 1024px) 250px, 45vw"
                      parallax={index % 2 === 0 ? 3 : -3}
                    />
                    <figcaption className="eyebrow mt-5 text-champagne">{result.category}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>

            <div data-reveal="up" className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
              <CTAButton href={bookingHref} icon="calendar">
                Agendar horário
              </CTAButton>
              <CTAButton href="/#galeria" variant="text" icon="arrow">
                Ver galeria
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
