/**
 * Editorial catalogue for `/blog` and `/blog/:slug`.
 *
 * Content follows TRANSICAO-ESTRATEGIA-BLOG-XIK-SEGUROS.md.
 * No invented prices, operators, coverages or regulatory figures : 
 * general orientation only; readers should validate with a consultant / ANS / SUSEP.
 */

import thumb01 from '@/assets/blog/xik-blog-01.webp';
import thumb02 from '@/assets/blog/xik-blog-02.webp';
import thumb03 from '@/assets/blog/xik-blog-03.webp';
import thumb04 from '@/assets/blog/xik-blog-04.webp';
import thumb05 from '@/assets/blog/xik-blog-05.webp';
import thumb06 from '@/assets/blog/xik-blog-06.webp';
import thumb07 from '@/assets/blog/xik-blog-07.webp';
import thumb09 from '@/assets/blog/xik-blog-09.webp';
import thumb10 from '@/assets/blog/xik-blog-10.webp';
import thumb11 from '@/assets/blog/xik-blog-11.webp';
import thumb12 from '@/assets/blog/xik-blog-12.webp';
import thumb13 from '@/assets/blog/xik-blog-13.webp';
import thumb14 from '@/assets/blog/xik-blog-14.webp';
import thumb15 from '@/assets/blog/xik-blog-15.webp';
import { blogArticles, type BlogArticleBody } from './blog-articles';

export type BlogCategoryId =
  | 'guia-de-decisao'
  | 'planos-de-saude'
  | 'pessoas-e-familias'
  | 'protecao-patrimonial'
  | 'consorcios-e-financiamento'
  | 'previdencia-e-planejamento';

export type BlogPostStatus = 'published';

export type BlogCategory = {
  id: BlogCategoryId;
  label: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategoryId;
  excerpt: string;
  status: BlogPostStatus;
  keywords: string[];
  image: string;
  /** ISO date: used for “mais recentes” ordering (newest first). */
  publishedAt: string;
  metaTitle: string;
  metaDescription: string;
};

export const blogCategories: BlogCategory[] = [
  { id: 'guia-de-decisao', label: 'Guia de decisão' },
  { id: 'planos-de-saude', label: 'Planos de saúde' },
  { id: 'pessoas-e-familias', label: 'Pessoas e famílias' },
  { id: 'protecao-patrimonial', label: 'Proteção patrimonial' },
  { id: 'consorcios-e-financiamento', label: 'Consórcios e financiamento' },
  { id: 'previdencia-e-planejamento', label: 'Previdência e planejamento' },
];

export const blogQuickTopics: Array<{ label: string; query: string }> = [
  { label: 'Plano de saúde', query: 'plano de saúde' },
  { label: 'Seguro de vida', query: 'seguro de vida' },
  { label: 'Seguro residencial', query: 'seguro residencial' },
  { label: 'Consórcio', query: 'consórcio' },
  { label: 'Previdência', query: 'previdência' },
];

