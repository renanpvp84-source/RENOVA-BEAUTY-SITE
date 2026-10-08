import type {
  BeforeAfterPair,
  Differential,
  GalleryItem,
  ResultItem,
  Review,
  SiteImage,
  Stat,
  TeamMember,
} from '@/types';
import { images } from './images';
import { siteConfig } from './siteConfig';

/* -------------------------------------------------------------------------- */
/* Diferenciais (faixa logo abaixo do hero)                                   */
/* -------------------------------------------------------------------------- */

export const differentials: Differential[] = [
  {
    title: 'Atendimento personalizado',
    description: 'Antes de começar, a gente escuta o que você quer.',
  },
  {
    title: 'Profissionais especializados',
    description: 'Cada serviço com quem entende do assunto.',
  },
  {
    title: 'Ambiente acolhedor',
    description: 'Um espaço pensado para você relaxar enquanto é cuidada.',
  },
  {
    title: 'Resultados reais',
    description: 'As fotos deste site são de clientes atendidas aqui.',
  },
  {
    title: 'Agendamento fácil',
    description: 'Escolha o serviço e confirme pelo WhatsApp.',
  },
];

/* -------------------------------------------------------------------------- */
/* Resultados                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * Pares de antes/depois. As duas fotos de cada par precisam ter a mesma
 * proporção (o par atual veio de um story do salão: 512 x 377).
 * Sem `before`, o componente mostra um espaço reservado identificado.
 */
export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: 'cabelo-liso',
    label: 'Cabelos',
    before: images.antesCabelo,
    after: images.depoisCabelo,
  },
];

export const results: ResultItem[] = [
  { image: images.cabeloEscova, category: 'Cabelos' },
  { image: images.sobrancelhas, category: 'Sobrancelhas' },
];

/* -------------------------------------------------------------------------- */
/* Sobre                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * Texto institucional PROVISÓRIO, escrito só com o que aparece no perfil
 * do salão. Substitua pela história contada pela própria Renova.
 */
export const about = {
  paragraphs: [
    'A Renova Beauty é um centro de embelezamento em Cristo Rei que cuida da beleza da cabeça aos pés: cabelo, unhas, maquiagem, sobrancelhas, depilação e muito mais, tudo no mesmo endereço.',
    'Aqui o atendimento começa na conversa. A equipe entende o que você procura, indica o que faz sentido para o seu fio, a sua pele e a sua rotina, e cuida de cada etapa com calma.',
  ],
  pillars: [
    { title: 'Proposta', text: 'Reunir em um só lugar tudo o que você precisa para se sentir bem.' },
    { title: 'Experiência', text: 'Do lavatório ao espelho iluminado, cada etapa é parte do cuidado.' },
    { title: 'Ambiente', text: 'Salão climatizado, acolhedor e com a cara da marca.' },
    { title: 'Compromisso', text: 'Mostrar apenas resultados reais, de clientes reais.' },
  ],
  images: [images.ambienteLavatorio, images.fachada] as [SiteImage, SiteImage],
};

/* -------------------------------------------------------------------------- */
/* Equipe                                                                     */
/* -------------------------------------------------------------------------- */

export const teamPhoto: SiteImage = images.equipe;

/**
 * Nomes, cargos e especialidades NÃO foram informados.
 * Cada objeto vazio vira um espaço reservado em modo demonstração.
 * Exemplo preenchido:
 * { name: 'Nome', role: 'Cabeleireira', bio: 'Especialista em…', photo: images.x }
 */
export const team: TeamMember[] = [
  { name: '', role: '', bio: '', photo: null },
  { name: '', role: '', bio: '', photo: null },
  { name: '', role: '', bio: '', photo: null },
  { name: '', role: '', bio: '', photo: null },
];

/* -------------------------------------------------------------------------- */
/* Galeria                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * A galeria é montada em colunas (estilo revista): cada foto aparece na
 * proporção original, sem corte, e em tamanho próximo ao do arquivo.
 * A ordem abaixo é a ordem de leitura, de cima para baixo em cada coluna.
 */
export const gallery: GalleryItem[] = [
  { image: images.cabeloOndas, caption: 'Penteado semi-preso com ondas' },
  { image: images.unhasPreto, caption: 'Unhas em preto' },
  { image: images.ambienteParede, caption: 'O salão' },
  { image: images.cabeloLongo, caption: 'Cachos longos' },
  { image: images.unhasVerde, caption: 'Unhas em verde' },
  { image: images.producaoMake, caption: 'Maquiagem e penteado' },
  { image: images.cabeloCobre, caption: 'Liso em tom cobre' },
  { image: images.cabeloLoiroCachos, caption: 'Loiro com cachos' },
  { image: images.bastidoresLavagem, caption: 'Bastidores no lavatório' },
  { image: images.unhasEsmaltes, caption: 'Cores para escolher' },
  { image: images.cabeloCachos, caption: 'Cachos modelados' },
  { image: images.equipe, caption: 'A equipe' },
];

/* -------------------------------------------------------------------------- */
/* Instagram                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Grade estática com fotos do perfil. Para conteúdo dinâmico, troque esta
 * lista pelo retorno de uma integração (ver README, "Instagram dinâmico").
 */
export const instagramPosts: SiteImage[] = [
  images.cabeloMechas,
  images.unhasVermelho,
  images.sobrancelhas,
  images.heroMain,
  images.cabeloLoiroCachos,
  images.fachada,
];

/* -------------------------------------------------------------------------- */
/* Avaliações e prova social                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Somente avaliações REAIS. Enquanto a lista estiver vazia, o site mostra
 * um espaço reservado (demoMode) ou esconde a seção (produção).
 */
export const reviews: Review[] = [];

/**
 * Faixa de números. `value: null` = sem dado real, o item não aparece.
 * Os dois primeiros foram lidos no perfil do Instagram.
 */
export const stats: Stat[] = [
  {
    label: 'Seguidores no Instagram',
    value: siteConfig.instagram.stats.followers,
    note: `Perfil @${siteConfig.instagram.handle}, ${siteConfig.instagram.stats.capturedAt}`,
  },
  {
    label: 'Publicações com trabalhos e bastidores',
    value: siteConfig.instagram.stats.posts,
  },
  { label: 'Clientes atendidas', value: null, suffix: '+' },
  { label: 'Profissionais', value: null },
  { label: 'Serviços', value: null },
  { label: 'Anos de experiência', value: null },
];
