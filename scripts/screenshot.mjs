/**
 * Visual + QA harness: captures each route at the target breakpoints and
 * reports console errors, horizontal overflow and dead links.
 * Run with: node scripts/screenshot.mjs
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'http://localhost:5173';
const OUT = path.resolve('_shots');
await mkdir(OUT, { recursive: true });

const routes = [
  ['home', '/'],
  ['a-empresa', '/a-empresa'],
  ['planos', '/planos'],
  ['plano-individual', '/planos/plano-de-saude-individual'],
  ['seguros', '/seguros'],
  ['seguro-automovel', '/seguros/seguro-automovel'],
  ['cotacao', '/faca-sua-cotacao'],
  ['fale-conosco', '/fale-conosco'],
  ['privacidade', '/politica-de-privacidade'],
  ['404', '/rota-que-nao-existe'],
];

const viewports = [
  ['360', 360, 800],
  ['390', 390, 844],
  ['768', 768, 1024],
  ['1280', 1280, 900],
  ['1440', 1440, 900],
];

const only = process.argv[2];
const browser = await chromium.launch({ channel: 'msedge' });
const problems = [];

for (const [vpName, width, height] of viewports) {
  if (only && only !== vpName) continue;
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    locale: 'pt-BR',
  });
  const page = await context.newPage();

  page.on('console', (msg) => {
    if (msg.type() === 'error') problems.push(`[console ${vpName}] ${msg.text()}`);
  });
  page.on('pageerror', (err) => problems.push(`[pageerror ${vpName}] ${err.message}`));

  for (const [name, route] of routes) {
    await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(450);

    // Scroll through the page so every `whileInView` reveal has fired before
    // the full-page capture, then return to the top.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.7;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 90));
      }
      window.scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 350));
    });

    const audit = await page.evaluate(() => {
      const doc = document.documentElement;
      const links = [...document.querySelectorAll('a')];
      return {
        overflow: doc.scrollWidth - doc.clientWidth,
        h1Count: document.querySelectorAll('h1').length,
        title: document.title,
        badHref: links
          .filter((a) => {
            const href = a.getAttribute('href');
            return !href || href === '#' || href === '' || href === 'undefined';
          })
          .map((a) => a.textContent?.trim().slice(0, 40)),
        emptyLinkText: links
          .filter((a) => !a.textContent?.trim() && !a.getAttribute('aria-label'))
          .map((a) => a.getAttribute('href')),
        undefinedText: document.body.innerText.includes('undefined')
          ? 'body contains "undefined"'
          : null,
        pending: document.body.innerText.includes('DADO_PENDENTE')
          ? 'body contains DADO_PENDENTE'
          : null,
        brokenImages: [...document.querySelectorAll('img')]
          .filter((img) => img.complete && img.naturalWidth === 0)
          .map((img) => img.currentSrc || img.src),
      };
    });

    if (audit.overflow > 1) problems.push(`[overflow ${vpName}] ${route} → ${audit.overflow}px`);
    if (audit.h1Count !== 1) problems.push(`[h1 ${vpName}] ${route} → ${audit.h1Count} h1`);
    if (audit.badHref.length) problems.push(`[href ${vpName}] ${route} → ${JSON.stringify(audit.badHref)}`);
    if (audit.emptyLinkText.length)
      problems.push(`[link-name ${vpName}] ${route} → ${JSON.stringify(audit.emptyLinkText)}`);
    if (audit.undefinedText) problems.push(`[text ${vpName}] ${route} → ${audit.undefinedText}`);
    if (audit.pending) problems.push(`[content ${vpName}] ${route} → ${audit.pending}`);
    if (audit.brokenImages.length)
      problems.push(`[img ${vpName}] ${route} → ${JSON.stringify(audit.brokenImages)}`);
    if (!audit.title) problems.push(`[title ${vpName}] ${route} → empty title`);

    await page.screenshot({
      path: path.join(OUT, `${vpName}-${name}.png`),
      fullPage: vpName === '1280' || vpName === '390',
    });
  }

  await context.close();
}

await browser.close();

console.log('\n=== AUDIT ===');
console.log(problems.length ? problems.join('\n') : 'No issues detected.');
