import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowUpRight, Phone } from 'lucide-react';
import heroPlanoIndividual from '@/assets/marketing/xik-hero-plano-individual.webp';
import heroPlanoEmpresarial from '@/assets/marketing/xik-hero-plano-empresarial.webp';
import heroPlanoAdesao from '@/assets/marketing/xik-hero-plano-adesao.webp';
import heroPlanoOdonto from '@/assets/marketing/xik-hero-plano-odonto.webp';
import heroSeguroAutomovel from '@/assets/marketing/xik-hero-seguro-automovel.webp';
import heroSeguroDeVida from '@/assets/marketing/xik-hero-seguro-de-vida.webp';
import heroSeguroResidencial from '@/assets/marketing/xik-hero-seguro-residencial.webp';
import heroSeguroPrevidencia from '@/assets/marketing/xik-hero-seguro-previdencia-privada.webp';
import heroSeguroEmpresarial from '@/assets/marketing/xik-hero-seguro-empresarial.webp';
import heroSeguroViagem from '@/assets/marketing/xik-hero-seguro-viagem.webp';
import heroSeguroConsorcios from '@/assets/marketing/xik-hero-seguro-consorcios.webp';
import heroSeguroFinanciamento from '@/assets/marketing/xik-hero-seguro-financiamento-veiculos.webp';
import { company } from '@/data/company';
import { findService, servicePath, services, type Service, type ServiceCategory } from '@/data/services';
import {
  insuranceNavServices,
  investmentNavServices,
  isInvestmentServiceSlug,
} from '@/data/navigation';
import {
  healthPartners,
  insurerPartners,
  partnersForCategory,
  partnersForServiceSlug,
} from '@/data/partners';
import { breadcrumbSchema } from '@/lib/seo';
import { Seo } from '@/components/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { HeroAsideVisual } from '@/components/sections/HeroAsideVisual';
import { QuoteForm } from '@/components/sections/QuoteForm';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { PartnerLogoGrid } from '@/components/ui/PartnerLogoGrid';
import { RecentBlogPostsSection } from '@/components/sections/RecentBlogPostsSection';
import NotFoundPage from './NotFoundPage';

const CATEGORY_LABEL: Record<ServiceCategory, string> = {
  planos: 'Planos de Saúde',
  seguros: 'Seguros',
};

function relatedServicesFor(service: Service): Service[] {
  if (isInvestmentServiceSlug(service.slug)) {
    return investmentNavServices.filter((item) => item.slug !== service.slug);
  }
  if (service.category === 'seguros') {
    return insuranceNavServices.filter((item) => item.slug !== service.slug).slice(0, 3);
  }
  return services.filter((item) => item.category === service.category && item.slug !== service.slug).slice(0, 3);
}

const HERO_ASIDE_BY_SLUG: Record<string, { src: string; alt: string }> = {
  'plano-de-saude-individual': {
    src: heroPlanoIndividual,
    alt: 'Ilustração do plano de saúde individual intermediado pela XIK SEGUROS',
  },
  'planos-de-saude-empresarial': {
    src: heroPlanoEmpresarial,
    alt: 'Ilustração dos planos de saúde empresariais intermediados pela XIK SEGUROS',
  },
  'plano-de-saude-por-adesao': {
    src: heroPlanoAdesao,
    alt: 'Ilustração do plano de saúde por adesão intermediado pela XIK SEGUROS',
  },
  'plano-odontologico': {
    src: heroPlanoOdonto,
    alt: 'Ilustração do plano odontológico intermediado pela XIK SEGUROS',
  },
  'seguro-automovel': {
    src: heroSeguroAutomovel,
    alt: 'Ilustração do seguro automóvel intermediado pela XIK SEGUROS',
  },
  'seguro-de-vida': {
    src: heroSeguroDeVida,
    alt: 'Ilustração do seguro de vida intermediado pela XIK SEGUROS',
  },
  'seguro-residencial': {
    src: heroSeguroResidencial,
    alt: 'Ilustração do seguro residencial intermediado pela XIK SEGUROS',
  },
  'seguro-previdencia-privada': {
    src: heroSeguroPrevidencia,
    alt: 'Ilustração da previdência privada intermediada pela XIK SEGUROS',
  },
  'seguro-empresarial': {
    src: heroSeguroEmpresarial,
    alt: 'Ilustração do seguro empresarial intermediado pela XIK SEGUROS',
  },
  'seguro-viagem': {
    src: heroSeguroViagem,
    alt: 'Ilustração do seguro viagem intermediado pela XIK SEGUROS',
  },
  consorcios: {
    src: heroSeguroConsorcios,
    alt: 'Ilustração de consórcios intermediados pela XIK SEGUROS',
  },
  'financiamento-veiculos': {
    src: heroSeguroFinanciamento,
    alt: 'Ilustração de financiamento de veículos intermediado pela XIK SEGUROS',
  },
};

