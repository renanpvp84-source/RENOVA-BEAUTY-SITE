import type { StaticImageData } from 'next/image';

/**
 * Origem de cada informação exibida no site.
 * - "confirmado": aparece no material do salão (bio, destaques, fotos, fachada).
 * - "a-confirmar": sugestão de estrutura; só vai ao ar depois que o salão confirmar.
 */
export type InfoStatus = 'confirmado' | 'a-confirmar';

export interface SiteImage {
  src: StaticImageData;
  alt: string;
  /** Ponto focal para object-position (ex.: "50% 20%"). */
  focus?: string;
}

export interface NavItem {
  label: string;
  href: string;
  /** id da seção, usado para marcar o item ativo durante a rolagem. */
  sectionId: string;
}

export interface Differential {
  title: string;
  description: string;
}

export interface ServiceItem {
  name: string;
  status: InfoStatus;
}

export type ServiceCategoryId =
  | 'cabelos'
  | 'unhas'
  | 'maquiagem'
  | 'penteados'
  | 'depilacao'
  | 'sobrancelhas'
  | 'tratamentos'
  | 'outros';

export interface ServiceCategory {
  id: ServiceCategoryId;
  name: string;
  summary: string;
  /** De onde veio a confirmação da categoria (para conferência com o salão). */
  evidence: string;
  items: ServiceItem[];
}

export interface ServiceFeature {
  categoryId: ServiceCategoryId;
  title: string;
  quote: string;
  body: string;
  images: SiteImage[];
}

export interface BeforeAfterPair {
  id: string;
  label: string;
  /** Sem foto de "antes", o componente mostra um espaço reservado identificado. */
  before: SiteImage | null;
  after: SiteImage;
}

export interface ResultItem {
  image: SiteImage;
  category: string;
}

export interface TeamMember {
  /** Vazio = espaço reservado (aparece apenas em modo demonstração). */
  name: string;
  role: string;
  bio: string;
  photo: SiteImage | null;
}

export interface Review {
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  photo?: SiteImage;
  source?: 'google' | 'instagram' | 'whatsapp';
}

export interface Stat {
  label: string;
  /** null = ainda sem número real; o item não é exibido. */
  value: number | null;
  suffix?: string;
  note?: string;
}

export interface GalleryItem {
  image: SiteImage;
  caption: string;
}

export interface WhatsAppShortcut {
  label: string;
  message: string;
}

export interface PolicySection {
  id: string;
  title: string;
  /** Vazio = texto ainda não definido pelo salão. */
  paragraphs: string[];
}
