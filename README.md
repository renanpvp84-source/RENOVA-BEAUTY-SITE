# Renova Beauty — site

Site da Renova Beauty (Centro de Embelezamento), feito em Next.js (App Router), React, TypeScript e Tailwind CSS, com animações em GSAP + ScrollTrigger e rolagem suave com Lenis.

> **Estado atual: demonstração.** O site está completo e funcional, mas parte do conteúdo ainda depende de confirmação do salão. Veja [O que ainda é demonstração](#o-que-ainda-é-demonstração) antes de divulgar o endereço.

## Como rodar

Requer Node.js 20.9 ou mais novo.

```bash
npm install
npm run dev        # http://localhost:3000
```

Para conferir a versão de produção na sua máquina:

```bash
npm run build
npm run start
```

`npm run typecheck` confere os tipos sem gerar o build.

## Como publicar (Vercel)

1. Envie esta pasta para um repositório no GitHub (sem `node_modules` e `.next`; o `.gitignore` já cuida disso).
2. Na Vercel: **Add New › Project**, importe o repositório e clique em **Deploy**. Não é preciso mudar nenhuma configuração.
3. Em **Settings › Environment Variables**, crie `NEXT_PUBLIC_SITE_URL` com o endereço final (ex.: `https://www.renovabeauty.com.br`) e faça um novo deploy. Esse valor alimenta SEO, sitemap e a imagem de compartilhamento.
4. Quando todos os dados estiverem confirmados, mude `seo.allowIndexing` para `true` em `src/data/siteConfig.ts`. Até lá, o site pede aos buscadores para não ser indexado.

## Onde editar

Todo o conteúdo fica em `src/data`. Nenhum telefone, endereço ou texto de serviço está espalhado pelos componentes.

| Quero mudar… | Arquivo |
| --- | --- |
| WhatsApp, endereço, horário, Instagram, redes, e-mail, mapa, políticas, SEO | `src/data/siteConfig.ts` |
| Categorias e serviços, capítulos editoriais (Cabelos, Unhas, Maquiagem, Penteados) | `src/data/services.ts` |
| Diferenciais, antes/depois, texto "Sobre", equipe, galeria, grade do Instagram, avaliações, números | `src/data/content.ts` |
| Itens do menu | `src/data/navigation.ts` |
| Fotos (arquivo, texto alternativo e ponto focal) | `src/data/images.ts` + `public/images` |

### Trocar uma foto

Substitua o JPG em `public/images` **mantendo o mesmo nome**. Não precisa mexer em código. Para ajustar o enquadramento, altere o `focus` da imagem em `src/data/images.ts` (ex.: `'50% 30%'`).

As fotos atuais foram recortadas de capturas de tela do Instagram (cada uma tem cerca de 280 a 360 px de largura) e passaram por um modelo de super-resolução para recuperar nitidez. O layout mostra cada foto perto do tamanho que ela aguenta: por isso a galeria usa colunas estreitas e o comparador antes/depois e a foto da equipe são menores. **Peça ao salão os arquivos originais**: com eles dá para voltar a usar fotos grandes (hero em tela cheia, galeria com destaques).

### Serviços "a confirmar"

Cada serviço tem `status: 'confirmado'` (aparece no material do salão) ou `status: 'a-confirmar'` (sugestão). Em modo demonstração os itens a confirmar aparecem tracejados e com asterisco; com `demoMode: false` eles somem.

### Equipe, avaliações e antes/depois

- **Equipe** (`team` em `content.ts`): preencha `name`, `role`, `bio` e `photo`. Objetos vazios são espaços reservados.
- **Avaliações** (`reviews`): só avaliações reais. Com a lista vazia, a seção convida a cliente a contar como foi.
- **Antes/depois** (`beforeAfterPairs`): preencha `before` com a foto do antes. O comparador já funciona com mouse, toque e teclado.
- **Números** (`stats`): itens com `value: null` não aparecem.

### Modo demonstração

`demoMode` em `siteConfig.ts`:

- `true` (atual): mostra espaços reservados e a marcação "a confirmar".
- `false`: esconde tudo que não tem dado real (profissionais sem nome, serviços a confirmar, antes/depois sem par, aviso no rodapé).

## Estrutura

```
src/
  app/          rotas (home, /politicas), SEO (robots, sitemap, Open Graph, ícone)
  layouts/      SiteLayout: casca com header, rodapé e atalhos fixos
  sections/     uma seção da home por arquivo, na ordem do fluxo de conversão
  components/   peças reutilizáveis
    layout/     Header, MobileMenu, MobileBottomNav, Footer, WhatsAppButton,
                SmoothScroll (Lenis), ScrollAnimations (GSAP), UIProvider
    ui/         CTAButton, SectionHeading, FramedImage, Logo, ActionLinks
    icons/      ícones de marca (Instagram, WhatsApp, Facebook, TikTok)
    ServiceGrid, ServiceCard, BeforeAfter, Gallery, TeamCard, ReviewCard,
    InstagramGrid, BookingSection, ContactSection
  data/         conteúdo editável (ver tabela acima)
  hooks/        useMediaQuery, useReducedMotion, useScrollLock
  lib/          gsap (registro único), motion (tokens de animação), whatsapp,
                booking (datas e horários), maps, format, seo
  styles/       globals.css: tokens de cor/tipografia e utilitários do projeto
  types/        tipos compartilhados
  fonts/        Bodoni Moda e Jost (licença SIL OFL), servidas pelo próprio site
```

## Animações

- **Lenis + GSAP no mesmo laço**: o ticker do GSAP chama `lenis.raf` e cada evento de rolagem atualiza o ScrollTrigger (`components/layout/SmoothScroll.tsx`).
- **Um orquestrador** (`components/layout/ScrollAnimations.tsx`): as seções só declaram a intenção com atributos `data-reveal`, `data-reveal-group`, `data-parallax` e `data-count`. Durações e curvas ficam em `lib/motion.ts`.
- **Hero**: entrada própria em `sections/Hero.tsx` (espelho se revela, título sobe por máscara, depois texto e botões).
- **Header**: transparente no topo; ao rolar fica compacto, sólido e com blur leve.
- **Reduzir movimento**: com essa preferência ativa no sistema, o Lenis não é criado e nenhuma animação roda; o conteúdo aparece completo. Sem JavaScript o site também é legível.

## Agendamento

Fluxo em 5 passos (serviço, profissional, data, horário, confirmação). No final, abre o WhatsApp do salão com a mensagem pronta; **a confirmação do horário é feita pela equipe**. Não há agenda online nem bloqueio de horários ocupados.

Para integrar um sistema de agenda (ou Supabase), o ponto de troca é `handleConfirm` em `components/BookingSection.tsx`; datas e horários vêm de `lib/booking.ts`.

## Instagram dinâmico

A grade usa a lista estática `instagramPosts` (`content.ts`). Para conteúdo automático, crie uma função no servidor que busque os posts (API do Instagram ou serviço intermediário) e passe o resultado para `<InstagramGrid posts={...} />`, que já recebe a lista por propriedade.

## O que ainda é demonstração

Vieram do perfil do Instagram e **precisam do OK do salão**:

- WhatsApp `+55 86 99970-8012`
- Endereço `Av. São Raimundo, 1801 – Cristo Rei` (cidade e estado não aparecem no material; o campo está vazio)
- Horário `segunda a sábado, 9h às 18h30`
- Lista de serviços (os marcados como "a confirmar")
- Números do Instagram (4.225 seguidores, 435 publicações, lidos em outubro de 2026)

Ainda não foram enviados (o site mostra espaço reservado ou esconde):

- Nomes, fotos e especialidades da equipe
- Avaliações de clientes e link do Google
- Mais pares de antes/depois (há um, tirado de um story do salão)
- Preços, formas de pagamento, estacionamento, acessibilidade
- Textos das políticas (privacidade, termos, agendamento, cancelamento)
- História do salão: o texto de "Sobre" é provisório
- Logotipo em vetor (o site compõe a assinatura com a fonte de títulos)
- Fotos em alta resolução

## Antes de publicar

- [ ] Confirmar WhatsApp, endereço completo e horário
- [ ] Trocar as fotos pelos originais
- [ ] Revisar serviços e mudar `status` para `confirmado`
- [ ] Preencher equipe, avaliações e antes/depois (ou usar `demoMode: false`)
- [ ] Escrever as políticas em `siteConfig.policies`
- [ ] Definir `NEXT_PUBLIC_SITE_URL` e `seo.allowIndexing: true`
- [ ] Conferir se o mapa aponta para o lugar certo (`map.query`)
