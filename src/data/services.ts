/**
 * Product catalogue.
 *
 * `slug` reproduces the URL structure already indexed on xikseguros.com.br
 * (`/planos/...` and `/seguros/...`) so the existing SEO equity is preserved.
 *
 * `summary` holds the descriptive copy published by the Xik on each page. Only
 * grammar and readability were corrected: no factual claim was added, and no
 * coverage, price, exclusion or contractual condition was inferred.
 */
import {
  Briefcase,
  Building2,
  Car,
  CircleDollarSign,
  HeartPulse,
  House,
  Landmark,
  Plane,
  Users,
  Wallet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ToothIcon } from '@/components/icons/ToothIcon';

export type ServiceCategory = 'planos' | 'seguros';

export type Service = {
  /** URL slug within its category, e.g. `seguro-automovel`. */
  slug: string;
  category: ServiceCategory;
  /** Short label used in menus and cards. */
  label: string;
  /** Page `h1`, as published by the Xik. */
  title: string;
  /** Descriptive copy recovered from the corresponding page, or `null`. */
  summary: string | null;
  /** Meta description; falls back to `summary` when absent. */
  metaDescription: string;
  icon: LucideIcon;
  /** Flat URLs that also resolved on the legacy site and must keep working. */
  legacyPaths: string[];
};

