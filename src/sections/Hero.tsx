'use client';

import { Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import { InstagramIcon } from '@/components/icons/BrandIcons';
import { CTAButton } from '@/components/ui/CTAButton';
import { images } from '@/data/images';
import { bookingHref } from '@/data/navigation';
import { siteConfig } from '@/data/siteConfig';
import { addressLine, businessHoursShort } from '@/lib/format';
import { gsap, useGSAP } from '@/lib/gsap';
import { DESKTOP, EASE, MOTION_OK } from '@/lib/motion';

const lineMask = 'block overflow-hidden pb-[0.14em] -mb-[0.14em] pr-[0.08em]';

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(rootRef);
      const mm = gsap.matchMedia();

      /* Entrada: espelho se revela, título sobe por máscara, depois apoio e ações. */
      mm.add(MOTION_OK, () => {
        gsap
          .timeline({ defaults: { ease: EASE.expo } })
          .fromTo(
            q('[data-hero="frame"]'),
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, clearProps: 'clipPath' },
            0.1,
          )
          .fromTo(
            q('[data-hero="frame"] img'),
            { scale: 1.18 },
            { scale: 1, duration: 1.9, ease: EASE.out },
            0.1,
          )
          .from(q('[data-hero="eyebrow"]'), { autoAlpha: 0, y: 12, duration: 0.8 }, 0.35)
          .from(q('[data-hero-line]'), { yPercent: 118, duration: 1.15, stagger: 0.11 }, 0.45)
          .from(q('[data-hero="sub"]'), { autoAlpha: 0, y: 20, duration: 0.9 }, 0.95)
          .from(q('[data-hero="cta"]'), { autoAlpha: 0, y: 20, duration: 0.9, stagger: 0.08 }, 1.1)
          .from(
            q('[data-hero="aside"]'),
            { autoAlpha: 0, y: 24, duration: 1, stagger: 0.1 },
            1.05,
          )
          .from(q('[data-hero="rail"]'), { autoAlpha: 0, duration: 1, ease: EASE.out }, 1.3);

        // A partir daqui o GSAP controla a visibilidade (ver globals.css).
        document.documentElement.classList.add('hero-started');
      });

      /* Saída ao rolar: conteúdo recua de leve, espelho desliza (bem sutil). */
      mm.add(`${MOTION_OK} and ${DESKTOP}`, () => {
        const scrollTrigger = {
          trigger: rootRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        };
        gsap.to(q('[data-hero-content]'), { yPercent: -12, autoAlpha: 0.1, ease: 'none', scrollTrigger });
        gsap.to(q('[data-hero-media]'), { yPercent: 6, ease: 'none', scrollTrigger });
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      id="inicio"
      data-theme="dark"
      aria-labelledby="hero-titulo"
      className="relative isolate overflow-hidden bg-ink text-bone"
    >
      {/* Atmosfera: a própria foto do hero, desfocada e escurecida. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src={images.atmosfera.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-linear-to-b from-ink/70 via-transparent to-ink" />
      </div>

      <div className="container-site grid min-h-[max(100svh,44rem)] grid-cols-1 gap-x-8 pb-8 pt-24 lg:grid-cols-12 lg:grid-rows-[1fr_auto] lg:items-center lg:pb-10 lg:pt-32">
        {/* Espelho iluminado com a foto principal */}
        <div
          data-hero-media
          className="relative order-first mx-auto w-full max-w-[21rem] lg:order-none lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mx-0 lg:ml-auto lg:max-w-[25.5rem]"
        >
          <div data-hero="ring" className="frame-arch text-champagne lg:halo lg:frame-ring">
            <div
              data-hero="frame"
              className="relative aspect-[4/5] overflow-hidden rounded-[inherit] bg-ink-soft lg:aspect-[3/4]"
            >
              <Image
                src={images.heroMain.src}
                alt={images.heroMain.alt}
                fill
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 408px, 336px"
                className="object-cover"
                style={{ objectPosition: images.heroMain.focus }}
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink via-ink/70 to-transparent lg:hidden"
              />
            </div>
          </div>

          <div
            data-hero="aside"
            className="absolute -left-20 bottom-12 hidden w-40 lg:block xl:-left-24 xl:w-44"
          >
            <div className="frame-pebble relative aspect-[3/4] overflow-hidden border-[5px] border-ink bg-ink-soft">
              <Image
                src={images.producaoMake.src}
                alt={images.producaoMake.alt}
                fill
                placeholder="blur"
                sizes="176px"
                className="object-cover"
                style={{ objectPosition: images.producaoMake.focus }}
              />
            </div>
          </div>
        </div>

        {/* Mensagem e ações */}
        <div
          data-hero-content
          className="relative z-10 -mt-24 lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:mt-0"
        >
          <p data-hero="eyebrow" className="eyebrow text-champagne max-sm:text-[0.625rem] max-sm:tracking-[0.2em]">
            Renova Beauty
            <span aria-hidden className="mx-2 opacity-50 sm:mx-3">
              |
            </span>
            Centro de Embelezamento
          </p>

          <h1 id="hero-titulo" data-hero="title" className="accent-em mt-5 text-display-xl lg:mt-7">
            <span className={lineMask}>
              <span data-hero-line className="block">
                Sua beleza.
              </span>
            </span>
            <span className={lineMask}>
              <span data-hero-line className="block">
                <em>Sua melhor versão.</em>
              </span>
            </span>
          </h1>

          <p data-hero="sub" className="mt-6 max-w-[26rem] text-lg leading-relaxed text-bone/85 lg:mt-8">
            Cuidado, beleza e confiança em uma experiência criada para você.
          </p>

          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-9 lg:mt-10">
            <div data-hero="cta">
              <CTAButton href={bookingHref} icon="calendar" className="w-full sm:w-auto">
                Agendar horário
              </CTAButton>
            </div>
            <div data-hero="cta" className="flex justify-center sm:block">
              <CTAButton href="/#servicos" variant="text" icon="arrow">
                Conhecer serviços
              </CTAButton>
            </div>
          </div>
        </div>

        {/* Faixa de informações práticas */}
        <ul
          data-hero="rail"
          className="mt-10 grid gap-x-8 gap-y-1 border-t border-bone/15 pt-4 text-sm text-mist sm:grid-cols-3 lg:col-span-12 lg:row-start-2 lg:mt-0 lg:pt-5"
        >
          <li className="flex min-h-9 items-center gap-3">
            <MapPin aria-hidden size={16} strokeWidth={1.5} className="shrink-0 text-champagne" />
            {addressLine()}
          </li>
          <li className="flex min-h-9 items-center gap-3 sm:justify-center">
            <Clock aria-hidden size={16} strokeWidth={1.5} className="shrink-0 text-champagne" />
            {businessHoursShort()}
          </li>
          <li className="flex sm:justify-end">
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-3 transition-colors hover:text-bone"
            >
              <InstagramIcon size={16} className="shrink-0 text-champagne" />@
              {siteConfig.instagram.handle}
              <span className="sr-only"> (abre o Instagram em nova aba)</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
