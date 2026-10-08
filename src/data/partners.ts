/**
 * Partner catalogue with logos in `src/assets/partners/`.
 *
 * Naming convention for new assets:
 * - `*-seguros` / `*-seguro` → category `seguros` (skip if already catalogued)
 * - `*-saude` / `*-plano-saude` / `*-planos-saude` → category `planos`
 * - `*-dental` / `*-odontologico` → category `planos` (odontológico)
 *
 * Existing `*-seguros` already in the catalogue (do not duplicate):
 * azul-seguros, hdi-seguros, itau-seguros, zurich-seguros.
 *
 * TODO(content): logo de Bradesco Seguros (hoje só nome no formulário).
 */
import type { ServiceCategory } from './services';

import logoAliro from '@/assets/partners/aliro-seguro.webp';
import logoAllianz from '@/assets/partners/allianz.webp';
import logoAmil from '@/assets/partners/amil.webp';
import logoAuroraSaude from '@/assets/partners/aurora-saude.webp';
import logoAza from '@/assets/partners/aza-seguros.webp';
import logoAzul from '@/assets/partners/azul-seguros.webp';
import logoBradescoDental from '@/assets/partners/bradesco-dental.webp';
import logoBradescoSaude from '@/assets/partners/bradesco-saude.webp';
import logoChubb from '@/assets/partners/chubb-seguros.webp';
import logoDarwin from '@/assets/partners/darwin-seguros.webp';
import logoEzze from '@/assets/partners/ezze-seguros.webp';
import logoHapvida from '@/assets/partners/hapvida-plano-saude.webp';
import logoHdi from '@/assets/partners/hdi-seguros.webp';
import logoItau from '@/assets/partners/itau-seguros.webp';
import logoJustos from '@/assets/partners/justos-seguros.webp';
import logoMag from '@/assets/partners/mag-seguros.webp';
import logoMapfre from '@/assets/partners/mapfre-seguros.webp';
import logoMedsenior from '@/assets/partners/medsenior.webp';
import logoMetlife from '@/assets/partners/metlife.webp';
import logoMitsui from '@/assets/partners/mitsui-sumitomo-seguros.webp';
import logoNova from '@/assets/partners/nova-seguros.webp';
import logoOdontoprev from '@/assets/partners/odontoprev.webp';
import logoPortoBank from '@/assets/partners/porto-bank.jpg';
import logoPortoOdonto from '@/assets/partners/porto-seguro-odontologico.webp';
import logoSelect from '@/assets/partners/select-planos-saude.webp';
import logoSuhai from '@/assets/partners/suhai-seguros.webp';
import logoSulAmerica from '@/assets/partners/sul-america.webp';
import logoSura from '@/assets/partners/sura.webp';
import logoTokio from '@/assets/partners/tokio-marine-seguradora.webp';
import logoUsebens from '@/assets/partners/usebens-seguros.webp';
import logoUsiSaude from '@/assets/partners/usi-saude.webp';
import logoYamaha from '@/assets/partners/yamaha.webp';
import logoYelum from '@/assets/partners/yelum-seguros.webp';
import logoYouse from '@/assets/partners/youse-seguros.webp';
import logoZurich from '@/assets/partners/zurich-seguros.webp';

export type Partner = {
  id: string;
  name: string;
  logo: string;
  /** Categories where this logo is shown on hub/service pages. */
  categories: ServiceCategory[];
  /**
   * True when the name also appears in the Xik quotation form option lists.
   */
  listedInForms: boolean;
};

