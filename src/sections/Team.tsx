import Image from 'next/image';
import { TeamCard } from '@/components/TeamCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { team, teamPhoto } from '@/data/content';
import { siteConfig } from '@/data/siteConfig';

export function Team() {
  /* Em produção só aparecem profissionais com nome cadastrado. */
  const members = siteConfig.demoMode ? team : team.filter((member) => member.name);

  return (
    <section
      id="equipe"
      data-theme="light"
      aria-labelledby="equipe-titulo"
      className="section-y bg-sand text-ink"
    >
      <div className="container-site">
        <div className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-12">
          <figure className="mx-auto w-full max-w-[26rem] lg:col-span-4 lg:mx-0">
            <div data-reveal="image" className="relative aspect-[16/15] overflow-hidden bg-bone">
              <Image
                src={teamPhoto.src}
                alt={teamPhoto.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 400px, 92vw"
                className="object-cover"
                style={{ objectPosition: teamPhoto.focus }}
              />
            </div>
            <figcaption className="mt-4 text-sm text-stone">
              A equipe da Renova Beauty na entrada do salão.
            </figcaption>
          </figure>

          <div className="lg:col-span-7 lg:col-start-6">
            <SectionHeading
              id="equipe-titulo"
              eyebrow="Equipe"
              title={
                <>
                  Profissionais que cuidam de <em>cada detalhe.</em>
                </>
              }
              lead="É este time que recebe você, do lavatório à finalização."
            />
          </div>
        </div>

        {members.length > 0 && (
          <>
            <ul
              data-reveal-group
              className="mt-14 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4"
            >
              {members.map((member, index) => (
                <TeamCard key={member.name || `vaga-${index}`} member={member} />
              ))}
            </ul>
            {siteConfig.demoMode && members.some((member) => !member.name) && (
              <p className="mt-6 text-sm text-stone">
                Espaços reservados: nomes, fotos e especialidades ainda não foram enviados pelo
                salão.
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
