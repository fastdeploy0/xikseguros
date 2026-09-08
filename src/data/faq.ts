/**
 * FAQ.
 *
 * The legacy site has no FAQ section. Every answer below is composed strictly
 * from facts already published by the Xik (institutional text, product pages,
 * contact page and quotation form option lists). No coverage, price, waiting
 * period, exclusion or contractual condition is stated anywhere in this file.
 */
import { company } from './company';
import { healthPlans } from './services';

export type FaqItem = {
  question: string;
  answer: string;
};

const listOf = (items: string[]): string =>
  items.length > 1
    ? `${items.slice(0, -1).join(', ')} e ${items[items.length - 1]}`
    : (items[0] ?? '');

export const faq: FaqItem[] = [
  {
    question: 'Desde quando a XIK SEGUROS atua no mercado?',
    answer: `A Xik Administradora e Corretora de Seguros foi constituída em ${company.foundedYear}. A experiência profissional da sócia administradora, ${company.managingPartner}, no mercado de seguros, previdência e saúde começou em ${company.experienceSince}.`,
  },
  {
    question: 'O que exatamente a XIK SEGUROS faz?',
    answer: company.mission,
  },
  {
    question: 'Quais tipos de plano de saúde a Xik intermedia?',
    answer: `A Xik trabalha com ${listOf(
      healthPlans.map((s) => s.title)
    )}. Fazemos cotações personalizadas conforme o preenchimento do formulário dentro da respectiva página do serviço de interesse.`,
  },
  {
    question: 'Quais seguros e produtos financeiros estão disponíveis?',
    answer: 'Atuamos em personalizações de seguros e consórcios no geral.',
  },
  {
    question: 'Como recebo valores e coberturas de um plano ou seguro?',
    answer:
      'Preencha o formulário de cotação informando a modalidade e as seguradoras ou operadoras de seu interesse. A equipe da Xik envia o catálogo com as informações completas por e-mail ou WhatsApp e entra em contato para orientar a escolha. Nenhum valor ou cobertura é divulgado neste site sem passar pela análise de um consultor.',
  },
  {
    question: 'A XIK SEGUROS atende empresas?',
    answer:
      'Sim. A atuação da corretora abrange pessoas jurídicas no campo patrimonial, financeiro e das responsabilidades civis, com soluções pensadas para reduzir o custo das empresas em quaisquer seguros ou investimentos.',
  },
  {
    question: 'Onde a XIK SEGUROS fica?',
    answer: `O escritório fica na ${company.address.full}. O atendimento também acontece por telefone e WhatsApp.`,
  },
];
