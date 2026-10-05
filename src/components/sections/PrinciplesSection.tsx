import { useState } from 'react';
import officeInterior from '@/assets/marketing/xik-interna.webp';
import { company } from '@/data/company';
import { cn } from '@/lib/cn';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

const PRINCIPLES = [
  {
    label: 'Missão',
    lead: 'O que orienta cada escolha',
    content: company.mission,
  },
  {
    label: 'Visão',
    lead: 'Para quem a especialização deve fazer diferença',
    content: company.vision,
  },
  {
    label: 'Valores',
    lead: 'Como a relação é conduzida',
    content: null,
  },
] as const;

const ordinal = (index: number) => String(index + 1).padStart(2, '0');
const count = (value: number) => String(value).padStart(2, '0');

/**
 * Guided reading of the verified institutional principles. The visitor chooses
 * a step or advances through the sequence, rather than scanning three generic
 * blocks at once.
 */
export function PrinciplesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = PRINCIPLES[activeIndex];
  const previous = PRINCIPLES[activeIndex - 1];
  const next = PRINCIPLES[activeIndex + 1];

  return (
    <section
      aria-labelledby="principios-titulo"
      className="relative isolate overflow-x-clip border-t border-border bg-surface-sunken text-text"
      style={{ paddingBlock: 'var(--spacing-section)' }}
    >
      <Container>
        <div className="lg:grid lg:grid-cols-[17rem_minmax(0,1fr)] lg:items-start lg:gap-x-16 xl:grid-cols-[20rem_minmax(0,1fr)] xl:gap-x-24">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Eyebrow>Princípios</Eyebrow>
              <h2 id="principios-titulo" className="mt-5 text-display font-extrabold text-balance">
                O que sustenta uma relação de confiança
              </h2>
              <p className="mt-5 max-w-[30ch] text-base leading-relaxed text-text-muted">
                Escolha um princípio para conhecer a forma como a XIK apresenta sua atuação.
              </p>

              <ol className="mt-10 flex gap-2 lg:flex-col lg:gap-1.5">
                {PRINCIPLES.map((principle, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <li key={principle.label} className="flex-1">
                      <button
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        aria-current={isActive ? 'step' : undefined}
                        aria-controls="principio-conteudo"
                        className={cn(
                          'group flex min-h-11 w-full items-center gap-3 rounded-sm border px-3 py-2 text-left transition-colors duration-(--duration-base) focus-visible:outline-offset-2 lg:px-4',
                          isActive
                            ? 'border-brand-secondary-600 bg-brand-primary text-text-invert'
                            : 'border-transparent text-text-muted hover:border-border-strong hover:bg-surface'
                        )}
                      >
                        <span
                          className={cn(
                            'text-[0.6875rem] font-bold tracking-[0.16em] tabular-nums',
                            isActive ? 'text-brand-secondary-300' : 'text-text-subtle group-hover:text-brand-secondary-700'
                          )}
                        >
                          {ordinal(index)}
                        </span>
                        <span className="text-sm font-bold">{principle.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-8 lg:mt-0 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,0.72fr)] lg:gap-10 xl:gap-14">
            <Reveal>
              <article
                id="principio-conteudo"
                aria-live="polite"
                aria-label={`${active.label}, etapa ${activeIndex + 1} de ${PRINCIPLES.length}`}
                className="flex min-h-full flex-col border-t border-brand-secondary-600 pt-5 sm:pt-7"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[0.6875rem] font-bold tracking-[0.18em] text-brand-secondary-700 uppercase">
                    {count(activeIndex + 1)} de {count(PRINCIPLES.length)}
                  </p>
                  <span className="h-px flex-1 bg-border-strong" />
                  <p className="text-[0.6875rem] font-bold tracking-[0.16em] text-text-subtle uppercase">
                    {active.label}
                  </p>
                </div>

                <h3 className="mt-8 text-title font-extrabold text-balance">{active.lead}</h3>

                {active.content ? (
                  <p className="mt-6 max-w-[52ch] text-lead leading-relaxed">{active.content}</p>
                ) : (
                  <ol className="mt-7 border-t border-border-strong">
                    {company.values.map((value, index) => (
                      <li key={value} className="flex gap-4 border-b border-border py-4 sm:gap-5 sm:py-5">
                        <span className="mt-1 text-[0.6875rem] font-bold tracking-[0.16em] text-brand-secondary-700 tabular-nums">
                          {ordinal(index)}
                        </span>
                        <span className="max-w-[48ch] text-base leading-relaxed text-text sm:text-[1.0625rem]">{value}</span>
                      </li>
                    ))}
                  </ol>
                )}

                <nav aria-label="Navegação entre os princípios" className="mt-10 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveIndex((index) => index - 1)}
                    disabled={!previous}
                    className="min-h-11 rounded-sm border border-border-strong px-4 text-sm font-bold text-brand-primary transition-colors duration-(--duration-fast) enabled:hover:border-brand-secondary-600 enabled:hover:bg-surface disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    {previous ? `Voltar para ${previous.label}` : 'Início do percurso'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveIndex((index) => index + 1)}
                    disabled={!next}
                    className="min-h-11 rounded-sm bg-brand-primary px-4 text-sm font-bold text-text-invert transition-colors duration-(--duration-fast) enabled:hover:bg-brand-primary-600 disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    {next ? `Avançar para ${next.label}` : 'Fim do percurso'}
                  </button>
                </nav>
              </article>
            </Reveal>

            <Reveal index={1} className="lg:sticky lg:top-28">
              <figure className="overflow-hidden rounded-xl border border-border bg-surface shadow-soft">
                <img
                  src={officeInterior}
                  alt="Sala de reuniões da XIK SEGUROS com mesa, cadeiras e identidade visual da marca"
                  width={2160}
                  height={2880}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover object-center lg:aspect-[4/5]"
                />
                <figcaption className="border-t border-border bg-surface px-4 py-3 text-sm font-semibold text-brand-primary">
                  Um espaço para conversas que pedem atenção.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
