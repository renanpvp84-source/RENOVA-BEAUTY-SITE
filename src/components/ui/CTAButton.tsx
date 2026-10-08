import { ArrowRight, ArrowUpRight, CalendarDays } from 'lucide-react';
import type { ReactNode } from 'react';
import { WhatsAppIcon } from '@/components/icons/BrandIcons';
import { cn } from '@/lib/cn';

type Variant = 'solid' | 'outline' | 'outline-dark' | 'ink' | 'text';
type Size = 'md' | 'sm';
type Icon = 'arrow' | 'external' | 'whatsapp' | 'calendar' | 'none';

interface CTAButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: Icon;
  /** Abre em nova aba (WhatsApp, Instagram, mapa). */
  external?: boolean;
  className?: string;
  onClick?: () => void;
}

const variants: Record<Variant, string> = {
  /* Ação principal: champagne cheio. */
  solid: 'bg-champagne text-ink hover:bg-bone',
  /* Secundária sobre fundo escuro. */
  outline: 'border border-bone/45 text-bone hover:border-bone hover:bg-bone hover:text-ink',
  /* Secundária sobre fundo claro. */
  'outline-dark': 'border border-ink/55 text-ink hover:border-ink hover:bg-ink hover:text-bone',
  /* Principal sobre fundo claro. */
  ink: 'bg-ink text-bone hover:bg-bronze',
  /* Link de texto com sublinhado. */
  text: '',
};

const sizes: Record<Size, string> = {
  md: 'min-h-[3.25rem] px-7 text-[0.75rem]',
  sm: 'min-h-11 px-5 text-[0.6875rem]',
};

function ButtonIcon({ icon }: { icon: Icon }) {
  const motion =
    'transition-transform duration-300 ease-out motion-safe:group-hover/btn:translate-x-0.5';
  if (icon === 'arrow') return <ArrowRight aria-hidden size={16} strokeWidth={1.5} className={motion} />;
  if (icon === 'external')
    return <ArrowUpRight aria-hidden size={16} strokeWidth={1.5} className={motion} />;
  if (icon === 'whatsapp') return <WhatsAppIcon size={18} />;
  if (icon === 'calendar') return <CalendarDays aria-hidden size={16} strokeWidth={1.5} />;
  return null;
}

/** Botão/links de ação. Sempre um <a> real: funciona sem JavaScript. */
export function CTAButton({
  href,
  children,
  variant = 'solid',
  size = 'md',
  icon = 'none',
  external = false,
  className,
  onClick,
}: CTAButtonProps) {
  const isText = variant === 'text';

  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'group/btn inline-flex items-center justify-center gap-3 font-medium uppercase tracking-[0.2em] transition-colors duration-300 ease-out',
        isText ? 'min-h-11 self-start text-[0.75rem]' : sizes[size],
        variants[variant],
        className,
      )}
    >
      {icon === 'whatsapp' || icon === 'calendar' ? <ButtonIcon icon={icon} /> : null}
      <span className={isText ? 'link-line' : undefined}>{children}</span>
      {icon === 'arrow' || icon === 'external' ? <ButtonIcon icon={icon} /> : null}
      {external && <span className="sr-only"> (abre em nova aba)</span>}
    </a>
  );
}
