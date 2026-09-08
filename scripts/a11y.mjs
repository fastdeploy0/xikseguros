/**
 * Runs axe-core (WCAG 2.2 A/AA) against every route at desktop and mobile.
 * Usage: node scripts/a11y.mjs
 */
import { createRequire } from 'node:module';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const axePath = require.resolve('axe-core/axe.min.js');
const BASE = process.env.BASE_URL ?? 'http://localhost:5173';

const routes = [
  '/',
  '/a-empresa',
  '/planos',
  '/planos/planos-de-saude-empresarial',
  '/seguros',
  '/seguros/seguro-automovel',
  '/blog',
  '/blog/seguro-de-vida-o-que-e-e-para-quem-e-indicado',
  '/faca-sua-cotacao',
  '/fale-conosco',
  '/politica-de-privacidade',
  '/rota-que-nao-existe',
];

const browser = await chromium.launch({ channel: 'msedge' });
const findings = new Map();

for (const [label, width, height] of [
  ['desktop', 1280, 900],
  ['mobile', 390, 844],
]) {
  const context = await browser.newContext({ viewport: { width, height }, locale: 'pt-BR' });
  const page = await context.newPage();
  await page.addInitScript({ path: axePath });

  for (const route of routes) {
    await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const result = await page.evaluate(async () => {
      // eslint-disable-next-line no-undef
      const run = await axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'] },
      });
      return run.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        nodes: v.nodes.slice(0, 3).map((n) => ({
          target: n.target.join(' '),
          summary: (n.failureSummary ?? '').replace(/\s+/g, ' ').slice(0, 220),
        })),
      }));
    });

    for (const violation of result) {
      const key = `${violation.id}`;
      if (!findings.has(key)) findings.set(key, { ...violation, where: [] });
      findings.get(key).where.push(`${label}${route}`);
    }
  }

  await context.close();
}

await browser.close();

if (findings.size === 0) {
  console.log('axe-core: no WCAG 2.2 A/AA violations found.');
} else {
  for (const f of findings.values()) {
    console.log(`\n[${f.impact}] ${f.id}: ${f.help}`);
    console.log(`  routes: ${[...new Set(f.where)].join(', ')}`);
    for (const n of f.nodes) console.log(`  · ${n.target}\n    ${n.summary}`);
  }
}
