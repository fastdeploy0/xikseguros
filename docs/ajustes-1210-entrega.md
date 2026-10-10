# Ajustes para 12/10: estado da entrega

Branch: `ajustes-1210`, criada a partir de `apresentacao-0510` no commit `4f89176`. Sem push ou deploy. `main` não foi alterado.

## Etapa 1

- Item 1 implementado: título Cotar Agora, nove cards com os links da tabela Porto, nova aba e `noopener noreferrer`, link do celular corrigido, remoção do modal antigo e dos módulos exclusivos dele.
- Item 2 implementado: CTA compartilhado do header leva a `/#cotacao-rapida`; `/faca-sua-cotacao` redireciona; scroll e foco na seção; CTA fecha o menu mobile; rota redirecionada retirada do sitemap.
- Item 3 implementado: Porto Bank em primeiro lugar e Aliro em segundo na grade. Os logos Porto Seguro e Porto Seguro Saúde foram retirados do catálogo e das referências por modalidade; Porto Seguro Odontológico foi preservado.
- Item 4 implementado: `ConsortiumSimulationModal`, controlado por `open` e `onClose`, pronto para o futuro hero. Dados e opções em `src/data/consortium-simulation.ts`; número lido da configuração existente. O modal ainda não está ligado a um CTA público.

O formulário compartilhado de Contato e dos serviços que ainda o utilizam foi preservado. Não houve alteração do harness, Sinistro e Cobrança, biosite ou graphify.

## Validações realizadas

- `npm run typecheck`: passou.
- `npm run lint`: passou.
- `npm run build`: passou.
- No preview em `http://127.0.0.1:4180`, `check:routes`: 37 rotas do sitemap, sem problemas.
- No preview, `check:a11y`: nenhuma violação WCAG 2.2 A/AA após corrigir a área de toque dos links Saber mais.
- No preview, `check:visual`: sem problemas nas larguras 360, 390, 768, 1280 e 1440.
- Nove links conferidos individualmente contra a tabela fornecida: associação ao card, URL integral, target e rel. Não foram submetidos formulários da Porto.
- Redirecionamento, CTA na Home, CTA em outra página e repetição do mesmo hash verificados no build. CTA mobile verificado com o fechamento do menu e seção visível.
- Modal testado em página local temporária, removida do código: 390 e 1280 px; validação dos obrigatórios, nome com acentos e caracteres especiais, opções, foco inicial, Esc, Fechar, retorno do foco, fechamento após abertura do WhatsApp, limpeza ao reabrir e inclusão condicional de parcela/lance. `window.open` foi interceptado para conferir a mensagem sem enviar dados. Axe do diálogo sem violações.
- Capturas da seção Cotar Agora e do modal inspecionadas em desktop e celular. Artefatos locais em `_shots/`, não versionados.

Após a alteração dos parceiros, foram repetidos `typecheck`, `lint`, `build` e `check:visual` no preview. A ordem dos dois primeiros logos e a presença do odontológico foram conferidas em desktop e celular.

## Commits de implementação

| Commit | Item |
| --- | --- |
| `ba73b94` | Nove cards apontando para a Porto |
| `c876bdb` | CTA e redirecionamento para a seção da Home |
| `d507de0` | Modal de simulação de consórcio |
| `683e9ce` | Fechamento do menu mobile ao acessar a cotação |
| `117481c` | Área de toque dos links Saber mais |

As propostas e este registro ficam em um commit separado de documentação.

## Arquivos alterados

Modificados:

- `public/sitemap.xml`
- `scripts/generate-sitemap.mjs`
- `scripts/partner-bg.mjs`
- `src/App.tsx`
- `src/components/layout/Layout.tsx`
- `src/components/layout/MobileNav.tsx`
- `src/components/sections/QuickQuoteSection.tsx`
- `src/components/ui/Button.tsx`
- `src/components/ui/Section.tsx`
- `src/data/external-quotes.ts`
- `src/data/navigation.ts`
- `src/data/partners.ts`

Criados:

- `src/components/sections/ConsortiumSimulationModal.tsx`
- `src/data/consortium-simulation.ts`
- `src/assets/partners/porto-bank.jpg`
- `docs/ajustes-1210-design.md`
- `docs/ajustes-1210-entrega.md`

Removidos por não terem mais uso:

- `src/components/sections/QuickQuoteLeadModal.tsx`
- `src/data/quick-quote-forms.ts`
- `src/lib/quick-quote-schema.ts`
- `src/pages/QuotePage.tsx`
- `src/assets/partners/porto.webp`
- `src/assets/partners/porto-seguro-saude.webp`

Alteração prévia do usuário preservada, fora dos commits: `src/assets/marketing/xik-interna.webp`. A foto interna é a versão prevista para o design futuro. O arquivo fornecido `src/assets/partners/porto-bank.jpg` foi incluído no commit do item 3.

