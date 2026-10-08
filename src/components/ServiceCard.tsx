'use client';

import { Plus } from 'lucide-react';
import { BookCategoryLink } from '@/components/ui/ActionLinks';
import { siteConfig } from '@/data/siteConfig';
import { cn } from '@/lib/cn';
import type { ServiceCategory } from '@/types';

interface ServiceCardProps {
  category: ServiceCategory;
  index: number;
  open: boolean;
  /** Troca de estado sem transição (abertura disparada por outro ponto da página). */
  instant?: boolean;
  onToggle: () => void;
}

/**
 * Linha do índice de serviços. Fechada mostra a categoria; aberta lista os
 * serviços e leva ao agendamento. Em produção (demoMode = false) os itens
 * "a confirmar" não aparecem.
 */
export function ServiceCard({ category, index, open, instant = false, onToggle }: ServiceCardProps) {
  const { demoMode } = siteConfig;
  const items = demoMode
    ? category.items
    : category.items.filter((item) => item.status === 'confirmado');
  const confirmed = category.items.filter((item) => item.status === 'confirmado');
  const hasPending = demoMode && items.some((item) => item.status === 'a-confirmar');
  const buttonId = `servico-${category.id}-botao`;
  const panelId = `servico-${category.id}-painel`;

  return (
    <li
      id={`servico-${category.id}`}
      data-reveal-item
      className="scroll-mt-24 border-b border-ink/15"
    >
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group grid w-full grid-cols-[2.25rem_minmax(0,1fr)_auto] items-center gap-x-3 py-5 text-left sm:grid-cols-[3.5rem_minmax(0,1fr)_auto] lg:py-6"
        >
          <span aria-hidden className="self-start pt-2 text-sm tabular-nums text-bronze lg:pt-3">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="min-w-0">
            <span className="block font-display text-[1.875rem] leading-[1.1] transition-transform duration-500 ease-out motion-safe:group-hover:translate-x-1.5 lg:text-[2.5rem]">
              {category.name}
            </span>
            {confirmed.length > 0 && (
              <span className="mt-1.5 block truncate text-[0.95rem] text-stone">
                {confirmed.map((item) => item.name).join(' · ')}
              </span>
            )}
          </span>
          <span
            aria-hidden
            className={cn(
              'flex size-11 items-center justify-center rounded-full border transition-colors duration-300',
              open
                ? 'border-ink bg-ink text-bone'
                : 'border-ink/25 group-hover:border-ink group-hover:bg-ink group-hover:text-bone',
            )}
          >
            <Plus
              size={18}
              strokeWidth={1.5}
              className={cn('transition-transform duration-500 ease-out', open && 'rotate-45')}
            />
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          'grid',
          !instant && 'transition-[grid-template-rows] duration-500 ease-out-expo',
        )}
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden" inert={!open}>
          <div className="pb-8 pl-[3rem] sm:pl-[4.25rem]">
            <p className="max-w-md text-stone">{category.summary}</p>

            {items.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {items.map((item) => (
                  <li
                    key={item.name}
                    className={cn(
                      'border px-3.5 py-2 text-[0.8125rem] leading-none tracking-wide',
                      item.status === 'confirmado'
                        ? 'border-ink/30 text-ink'
                        : 'border-dashed border-ink/25 text-stone',
                    )}
                  >
                    {item.name}
                    {item.status === 'a-confirmar' && <span aria-hidden> *</span>}
                    {item.status === 'a-confirmar' && (
                      <span className="sr-only"> (a confirmar com o salão)</span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {hasPending && (
              <p className="mt-3 text-xs text-stone">* Serviço a confirmar com o salão.</p>
            )}

            <BookCategoryLink
              categoryId={category.id}
              variant="text"
              icon="arrow"
              className="mt-5"
            >
              Agendar {category.name.toLowerCase()}
            </BookCategoryLink>
          </div>
        </div>
      </div>
    </li>
  );
}