export const services: Service[] = [
  {
    slug: 'plano-de-saude-individual',
    category: 'planos',
    label: 'Individuais',
    title: 'Plano de Saúde Individual',
    summary:
      'Você está buscando um Plano de Saúde Individual? Aqui você encontra os melhores planos, das operadoras líderes de mercado, com o melhor preço. Cuide bem da sua saúde, ela é seu bem mais precioso!',
    metaDescription:
      'Planos de saúde individuais das operadoras líderes de mercado, intermediados pela XIK SEGUROS em Belo Horizonte.',
    icon: HeartPulse,
    legacyPaths: ['/plano-de-saude-individual'],
  },
  {
    slug: 'planos-de-saude-empresarial',
    category: 'planos',
    label: 'Empresariais',
    title: 'Plano de Saúde Empresarial',
    summary:
      'A XIK SEGUROS oferece diversos planos empresariais para você e sua empresa cuidarem bem de seus colaboradores.',
    metaDescription:
      'Planos de saúde empresariais para cuidar dos seus colaboradores, com intermediação e gestão da XIK SEGUROS.',
    icon: Building2,
    legacyPaths: ['/planos-de-saude', '/planos-de-saude-empresarial'],
  },
  {
    slug: 'plano-de-saude-por-adesao',
    category: 'planos',
    label: 'Por adesão',
    title: 'Plano de Saúde por Adesão',
    summary:
      'Você está buscando um Plano de Saúde por Adesão? A XIK SEGUROS é parceira das melhores instituições que oferecem este tipo de serviço. Conheça nossos operadores parceiros e confira!',
    metaDescription:
      'Planos de saúde por adesão junto às administradoras de benefícios parceiras da XIK SEGUROS.',
    icon: Users,
    legacyPaths: ['/plano-de-saude-por-adesao'],
  },
  {
    slug: 'plano-odontologico',
    category: 'planos',
    label: 'Odontológicos',
    title: 'Planos Odontológicos',
    summary:
      'Você está buscando um Plano Odontológico? Aqui você encontra os melhores planos, das operadoras líderes de mercado, com o melhor preço. Cuide bem da sua saúde bucal!',
    metaDescription:
      'Planos odontológicos das operadoras líderes de mercado, intermediados pela XIK SEGUROS.',
    icon: ToothIcon,
    legacyPaths: ['/plano-odontologico'],
  },
  {
    slug: 'seguro-automovel',
    category: 'seguros',
    label: 'Automóvel',
    title: 'Seguro Automóvel',
    summary:
      'Encontre o seguro ideal para o seu veículo, com as melhores seguradoras e o melhor custo x benefício.',
    metaDescription:
      'Seguro automóvel com cotação nas principais seguradoras do mercado através da XIK SEGUROS.',
    icon: Car,
    legacyPaths: ['/seguro-automovel'],
  },
  {
    slug: 'seguro-de-vida',
    category: 'seguros',
    label: 'Vida',
    title: 'Seguro de Vida',
    summary:
      'Na XIK SEGUROS você encontra o seguro de vida ideal para a sua necessidade, com as melhores ofertas e o melhor custo x benefício.',
    metaDescription:
      'Seguro de vida para você e sua família, com cotação nas principais seguradoras através da XIK SEGUROS.',
    icon: Briefcase,
    legacyPaths: ['/seguro-de-vida'],
  },
  {
    slug: 'seguro-residencial',
    category: 'seguros',
    label: 'Residencial',
    title: 'Seguro Residencial',
    summary:
      'Contrate um seguro para a sua residência e fique livre de dores de cabeça com situações inesperadas. Encontre os melhores serviços na XIK SEGUROS.',
    metaDescription:
      'Seguro residencial para proteger a sua casa contra situações inesperadas, com intermediação da XIK SEGUROS.',
    icon: House,
    legacyPaths: ['/seguro-residencial'],
  },
  {
    slug: 'seguro-previdencia-privada',
    category: 'seguros',
    label: 'Previdência privada',
    title: 'Previdência Privada',
    summary:
      'A XIK SEGUROS tem o melhor plano para você que pensa num futuro tranquilo. Faça sua previdência privada conosco e encontre o plano ideal para não ter dor de cabeça no futuro.',
    metaDescription:
      'Previdência privada para planejar o seu futuro com orientação especializada da XIK SEGUROS.',
    icon: Landmark,
    legacyPaths: ['/seguro-previdencia-privada'],
  },
  {
    slug: 'seguro-empresarial',
    category: 'seguros',
    label: 'Empresarial',
    title: 'Seguro Empresarial',
    // A página original não publica texto descritivo. O resumo abaixo é derivado
    // literalmente do texto institucional da própria Xik ("A Empresa"), que
    // descreve a proteção de pessoas jurídicas no campo patrimonial, financeiro
    // e das responsabilidades civis. Nenhuma cobertura foi inferida.
    summary:
      'Gestão de riscos e formatação de apólices para proteger pessoas jurídicas no campo patrimonial, financeiro e das responsabilidades civis.',
    metaDescription:
      'Seguro empresarial com gestão de riscos e formatação de apólices para pessoas jurídicas, pela XIK SEGUROS.',
    icon: Building2,
    legacyPaths: ['/seguro-empresarial'],
  },
  {
    slug: 'seguro-viagem',
    category: 'seguros',
    label: 'Viagem',
    title: 'Seguro Viagem',
    summary:
      'Vai viajar? A XIK SEGUROS encontrará o melhor seguro para você não ter dor de cabeça durante a viagem dos seus sonhos.',
    metaDescription:
      'Seguro viagem para viajar tranquilo, com cotação nas principais seguradoras através da XIK SEGUROS.',
    icon: Plane,
    legacyPaths: ['/seguro-viagem'],
  },
  {
    slug: 'consorcios',
    category: 'seguros',
    label: 'Consórcios',
    title: 'Consórcios',
    summary:
      'Faça seu consórcio com a XIK SEGUROS. Temos as melhores ofertas para você investir no seu sonho. Confira!',
    metaDescription:
      'Consórcios para realizar o seu projeto, com condições intermediadas pela XIK SEGUROS.',
    icon: CircleDollarSign,
    legacyPaths: ['/consorcios'],
  },
  {
    slug: 'financiamento-veiculos',
    category: 'seguros',
    label: 'Financiamentos',
    title: 'Financiamento de Veículos',
    summary:
      'Adquira seu veículo utilizando um bom e seguro financiamento. Não perca tempo e solicite uma avaliação de carta de crédito.',
    metaDescription:
      'Financiamento de veículos e avaliação de carta de crédito com apoio da XIK SEGUROS.',
    icon: Wallet,
    legacyPaths: ['/financiamento', '/financiamento-veiculos', '/financiamentos'],
  },
];

export const servicePath = (service: Service): string => `/${service.category}/${service.slug}`;

export const healthPlans = services.filter((s) => s.category === 'planos');
export const insurances = services.filter((s) => s.category === 'seguros');

export const findService = (category: string, slug: string): Service | undefined =>
  services.find((s) => s.category === category && s.slug === slug);

/**
 * Subjects offered in the quotation forms, mirroring the option lists published
 * on the legacy site. "Seguro Placa Solar" is offered in the original form but
 * has no page of its own, so it exists here as a subject only.
 */
export const quoteSubjects: string[] = [
  ...healthPlans.map((s) => s.title),
  ...insurances.map((s) => s.title),
  'Seguro Placa Solar',
];
