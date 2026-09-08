/**
 * Verifies legacy URL redirects and that content is visible (not stuck at
 * opacity 0) when the visitor prefers reduced motion.
 */
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'http://localhost:5173';
const browser = await chromium.launch({ channel: 'msedge' });
const problems = [];

// --- Legacy redirects -------------------------------------------------------
const expected = [
  ['/home', '/'],
  ['/planos-de-saude', '/planos/planos-de-saude-empresarial'],
  ['/plano-de-saude-individual', '/planos'],
  ['/plano-odontologico', '/planos/plano-odontologico'],
  ['/seguro-automovel', '/seguros/seguro-automovel'],
  ['/seguro-de-vida', '/seguros/seguro-de-vida'],
  ['/consorcios', '/seguros/consorcios'],
  ['/financiamento', '/seguros/financiamento-veiculos'],
  ['/seguros/seguro-placa-solar', '/seguros/consorcios'],
];

const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
for (const [from, to] of expected) {
  await page.goto(`${BASE}${from}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(250);
  const actual = new URL(page.url()).pathname;
  if (actual !== to) problems.push(`redirect ${from} → expected ${to}, got ${actual}`);
}

// Every service route must resolve to a real page, not the 404 view.
const serviceRoutes = await page.evaluate(async (base) => {
  const res = await fetch(`${base}/sitemap.xml`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
}, BASE);

for (const route of serviceRoutes) {
  await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(200);
  const h1 = (await page.locator('h1').first().textContent()) ?? '';
  if (/não existe mais/i.test(h1)) problems.push(`sitemap route ${route} renders the 404 page`);
  if (new URL(page.url()).pathname !== route)
    problems.push(`sitemap route ${route} redirected to ${new URL(page.url()).pathname}`);
}
await page.close();

// --- Reduced motion ---------------------------------------------------------
const reducedContext = await browser.newContext({
  viewport: { width: 1280, height: 900 },
  reducedMotion: 'reduce',
});
const reducedPage = await reducedContext.newPage();
await reducedPage.goto(BASE, { waitUntil: 'networkidle' });
await reducedPage.waitForTimeout(700);

const hidden = await reducedPage.evaluate(() => {
  const out = [];
  for (const el of document.querySelectorAll('section h2, section h3, section p, article')) {
    const cs = getComputedStyle(el);
    if (Number(cs.opacity) < 0.9 && el.textContent?.trim())
      out.push(`${el.tagName}: ${el.textContent.trim().slice(0, 45)} (opacity ${cs.opacity})`);
  }
  return out.slice(0, 10);
});
if (hidden.length) problems.push(`reduced-motion hides content: ${JSON.stringify(hidden)}`);

const transformed = await reducedPage.evaluate(
  () =>
    [...document.querySelectorAll('*')].filter((el) => {
      const t = getComputedStyle(el).transform;
      return t && t !== 'none' && !t.includes('matrix(1, 0, 0, 1, 0, 0)');
    }).length
);

await browser.close();

console.log('\n=== ROUTE + REDUCED MOTION CHECK ===');
console.log(`sitemap routes verified: ${serviceRoutes.length}`);
console.log(`elements with a non-identity transform under reduced motion: ${transformed}`);
console.log(problems.length ? problems.join('\n') : 'No issues detected.');
