import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { blogCategoryLabel, blogPostPath, recentBlogPosts } from '@/data/blog';
import { cn } from '@/lib/cn';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/sections/SectionHeading';

type RecentBlogPostsSectionProps = {
  /** Omit the current article when rendering under a blog post. */
  excludeSlug?: string;
  tone?: 'base' | 'sunken';
};

function RecentPostCard({
  title,
  category,
  excerpt,
  image,
  to,
}: {
  title: string;
  category: string;
  excerpt: string;
  image: string;
  to: string;
}) {
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden border border-border bg-surface',
        'rounded-lg transition-[border-color,box-shadow,transform] duration-(--duration-base) ease-(--ease-out-brand)',
        'hover:border-border-strong hover:shadow-soft motion-safe:hover:-translate-y-0.5'
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-sunken">
        <img
          src={image}
          alt=""
          width={960}
          height={600}
          loading="lazy"
          decoding="async"
          className="size-full object-cover transition-transform duration-(--duration-base) ease-(--ease-out-brand) motion-safe:group-hover:scale-[1.03]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-brand-primary/40 mix-blend-multiply"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-brand-primary/75 via-brand-primary/25 to-brand-primary/10"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="text-[0.6875rem] font-bold tracking-[0.18em] text-brand-secondary-700 uppercase">
          {category}
        </p>
        <h3 className="mt-3 text-xl leading-tight font-extrabold tracking-[-0.02em] text-balance text-brand-primary">
          <Link to={to} className="after:absolute after:inset-0 after:content-['']">
            {title}
          </Link>
        </h3>
        <p className="mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed text-text-muted">{excerpt}</p>
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

/**
 * Three most recent blog posts. Place last before the layout footer.
 */
export function RecentBlogPostsSection({
  excludeSlug,
  tone = 'base',
}: RecentBlogPostsSectionProps) {
  const posts = recentBlogPosts(excludeSlug, 3);
  if (!posts.length) return null;

  return (
    <Section tone={tone} edgeTop="hairline" aria-labelledby="recentes-titulo">
      <SectionHeading
        id="recentes-titulo"
        title="Últimas atualizações em nosso blog"
        description="Continue explorando conteúdos para decidir com mais clareza."
      />
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {posts.map((item, index) => (
          <Reveal as="li" key={item.slug} index={index} className="flex">
            <div className="w-full">
              <RecentPostCard
                title={item.title}
                category={blogCategoryLabel(item.category)}
                excerpt={item.excerpt}
                image={item.image}
                to={blogPostPath(item.slug)}
              />
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
