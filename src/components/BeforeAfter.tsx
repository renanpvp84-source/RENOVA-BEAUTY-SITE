'use client';

import { ChevronsLeftRight, ImagePlus } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import type { BeforeAfterPair } from '@/types';

/**
 * Comparador antes/depois.
 * - Arraste (mouse ou toque) em qualquer ponto da foto;
 * - no teclado, foque o controle e use as setas.
 * Sem foto de "antes", mostra um espaço reservado identificado (nada é simulado).
 */
export function BeforeAfter({ pair }: { pair: BeforeAfterPair }) {
  const [position, setPosition] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const moveTo = useCallback((clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) moveTo(event.clientX);
  };

  const stopDragging = () => {
    dragging.current = false;
  };

  return (
    <figure>
      <div
        ref={frameRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        className="relative aspect-[512/377] cursor-ew-resize touch-pan-y select-none overflow-hidden bg-sand"
        style={{ '--pos': `${position}%` } as CSSProperties}
      >
        {/* Depois (camada de baixo) */}
        <Image
          src={pair.after.src}
          alt={pair.after.alt}
          fill
          placeholder="blur"
          sizes="(min-width: 1024px) 512px, 92vw"
          className="pointer-events-none object-cover"
          style={{ objectPosition: pair.after.focus }}
          draggable={false}
        />

        {/* Antes (camada de cima, recortada até o divisor) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: 'inset(0 calc(100% - var(--pos)) 0 0)' }}
        >
          {pair.before ? (
            <Image
              src={pair.before.src}
              alt={pair.before.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 512px, 92vw"
              className="pointer-events-none object-cover"
              style={{ objectPosition: pair.before.focus }}
              draggable={false}
            />
          ) : (
            <div className="placeholder-hatch absolute inset-0 flex items-center">
              <div className="w-[34%] px-4 text-bronze sm:px-6">
                <ImagePlus aria-hidden size={28} strokeWidth={1.25} />
                <p className="mt-3 text-[0.8125rem] font-medium uppercase leading-snug tracking-[0.16em]">
                  Foto do “antes” a enviar
                </p>
              </div>
            </div>
          )}
        </div>

        <span className="pointer-events-none absolute left-4 top-4 bg-ink/80 px-3 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-bone">
          Antes
        </span>
        <span className="pointer-events-none absolute right-4 top-4 bg-bone/90 px-3 py-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-ink">
          Depois
        </span>

        {/* Controle acessível: invisível, mas focável e operável por teclado. */}
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(position)}
          onChange={(event) => setPosition(Number(event.target.value))}
          aria-label="Comparar antes e depois"
          aria-valuetext={`${Math.round(position)}% da foto mostrando o antes`}
          className="peer sr-only"
        />

        {/* Divisor */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-px bg-bone peer-focus-visible:w-0.5 peer-focus-visible:bg-bronze"
          style={{ left: 'var(--pos)' }}
        >
          <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-bone text-ink shadow-[0_6px_20px_-6px_rgb(17_14_13/0.6)]">
            <ChevronsLeftRight size={18} strokeWidth={1.5} />
          </span>
        </div>
      </div>

      <figcaption className="mt-4 flex items-baseline justify-between gap-4 text-sm text-mist">
        <span className="eyebrow text-champagne">{pair.label}</span>
        <span>Arraste para comparar</span>
      </figcaption>
    </figure>
  );
}