`HANDOFF_OPUS.md` não foi encontrado na pasta e não é versionado. Foram lidos AGENTS.md, as regras em `.cursor/rules/`, README.md e o contexto indicado no Obsidian. Nenhum arquivo foi editado fora do repositório.

## Testar no celular

No terminal desta pasta:

```powershell
npm run dev -- --host
```

Conectar o celular à mesma rede local do computador e abrir o endereço Network mostrado pelo Vite. O IPv4 de rede local observado nesta sessão é `192.168.0.225`; se a porta disponível for 5173, usar `http://192.168.0.225:5173`. Se essa porta estiver ocupada, usar a porta informada pelo Vite.

Abrir o menu, tocar Faça sua cotação e confirmar o fechamento do menu e a chegada à seção. Conferir os nove cards e acessar também `/faca-sua-cotacao`. O modal será acessível publicamente quando o hero aprovado da etapa 2 for integrado.

## Etapa 2

Ver `docs/ajustes-1210-design.md`: duas direções para cada hero, recomendação inicial e prompt conjunto para o Claude Design. Nenhum dos dois heroes foi implementado.

## Etapa 2: hero, órbita e destaque de consórcio

Implementados os três blocos aprovados do canvas do Fable (`design-systems/xikseguros/XIK Home - Hero e Consorcio.html`): hero 1b, seção da órbita e destaque 1f no Cotar Agora. Sem push ou deploy.

### Commits

| Commit | Bloco |
| --- | --- |
| `2693562` | Hero imersivo da Home com a foto da sede (1b) |
| `977fd01` | Seção da órbita com quatro cards na Home |
| `5f66257` | Destaque de consórcio no Cotar Agora com pré-seleção do bem (1f) |

### O que mudou

- Hero (`Hero.tsx`): a foto da sede ocupa a dobra (700 px no celular, 820 px a partir de `md`) e escurece até o marinho; o texto fica no terço inferior. Foto decorativa, `alt=""`, carregada com `fetchPriority="high"`. `xik-interna.webp` foi recomprimido (2,1 MB para 115 KB, 941x1672, sem ampliação) e ganhou as variantes `xik-interna-480.webp` e `xik-interna-720.webp` em `srcset`. Saíram do hero o brilho que segue o ponteiro, as linhas decorativas, os três números e o `HeroMedallions`.
- Órbita (`OrbitSection.tsx`, nova, e `HomePage.tsx`): a antiga dobra do hero virou uma seção logo abaixo dele, com os medalhões ao centro e quatro cards nos cantos (empilhados abaixo de `lg`). Em `HeroMedallions.tsx`, o logo deixou de ter `priority` (está abaixo da dobra) e a entrada dos medalhões passou de `animate` para `whileInView`. Com movimento reduzido não há animação de entrada.
- Destaque (`QuickQuoteSection.tsx` e `ConsortiumSimulationModal.tsx`): faixa de consórcio acima dos nove cards, sangrando até a borda esquerda, com uma linha por bem e o botão Simular consórcio. A linha abre o modal já com o bem escolhido; o botão abre sem pré-seleção. O modal ganhou a prop `asset` e `reset` com `keepFieldsRef`, para o foco inicial no Nome continuar funcionando. O modal passa a ser público, como previsto na etapa 1.
- Ordem da Home: Hero, órbita, parceiros, Cotar Agora e o restante como antes.

### Desvios do Fable e motivo

| Desvio | Motivo |
| --- | --- |
| Hero e órbita usam só o texto atual do site (eyebrow, H1 e parágrafo do Fable não foram usados) | Decisão do usuário: nenhuma palavra nova nos blocos 1 e 2 |
| Destaque do H1 mantém `.text-gradient-brand`, em vez do dourado liso `#ddc79b` do Fable | Padrão atual do site |
| Legenda da foto ("Sala de reuniões da sede, Belo Horizonte") não foi implementada; `alt=""` em vez do alt do Fable | O conteúdo está no texto; foto decorativa. Sem legenda também para não criar copy nova |
| Tipografia, botões e eyebrow usam os tokens e componentes existentes (`text-hero`, `Eyebrow invert`, `Button`), não os px do Fable | Regra do projeto: sem variante ad hoc |
| Quebra desktop/mobile do hero em `md` (768 px) | Decisão do orquestrador; o Fable só define 1440 e 390 |
| Texto do hero alinhado ao `Container` (128 px a 1440) e 20 px laterais no celular | O Container dá o mesmo recuo do Fable |
| Header continua claro e sticky acima do hero, sem alteração em `Header.tsx` | Como no card do Fable |
| Foto: reencodada e com `srcset`, em vez do arquivo de 120 KB do Fable | Mesmo tamanho útil, com variantes menores para o celular e sem upscale |
| Eyebrow do destaque em `#82652c` (`brand-secondary-700`), no lugar de `#8f7340` | `#8f7340` sobre o bege dá 3,96:1; `#82652c` dá 4,84:1 (AA para texto pequeno) |
| Eyebrow do destaque escrito em maiúsculas no código ("DESTAQUE") | Reproduz o que o Fable renderiza |
| Coluna de bens do destaque com 25 rem em `lg` e 30 rem em `xl` (Fable: 480 px fixos) | [PENDENTE DE VALIDAÇÃO]: motivo não registrado pelo implementador |
| Sangrado do destaque feito com `@container` na seção e `cqw` | Chegar à borda da janela sem `overflow-x` na página |
| Linha de bem sem o marcador "Selecionado" | Decisão do usuário: nenhuma linha começa selecionada |
| Movimento: `motion` já usada no projeto; entradas desligadas com `prefers-reduced-motion` | Decisão do usuário: sem dependência nova |