export const partners: Partner[] = [
  { id: 'porto-bank', name: 'Porto Bank', logo: logoPortoBank, categories: ['seguros'], listedInForms: false },
  { id: 'aliro-seguro', name: 'Aliro Seguro', logo: logoAliro, categories: ['seguros'], listedInForms: true },
  { id: 'allianz', name: 'Allianz', logo: logoAllianz, categories: ['seguros'], listedInForms: true },
  { id: 'amil', name: 'Amil', logo: logoAmil, categories: ['planos'], listedInForms: true },
  { id: 'aurora-saude', name: 'Aurora Saúde', logo: logoAuroraSaude, categories: ['planos'], listedInForms: true },
  { id: 'aza-seguros', name: 'AZA Seguros', logo: logoAza, categories: ['seguros'], listedInForms: true },
  { id: 'azul-seguros', name: 'Azul Seguros', logo: logoAzul, categories: ['seguros'], listedInForms: true },
  {
    id: 'bradesco-dental',
    name: 'Bradesco Dental',
    logo: logoBradescoDental,
    categories: ['planos'],
    listedInForms: true,
  },
  {
    id: 'bradesco-saude',
    name: 'Bradesco Saúde',
    logo: logoBradescoSaude,
    categories: ['planos'],
    listedInForms: true,
  },
  { id: 'chubb-seguros', name: 'Chubb', logo: logoChubb, categories: ['seguros'], listedInForms: true },
  { id: 'darwin-seguros', name: 'Darwin Seguros', logo: logoDarwin, categories: ['seguros'], listedInForms: true },
  { id: 'ezze-seguros', name: 'EZZE Seguros', logo: logoEzze, categories: ['seguros'], listedInForms: true },
  { id: 'hapvida-plano-saude', name: 'Hapvida', logo: logoHapvida, categories: ['planos'], listedInForms: true },
  { id: 'hdi-seguros', name: 'HDI Seguros', logo: logoHdi, categories: ['seguros'], listedInForms: true },
  { id: 'itau-seguros', name: 'Itaú Seguros', logo: logoItau, categories: ['seguros'], listedInForms: true },
  { id: 'justos-seguros', name: 'Justos', logo: logoJustos, categories: ['seguros'], listedInForms: true },
  { id: 'mag-seguros', name: 'MAG Seguros', logo: logoMag, categories: ['seguros'], listedInForms: true },
  { id: 'mapfre-seguros', name: 'Mapfre', logo: logoMapfre, categories: ['seguros'], listedInForms: true },
  { id: 'medsenior', name: 'MedSênior', logo: logoMedsenior, categories: ['planos'], listedInForms: true },
  { id: 'metlife', name: 'MetLife', logo: logoMetlife, categories: ['seguros'], listedInForms: true },
  {
    id: 'mitsui-sumitomo-seguros',
    name: 'Mitsui Sumitomo',
    logo: logoMitsui,
    categories: ['seguros'],
    listedInForms: true,
  },
  { id: 'nova-seguros', name: 'Nova Seguros', logo: logoNova, categories: ['seguros'], listedInForms: true },
  { id: 'odontoprev', name: 'OdontoPrev', logo: logoOdontoprev, categories: ['planos'], listedInForms: true },
  {
    id: 'porto-seguro-odontologico',
    name: 'Porto Seguro Odontológico',
    logo: logoPortoOdonto,
    categories: ['planos'],
    listedInForms: true,
  },
  {
    id: 'select-planos-saude',
    name: 'Select',
    logo: logoSelect,
    categories: ['planos'],
    listedInForms: true,
  },
  { id: 'suhai-seguros', name: 'Suhai Seguros', logo: logoSuhai, categories: ['seguros'], listedInForms: true },
  {
    id: 'sul-america',
    name: 'SulAmérica',
    logo: logoSulAmerica,
    categories: ['planos', 'seguros'],
    listedInForms: true,
  },
  { id: 'sura', name: 'Sura', logo: logoSura, categories: ['seguros'], listedInForms: true },
  {
    id: 'tokio-marine',
    name: 'Tokio Marine',
    logo: logoTokio,
    categories: ['seguros'],
    listedInForms: true,
  },
  { id: 'usebens-seguros', name: 'Usebens', logo: logoUsebens, categories: ['seguros'], listedInForms: true },
  { id: 'usi-saude', name: 'UsiSaúde', logo: logoUsiSaude, categories: ['planos'], listedInForms: true },
  { id: 'yamaha', name: 'Yamaha', logo: logoYamaha, categories: ['seguros'], listedInForms: true },
  { id: 'yelum-seguros', name: 'Yelum Seguros', logo: logoYelum, categories: ['seguros'], listedInForms: true },
  { id: 'youse-seguros', name: 'Youse', logo: logoYouse, categories: ['seguros'], listedInForms: true },
  { id: 'zurich', name: 'Zurich Seguros', logo: logoZurich, categories: ['seguros'], listedInForms: true },
];

export const findPartner = (id: string): Partner | undefined => partners.find((p) => p.id === id);

export const partnersForCategory = (category: ServiceCategory): Partner[] =>
  partners.filter((p) => p.categories.includes(category));

/**
 * Logos published per modality page.
 * Brands without a matching asset are omitted (e.g. Bradesco Seguros).
 */
