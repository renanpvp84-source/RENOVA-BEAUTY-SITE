import type { NavItem } from '@/types';

export const mainNav: NavItem[] = [
  { label: 'Início', href: '/#inicio', sectionId: 'inicio' },
  { label: 'Serviços', href: '/#servicos', sectionId: 'servicos' },
  { label: 'Sobre', href: '/#sobre', sectionId: 'sobre' },
  { label: 'Resultados', href: '/#resultados', sectionId: 'resultados' },
  { label: 'Galeria', href: '/#galeria', sectionId: 'galeria' },
  { label: 'Equipe', href: '/#equipe', sectionId: 'equipe' },
  { label: 'Avaliações', href: '/#avaliacoes', sectionId: 'avaliacoes' },
  { label: 'Contato', href: '/#contato', sectionId: 'contato' },
];

export const footerNav: NavItem[] = mainNav.filter((item) => item.sectionId !== 'avaliacoes');

export const bookingHref = '/#agendamento';
