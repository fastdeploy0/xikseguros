/**
 * Home quick-quote rail: ordered Porto handoff products.
 * URLs come from `external-quotes`; pages from `services`.
 * Icons mirror the central metaphor of each marketing hero.
 */
import type { LucideIcon } from 'lucide-react';
import {
  Car,
  CarFront,
  CreditCard,
  Heart,
  House,
  Laptop,
  Smartphone,
  Wallet,
  Wrench,
} from 'lucide-react';
import { services, servicePath } from './services';
import { externalQuoteUrlForSlug } from './external-quotes';

/** Display order for the home cotação rápida section. */
export const QUICK_QUOTE_SLUGS = [
  'equipamentos-portateis',
  'seguro-de-vida',
  'seguro-celular',
  'cartao-credito-porto-bank',
  'conta-digital-porto-bank',
  'azul-por-assinatura',
  'porto-servicos',
  'seguro-residencial',
  'seguro-automovel',
] as const;

export type QuickQuoteSlug = (typeof QUICK_QUOTE_SLUGS)[number];

/**
 * Icon overrides for this rail only (do not mutate Service.icon).
 * Chosen from the central metaphor of each `xik-hero-*.webp`.
 */
const QUICK_QUOTE_ICONS: Record<QuickQuoteSlug, LucideIcon> = {
  'equipamentos-portateis': Laptop,
  'seguro-de-vida': Heart,
  'seguro-celular': Smartphone,
  'cartao-credito-porto-bank': CreditCard,
  'conta-digital-porto-bank': Wallet,
  'azul-por-assinatura': CarFront,
  'porto-servicos': Wrench,
  'seguro-residencial': House,
  'seguro-automovel': Car,
};

export type QuickQuoteItem = {
  slug: QuickQuoteSlug;
  title: string;
  label: string;
  externalUrl: string;
  internalPath: string;
  icon: LucideIcon;
};

/**
 * Resolves only items with a Porto URL and a matching service page.
 * Fail closed: missing URL or service → omit.
 */
export function resolveQuickQuotes(): QuickQuoteItem[] {
  const items: QuickQuoteItem[] = [];

  for (const slug of QUICK_QUOTE_SLUGS) {
    const externalUrl = externalQuoteUrlForSlug(slug);
    if (!externalUrl) continue;

    const service = services.find((item) => item.slug === slug);
    if (!service) continue;

    items.push({
      slug,
      title: service.title,
      label: service.label,
      externalUrl,
      internalPath: servicePath(service),
      icon: QUICK_QUOTE_ICONS[slug],
    });
  }

  return items;
}
