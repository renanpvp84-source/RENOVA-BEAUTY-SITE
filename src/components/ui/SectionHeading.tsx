import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface SectionHeadingProps {
  eyebrow: string;
  /** Use <em> para a ênfase em itálico. */
  title: ReactNode;
  lead?: ReactNode;
  tone?: 'light' | 'dark';
  align?: 'left' | 'center';
  id?: string;
  className?: string;
}

/** Cabeçalho padrão das seções: rótulo, título serifado e texto de apoio. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = 'light',
  align = 'left',
  id,
  className,
}: SectionHeadingProps) {
  const dark = tone === 'dark';

  return (
    <div className={cn('accent-em', align === 'center' && 'mx-auto text-center', className)}>
      <p
        data-reveal="up"
        className={cn(
          'eyebrow flex items-center gap-4',
          align === 'center' && 'justify-center',
          dark ? 'text-champagne' : 'text-bronze',
        )}
      >
        <span aria-hidden className="h-px w-10 bg-current opacity-60" />
        {eyebrow}
      </p>
      <h2 id={id} data-reveal="lines" className="mt-6 text-display-lg">
        {title}
      </h2>
      {lead ? (
        <p
          data-reveal="up"
          className={cn(
            'mt-6 max-w-[34rem] text-lg leading-relaxed',
            align === 'center' && 'mx-auto',
            dark ? 'text-mist' : 'text-stone',
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
