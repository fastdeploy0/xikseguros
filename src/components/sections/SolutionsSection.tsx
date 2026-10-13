import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { findService, healthPlans, servicePath } from '@/data/services';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

const travel = findService('seguros', 'seguro-viagem');
const pension = findService('seguros', 'seguro-previdencia-privada');

const GOLD_GRADIENT =
  'bg-linear-to-r from-brand-secondary-300 via-brand-secondary to-brand-secondary-600';

const CLOSING_LINK =
  '-my-3 inline-block px-1 py-3 font-semibold text-brand-secondary-300 underline underline-offset-[3px]';

/**
 * Home "O que a Xik intermedia": the two health plans face each other on navy.
 * The panel under hover, focus or touch turns lighter navy, gets a gold top
 * rule and a gold label, and grows on desktop. Nothing is hidden at rest.
 */
export function SolutionsSection() {
  return (
    <Section
      id="solucoes"
      tone="invert"
      tight
      aria-labelledby="solucoes-titulo"
      backdrop={
        <>
          <div aria-hidden="true" className="surface-grid-invert absolute inset-0" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_50%_0%,color-mix(in_oklab,var(--color-brand-secondary)_18%,transparent),transparent_60%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-brand-secondary)_30%,var(--color-brand-secondary)_70%,transparent)]"
          />
        </>
      }
    >
      <Reveal as="header" className="mb-7 lg:mb-10 xl:mb-11">
        <p className="flex items-center gap-2.5 font-mono text-[0.625rem] leading-[1.3] font-semibold tracking-[0.16em] text-brand-secondary-300 uppercase lg:gap-3 lg:text-[0.6875rem] lg:leading-none lg:tracking-[0.18em]">
          <span aria-hidden="true" className="h-px w-[22px] shrink-0 bg-brand-secondary lg:w-7" />
          O que a Xik intermedia
        </p>
        <h2
          id="solucoes-titulo"
          className="mt-3.5 text-[clamp(2.375rem,4.2vw,3.75rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-text-invert lg:mt-4 xl:mt-[18px]"
        >
          Planos de Saúde
        </h2>
      </Reveal>

      <Reveal>
        {/* Equal rows below lg; on lg the flex row stretches both panels to one height and
            the summary is sized to the narrow panel so growing never reflows the text. */}
        <ul className="grid auto-rows-fr gap-3 lg:@container lg:flex lg:gap-4">
          {healthPlans.map((service, index) => {
            const Icon = service.icon;
            return (
              <li
                key={service.slug}
                className="group flex lg:flex-1 lg:transition-[flex-grow] lg:duration-(--duration-slow) lg:ease-(--ease-out-brand) lg:focus-within:grow-[1.35] lg:hover:grow-[1.35] motion-reduce:transition-none"
              >
                <Link
                  to={servicePath(service)}
                  className="relative flex w-full flex-col gap-5 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] px-5 pt-[22px] pb-4 text-text-invert transition-[background-color,transform] duration-(--duration-base) ease-(--ease-out-brand) group-focus-within:bg-surface-invert-elevated hover:bg-surface-invert-elevated active:scale-[0.99] active:bg-brand-primary motion-reduce:active:scale-100 lg:gap-8 lg:px-9 lg:pt-9 lg:pb-8"
                >
                  <span
                    aria-hidden="true"
                    className={`${GOLD_GRADIENT} absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-(--duration-slow) ease-(--ease-out-brand) group-focus-within:scale-x-100 group-hover:scale-x-100 group-active:scale-x-100 motion-reduce:transition-none`}
                  />

                  <span className="flex items-start justify-between">
                    <span className="inline-flex size-11 items-center justify-center rounded-md border border-brand-secondary/50 text-brand-secondary-300 lg:size-12">
                      <Icon aria-hidden="true" className="size-[22px] lg:size-6" strokeWidth={1.7} />
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-base font-semibold tracking-[0.14em] text-brand-secondary-300 tabular-nums lg:text-lg"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </span>

                  <span className="flex flex-1 flex-col gap-2.5 lg:gap-3">
                    {/* Bottom padding keeps descenders inside the box the gradient is clipped to. */}
                    <h3
                      className={`${GOLD_GRADIENT} bg-clip-text pb-[0.12em] text-[2.25rem] leading-[1.02] font-extrabold tracking-[-0.03em] text-text-invert transition-colors duration-(--duration-base) ease-(--ease-out-brand) group-focus-within:text-transparent group-hover:text-transparent group-active:text-transparent lg:text-[clamp(2.75rem,3.9vw,3.5rem)]`}
                    >
                      {service.label}
                    </h3>
                    <span className="-mt-[0.12em] text-base leading-[1.3] font-semibold text-text-invert lg:text-[1.0625rem]">
                      {service.title}
                    </span>
                    {service.summary ? (
                      <p className="max-w-[460px] text-[0.9375rem] lg:max-w-[min(460px,calc((100cqw-1rem)/2.35-4.5rem-2px))] leading-[1.55] text-text-invert-muted lg:text-base lg:leading-[1.6]">
                        {service.summary}
                      </p>
                    ) : null}
                    <span className="mt-auto inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold text-brand-secondary-300 lg:min-h-0 lg:pt-1.5">
                      Ver detalhes
                      <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Reveal>

      {travel && pension ? (
        <p className="mt-5 text-[0.8125rem] leading-normal text-pretty text-text-invert-muted lg:mt-8 xl:mt-9">
          A Xik também intermedia:{' '}
          <Link to={servicePath(travel)} className={CLOSING_LINK}>
            {travel.label}
          </Link>{' '}
          {/* Kept together so "e" never ends a line on its own. */}
          <span className="whitespace-nowrap">
            e{' '}
            <Link to={servicePath(pension)} className={CLOSING_LINK}>
              {pension.label}
            </Link>
          </span>
        </p>
      ) : null}
    </Section>
  );
}
