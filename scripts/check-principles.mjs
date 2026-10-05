/**
 * Regression check for the guided principles experience on /a-empresa.
 * Catches a missing step control or a broken state change between principles.
 */
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'http://localhost:5173';
const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, locale: 'pt-BR' });

await page.goto(`${BASE}/a-empresa`, { waitUntil: 'networkidle' });

const principles = page.locator('section[aria-labelledby="principios-titulo"]');
await principles.scrollIntoViewIfNeeded();

const step = principles.getByText('01 de 03', { exact: true });
if (!(await step.isVisible())) throw new Error('guided principles does not expose the initial progress');

const advance = principles.getByRole('button', { name: 'Avançar para Visão' });
if (!(await advance.isVisible())) throw new Error('guided principles does not expose the advance control');

await advance.click();
await principles.getByText('02 de 03', { exact: true }).waitFor();

const vision = principles.getByText(
  'Ser reconhecida pela especialização do portfólio de produtos e serviços oferecidos às pessoas físicas e jurídicas, de modo a atender suas necessidades pessoais, familiares e patrimoniais, cumprindo assim a sua função social e econômica na sociedade.',
  { exact: true }
);
if (!(await vision.isVisible())) throw new Error('advancing to Visão does not reveal its institutional statement');

await browser.close();
console.log('guided principles: controls and state transition verified.');
