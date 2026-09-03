/**
 * Access layer for the runtime config declared in `/public/config.js`.
 * Nothing else in the codebase may read `window.__XIK_CONFIG__` directly.
 */

export type RuntimeConfig = {
  whatsappNumber: string;
  whatsappGreeting: string;
};

declare global {
  interface Window {
    __XIK_CONFIG__?: Partial<RuntimeConfig>;
  }
}

const FALLBACK: RuntimeConfig = {
  whatsappNumber: '',
  whatsappGreeting: '',
};

function read(): RuntimeConfig {
  if (typeof window === 'undefined') return FALLBACK;
  const raw = window.__XIK_CONFIG__;
  return {
    whatsappNumber: (raw?.whatsappNumber ?? '').replace(/\D/g, ''),
    whatsappGreeting: raw?.whatsappGreeting ?? '',
  };
}

/** A WhatsApp number is only usable if it looks like a full BR mobile number. */
export function getWhatsappNumber(): string | null {
  const number = read().whatsappNumber;
  return number.length >= 12 ? number : null;
}

export function hasWhatsapp(): boolean {
  return getWhatsappNumber() !== null;
}

/**
 * Builds a wa.me deep link. Returns `null` when no number is configured, so
 * callers can omit the CTA entirely instead of rendering a dead button.
 */
export function buildWhatsappUrl(message?: string): string | null {
  const number = getWhatsappNumber();
  if (!number) return null;
  const text = message?.trim() || read().whatsappGreeting;
  const query = text ? `?text=${encodeURIComponent(text)}` : '';
  return `https://wa.me/${number}${query}`;
}
