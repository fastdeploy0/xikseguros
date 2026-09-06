# Home: cotação rápida + fachada em “A empresa”

Data: 2026-09-06  
Status: aprovado em brainstorming; aguarda revisão do arquivo antes do plano de implementação

## Objetivo

Adicionar na rota principal uma seção permanente cujo único fim é facilitar cotação imediata de produtos com handoff Porto (`porto.vc`): o visitante clica e abre a cotação. Em paralelo, enriquecer o bloco “A empresa” com a foto da fachada da Xik.

## Fora de escopo

- Redesign de Hero, Partners, Solutions, Positioning/campanha ou demais seções da home
- Copy ou lógica ligada à campanha Porto 50% OFF nesta seção (campanha permanece só nas superfícies já existentes em `campaigns.ts` / Positioning)
- Expor comissões, percentuais ou a existência de links alternativos de corretor
- Usar o link de seguro celular com comissão inferior (ver abaixo)
- Backend, analytics novos ou formulário nesta seção

## Decisões fechadas

| Tema | Decisão |
|------|----------|
| Posição na home | Após `PartnersSection`: Hero → Partners → **QuickQuote** → Consortium → Solutions → … → AboutTeaser → … |
| Produtos | Os 9 da lista comercial (celular uma vez) |
| Clique principal | Abre URL Porto em **nova aba** (`rel="noopener noreferrer"`) |
| Clique secundário | Link discreto “Saber mais” → página interna Xik do produto |
| Hierarquia do card | Superfície/CTA principal = Porto; “Saber mais” = interno |
| Campanha 50% OFF | Independente desta seção |
| Celular | Somente URL de maior comissão do corretor; a outra URL **não** entra no site |

## Produtos e URLs (fonte canônica da seção)

Ordem de exibição:

1. Equipamentos portáteis → `externalQuoteBySlug['equipamentos-portateis']`
2. Seguro de vida on → `seguro-de-vida`
3. Seguro celular → `seguro-celular` (**apenas** `...2eea7a77570444ee9f30c3269d9c20d4`)
4. Cartão de crédito Porto Bank → `cartao-credito-porto-bank`
5. Conta digital Porto Bank → `conta-digital-porto-bank`
6. Azul por Assinatura → `azul-por-assinatura`
7. Porto Serviços → `porto-servicos`
8. Residência essencial → `seguro-residencial`
9. Seguro auto → `seguro-automovel`

Paths internos via `servicePath` / `findService` a partir do slug. Rótulos preferem `Service.title` (override curto só se necessário para caber na grade).

**Proibido no repositório público e na UI:** o segundo link de celular (`...c2092b08ceb84f088f1830464f1fd7cc`) e qualquer menção a comissão ou “link A vs B”.

## Arquitetura de dados

- Novo `src/data/quick-quotes.ts`: lista ordenada de slugs (e overrides de rótulo/ícone se precisarem). Resolve em runtime:
  - `externalUrl` a partir de `externalQuoteUrlForSlug`
  - `internalPath` a partir do serviço correspondente
- Reutilizar `src/data/external-quotes.ts` como mapa de URLs Porto (já existente). Não duplicar URLs longas em JSX.
- Fail closed: slug sem URL externa → **omitir** o item da grade. Sem URL interna → omitir só “Saber mais”.

## UI: QuickQuoteSection

- Componente: `src/components/sections/QuickQuoteSection.tsx` (item dedicado só se o arquivo ficar grande).
- `Section` com tom/edge distintos de Partners e de Consórcios (ex.: `sunken` ou `surface` + `edgeTop` gold/hairline), sem parecer a campanha invertida.
- `id="cotacao-rapida"` para âncora opcional (sem rota nova; sitemap só se a equipe passar a indexar âncoras).
- Heading: eyebrow de cotação online, título de ação, uma linha de apoio (cotação na parceira; sem formulário neste bloco).
- Grade responsiva: 1 → 2 → 3 colunas; 9 itens.
- Cada item: ícone Lucide coerente com o produto; nome; superfície principal acionável para Porto; link texto “Saber mais” com `stopPropagation` se aninhado.
- Motion moderado (hover/focus/reveal); respeitar `prefers-reduced-motion`.
- Acessibilidade: foco visível; `aria-label` no externo (“Cotar [produto] online”); sem `href="#"`.
- Primitivos: `Section`, `SectionHeading`, `Reveal`, tokens de `globals.css`. Sem hex literais. Sem regressão de DS nas seções vizinhas.

## UI: AboutTeaser (fachada)

- Asset: `src/assets/marketing/xik-fachada.png` (converter para `.webp` na implementação se o padrão do repo for webp nos heroes).
- Desktop: coluna esquerda = conteúdo atual (eyebrow, título, sócia, história, métricas, CTA); coluna direita = fachada (`object-cover`, raio/borda do DS).
- Mobile-first: stack título → imagem → corpo/métricas/CTA (retrato institucional cedo).
- Alt factual (fachada noturna XIK SEGUROS). Não inventar endereço ou dados comerciais na legenda.

## Home wiring

`HomePage.tsx` passa a:

1. Hero  
2. PartnersSection  
3. **QuickQuoteSection**  
4. ConsortiumPricingSection  
5. SolutionsSection  
6. PositioningSection  
7. AboutTeaser (com fachada)  
8. FaqSection  
9. RecentBlogPostsSection  

## Testes / verificação

- `npm run typecheck` / `lint` / `build`
- Smoke: 9 links Porto abrem em nova aba; “Saber mais” leva à página Xik correta
- About: fachada legível em mobile e desktop; sem quebrar sticky/título existentes além do layout acordado
- Confirmar ausência do link celular 20% no bundle/source visitante

## Trabalho já feito fora deste spec (contexto)

Heroes de marketing já ligados em `ServicePage` para Azul, celular, equipamentos, conta digital, cartão e Porto Serviços. Não faz parte da implementação deste documento, salvo regressão.

## Sucesso

Visitante na home encontra, logo após os parceiros, um atalho claro para cotar os 9 produtos Porto sem formulário; “Saber mais” permanece disponível; “A empresa” ganha presença visual com a fachada; nada de comissão ou campanha 50% OFF misturado a este bloco.
