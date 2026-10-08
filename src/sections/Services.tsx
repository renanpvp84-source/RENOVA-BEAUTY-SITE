import { ServiceGrid } from '@/components/ServiceGrid';
import { CTAButton } from '@/components/ui/CTAButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { serviceCategories } from '@/data/services';
import { siteConfig } from '@/data/siteConfig';
import { whatsappLink } from '@/lib/whatsapp';

export function Services() {
  /* Em produção, categorias sem nenhum serviço confirmado continuam visíveis
     apenas se a própria categoria foi confirmada (todas as atuais foram). */
  const categories = serviceCategories;
  const pricesMessage = siteConfig.whatsapp.shortcuts.find((s) => s.label === 'Consultar valores');

  return (
    <section
      id="servicos"
      data-theme="light"
      aria-labelledby="servicos-titulo"
      className="section-y bg-bone text-ink"
    >
      <div className="container-site grid gap-x-12 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="servicos-titulo"
              eyebrow="Serviços"
              title={
                <>
                  Tudo para realçar <em>sua beleza.</em>
                </>
              }
              lead="Serviços pensados para cuidar de você em cada detalhe."
            />
            <div data-reveal="up" className="mt-8">
              <CTAButton
                href={whatsappLink(pricesMessage?.message)}
                variant="outline-dark"
                icon="whatsapp"
                external
              >
                Consultar valores
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ServiceGrid categories={categories} />
        </div>
      </div>
    </section>
  );
}
