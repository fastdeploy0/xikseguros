/**
 * Navigation tree. Mirrors the menu published on xikseguros.com.br, with
 * Investimentos grouping previdência, consórcios e financiamento (produtos
 * financeiros; fora do menu Seguros).
 *
 * `/blog` is the editorial index. Article routes live under `/blog/:slug`.
 */
import { healthPlans, insurances, servicePath, services } from './services';

export type NavChild = {
  label: string;
  to: string;
  description: string | null;
};

export type NavItem = {
  label: string;
  to: string;
  children?: NavChild[];
};

/** Slugs treated as financial / investment products in the primary nav. */
export const INVESTMENT_SLUGS = [
  'seguro-previdencia-privada',
  'consorcios',
  'financiamento-veiculos',
  'cartao-credito-porto-bank',
  'conta-digital-porto-bank',
  'equipamentos-portateis',
] as const;

const investmentSlugSet = new Set<string>(INVESTMENT_SLUGS);

export function isInvestmentServiceSlug(slug: string): boolean {
  return investmentSlugSet.has(slug);
}

/** Previdência, consórcios, financiamento e produtos Porto Bank: menu Investimentos. */
export const investmentNavServices = INVESTMENT_SLUGS.map((slug) => {
  const service = services.find((item) => item.slug === slug);
  if (!service) throw new Error(`Missing investment service: ${slug}`);
  return service;
});

/** Seguros no menu: exclusão dos produtos financeiros do dropdown Investimentos. */
export const insuranceNavServices = insurances.filter(
  (service) => !investmentSlugSet.has(service.slug)
);

const investmentNavChildren: NavChild[] = investmentNavServices.map((service) => ({
  label:
    service.slug === 'financiamento-veiculos' ? 'Financiamento de veículos' : service.label,
  to: servicePath(service),
  description: service.title,
}));

export { investmentNavChildren };

export const mainNav: NavItem[] = [
  { label: 'A Empresa', to: '/a-empresa' },
  {
    label: 'Planos de Saúde',
    to: '/planos',
    children: healthPlans.map((s) => ({
      label: s.label,
      to: servicePath(s),
      description: s.title,
    })),
  },
  {
    label: 'Seguros',
    to: '/seguros',
    children: insuranceNavServices.map((s) => ({
      label: s.label,
      to: servicePath(s),
      description: s.title,
    })),
  },
  {
    label: 'Investimentos',
    to: servicePath(investmentNavServices[0]),
    children: investmentNavChildren,
  },
  { label: 'Blog', to: '/blog' },
];

/** Primary conversion destination, reused by header, footer and mobile CTA. */
export const primaryCta = { label: 'Faça sua cotação', to: '/faca-sua-cotacao' } as const;

/**
 * Legacy URLs that must not break. The flat product URLs also resolved on the
 * old WordPress site, and `/home` was an alias of the front page.
 */
export const legacyRoutes: Array<{ from: string; to: string }> = [
  { from: '/home', to: '/' },
  { from: '/planos-de-saude', to: '/planos/planos-de-saude-empresarial' },
  { from: '/plano-de-saude-individual', to: '/planos' },
  { from: '/planos/plano-de-saude-individual', to: '/planos' },
  { from: '/planos-de-saude-empresarial', to: '/planos/planos-de-saude-empresarial' },
  { from: '/plano-de-saude-por-adesao', to: '/planos' },
  { from: '/planos/plano-de-saude-por-adesao', to: '/planos' },
  { from: '/plano-odontologico', to: '/planos/plano-odontologico' },
  { from: '/seguro-automovel', to: '/seguros/seguro-automovel' },
  { from: '/seguro-de-vida', to: '/seguros/seguro-de-vida' },
  { from: '/seguro-residencial', to: '/seguros/seguro-residencial' },
  { from: '/seguro-previdencia-privada', to: '/seguros/seguro-previdencia-privada' },
  { from: '/seguro-empresarial', to: '/seguros/seguro-empresarial' },
  { from: '/seguro-viagem', to: '/seguros/seguro-viagem' },
  { from: '/seguro-celular', to: '/seguros/seguro-celular' },
  { from: '/azul-por-assinatura', to: '/seguros/azul-por-assinatura' },
  { from: '/porto-servicos', to: '/seguros/porto-servicos' },
  { from: '/cartao-credito-porto-bank', to: '/seguros/cartao-credito-porto-bank' },
  { from: '/conta-digital-porto-bank', to: '/seguros/conta-digital-porto-bank' },
  { from: '/equipamentos-portateis', to: '/seguros/equipamentos-portateis' },
  { from: '/consorcios', to: '/seguros/consorcios' },
  { from: '/financiamento', to: '/seguros/financiamento-veiculos' },
  { from: '/financiamentos', to: '/seguros/financiamento-veiculos' },
  { from: '/financiamento-veiculos', to: '/seguros/financiamento-veiculos' },
  // The old site linked "Consórcios" to a page that returns 404; point it at the real one.
  { from: '/seguros/seguro-placa-solar', to: '/seguros/consorcios' },
  {
    from: '/blog/plano-de-saude-individual-empresarial-ou-por-adesao-qual-escolher',
    to: '/blog',
  },
];
