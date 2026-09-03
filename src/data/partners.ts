/**
 * Partner catalogue with logos supplied in `source_assets/` (optimised into
 * `src/assets/partners/`).
 *
 * Names that already appeared in the Xik quotation forms keep that provenance.
 * Additional brands whose logos were provided in `source_assets/` are included
 * as visual partners without inventing form-list membership claims.
 */
import type { ServiceCategory } from './services';

import logoAffix from '@/assets/partners/affix.webp';
import logoAllianz from '@/assets/partners/allianz.webp';
import logoAllcare from '@/assets/partners/allcare.webp';
import logoAmil from '@/assets/partners/amil.webp';
import logoAmilDental from '@/assets/partners/amil-dental.webp';
import logoAzul from '@/assets/partners/azul-seguros.webp';
import logoBradescoSaude from '@/assets/partners/bradesco-saude.webp';
import logoGoldenCross from '@/assets/partners/golden-cross.webp';
import logoGoodlife from '@/assets/partners/goodlife.webp';
import logoHdi from '@/assets/partners/hdi-seguros.webp';
import logoItau from '@/assets/partners/itau-seguros.webp';
import logoMedsenior from '@/assets/partners/medsenior.webp';
import logoMetlife from '@/assets/partners/metlife.webp';
import logoMongeral from '@/assets/partners/mongeral-aegon.webp';
import logoOdontoprev from '@/assets/partners/odontoprev.webp';
import logoPorto from '@/assets/partners/porto.webp';
import logoPremium from '@/assets/partners/premium-saude.webp';
import logoQualicorp from '@/assets/partners/qualicorp.webp';
import logoSaudeSistema from '@/assets/partners/saude-sistema.webp';
import logoSompo from '@/assets/partners/sompo-seguros.webp';
import logoSulAmerica from '@/assets/partners/sul-america.webp';
import logoSura from '@/assets/partners/sura.webp';
import logoTokio from '@/assets/partners/tokio-marine-seguradora.webp';
import logoUnimed from '@/assets/partners/unimed.webp';
import logoVitallis from '@/assets/partners/vitallis.webp';
import logoYamaha from '@/assets/partners/yamaha.webp';
import logoZurich from '@/assets/partners/zurich-seguros.webp';

export type Partner = {
  id: string;
  name: string;
  logo: string;
  /** Categories where this logo is shown on hub/service pages. */
  categories: ServiceCategory[];
  /**
   * True when the name also appears in the Xik quotation form option lists
   * recovered from the live site.
   */
  listedInForms: boolean;
};

export const partners: Partner[] = [
  { id: 'affix', name: 'Affix Benefícios', logo: logoAffix, categories: ['planos'], listedInForms: true },
  { id: 'allianz', name: 'Allianz', logo: logoAllianz, categories: ['planos', 'seguros'], listedInForms: true },
  { id: 'allcare', name: 'AllCare Benefícios', logo: logoAllcare, categories: ['planos'], listedInForms: true },
  { id: 'amil', name: 'Amil', logo: logoAmil, categories: ['planos'], listedInForms: true },
  { id: 'amil-dental', name: 'Amil Dental', logo: logoAmilDental, categories: ['planos'], listedInForms: true },
  { id: 'azul-seguros', name: 'Azul Seguros', logo: logoAzul, categories: ['seguros'], listedInForms: true },
  {
    id: 'bradesco-saude',
    name: 'Bradesco Saúde',
    logo: logoBradescoSaude,
    categories: ['planos'],
    listedInForms: true,
  },
  {
    id: 'golden-cross',
    name: 'Golden Cross',
    logo: logoGoldenCross,
    categories: ['planos'],
    listedInForms: false,
  },
  {
    id: 'goodlife',
    name: 'GoodLife Saúde',
    logo: logoGoodlife,
    categories: ['planos'],
    listedInForms: true,
  },
  { id: 'hdi-seguros', name: 'HDI Seguros', logo: logoHdi, categories: ['seguros'], listedInForms: true },
  { id: 'itau-seguros', name: 'Itaú Seguros', logo: logoItau, categories: ['seguros'], listedInForms: true },
  { id: 'medsenior', name: 'MedSênior', logo: logoMedsenior, categories: ['planos'], listedInForms: true },
  { id: 'metlife', name: 'MetLife', logo: logoMetlife, categories: ['seguros'], listedInForms: true },
  {
    id: 'mongeral-aegon',
    name: 'Mongeral Aegon',
    logo: logoMongeral,
    categories: ['seguros'],
    listedInForms: false,
  },
  { id: 'odontoprev', name: 'OdontoPrev', logo: logoOdontoprev, categories: ['planos'], listedInForms: true },
  { id: 'porto', name: 'Porto Seguro', logo: logoPorto, categories: ['seguros'], listedInForms: true },
  {
    id: 'premium-saude',
    name: 'Premium Saúde',
    logo: logoPremium,
    categories: ['planos'],
    listedInForms: true,
  },
  { id: 'qualicorp', name: 'Qualicorp', logo: logoQualicorp, categories: ['planos'], listedInForms: true },
  {
    id: 'saude-sistema',
    name: 'Saúde Sistema',
    logo: logoSaudeSistema,
    categories: ['planos'],
    listedInForms: true,
  },
  {
    id: 'sompo-seguros',
    name: 'Sompo Seguros',
    logo: logoSompo,
    categories: ['seguros'],
    listedInForms: false,
  },
  {
    id: 'sul-america',
    name: 'SulAmérica',
    logo: logoSulAmerica,
    categories: ['planos'],
    listedInForms: true,
  },
  { id: 'sura', name: 'Sura', logo: logoSura, categories: ['seguros'], listedInForms: false },
  {
    id: 'tokio-marine',
    name: 'Tokio Marine',
    logo: logoTokio,
    categories: ['seguros'],
    listedInForms: false,
  },
  { id: 'unimed', name: 'Unimed', logo: logoUnimed, categories: ['planos', 'seguros'], listedInForms: true },
  { id: 'vitallis', name: 'Vitallis', logo: logoVitallis, categories: ['planos'], listedInForms: true },
  { id: 'yamaha', name: 'Yamaha', logo: logoYamaha, categories: ['seguros'], listedInForms: false },
  { id: 'zurich', name: 'Zurich Seguros', logo: logoZurich, categories: ['seguros'], listedInForms: true },
];

