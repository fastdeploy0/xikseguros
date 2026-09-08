/** Exercises the quotation form: validation errors, then the WhatsApp hand-off. */
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL ?? 'http://localhost:5173';
const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, locale: 'pt-BR' });
await page.goto(`${BASE}/faca-sua-cotacao`, { waitUntil: 'networkidle' });

// 1. Submitting empty must surface errors and must NOT claim success.
await page.getByRole('button', { name: /continuar pelo whatsapp/i }).click();
await page.waitForTimeout(400);
const errors = await page.locator('p.text-danger').allTextContents();
const falseSuccess = await page.getByText(/enviad[ao]|sucesso/i).count();

// 2. Invalid phone must be rejected.
await page.fill('#quote-name', 'Maria Silva');
await page.fill('#quote-email', 'maria@exemplo.com.br');
await page.fill('#quote-phone', '123');
await page.fill('#quote-document', '123.456.789-09');
await page.fill('#quote-age', '35');
await page.selectOption('#quote-subject', { label: 'Seguro Automóvel' });
await page.check('#quote-consent');
await page.getByRole('button', { name: /continuar pelo whatsapp/i }).click();
await page.waitForTimeout(400);
const phoneError = await page.locator('#quote-phone-error').textContent();

// 3. Valid data must open wa.me with the data pre-filled.
await page.fill('#quote-phone', '(31) 99999-8888');
await page.fill('#quote-message', 'Tenho um Onix 2022.');
const [popup] = await Promise.all([
  page.waitForEvent('popup', { timeout: 8000 }).catch(() => null),
  page.getByRole('button', { name: /continuar pelo whatsapp/i }).click(),
]);

const popupUrl = popup ? popup.url() : null;
await page.waitForTimeout(400);
const confirmation = await page.getByText(/conversa foi aberta no whatsapp/i).count();
const decoded = popupUrl ? decodeURIComponent(popupUrl) : '';

console.log(
  JSON.stringify(
    {
      emptySubmitErrors: errors.length,
      errorMessages: errors,
      falseSuccessMessages: falseSuccess,
      phoneError: phoneError?.trim(),
      popupUrl: decoded ? decoded.slice(0, 400) : null,
      popupHost: popupUrl ? new URL(popupUrl).host : null,
      popupNumber: popupUrl ? new URL(popupUrl).pathname.replace('/', '') : null,
      popupCarriesName: decoded.includes('Maria Silva'),
      popupCarriesSubject: decoded.includes('Seguro Automóvel'),
      popupCarriesDocument: decoded.includes('123.456.789-09'),
      popupCarriesAge: decoded.includes('35'),
      popupUsesCommercialNumber: popupUrl ? popupUrl.includes('553134620007') : false,
      handoffNoticeShown: confirmation,
    },
    null,
    2
  )
);

await browser.close();
