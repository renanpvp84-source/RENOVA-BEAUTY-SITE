import { siteConfig } from '@/data/siteConfig';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/** Dados estruturados (schema.org). Só inclui o que está preenchido no siteConfig. */
export function structuredData() {
  const { brand, address, businessHours, whatsapp, socialLinks, url, seo, email } = siteConfig;

  const postalAddress: Record<string, string> = {
    '@type': 'PostalAddress',
    streetAddress: `${address.street} - ${address.district}`,
    addressCountry: 'BR',
  };
  if (address.city) postalAddress.addressLocality = address.city;
  if (address.state) postalAddress.addressRegion = address.state;
  if (address.postalCode) postalAddress.postalCode = address.postalCode;

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: brand.name,
    description: seo.description,
    url,
    telephone: `+${whatsapp.number}`,
    address: postalAddress,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: businessHours.openDays.map((day) => DAYS[day]),
        opens: businessHours.opens,
        closes: businessHours.closes,
      },
    ],
    sameAs: Object.values(socialLinks).filter(Boolean),
  };
  if (email) data.email = email;

  return data;
}
