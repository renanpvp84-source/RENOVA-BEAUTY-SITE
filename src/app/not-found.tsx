import { CTAButton } from '@/components/ui/CTAButton';

export default function NotFound() {
  return (
    <section data-theme="dark" className="bg-ink text-bone">
      <div className="container-site accent-em flex min-h-[80svh] flex-col items-start justify-center py-36">
        <p className="eyebrow text-champagne">Erro 404</p>
        <h1 className="mt-6 text-display-lg">
          Esta página <em>não existe.</em>
        </h1>
        <p className="mt-6 max-w-md text-lg text-mist">
          O endereço pode ter mudado. Volte ao início para ver serviços, resultados e agendar seu
          horário.
        </p>
        <div className="mt-9">
          <CTAButton href="/" icon="arrow">
            Voltar ao início
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
