# AGENTS.md: XIK SEGUROS

Instruções permanentes para qualquer agente que operar neste repositório.

## Precedência

1. Código existente funcionando (baseline)
2. `HANDOFF_OPUS.md` (estado factual do repo)
3. Briefing original do rebuild
4. Tarefa atual do usuário

Não redesenhar a arquitetura, o design system, o routing, a data layer ou os componentes estruturais por preferência técnica. Alterar fundamentos só quando a tarefa exigir ou houver defeito verificável, com justificativa explícita.

## Onde estão as regras

- Regras invioláveis sempre aplicadas: `.cursor/rules/xik-inviolable.mdc`
- Sem travessão (sempre aplicada): `.cursor/rules/xik-no-emdash.mdc`
- Handoff completo (árvore, rotas, tokens, TODOs, validações): `HANDOFF_OPUS.md`
- Overview operacional: `README.md`

## Antes de editar

1. Ler o(s) arquivo(s) alvo e rastrear imports/dependências
2. Verificar se já existe componente, utilitário, token ou dado equivalente
3. Preferir estender o padrão existente a criar um paralelo

## Comandos de sanidade

```bash
npm run typecheck
npm run lint
npm run build
```

QA opcional (com `npm run dev` ou `npm run preview` + `BASE_URL`):

```bash
npm run check:a11y
npm run check:routes
npm run check:form
npm run check:seo
npm run check:visual
```
