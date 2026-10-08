import { Clock, MapPin } from 'lucide-react';
import { InstagramIcon, WhatsAppIcon } from '@/components/icons/BrandIcons';
import { CTAButton } from '@/components/ui/CTAButton';
import { siteConfig } from '@/data/siteConfig';
import { formatHour } from '@/lib/format';
import { directionsUrl, mapEmbedUrl } from '@/lib/maps';
import { whatsappLink } from '@/lib/whatsapp';

const labelClass = 'text-[0.75rem] font-medium uppercase tracking-[0.18em] text-bronze';

/** Endereço, horário, canais e mapa. Tudo vem do siteConfig. */
export function ContactSection() {
  const { brand, address, businessHours, whatsapp, instagram, parking, accessibility, paymentMethods } =
    siteConfig;
  const cityLine = [address.city, address.state].filter(Boolean).join(' - ');

  return (
    <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <p data-reveal="up" className="font-display text-3xl uppercase tracking-[0.1em]">
          {brand.name}
        </p>

        <dl data-reveal-group className="mt-8 border-t border-ink/15">
          <div data-reveal-item className="flex gap-5 border-b border-ink/15 py-5">
            <MapPin aria-hidden size={20} strokeWidth={1.25} className="mt-1 shrink-0 text-bronze" />
            <div>
              <dt className={labelClass}>Endereço</dt>
              <dd className="mt-1.5 text-lg leading-snug">
                {address.street}
                <br />
                {address.district}
                {cityLine && (
                  <>
                    <br />
                    {cityLine}
                  </>
                )}
              </dd>
            </div>
          </div>

          <div data-reveal-item className="flex gap-5 border-b border-ink/15 py-5">
            <Clock aria-hidden size={20} strokeWidth={1.25} className="mt-1 shrink-0 text-bronze" />
            <div>
              <dt className={labelClass}>Horário</dt>
              <dd className="mt-1.5 text-lg leading-snug">
                {businessHours.label}
                <br />
                <span className="tabular-nums">
                  {formatHour(businessHours.opens)} – {formatHour(businessHours.closes)}
                </span>
              </dd>
            </div>
          </div>

          <div data-reveal-item className="flex gap-5 border-b border-ink/15 py-5">
            <WhatsAppIcon size={20} strokeWidth={1.25} className="mt-1 shrink-0 text-bronze" />
            <div>
              <dt className={labelClass}>WhatsApp</dt>
              <dd className="mt-1.5 text-lg leading-snug tabular-nums">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line"
                >
                  {whatsapp.display}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </dd>
            </div>
          </div>

          <div data-reveal-item className="flex gap-5 border-b border-ink/15 py-5">
            <InstagramIcon size={20} strokeWidth={1.25} className="mt-1 shrink-0 text-bronze" />
            <div>
              <dt className={labelClass}>Instagram</dt>
              <dd className="mt-1.5 text-lg leading-snug">
                <a
                  href={instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-line"
                >
                  @{instagram.handle}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </dd>
            </div>
          </div>
        </dl>

        {(parking || accessibility || paymentMethods.length > 0) && (
          <ul className="mt-6 space-y-1 text-[0.95rem] text-stone">
            {parking && <li>Estacionamento: {parking}</li>}
            {accessibility && <li>Acessibilidade: {accessibility}</li>}
            {paymentMethods.length > 0 && <li>Pagamento: {paymentMethods.join(', ')}</li>}
          </ul>
        )}

        <div data-reveal="up" className="mt-9 flex flex-wrap gap-3">
          <CTAButton href={directionsUrl} variant="ink" icon="external" external>
            Como chegar
          </CTAButton>
          <CTAButton href={whatsappLink()} variant="outline-dark" icon="whatsapp" external>
            Falar no WhatsApp
          </CTAButton>
        </div>
      </div>

      <div data-reveal="up" className="lg:col-span-7">
        <div className="relative aspect-[4/3] overflow-hidden bg-sand lg:aspect-auto lg:h-full lg:min-h-[30rem]">
          {/* Aparece por trás do mapa: continua útil se o mapa for bloqueado ou demorar. */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <MapPin aria-hidden size={28} strokeWidth={1.25} className="text-bronze" />
            <p className="text-lg leading-snug">
              {address.street}
              <br />
              {address.district}
            </p>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-[0.75rem] font-medium uppercase tracking-[0.2em]"
            >
              <span className="link-line">Abrir no Google Maps</span>
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </div>
          <iframe
            title={`Mapa: ${brand.name}, ${address.street}, ${address.district}`}
            src={mapEmbedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 size-full border-0 grayscale-[0.35]"
          />
        </div>
      </div>
    </div>
  );
}
