import { useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { healthPlans, insurances } from '@/data/services';
import { useActiveSection } from '@/hooks/useActiveSection';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from './SectionHeading';
import { SolutionExplorerItem } from './SolutionExplorerItem';

const GROUPS = [
  {
    id: 'solucoes-planos',
    index: '01',
    label: 'Planos de saúde',
    count: healthPlans.length,
    /** Brief cue from the published health modalities: not a new claim. */
    blurb:
      'Empresariais e odontológicos. Cotação junto às operadoras e administradoras parceiras da Xik.',
  },
  {
    id: 'solucoes-seguros',
    index: '02',
    label: 'Seguros, consórcios e financiamentos',
    count: insurances.length,
    blurb:
      'Seguros, serviços e produtos financeiros intermediados pela Xik, com cotação nas parceiras.',
  },
] as const;

type GroupId = (typeof GROUPS)[number]['id'];

const GROUP_IDS: readonly GroupId[] = GROUPS.map((group) => group.id);

/**
 * Editorial solution explorer: sticky family rail with hover/click blurbs,
 * scroll-linked active state, and progressive reveals into each modality.
 */
export function SolutionsSection() {
  const activeGroup = useActiveSection(GROUP_IDS);
  const reduced = useReducedMotion();
  /** Mobile peek: which rail item has its blurb open after a tap (until scroll catches up). */
  const [peekedId, setPeekedId] = useState<GroupId | null>(null);
  /** Desktop: which item is hovered (independent of scroll-active). */
  const [hoveredId, setHoveredId] = useState<GroupId | null>(null);
  /** Tracks the active family last seen so a scroll change can drop a stale peek. */
  const [peekBaseline, setPeekBaseline] = useState(activeGroup);

  if (peekBaseline !== activeGroup) {
    setPeekBaseline(activeGroup);
    setPeekedId(null);
  }

  return (
    <Section
      id="solucoes"
      tone="sunken"
      edgeTop="gold-rule"
      aria-labelledby="solucoes-titulo"
    >
      <SectionHeading
        id="solucoes-titulo"
        eyebrow="O que a Xik intermedia"
        title="Planos de saúde e seguros escolhidos com critério, não por catálogo"
        description="Cada modalidade tem uma página própria com o que a Xik publica sobre ela e um formulário para receber valores e coberturas direto das operadoras e seguradoras."
        align="between"
        className="max-lg:gap-8"
        actions={
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button to="/planos" variant="ghost" withArrow className="w-full sm:w-auto">
              Planos de saúde
            </Button>
            <Button to="/seguros" variant="ghost" withArrow className="w-full sm:w-auto">
              Seguros
            </Button>
          </div>
        }
      />

      <div className="relative z-[1] mt-12 lg:mt-16 lg:grid lg:grid-cols-[minmax(15rem,19rem)_minmax(0,1fr)] lg:items-start lg:gap-12 xl:gap-16">
        <nav
          aria-label="Famílias de soluções"
          className={cn(
            'z-20 -mx-[var(--spacing-gutter)] mb-8 border-y border-border bg-surface/95 px-[var(--spacing-gutter)] shadow-soft backdrop-blur-md',
            'sticky top-[4.25rem]',
            'lg:top-28 lg:mx-0 lg:mb-0 lg:self-start lg:rounded-xl lg:border lg:border-border lg:bg-surface lg:px-4 lg:py-5 lg:shadow-soft lg:backdrop-blur-none'
          )}
        >
          <p className="mb-3 hidden text-[0.625rem] font-bold tracking-[0.22em] text-text-subtle uppercase lg:block">
            Navegue pelas famílias
          </p>
          <ul className="flex gap-2 overflow-x-auto py-3 [-ms-overflow-style:none] [scrollbar-width:none] lg:flex-col lg:gap-1 lg:overflow-visible lg:py-0 [&::-webkit-scrollbar]:hidden">
            {GROUPS.map((group) => {
              const isActive = activeGroup === group.id;
              const isHovered = hoveredId === group.id;
              // While a tap-peek is ahead of the scroll observer, prefer the peeked
              // family so two blurbs never open at once. Hover always wins on desktop.
              const blurbId =
                hoveredId ??
                (peekedId !== null && peekedId !== activeGroup ? peekedId : activeGroup);
              const showBlurb = group.id === blurbId;

              return (
                <li key={group.id} className="shrink-0 lg:w-full">
                  <a
                    href={`#${group.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    aria-expanded={showBlurb}
                    aria-describedby={showBlurb ? `${group.id}-blurb` : undefined}
                    onClick={() => setPeekedId(group.id)}
                    onMouseEnter={() => setHoveredId(group.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onFocus={() => setHoveredId(group.id)}
                    onBlur={() => setHoveredId(null)}
                    className={cn(
                      'group/nav relative flex min-h-11 flex-col rounded-md px-3.5 py-3 transition-[background-color,color,box-shadow,border-color] duration-(--duration-base) ease-(--ease-out-brand)',
                      'lg:border-l-2 lg:pl-4',
                      isActive
                        ? 'bg-brand-primary text-text-invert shadow-soft lg:border-brand-secondary lg:bg-transparent lg:text-brand-primary lg:shadow-none'
                        : 'text-text-muted hover:bg-surface-sunken/70 hover:text-brand-primary lg:border-transparent lg:hover:border-border-strong lg:hover:bg-transparent'
                    )}
                  >
                    <span className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className={cn(
                          'mt-0.5 font-mono text-[0.6875rem] tracking-widest tabular-nums transition-colors duration-(--duration-fast)',
                          isActive
                            ? 'text-brand-secondary lg:text-brand-secondary-700'
                            : isHovered
                              ? 'text-brand-secondary-700'
                              : 'text-text-subtle group-hover/nav:text-brand-secondary-700'
                        )}
                      >
                        {group.index}
                      </span>

                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span
                          className={cn(
                            'text-sm leading-snug font-semibold text-pretty transition-colors duration-(--duration-fast) lg:text-[0.9375rem]',
                            isActive && 'font-bold text-text-invert lg:text-brand-primary'
                          )}
                        >
                          {group.label}
                        </span>
                        <span className="hidden text-xs text-text-subtle lg:inline">
                          {group.count} modalidades
                        </span>
                      </span>

                      <span
                        className={cn(
                          'mt-0.5 rounded-full px-2 py-0.5 font-mono text-[0.625rem] tabular-nums lg:hidden',
                          isActive
                            ? 'bg-white/15 text-brand-secondary'
                            : 'bg-surface-sunken text-text-subtle'
                        )}
                      >
                        {group.count}
                      </span>
                    </span>

                    <span
                      id={`${group.id}-blurb`}
                      className={cn(
                        'grid transition-[grid-template-rows,opacity] duration-(--duration-base) ease-(--ease-out-brand)',
                        showBlurb ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      )}
                    >
                      <span className="overflow-hidden">
                        <span
                          className={cn(
                            'mt-2.5 block max-w-[16rem] border-t pt-2.5 text-xs leading-relaxed lg:max-w-none',
                            isActive
                              ? 'border-white/20 text-text-invert-muted lg:border-border/80 lg:text-text-muted'
                              : 'border-border/80 text-text-muted'
                          )}
                        >
                          {group.blurb}
                        </span>
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex flex-col gap-16 lg:gap-24">
          <SolutionFamily
            id="solucoes-planos"
            index="01"
            title="Planos de Saúde"
            lead="Quatro modalidades publicadas pela Xik: cada cartão leva à página com o texto da corretora e o formulário de cotação."
            isActive={activeGroup === 'solucoes-planos'}
            reduced={Boolean(reduced)}
            showEyebrow={false}
          >
            <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6">
              {healthPlans.map((service, index) => (
                <Reveal as="li" key={service.slug} index={index} className="flex">
                  <SolutionExplorerItem
                    service={service}
                    position={index + 1}
                    variant="feature"
                  />
                </Reveal>
              ))}
            </ul>
          </SolutionFamily>

          <SolutionFamily
            id="solucoes-seguros"
            index="02"
            eyebrow="Seguros, consórcios e financiamentos"
            title="Do automóvel à previdência, incluindo consórcios e financiamentos"
            lead="Oito modalidades em lista contínua, com a mesma lógica de página própria e cotação, em leitura mais densa."
            isActive={activeGroup === 'solucoes-seguros'}
            reduced={Boolean(reduced)}
          >
            <ul className="flex flex-col gap-3">
              {insurances.map((service, index) => (
                <Reveal as="li" key={service.slug} index={index}>
                  <SolutionExplorerItem
                    service={service}
                    position={healthPlans.length + index + 1}
                    variant="compact"
                  />
                </Reveal>
              ))}
            </ul>
          </SolutionFamily>
        </div>
      </div>
    </Section>
  );
}

function SolutionFamily({
  id,
  index,
  eyebrow,
  title,
  lead,
  isActive,
  reduced,
  showEyebrow = true,
  children,
}: {
  id: string;
  index: string;
  eyebrow?: string;
  title: string;
  lead: string;
  isActive: boolean;
  reduced: boolean;
  /** When false, only the index numeral appears above the title (planos block). */
  showEyebrow?: boolean;
  children: ReactNode;
}) {
  return (
    <motion.div
      id={id}
      className="scroll-mt-40 lg:scroll-mt-32"
      animate={
        reduced
          ? undefined
          : {
              opacity: isActive ? 1 : 0.55,
              y: isActive ? 0 : 6,
            }
      }
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Reveal as="header" className="mb-7 flex flex-col gap-3 border-b border-border pb-6">
        <div>
          <p
            className={cn(
              'flex items-center gap-3 font-mono text-[0.6875rem] tracking-widest tabular-nums',
              showEyebrow
                ? 'font-bold text-brand-secondary-700 uppercase'
                : 'text-brand-secondary-700'
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'transition-colors duration-(--duration-fast)',
                isActive ? 'text-brand-secondary-700' : 'text-text-subtle'
              )}
            >
              {index}
            </span>
            {showEyebrow && eyebrow ? <span>{eyebrow}</span> : null}
          </p>
          <h3 className="mt-3 max-w-xl text-title font-extrabold text-balance">{title}</h3>
          <p className="measure mt-3 text-sm leading-relaxed text-text-muted sm:text-[0.9375rem]">
            {lead}
          </p>
        </div>
      </Reveal>
      {children}
    </motion.div>
  );
}
