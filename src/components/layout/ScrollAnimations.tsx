'use client';

import { usePathname } from 'next/navigation';
import { gsap, ScrollTrigger, SplitText, useGSAP } from '@/lib/gsap';
import { DESKTOP, DURATION, EASE, MOTION_OK, REVEAL_START, STAGGER } from '@/lib/motion';

/**
 * Orquestrador único das animações de rolagem.
 * As seções só declaram a intenção com atributos data-*:
 *
 *   data-reveal="lines"   título entra linha a linha, por máscara
 *   data-reveal="up"      bloco sobe alguns pixels com fade
 *   data-reveal="image"   imagem revelada de baixo para cima
 *   data-reveal="line"    fio (hairline) cresce da esquerda
 *   data-reveal-group     dispara os filhos [data-reveal-item] em sequência
 *   data-parallax="6"     deslocamento vertical sutil (% da altura), só desktop
 *   data-count="4225"     número conta de 0 até o valor
 *
 * Sem JavaScript, ou com "reduzir movimento" ligado, nada disso roda
 * e o conteúdo simplesmente está lá, completo.
 */
export function ScrollAnimations() {
  const pathname = usePathname();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const once = (trigger: Element) => ({ trigger, start: REVEAL_START, once: true });

        gsap.utils.toArray<HTMLElement>('[data-reveal="lines"]').forEach((element) => {
          SplitText.create(element, {
            type: 'lines',
            mask: 'lines',
            linesClass: 'split-line',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: DURATION.slow,
                ease: EASE.expo,
                stagger: STAGGER.lines,
                scrollTrigger: once(element),
              }),
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-reveal="up"]').forEach((element) => {
          gsap.from(element, {
            y: 24,
            autoAlpha: 0,
            duration: DURATION.base,
            ease: EASE.out,
            delay: Number(element.dataset.delay ?? 0),
            scrollTrigger: once(element),
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-reveal="image"]').forEach((element) => {
          const picture = element.querySelector('img');
          const timeline = gsap.timeline({ scrollTrigger: once(element) });
          timeline.fromTo(
            element,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: DURATION.image,
              ease: EASE.expo,
              clearProps: 'clipPath',
            },
          );
          if (picture) {
            timeline.fromTo(
              picture,
              { scale: 1.16 },
              { scale: 1, duration: DURATION.image + 0.3, ease: EASE.out },
              0,
            );
          }
        });

        gsap.utils.toArray<HTMLElement>('[data-reveal="line"]').forEach((element) => {
          gsap.from(element, {
            scaleX: 0,
            transformOrigin: 'left center',
            duration: DURATION.slow,
            ease: EASE.inOut,
            scrollTrigger: once(element),
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-reveal-group]').forEach((group) => {
          const items = group.querySelectorAll('[data-reveal-item]');
          if (!items.length) return;
          gsap.from(items, {
            y: 28,
            autoAlpha: 0,
            duration: DURATION.base,
            ease: EASE.out,
            stagger: STAGGER.items,
            scrollTrigger: once(group),
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-count]').forEach((element) => {
          const target = Number(element.dataset.count);
          if (!Number.isFinite(target)) return;
          const formatter = new Intl.NumberFormat('pt-BR');
          const counter = { value: 0 };
          gsap.to(counter, {
            value: target,
            duration: 1.6,
            ease: EASE.out,
            scrollTrigger: once(element),
            onUpdate: () => {
              element.textContent = formatter.format(Math.round(counter.value));
            },
          });
        });
      });

      /* Parallax só em telas grandes e com movimento permitido. */
      mm.add(`${MOTION_OK} and ${DESKTOP}`, () => {
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
          const amount = Number(element.dataset.parallax);
          if (!amount) return;
          gsap.fromTo(
            element,
            { yPercent: amount },
            {
              yPercent: -amount,
              ease: 'none',
              scrollTrigger: {
                trigger: element.parentElement ?? element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            },
          );
        });
      });

      /* Fontes e imagens mudam alturas: recalcula os gatilhos depois de carregar. */
      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      window.addEventListener('load', refresh);
      return () => window.removeEventListener('load', refresh);
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return null;
}
