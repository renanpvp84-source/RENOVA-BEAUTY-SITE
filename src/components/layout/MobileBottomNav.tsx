'use client';

import { CalendarDays, Home, Menu, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/BrandIcons';
import { bookingHref } from '@/data/navigation';
import { useUI } from './UIProvider';

const itemClass =
  'flex min-h-14 flex-col items-center justify-center gap-1 text-[0.6875rem] font-medium tracking-wide text-bone/80';

/**
 * Barra inferior do celular: os cinco atalhos mais usados ficam ao alcance
 * do polegar e o "Agendar" permanece sempre visível.
 */
export function MobileBottomNav() {
  const { menuOpen, setMenuOpen, whatsappOpen, setWhatsappOpen } = useUI();

  if (menuOpen) return null;

  return (
    <nav
      aria-label="Atalhos"
      data-theme="dark"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-bone/10 bg-ink/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      <ul className="grid grid-cols-5 items-end">
        <li>
          <a href="/#inicio" className={itemClass}>
            <Home aria-hidden size={20} strokeWidth={1.5} />
            Início
          </a>
        </li>
        <li>
          <a href="/#servicos" className={itemClass}>
            <Sparkles aria-hidden size={20} strokeWidth={1.5} />
            Serviços
          </a>
        </li>
        <li>
          <a href={bookingHref} className={`${itemClass} text-champagne`}>
            <span className="-mt-5 flex size-12 items-center justify-center rounded-full bg-champagne text-ink shadow-[0_0_0_5px_var(--color-ink)]">
              <CalendarDays aria-hidden size={20} strokeWidth={1.5} />
            </span>
            Agendar
          </a>
        </li>
        <li>
          <button
            type="button"
            onClick={() => setWhatsappOpen(!whatsappOpen)}
            aria-expanded={whatsappOpen}
            aria-controls="painel-whatsapp"
            className={`${itemClass} w-full`}
          >
            <WhatsAppIcon size={20} />
            WhatsApp
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            className={`${itemClass} w-full`}
          >
            <Menu aria-hidden size={20} strokeWidth={1.5} />
            Menu
          </button>
        </li>
      </ul>
    </nav>
  );
}
