import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';

type BlogPostHeroProps = {
  category: string;
  title: string;
  description: string;
  image: string;
  trail: Crumb[];
};

/**
 * Article hero: post thumbnail as full-bleed plane with navy scrims for legibility.
 */
export function BlogPostHero({ category, title, description, image, trail }: BlogPostHeroProps) {
  return (
    <section className="on-invert relative isolate min-h-[min(70svh,36rem)] overflow-hidden bg-brand-primary-900 text-text-invert sm:min-h-[min(64svh,40rem)] lg:min-h-[min(60svh,42rem)]">
      <img
        src={image}
        alt=""
        width={1600}
        height={900}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="pointer-events-none absolute inset-0 size-full object-cover object-center"
      />

      <div aria-hidden="true" className="absolute inset-0 bg-brand-primary-900/50 mix-blend-multiply" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-brand-primary-900/96 via-brand-primary-900/82 to-brand-primary-900/45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-brand-primary-900/92 via-brand-primary-900/35 to-brand-primary-900/40"
      />
      <div aria-hidden="true" className="surface-grid-invert absolute inset-0 opacity-[0.2]" />

      <Container className="relative z-[1] flex min-h-[inherit] flex-col pt-8 pb-16 sm:pb-20 lg:pt-10 lg:pb-24">
        <Breadcrumbs trail={trail} invert />

        <div className="mt-10 max-w-3xl lg:mt-14 lg:pb-4">
          <Eyebrow invert>{category}</Eyebrow>
          <h1 className="mt-5 text-display font-extrabold text-balance">{title}</h1>
          <p className="measure mt-5 text-lead text-text-invert-muted sm:mt-6">{description}</p>
        </div>
      </Container>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-b from-transparent via-bg/40 to-bg"
      />
    </section>
  );
}
