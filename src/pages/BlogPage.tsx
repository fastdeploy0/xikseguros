import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Search, X } from 'lucide-react';
import {
  blogCategories,
  blogPosts,
  blogQuickTopics,
  blogCategoryLabel,
  blogPostPath,
  filterBlogPosts,
  type BlogCategoryId,
  type BlogPost,
} from '@/data/blog';
import { company } from '@/data/company';
import { absoluteUrl, breadcrumbSchema, SITE_URL } from '@/lib/seo';
import { inputClass } from '@/lib/field-styles';
import { cn } from '@/lib/cn';
import { Seo } from '@/components/Seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/sections/SectionHeading';

const trail = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
];

const META_DESCRIPTION =
  'Conteúdos para ajudar você a tomar decisões mais seguras sobre planos de saúde, seguros, consórcios, financiamento, previdência e proteção patrimonial.';

type CategoryFilter = BlogCategoryId | 'todos';

function collectionPageSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Blog | ${company.name}`,
    description: META_DESCRIPTION,
    url: absoluteUrl('/blog'),
    isPartOf: {
      '@type': 'WebSite',
      name: company.name,
      url: SITE_URL,
    },
    about: 'Orientação editorial sobre saúde, seguros, consórcios, financiamento e previdência.',
  };
}

function BlogPostCard({ post }: { post: BlogPost }) {
  const category = blogCategoryLabel(post.category);
  const to = blogPostPath(post.slug);

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden border border-border bg-surface',
        'rounded-lg transition-[border-color,box-shadow,transform] duration-(--duration-base) ease-(--ease-out-brand)',
        'hover:border-border-strong hover:shadow-soft motion-safe:hover:-translate-y-0.5',
        'focus-within:border-brand-primary focus-within:shadow-soft'
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-sunken">
        <img
          src={post.image}
          alt=""
          width={960}
          height={600}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-(--duration-base) ease-(--ease-out-brand) motion-safe:group-hover:scale-[1.03]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-brand-primary/42 mix-blend-multiply"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 via-brand-primary/30 to-brand-primary/15"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-[0.6875rem] font-bold tracking-[0.18em] text-brand-secondary-700 uppercase">
          {category}
        </p>
        <h3 className="mt-3 text-xl leading-tight font-extrabold tracking-[-0.02em] text-balance text-brand-primary">
          <Link to={to} className="after:absolute after:inset-0 after:content-['']">
            {post.title}
          </Link>
        </h3>
        {post.excerpt ? (
          <p className="mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed text-text-muted">
            {post.excerpt}
          </p>
        ) : null}
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-brand-primary">
          Ler artigo
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-(--duration-base) ease-(--ease-out-brand) motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </article>
  );
}

function FilterChip({
  label,
  pressed,
  onClick,
}: {
  label: string;
  pressed: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        'shrink-0 rounded-md border px-4 py-2 text-sm font-semibold transition-colors duration-(--duration-fast)',
        pressed
          ? 'border-brand-primary bg-brand-primary text-text-invert'
          : 'border-border bg-surface text-text-muted hover:border-border-strong hover:text-brand-primary'
      )}
    >
      {label}
    </button>
  );
}

export default function BlogPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('todos');

  const schemas = useMemo(() => [breadcrumbSchema(trail), collectionPageSchema()], []);

  const filtered = useMemo(
    () => filterBlogPosts(blogPosts, { query, category }),
    [query, category]
  );

  const hasActiveFilters = Boolean(query.trim()) || category !== 'todos';

  const clearFilters = () => {
    setQuery('');
    setCategory('todos');
  };

  return (
    <>
      <Seo
        title="Blog · Saúde, Seguros, Consórcios e Previdência"
        description={META_DESCRIPTION}
        schemas={schemas}
      />

      <section className="on-invert relative isolate overflow-hidden bg-surface-invert text-text-invert">
        <div aria-hidden="true" className="surface-grid-invert absolute inset-0 opacity-60" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/4 size-96 opacity-25 brand-glow"
        />

        <Container className="relative pt-8 pb-16 sm:pb-20 lg:pt-10 lg:pb-24">
          <Breadcrumbs trail={trail} invert />

          <div className="mx-auto mt-10 max-w-3xl text-center">
            <Eyebrow invert className="justify-center">
              Conteúdo Xik · Saúde, proteção e futuro
            </Eyebrow>
            <h1 className="mt-5 text-display font-extrabold text-balance">
              Decisões mais seguras começam com informação.
            </h1>
            <p className="mx-auto measure mt-6 text-lead text-text-invert-muted">
              A central editorial da Xik reúne conteúdos sobre planos de saúde, seguros, consórcios,
              financiamento, previdência e proteção patrimonial, para pessoas, famílias e empresas
              escolherem com mais clareza.
            </p>
          </div>

          <div className="mx-auto mt-10 w-full max-w-2xl">
            <label htmlFor="blog-search" className="sr-only">
              Buscar conteúdos do blog
            </label>
            <div className="relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-text-subtle"
              />
              <input
                id="blog-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Busque por plano de saúde, seguro, consórcio..."
                autoComplete="off"
                className={cn(inputClass(false), 'pl-12 pr-12 text-text')}
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute top-1/2 right-3 grid size-9 -translate-y-1/2 place-items-center rounded-sm text-text-muted transition-colors duration-(--duration-fast) hover:text-brand-primary"
                  aria-label="Limpar busca"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              ) : null}
            </div>

            <ul className="mt-4 flex justify-center gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
              {blogQuickTopics.map((topic) => {
                const pressed = query.trim().toLowerCase() === topic.query.toLowerCase();
                return (
                  <li key={topic.label} className="shrink-0">
                    <FilterChip
                      label={topic.label}
                      pressed={pressed}
                      onClick={() => {
                        setQuery(topic.query);
                        setCategory('todos');
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </section>

      <Section tone="base" aria-labelledby="catalogo-titulo">
        <SectionHeading
          id="catalogo-titulo"
          title="Todos os conteúdos"
          description="Explore por tema ou refine a busca. Cada artigo responde uma dúvida real e aponta o próximo passo com a Xik."
        />

        <div className="mt-8">
          <p id="blog-filters-label" className="sr-only">
            Filtrar por categoria
          </p>
          <ul
            role="list"
            aria-labelledby="blog-filters-label"
            className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:thin] lg:flex-wrap lg:overflow-visible"
          >
            <li>
              <FilterChip
                label="Todos"
                pressed={category === 'todos'}
                onClick={() => setCategory('todos')}
              />
            </li>
            {blogCategories.map((item) => (
              <li key={item.id}>
                <FilterChip
                  label={item.label}
                  pressed={category === item.id}
                  onClick={() => setCategory(item.id)}
                />
              </li>
            ))}
          </ul>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-12 rounded-lg border border-border bg-surface px-6 py-12 text-center sm:px-10">
            <p className="text-lg font-semibold text-brand-primary">
              Nenhum conteúdo encontrado para essa busca.
            </p>
            {hasActiveFilters ? (
              <Button type="button" variant="ghost" className="mt-6" onClick={clearFilters}>
                Limpar filtros
              </Button>
            ) : null}
          </div>
        ) : (
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((post, index) => (
              <Reveal as="li" key={post.slug} index={index} className="flex">
                <div className="w-full">
                  <BlogPostCard post={post} />
                </div>
              </Reveal>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
