/**
 * Form profiles for the home quick-quote rail.
 * `direct` keeps the Porto handoff; other kinds open a WhatsApp lead form.
 */
import type { QuickQuoteSlug } from './quick-quotes';

export type QuickQuoteFormKind = 'direct' | 'auto' | 'home' | 'services' | 'light';

export function quickQuoteFormKind(slug: QuickQuoteSlug): QuickQuoteFormKind {
  switch (slug) {
    case 'cartao-credito-porto-bank':
    case 'conta-digital-porto-bank':
      return 'direct';
    case 'seguro-automovel':
    case 'azul-por-assinatura':
      return 'auto';
    case 'seguro-residencial':
      return 'home';
    case 'porto-servicos':
      return 'services';
    default:
      return 'light';
  }
}

export function quickQuoteUsesLeadForm(slug: QuickQuoteSlug): boolean {
  return quickQuoteFormKind(slug) !== 'direct';
}
