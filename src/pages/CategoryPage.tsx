import { useMemo } from 'react';
import heroPlanos from '@/assets/marketing/xik-hero-planos-sm.webp';
import heroSeguros from '@/assets/marketing/xik-hero-seguros.webp';
import { healthPlans, insurances, type ServiceCategory } from '@/data/services';
import { healthPartners, insurerPartners, partnersForCategory } from '@/data/partners';
import { breadcrumbSchema } from '@/lib/seo';
import { Seo } from '@/components/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { HeroAsideVisual } from '@/components/sections/HeroAsideVisual';
import { Section } from '@/components/ui/Section';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { PartnerLogoGrid } from '@/components/ui/PartnerLogoGrid';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';

type CategoryPageProps = {
  category: ServiceCategory;
};

/** Copy for each hub, taken from the headings the Xik publishes on these pages. */
const CONTENT = {
  planos: {
    eyebrow: 'Planos de saúde',
    title: 'Os melhores planos você encontra aqui',
    description:
      'Selecione o tipo de plano de saúde de acordo com a sua necessidade. Cada modalidade tem um formulário próprio para receber valores e coberturas das operadoras.',
    metaTitle: 'Planos de Saúde',
    metaDescription:
      'Planos de saúde empresariais e odontológicos intermediados pela XIK SEGUROS em Belo Horizonte.',
    partnersLabel: 'Operadoras e administradoras de benefícios',
    formNames: healthPartners,
    services: healthPlans,
  },
  seguros: {
    eyebrow: 'Seguros',
    title: 'Encontre o melhor seguro para o seu bem',
    description:
      'Escolha abaixo o tipo de seguro de acordo com a sua necessidade. A lista também inclui consórcios e financiamento de veículos.',
    metaTitle: 'Seguros',
    metaDescription:
      'Seguro automóvel, de vida, residencial, empresarial, viagem, previdência privada, consórcios e financiamentos com a XIK SEGUROS.',
    partnersLabel: 'Seguradoras',
    formNames: insurerPartners,
    services: insurances,
  },
} as const;

const CATEGORY_HERO: Record<
  ServiceCategory,
  { src: string; alt: string } | null
> = {
  planos: {
    src: heroPlanos,
    alt: 'Ilustração dos planos de saúde intermediados pela XIK SEGUROS',
  },
  seguros: {
    src: heroSeguros,
    alt: 'Ilustração dos seguros intermediados pela XIK SEGUROS',
  },
};

function namesWithoutLogo(formNames: readonly string[], logoNames: string[]): string[] {
  const normalized = new Set(logoNames.map((n) => n.toLowerCase()));
  return formNames.filter((name) => !normalized.has(name.toLowerCase()));
}

export default function CategoryPage({ category }: CategoryPageProps) {
  const content = CONTENT[category];
  const path = `/${category}`;
  const logoPartners = partnersForCategory(category);
  const textOnly = namesWithoutLogo(
    content.formNames,
    logoPartners.map((p) => p.name)
  );
  const categoryHero = CATEGORY_HERO[category];

  const trail = useMemo(
    () => [
      { name: 'Home', path: '/' },
      { name: content.metaTitle, path },
    ],
    [content.metaTitle, path]
  );

  const schemas = useMemo(() => [breadcrumbSchema(trail)], [trail]);

  return (
    <>
      <Seo title={content.metaTitle} description={content.metaDescription} schemas={schemas} />

      <PageHero
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        trail={trail}
        aside={
          categoryHero ? (
            <HeroAsideVisual src={categoryHero.src} alt={categoryHero.alt} />
          ) : undefined
        }
      />

      <Section tone="base" aria-labelledby="modalidades-titulo">
        <h2 id="modalidades-titulo" className="sr-only">
          Modalidades disponíveis
        </h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {content.services.map((service, index) => (
            <Reveal as="li" key={service.slug} index={index} className="flex">
              <ServiceCard service={service} position={index + 1} className="w-full" />
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="sunken" bordered tight aria-labelledby="companhias-titulo">
        <Reveal>
          <Eyebrow>{content.partnersLabel}</Eyebrow>
          <h2 id="companhias-titulo" className="measure mt-5 text-title font-extrabold text-balance">
            Companhias presentes nesta categoria
          </h2>
          <p className="measure mt-4 text-text-muted">
            Logos das parceiras disponibilizados para o institucional da Xik. Demais nomes listados
            nos formulários de cotação aparecem abaixo quando ainda não há arte.
          </p>
        </Reveal>

        <div className="mt-10">
          <PartnerLogoGrid partners={logoPartners} labelledBy="companhias-titulo" />
        </div>

        {textOnly.length ? (
          <Reveal index={1} className="mt-8">
            <h3 className="text-[0.6875rem] font-bold tracking-[0.2em] text-text-subtle uppercase">
              Também nos formulários de cotação
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {textOnly.map((partner) => (
                <li
                  key={partner}
                  className="rounded-md border border-border bg-surface px-4 py-2 text-sm font-semibold text-text-muted"
                >
                  {partner}
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </Section>
    </>
  );
}
