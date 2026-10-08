import { BookingSection } from '@/components/BookingSection';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Booking() {
  return (
    <section
      id="agendamento"
      data-theme="dark"
      aria-labelledby="agendamento-titulo"
      className="section-y bg-ink text-bone"
    >
      <div className="container-site">
        <SectionHeading
          id="agendamento-titulo"
          tone="dark"
          eyebrow="Agendamento"
          title={
            <>
              Seu próximo momento <em>começa aqui.</em>
            </>
          }
          lead="Escolha o serviço, o dia e o horário. A equipe confirma com você pelo WhatsApp."
        />
        <div data-reveal="up" className="mt-12 lg:mt-16">
          <BookingSection />
        </div>
      </div>
    </section>
  );
}
