/** Opções em confirmação com a cliente. Editar somente aqui. */
export const consortiumSimulationOptions = {
  asset: ['Imóvel', 'Automóvel', 'Veículo pesado', 'Serviços ou outro'],
  credit: ['até R$ 50 mil', 'R$ 50 a 100 mil', 'R$ 100 a 300 mil', 'acima de R$ 300 mil'],
  bid: ['Sim', 'Não', 'Não sei'],
} as const;

export type ConsortiumSimulationValues = {
  name: string;
  asset: string;
  credit: string;
  monthly: string;
  bid: string;
};

export function buildConsortiumSimulationMessage(values: ConsortiumSimulationValues): string {
  const parts = [
    `Olá! Gostaria de uma simulação de consórcio. Nome: ${values.name.trim()}`,
    `Bem: ${values.asset}`,
    `Crédito: ${values.credit}`,
  ];
  if (values.monthly.trim()) parts.push(`Parcela: ${values.monthly.trim()}`);
  if (values.bid) parts.push(`Lance: ${values.bid}`);
  return parts.join('; ');
}