export default function ServicePage({ category }: { category: ServiceCategory }) {
  const { slug = '' } = useParams();
  const service = findService(category, slug);

  const trail = useMemo(
    () =>
      service
        ? [
            { name: 'Home', path: '/' },
            { name: CATEGORY_LABEL[category], path: `/${category}` },
            { name: service.title, path: servicePath(service) },
          ]
        : [],
    [category, service]
  );

  const schemas = useMemo(() => (trail.length ? [breadcrumbSchema(trail)] : []), [trail]);

  // Unknown slug: render the 404 experience in place, keeping the requested URL.
  if (!service) return <NotFoundPage />;

  const formPartners = category === 'planos' ? healthPartners : insurerPartners;
  const partnersLabel = category === 'planos' ? 'Operadoras' : 'Seguradoras';
  const mappedLogos = partnersForServiceSlug(service.slug);
  const logoPartners = mappedLogos.length > 0 ? mappedLogos : partnersForCategory(category);
  const related = relatedServicesFor(service);
  const relatedIsInvestment = isInvestmentServiceSlug(service.slug);
  const Icon = service.icon;
  const heroAside = HERO_ASIDE_BY_SLUG[service.slug];

  return (
    <>
      <Seo title={service.title} description={service.metaDescription} schemas={schemas} />

      <PageHero
        eyebrow={CATEGORY_LABEL[category]}
        title={service.title}
        description={service.summary}
        trail={trail}
        actions={
          <>
            <Button href="#cotacao" external={false} variant="secondary" withArrow>
              Receber valores e coberturas
            </Button>
            <Button href={`tel:${company.phones[0].tel}`} external={false} variant="invert">
              <span className="inline-flex items-center gap-2.5">
                <Phone aria-hidden="true" className="size-4 text-brand-secondary" />
                {company.phones[0].display}
              </span>
            </Button>
          </>
        }
        aside={
          heroAside ? (
            <HeroAsideVisual src={heroAside.src} alt={heroAside.alt} />
          ) : (
            <div
              aria-hidden="true"
              className="hidden size-40 place-items-center rounded-xl border border-border-invert bg-surface-invert-elevated/70 text-brand-secondary lg:grid"
            >
              <Icon className="size-16" strokeWidth={1.2} />
            </div>
          )
        }
      />

      {/* Mirrors the live site’s OPERADORAS / SEGURADORAS block on each modality page. */}
      <Section id="parceiros" tone="sunken" tight aria-labelledby="parceiros-modalidade-titulo">
        <Reveal>
          <Eyebrow>{partnersLabel}</Eyebrow>
          <h2 id="parceiros-modalidade-titulo" className="mt-5 text-title font-extrabold text-balance">
            Companhias nesta modalidade
          </h2>
          <p className="measure mt-4 text-text-muted">
            Arte institucional das parceiras. A lista completa usada nos formulários de cotação
            permanece disponível na seção de valores e coberturas.
          </p>
        </Reveal>
        <div className="mt-10">
          <PartnerLogoGrid partners={logoPartners} labelledBy="parceiros-modalidade-titulo" />
        </div>
      </Section>

      {/* Catálogo + formulário. Nenhuma cobertura, carência, exclusão ou preço é
          publicada aqui: o site oficial da Xik não divulga essas informações. */}
      <Section id="cotacao" tone="base" bordered aria-labelledby="cotacao-titulo">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Valores e coberturas</Eyebrow>
            <h2 id="cotacao-titulo" className="mt-5 text-title font-extrabold text-balance">
              Receba o catálogo completo desta modalidade
            </h2>
            <p className="measure mt-5 text-lead text-text-muted">
              A Xik envia as informações completas sobre planos, valores e coberturas de cada{' '}
              {category === 'planos' ? 'operadora' : 'seguradora'} por e-mail ou WhatsApp, junto com
              a orientação de um consultor.
            </p>

            <div className="mt-9 border-t border-border pt-7">
              <h3 className="text-[0.6875rem] font-bold tracking-[0.2em] text-text-subtle uppercase">
                {partnersLabel} nos formulários de cotação
              </h3>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-text-muted">
                {formPartners.map((partner) => (
                  <li key={partner}>{partner}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal index={1}>
            <div className="rounded-xl border border-border bg-surface p-6 shadow-soft sm:p-9">
              <QuoteForm defaultSubject={service.title} sourceLabel={service.title} />
            </div>
          </Reveal>
        </div>
      </Section>

      {related.length ? (
        <Section tone="sunken" bordered tight aria-labelledby="relacionados-titulo">
          <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Também pode interessar</Eyebrow>
              <h2 id="relacionados-titulo" className="mt-5 text-title font-extrabold">
                {relatedIsInvestment
                  ? 'Outras modalidades em investimentos'
                  : `Outras modalidades em ${CATEGORY_LABEL[category].toLowerCase()}`}
              </h2>
            </div>
            {relatedIsInvestment ? null : (
              <Button to={`/${category}`} variant="ghost" withArrow>
                Ver todas
              </Button>
            )}
          </Reveal>

          <ul
            className={
              related.length === 2
                ? 'mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2'
                : 'mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3'
            }
          >
            {related.map((item, index) => (
              <Reveal as="li" key={item.slug} index={index} className="bg-surface">
                <Link
                  to={servicePath(item)}
                  className="group flex h-full flex-col gap-3 p-6 transition-colors duration-(--duration-base) hover:bg-surface-sunken"
                >
                  <span className="flex items-center justify-between gap-4">
                    <item.icon aria-hidden="true" className="size-5 text-brand-secondary-600" strokeWidth={1.6} />
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 text-text-subtle transition-transform duration-(--duration-base) ease-(--ease-out-brand) motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                    />
                  </span>
                  <span className="text-lg leading-tight font-bold tracking-[-0.02em]">
                    {item.title}
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Section>
      ) : null}

      <RecentBlogPostsSection tone={related.length ? 'base' : 'sunken'} />
    </>
  );
}
