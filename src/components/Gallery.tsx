'use client';

import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useScrollLock } from '@/hooks/useScrollLock';
import type { GalleryItem } from '@/types';

/**
 * Galeria editorial em colunas: cada foto na proporção original, em tamanho
 * próximo ao do arquivo (nada ampliado além do que a imagem aguenta),
 * com ampliação em <dialog> nativo — Esc fecha, setas navegam.
 */
export function Gallery({ items }: { items: GalleryItem[] }) {
  const [current, setCurrent] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const isOpen = current !== null;

  useScrollLock(isOpen);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const step = useCallback(
    (direction: 1 | -1) =>
      setCurrent((index) =>
        index === null ? index : (index + direction + items.length) % items.length,
      ),
    [items.length],
  );

  const close = () => {
    setCurrent(null);
    openerRef.current?.focus();
  };

  const active = current !== null ? items[current] : null;

  return (
    <>
      <ul data-reveal-group className="columns-2 gap-2 md:columns-3 md:gap-3 lg:columns-4">
        {items.map((item, index) => (
          <li key={item.caption} data-reveal-item className="mb-2 break-inside-avoid md:mb-3">
            <button
              type="button"
              onClick={(event) => {
                openerRef.current = event.currentTarget;
                setCurrent(index);
              }}
              aria-label={`Ampliar foto: ${item.caption}`}
              className="group relative block w-full overflow-hidden bg-sand"
            >
              <Image
                src={item.image.src}
                alt={item.image.alt}
                placeholder="blur"
                sizes="(min-width: 1024px) 305px, (min-width: 768px) 31vw, 46vw"
                className="h-auto w-full transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-3 bg-linear-to-t from-ink/80 to-transparent p-4 pt-10 text-left text-sm text-bone opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                {item.caption}
                <Expand aria-hidden size={16} strokeWidth={1.5} className="shrink-0" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        data-theme="dark"
        aria-label="Foto ampliada"
        onClose={() => setCurrent(null)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') step(1);
          if (event.key === 'ArrowLeft') step(-1);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="fixed inset-0 m-0 h-dvh w-screen border-0 bg-ink/95 p-0 text-bone backdrop:bg-ink/80"
      >
        {active && current !== null && (
          <div className="pointer-events-none flex h-full flex-col items-center justify-center gap-5 px-4 py-16">
            <figure className="pointer-events-auto flex min-h-0 flex-col items-center gap-4">
              <Image
                key={active.caption}
                src={active.image.src}
                alt={active.image.alt}
                placeholder="blur"
                sizes="(min-width: 768px) 448px, 92vw"
                className="max-h-[70dvh] w-auto max-w-[min(92vw,28rem)] object-contain"
              />
              <figcaption className="flex items-baseline gap-4 text-sm text-mist">
                <span className="tabular-nums text-champagne">
                  {String(current + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                </span>
                {active.caption}
              </figcaption>
            </figure>

            <div className="pointer-events-auto flex items-center gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Foto anterior"
                className="inline-flex size-12 items-center justify-center rounded-full border border-bone/30 transition-colors hover:bg-bone hover:text-ink"
              >
                <ChevronLeft aria-hidden size={20} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Próxima foto"
                className="inline-flex size-12 items-center justify-center rounded-full border border-bone/30 transition-colors hover:bg-bone hover:text-ink"
              >
                <ChevronRight aria-hidden size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={close}
          aria-label="Fechar foto ampliada"
          className="absolute right-3 top-3 inline-flex size-12 items-center justify-center md:right-6 md:top-6"
        >
          <X aria-hidden size={26} strokeWidth={1.25} />
        </button>
      </dialog>
    </>
  );
}
