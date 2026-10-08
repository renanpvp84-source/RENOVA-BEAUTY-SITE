'use client';

import Lenis from 'lenis';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { REDUCED_MOTION } from '@/lib/motion';

interface SmoothScrollApi {
  /** Rola até um seletor/elemento respeitando a altura do header. */
  scrollTo: (target: string | HTMLElement, options?: { immediate?: boolean }) => void;
  stop: () => void;
  start: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollApi>({
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

/**
 * Lenis + GSAP no mesmo laço de animação:
 * - o ticker do GSAP chama lenis.raf (um único requestAnimationFrame);
 * - cada "scroll" do Lenis atualiza o ScrollTrigger;
 * - com "reduzir movimento" ligado o Lenis nem é criado (rolagem nativa).
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia(REDUCED_MOTION);
    let tick: ((time: number) => void) | null = null;

    const enable = () => {
      if (lenisRef.current) return;
      const lenis = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        autoRaf: false,
      });
      lenis.on('scroll', ScrollTrigger.update);
      tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      lenisRef.current = lenis;
    };

    const disable = () => {
      if (tick) gsap.ticker.remove(tick);
      tick = null;
      lenisRef.current?.destroy();
      lenisRef.current = null;
      gsap.ticker.lagSmoothing(500, 33);
    };

    const sync = () => {
      if (reduced.matches) disable();
      else enable();
      ScrollTrigger.refresh();
    };

    sync();
    reduced.addEventListener('change', sync);
    return () => {
      reduced.removeEventListener('change', sync);
      disable();
    };
  }, []);

  const scrollTo = useCallback<SmoothScrollApi['scrollTo']>((target, options) => {
    const element =
      typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
    if (!element) return;

    const lenis = lenisRef.current;
    if (lenis) {
      // force: funciona mesmo se um painel acabou de travar a rolagem.
      lenis.scrollTo(element, { immediate: options?.immediate, force: true });
    } else {
      element.scrollIntoView({ block: 'start' });
    }

    // Leva o foco junto, para teclado e leitor de tela continuarem do destino.
    if (!element.hasAttribute('tabindex')) element.setAttribute('tabindex', '-1');
    element.focus({ preventScroll: true });
  }, []);

  /* Links de âncora da mesma página (href="/#secao" ou "#secao"). */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest?.('a[href]');
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === '_blank') return;

      const url = new URL(anchor.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname || !url.hash) return;

      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      window.history.pushState(null, '', url.hash);
      scrollTo(target);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [scrollTo]);

  const stop = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  const api = useMemo(() => ({ scrollTo, stop, start }), [scrollTo, stop, start]);

  return <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>;
}
