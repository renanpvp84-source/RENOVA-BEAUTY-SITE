'use client';

import { useEffect } from 'react';
import { useSmoothScroll } from '@/components/layout/SmoothScroll';

/** Trava a rolagem da página enquanto um painel (menu, lightbox) está aberto. */
export function useScrollLock(locked: boolean): void {
  const { stop, start } = useSmoothScroll();

  useEffect(() => {
    if (!locked) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    stop();
    return () => {
      root.style.overflow = previous;
      start();
    };
  }, [locked, stop, start]);
}
