import type { PolicySection, WhatsAppShortcut } from '@/types';

/**
 * ÚNICA fonte de dados da empresa.
 * Tudo que é telefone, endereço, horário, rede social ou texto legal sai daqui.
 * Campos vazios ('' ou []) simplesmente não aparecem no site.
 *
 * Itens marcados com "CONFIRMAR" vieram do perfil do Instagram e precisam
 * do OK do salão antes da publicação.
 */

const whatsappShortcuts: WhatsAppShortcut[] = [
  {
    label: 'Agendar horário',
    message: 'Olá! Vim pelo site da Renova Beauty e gostaria de agendar um horário.',
  },
  {
    label: 'Consultar serviços',
    message: 'Olá! Vim pelo site da Renova Beauty e gostaria de conhecer os serviços.',
  },
  {
    label: 'Consultar valores',
    message: 'Olá! Vim pelo site da Renova Beauty e gostaria de consultar valores.',
  },
  {
    label: 'Tirar dúvidas',
    message: 'Olá! Vim pelo site da Renova Beauty e tenho uma dúvida.',
  },
  {
    label: 'Falar com atendimento',
    message: 'Olá! Vim pelo site da Renova Beauty e gostaria de falar com o atendimento.',
  },
];

const policies: PolicySection[] = [
  { id: 'privacidade', title: 'Privacidade', paragraphs: [] },
  { id: 'termos', title: 'Termos de uso', paragraphs: [] },
  { id: 'agendamento', title: 'Política de agendamento', paragraphs: [] },
  { id: 'cancelamento', title: 'Política de cancelamento', paragraphs: [] },
];

export const siteConfig = {
  /**
   * true  = mostra espaços reservados (equipe, avaliações, antes/depois) e
   *         a marcação "a confirmar" nos serviços.
   * false = esconde tudo que ainda não tem dado real.
   */
  demoMode: true,

  /** Endereço público do site. Defina NEXT_PUBLIC_SITE_URL na Vercel. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',

  brand: {
    name: 'Renova Beauty',
    monogram: 'RB',
    descriptor: 'Centro de Embelezamento',
    descriptorFull: 'Centro de Embelezamento e Estética',
    tagline: 'Beleza da cabeça aos pés',
  },

  instagram: {
    handle: 'renovabeautysalao',
    url: 'https://www.instagram.com/renovabeautysalao/',
    /** Números lidos no perfil na data abaixo. Atualize ou zere (null). */
    stats: {
      posts: 435 as number | null,
      followers: 4225 as number | null,
      capturedAt: 'outubro de 2026',
    },
  },

  whatsapp: {
    /** CONFIRMAR antes de publicar. Formato: país + DDD + número, só dígitos. */
    number: '5586999708012',
    display: '+55 86 99970-8012',
    buttonLabel: 'Fale com a Renova',
    defaultMessage: 'Olá! Vim pelo site da Renova Beauty e gostaria de agendar um horário.',
    shortcuts: whatsappShortcuts,
  },

  /** Telefone fixo ou segundo número (opcional). */
  phone: { number: '', display: '' },

  email: '',

  address: {
    street: 'Av. São Raimundo, 1801',
    district: 'Cristo Rei',
    /** CONFIRMAR: cidade e estado não aparecem no material (o DDD é 86). */
    city: '',
    state: '',
    postalCode: '',
  },

  businessHours: {
    label: 'Segunda a sábado',
    shortLabel: 'Seg a Sáb',
    opens: '09:00',
    closes: '18:30',
    /** 0 = domingo … 6 = sábado. */
    openDays: [1, 2, 3, 4, 5, 6],
    /** Intervalo entre horários oferecidos no agendamento (minutos). */
    slotMinutes: 30,
  },

  map: {
    /** Texto buscado no Google Maps. Inclua a cidade quando for confirmada. */
    query: 'Renova Beauty, Av. São Raimundo, 1801, Cristo Rei',
  },

  socialLinks: {
    instagram: 'https://www.instagram.com/renovabeautysalao/',
    facebook: '',
    tiktok: '',
  },

  /** Link "Avaliar no Google" (perfil da empresa). Vazio = botão oculto. */
  googleReviewsUrl: '',

  /** Informações opcionais — preencha para exibir no rodapé/contato. */
  paymentMethods: [] as string[],
  parking: '',
  accessibility: '',
  promotions: [] as { title: string; description: string; validUntil?: string }[],
  campaigns: [] as { title: string; description: string }[],

  policies,

  seo: {
    /** Mantenha false enquanto houver dados a confirmar. */
    allowIndexing: false,
    title: 'Renova Beauty | Centro de Embelezamento — cabelo, unhas, maquiagem e depilação',
    description:
      'Renova Beauty, centro de embelezamento em Cristo Rei: cabelo, unhas, maquiagem, penteados, sobrancelhas e depilação. Segunda a sábado, das 9h às 18h30. Agende pelo WhatsApp.',
    keywords: [
      'Renova Beauty',
      'salão de beleza',
      'centro de embelezamento',
      'cabelo',
      'unhas',
      'maquiagem',
      'depilação',
      'salão de beleza Cristo Rei',
    ],
  },
};

export type SiteConfig = typeof siteConfig;
