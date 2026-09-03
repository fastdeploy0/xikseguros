/**
 * Consortium pricing rows transcribed from the Xik campaign creatives
 * (tabela-consorcio-1…3). Values are as printed: no inferred rates.
 *
 * TODO(jurídico): confirmar vigência e condições oficiais com a Xik.
 */

export type ConsortiumKind = 'auto' | 'imovel';

export type ConsortiumPricingRow = {
  id: string;
  kind: ConsortiumKind;
  /** Credit amount in BRL (whole reais). */
  credit: number;
  /** Original monthly installment in BRL (centavos as decimal). */
  installmentBefore: number;
  /** Promotional monthly installment in BRL until contemplation. */
  installmentAfter: number;
};

export const consortiumKindLabel: Record<ConsortiumKind, string> = {
  auto: 'Auto',
  imovel: 'Imóvel',
};

/** All published credit tiers, ascending by credit value. */
export const consortiumPricingRows: ConsortiumPricingRow[] = [
  // Auto: tabela 1
  {
    id: 'auto-30',
    kind: 'auto',
    credit: 30_000,
    installmentBefore: 663,
    installmentAfter: 338,
  },
  {
    id: 'auto-50',
    kind: 'auto',
    credit: 50_000,
    installmentBefore: 1_105,
    installmentAfter: 563,
  },
  {
    id: 'auto-80',
    kind: 'auto',
    credit: 80_000,
    installmentBefore: 1_077,
    installmentAfter: 556,
  },
  {
    id: 'auto-100',
    kind: 'auto',
    credit: 100_000,
    installmentBefore: 1_346,
    installmentAfter: 695,
  },
  {
    id: 'auto-130',
    kind: 'auto',
    credit: 130_000,
    installmentBefore: 1_750,
    installmentAfter: 904,
  },
  // Auto: tabela 2
  {
    id: 'auto-150',
    kind: 'auto',
    credit: 150_000,
    installmentBefore: 1_810,
    installmentAfter: 938,
  },
  {
    id: 'auto-180',
    kind: 'auto',
    credit: 180_000,
    installmentBefore: 2_172,
    installmentAfter: 1_125,
  },
  {
    id: 'auto-200',
    kind: 'auto',
    credit: 200_000,
    installmentBefore: 2_413,
    installmentAfter: 1_250,
  },
  {
    id: 'auto-220',
    kind: 'auto',
    credit: 220_000,
    installmentBefore: 2_654,
    installmentAfter: 1_375,
  },
  {
    id: 'auto-250',
    kind: 'auto',
    credit: 250_000,
    installmentBefore: 3_016,
    installmentAfter: 1_563,
  },
  // Imóvel: tabela 3
  {
    id: 'imovel-300',
    kind: 'imovel',
    credit: 300_000,
    installmentBefore: 1_926,
    installmentAfter: 922.5,
  },
  {
    id: 'imovel-400',
    kind: 'imovel',
    credit: 400_000,
    installmentBefore: 2_570,
    installmentAfter: 1_230,
  },
  {
    id: 'imovel-500',
    kind: 'imovel',
    credit: 500_000,
    installmentBefore: 3_213,
    installmentAfter: 1_537.5,
  },
  {
    id: 'imovel-1000',
    kind: 'imovel',
    credit: 1_000_000,
    installmentBefore: 6_426,
    installmentAfter: 3_075,
  },
  {
    id: 'imovel-1500',
    kind: 'imovel',
    credit: 1_500_000,
    installmentBefore: 9_639,
    installmentAfter: 4_612.5,
  },
  {
    id: 'imovel-2000',
    kind: 'imovel',
    credit: 2_000_000,
    installmentBefore: 12_852,
    installmentAfter: 6_150,
  },
];

const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export function formatBrl(value: number): string {
  return brl.format(value);
}

/** Compact credit label: "R$ 30 mil", "R$ 1 milhão", "R$ 1,5 milhão", "R$ 2 milhões". */
export function formatCreditLabel(value: number): string {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    if (millions === 1) return 'R$ 1 milhão';
    const label = Number.isInteger(millions)
      ? String(millions)
      : millions.toLocaleString('pt-BR', { maximumFractionDigits: 1 });
    return `R$ ${label} milhões`;
  }
  return `R$ ${(value / 1_000).toLocaleString('pt-BR')} mil`;
}
