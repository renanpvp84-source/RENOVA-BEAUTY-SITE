import { Quote } from 'lucide-react';
import { ReviewCard } from '@/components/ReviewCard';
import { CTAButton } from '@/components/ui/CTAButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { reviews, stats } from '@/data/content';
import { siteConfig } from '@/data/siteConfig';
import { formatNumber } from '@/lib/format';
import { whatsappLink } from '@/lib/whatsapp';

const feedbackMessage = 'Olá! Fui atendida na Renova Beauty e quero contar como foi a minha experiência.';

export function Reviews() {
  const { demoMode, googleReviewsUrl } = siteConfig;
  const visibleStats = stats.filter((stat) => stat.value !== null);

  return (
    <section
      id="avaliacoes"
      data-theme="light"
      aria-labelledby="avaliacoes-titulo"
      className="section-y bg-sand text-ink"
    >
      <div className="container-site">
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <SectionHeading
            id="avaliacoes-titulo"
            className="lg:col-span-6"
            eyebrow="Avaliações"
            title={
              <>
                Quem vive a experiência, <em>conta.</em>
              </>
            }
          />

          {/* Prova social: só números reais (ver data/content.ts -> stats). */}
          {visibleStats.length > 0 && (
            <dl
              data-reveal-group
              className="grid grid-cols-2 gap-x-8 gap-y-8 self-end lg:col-span-5 lg:col-start-8"
            >
              {visibleStats.map((stat) => (
                <div key={stat.label} data-reveal-item className="border-t border-ink/25 pt-4">
                  <dd className="font-display text-[2.75rem] leading-none tabular-nums lg:text-[3.5rem]">
                    <span data-count={stat.value ?? undefined}>{formatNumber(stat.value ?? 0)}</span>
                    {stat.suffix}
                  </dd>
                  <dt className="mt-3 text-[0.95rem] leading-snug text-stone">{stat.label}</dt>
                </div>
              ))}
            </dl>
          )}
        </div>

        {reviews.length > 0 ? (
          <ul data-reveal-group className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <ReviewCard key={`${review.name}-${review.text.slice(0, 16)}`} review={review} />
            ))}
          </ul>
        ) : (
          <div
            data-reveal="up"
            className="mt-14 grid gap-x-12 gap-y-8 border-y border-ink/20 py-10 lg:mt-20 lg:grid-cols-12 lg:items-center lg:py-14"
          >
            <div className="lg:col-span-7">
              <Quote aria-hidden size={36} strokeWidth={1} className="text-bronze" />
              <p className="mt-5 font-display text-[1.75rem] leading-snug lg:text-[2.25rem]">
                Já passou pela Renova? Conte como foi.
              </p>
              <p className="mt-4 max-w-xl leading-relaxed text-stone">
                {demoMode
                  ? 'Nenhum depoimento foi inventado para este site. Os cartões de avaliação aparecem aqui assim que o salão enviar as avaliações reais ou conectar o Google.'
                  : 'Sua opinião ajuda outras clientes a escolher e a nossa equipe a cuidar cada vez melhor.'}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
              {googleReviewsUrl && (
                <CTAButton href={googleReviewsUrl} variant="ink" icon="external" external>
                  Avaliar no Google
                </CTAButton>
              )}
              <CTAButton
                href={whatsappLink(feedbackMessage)}
                variant={googleReviewsUrl ? 'outline-dark' : 'ink'}
                icon="whatsapp"
                external
              >
                Contar minha experiência
              </CTAButton>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
