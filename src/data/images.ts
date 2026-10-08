import type { SiteImage } from '@/types';

import ambienteLavatorio from '../../public/images/ambiente-lavatorio.jpg';
import ambienteParede from '../../public/images/ambiente-parede.jpg';
import antesCabelo from '../../public/images/antes-cabelo.jpg';
import atmosfera from '../../public/images/atmosfera.jpg';
import bastidoresBabyliss from '../../public/images/bastidores-babyliss.jpg';
import bastidoresLavatorio from '../../public/images/bastidores-lavatorio.jpg';
import cabeloCachos from '../../public/images/cabelo-cachos.jpg';
import cabeloEscova from '../../public/images/cabelo-escova.jpg';
import bastidoresLavagem from '../../public/images/bastidores-lavagem.jpg';
import cabeloCobre from '../../public/images/cabelo-cobre.jpg';
import cabeloLoiroCachos from '../../public/images/cabelo-loiro-cachos.jpg';
import cabeloLongo from '../../public/images/cabelo-longo.jpg';
import cabeloMechas from '../../public/images/cabelo-mechas.jpg';
import cabeloOndas from '../../public/images/cabelo-ondas.jpg';
import depoisCabelo from '../../public/images/depois-cabelo.jpg';
import equipe from '../../public/images/equipe.jpg';
import fachada from '../../public/images/fachada.jpg';
import heroMain from '../../public/images/hero-main.jpg';
import producaoMake from '../../public/images/producao-make.jpg';
import sobrancelhas from '../../public/images/sobrancelhas.jpg';
import unhasEsmaltes from '../../public/images/unhas-esmaltes.jpg';
import unhasNude from '../../public/images/unhas-nude.jpg';
import unhasPreto from '../../public/images/unhas-preto.jpg';
import unhasVerde from '../../public/images/unhas-verde.jpg';
import unhasVermelho from '../../public/images/unhas-vermelho.jpg';

/**
 * Manifesto de imagens. Todas são fotos reais do perfil @renovabeautysalao.
 * Para trocar por um arquivo em alta resolução, substitua o JPG em
 * /public/images mantendo o mesmo nome — nenhum código precisa mudar.
 */
export const images = {
  heroMain: {
    src: heroMain,
    alt: 'Cliente com cabelo longo e ondulado em frente aos espelhos iluminados do salão',
    focus: '50% 30%',
  },
  atmosfera: { src: atmosfera, alt: '' },
  producaoMake: {
    src: producaoMake,
    alt: 'Cliente com maquiagem e cabelo modelado em ondas para um evento',
    focus: '55% 22%',
  },
  cabeloMechas: {
    src: cabeloMechas,
    alt: 'Cabelo com mechas iluminadas e escova modelada, visto de costas',
    focus: '50% 45%',
  },
  cabeloCachos: {
    src: cabeloCachos,
    alt: 'Cabelo escuro com cachos modelados nas pontas, visto de costas',
    focus: '50% 55%',
  },
  cabeloEscova: {
    src: cabeloEscova,
    alt: 'Cabelo preto com escova e pontas viradas para fora',
    focus: '50% 50%',
  },
  cabeloLongo: {
    src: cabeloLongo,
    alt: 'Cabelo longo e cacheado, visto de costas, em frente aos espelhos iluminados',
    focus: '50% 40%',
  },
  cabeloLoiroCachos: {
    src: cabeloLoiroCachos,
    alt: 'Cabelo loiro com cachos modelados nas pontas, visto de costas',
    focus: '50% 55%',
  },
  cabeloCobre: {
    src: cabeloCobre,
    alt: 'Cabelo liso em tom cobre, visto de costas, em frente aos espelhos do salão',
    focus: '60% 50%',
  },
  cabeloOndas: {
    src: cabeloOndas,
    alt: 'Penteado semi-preso com trança, laço e ondas longas',
    focus: '50% 35%',
  },
  bastidoresBabyliss: {
    src: bastidoresBabyliss,
    alt: 'Profissional modelando o cabelo de uma cliente com babyliss',
    focus: '45% 40%',
  },
  bastidoresLavatorio: {
    src: bastidoresLavatorio,
    alt: 'Clientes sendo atendidas nos lavatórios do salão',
    focus: '50% 55%',
  },
  unhasVermelho: {
    src: unhasVermelho,
    alt: 'Mãos com unhas esmaltadas em vermelho',
    focus: '50% 65%',
  },
  unhasNude: {
    src: unhasNude,
    alt: 'Mãos com unhas em tom nude e anéis dourados',
    focus: '50% 50%',
  },
  unhasPreto: {
    src: unhasPreto,
    alt: 'Mãos com unhas esmaltadas em preto, sobre um arranjo de lírios laranja',
    focus: '50% 45%',
  },
  unhasVerde: {
    src: unhasVerde,
    alt: 'Mãos com unhas esmaltadas em verde, ao lado de uma planta',
    focus: '45% 45%',
  },
  unhasEsmaltes: {
    src: unhasEsmaltes,
    alt: 'Mãos com unhas em tom rosado diante da prateleira de esmaltes do salão',
    focus: '50% 55%',
  },
  sobrancelhas: {
    src: sobrancelhas,
    alt: 'Sobrancelha depois de brow lamination',
    focus: '35% 30%',
  },
  equipe: {
    src: equipe,
    alt: 'Equipe da Renova Beauty reunida na entrada do salão',
    focus: '50% 60%',
  },
  ambienteParede: {
    src: ambienteParede,
    alt: 'Parede preta do salão com o letreiro dourado da Renova Beauty e arranjo de lírios',
    focus: '50% 50%',
  },
  ambienteLavatorio: {
    src: ambienteLavatorio,
    alt: 'Interior do salão com lavatórios, letreiro dourado e flores',
    focus: '50% 40%',
  },
  fachada: {
    src: fachada,
    alt: 'Fachada da Renova Beauty com letreiro e arco de balões',
    focus: '50% 30%',
  },
  antesCabelo: {
    src: antesCabelo,
    alt: 'Antes: cabelo cacheado e volumoso, visto de costas',
    focus: '50% 50%',
  },
  depoisCabelo: {
    src: depoisCabelo,
    alt: 'Depois: cabelo liso e alinhado, com mechas iluminadas, visto de costas',
    focus: '50% 50%',
  },
  bastidoresLavagem: {
    src: bastidoresLavagem,
    alt: 'Cliente sorrindo durante a lavagem do cabelo no lavatório',
    focus: '45% 40%',
  },
} satisfies Record<string, SiteImage>;
