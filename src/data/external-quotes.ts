/**
 * Partner / carrier quotation URLs for modalities that hand off outside WhatsApp.
 * Slugs match `Service.slug`. Subjects resolve via the service title.
 */
import { services } from './services';

export const externalQuoteBySlug: Readonly<Record<string, string>> = {
  'seguro-de-vida':
    'http://www.porto.vc/SEGURODEVIDAON_N123KJ_1d5ce1994aa747fdb39d21b4fc2ae731',
  'seguro-automovel':
    'http://www.porto.vc/SEGUROAUTO_N123KJ_a5d3791d571d4e0b821319b5b8c8747f',
  'seguro-residencial':
    'http://www.porto.vc/RESIDENCIAESSENCIAL_N123KJ_4f7ba2e7574b4e3d856b8c61cf4b75b0',
  'seguro-celular':
    'http://www.porto.vc/SEGUROCELULAR_N123KJ_2eea7a77570444ee9f30c3269d9c20d4',
  'azul-por-assinatura':
    'http://www.porto.vc/AZULPORASSINATURA_N123KJ_6eb09bba310c4b799505380039aee1e6',
  'porto-servicos':
    'http://www.porto.vc/PORTOSERVICO_N123KJ_42c47c6021514d71a487bf34e1dfc196',
  'cartao-credito-porto-bank':
    'http://www.porto.vc/CARTAODECREDITOPORTOBANK_N123KJ_17062660277b43d487cbe6af038a7004',
  'conta-digital-porto-bank':
    'http://www.porto.vc/CONTADIGITALPORTOBANK_N123KJ_d546679d22b24739a4dd5e1c1eeb3104',
  'equipamentos-portateis':
    'http://www.porto.vc/EQUIPAMENTOSPORTATEIS_N123KJ_7cd2173747d64f2bb9fdf11e60799dd4',
};

/** @deprecated Prefer slug map; kept for subject-label lookups in the quote form. */
export const externalQuoteBySubject: Readonly<Record<string, string>> = Object.fromEntries(
  services
    .filter((service) => externalQuoteBySlug[service.slug])
    .map((service) => [service.title, externalQuoteBySlug[service.slug]])
);

export function externalQuoteUrlForSlug(slug: string): string | null {
  return externalQuoteBySlug[slug] ?? null;
}

export function externalQuoteUrlForSubject(subject: string): string | null {
  const byTitle = externalQuoteBySubject[subject];
  if (byTitle) return byTitle;
  const service = services.find((item) => item.title === subject);
  return service ? externalQuoteUrlForSlug(service.slug) : null;
}
