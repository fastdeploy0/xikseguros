# Home Quick Quote + Fachada Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Seção permanente de cotação rápida na home (após Partners) + fachada no AboutTeaser.

**Architecture:** Lista ordenada em `src/data/quick-quotes.ts` resolve URLs Porto via `external-quotes` e paths via `services`. UI em `QuickQuoteSection`. AboutTeaser ganha coluna de imagem. Sem copy de campanha/comissão.

**Tech Stack:** Vite, React, TypeScript, React Router, Tailwind v4, Lucide, Motion (Reveal), tokens `@theme`.

## Global Constraints

- Dados comerciais só em `src/data/`; sem hex em componentes
- Celular: só URL `...2eea7a...`; nunca o link 20%
- Clique principal = Porto nova aba; “Saber mais” = página Xik
- Posição: Hero → Partners → QuickQuote → Consortium → …
- Sem regressão de DS; sem travessão (U+2014/U+2013)
- Spec: `docs/superpowers/specs/2026-09-06-home-quick-quote-design.md`

---

## File map

| File | Role |
|------|------|
| `src/data/quick-quotes.ts` | Slugs ordenados + `resolveQuickQuotes()` |
| `src/components/sections/QuickQuoteSection.tsx` | Seção + cards |
| `src/pages/HomePage.tsx` | Wire após Partners |
| `src/components/sections/AboutTeaser.tsx` | Texto \| fachada |
| `src/assets/marketing/xik-fachada.webp` | Asset otimizado (de `.png`) |

---

### Task 1: Data layer `quick-quotes.ts`

- [x] Criar `src/data/quick-quotes.ts` com os 9 slugs na ordem do spec
- [x] `resolveQuickQuotes()`: omite item sem URL externa; path interno via `servicePath`
- [x] `npm run typecheck`

### Task 2: `QuickQuoteSection` + Home

- [x] Implementar seção (tone/edge distintos, `id="cotacao-rapida"`, grade 1/2/3)
- [x] Card: link externo principal + “Saber mais” `z-10`; ícone do `Service`
- [x] Inserir em `HomePage` após `PartnersSection`
- [x] typecheck + lint

### Task 3: AboutTeaser fachada

- [x] Converter `xik-fachada.png` → `.webp`
- [x] Layout desktop texto \| imagem; mobile título → imagem → corpo
- [x] typecheck + lint + build

### Task 4: Verificação

- [x] Confirmar ausência do link celular 20% no source
- [x] Smoke mental: 9 externos + saber mais + About responsivo
