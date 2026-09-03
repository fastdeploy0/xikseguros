import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string | null;
  trail: Crumb[];
  /** Optional aside: icon plate, actions or supporting detail. */
  aside?: ReactNode;
  actions?: ReactNode;
};

/** Inner-page header. Owns the single `h1` of every page that uses it. */
export function PageHero({ eyebrow, title, description, trail, aside, actions }: PageHeroProps) {
  return (
    <section className="on-invert relative isolate overflow-hidden bg-surface-invert text-text-invert">
      <div aria-hidden="true" className="surface-grid-invert absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 size-96 opacity-25 brand-glow"
      />

      <Container className="relative pt-8 pb-16 sm:pb-20 lg:pt-10 lg:pb-24">
        <Breadcrumbs trail={trail} invert />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow invert>{eyebrow}</Eyebrow>
            <h1 className="mt-5 text-display font-extrabold text-balance">{title}</h1>
            {description ? (
              <p className="measure mt-6 text-lead text-text-invert-muted">{description}</p>
            ) : null}
            {actions ? <div className="mt-8 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
          {aside ? <div className="lg:justify-self-end">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