/** Catalogue in briefing order (1→15). `publishedAt` increases so 15 is newest.
 * Thumbnails mapped by visual theme (see postblog/), not by source filename order.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: 'como-funciona-a-portabilidade-de-carencias',
    title: 'Como funciona a portabilidade de carências?',
    category: 'planos-de-saude',
    excerpt: 'Pontos essenciais para quem já tem plano e avalia migrar de operadora.',
    status: 'published',
    keywords: ['portabilidade', 'carência', 'operadora'],
    // Consulta holográfica com ícones de saúde/proteção.
    image: thumb09,
    publishedAt: '2026-08-02',
    metaTitle: 'Portabilidade de carências no plano de saúde',
    metaDescription:
      'Entenda o que é portabilidade de carências, quando costuma ser avaliada e como conversar com a Xik antes de trocar de plano.',
  },
  {
    slug: 'o-que-analisar-antes-de-contratar-um-plano-de-saude',
    title: 'O que analisar antes de contratar um plano de saúde?',
    category: 'planos-de-saude',
    excerpt: 'Checklist consultivo para comparar propostas com mais clareza.',
    status: 'published',
    keywords: ['rede', 'coparticipação', 'abrangência'],
    // Análise reflexiva de portfólio (casa, auto, viagem, cartões).
    image: thumb14,
    publishedAt: '2026-08-03',
    metaTitle: 'O que analisar antes de contratar plano de saúde',
    metaDescription:
      'Checklist para comparar planos de saúde além do preço: rede, abrangência, coparticipação e acompanhamento com a XIK SEGUROS.',
  },
  {
    slug: 'plano-de-saude-empresarial-para-pequenas-empresas-vale-a-pena',
    title: 'Plano de saúde empresarial para pequenas empresas: vale a pena?',
    category: 'planos-de-saude',
    excerpt: 'Quando o plano coletivo faz sentido para times menores.',
    status: 'published',
    keywords: ['PME', 'colaboradores', 'benefícios'],
    // Loja/comércio sob escudo: contexto empresarial.
    image: thumb02,
    publishedAt: '2026-08-04',
    metaTitle: 'Plano de saúde empresarial para pequenas empresas',
    metaDescription:
      'Quando o plano empresarial pode fazer sentido para pequenas empresas e o que alinhar com a Xik antes de cotar.',
  },
  {
    slug: 'seguro-de-vida-o-que-e-e-para-quem-e-indicado',
    title: 'Seguro de vida: o que é e para quem é indicado?',
    category: 'pessoas-e-familias',
    excerpt: 'Uma visão clara do papel do seguro de vida na proteção familiar.',
    status: 'published',
    keywords: ['proteção', 'família', 'vida'],
    // Família em escudo dourado.
    image: thumb13,
    publishedAt: '2026-08-05',
    metaTitle: 'Seguro de vida: o que é e para quem é indicado',
    metaDescription:
      'Entenda o papel do seguro de vida na proteção familiar e quando conversar com a XIK SEGUROS sobre essa solução.',
  },
  {
    slug: 'seguro-residencial-o-que-cobre-e-quanto-custa',
    title: 'Seguro residencial: o que cobre e quanto custa?',
    category: 'protecao-patrimonial',
    excerpt:
      'Orientação geral sobre o papel do seguro residencial. Valores dependem de análise com um consultor.',
    status: 'published',
    keywords: ['casa', 'apartamento', 'patrimônio'],
    // Casa moderna dentro de escudo.
    image: thumb15,
    publishedAt: '2026-08-06',
    metaTitle: 'Seguro residencial: coberturas e custo',
    metaDescription:
      'O que costuma entrar em pauta no seguro residencial e por que o valor depende do perfil do imóvel, com orientação da Xik.',
  },
  {
    slug: 'seguro-residencial-para-apartamento-principais-coberturas',
    title: 'Seguro residencial para apartamento: principais coberturas',
    category: 'protecao-patrimonial',
    excerpt: 'O que costuma entrar em pauta na proteção de unidades em condomínio.',
    status: 'published',
    keywords: ['apartamento', 'condomínio', 'conteúdo'],
    // Prédio/apartamento sob cúpula de proteção.
    image: thumb10,
    publishedAt: '2026-08-07',
    metaTitle: 'Seguro residencial para apartamento',
    metaDescription:
      'Principais pontos de atenção no seguro residencial para apartamento e como a Xik ajuda a comparar propostas.',
  },
  {
    slug: 'seguro-viagem-o-que-analisar-antes-de-contratar',
    title: 'Seguro viagem: o que analisar antes de contratar?',
    category: 'pessoas-e-familias',
    excerpt: 'Critérios práticos para escolher cobertura de viagem com orientação da corretora.',
    status: 'published',
    keywords: ['viagem', 'internacional', 'assistência'],
    // Mala, passaporte e avião sob escudo.
    image: thumb07,
    publishedAt: '2026-08-08',
    metaTitle: 'Seguro viagem: o que analisar antes de contratar',
    metaDescription:
      'Critérios para escolher seguro viagem com mais clareza: destino, perfil e acompanhamento com a XIK SEGUROS.',
  },
  {
    slug: 'consorcio-ou-financiamento-qual-e-melhor',
    title: 'Consórcio ou financiamento: qual é melhor?',
    category: 'consorcios-e-financiamento',
    excerpt: 'Compare lógicas de pagamento, prazos e quando cada caminho costuma fazer sentido.',
    status: 'published',
    keywords: ['carta de crédito', 'veículo', 'imóvel'],
    // Balança com dois carros: comparação de caminhos.
    image: thumb11,
    publishedAt: '2026-08-09',
    metaTitle: 'Consórcio ou financiamento: qual é melhor?',
    metaDescription:
      'Compare consórcio e financiamento de forma consultiva e descubra qual caminho conversar com a Xik no seu momento.',
  },
  {
    slug: 'como-funciona-a-contemplacao-no-consorcio',
    title: 'Como funciona a contemplação no consórcio?',
    category: 'consorcios-e-financiamento',
    excerpt: 'Lance, sorteio e o que muda depois da contemplação, em linguagem direta.',
    status: 'published',
    keywords: ['lance', 'sorteio', 'contemplação'],
    // Envelope selado + casa + moedas: acesso ao crédito/bem.
    image: thumb05,
    publishedAt: '2026-08-10',
    metaTitle: 'Como funciona a contemplação no consórcio',
    metaDescription:
      'Entenda contemplação por sorteio e lance no consórcio, sem promessa de prazo, com orientação da XIK SEGUROS.',
  },
  {
    slug: 'o-que-avaliar-antes-de-escolher-uma-carta-de-credito',
    title: 'O que avaliar antes de escolher uma carta de crédito?',
    category: 'consorcios-e-financiamento',
    excerpt: 'Prazo, parcela e objetivo do bem: o que alinhar com um consultor.',
    status: 'published',
    keywords: ['carta', 'crédito', 'parcela'],
    // Consultor apontando modalidades (casa, auto, prédio) na mesa.
    image: thumb06,
    publishedAt: '2026-08-11',
    metaTitle: 'O que avaliar antes de escolher uma carta de crédito',
    metaDescription:
      'Prazo, parcela e objetivo do bem: pontos para avaliar uma carta de crédito com a XIK SEGUROS.',
  },
  {
    slug: 'financiamento-de-veiculos-documentos-e-etapas',
    title: 'Financiamento de veículos: documentos e etapas',
    category: 'consorcios-e-financiamento',
    excerpt: 'Visão geral do fluxo de avaliação de crédito para aquisição de veículos.',
    status: 'published',
    keywords: ['financiamento', 'veículo', 'documentos'],
    // Carro + checklist + pasta + moedas.
    image: thumb04,
    publishedAt: '2026-08-12',
    metaTitle: 'Financiamento de veículos: documentos e etapas',
    metaDescription:
      'Visão geral das etapas e documentos comuns no financiamento de veículos, com acompanhamento da XIK SEGUROS.',
  },
  {
    slug: 'previdencia-privada-pgbl-ou-vgbl',
    title: 'Previdência privada: PGBL ou VGBL?',
    category: 'previdencia-e-planejamento',
    excerpt: 'Diferenças conceituais para conversar com a Xik sobre o seu perfil.',
    status: 'published',
    keywords: ['PGBL', 'VGBL', 'aposentadoria'],
    // Bifurcação: casa vs lazer/aposentadoria (PGBL ou VGBL).
    image: thumb03,
    publishedAt: '2026-08-13',
    metaTitle: 'Previdência privada: PGBL ou VGBL?',
    metaDescription:
      'Diferenças conceituais entre PGBL e VGBL para conversar com a Xik sobre o perfil adequado ao seu planejamento.',
  },
  {
    slug: 'seguro-empresarial-para-pequenas-empresas',
    title: 'Seguro empresarial para pequenas empresas',
    category: 'protecao-patrimonial',
    excerpt: 'Proteção patrimonial e responsabilidades civis no dia a dia da empresa.',
    status: 'published',
    keywords: ['empresa', 'PME', 'responsabilidade'],
    // Comércio sob escudo azul de proteção.
    image: thumb12,
    publishedAt: '2026-08-14',
    metaTitle: 'Seguro empresarial para pequenas empresas',
    metaDescription:
      'Por que pequenas empresas avaliam seguro empresarial e como a Xik ajuda a comparar opções adequadas ao risco.',
  },
  {
    slug: 'corretora-de-seguros-por-que-contratar-uma-consultoria-especializada',
    title: 'Corretora de seguros: por que contratar uma consultoria especializada?',
    category: 'guia-de-decisao',
    excerpt: 'O papel da corretora na comparação de opções e no acompanhamento da contratação.',
    status: 'published',
    keywords: ['corretora', 'consultoria', 'cotação'],
    // Consultoria presencial com família, escudo, casa e auto.
    image: thumb01,
    publishedAt: '2026-08-15',
    metaTitle: 'Por que contratar uma corretora de seguros',
    metaDescription:
      'O papel da corretora na comparação de opções e no acompanhamento da contratação: o jeito Xik de orientar decisões.',
  },
];

export function blogCategoryLabel(id: BlogCategoryId): string {
  return blogCategories.find((category) => category.id === id)?.label ?? id;
}

export function blogPostPath(slug: string): string {
  return `/blog/${slug}`;
}

export function findBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogArticle(slug: string): BlogArticleBody | undefined {
  return blogArticles[slug];
}

export function filterBlogPosts(
  posts: readonly BlogPost[],
  options: { query: string; category: BlogCategoryId | 'todos' }
): BlogPost[] {
  const normalized = options.query.trim().toLowerCase().replace(/\s+/g, ' ');

  return posts.filter((post) => {
    if (options.category !== 'todos' && post.category !== options.category) return false;
    if (!normalized) return true;

    const haystack = [post.title, post.excerpt, blogCategoryLabel(post.category), ...post.keywords]
      .join(' ')
      .toLowerCase();

    return haystack.includes(normalized);
  });
}

/** Three newest posts excluding the current slug (by `publishedAt`). */
export function recentBlogPosts(excludeSlug?: string, limit = 3): BlogPost[] {
  return [...blogPosts]
    .filter((post) => post.slug !== excludeSlug)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, limit);
}