export const findPartner = (id: string): Partner | undefined => partners.find((p) => p.id === id);

export const partnersForCategory = (category: ServiceCategory): Partner[] =>
  partners.filter((p) => p.categories.includes(category));

/**
 * OPERADORAS / SEGURADORAS logos published on each live modality page
 * (xikseguros.com.br), in the same visual order. Ids map to assets in
 * `source_assets/` / `src/assets/partners/`.
 *
 * Brands shown on the live site without a matching asset are omitted
 * (e.g. Bradesco Seguros: only `bradesco-saude` exists in source_assets).
 */
export const servicePartnerLogos: Record<string, readonly string[]> = {
  'plano-de-saude-individual': [
    'vitallis',
    'unimed',
    'goodlife',
    'premium-saude',
    'medsenior',
  ],
  'planos-de-saude-empresarial': [
    'bradesco-saude',
    'allianz',
    'sul-america',
    'amil',
    'golden-cross',
    'vitallis',
    'premium-saude',
    'goodlife',
    'saude-sistema',
    'unimed',
  ],
  'plano-odontologico': [
    'porto',
    'odontoprev',
    'amil-dental',
    'sul-america',
    'metlife',
    'golden-cross',
  ],
  'plano-de-saude-por-adesao': ['qualicorp', 'allcare', 'affix'],

  consorcios: ['porto', 'yamaha'],
  'seguro-automovel': [
    'porto',
    'azul-seguros',
    'tokio-marine',
    'allianz',
    'zurich',
    'sul-america',
    'hdi-seguros',
    'sompo-seguros',
    'sura',
  ],
  'seguro-de-vida': [
    'porto',
    'mongeral-aegon',
    'allianz',
    'zurich',
    'sul-america',
    'tokio-marine',
  ],
  'seguro-residencial': [
    'porto',
    'allianz',
    'sura',
    'hdi-seguros',
    'tokio-marine',
    'sul-america',
  ],
  'seguro-previdencia-privada': ['porto', 'mongeral-aegon', 'sul-america'],
  'seguro-empresarial': [
    'allianz',
    'azul-seguros',
    'itau-seguros',
    'porto',
    'zurich',
    'sul-america',
    'hdi-seguros',
  ],
  'seguro-viagem': ['porto', 'sul-america'],
  'financiamento-veiculos': ['porto'],
};

/** Logos for a modality page; empty when the slug has no verified live mapping. */
export function partnersForServiceSlug(slug: string): Partner[] {
  const ids = servicePartnerLogos[slug];
  if (!ids) return [];
  return ids
    .map((id) => findPartner(id))
    .filter((partner): partner is Partner => partner !== undefined);
}

/** Form-list names that still have no logo asset: kept for quote forms / FAQ. */
export const insurerPartners: string[] = [
  'Allianz',
  'Azul Seguros',
  'Bradesco Seguros',
  'HDI Seguros',
  'Itaú Seguros',
  'MetLife',
  'Porto Seguro',
  'Seguros Unimed',
  'SulAmérica',
  'Zurich Seguros',
];

export const healthPartners: string[] = [
  'Affix Benefícios',
  'Allianz',
  'AllCare Benefícios',
  'Amil',
  'Amil Dental',
  'Bem Benefícios',
  'Bradesco Saúde',
  'GoodLife Saúde',
  'MedSênior',
  'OdontoPrev',
  'One Health',
  'Premium Saúde',
  'Promed',
  'Qualicorp',
  'Samp',
  'SulAmérica',
  'Unimed',
  'Vitallis',
  'Vivamed Saúde',
  'Saúde Sistema',
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
  { serviceSlug: 'plano-de-saude-individual', partnerId: 'amil' },
  { serviceSlug: 'planos-de-saude-empresarial', partnerId: 'bradesco-saude' },
  { serviceSlug: 'plano-de-saude-por-adesao', partnerId: 'qualicorp' },
  { serviceSlug: 'plano-odontologico', partnerId: 'odontoprev' },
  { serviceSlug: 'seguro-automovel', partnerId: 'porto' },
  { serviceSlug: 'seguro-de-vida', partnerId: 'metlife' },
  { serviceSlug: 'seguro-residencial', partnerId: 'tokio-marine' },
  { serviceSlug: 'seguro-previdencia-privada', partnerId: 'mongeral-aegon' },
  { serviceSlug: 'seguro-empresarial', partnerId: 'allianz' },
  { serviceSlug: 'seguro-viagem', partnerId: 'zurich' },
  { serviceSlug: 'consorcios', partnerId: 'yamaha' },
  { serviceSlug: 'financiamento-veiculos', partnerId: 'itau-seguros' },
];
