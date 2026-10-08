import { Gallery } from '@/components/Gallery';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { gallery } from '@/data/content';

export function GallerySection() {
  return (
    <section
      id="galeria"
      data-theme="light"
      aria-labelledby="galeria-titulo"
      className="section-y bg-paper text-ink"
    >
      <div className="container-site">
        <div className="grid gap-x-12 gap-y-6 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            id="galeria-titulo"
            className="lg:col-span-7"
            eyebrow="Galeria"
            title={
              <>
                Cabelos, unhas, bastidores e <em className="whitespace-nowrap">o nosso espaço.</em>
              </>
            }
          />
          <p data-reveal="up" className="max-w-md text-lg leading-relaxed text-stone lg:col-span-5">
            Um recorte do dia a dia do salão. Toque em uma foto para ampliar.
          </p>
        </div>

        <div className="mt-12 lg:mt-16">
          <Gallery items={gallery} />
        </div>
      </div>
    </section>
  );
}