### Contraste medido

Sobre o bege `rgb(243,241,236)` (`surface-sunken`) do destaque:

| Elemento | Cor | Contraste |
| --- | --- | --- |
| Meta "Simular" | `#14213a` | 14,22:1 |
| Frase "Planeje a compra..." | `#5a6478` | 5,27:1 |
| Eyebrow "DESTAQUE" | `#82652c` | 4,84:1 |
| Rótulo do CTA "Simular consórcio" (`#f7f5f1` sobre `#153358`) | | 11,71:1 |

### Origem de cada texto

Estado anterior = commit `563dea9`.

| Texto | Bloco | Origem |
| --- | --- | --- |
| "Corretora de seguros · Belo Horizonte" (eyebrow) | Hero | `Hero.tsx:128` (563dea9) |
| "Seu sonho começa com o consórcio Xik" (H1) | Hero | `Hero.tsx:132-133` (563dea9) |
| "Planos de saúde, seguros, consórcios, previdência privada, gestão de riscos e a formatação correta de apólices e contratos para pessoas físicas e jurídicas." | Hero | `Hero.tsx:137-139` (563dea9) |
| "Faça sua cotação" | Hero | `src/data/navigation.ts:88` (`primaryCta.label`) |
| "Conheça a Xik" | Hero | `Hero.tsx:146-147` (563dea9) |
| Foto da sede, `alt=""` | Hero | `src/assets/marketing/xik-interna.webp`, decorativa; sem texto |
| "Desde {company.experienceSince}" | Órbita, card 1 | Decisão do usuário; formato parecido com `AboutTeaser.tsx:21` ("desde {company.experienceSince}") |
| "Início da atuação no mercado de seguros" | Órbita, card 1 | `Hero.tsx:23` (563dea9) |
| "Corretora constituída em {foundedYear}" | Órbita, card 1 | `Hero.tsx:29` (563dea9) |
| "{n} modalidades" | Órbita, card 2 | `Hero.tsx:34` (563dea9), n = planos de saúde + seguros |
| "Planos de saúde e seguros" | Órbita, card 2 | Decisão do usuário; a expressão existe em `SolutionsSection.tsx:65` (563dea9) |
| "Pessoas físicas e jurídicas" | Órbita, card 3 | `Hero.tsx:139` (563dea9) |
| "Planos de saúde, seguros, consórcios e previdência privada" | Órbita, card 3 | `src/components/layout/Footer.tsx:45` (563dea9) |
| "Gestão de riscos" | Órbita, card 4 | `src/data/services.ts:130` (563dea9) |
| "Formatação correta de apólices e contratos" | Órbita, card 4 | `Hero.tsx:138-139` (563dea9) |
| "Ver soluções" | Órbita | `Hero.tsx:176` (563dea9); o `href="#solucoes"` está em `:172` |
| "Destaque" (exibido como "DESTAQUE") | Destaque | HTML do Fable (`design-systems/xikseguros/XIK Home - Hero e Consorcio.html`), direção 1f, aprovado pelo usuário em 2026-10-10 |
| "Consórcio Xik" | Destaque | HTML do Fable, direção 1f, aprovado pelo usuário em 2026-10-10 |
| "Planeje a compra de um bem com a orientação de um corretor. Escolha ao lado e simule." (desktop) | Destaque | HTML do Fable, direção 1f, aprovado pelo usuário em 2026-10-10 |
| "Planeje a compra de um bem com a orientação de um corretor. Escolha abaixo e simule." (celular) | Destaque | HTML do Fable, direção 1f, aprovado pelo usuário em 2026-10-10 |
| "Simular" (meta de cada linha) | Destaque | HTML do Fable, direção 1f, aprovado pelo usuário em 2026-10-10 |
| "Simular consórcio" (CTA) | Destaque | HTML do Fable, direção 1f, aprovado pelo usuário em 2026-10-10 |
| Imóvel, Automóvel, Veículo pesado, Serviços ou outro | Destaque | `src/data/consortium-simulation.ts:3` |
| "Tipo de bem" (`aria-label` do grupo de linhas) | Destaque | Rótulo do campo no modal, `ConsortiumSimulationModal.tsx:85` |
