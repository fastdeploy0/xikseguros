import { useMemo } from 'react';
import { CircleCheck } from 'lucide-react';
import { company } from '@/data/company';
import { healthPlans, insurances } from '@/data/services';
import { breadcrumbSchema } from '@/lib/seo';
import { Seo } from '@/components/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { QuoteForm } from '@/components/sections/QuoteForm';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';

const trail = [
  { name: 'Home', path: '/' },
  { name: 'Faça sua Cotação', path: '/faca-sua-cotacao' },
];

/** Steps described by the Xik on its own quotation page. */
const steps = [
  'Você preenche os dados e indica a modalidade de interesse.',
  'A equipe da Xik recebe as informações e analisa o seu caso.',
  'Um consultor entra em contato para orientar a escolha do produto.',
];

export default function QuotePage() {
  const schemas = useMemo(() => [breadcrumbSchema(trail)], []);

  return (
    <>
      <Seo
        title="Faça sua Cotação"
        description="Preencha sua cotação online e receba o contato de um consultor da XIK SEGUROS para escolher o melhor plano de saúde ou seguro."
        schemas={schemas}
      />

      <PageHero
        eyebrow="Faça sua cotação"
        title="Encontre planos e seguros com o melhor custo x benefício"
        description="Você está à procura de um plano de saúde ou seguro? Preencha os dados abaixo e a equipe da Xik entra em contato para ajudar na escolha do melhor produto."
        trail={trail}
      />

      <Section tone="base" aria-labelledby="formulario-titulo">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Como funciona</Eyebrow>
            <h2 id="formulario-titulo" className="mt-5 text-title font-extrabold text-balance">
              Preencha o formulário
            </h2>

            <ol className="mt-9 flex flex-col">
              {steps.map((step, index) => (
                <li key={step} className="flex gap-5 border-b border-border py-5 last:border-b-0">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-border-strong font-mono text-xs text-brand-primary tabular-nums"
                  >
                    {index + 1}
                  </span>
                  <span className="text-[0.9375rem] leading-relaxed text-text-muted">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-9 border-t border-border pt-7">
              <h3 className="text-[0.6875rem] font-bold tracking-[0.2em] text-text-subtle uppercase">
                Modalidades disponíveis
              </h3>
              <ul className="mt-4 flex flex-col gap-2">
                {[...healthPlans, ...insurances].map((service) => (
                  <li key={service.slug} className="flex items-center gap-2.5 text-sm text-text-muted">
                    <CircleCheck aria-hidden="true" className="size-4 shrink-0 text-brand-secondary-600" />
                    {service.title}
                  </li>
                ))}
                <li className="flex items-center gap-2.5 text-sm text-text-muted">
                  <CircleCheck aria-hidden="true" className="size-4 shrink-0 text-brand-secondary-600" />
                  Seguro Placa Solar
                </li>
              </ul>
            </div>

            <p className="mt-9 text-sm text-text-subtle">
              Dúvidas? Ligue para{' '}
              <a
                href={`tel:${company.phones[0].tel}`}
                className="font-semibold text-brand-primary underline underline-offset-4"
              >
                {company.phones[0].display}
              </a>
              .
            </p>
          </Reveal>

          <Reveal index={1}>
            <div className="rounded-xl border border-border bg-surface p-6 shadow-soft sm:p-9">
              <QuoteForm sourceLabel="Faça sua cotação" />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
