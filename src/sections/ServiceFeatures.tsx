import { BookCategoryLink, OpenCategoryLink } from '@/components/ui/ActionLinks';
import { FramedImage } from '@/components/ui/FramedImage';
import { serviceFeatures } from '@/data/services';
import { cn } from '@/lib/cn';
import type { ServiceFeature } from '@/types';

function Feature({ feature, index }: { feature: ServiceFeature; index: number }) {
  const [main, detail] = feature.images;
  const flipped = index % 2 === 1;
  const titleId = `capitulo-${feature.categoryId}`;

  return (
    <article
      aria-labelledby={titleId}
      className="grid items-center gap-x-10 gap-y-14 lg:grid-cols-12"
    >
      {/* Imagens: espelho principal + detalhe sobreposto */}
      <div
        className={cn(
          'relative lg:col-span-6',
          flipped ? 'lg:col-start-7 lg:row-start-1' : 'lg:col-start-1',
        )}
      >
        <FramedImage
          image={main}
          ring
          parallax={detail ? 3 : 0}
          sizes="(min-width: 1024px) 384px, 74vw"
          className={cn(
            'w-[74%] max-w-[24rem] text-bronze',
            flipped ? 'ml-auto' : 'mr-auto',
            !detail && (flipped ? 'lg:mr-[12%]' : 'lg:ml-[12%]'),
          )}
        />
        {detail && (
          <div
            className={cn(
              'absolute bottom-[-2rem] w-[40%] max-w-[14.5rem]',
              flipped ? 'left-0 lg:left-[6%]' : 'right-0 lg:right-[6%]',
            )}
          >
            <FramedImage
              image={detail}
              shape="rect"
              ratio="aspect-[4/5]"
              parallax={-6}
              sizes="(min-width: 1024px) 230px, 40vw"
              className="border-[6px] border-sand"
            />
          </div>
        )}
      </div>

      {/* Texto */}
      <div
        className={cn(
          'accent-em lg:col-span-5',
          flipped ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-8',
        )}
      >
        <p
          aria-hidden
          data-reveal="up"
          className="font-display text-[5.5rem] leading-none text-transparent opacity-70 [-webkit-text-stroke:1px_var(--color-bronze)] lg:text-[7.5rem]"
        >
          {String(index + 1).padStart(2, '0')}
        </p>
        <h3 id={titleId} data-reveal="lines" className="mt-2 text-display-lg">
          {feature.title}
        </h3>
        <p
          data-reveal="up"
          className="mt-5 max-w-md font-display text-[1.5rem] italic leading-snug text-bronze lg:text-[1.75rem]"
        >
          {feature.quote}
        </p>
        <p data-reveal="up" className="mt-5 max-w-md leading-relaxed text-stone">
          {feature.body}
        </p>
        <div data-reveal="up" className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <OpenCategoryLink categoryId={feature.categoryId} variant="outline-dark" icon="arrow">
            Ver serviços
          </OpenCategoryLink>
          <BookCategoryLink categoryId={feature.categoryId} variant="text">
            Agendar
          </BookCategoryLink>
        </div>
      </div>
    </article>
  );
}

/** Quatro capítulos editoriais: Cabelos, Unhas, Maquiagem e Penteados. */
export function ServiceFeatures() {
  return (
    <section
      data-theme="light"
      aria-label="Destaques dos serviços"
      className="section-y overflow-hidden bg-sand text-ink"
    >
      <div className="container-site flex flex-col gap-28 lg:gap-40">
        {serviceFeatures.map((feature, index) => (
          <Feature key={feature.categoryId} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}
