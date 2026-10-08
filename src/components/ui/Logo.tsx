import { siteConfig } from '@/data/siteConfig';
import { cn } from '@/lib/cn';

interface LogoProps {
  className?: string;
  /** "stack" = com monograma em cima (rodapé); "line" = assinatura do header. */
  variant?: 'line' | 'stack';
}

/**
 * Assinatura tipográfica da marca, composta com a fonte de títulos.
 * Quando o logotipo vetorial (SVG) for enviado, basta trocá-lo aqui.
 */
export function Logo({ className, variant = 'line' }: LogoProps) {
  const { name, descriptor, descriptorFull, monogram } = siteConfig.brand;

  return (
    <a
      href="/#inicio"
      aria-label={`${name} — voltar ao início`}
      className={cn(
        'inline-flex flex-col text-champagne',
        variant === 'stack' ? 'items-start gap-3' : 'gap-1.5',
        className,
      )}
    >
      {variant === 'stack' && (
        <span aria-hidden className="font-display text-5xl leading-none tracking-[-0.06em]">
          {monogram}
        </span>
      )}
      <span
        className={cn(
          'whitespace-nowrap font-display uppercase leading-none',
          variant === 'stack'
            ? 'text-3xl tracking-[0.1em]'
            : 'text-[1rem] tracking-[0.12em] sm:text-[1.1rem] sm:tracking-[0.14em] md:text-[1.25rem]',
        )}
      >
        {name}
      </span>
      <span
        className={cn(
          'whitespace-nowrap font-medium uppercase leading-none text-champagne/80',
          variant === 'stack'
            ? 'text-[0.625rem] tracking-[0.2em] sm:text-[0.65rem] sm:tracking-[0.36em]'
            : 'text-[0.5625rem] tracking-[0.2em] sm:tracking-[0.38em]',
        )}
      >
        {variant === 'stack' ? descriptorFull : descriptor}
      </span>
    </a>
  );
}
