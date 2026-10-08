'use client';

import type { ReactNode } from 'react';
import { CTAButton } from '@/components/ui/CTAButton';
import { bookingHref } from '@/data/navigation';
import { OPEN_CATEGORY_EVENT, SELECT_SERVICE_EVENT } from '@/lib/motion';
import type { ServiceCategoryId } from '@/types';

type ButtonProps = Omit<Parameters<typeof CTAButton>[0], 'href' | 'onClick' | 'children'>;

interface CategoryActionProps extends ButtonProps {
  categoryId: ServiceCategoryId;
  children: ReactNode;
}

/** Leva ao agendamento já com a categoria escolhida. */
export function BookCategoryLink({ categoryId, children, ...button }: CategoryActionProps) {
  return (
    <CTAButton
      href={bookingHref}
      onClick={() =>
        window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: categoryId }))
      }
      {...button}
    >
      {children}
    </CTAButton>
  );
}

/** Leva ao índice de serviços e abre a categoria correspondente. */
export function OpenCategoryLink({ categoryId, children, ...button }: CategoryActionProps) {
  return (
    <CTAButton
      href={`/#servico-${categoryId}`}
      onClick={() =>
        window.dispatchEvent(new CustomEvent(OPEN_CATEGORY_EVENT, { detail: categoryId }))
      }
      {...button}
    >
      {children}
    </CTAButton>
  );
}
