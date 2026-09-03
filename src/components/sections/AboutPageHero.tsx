import heroAbout from '@/assets/marketing/hero-sobre-xik.webp';
import heroAboutSm from '@/assets/marketing/hero-sobre-xik-sm.webp';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';

type AboutPageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  trail: Crumb[];
};

/**
 * Institutional hero for `/a-empresa` only: full-bleed facade photo with navy
 * scrims so copy stays legible over the gold signage.
 */
export function AboutPageHero({ eyebrow, title, description, trail }: AboutPageHeroProps) {
  return (
    <section className="on-invert relative isolate min-h-[min(78svh,40rem)] overflow-hidden bg-brand-primary-900 text-text-invert sm:min-h-[min(72svh,44rem)] lg:min-h-[min(68svh,46rem)]">
      <picture aria-hidden="true" className="pointer-events-none absolute inset-0">
        <source media="(min-width: 1024px)" srcSet={heroAbout} />
        <img
          src={heroAboutSm}
          alt=""
          width={1200}
          height={675}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="size-full origin-[90%_40%] object-cover object-[90%_38%] max-lg:scale-[0.94] lg:origin-center lg:object-[center_42%]"
        />
      </picture>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-brand-primary-900/45 mix-blend-multiply"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-brand-primary-900/95 via-brand-primary-900/78 to-brand-primary-900/20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-brand-primary-900/88 via-brand-primary-900/25 to-brand-primary-900/35"
      />
      <div aria-hidden="true" className="surface-grid-invert absolute inset-0 opacity-[0.22]" />

      <Container className="relative z-[1] flex min-h-[inherit] flex-col pt-8 pb-16 sm:pb-20 lg:pt-10 lg:pb-28">
        <Breadcrumbs trail={trail} invert />

        {/* Mobile: copy sobe para a área escura acima do letreiro; desktop mantém centro. */}
        <div className="mt-8 flex flex-1 flex-col justify-start lg:mt-12 lg:max-w-2xl lg:justify-center lg:pb-6">
          <Eyebrow invert>{eyebrow}</Eyebrow>
          <h1 className="mt-5 text-display font-extrabold text-balance">{title}</h1>
          <p className="measure mt-5 text-lead text-text-invert-muted sm:mt-6">{description}</p>
        </div>
      </Container>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-28 bg-gradient-to-b from-transparent via-bg/35 to-bg"
      />
    </section>
  );
}
