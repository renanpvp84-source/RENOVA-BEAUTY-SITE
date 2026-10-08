import { UserRound } from 'lucide-react';
import Image from 'next/image';
import type { TeamMember } from '@/types';

/**
 * Cartão de profissional.
 * Com dados: foto em arco, nome, especialidade e descrição.
 * Sem nome cadastrado: espaço reservado compacto (só em modo demonstração) —
 * nenhum nome, cargo ou especialidade é inventado.
 */
export function TeamCard({ member }: { member: TeamMember }) {
  if (!member.name) {
    return (
      <li data-reveal-item className="flex items-center gap-4 border-t border-ink/20 pt-5">
        <span className="placeholder-hatch frame-arch flex h-[4.5rem] w-14 shrink-0 items-center justify-center text-bronze/80">
          <UserRound aria-hidden size={22} strokeWidth={1.25} />
        </span>
        <span>
          <span className="block font-display text-xl leading-tight text-stone">
            Nome da profissional
          </span>
          <span className="eyebrow mt-1.5 block text-bronze">Especialidade</span>
        </span>
      </li>
    );
  }

  return (
    <li data-reveal-item>
      {member.photo && (
        <div className="frame-arch relative aspect-[4/5] overflow-hidden bg-sand">
          <Image
            src={member.photo.src}
            alt={member.photo.alt}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 280px, 45vw"
            className="object-cover"
            style={{ objectPosition: member.photo.focus }}
          />
        </div>
      )}
      <h3 className="mt-5 font-display text-2xl leading-tight">{member.name}</h3>
      <p className="eyebrow mt-2 text-bronze">{member.role}</p>
      {member.bio && <p className="mt-3 text-[0.95rem] leading-relaxed text-stone">{member.bio}</p>}
    </li>
  );
}
