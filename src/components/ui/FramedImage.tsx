import Image from 'next/image';
import type { SiteImage } from '@/types';
import { cn } from '@/lib/cn';

interface FramedImageProps {
  image: SiteImage;
  /** arco = espelho do salão; pebble = silhueta orgânica; rect = sem recorte. */
  shape?: 'arch' | 'pebble' | 'rect';
  /** Classe de proporção, ex.: "aspect-[3/4]". */
  ratio?: string;
  sizes: string;
  priority?: boolean;
  /** Aro fino deslocado em volta da moldura. */
  ring?: boolean;
  /** Halo de LED (use em fundos escuros). */
  halo?: boolean;
  /** Revela a imagem ao entrar na tela. */
  reveal?: boolean;
  /** Intensidade do parallax em % da altura (0 = desligado). */
  parallax?: number;
  className?: string;
}

const shapes = {
  arch: 'frame-arch',
  pebble: 'frame-pebble',
  rect: '',
};

/** Foto dentro da moldura da marca. */
export function FramedImage({
  image,
  shape = 'arch',
  ratio = 'aspect-[3/4]',
  sizes,
  priority = false,
  ring = false,
  halo = false,
  reveal = true,
  parallax = 0,
  className,
}: FramedImageProps) {
  return (
    <div
      data-parallax={parallax || undefined}
      className={cn(shapes[shape], ring && 'frame-ring', halo && 'halo', className)}
    >
      <div
        data-reveal={reveal ? 'image' : undefined}
        className={cn('relative overflow-hidden rounded-[inherit] bg-ink-soft', ratio)}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          className="object-cover"
          style={{ objectPosition: image.focus }}
        />
      </div>
    </div>
  );
}
