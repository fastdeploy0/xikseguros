/**
 * Time-bound commercial campaigns supplied by the Xik (creative / briefing).
 * Copy mirrors the published campaign material and wording already live on
 * xikseguros.com.br (consórcios, cotação, contato).
 *
 * Mutability:
 * - `active`: master switch (false = remove every campaign surface immediately)
 * - `endsAt`: inclusive last day (America/Sao_Paulo). After that date the
 *   campaign resolves to null even if `active` is still true.
 * - `eyebrow`: set to `null` to hide the urgency line (“Última semana”) while
 *   keeping the rest of the offer; set `active: false` or wait for `endsAt`
 *   to remove Positioning + pricing table entirely.
 *
 * TODO(jurídico): confirmar vigência e condições oficiais com a Xik.
 */

export type CampaignOrbitItem = {
  id: string;
  /** Short label on the floating bullet. */
  label: string;
  /** Expanded copy on hover / focus. Omit for link-only bullets (telefone, Instagram). */
  detail?: string;
  /** Position inside the visual stage (%). */
  x: string;
  y: string;
  floatDelay: number;
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  /** Optional partner / source link shown below the tooltip copy. */
  partnerHref?: string;
  partnerLabel?: string;
};

export type CampaignPricingCopy = {
  eyebrow: string;
  title: string;
  description: string;
  discountBadge: string;
  footnote: string;
};

export type Campaign = {
  /** Master switch. When false, all campaign UI is omitted. */
  active: boolean;
  /**
   * Inclusive end date `YYYY-MM-DD` in America/Sao_Paulo.
   * After this calendar day the campaign is treated as inactive.
   * Set to `null` only for evergreen offers (none today).
   */
  endsAt: string | null;
  id: string;
  /**
   * Urgency line above the headline (e.g. “Última semana”).
   * `null` hides the eyebrow without disabling the rest of the campaign.
   */
  eyebrow: string | null;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaTo: string;
  orbit: CampaignOrbitItem[];
  /** Pricing table copy. `null` hides `ConsortiumPricingSection` only. */
  pricing: CampaignPricingCopy | null;
};

/**
 * Criativo “Campanha Porto Seguro” + textos de consórcios e cotação do site
 * oficial da Xik (xikseguros.com.br).
 *
 * Fim da campanha / “Última semana”: 31/08/2026 (inclusive).
 * A partir de 01/09/2026 (BRT) `homeCampaign` resolve para `null`.
 */
export const portoSeguroCampaign: Campaign = {
  active: true,
  endsAt: '2026-08-31',
  id: 'porto-seguro-consorcio',
  eyebrow: 'Última semana',
  headline: '50% OFF no consórcio Porto Seguro',
  subheadline:
    'Desconto válido nas parcelas até a contemplação. Faça seu consórcio com a XIK SEGUROS e torne seu sonho real.',
  ctaLabel: 'Faça sua cotação',
  ctaTo: '/faca-sua-cotacao',
  pricing: {
    eyebrow: 'Campanha Porto Seguro',
    title: 'Tabela de valores para consórcio',
    description:
      'Oportunidade 50% OFF nas parcelas até a contemplação. Selecione Auto ou Imóvel e compare o crédito liberado com o custo mensal.',
    discountBadge: '−50%',
    footnote:
      'Valores da campanha Porto Seguro intermediada pela Xik. Condição de 50% de redução nas parcelas até a contemplação, conforme o criativo.',
  },
  orbit: [
    {
      id: 'porto',
      label: 'Porto Seguro',
      detail: 'Consórcio intermediado pela Xik.',
      x: '50%',
      y: '10%',
      floatDelay: 0,
      size: 'md',
      partnerHref: 'https://portovaleconsorcio.com.br/consorcio-para-investimento',
      partnerLabel: 'Porto Vale Consórcio',
    },
    {
      id: 'telefone',
      label: '(31) 3462-0007',
      x: '16%',
      y: '78%',
      floatDelay: 0.55,
      size: 'sm',
      href: 'tel:+553134620007',
      external: false,
    },
    {
      id: 'instagram',
      label: '@xikseguros',
      x: '84%',
      y: '78%',
      floatDelay: 0.9,
      size: 'sm',
      href: 'https://www.instagram.com/xikseguros/',
      external: true,
    },
  ],
};

/** Inclusive end-of-day in America/Sao_Paulo (UTC-3, no DST as of 2026). */
function campaignEndInstant(endsAt: string): number {
  return new Date(`${endsAt}T23:59:59.999-03:00`).getTime();
}

export function isCampaignLive(campaign: Campaign, now: Date = new Date()): boolean {
  if (!campaign.active) return false;
  if (!campaign.endsAt) return true;
  return now.getTime() <= campaignEndInstant(campaign.endsAt);
}

export function resolveHomeCampaign(now: Date = new Date()): Campaign | null {
  return isCampaignLive(portoSeguroCampaign, now) ? portoSeguroCampaign : null;
}

/** Resolved at module load for static surfaces; re-check in components if SSR clocks matter. */
export const homeCampaign: Campaign | null = resolveHomeCampaign();
