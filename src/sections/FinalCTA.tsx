import Image from 'next/image';
import { CTAButton } from '@/components/ui/CTAButton';
import { FramedImage } from '@/components/ui/FramedImage';
import { images } from '@/data/images';
import { bookingHref } from '@/data/navigation';
import { whatsappLink } from '@/lib/whatsapp';

/** Chamada final: dois espelhos iluminados ladeando o convite para agendar. */
export function FinalCTA() {
  return (
    <section
      data-theme="dark"
      aria-labelledby="cta-final-titulo"
      className="relative isolate overflow-hidden bg-ink text-bone"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src={images.atmosfera.src}
          alt=""
          fill
          sizes="100vw"
          className="-scale-x-100 object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-linear-to-b from-ink via-transparent to-ink" />
      </div>

      <div className="container-site grid items-center gap-x-8 py-24 lg:grid-cols-12 lg:py-36">
        <div className="hidden lg:col-span-3 lg:block lg:translate-y-14">
          <FramedImage
            image={images.cabeloOndas}
            ring
            halo
            parallax={4}
            sizes="280px"
            className="text-champagne"
          />
        </div>

        <div className="accent-em flex flex-col items-center text-center lg:col-span-6">
          <div className="mb-10 w-40 lg:hidden">
            <FramedImage image={images.producaoMake} ring halo sizes="160px" className="text-champagne" />
          </div>
          <p data-reveal="up" className="eyebrow text-champagne">
            Renova Beauty
          </p>
          <h2 id="cta-final-titulo" data-reveal="lines" className="mt-6 text-display-lg lg:text-[clamp(3rem,5.4vw,5.5rem)] lg:leading-[1.02]">
            Seu próximo visual <em>começa aqui.</em>
          </h2>
          <p data-reveal="up" className="mt-7 max-w-sm text-lg leading-relaxed text-bone/85">
            Reserve seu horário e viva a experiência Renova Beauty.
          </p>
          <div
            data-reveal="up"
            className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row"
          >
            <CTAButton href={bookingHref} icon="calendar">
              Agendar agora
            </CTAButton>
            <CTAButton href={whatsappLink()} variant="outline" icon="whatsapp" external>
              Falar no WhatsApp
            </CTAButton>
          </div>
        </div>

        <div className="hidden lg:col-span-3 lg:block lg:-translate-y-14">
          <FramedImage
            image={images.producaoMake}
            ring
            halo
            parallax={-4}
            sizes="280px"
            className="text-champagne"
          />
        </div>
      </div>
    </section>
  );
}
