'use client';

import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, type MouseEvent } from 'react';
import { InstagramIcon } from '@/components/icons/BrandIcons';
import { CTAButton } from '@/components/ui/CTAButton';
import { bookingHref, mainNav } from '@/data/navigation';
import { siteConfig } from '@/data/siteConfig';
import { useScrollLock } from '@/hooks/useScrollLock';
import { addressLine, businessHoursShort } from '@/lib/format';
import { gsap, useGSAP } from '@/lib/gsap';
import { EASE, MOTION_OK } from '@/lib/motion';
import { whatsappLink } from '@/lib/whatsapp';
import { useSmoothScroll } from './SmoothScroll';
import { useUI } from './UIProvider';

/**
 * Menu em tela cheia para celular e tablet.
 * Usa <dialog> nativo: o navegador cuida do foco preso e da tecla Esc.
 */
export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const { menuOpen, setMenuOpen } = useUI();
  const { scrollTo } = useSmoothScroll();

  useScrollLock(menuOpen);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (menuOpen && !dialog.open) dialog.showModal();
    if (!menuOpen && dialog.open) dialog.close();
  }, [menuOpen]);

  useGSAP(
    () => {
      if (!menuOpen) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from('[data-menu-item]', {
          yPercent: 60,
          autoAlpha: 0,
          duration: 0.6,
          ease: EASE.expo,
          stagger: 0.04,
          delay: 0.05,
        });
      });
    },
    { scope: dialogRef, dependencies: [menuOpen], revertOnUpdate: true },
  );

  const close = () => {
    dialogRef.current?.close();
    setMenuOpen(false);
  };

  /* Na home, fecha o menu antes de rolar; em outras páginas, navega normalmente. */
  const handleLink = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = href.split('#')[1];
    const target = hash ? document.getElementById(hash) : null;
    if (pathname !== '/' || !target) {
      setMenuOpen(false);
      return;
    }
    event.preventDefault();
    close();
    window.history.pushState(null, '', `#${hash}`);
    requestAnimationFrame(() => scrollTo(target));
  };

  return (
    <dialog
      ref={dialogRef}
      id="menu-mobile"
      aria-label="Menu"
      data-theme="dark"
      onClose={() => setMenuOpen(false)}
      className="fixed inset-0 m-0 h-dvh w-screen border-0 bg-ink p-0 text-bone backdrop:bg-ink"
    >
      <div className="flex h-full flex-col overflow-y-auto" data-lenis-prevent>
        <div className="container-site flex h-[4.5rem] shrink-0 items-center justify-between">
          <span className="eyebrow text-champagne">Menu</span>
          <button
            type="button"
            onClick={close}
            aria-label="Fechar menu"
            className="-mr-2 inline-flex size-11 items-center justify-center"
          >
            <X aria-hidden size={24} strokeWidth={1.25} />
          </button>
        </div>

        <nav aria-label="Menu principal" className="container-site flex-1 py-6">
          <ul className="border-t border-bone/15">
            {mainNav.map((item, index) => (
              <li key={item.sectionId} className="overflow-hidden border-b border-bone/15">
                <a
                  data-menu-item
                  href={item.href}
                  onClick={(event) => handleLink(event, item.href)}
                  className="flex min-h-14 items-baseline gap-5 py-3"
                >
                  <span className="w-6 text-xs tabular-nums text-champagne/80">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-[1.75rem] leading-tight">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="container-site shrink-0 pb-8">
          <div className="grid gap-3 sm:grid-cols-2">
            <CTAButton
              href={bookingHref}
              icon="calendar"
              onClick={() => setMenuOpen(false)}
              className="w-full"
            >
              Agendar horário
            </CTAButton>
            <CTAButton
              href={whatsappLink()}
              variant="outline"
              icon="whatsapp"
              external
              className="w-full"
            >
              Falar no WhatsApp
            </CTAButton>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm text-mist">
            <p>
              {addressLine()}
              <br />
              {businessHoursShort()}
            </p>
            <a
              href={siteConfig.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 text-bone"
            >
              <InstagramIcon size={18} />@{siteConfig.instagram.handle}
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </div>
        </div>
      </div>
    </dialog>
  );
}
