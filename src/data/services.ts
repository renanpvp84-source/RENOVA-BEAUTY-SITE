import type { ServiceCategory, ServiceFeature } from '@/types';
import { images } from './images';

/**
 * Categorias e serviços.
 *
 * status "confirmado"  -> citado no material do salão (bio, destaques, reels, fachada).
 * status "a-confirmar" -> sugestão; em produção (demoMode = false) fica oculto.
 *
 * Para adicionar/remover um serviço, edite apenas este arquivo.
 */
export const serviceCategories: ServiceCategory[] = [
  {
    id: 'cabelos',
    name: 'Cabelos',
    summary: 'Do liso alinhado às ondas modeladas, com tratamento para manter o fio saudável.',
    evidence: 'Bio do Instagram, destaque "Progressiva", reel "Nutrição, baby liss e muito mais".',
    items: [
      { name: 'Progressiva', status: 'confirmado' },
      { name: 'Nutrição', status: 'confirmado' },
      { name: 'Baby liss', status: 'confirmado' },
      { name: 'Escova', status: 'a-confirmar' },
      { name: 'Corte', status: 'a-confirmar' },
      { name: 'Coloração', status: 'a-confirmar' },
      { name: 'Mechas', status: 'a-confirmar' },
    ],
  },
  {
    id: 'unhas',
    name: 'Unhas',
    summary: 'Esmaltação caprichada, do vermelho clássico aos tons nude.',
    evidence: 'Bio do Instagram, destaque "Unhas", fotos de esmaltação.',
    items: [
      { name: 'Esmaltação', status: 'confirmado' },
      { name: 'Manicure', status: 'a-confirmar' },
      { name: 'Pedicure', status: 'a-confirmar' },
      { name: 'Alongamento', status: 'a-confirmar' },
      { name: 'Esmaltação em gel', status: 'a-confirmar' },
    ],
  },
  {
    id: 'maquiagem',
    name: 'Maquiagem',
    summary: 'Make para a sua ocasião, com a opção de sair com o penteado pronto.',
    evidence: 'Destaque "MAKE + penteado" e fotos de produção.',
    items: [
      { name: 'Maquiagem + penteado', status: 'confirmado' },
      { name: 'Maquiagem social', status: 'a-confirmar' },
      { name: 'Maquiagem para eventos', status: 'a-confirmar' },
    ],
  },
  {
    id: 'penteados',
    name: 'Penteados',
    summary: 'Ondas, semi-presos e produções para datas especiais.',
    evidence: 'Destaque "MAKE + penteado" e fotos de penteados.',
    items: [
      { name: 'Ondas modeladas', status: 'confirmado' },
      { name: 'Semi-preso', status: 'confirmado' },
      { name: 'Preso', status: 'a-confirmar' },
      { name: 'Produções especiais', status: 'a-confirmar' },
    ],
  },
  {
    id: 'depilacao',
    name: 'Depilação',
    summary: 'Pele lisa e bem cuidada. Consulte as regiões atendidas e os combos.',
    evidence: 'Bio do Instagram, destaque "Depilação" e tabela na porta do salão.',
    items: [
      { name: 'Depilação facial', status: 'a-confirmar' },
      { name: 'Depilação corporal', status: 'a-confirmar' },
    ],
  },
  {
    id: 'sobrancelhas',
    name: 'Sobrancelhas',
    summary: 'Fios alinhados e desenho que valoriza o olhar.',
    evidence: 'Reel "Lamination".',
    items: [
      { name: 'Brow lamination', status: 'confirmado' },
      { name: 'Design de sobrancelhas', status: 'a-confirmar' },
      { name: 'Design com henna', status: 'a-confirmar' },
    ],
  },
  {
    id: 'tratamentos',
    name: 'Tratamentos',
    summary: 'Cuidados no lavatório para devolver brilho, força e maciez.',
    evidence: 'Reel "Nutrição", campanha com hidratação capilar e reel sobre tratamento com café.',
    items: [
      { name: 'Hidratação capilar', status: 'confirmado' },
      { name: 'Nutrição capilar', status: 'confirmado' },
      { name: 'Tratamento com café', status: 'a-confirmar' },
    ],
  },
  {
    id: 'outros',
    name: 'Outros serviços',
    summary: 'Combos de segunda a sábado e produtos para continuar o cuidado em casa.',
    evidence: 'Bio do Instagram ("Combos de seg a sábado") e destaque "Produtos".',
    items: [
      { name: 'Combos de serviços', status: 'confirmado' },
      { name: 'Venda de produtos', status: 'confirmado' },
    ],
  },
];

/** Os quatro capítulos editoriais logo abaixo do índice de serviços. */
export const serviceFeatures: ServiceFeature[] = [
  {
    categoryId: 'cabelos',
    title: 'Cabelos',
    quote: 'Valorize seu estilo, sua personalidade e seu momento.',
    body: 'Progressiva, nutrição, baby liss e finalização: o cabelo sai do lavatório tratado e da cadeira do jeito que você imaginou.',
    images: [images.cabeloMechas, images.cabeloCachos],
  },
  {
    categoryId: 'unhas',
    title: 'Unhas',
    quote: 'Detalhes que completam o seu visual.',
    body: 'Uma prateleira inteira de cores e o cuidado de quem olha cada cantinho. É o tipo de detalhe que todo mundo repara.',
    images: [images.unhasPreto, images.unhasNude],
  },
  {
    categoryId: 'maquiagem',
    title: 'Maquiagem',
    quote: 'Sua beleza para cada ocasião.',
    body: 'Make e penteado feitos no mesmo lugar. Você chega de cara lavada e sai pronta para o evento.',
    images: [images.producaoMake],
  },
  {
    categoryId: 'penteados',
    title: 'Penteados',
    quote: 'Produções pensadas para momentos especiais.',
    body: 'Ondas, tranças e semi-presos modelados mecha por mecha, para durar a festa inteira.',
    images: [images.cabeloOndas, images.bastidoresBabyliss],
  },
];
