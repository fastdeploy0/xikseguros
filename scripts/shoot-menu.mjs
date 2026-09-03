/** Opens the mobile menu and verifies focus trap + Escape behaviour. */
import { chromium } from 'playwright';
import path from 'node:path';

const BASE = process.env.BASE_URL ?? 'http://localhost:5173';
const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, locale: 'pt-BR' });
await page.goto(BASE, { waitUntil: 'networkidle' });

await page.getByRole('button', { name: /abrir menu/i }).click();
await page.waitForTimeout(600);
await page.screenshot({ path: path.resolve('_shots/390-menu.png') });

const dialogVisible = await page.getByRole('dialog').isVisible();
const focusInside = await page.evaluate(() =>
  document.querySelector('[role="dialog"]')?.contains(document.activeElement)
);

await page.keyboard.press('Escape');
await page.waitForTimeout(500);
const dialogClosed = (await page.getByRole('dialog').count()) === 0;
const focusRestored = await page.evaluate(
  () => document.activeElement?.getAttribute('aria-controls') === 'menu-mobile'
);

console.log({ dialogVisible, focusInside, dialogClosed, focusRestored });
await browser.close();
