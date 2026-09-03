/**
 * Runtime configuration for the XIK SEGUROS site.
 *
 * This file is served as-is (never bundled), so the commercial contact channels
 * can be changed in production without a rebuild. It is the ONLY place where the
 * WhatsApp number may live: no component is allowed to hardcode it.
 *
 * `whatsappNumber` must be the number in international format, digits only.
 * Set it to an empty string to disable every WhatsApp call-to-action site-wide.
 */
window.__XIK_CONFIG__ = {
  // WhatsApp comercial (wa.me/553134620007).
  whatsappNumber: '553134620007',
  whatsappGreeting: 'Olá! Vim pelo site da XIK SEGUROS e gostaria de falar com um consultor.',
};
