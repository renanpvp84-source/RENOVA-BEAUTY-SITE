'use client';

import { ArrowUpRight, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { WhatsAppIcon } from '@/components/icons/BrandIcons';
import { siteConfig } from '@/data/siteConfig';
import { cn } from '@/lib/cn';
import { whatsappLink } from '@/lib/whatsapp';
import { useUI } from './UIProvider';

/**
 * Botão flutuante "Fale com a Renova" + painel de atalhos.
 * No celular o botão some (a barra inferior abre o mesmo painel).
 */
export function WhatsAppButton() {
  const { whatsappOpen, setWhatsappOpen, menuOpen } = useUI();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { buttonLabel, shortcuts, display } = siteConfig.whatsapp;
  /* O botão só aparece depois do hero, para não cobrir a faixa de informações. */
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const update = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  /* Fecha com Esc ou clique fora. */
  useEffect(() => {
    if (!whatsappOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setWhatsappOpen(false);
      triggerRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target)) return;
      if ((target as Element).closest?.('[aria-controls="painel-whatsapp"]')) return;
      setWhatsappOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    panelRef.current?.querySelector<HTMLElement>('a')?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [whatsappOpen, setWhatsappOpen]);

  if (menuOpen) return null;

  return (
    <div data-theme="light" className="fixed bottom-[5.25rem] right-4 z-40 md:bottom-6 md:right-6">
      {whatsappOpen && (
        <div
          ref={panelRef}
          id="painel-whatsapp"
          role="dialog"
          aria-label={buttonLabel}
          className="absolute bottom-0 right-0 w-[min(21rem,calc(100vw-2rem))] border border-ink/10 bg-paper text-ink shadow-[0_24px_60px_-20px_rgb(17_14_13/0.55)] md:bottom-[4.25rem]"
        >
          <div className="flex items-start justify-between gap-4 border-b border-ink/10 px-5 py-4">
            <div>
              <p className="font-display text-xl leading-tight">{buttonLabel}</p>
              <p className="mt-1 text-sm text-stone">Escolha um assunto para abrir a conversa.</p>
            </div>
            <button
              type="button"
              onClick={() => setWhatsappOpen(false)}
              aria-label="Fechar"
              className="-mr-2 -mt-1 inline-flex size-11 shrink-0 items-center justify-center"
            >
              <X aria-hidden size={20} strokeWidth={1.25} />
            </button>
          </div>
          <ul>
            {shortcuts.map((shortcut) => (
              <li key={shortcut.label} className="border-b border-ink/10 last:border-b-0">
                <a
                  href={whatsappLink(shortcut.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-12 items-center justify-between gap-4 px-5 text-[0.75rem] font-medium uppercase tracking-[0.16em] transition-colors hover:bg-sand"
                >
                  {shortcut.label}
                  <ArrowUpRight aria-hidden size={16} strokeWidth={1.5} className="text-bronze" />
                  <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="border-t border-ink/10 px-5 py-3 text-xs text-stone">WhatsApp {display}</p>
        </div>
      )}

      <button
        ref={triggerRef}
        type="button"
        onClick={() => setWhatsappOpen(!whatsappOpen)}
        aria-expanded={whatsappOpen}
        aria-controls="painel-whatsapp"
        className={cn(
          'hidden min-h-[3.25rem] items-center gap-3 rounded-full bg-champagne pl-4 pr-6 text-[0.75rem] font-medium uppercase tracking-[0.16em] text-ink shadow-[0_12px_32px_-12px_rgb(17_14_13/0.6)] transition-[opacity,visibility,translate,background-color] duration-300 hover:bg-bone md:inline-flex',
          !pastHero && !whatsappOpen && 'invisible translate-y-3 opacity-0',
        )}
      >
        <WhatsAppIcon size={22} />
        {buttonLabel}
      </button>
    </div>
  );
}
