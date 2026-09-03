/**
 * FAQ.
 *
 * The legacy site has no FAQ section. Every answer below is composed strictly
 * from facts already published by the Xik (institutional text, product pages,
 * contact page and quotation form option lists). No coverage, price, waiting
 * period, exclusion or contractual condition is stated anywhere in this file.
 */
import { company } from './company';
import { healthPlans, insurances } from './services';
import { insurerPartners } from './partners';

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
    answer: `A Xik trabalha com quatro modalidades: ${listOf(
      healthPlans.map((s) => s.title)
    )}. Cada modalidade tem uma página própria com o formulário para receber valores e coberturas das operadoras.`,
  },
  {
    question: 'Quais seguros e produtos financeiros estão disponíveis?',
    answer: `Além dos planos de saúde, a Xik atua com ${listOf(insurances.map((s) => s.title))}. O Seguro Placa Solar também consta entre os assuntos disponíveis no formulário de cotação.`,
  },
  {
    question: 'Com quais seguradoras a Xik trabalha?',
    answer: `Entre as seguradoras listadas nos formulários de cotação da Xik estão ${listOf(
      insurerPartners
    )}. Nos planos de saúde, a corretora também trabalha com operadoras e administradoras de benefícios, indicadas no formulário de cada modalidade.`,
  },
  {
    question: 'Como recebo valores e coberturas de um plano ou seguro?',
    answer:
      'Preencha o formulário de cotação informando a modalidade e as seguradoras ou operadoras de seu interesse. A equipe da Xik envia o catálogo com as informações completas por e-mail ou WhatsApp e entra em contato para orientar a escolha. Nenhum valor ou cobertura é divulgado neste site sem passar pela análise de um consultor.',
  },
  {
    question: 'A XIK SEGUROS atende empresas?',
    answer:
      'Sim. A atuação da corretora abrange pessoas jurídicas no campo patrimonial, financeiro e das responsabilidades civis, além de planos de saúde empresariais para colaboradores, e pessoas físicas no campo pessoal, familiar e profissional.',
  },
  {
    question: 'Onde a XIK SEGUROS fica?',
    answer: `O escritório fica na ${company.address.full}. O atendimento também acontece por telefone e WhatsApp.`,
  },
];
