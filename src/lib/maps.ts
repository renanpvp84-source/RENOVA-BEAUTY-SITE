import { siteConfig } from '@/data/siteConfig';

const query = encodeURIComponent(siteConfig.map.query);

/** Mapa incorporado (não exige chave de API). */
export const mapEmbedUrl = `https://www.google.com/maps?q=${query}&output=embed`;

/** Abre o trajeto no Google Maps. */
export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`;
