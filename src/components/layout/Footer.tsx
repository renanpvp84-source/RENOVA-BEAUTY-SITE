import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from '@/components/icons/BrandIcons';
import { Logo } from '@/components/ui/Logo';
import { footerNav } from '@/data/navigation';
import { serviceCategories } from '@/data/services';
import { siteConfig } from '@/data/siteConfig';
import { addressLine, businessHoursText } from '@/lib/format';
import { whatsappLink } from '@/lib/whatsapp';

const columnTitle = 'eyebrow text-champagne';
const linkClass =
  'inline-flex min-h-9 items-center text-[0.95rem] text-bone/80 transition-colors hover:text-champagne';

export function Footer() {
  const { brand, whatsapp, phone, email, socialLinks, policies, demoMode } = siteConfig;
  const footerServices = serviceCategories.filter((category) => category.id !== 'outros').slice(0, 6);

  const social = [
    { label: 'Instagram', href: socialLinks.instagram, Icon: InstagramIcon },
    { label: 'Facebook', href: socialLinks.facebook, Icon: FacebookIcon },
    { label: 'TikTok', href: socialLinks.tiktok, Icon: TikTokIcon },
  ].filter((item) => item.href);

  return (
    <footer data-theme="dark" className="border-t border-bone/10 bg-ink pb-24 text-bone md:pb-0">
      <div className="container-site grid gap-x-10 gap-y-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo variant="stack" />
          <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed text-mist">
            {brand.tagline}. Cabelo, unhas, maquiagem, sobrancelhas e depilação no mesmo endereço.
          </p>
        </div>

        <nav aria-label="Rodapé" className="lg:col-span-2">
          <h2 className={columnTitle}>Navegação</h2>
          <ul className="mt-5">
            {footerNav.map((item) => (
              <li key={item.sectionId}>
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <h2 className={columnTitle}>Serviços</h2>
          <ul className="mt-5">
            {footerServices.map((category) => (
              <li key={category.id}>
                <a href="/#servicos" className={linkClass}>
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className={columnTitle}>Contato</h2>
          <ul className="mt-5">
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkClass} gap-2`}
              >
                <WhatsAppIcon size={16} />
                {whatsapp.display}
                <span className="sr-only"> (abre o WhatsApp em nova aba)</span>
              </a>
            </li>
            {phone.number && (
              <li>
                <a href={`tel:${phone.number}`} className={linkClass}>
                  {phone.display}
                </a>
              </li>
            )}
            {email && (
              <li>
                <a href={`mailto:${email}`} className={linkClass}>
                  {email}
                </a>
              </li>
            )}
            <li className="mt-2 text-[0.95rem] leading-relaxed text-mist">
              {addressLine()}
              <br />
              {businessHoursText()}
            </li>
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className={columnTitle}>Redes</h2>
          <ul className="mt-5">
            {social.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} gap-2`}
                >
                  <Icon size={16} />
                  {label}
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-bone/10">
        <div className="container-site flex flex-col gap-4 py-6 text-sm text-mist lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}. Todos os direitos reservados.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {policies.map((policy) => (
              <li key={policy.id}>
                <a
                  href={`/politicas#${policy.id}`}
                  className="inline-flex min-h-9 items-center transition-colors hover:text-champagne"
                >
                  {policy.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {demoMode && (
          <p className="container-site pb-6 text-xs text-mist">
            Versão de demonstração: contatos, serviços e textos aguardam confirmação do salão.
          </p>
        )}
      </div>
    </footer>
  );
}
