/** Verifies per-route metadata and JSON-LD. */
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'http://localhost:5173';
const routes = [
  '/',
  '/a-empresa',
  '/planos',
  '/seguros/seguro-automovel',
  '/blog',
  '/blog/seguro-de-vida-o-que-e-e-para-quem-e-indicado',
  '/faca-sua-cotacao',
  '/fale-conosco',
  '/politica-de-privacidade',
  '/rota-que-nao-existe',
];

const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const rows = [];

for (const route of routes) {
  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(350);
  rows.push(
    await page.evaluate(() => ({
      path: location.pathname,
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content ?? null,
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null,
      robots: document.querySelector('meta[name="robots"]')?.content ?? null,
      og: [
        document.querySelector('meta[property="og:title"]')?.content,
        document.querySelector('meta[property="og:url"]')?.content,
        document.querySelector('meta[property="og:image"]')?.content,
      ].every(Boolean),
      twitter: Boolean(document.querySelector('meta[name="twitter:card"]')?.content),
      schemas: [...document.querySelectorAll('script[type="application/ld+json"]')].map(
        (s) => JSON.parse(s.textContent)['@type']
      ),
    }))
  );
}

await browser.close();

for (const r of rows) {
  console.log(`\n${r.path}`);
  console.log(`  title      ${r.title}`);
  console.log(`  desc       ${r.description?.slice(0, 90)}`);
  console.log(`  canonical  ${r.canonical}`);
  console.log(`  robots     ${r.robots}`);
  console.log(`  og/twitter ${r.og} / ${r.twitter}`);
  console.log(`  json-ld    ${r.schemas.join(', ') || '(none)'}`);
}

const bad = rows.filter((r) => !r.title || !r.description || !r.canonical || !r.og || !r.twitter);
console.log(bad.length ? `\nMISSING METADATA on: ${bad.map((r) => r.path).join(', ')}` : '\nAll routes have complete metadata.');
