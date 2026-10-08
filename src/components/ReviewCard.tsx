import { Star } from 'lucide-react';
import Image from 'next/image';
import type { Review } from '@/types';

const sources: Record<NonNullable<Review['source']>, string> = {
  google: 'Avaliação no Google',
  instagram: 'Comentário no Instagram',
  whatsapp: 'Mensagem no WhatsApp',
};

/** Depoimento real de cliente (dados em data/content.ts -> reviews). */
export function ReviewCard({ review }: { review: Review }) {
  return (
    <li data-reveal-item className="flex flex-col border-t border-ink/20 pt-6">
      <p className="flex gap-1 text-bronze" role="img" aria-label={`Nota ${review.rating} de 5`}>
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            aria-hidden
            size={16}
            strokeWidth={1.25}
            fill={index < review.rating ? 'currentColor' : 'none'}
          />
        ))}
      </p>
      <blockquote className="mt-5 flex-1 font-display text-[1.375rem] leading-snug">
        “{review.text}”
      </blockquote>
      <footer className="mt-6 flex items-center gap-3">
        {review.photo && (
          <Image
            src={review.photo.src}
            alt=""
            width={44}
            height={44}
            className="size-11 rounded-full object-cover"
          />
        )}
        <div>
          <p className="text-[0.8125rem] font-medium uppercase tracking-[0.16em]">{review.name}</p>
          {review.source && <p className="text-sm text-stone">{sources[review.source]}</p>}
        </div>
      </footer>
    </li>
  );
}
