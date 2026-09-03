import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

await mkdir('_shots', { recursive: true });
const browser = await chromium.launch({ channel: 'msedge' });
const checks = [];

for (const [name, width, height] of [
  ['375', 375, 812],
  ['768', 768, 1024],
  ['1280', 1280, 900],
  ['1440', 1440, 900],
]) {
  const page = await browser.newPage({ viewport: { width, height } });
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.locator('#solucoes').scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);

  const serviceLinks = await page.locator('#solucoes a[href*="/planos/"], #solucoes a[href*="/seguros/"]').count();
  const hubLinks = await page.evaluate(() => {
    const root = document.getElementById('solucoes');
    if (!root) return 0;
    return [...root.querySelectorAll('a')].filter((a) => {
      const href = a.getAttribute('href');
      return href === '/planos' || href === '/seguros';
    }).length;
  });
  const anchors = await page.locator('#solucoes nav a[href^="#solucoes-"]').count();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );

  await page.locator('#solucoes-planos a').first().focus();
  const focused = await page.evaluate(() => document.activeElement?.getAttribute('href'));

  await page.locator('#solucoes').screenshot({ path: `_shots/solucoes-${name}.png` });

  checks.push({ name, serviceLinks, hubLinks, anchors, focused, overflow, errs });
  await page.close();
}

console.log(JSON.stringify(checks, null, 2));
await browser.close();
