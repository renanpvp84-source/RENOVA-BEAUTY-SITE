'use client';

import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { CTAButton } from '@/components/ui/CTAButton';
import { Logo } from '@/components/ui/Logo';
import { bookingHref, mainNav } from '@/data/navigation';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { EASE, REDUCED_MOTION } from '@/lib/motion';
import { useUI } from './UIProvider';

/** Distância de rolagem (px) a partir da qual o header fica compacto e sólido. */
const SCROLL_THRESHOLD = 48;

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const { menuOpen, setMenuOpen } = useUI();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useGSAP(
    () => {
      const header = headerRef.current;
      if (!header) return;
      const background = header.querySelector('[data-header-bg]');
      const bar = header.querySelector('[data-header-bar]');
      const mm = gsap.matchMedia();

      /* Transparente no topo -> compacto, sólido e com blur sutil ao rolar. */
      mm.add(
        {
          isDesktop: '(min-width: 768px)',
          isMobile: '(max-width: 767.98px)',
          reduceMotion: REDUCED_MOTION,
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions as Record<string, boolean>;
          const timeline = gsap
            .timeline({
              paused: true,
              defaults: { duration: reduceMotion ? 0 : 0.45, ease: EASE.out },
            })
            .to(background, { autoAlpha: 1 }, 0)
            .to(bar, { height: isDesktop ? 64 : 58 }, 0);

          let compact = false;
          const update = (scroll: number, instant = false) => {
            const next = scroll > SCROLL_THRESHOLD;
            if (next === compact && !instant) return;
            compact = next;
            if (instant) timeline.progress(next ? 1 : 0).pause();
            else if (next) timeline.play();
            else timeline.reverse();
          };

          ScrollTrigger.create({
            start: 0,
            end: 'max',
            onUpdate: (self) => update(self.scroll()),
            onRefresh: (self) => update(self.scroll(), true),
          });
          update(window.scrollY, true);
        },
      );

      /* Marca no menu a seção que está no meio da tela. */
      mainNav.forEach((item) => {
        const section = document.getElementById(item.sectionId);
        if (!section) return;
        ScrollTrigger.create({
          trigger: section,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) setActiveSection(item.sectionId);
          },
        });
      });
    },
    { scope: headerRef, dependencies: [pathname], revertOnUpdate: true },
  );

  return (
    <header ref={headerRef} data-theme="dark" className="fixed inset-x-0 top-0 z-50 text-bone">
      <a
        href="#conteudo"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-10 focus-visible:bg-champagne focus-visible:px-4 focus-visible:py-3 focus-visible:text-sm focus-visible:text-ink"
      >
        Pular para o conteúdo
      </a>

      <div
        data-header-bg
        aria-hidden
        className="invisible absolute inset-0 border-b border-bone/10 bg-ink/90 opacity-0 backdrop-blur-md"
      />

      <div
        data-header-bar
        className="container-site relative flex h-[4.5rem] items-center justify-between gap-6 md:h-[5.5rem]"
      >
        <Logo />

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-6 2xl:gap-8">
            {mainNav.map((item) => (
              <li key={item.sectionId}>
                <a
                  href={item.href}
                  aria-current={activeSection === item.sectionId ? 'true' : undefined}
                  className="inline-flex min-h-11 items-center text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-bone/75 transition-colors duration-300 hover:text-bone aria-[current=true]:text-champagne"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          <div className="hidden sm:block">
            <CTAButton href={bookingHref} variant="outline" size="sm">
              Agendar horário
            </CTAButton>
          </div>
          <a
            href={bookingHref}
            className="inline-flex min-h-11 items-center px-3 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-champagne sm:hidden"
          >
            Agendar
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            className="-mr-2 inline-flex size-11 items-center justify-center xl:hidden"
          >
            <Menu aria-hidden size={24} strokeWidth={1.25} />
          </button>
        </div>
      </div>
    </header>
  );
}
