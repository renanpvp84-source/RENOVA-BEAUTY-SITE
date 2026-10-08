/**
 * Linguagem de movimento do site: poucos gestos, sempre os mesmos.
 * - textos entram por máscara, de baixo para cima;
 * - imagens se revelam de baixo para cima, com leve aproximação;
 * - blocos sobem alguns pixels com fade;
 * - parallax discreto (no máximo ~6% da altura do elemento).
 */
export const EASE = {
  out: 'power3.out',
  expo: 'expo.out',
  inOut: 'power2.inOut',
} as const;

export const DURATION = {
  fast: 0.35,
  base: 0.8,
  slow: 1.1,
  image: 1.3,
} as const;

export const STAGGER = {
  lines: 0.09,
  items: 0.07,
} as const;

/** Media queries usadas com gsap.matchMedia(). */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
export const DESKTOP = '(min-width: 1024px)';

/** Ponto em que os elementos começam a aparecer ao rolar. */
export const REVEAL_START = 'top 86%';

/** Evento usado para pré-selecionar um serviço na seção de agendamento. */
export const SELECT_SERVICE_EVENT = 'renova:selecionar-servico';
/** Evento usado para abrir uma categoria no índice de serviços. */
export const OPEN_CATEGORY_EVENT = 'renova:abrir-categoria';
