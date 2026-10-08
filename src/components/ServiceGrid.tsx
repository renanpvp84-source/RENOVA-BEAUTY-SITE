'use client';

import { useEffect, useState } from 'react';
import { ServiceCard } from '@/components/ServiceCard';
import { OPEN_CATEGORY_EVENT } from '@/lib/motion';
import type { ServiceCategory, ServiceCategoryId } from '@/types';

/** Índice de serviços em acordeão (uma categoria aberta por vez). */
export function ServiceGrid({ categories }: { categories: ServiceCategory[] }) {
  const [openId, setOpenId] = useState<ServiceCategoryId | null>(categories[0]?.id ?? null);
  /* Aberturas vindas de outro ponto da página trocam o painel sem transição:
     assim a rolagem até a categoria já mede a altura final. */
  const [instant, setInstant] = useState(false);

  /* Os capítulos editoriais ("Ver serviços") abrem a categoria correspondente. */
  useEffect(() => {
    const onOpen = (event: Event) => {
      const id = (event as CustomEvent<ServiceCategoryId>).detail;
      if (!categories.some((category) => category.id === id)) return;
      setInstant(true);
      setOpenId(id);
    };
    window.addEventListener(OPEN_CATEGORY_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CATEGORY_EVENT, onOpen);
  }, [categories]);

  return (
    <ul data-reveal-group className="border-t border-ink/15">
      {categories.map((category, index) => (
        <ServiceCard
          key={category.id}
          category={category}
          index={index}
          open={openId === category.id}
          instant={instant}
          onToggle={() => {
            setInstant(false);
            setOpenId(openId === category.id ? null : category.id);
          }}
        />
      ))}
    </ul>
  );
}
