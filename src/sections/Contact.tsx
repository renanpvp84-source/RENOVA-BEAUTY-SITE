import { ContactSection } from '@/components/ContactSection';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Contact() {
  return (
    <section
      id="contato"
      data-theme="light"
      aria-labelledby="contato-titulo"
      className="section-y bg-bone text-ink"
    >
      <div className="container-site">
        <SectionHeading
          id="contato-titulo"
          eyebrow="Contato"
          title={
            <>
              Estamos esperando <em>por você.</em>
            </>
          }
        />
        <div className="mt-12 lg:mt-16">
          <ContactSection />
        </div>
      </div>
    </section>
  );
}
