/**
 * Captures each top-level <section> of a route separately, at a readable scale.
 * Usage: node scripts/shoot-sections.mjs [route] [width]
 */
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const route = process.argv[2] ?? '/';
const width = Number(process.argv[3] ?? 1280);
const BASE = process.env.BASE_URL ?? 'http://localhost:5173';
const OUT = path.resolve('_shots/sections');
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width, height: 900 }, locale: 'pt-BR' });
await page.goto(`${BASE}${route}`, { waitUntil: 'networkidle' });

const sections = page.locator('body > div > section, main > section, main > * > section, footer');
const count = await sections.count();
const slug = route === '/' ? 'home' : route.replace(/\//g, '-').replace(/^-/, '');

for (let i = 0; i < count; i += 1) {
  const section = sections.nth(i);
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);
  await section.screenshot({ path: path.join(OUT, `${width}-${slug}-${i}.png`) });
}

console.log(`captured ${count} sections for ${route} @ ${width}px`);
await browser.close();
