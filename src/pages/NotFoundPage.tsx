import { Link } from 'react-router-dom';
import { healthPlans, insurances, servicePath } from '@/data/services';
import { primaryCta } from '@/data/navigation';
import { Seo } from '@/components/Seo';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';

/** Suggests the real destinations most visitors are looking for. */
const suggestions = [
  { label: 'Página inicial', to: '/' },
  { label: 'A Empresa', to: '/a-empresa' },
  { label: 'Planos de Saúde', to: '/planos' },
  { label: 'Seguros', to: '/seguros' },
  { label: 'Fale Conosco', to: '/fale-conosco' },
];

export default function NotFoundPage() {
  const popular = [healthPlans[0], insurances[0], insurances[1]];

  return (
    <>
      <Seo
        title="Página não encontrada"
        description="A página que você procura não existe ou foi movida. Veja os caminhos disponíveis no site da XIK SEGUROS."
        index={false}
      />

      <section className="on-invert relative isolate overflow-hidden bg-surface-invert text-text-invert">
        <div aria-hidden="true" className="surface-grid-invert absolute inset-0 opacity-60" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/3 size-96 opacity-25 brand-glow"
        />

        <Container className="relative py-20 lg:py-28">
          <Eyebrow invert>Erro 404</Eyebrow>
          <h1 className="mt-6 max-w-3xl text-display font-extrabold text-balance">
            Esta página não existe mais neste endereço
          </h1>
          <p className="measure mt-6 text-lead text-text-invert-muted">
            O link pode estar incorreto ou o conteúdo pode ter mudado de lugar na reformulação do
            site. Abaixo estão os caminhos disponíveis.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button to="/" variant="secondary" size="lg" withArrow>
              Voltar para a home
            </Button>
            <Button to={primaryCta.to} variant="invert" size="lg">
              {primaryCta.label}
            </Button>
          </div>

          <nav aria-label="Páginas principais" className="mt-16 border-t border-border-invert pt-8">
            <h2 className="text-[0.6875rem] font-bold tracking-[0.2em] text-brand-secondary uppercase">
              Páginas principais
            </h2>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
              {suggestions.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex min-h-11 items-center rounded-sm font-semibold text-text-invert-muted underline-offset-4 transition-colors duration-(--duration-fast) hover:text-brand-secondary hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Modalidades mais procuradas" className="mt-10">
            <h2 className="text-[0.6875rem] font-bold tracking-[0.2em] text-brand-secondary uppercase">
              Modalidades
            </h2>
            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-2">
              {popular.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={servicePath(service)}
                    className="inline-flex min-h-11 items-center rounded-sm font-semibold text-text-invert-muted underline-offset-4 transition-colors duration-(--duration-fast) hover:text-brand-secondary hover:underline"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </section>
    </>
  );
}
