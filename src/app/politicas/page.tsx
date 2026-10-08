import type { Metadata } from 'next';
import { CTAButton } from '@/components/ui/CTAButton';
import { siteConfig } from '@/data/siteConfig';

export const metadata: Metadata = {
  title: 'Políticas',
  description: 'Privacidade, termos de uso, agendamento e cancelamento da Renova Beauty.',
  alternates: { canonical: '/politicas' },
};

/** Textos legais. O conteúdo de cada seção fica em siteConfig.policies. */
export default function PoliciesPage() {
  return (
    <section data-theme="light" className="bg-bone pb-24 pt-36 text-ink lg:pt-44">
      <div className="container-site max-w-4xl">
        <p className="eyebrow text-bronze">{siteConfig.brand.name}</p>
        <h1 className="mt-5 text-display-lg">Políticas</h1>

        <div className="mt-14 border-t border-ink/15">
          {siteConfig.policies.map((policy) => (
            <article key={policy.id} id={policy.id} className="scroll-mt-24 border-b border-ink/15 py-10">
              <h2 className="text-display-md">{policy.title}</h2>
              {policy.paragraphs.length > 0 ? (
                <div className="mt-5 max-w-2xl space-y-4 leading-relaxed text-stone">
                  {policy.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <p className="mt-5 max-w-2xl leading-relaxed text-stone">
                  Texto ainda não definido pelo salão. Enquanto isso, tire qualquer dúvida
                  diretamente pelo WhatsApp {siteConfig.whatsapp.display}.
                </p>
              )}
            </article>
          ))}
        </div>

        <div className="mt-12">
          <CTAButton href="/" variant="outline-dark" icon="arrow">
            Voltar ao início
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
