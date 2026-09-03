# XIK SEGUROS: site institucional

Reconstrução do site da **Xik Administradora e Corretora de Seguros** (Belo Horizonte/MG)
como aplicação estática moderna, preservando o conteúdo factual e as URLs do site anterior.

Para agentes/IA: leia `AGENTS.md`, `.cursor/rules/xik-inviolable.mdc` e `HANDOFF_OPUS.md`
antes de alterar o projeto.

## Stack

| Camada | Escolha |
| --- | --- |
| Build | Vite 8 |
| UI | React 19 + TypeScript (strict) |
| Rotas | React Router 7 (`BrowserRouter`, URLs limpas) |
| Estilo | Tailwind CSS v4 + design tokens em CSS variables |
| Ícones | Lucide React |
| Animação | Motion (uso pontual, com `prefers-reduced-motion`) |
| Formulários | React Hook Form + Zod |
| Tipografia | Manrope Variable (`@fontsource-variable/manrope`, local) |

Não há backend, Next.js, WordPress, jQuery, Bootstrap ou biblioteca de UI de terceiros.

## Comandos

```bash
npm install
npm run dev          # servidor de desenvolvimento
npm run build        # typecheck + build de produção
npm run typecheck    # apenas TypeScript
npm run lint         # ESLint
npm run assets       # regenera logos WebP/PNG e favicons a partir de assets-source/
npm run sitemap      # regenera public/sitemap.xml e public/robots.txt
```

Verificações de QA (exigem o `npm run dev` rodando):

```bash
npm run check:a11y     # axe-core, WCAG 2.2 A/AA, todas as rotas, desktop + mobile
npm run check:routes   # redirects legados, rotas do sitemap e reduced motion
npm run check:form     # validação e handoff do formulário de cotação
npm run check:seo      # title, description, canonical, OG, Twitter e JSON-LD por rota
npm run check:visual   # screenshots em 360/390/768/1280/1440 + auditoria de overflow
```

Os scripts aceitam `BASE_URL` para rodar contra o build de produção
(`npm run build && npm run preview`, então `BASE_URL=http://localhost:4173`).

## Configuração de runtime

O número de WhatsApp **não** está no bundle. Ele vive em `public/config.js`:

```js
window.__XIK_CONFIG__ = {
  whatsappNumber: '553134620007',
  whatsappGreeting: '...',
};
```

Alterar esse arquivo em produção não exige rebuild. Se `whatsappNumber` ficar vazio,
todos os CTAs de WhatsApp desaparecem e o formulário passa a exibir os telefones
verificados: nunca uma confirmação falsa de envio.

O acesso é centralizado em `src/lib/runtime-config.ts`; nenhum componente lê
`window.__XIK_CONFIG__` diretamente.

## Origem dos dados

Todo conteúdo comercial vem de `src/data/` e foi recuperado do site oficial:

| Arquivo | Conteúdo |
| --- | --- |
| `company.ts` | história, missão, visão, valores, endereço, telefones, redes sociais |
| `services.ts` | 12 modalidades, com slug original e texto descritivo publicado |
| `partners.ts` | seguradoras e operadoras listadas nos formulários da Xik |
| `navigation.ts` | menu e mapa de redirects das URLs legadas |
| `faq.ts` | perguntas compostas **apenas** a partir de fatos já publicados |

Regra do projeto: nenhuma cobertura, carência, exclusão, preço, condição contratual,
métrica, prêmio ou depoimento é publicado: o site oficial não divulga esses dados.
Campos não verificados são `null` e a UI simplesmente não renderiza a seção.

### Pendências de conteúdo (`TODO(content)`)

Itens que a Xik precisa confirmar antes de aparecerem no site:

- **E-mail público**: não há endereço publicado no site oficial (`company.email`).
- **Horário de atendimento**: não publicado (`company.businessHours`).
- **CEP**: necessário para exibir mapa e para o schema `LocalBusiness`
  (`company.address.postalCode`).
- **Blog**: os posts legados não têm corpo de texto recuperável; a rota `/blog`
  redireciona para `/seguros`. Recuperado o conteúdo, criar a rota e ajustar
  `legacyRoutes`.
- **Política de privacidade**: texto reproduzido do documento da Xik; recomenda-se
  revisão jurídica para adequação plena à LGPD (`TODO(jurídico)` em `PrivacyPage.tsx`).

## Preservação de SEO

As URLs internas reproduzem a estrutura já indexada (`/planos/...`, `/seguros/...`).
As URLs planas que também respondiam no site antigo são redirecionadas via
`legacyRoutes` em `src/data/navigation.ts`. Cada rota define `title`, `description`,
`canonical`, Open Graph, Twitter e JSON-LD (`InsuranceAgency`, `BreadcrumbList`,
`FAQPage`: este último apenas na home, onde as perguntas são realmente visíveis).

## Deploy

Build estático em `dist/`. Como o roteamento é client-side, o servidor precisa
entregar `index.html` para qualquer rota não encontrada (SPA fallback). Exemplos:

- **Netlify**: `_redirects` com `/*  /index.html  200`
- **Vercel**: `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }`
- **Apache**: `FallbackResource /index.html`
- **Nginx**: `try_files $uri $uri/ /index.html;`