export const servicePartnerLogos: Record<string, readonly string[]> = {
  'planos-de-saude-empresarial': [
    'bradesco-saude',
    'sul-america',
    'amil',
    'hapvida-plano-saude',
    'aurora-saude',
    'select-planos-saude',
    'usi-saude',
    'medsenior',
  ],
  'plano-odontologico': [
    'odontoprev',
    'porto-seguro-odontologico',
    'bradesco-dental',
    'sul-america',
  ],

  consorcios: ['yamaha'],
  'seguro-automovel': [
    'azul-seguros',
    'tokio-marine',
    'allianz',
    'zurich',
    'sul-america',
    'hdi-seguros',
    'sura',
    'mapfre-seguros',
    'yelum-seguros',
    'aliro-seguro',
    'suhai-seguros',
    'justos-seguros',
    'youse-seguros',
    'darwin-seguros',
    'ezze-seguros',
  ],
  'seguro-de-vida': [
    'allianz',
    'zurich',
    'sul-america',
    'tokio-marine',
    'metlife',
    'mag-seguros',
  ],
  'seguro-residencial': [
    'allianz',
    'sura',
    'hdi-seguros',
    'tokio-marine',
    'sul-america',
    'mapfre-seguros',
    'youse-seguros',
  ],
  'seguro-previdencia-privada': ['sul-america', 'mag-seguros'],
  'seguro-empresarial': [
    'allianz',
    'azul-seguros',
    'itau-seguros',
    'zurich',
    'sul-america',
    'hdi-seguros',
    'chubb-seguros',
    'mapfre-seguros',
    'mitsui-sumitomo-seguros',
    'ezze-seguros',
  ],
  'seguro-viagem': ['sul-america'],
  'financiamento-veiculos': [],
};

/** Logos for a modality page; empty when the slug has no verified live mapping. */
export function partnersForServiceSlug(slug: string): Partner[] {
  const ids = servicePartnerLogos[slug];
  if (!ids) return [];
  return ids
    .map((id) => findPartner(id))
    .filter((partner): partner is Partner => partner !== undefined);
}

/** Form-list names for seguradoras (logos optional). */
export const insurerPartners: string[] = [
  'Aliro Seguro',
  'Allianz',
  'AZA Seguros',
  'Azul Seguros',
  'Bradesco Seguros',
  'Chubb',
  'Darwin Seguros',
  'EZZE Seguros',
  'HDI Seguros',
  'Itaú Seguros',
  'Justos',
  'MAG Seguros',
  'Mapfre',
  'MetLife',
  'Mitsui Sumitomo',
  'Nova Seguros',
  'Porto Seguro',
  'Suhai Seguros',
  'SulAmérica',
  'Sura',
  'Tokio Marine',
  'Usebens',
  'Yamaha',
  'Yelum Seguros',
  'Youse',
  'Zurich Seguros',
];

/** Form-list names for planos de saúde e odontológicos (logos optional). */
export const healthPartners: string[] = [
  'Amil',
  'Aurora Saúde',
  'Bradesco Dental',
  'Bradesco Saúde',
  'Hapvida',
  'MedSênior',
  'OdontoPrev',
  'Porto Seguro Odontológico',
  'Porto Seguro Saúde',
  'Select',
  'SulAmérica',
  'UsiSaúde',
];

export const allPartners: string[] = [...new Set([...insurerPartners, ...healthPartners])].sort((a, b) =>
  a.localeCompare(b, 'pt-BR')
);

/**
 * One partner logo representing each service modality in the home carousel.
 * Mapping is visual only: it does not claim exclusivity of that partnership.
 */
export const servicePartnerHighlights: Array<{
  serviceSlug: string;
  partnerId: string;
}> = [
  { serviceSlug: 'planos-de-saude-empresarial', partnerId: 'bradesco-saude' },
  { serviceSlug: 'plano-odontologico', partnerId: 'odontoprev' },
  { serviceSlug: 'azul-por-assinatura', partnerId: 'azul-seguros' },
  { serviceSlug: 'seguro-previdencia-privada', partnerId: 'mag-seguros' },
  { serviceSlug: 'seguro-empresarial', partnerId: 'allianz' },
  { serviceSlug: 'seguro-viagem', partnerId: 'zurich' },
  { serviceSlug: 'consorcios', partnerId: 'yamaha' },
  { serviceSlug: 'financiamento-veiculos', partnerId: 'itau-seguros' },
  { serviceSlug: 'cartao-credito-porto-bank', partnerId: 'porto-bank' },
  { serviceSlug: 'conta-digital-porto-bank', partnerId: 'porto-bank' },
];
