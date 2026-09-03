import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import {
  blogCategoryLabel,
  blogPostPath,
  findBlogPost,
  getBlogArticle,
} from '@/data/blog';
import type { BlogBlock } from '@/data/blog-articles';
import { company } from '@/data/company';
import { absoluteUrl, breadcrumbSchema } from '@/lib/seo';
import { Seo } from '@/components/Seo';
import { BlogPostHero } from '@/components/sections/BlogPostHero';
import { RecentBlogPostsSection } from '@/components/sections/RecentBlogPostsSection';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/sections/SectionHeading';
import NotFoundPage from './NotFoundPage';

function ArticleBlocks({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, index) => {
        if (block.type === 'h2') {
          return (
            <h2
              key={`${block.id}-${index}`}
              id={block.id}
              className="mt-4 scroll-mt-28 text-title font-extrabold text-balance text-brand-primary first:mt-0"
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === 'h3') {
          return (
            <h3
              key={`h3-${index}`}
              className="text-xl font-bold tracking-[-0.02em] text-brand-primary"
            >
              {block.text}
            </h3>
          );
        }
        if (block.type === 'ul') {
          return (
            <ul key={`ul-${index}`} className="flex list-disc flex-col gap-2.5 pl-5 text-text-muted">
              {block.items.map((item) => (
                <li key={item} className="leading-relaxed marker:text-brand-secondary-700">
                  {item}
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === 'callout') {
          return (
            <aside
              key={`callout-${index}`}
              className="rounded-md border border-border bg-surface-sunken px-5 py-4 text-sm leading-relaxed text-text-muted"
            >
              {block.text}
            </aside>
          );
        }
        return (
          <p key={`p-${index}`} className="text-[1.0625rem] leading-relaxed text-text-muted">
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

export default function BlogPostPage() {
  const { slug = '' } = useParams();
  const post = findBlogPost(slug);
  const article = getBlogArticle(slug);

  const trail = useMemo(
    () =>
      post
        ? [
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: blogPostPath(post.slug) },
          ]
        : [],
    [post]
  );

  const schemas = useMemo(() => {
    if (!post || !article) return [];
    return [
      breadcrumbSchema(trail),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.metaDescription,
        dateModified: article.updatedAt,
        datePublished: post.publishedAt,
        author: {
          '@type': 'Organization',
          name: company.legalName,
        },
        publisher: {
          '@type': 'Organization',
          name: company.legalName,
          logo: {
            '@type': 'ImageObject',
            url: absoluteUrl('/favicon/icon-512.png'),
          },
        },
        mainEntityOfPage: absoluteUrl(blogPostPath(post.slug)),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faq.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ];
  }, [post, article, trail]);

  if (!post || !article) return <NotFoundPage />;

  const category = blogCategoryLabel(post.category);

  // Vite emits hashed asset URLs: Article schema image should be absolute when possible.
  const ogSafeDescription = post.metaDescription;

  return (
    <>
      <Seo title={post.metaTitle} description={ogSafeDescription} schemas={schemas} />

      <BlogPostHero
        category={category}
        title={post.title}
        description={post.excerpt}
        image={post.image}
        trail={trail}
      />

      <Section tone="base" aria-labelledby="artigo-lead">
        <Reveal className="mx-auto max-w-3xl">
          <p id="artigo-lead" className="text-lead text-pretty text-text">
            {article.lead}
          </p>
          <p className="mt-4 text-sm text-text-subtle">
            Atualizado em{' '}
            {new Date(`${article.updatedAt}T12:00:00`).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>

          <div className="mt-10">
            <ArticleBlocks blocks={article.blocks} />
          </div>

          {article.relatedPaths.length ? (
            <nav aria-label="Páginas relacionadas" className="mt-12 border-t border-border pt-8">
              <p className="text-[0.6875rem] font-bold tracking-[0.18em] text-text-subtle uppercase">
                Continue no site
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {article.relatedPaths.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary transition-colors duration-(--duration-fast) hover:text-brand-secondary-700"
                    >
                      {item.label}
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          {article.sources.length ? (
            <aside className="mt-10 rounded-md border border-border bg-surface-sunken px-5 py-4">
              <p className="text-sm font-semibold text-brand-primary">Fontes para consulta</p>
              <ul className="mt-3 flex flex-col gap-2">
                {article.sources.map((source) => (
                  <li key={source.href}>
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-muted underline-offset-2 transition-colors duration-(--duration-fast) hover:text-brand-primary hover:underline"
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </Reveal>
      </Section>

      <Section tone="sunken" edgeTop="hairline" aria-labelledby="faq-artigo-titulo">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            id="faq-artigo-titulo"
            title="Perguntas frequentes"
            description="Dúvidas comuns relacionadas a este tema."
          />
          <div className="mt-10">
            <Accordion items={article.faq.slice(0, 3)} />
          </div>
        </div>
      </Section>

      <RecentBlogPostsSection excludeSlug={post.slug} />
    </>
  );
}
