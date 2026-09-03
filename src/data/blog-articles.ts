export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; id: string; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'callout'; text: string };

export type BlogFaqItem = {
  question: string;
  answer: string;
};

export type BlogArticleBody = {
  lead: string;
  blocks: BlogBlock[];
  faq: BlogFaqItem[];
  ctaTitle: string;
  ctaDescription: string;
  whatsappContext: string;
  relatedPaths: Array<{ label: string; to: string }>;
  sources: Array<{ label: string; href: string }>;
  updatedAt: string;
};

const updatedAt = '2026-08-25';

const ansSources = [
  {
    label: 'ANS: Contratação e troca de plano',
    href: 'https://www.gov.br/ans/pt-br/assuntos/consumidor/contratacao-e-troca-de-plano',
  },
];

const ansPortabilitySources = [
  {
    label: 'ANS: Portabilidade de carências',
    href: 'https://www.gov.br/ans/pt-br/assuntos/consumidor/portabilidade-de-carencias',
  },
  {
    label: 'ANS: Guia ANS de Planos de Saúde',
    href: 'https://www.ans.gov.br/gpw-beneficiario/',
  },
];

const susepConsumerSource = {
  label: 'SUSEP: Informações ao consumidor',
  href: 'https://www.gov.br/susep/pt-br/assuntos/cidadao',
};

const bcbConsortiumSource = {
  label: 'Banco Central: Consórcios',
  href: 'https://www.bcb.gov.br/estabilidadefinanceira/consorcios',
};

