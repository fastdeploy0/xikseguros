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
