/**
 * Company data. Every field here was recovered from xikseguros.com.br.
 * Nothing may be added to this file that is not published by the Xik itself.
 *
 * Fields typed as `| null` are channels that could NOT be verified on the
 * official site; the UI must degrade gracefully instead of inventing a value.
 */

export type Phone = {
  label: string;
  /** Digits only, international format: used for `tel:` links. */
  tel: string;
  display: string;
};

export const company = {
  name: 'XIK SEGUROS',
  /** Razão social oficial. */
  legalName: 'Xik Adm e corretora de seguros unipessoal Ltda',
  /** CNPJ formatado para exibição. */
  cnpj: '29.257.799/0001-88',
  tagline: 'O seguro perfeito para você!',
  /** Institutional claim printed on the company's own hero banner. */
  claim: 'Assegurando seus sonhos.',
  foundedYear: 2007,
  /** Year the managing partner's experience in the market began. */
  experienceSince: 1998,
  managingPartner: 'Andréa Santos',

  history:
    'Com atuação marcada no mercado desde o ano de sua constituição em 2007, a Xik Administradora e Corretora de Seguros, tendo como sócia administradora Andréa Santos, com experiência profissional no mercado de seguros, previdência e saúde iniciada no ano de 1998, tem se destacado por sua forte vocação em proporcionar a melhor relação custo versus benefícios para seus clientes através do gerenciamento de seus riscos e a correta formatação de apólices e contratos, incluindo serviços assistenciais, que garantam a proteção das pessoas jurídicas, no campo patrimonial, financeiro e das responsabilidades civis, e das pessoas físicas no campo pessoal, familiar e profissional, extensivo a seus familiares.',

  mission:
    'Intermediar legalmente contratos de seguros em geral e saúde junto às melhores seguradoras e operadoras do mercado, com excelência e personalização, agregando valor aos clientes com produtos de consórcios e linhas de financiamentos especiais.',

  vision:
    'Ser reconhecida pela especialização do portfólio de produtos e serviços oferecidos às pessoas físicas e jurídicas, de modo a atender suas necessidades pessoais, familiares e patrimoniais, cumprindo assim a sua função social e econômica na sociedade.',

  values: [
    'Ética e transparência na relação com nossos clientes e fornecedores.',
    'Qualidade e excelência na prestação de serviços.',
    'Capacitação e qualificação permanentes das equipes de trabalho.',
    'Garantia de satisfação e fidelização de nossos clientes externos e internos.',
  ],

  address: {
    street: 'Rua dos Contadores, 214',
    district: 'Alípio de Melo',
    city: 'Belo Horizonte',
    state: 'MG',
    country: 'BR',
    /** Recovered from the site as "Rua dos Contadores, 214, Alípio de Melo, Belo Horizonte, MG". */
    full: 'Rua dos Contadores, 214, Alípio de Melo, Belo Horizonte, MG',
    // TODO(content): confirmar CEP oficial com a Xik antes de publicar no endereço e no schema LocalBusiness.
    postalCode: null as string | null,
  },

  phones: [
    { label: 'Telefone fixo', tel: '+553134620007', display: '(31) 3462-0007' },
    { label: 'Celular', tel: '+5531999978568', display: '(31) 99997-8568' },
    { label: 'Celular', tel: '+5531995035535', display: '(31) 99503-5535' },
  ] satisfies Phone[],

  // TODO(content): o site oficial não publica endereço de e-mail. Confirmar com a
  // Xik qual e-mail deve ser exibido publicamente antes de renderizar este canal.
  email: null as string | null,

  // TODO(content): o site oficial não publica horário de atendimento. Confirmar
  // antes de renderizar (o componente de horário só aparece se preenchido).
  businessHours: null as string | null,

  socialHandle: '@xikseguros',
} as const;

export type SocialLink = {
  name: string;
  href: string;
  handle: string;
};

/** Verified from the links published in the site's own header/footer. */
export const socialLinks: SocialLink[] = [
  { name: 'Instagram', href: 'https://www.instagram.com/xikseguros/', handle: '@xikseguros' },
  { name: 'Facebook', href: 'https://facebook.com/xikseguros', handle: '/xikseguros' },
];