export const blogArticles: Record<string, BlogArticleBody> = {
  'plano-de-saude-individual-empresarial-ou-por-adesao-qual-escolher': {
    lead:
      'A escolha depende de quem será incluído, do vínculo disponível e das condições de cada contrato. O plano individual atende a pessoa ou família; o empresarial exige vínculo com uma empresa; e o coletivo por adesão depende de vínculo com uma entidade elegível. Compare regras, rede e custo total antes de decidir.',
    blocks: [
      { type: 'h2', id: 'contexto', text: 'Por que a modalidade importa' },
      {
        type: 'p',
        text: 'A modalidade define quem pode contratar, como o grupo é formado e quais regras contratuais devem ser observadas. Duas propostas parecidas na apresentação podem ter diferenças relevantes na utilização e na evolução do custo.',
      },
      { type: 'h2', id: 'conceitos', text: 'Entenda as três opções' },
      {
        type: 'p',
        text: 'No individual ou familiar, a contratação é feita diretamente pela pessoa. No empresarial, há vínculo com um CNPJ conforme os critérios da proposta. No coletivo por adesão, a entrada decorre de vínculo profissional, classista ou setorial aceito pela entidade e pelo contrato.',
      },
      { type: 'h2', id: 'checklist', text: 'O que comparar' },
      {
        type: 'ul',
        items: [
          'Elegibilidade de todos que precisam de cobertura.',
          'Rede credenciada na região de uso mais frequente.',
          'Abrangência geográfica e tipo de acomodação.',
          'Mensalidade, coparticipação e regras de reajuste aplicáveis.',
          'Carências, cobertura parcial temporária e demais condições contratuais.',
        ],
      },
      { type: 'h2', id: 'quando-faz-sentido', text: 'Quando cada caminho pode fazer sentido' },
      {
        type: 'p',
        text: 'O individual pode ser adequado quando não há vínculo coletivo. O empresarial pode atender sócios, colaboradores e dependentes elegíveis. O plano por adesão pode ser considerado por quem possui o vínculo exigido e entende as características dessa contratação.',
      },
      { type: 'h2', id: 'erros-comuns', text: 'Erros comuns na escolha' },
      {
        type: 'ul',
        items: [
          'Olhar apenas a mensalidade inicial.',
          'Presumir que a rede é igual em todas as categorias.',
          'Não confirmar a documentação de elegibilidade.',
          'Tratar regras de uma modalidade como se valessem para outra.',
        ],
      },
      {
        type: 'callout',
        text: 'As regras podem variar por contrato e pela regulamentação vigente da ANS. Consulte os documentos da proposta e as fontes oficiais antes de contratar.',
      },
      {
        type: 'p',
        text: 'Uma comparação orientada transforma detalhes contratuais em critérios práticos para a sua rotina.',
      },
    ],
    faq: [
      {
        question: 'Plano empresarial é sempre mais barato que o individual?',
        answer:
          'Não. O valor depende da composição do grupo, faixa etária, região, produto e demais critérios da proposta. Compare também coparticipação e regras contratuais.',
      },
      {
        question: 'Qualquer pessoa pode contratar plano por adesão?',
        answer:
          'Não. É necessário comprovar um vínculo elegível previsto na contratação. A entidade e a documentação exigida devem ser verificadas na proposta.',
      },
      {
        question: 'Posso incluir familiares?',
        answer:
          'A inclusão depende das regras de elegibilidade e dos graus de dependência aceitos em cada contrato.',
      },
    ],
    ctaTitle: 'Compare planos com orientação',
    ctaDescription:
      'Conte à Xik quem precisa do plano e como pretende utilizá-lo para analisar as modalidades disponíveis.',
    whatsappContext: 'comparação entre plano individual, empresarial e por adesão',
    relatedPaths: [
      { label: 'Plano de saúde individual', to: '/planos/plano-de-saude-individual' },
      { label: 'Planos de saúde empresarial', to: '/planos/planos-de-saude-empresarial' },
      { label: 'Plano de saúde por adesão', to: '/planos/plano-de-saude-por-adesao' },
      { label: 'Faça sua cotação', to: '/faca-sua-cotacao' },
    ],
    sources: ansSources,
    updatedAt,
  },

  'como-funciona-a-portabilidade-de-carencias': {
    lead:
      'A portabilidade de carências permite, quando os requisitos vigentes são atendidos, mudar de plano sem cumprir novamente determinadas carências já cumpridas. Ela não é automática: é preciso verificar a elegibilidade do beneficiário, a compatibilidade do plano de destino e a documentação no momento do pedido.',
    blocks: [
      { type: 'h2', id: 'contexto', text: 'O objetivo da portabilidade' },
      {
        type: 'p',
        text: 'A portabilidade busca facilitar a troca de plano para beneficiários que atendem às regras da ANS. Ela é diferente de cancelar um contrato e fazer uma nova contratação sem análise prévia.',
      },
      { type: 'h2', id: 'conceitos', text: 'Como o processo acontece' },
      {
        type: 'p',
        text: 'Primeiro, o beneficiário consulta opções compatíveis no Guia ANS. Depois, reúne os comprovantes exigidos e solicita a adesão ao plano de destino. A operadora analisa o pedido conforme as regras e os documentos aplicáveis.',
      },
      { type: 'h2', id: 'checklist', text: 'Checklist antes de solicitar' },
      {
        type: 'ul',
        items: [
          'Confirmar se o plano atual e o beneficiário atendem aos requisitos vigentes.',
          'Consultar planos compatíveis no Guia ANS.',
          'Verificar rede, abrangência e condições do plano de destino.',
          'Separar comprovantes e protocolos.',
          'Evitar cancelar o plano atual antes da conclusão segura do processo.',
        ],
      },
      { type: 'h2', id: 'quando-faz-sentido', text: 'Quando pode fazer sentido' },
      {
        type: 'p',
        text: 'A análise pode ser útil quando a rede, a abrangência, o modelo de cobrança ou a modalidade atual deixaram de atender às necessidades do beneficiário.',
      },
      { type: 'h2', id: 'erros-comuns', text: 'Erros que merecem atenção' },
      {
        type: 'ul',
        items: [
          'Acreditar que qualquer plano pode ser escolhido.',
          'Confundir portabilidade com simples troca comercial.',
          'Enviar documentação incompleta.',
          'Cancelar o contrato de origem cedo demais.',
        ],
      },
      {
        type: 'callout',
        text: 'Prazos, requisitos e situações especiais são definidos pela ANS e podem mudar. Consulte o Guia ANS e as regras oficiais vigentes para o seu caso.',
      },
      {
        type: 'p',
        text: 'Planejar a troca com antecedência reduz o risco de decisões precipitadas e ajuda a preservar a continuidade do cuidado.',
      },
    ],
    faq: [
      {
        question: 'A portabilidade elimina todas as carências?',
        answer:
          'Ela permite aproveitar carências já cumpridas conforme as regras aplicáveis. Eventuais condições não equivalentes ou situações específicas devem ser verificadas no resultado da consulta e na proposta.',
      },
      {
        question: 'Posso cancelar o plano atual antes da aprovação?',
        answer:
          'O cancelamento antecipado pode deixar o beneficiário sem cobertura. Confirme a conclusão do processo e siga a orientação oficial para formalizar a troca.',
      },
      {
        question: 'Como saber quais planos são compatíveis?',
        answer:
          'A consulta deve ser feita no Guia ANS de Planos de Saúde, com os dados do plano de origem e do beneficiário.',
      },
    ],
    ctaTitle: 'Avalie sua troca de plano',
    ctaDescription:
      'A Xik ajuda a organizar os critérios da nova escolha, sem substituir a consulta oficial de elegibilidade da ANS.',
    whatsappContext: 'avaliação de portabilidade de carências',
    relatedPaths: [
      { label: 'Plano de saúde individual', to: '/planos/plano-de-saude-individual' },
      { label: 'Plano de saúde por adesão', to: '/planos/plano-de-saude-por-adesao' },
      { label: 'Fale conosco', to: '/fale-conosco' },
    ],
    sources: ansPortabilitySources,
    updatedAt,
  },

  'o-que-analisar-antes-de-contratar-um-plano-de-saude': {
    lead:
      'Antes de contratar, analise se o plano atende onde e como você usa serviços de saúde. Rede credenciada, abrangência, acomodação, coparticipação, carências e regras de reajuste merecem ser comparadas junto com a mensalidade.',
    blocks: [
      { type: 'h2', id: 'contexto', text: 'Preço não é o único critério' },
      {
        type: 'p',
        text: 'Uma proposta econômica pode não servir à rotina se não incluir atendimento na região necessária ou se o modelo de utilização não combinar com o perfil da família.',
      },
      { type: 'h2', id: 'conceitos', text: 'Leia a proposta como um conjunto' },
      {
        type: 'p',
        text: 'Segmentação assistencial, abrangência, rede, acomodação e forma de custeio funcionam em conjunto. Também é importante entender a modalidade de contratação e quem pode permanecer no contrato.',
      },
      { type: 'h2', id: 'checklist', text: 'Checklist de comparação' },
      {
        type: 'ul',
        items: [
          'Hospitais, laboratórios e profissionais relevantes para você.',
          'Atendimento municipal, regional ou nacional, conforme a proposta.',
          'Quarto individual ou coletivo, quando aplicável.',
          'Cobranças de coparticipação e franquia descritas no contrato.',
          'Carências e condições para doenças ou lesões preexistentes.',
          'Canais de atendimento e regras de cancelamento.',
        ],
      },
      { type: 'h2', id: 'quando-faz-sentido', text: 'Quando vale pedir ajuda' },
      {
        type: 'p',
        text: 'A orientação consultiva é especialmente útil quando há dependentes com rotinas diferentes, uso em mais de uma cidade ou dúvidas entre modalidades e níveis de rede.',
      },
      { type: 'h2', id: 'erros-comuns', text: 'Erros comuns' },
      {
        type: 'ul',
        items: [
          'Escolher pela marca sem conferir o produto específico.',
          'Considerar a rede de outro plano como referência.',
          'Ignorar custos de uso além da mensalidade.',
          'Não guardar a proposta e os documentos da contratação.',
        ],
      },
      {
        type: 'callout',
        text: 'A cobertura e a rede válidas são as descritas no contrato e nos canais oficiais do produto. Confirme as informações antes da adesão.',
      },
      {
        type: 'p',
        text: 'Uma boa contratação começa com prioridades claras e termina com a leitura consciente dos documentos.',
      },
    ],
    faq: [
      {
        question: 'Como conferir a rede credenciada?',
        answer:
          'Consulte a rede do produto exato nos canais oficiais e confirme os prestadores prioritários. Redes podem variar entre categorias e ser atualizadas.',
      },
      {
        question: 'Plano com coparticipação vale a pena?',
        answer:
          'Depende da frequência de uso, das cobranças previstas e do orçamento. Compare cenários em vez de considerar somente a mensalidade.',
      },
      {
        question: 'O que são carências?',
        answer:
          'São períodos previstos para acesso a determinadas coberturas, conforme contrato e regulamentação. Verifique as condições oficiais da proposta.',
      },
    ],
    ctaTitle: 'Escolha seu plano com clareza',
    ctaDescription:
      'Compartilhe suas prioridades com a Xik e compare propostas de forma consultiva.',
    whatsappContext: 'análise antes de contratar um plano de saúde',
    relatedPaths: [
      { label: 'Plano de saúde individual', to: '/planos/plano-de-saude-individual' },
      { label: 'Planos de saúde empresarial', to: '/planos/planos-de-saude-empresarial' },
      { label: 'Plano de saúde por adesão', to: '/planos/plano-de-saude-por-adesao' },
      { label: 'Faça sua cotação', to: '/faca-sua-cotacao' },
    ],
    sources: ansSources,
    updatedAt,
  },

  'plano-de-saude-empresarial-para-pequenas-empresas-vale-a-pena': {
    lead:
      'Pode valer a pena quando a empresa deseja oferecer proteção ao time e encontra uma proposta compatível com seu orçamento e perfil. A decisão exige conferir elegibilidade, composição do grupo, rede, coparticipação, regras de movimentação cadastral e custos ao longo do tempo.',
    blocks: [
      { type: 'h2', id: 'contexto', text: 'O benefício na realidade da pequena empresa' },
      {
        type: 'p',
        text: 'O plano pode apoiar a política de benefícios e a atração de pessoas, mas cria compromissos administrativos e financeiros que precisam caber no planejamento do negócio.',
      },
      { type: 'h2', id: 'conceitos', text: 'Como funciona a contratação empresarial' },
      {
        type: 'p',
        text: 'A empresa contrata para um grupo elegível, conforme os vínculos e documentos aceitos. Sócios, colaboradores e dependentes podem ter regras distintas de inclusão e permanência.',
      },
      { type: 'h2', id: 'checklist', text: 'O que avaliar na proposta' },
      {
        type: 'ul',
        items: [
          'Quem será elegível e como comprovar o vínculo.',
          'Distribuição do custo entre empresa e beneficiários.',
          'Rede e abrangência adequadas às cidades do time.',
          'Coparticipação e impacto previsível no orçamento.',
          'Regras para inclusão, exclusão e continuidade de dependentes.',
        ],
      },
      { type: 'h2', id: 'quando-faz-sentido', text: 'Quando pode fazer sentido' },
      {
        type: 'p',
        text: 'A solução tende a ser mais coerente quando há demanda real do time, capacidade de manter o benefício e uma pessoa responsável pela gestão cadastral.',
      },
      { type: 'h2', id: 'erros-comuns', text: 'Cuidados para não decidir no impulso' },
      {
        type: 'ul',
        items: [
          'Prometer o benefício antes de validar a elegibilidade.',
          'Ignorar movimentações de entrada e saída.',
          'Comparar somente mensalidades iniciais.',
          'Não formalizar a política interna de custeio.',
        ],
      },
      {
        type: 'callout',
        text: 'Condições de aceitação, formação do grupo e regras contratuais variam. Consulte a proposta e a regulamentação vigente da ANS.',
      },
      {
        type: 'p',
        text: 'A resposta sobre valer a pena nasce do equilíbrio entre cuidado com as pessoas e sustentabilidade para a empresa.',
      },
    ],
    faq: [
      {
        question: 'Empresa pequena pode contratar plano empresarial?',
        answer:
          'Pode haver opções para pequenos grupos, mas os critérios mínimos, vínculos aceitos e documentos variam por proposta.',
      },
      {
        question: 'A empresa precisa pagar todo o plano?',
        answer:
          'A política de custeio depende da decisão da empresa e das condições contratuais e trabalhistas aplicáveis. Vale formalizar como o benefício será dividido.',
      },
      {
        question: 'Dependentes podem ser incluídos?',
        answer:
          'A inclusão depende dos graus de parentesco e das regras de elegibilidade previstas no contrato.',
      },
    ],
    ctaTitle: 'Planeje o benefício da sua empresa',
    ctaDescription:
      'A Xik ajuda a comparar propostas empresariais de acordo com o perfil do seu time.',
    whatsappContext: 'plano de saúde para uma pequena empresa',
    relatedPaths: [
      { label: 'Planos de saúde empresarial', to: '/planos/planos-de-saude-empresarial' },
      { label: 'Seguro empresarial', to: '/seguros/seguro-empresarial' },
      { label: 'Faça sua cotação', to: '/faca-sua-cotacao' },
    ],
    sources: ansSources,
    updatedAt,
  },

  'seguro-de-vida-o-que-e-e-para-quem-e-indicado': {
    lead:
      'Seguro de vida é uma ferramenta de proteção financeira baseada nos eventos e condições definidos na apólice. Pode fazer sentido para quem tem dependentes, compromissos financeiros ou deseja organizar proteção para si e para outras pessoas, sempre conforme as coberturas efetivamente contratadas.',
    blocks: [
      { type: 'h2', id: 'contexto', text: 'Proteção para diferentes fases da vida' },
      {
        type: 'p',
        text: 'A necessidade não se limita a uma idade ou profissão. Ela depende do impacto financeiro que um imprevisto teria sobre a própria pessoa, sua família ou seu negócio.',
      },
      { type: 'h2', id: 'conceitos', text: 'Capital segurado, cobertura e beneficiários' },
      {
        type: 'p',
        text: 'O capital segurado é o limite contratado para determinado evento. Coberturas definem quais situações são amparadas, e beneficiários são as pessoas indicadas conforme as regras da apólice.',
      },
      { type: 'h2', id: 'checklist', text: 'O que analisar' },
      {
        type: 'ul',
        items: [
          'Quem depende da sua renda e por quanto tempo.',
          'Compromissos financeiros relevantes.',
          'Eventos cobertos, exclusões e carências, se houver.',
          'Capital adequado ao objetivo de proteção.',
          'Forma de atualização e manutenção das informações.',
        ],
      },
      { type: 'h2', id: 'quando-faz-sentido', text: 'Para quem pode ser indicado' },
      {
        type: 'p',
        text: 'Pode ser considerado por responsáveis por renda familiar, profissionais autônomos, sócios de empresas e pessoas que desejam complementar seu planejamento de proteção.',
      },
      { type: 'h2', id: 'erros-comuns', text: 'Erros comuns' },
      {
        type: 'ul',
        items: [
          'Escolher um capital sem relacioná-lo ao objetivo.',
          'Presumir coberturas que não constam na apólice.',
          'Deixar beneficiários desatualizados.',
          'Omitir informações solicitadas na contratação.',
        ],
      },
      {
        type: 'callout',
        text: 'Coberturas, exclusões, aceitação e valores dependem do perfil e da apólice. Leia as condições contratuais antes de contratar.',
      },
      {
        type: 'p',
        text: 'O seguro mais coerente é aquele dimensionado para uma necessidade concreta e compreendido por quem contrata.',
      },
    ],
    faq: [
      {
        question: 'Seguro de vida é só para quem tem filhos?',
        answer:
          'Não. Dependentes, dívidas, renda profissional e objetivos pessoais também podem justificar a análise.',
      },
      {
        question: 'Toda apólice cobre qualquer tipo de falecimento?',
        answer:
          'Não. Os eventos cobertos e as exclusões estão definidos nas condições contratuais e precisam ser conferidos.',
      },
      {
        question: 'É possível alterar os beneficiários?',
        answer:
          'Em geral, a indicação pode ser atualizada conforme regras do produto e da legislação aplicável. Consulte a seguradora ou a corretora.',
      },
    ],
    ctaTitle: 'Converse sobre sua proteção',
    ctaDescription:
      'A Xik ajuda a transformar responsabilidades e objetivos em critérios para comparar seguros de vida.',
    whatsappContext: 'seguro de vida e proteção financeira',
    relatedPaths: [
      { label: 'Seguro de vida', to: '/seguros/seguro-de-vida' },
      { label: 'Previdência privada', to: '/seguros/seguro-previdencia-privada' },
      { label: 'Faça sua cotação', to: '/faca-sua-cotacao' },
    ],
    sources: [susepConsumerSource],
    updatedAt,
  },

  'seguro-residencial-o-que-cobre-e-quanto-custa': {
    lead:
      'O seguro residencial cobre somente os eventos e bens definidos na apólice, dentro dos limites contratados. O custo não é tabelado: depende do imóvel, localização, uso, coberturas, limites, franquias e análise da proposta, por isso precisa ser cotado para cada perfil.',
    blocks: [
      { type: 'h2', id: 'contexto', text: 'O papel do seguro residencial' },
      {
        type: 'p',
        text: 'A finalidade é reduzir o impacto financeiro de eventos previstos no contrato. A proteção pode ser ajustada para casa ou apartamento, próprio ou alugado, conforme aceitação.',
      },
      { type: 'h2', id: 'conceitos', text: 'Cobertura, limite e franquia' },
      {
        type: 'p',
        text: 'Cobertura é o evento amparado; limite é o valor máximo previsto para aquela garantia; e franquia ou participação é a parcela que pode ficar a cargo do segurado. Esses elementos variam entre propostas.',
      },
      { type: 'h2', id: 'checklist', text: 'O que comparar na cotação' },
      {
        type: 'ul',
        items: [
          'Características, uso e endereço do imóvel.',
          'Bens que precisam ser considerados e seus valores.',
          'Eventos cobertos e exclusões.',
          'Limites, franquias e serviços previstos.',
          'Procedimentos para comunicar um sinistro.',
        ],
      },
      { type: 'h2', id: 'quando-faz-sentido', text: 'Quando pode fazer sentido' },
      {
        type: 'p',
        text: 'Pode ser relevante para proprietários e inquilinos que desejam proteger imóvel, conteúdo ou responsabilidades específicas, de acordo com o contrato.',
      },
      { type: 'h2', id: 'erros-comuns', text: 'Erros comuns' },
      {
        type: 'ul',
        items: [
          'Confundir seguro do condomínio com proteção da unidade.',
          'Presumir que qualquer bem está incluído.',
          'Escolher limites sem estimar o patrimônio.',
          'Comparar preços sem comparar franquias e coberturas.',
        ],
      },
      {
        type: 'callout',
        text: 'Não existe preço universal. O valor depende do perfil do risco e das escolhas da cotação; nenhuma cobertura deve ser presumida sem confirmação na apólice.',
      },
      {
        type: 'p',
        text: 'Uma cotação bem preenchida ajuda a aproximar a proteção contratada da realidade da residência.',
      },
    ],
    faq: [
      {
        question: 'Quanto custa um seguro residencial?',
        answer:
          'É necessário cotar. Imóvel, localização, uso, coberturas, limites e franquias influenciam o valor.',
      },
      {
        question: 'Seguro residencial cobre tudo dentro da casa?',
        answer:
          'Não. Bens, eventos, limites e exclusões são definidos na apólice. Itens especiais podem exigir declaração ou condições próprias.',
      },
      {
        question: 'Inquilino pode contratar?',
        answer:
          'Pode haver proteção adequada ao interesse do inquilino, conforme produto e aceitação. É importante separar responsabilidades do proprietário e do ocupante.',
      },
    ],
    ctaTitle: 'Proteja sua residência com critério',
    ctaDescription:
      'Conte à Xik como é o imóvel para comparar coberturas e limites de forma personalizada.',
    whatsappContext: 'cotação de seguro residencial',
    relatedPaths: [
      { label: 'Seguro residencial', to: '/seguros/seguro-residencial' },
      { label: 'Faça sua cotação', to: '/faca-sua-cotacao' },
      { label: 'Fale conosco', to: '/fale-conosco' },
    ],
    sources: [susepConsumerSource],
    updatedAt,
  },

  'seguro-residencial-para-apartamento-principais-coberturas': {
    lead:
      'No apartamento, a proteção deve considerar a unidade, seu conteúdo e as responsabilidades do morador, sem confundir isso com o seguro do condomínio. As principais coberturas a avaliar dependem dos riscos do imóvel e só existem quando estiverem expressamente contratadas na apólice.',
    blocks: [
      { type: 'h2', id: 'contexto', text: 'Unidade e condomínio têm proteções diferentes' },
      {
        type: 'p',
        text: 'O seguro condominial se relaciona às áreas e interesses definidos na apólice do condomínio. Danos internos, conteúdo e certas responsabilidades da unidade podem exigir contratação própria.',
      },
      { type: 'h2', id: 'conceitos', text: 'O que pode entrar na análise' },
      {
        type: 'p',
        text: 'A comparação pode considerar eventos que afetem a estrutura interna, bens, danos a terceiros e assistências. A disponibilidade e o alcance de cada item variam por produto.',
      },
      { type: 'h2', id: 'checklist', text: 'Checklist para o apartamento' },
      {
        type: 'ul',
        items: [
          'Responsabilidades previstas na convenção e no contrato de locação.',
          'Valor aproximado do conteúdo da unidade.',
          'Reformas, acabamentos e benfeitorias relevantes.',
          'Eventos cobertos, limites e franquias.',
          'Exclusões para bens ou situações específicas.',
        ],
      },
      { type: 'h2', id: 'quando-faz-sentido', text: 'Quando a proteção individual faz sentido' },
      {
        type: 'p',
        text: 'Ela pode ser útil quando o morador deseja proteger interesses que não estão contemplados pelo seguro condominial ou que possuem limites insuficientes para sua realidade.',
      },
      { type: 'h2', id: 'erros-comuns', text: 'Erros comuns' },
      {
        type: 'ul',
        items: [
          'Assumir que o seguro do condomínio cobre o conteúdo.',
          'Não diferenciar estrutura original de benfeitorias.',
          'Ignorar franquias e limites por cobertura.',
          'Deixar de informar o uso residencial ou eventual locação.',
        ],
      },
      {
        type: 'callout',
        text: 'Coberturas citadas em uma cotação não são universais. Confirme contratação, limites, franquias e exclusões nas condições da apólice.',
      },
      {
        type: 'p',
        text: 'A leitura conjunta da apólice do condomínio e da proposta da unidade evita lacunas e sobreposições desnecessárias.',
      },
    ],
    faq: [
      {
        question: 'O seguro do condomínio cobre meu apartamento?',
        answer:
          'Ele cobre os interesses definidos na apólice condominial. Conteúdo, acabamentos e responsabilidades da unidade podem não estar contemplados.',
      },
      {
        question: 'Apartamento alugado pode ter seguro residencial?',
        answer:
          'Sim, conforme o interesse de proprietário ou inquilino e a aceitação do produto. Cada parte deve avaliar o que precisa proteger.',
      },
      {
        question: 'Danos ao vizinho estão sempre cobertos?',
        answer:
          'Não. Uma cobertura de responsabilidade adequada precisa estar contratada, e o evento deve atender às condições e limites da apólice.',
      },
    ],
    ctaTitle: 'Revise a proteção do seu apartamento',
    ctaDescription:
      'A Xik ajuda a identificar o que pertence ao condomínio e o que precisa ser avaliado para a unidade.',
    whatsappContext: 'seguro residencial para apartamento',
    relatedPaths: [
      { label: 'Seguro residencial', to: '/seguros/seguro-residencial' },
      { label: 'Faça sua cotação', to: '/faca-sua-cotacao' },
    ],
    sources: [susepConsumerSource],
    updatedAt,
  },

  'seguro-viagem-o-que-analisar-antes-de-contratar': {
    lead:
      'Antes de contratar um seguro viagem, considere destino, duração, atividades, idade dos viajantes e eventuais condições de saúde, além das exigências do roteiro. Compare coberturas, limites, exclusões e forma de acionamento; não escolha apenas pelo preço.',
    blocks: [
      { type: 'h2', id: 'contexto', text: 'Cada viagem tem riscos diferentes' },
      {
        type: 'p',
        text: 'Uma viagem curta de lazer e uma estadia longa com prática esportiva exigem análises distintas. O produto precisa conversar com o itinerário real.',
      },
      { type: 'h2', id: 'conceitos', text: 'Seguro e assistência na prática' },
      {
        type: 'p',
        text: 'A apólice define eventos cobertos, limites e procedimentos. Alguns atendimentos podem ocorrer por rede indicada ou reembolso, conforme as condições contratadas.',
      },
      { type: 'h2', id: 'checklist', text: 'Checklist antes do embarque' },
      {
        type: 'ul',
        items: [
          'Países visitados, escalas e duração total.',
          'Perfil e idade de cada viajante.',
          'Atividades esportivas ou de risco previstas.',
          'Coberturas, limites, franquias e exclusões.',
          'Canais de atendimento e documentos para acionamento.',
          'Exigências oficiais do destino.',
        ],
      },
      { type: 'h2', id: 'quando-faz-sentido', text: 'Quando merece atenção adicional' },
      {
        type: 'p',
        text: 'Viagens internacionais, roteiros com múltiplos destinos, gestação, condições preexistentes ou atividades específicas pedem leitura ainda mais cuidadosa das condições.',
      },
      { type: 'h2', id: 'erros-comuns', text: 'Erros comuns' },
      {
        type: 'ul',
        items: [
          'Contratar datas menores que o período total.',
          'Presumir cobertura para qualquer atividade.',
          'Não guardar apólice e telefones de atendimento.',
          'Solicitar atendimento sem seguir o procedimento indicado, quando possível.',
        ],
      },
      {
        type: 'callout',
        text: 'Requisitos de entrada e saúde pública são definidos pelas autoridades de cada destino e podem mudar. Consulte fontes oficiais, além das condições do seguro.',
      },
      {
        type: 'p',
        text: 'Contratar com antecedência oferece tempo para esclarecer dúvidas e viajar sabendo como pedir ajuda.',
      },
    ],
    faq: [
      {
        question: 'Seguro viagem é obrigatório?',
        answer:
          'Depende das regras vigentes do destino e do tipo de viagem. Consulte autoridades oficiais e requisitos de entrada antes do embarque.',
      },
      {
        question: 'Doenças preexistentes são sempre cobertas?',
        answer:
          'Não se deve presumir. O tratamento dado a condições preexistentes varia conforme a apólice, seus limites e exclusões.',
      },
      {
        question: 'Posso contratar depois de iniciar a viagem?',
        answer:
          'A possibilidade e as condições variam. O mais seguro é contratar antes da saída e confirmar o período exato de vigência.',
      },
    ],
    ctaTitle: 'Viaje com uma escolha bem orientada',
    ctaDescription:
      'Compartilhe seu roteiro com a Xik para comparar opções compatíveis com a viagem.',
    whatsappContext: 'seguro viagem para o meu roteiro',
    relatedPaths: [
      { label: 'Seguro viagem', to: '/seguros/seguro-viagem' },
      { label: 'Faça sua cotação', to: '/faca-sua-cotacao' },
      { label: 'Fale conosco', to: '/fale-conosco' },
    ],
    sources: [susepConsumerSource],
    updatedAt,
  },

  'consorcio-ou-financiamento-qual-e-melhor': {
    lead:
      'Não existe uma opção melhor para todos. O financiamento costuma atender quem precisa adquirir o bem após aprovação de crédito e aceita o custo da operação; o consórcio pode servir a quem planeja a compra e pode esperar a contemplação, que não tem data garantida.',
    blocks: [
      { type: 'h2', id: 'contexto', text: 'A urgência muda a decisão' },
      {
        type: 'p',
        text: 'Prazo para comprar, recursos disponíveis e tolerância à espera são os primeiros filtros. Depois, compare o custo total e as obrigações de cada modalidade.',
      },
      { type: 'h2', id: 'conceitos', text: 'Duas lógicas diferentes' },
      {
        type: 'p',
        text: 'No financiamento, uma instituição avalia crédito e, se aprovada a operação, viabiliza a aquisição com pagamento parcelado. No consórcio, o participante integra um grupo e o uso da carta depende de contemplação e das etapas previstas no contrato.',
      },
      { type: 'h2', id: 'comparacao', text: 'Compare antes de decidir' },
      {
        type: 'ul',
        items: [
          'Urgência para adquirir o bem.',
          'Entrada disponível e impacto das parcelas.',
          'Custo total, tarifas, seguros e demais encargos informados.',
          'Prazo e capacidade de manter o compromisso.',
          'Risco de esperar pela contemplação no consórcio.',
          'Critérios de aprovação e garantias no financiamento.',
        ],
      },
      { type: 'h2', id: 'quando-faz-sentido', text: 'Quando cada opção pode fazer sentido' },
      {
        type: 'p',
        text: 'O financiamento pode ser considerado quando o uso do bem é imediato e a operação cabe no orçamento. O consórcio pode combinar com compra planejada, desde que a espera e as regras do grupo sejam compreendidas.',
      },
      { type: 'h2', id: 'erros-comuns', text: 'Erros comuns' },
      {
        type: 'ul',
        items: [
          'Comparar apenas o valor da parcela.',
          'Tratar contemplação como imediata.',
          'Ignorar o custo total do financiamento.',
          'Assumir aprovação de crédito antes da análise.',
        ],
      },
      {
        type: 'callout',
        text: 'Consórcio não garante contemplação imediata, e financiamento depende de análise e aprovação de crédito. Leia os contratos e compare o custo total.',
      },
      {
        type: 'p',
        text: 'A melhor escolha é a que respeita o prazo do objetivo sem comprometer a saúde financeira.',
      },
    ],
    faq: [
      {
        question: 'Consórcio tem juros?',
        answer:
          'Consórcio e financiamento têm estruturas de custo diferentes. No consórcio, verifique taxa de administração e demais cobranças previstas; compare sempre o total contratado.',
      },
      {
        question: 'Financiamento libera o bem imediatamente?',
        answer:
          'A aquisição depende da aprovação de crédito, documentação, garantias e conclusão das etapas da instituição. Não há garantia prévia.',
      },
      {
        question: 'É possível prever quando serei contemplado?',
        answer:
          'Não há data garantida. A contemplação ocorre conforme as regras de sorteio e lance do grupo.',
      },
    ],
    ctaTitle: 'Compare caminhos para seu objetivo',
    ctaDescription:
      'Converse com a Xik sobre prazo, orçamento e prioridade antes de escolher consórcio ou financiamento.',
    whatsappContext: 'comparação entre consórcio e financiamento',
    relatedPaths: [
      { label: 'Consórcios', to: '/seguros/consorcios' },
      { label: 'Financiamento de veículos', to: '/seguros/financiamento-veiculos' },
      { label: 'Fale conosco', to: '/fale-conosco' },
    ],
    sources: [bcbConsortiumSource],
    updatedAt,
  },

  'como-funciona-a-contemplacao-no-consorcio': {
    lead:
      'A contemplação é o momento em que o consorciado passa a poder solicitar o uso da carta de crédito, após cumprir as condições do contrato. Ela ocorre por sorteio ou lance conforme as regras do grupo, sem promessa de data, e ainda pode envolver análise documental, de crédito e de garantias.',
    blocks: [
      { type: 'h2', id: 'contexto', text: 'Contemplação não é entrega automática' },
      {
        type: 'p',
        text: 'Ser contemplado abre a etapa de utilização do crédito. A compra do bem depende da validação prevista no contrato e da apresentação dos documentos necessários.',
      },
      { type: 'h2', id: 'conceitos', text: 'Sorteio e lance' },
      {
        type: 'p',
        text: 'O sorteio segue os critérios das assembleias do grupo. O lance é uma oferta para antecipar parcelas ou parte do saldo, conforme modalidades e critérios definidos pela administradora.',
      },
      { type: 'h2', id: 'checklist', text: 'O que acompanhar' },
      {
        type: 'ul',
        items: [
          'Calendário e regras das assembleias.',
          'Situação das parcelas e obrigações do contrato.',
          'Modalidades de lance e forma de apuração.',
          'Documentos exigidos após a contemplação.',
          'Regras para escolha, avaliação e pagamento do bem.',
        ],
      },
      { type: 'h2', id: 'quando-faz-sentido', text: 'Quando o consórcio pode fazer sentido' },
      {
        type: 'p',
        text: 'Pode ser avaliado por quem planeja a compra, aceita não saber a data de acesso ao crédito e consegue manter as parcelas durante o prazo do grupo.',
      },
      { type: 'h2', id: 'erros-comuns', text: 'Erros comuns' },
      {
        type: 'ul',
        items: [
          'Acreditar em promessa de contemplação certa.',
          'Ofertar lance sem preservar o orçamento.',
          'Confundir contemplação com aprovação automática do bem.',
          'Não ler as regras de utilização da carta.',
        ],
      },
      {
        type: 'callout',
        text: 'Não existe garantia de contemplação imediata. Sorteios, lances e liberação do crédito seguem o contrato e a regulamentação aplicável.',
      },
      {
        type: 'p',
        text: 'Entender todas as etapas permite participar do grupo com expectativas realistas.',
      },
    ],
    faq: [
      {
        question: 'Dar um lance garante contemplação?',
        answer:
          'Não. O resultado depende das regras e dos lances concorrentes na assembleia, além da disponibilidade do grupo.',
      },
      {
        question: 'Depois de contemplado recebo dinheiro em conta?',
        answer:
          'A carta é utilizada conforme a finalidade e os procedimentos contratuais, normalmente com pagamento ao fornecedor após validações.',
      },
      {
        question: 'Continuo pagando depois da contemplação?',
        answer:
          'Sim, permanecem as obrigações previstas no contrato até a quitação do plano, salvo condições específicas formalizadas.',
      },
    ],
    ctaTitle: 'Entenda o consórcio antes de aderir',
    ctaDescription:
      'A Xik ajuda você a ler as regras do grupo e alinhar expectativas sobre a contemplação.',
    whatsappContext: 'funcionamento da contemplação no consórcio',
    relatedPaths: [
      { label: 'Consórcios', to: '/seguros/consorcios' },
      { label: 'Faça sua cotação', to: '/faca-sua-cotacao' },
    ],
    sources: [bcbConsortiumSource],
    updatedAt,
  },

  'o-que-avaliar-antes-de-escolher-uma-carta-de-credito': {
    lead:
      'Antes de escolher uma carta de crédito, relacione o valor ao bem que pretende adquirir e confira se a parcela cabe no orçamento durante todo o grupo. Prazo, critérios de atualização, taxas, regras de contemplação e uso da carta são tão importantes quanto o valor nominal.',
    blocks: [
      { type: 'h2', id: 'contexto', text: 'A carta deve servir ao objetivo real' },
      {
        type: 'p',
        text: 'Escolher um valor sem pesquisar o mercado do bem pode gerar falta de recursos ou um compromisso maior que o necessário.',
      },
      { type: 'h2', id: 'conceitos', text: 'Valor, prazo e atualização' },
      {
        type: 'p',
        text: 'O contrato informa como carta e parcelas podem ser atualizadas, quais custos compõem o plano e quais bens podem ser adquiridos. Essas regras influenciam o planejamento até o fim do grupo.',
      },
      { type: 'h2', id: 'checklist', text: 'Checklist da carta de crédito' },
      {
        type: 'ul',
        items: [
          'Preço atual e possível variação do bem desejado.',
          'Parcela compatível com a renda e reserva financeira.',
          'Prazo total e custo consolidado do plano.',
          'Critério de atualização da carta e das parcelas.',
          'Regras de lance, contemplação e utilização.',
          'Requisitos para o bem e para a liberação do crédito.',
        ],
      },
      { type: 'h2', id: 'quando-faz-sentido', text: 'Quando pode fazer sentido' },
      {
        type: 'p',
        text: 'Uma carta pode ser considerada quando o objetivo é planejado, há flexibilidade de prazo e o participante compreende que a contemplação não é imediata.',
      },
      { type: 'h2', id: 'erros-comuns', text: 'Erros comuns' },
      {
        type: 'ul',
        items: [
          'Escolher a maior carta que a parcela atual permite.',
          'Ignorar atualizações futuras previstas.',
          'Não conferir se o bem pretendido é elegível.',
          'Contar com lance ou contemplação como certeza.',
        ],
      },
      {
        type: 'callout',
        text: 'Parcelas e carta podem seguir critérios de atualização previstos no contrato. Simule a capacidade de pagamento ao longo do prazo, sem depender de contemplação rápida.',
      },
      {
        type: 'p',
        text: 'A carta adequada equilibra o objetivo de compra com a continuidade do compromisso financeiro.',
      },
    ],
    faq: [
      {
        question: 'A carta precisa ter o valor exato do bem?',
        answer:
          'Ela deve ser dimensionada para o objetivo e para as regras de uso do contrato. Diferenças de valor exigem planejamento e tratamento conforme o regulamento.',
      },
      {
        question: 'A parcela do consórcio nunca muda?',
        answer:
          'Não se deve presumir valor fixo. O contrato informa critérios de atualização da carta, parcelas e demais componentes.',
      },
      {
        question: 'Posso usar a carta para qualquer compra?',
        answer:
          'Não. A categoria do grupo e o regulamento definem os bens ou serviços elegíveis e os procedimentos de aquisição.',
      },
    ],
    ctaTitle: 'Dimensione sua carta com cuidado',
    ctaDescription:
      'Converse com a Xik sobre o bem, o prazo e a parcela confortável para o seu planejamento.',
    whatsappContext: 'escolha de uma carta de crédito',
    relatedPaths: [
      { label: 'Consórcios', to: '/seguros/consorcios' },
      { label: 'Fale conosco', to: '/fale-conosco' },
    ],
    sources: [bcbConsortiumSource],
    updatedAt,
  },

  'financiamento-de-veiculos-documentos-e-etapas': {
    lead:
      'O financiamento de veículos normalmente passa por simulação, envio de dados, análise de crédito, avaliação do veículo, assinatura e registro das garantias. Os documentos e critérios variam por instituição e operação, e a aprovação nunca é garantida antes da análise completa.',
    blocks: [
      { type: 'h2', id: 'contexto', text: 'Prepare-se antes de escolher o veículo' },
      {
        type: 'p',
        text: 'Conhecer o orçamento, a entrada possível e o custo total ajuda a filtrar propostas antes de assumir um compromisso de longo prazo.',
      },
      { type: 'h2', id: 'conceitos', text: 'Como o fluxo costuma ocorrer' },
      {
        type: 'p',
        text: 'Após a simulação, a instituição verifica dados do comprador e do bem. Se a operação for aprovada, apresenta as condições finais para aceite, formalização e liberação conforme seus procedimentos.',
      },
      { type: 'h2', id: 'checklist', text: 'Documentos e informações que podem ser solicitados' },
      {
        type: 'ul',
        items: [
          'Identificação e dados cadastrais.',
          'Comprovantes de renda e residência.',
          'Informações bancárias e profissionais.',
          'Documentação e dados do veículo.',
          'Comprovantes adicionais conforme o perfil da operação.',
          'Autorizações e assinaturas para formalização.',
        ],
      },
      { type: 'h2', id: 'quando-faz-sentido', text: 'Quando pode fazer sentido' },
      {
        type: 'p',
        text: 'Pode ser avaliado quando o veículo é necessário no curto prazo, a entrada e as parcelas cabem no orçamento e o custo total foi comparado com outras alternativas.',
      },
      { type: 'h2', id: 'erros-comuns', text: 'Erros comuns' },
      {
        type: 'ul',
        items: [
          'Olhar somente a parcela.',
          'Não conferir o custo efetivo total informado.',
          'Entregar documentos inconsistentes ou desatualizados.',
          'Assumir que uma simulação representa aprovação.',
        ],
      },
      {
        type: 'callout',
        text: 'Simulação não é aprovação. Taxas, entrada, prazo, garantias e documentos dependem da análise da instituição e das condições finais da operação.',
      },
      {
        type: 'p',
        text: 'Revisar o contrato e preservar margem no orçamento são passos essenciais antes da assinatura.',
      },
    ],
    faq: [
      {
        question: 'Quais documentos são obrigatórios?',
        answer:
          'A lista varia por instituição, perfil e veículo. Identificação, renda, residência e dados do bem são comuns, mas confirme a relação oficial da proposta.',
      },
      {
        question: 'Fazer uma simulação garante aprovação?',
        answer:
          'Não. A aprovação depende da análise de crédito, documentação, veículo, garantias e políticas da instituição.',
      },
      {
        question: 'O que comparar além da taxa?',
        answer:
          'Compare custo efetivo total, entrada, prazo, valor final, seguros ou serviços agregados, condições de atraso e liquidação antecipada.',
      },
    ],
    ctaTitle: 'Planeje seu financiamento',
    ctaDescription:
      'A Xik ajuda a organizar documentos e comparar as condições apresentadas para o seu objetivo.',
    whatsappContext: 'etapas de financiamento de veículo',
    relatedPaths: [
      { label: 'Financiamento de veículos', to: '/seguros/financiamento-veiculos' },
      { label: 'Consórcios', to: '/seguros/consorcios' },
      { label: 'Fale conosco', to: '/fale-conosco' },
    ],
    sources: [
      {
        label: 'Banco Central: Cidadania financeira',
        href: 'https://www.bcb.gov.br/cidadaniafinanceira',
      },
    ],
    updatedAt,
  },

  'previdencia-privada-pgbl-ou-vgbl': {
    lead:
      'PGBL e VGBL são estruturas de previdência complementar com tratamentos tributários diferentes. A escolha depende da declaração de imposto de renda, da forma de contribuição, do horizonte e dos objetivos; por isso, deve ser analisada com apoio tributário quando necessário.',
    blocks: [
      { type: 'h2', id: 'contexto', text: 'A sigla não decide sozinha' },
      {
        type: 'p',
        text: 'O tipo de plano é apenas uma parte da decisão. Regime de tributação, custos, fundos disponíveis, perfil de risco e regras de resgate também afetam o resultado.',
      },
      { type: 'h2', id: 'conceitos', text: 'Diferença central entre PGBL e VGBL' },
      {
        type: 'p',
        text: 'De forma geral, PGBL e VGBL diferem na base sobre a qual incide o imposto no resgate ou recebimento, além das condições tributárias aplicáveis às contribuições. A adequação depende da situação fiscal individual.',
      },
      { type: 'h2', id: 'checklist', text: 'O que avaliar' },
      {
        type: 'ul',
        items: [
          'Modelo da declaração de imposto de renda.',
          'Existência de renda tributável e contribuições aplicáveis.',
          'Prazo até o uso dos recursos.',
          'Regime de tributação disponível e adequado ao plano.',
          'Taxas, fundos, riscos e política de investimento.',
          'Regras de portabilidade, resgate e recebimento.',
        ],
      },
      { type: 'h2', id: 'quando-faz-sentido', text: 'Quando cada um pode fazer sentido' },
      {
        type: 'p',
        text: 'O PGBL costuma entrar na análise de quem reúne as condições tributárias aplicáveis; o VGBL pode ser avaliado em outros perfis de declaração ou para objetivos complementares. Isso não substitui orientação fiscal.',
      },
      { type: 'h2', id: 'erros-comuns', text: 'Erros comuns' },
      {
        type: 'ul',
        items: [
          'Escolher apenas por possível benefício fiscal.',
          'Ignorar taxas e estratégia dos fundos.',
          'Tratar previdência como reserva de curto prazo.',
          'Não revisar beneficiários e objetivo ao longo do tempo.',
        ],
      },
      {
        type: 'callout',
        text: 'Regras tributárias podem mudar e dependem do caso concreto. Consulte fontes oficiais e um profissional habilitado; rentabilidade passada não garante resultado futuro.',
      },
      {
        type: 'p',
        text: 'A escolha ganha qualidade quando tributação, investimento e objetivo de vida são analisados em conjunto.',
      },
    ],
    faq: [
      {
        question: 'PGBL é sempre melhor para quem declara imposto de renda?',
        answer:
          'Não. A análise depende do modelo de declaração, renda tributável, contribuições e limites legais vigentes, além dos custos e objetivos do plano.',
      },
      {
        question: 'No VGBL não há imposto?',
        answer:
          'Há tributação conforme o regime e a legislação aplicáveis; a base de incidência difere da do PGBL. Consulte as regras vigentes.',
      },
      {
        question: 'Posso trocar de plano depois?',
        answer:
          'Planos podem admitir portabilidade conforme regulamentação e condições aplicáveis. Verifique custos, compatibilidade e efeitos antes de solicitar.',
      },
    ],
    ctaTitle: 'Planeje sua previdência com contexto',
    ctaDescription:
      'A Xik ajuda a organizar objetivos e critérios para avaliar PGBL ou VGBL, sem substituir orientação tributária.',
    whatsappContext: 'comparação entre PGBL e VGBL',
    relatedPaths: [
      { label: 'Previdência privada', to: '/seguros/seguro-previdencia-privada' },
      { label: 'Seguro de vida', to: '/seguros/seguro-de-vida' },
      { label: 'Fale conosco', to: '/fale-conosco' },
    ],
    sources: [
      {
        label: 'SUSEP: Previdência complementar aberta',
        href: 'https://www.gov.br/susep/pt-br/assuntos/previdencia-complementar-aberta',
      },
      {
        label: 'Receita Federal: Imposto de Renda',
        href: 'https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda',
      },
    ],
    updatedAt,
  },

  'seguro-empresarial-para-pequenas-empresas': {
    lead:
      'O seguro empresarial pode ajudar uma pequena empresa a reduzir o impacto financeiro de eventos previstos na apólice. A contratação deve refletir atividade, imóvel, equipamentos, estoque, responsabilidades e continuidade do negócio; nenhuma cobertura deve ser considerada automática.',
    blocks: [
      { type: 'h2', id: 'contexto', text: 'Pequenos negócios também têm riscos complexos' },
      {
        type: 'p',
        text: 'Uma interrupção, dano material ou responsabilidade perante terceiros pode afetar caixa e operação. O primeiro passo é mapear o que sustenta a empresa.',
      },
      { type: 'h2', id: 'conceitos', text: 'Proteção construída por módulos' },
      {
        type: 'p',
        text: 'A apólice combina coberturas, limites, franquias e exclusões conforme o risco aceito. Atividades diferentes podem exigir condições e informações específicas.',
      },
      { type: 'h2', id: 'checklist', text: 'Checklist do negócio' },
      {
        type: 'ul',
        items: [
          'Atividade exercida e processos essenciais.',
          'Imóvel próprio ou alugado e suas responsabilidades.',
          'Equipamentos, estoque e valores expostos.',
          'Possíveis danos a clientes, vizinhos ou parceiros.',
          'Medidas de prevenção e segurança existentes.',
          'Coberturas, limites, franquias e exclusões da proposta.',
        ],
      },
      { type: 'h2', id: 'quando-faz-sentido', text: 'Quando faz sentido revisar a proteção' },
      {
        type: 'p',
        text: 'A análise é importante na abertura, mudança de endereço, expansão, compra de equipamentos, alteração de atividade ou crescimento do estoque.',
      },
      { type: 'h2', id: 'erros-comuns', text: 'Erros comuns' },
      {
        type: 'ul',
        items: [
          'Usar uma descrição genérica da atividade.',
          'Subestimar os valores em risco.',
          'Não informar mudanças na operação.',
          'Confundir assistência com cobertura securitária.',
        ],
      },
      {
        type: 'callout',
        text: 'Coberturas e aceitação variam conforme atividade e perfil do risco. Informações incompletas podem comprometer a análise e eventual indenização.',
      },
      {
        type: 'p',
        text: 'Uma apólice útil acompanha a realidade da empresa e deve ser revisada quando o negócio muda.',
      },
    ],
    faq: [
      {
        question: 'Seguro empresarial é obrigatório?',
        answer:
          'A obrigatoriedade depende da atividade, contratos e normas aplicáveis. Mesmo quando facultativo, pode ser avaliado como ferramenta de gestão de riscos.',
      },
      {
        question: 'Todo seguro empresarial cobre estoque?',
        answer:
          'Não. O estoque precisa estar contemplado conforme cobertura, limite, informações declaradas e condições da apólice.',
      },
      {
        question: 'Empresa em imóvel alugado pode contratar?',
        answer:
          'Sim, conforme o interesse segurável e as responsabilidades do contrato de locação. É importante separar bens do proprietário e da empresa.',
      },
    ],
    ctaTitle: 'Proteja a continuidade do seu negócio',
    ctaDescription:
      'A Xik ajuda a mapear riscos e comparar propostas adequadas à operação da sua empresa.',
    whatsappContext: 'seguro empresarial para pequena empresa',
    relatedPaths: [
      { label: 'Seguro empresarial', to: '/seguros/seguro-empresarial' },
      { label: 'Planos de saúde empresarial', to: '/planos/planos-de-saude-empresarial' },
      { label: 'Faça sua cotação', to: '/faca-sua-cotacao' },
    ],
    sources: [susepConsumerSource],
    updatedAt,
  },

  'corretora-de-seguros-por-que-contratar-uma-consultoria-especializada': {
    lead:
      'Uma corretora especializada ajuda a transformar necessidades em critérios de comparação, esclarecer condições e acompanhar a contratação. Ela não elimina a decisão do cliente nem garante aceitação ou indenização, mas pode reduzir dúvidas e evitar escolhas baseadas apenas no preço.',
    blocks: [
      { type: 'h2', id: 'contexto', text: 'Produtos financeiros exigem contexto' },
      {
        type: 'p',
        text: 'Seguro, plano de saúde, consórcio e financiamento têm documentos, critérios e responsabilidades diferentes. A consultoria organiza informações sem prometer resultados que dependem de terceiros.',
      },
      { type: 'h2', id: 'conceitos', text: 'O papel consultivo da corretora' },
      {
        type: 'p',
        text: 'A corretora levanta necessidades, apresenta alternativas disponíveis, explica diferenças e apoia os procedimentos. A proposta e o contrato continuam sendo as fontes formais das condições.',
      },
      { type: 'h2', id: 'checklist', text: 'O que esperar de uma boa consultoria' },
      {
        type: 'ul',
        items: [
          'Perguntas sobre objetivo, rotina, patrimônio e orçamento.',
          'Comparação clara de condições, limites e custos.',
          'Explicação de exclusões e pontos de atenção.',
          'Registro das escolhas e acesso aos documentos.',
          'Orientação de canais e procedimentos após a contratação.',
        ],
      },
      { type: 'h2', id: 'quando-faz-sentido', text: 'Quando o apoio faz diferença' },
      {
        type: 'p',
        text: 'A consultoria é especialmente útil quando há várias pessoas ou bens envolvidos, propostas difíceis de comparar, riscos empresariais ou dúvidas sobre o processo de contratação.',
      },
      { type: 'h2', id: 'erros-comuns', text: 'Erros comuns ao escolher uma corretora' },
      {
        type: 'ul',
        items: [
          'Confiar em promessas que não aparecem no contrato.',
          'Não verificar habilitação e canais oficiais.',
          'Omitir informações relevantes para obter preço menor.',
          'Não ler os documentos enviados para aceite.',
        ],
      },
      {
        type: 'callout',
        text: 'A corretora orienta e intermedeia, mas aceitação, crédito, cobertura e indenização seguem a análise e as condições das instituições responsáveis.',
      },
      {
        type: 'p',
        text: 'Consultoria de qualidade não empurra uma resposta pronta: ajuda o cliente a decidir com informação e acompanhamento.',
      },
    ],
    faq: [
      {
        question: 'A corretora cobra pela cotação?',
        answer:
          'A forma de atuação deve ser informada com transparência. Pergunte sobre custos, remuneração e escopo do atendimento antes de avançar.',
      },
      {
        question: 'A corretora garante que um sinistro será pago?',
        answer:
          'Não. A indenização depende do evento, da apólice, das informações e da análise da seguradora. A corretora pode orientar o processo.',
      },
      {
        question: 'Como verificar se uma corretora está habilitada?',
        answer:
          'Consulte os canais oficiais do órgão regulador competente e confirme os dados da empresa antes da contratação.',
      },
    ],
    ctaTitle: 'Tome sua decisão com orientação',
    ctaDescription:
      'Converse com a Xik sobre o que você precisa proteger ou planejar, sem compromisso com uma solução pronta.',
    whatsappContext: 'consultoria especializada da XIK SEGUROS',
    relatedPaths: [
      { label: 'Faça sua cotação', to: '/faca-sua-cotacao' },
      { label: 'Fale conosco', to: '/fale-conosco' },
      { label: 'Seguro de vida', to: '/seguros/seguro-de-vida' },
      { label: 'Seguro empresarial', to: '/seguros/seguro-empresarial' },
    ],
    sources: [susepConsumerSource],
    updatedAt,
  },
};
