import { useMemo, useState } from 'react';
import { Car, Home, type LucideIcon } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  consortiumKindLabel,
  consortiumPricingRows,
  formatBrl,
  formatCreditLabel,
  type ConsortiumKind,
  type ConsortiumPricingRow,
} from '@/data/consortium-pricing';
import { resolveHomeCampaign } from '@/data/campaigns';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from './SectionHeading';

type FilterId = 'todos' | ConsortiumKind;

const FILTERS: { id: FilterId; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'auto', label: 'Auto' },
  { id: 'imovel', label: 'Imóvel' },
];

const KIND_ICON: Record<ConsortiumKind, LucideIcon> = {
  auto: Car,
  imovel: Home,
};

/**
 * Interactive consortium pricing table: values from campaign creatives,
 * no flyer images. Between Partners and Solutions on the home.
 * Omitted when the campaign is inactive, expired (`endsAt`), or `pricing` is null.
 */
export function ConsortiumPricingSection() {
  const reduced = useReducedMotion();
  const campaign = resolveHomeCampaign();
  const pricing = campaign?.pricing ?? null;
  const [filter, setFilter] = useState<FilterId>('todos');
  const [activeId, setActiveId] = useState<string | null>(null);

  const rows = useMemo(
    () =>
      filter === 'todos'
        ? consortiumPricingRows
        : consortiumPricingRows.filter((row) => row.kind === filter),
    [filter]
  );

  if (!campaign || !pricing) return null;

  return (
    <Section
      id="tabela-consorcio"
      tone="sunken"
      bordered
      tight
      aria-labelledby="tabela-consorcio-titulo"
    >
      <SectionHeading
        id="tabela-consorcio-titulo"
        eyebrow={pricing.eyebrow}
        title={pricing.title}
        description={pricing.description}
        align="between"
        className="max-lg:gap-6"
        actions={
          <Button to={campaign.ctaTo} variant="primary" withArrow className="w-full sm:w-auto">
            {campaign.ctaLabel}
          </Button>
        }
      />

      <Reveal index={0} className="relative z-[1] mt-8 lg:mt-10">
        <div
          role="tablist"
          aria-label="Filtrar por tipo de consórcio"
          className="mb-5 flex flex-wrap gap-2"
        >
          {FILTERS.map((item) => {
            const selected = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setFilter(item.id)}
                className={cn(
                  'rounded-md border px-4 py-2 text-sm font-semibold transition-colors duration-(--duration-fast)',
                  selected
                    ? 'border-brand-primary bg-brand-primary text-text-invert'
                    : 'border-border bg-surface text-text-muted hover:border-border-strong hover:text-brand-primary'
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-border bg-surface-sunken/80">
                  <th
                    scope="col"
                    className="px-4 py-3 text-[0.6875rem] font-bold tracking-[0.16em] text-text-subtle uppercase sm:px-5"
                  >
                    Crédito
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-[0.6875rem] font-bold tracking-[0.16em] text-text-subtle uppercase sm:px-5"
                  >
                    Tipo
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 text-[0.6875rem] font-bold tracking-[0.16em] text-text-subtle uppercase sm:px-5"
                  >
                    Parcela
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence initial={false} mode="popLayout">
                  {rows.map((row, index) => (
                    <PricingRow
                      key={row.id}
                      row={row}
                      index={index}
                      reduced={Boolean(reduced)}
                      discountBadge={pricing.discountBadge}
                      isActive={activeId === row.id}
                      onActivate={() => setActiveId(row.id)}
                      onDeactivate={() =>
                        setActiveId((current) => (current === row.id ? null : current))
                      }
                    />
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>

          <p className="border-t border-border px-4 py-3 text-xs leading-relaxed text-text-subtle sm:px-5">
            {pricing.footnote}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

function PricingRow({
  row,
  index,
  reduced,
  discountBadge,
  isActive,
  onActivate,
  onDeactivate,
}: {
  row: ConsortiumPricingRow;
  index: number;
  reduced: boolean;
  discountBadge: string;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const Icon = KIND_ICON[row.kind];

  return (
    <motion.tr
      layout
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: -6 }}
      transition={{ duration: 0.28, delay: reduced ? 0 : index * 0.025, ease: [0.22, 1, 0.36, 1] }}
      tabIndex={0}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      className={cn(
        'group cursor-default border-b border-border/80 outline-none last:border-b-0',
        'transition-[background-color,box-shadow] duration-(--duration-fast)',
        isActive
          ? 'bg-brand-primary/[0.06] shadow-[inset_3px_0_0_var(--color-brand-secondary)]'
          : 'hover:bg-brand-primary/[0.04] focus-visible:bg-brand-primary/[0.06] focus-visible:shadow-[inset_3px_0_0_var(--color-brand-secondary)]'
      )}
    >
      <td className="px-4 py-3.5 sm:px-5 sm:py-4">
        <span className="text-base font-extrabold tracking-[-0.02em] text-brand-primary sm:text-lg">
          {formatCreditLabel(row.credit)}
        </span>
      </td>

      <td className="px-4 py-3.5 sm:px-5 sm:py-4">
        <span
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold tracking-[0.06em] uppercase',
            row.kind === 'auto'
              ? 'border-brand-primary/25 bg-brand-primary/5 text-brand-primary'
              : 'border-brand-secondary/45 bg-brand-secondary/10 text-brand-primary'
          )}
        >
          <Icon aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
          {consortiumKindLabel[row.kind]}
        </span>
      </td>

      <td className="px-4 py-3.5 sm:px-5 sm:py-4">
        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <span className="text-sm text-text-subtle line-through decoration-[rgb(185_28_28_/0.85)]">
            {formatBrl(row.installmentBefore)}
          </span>
          <span className="text-xs font-semibold text-text-subtle">por</span>
          <motion.span
            className="inline-flex items-baseline gap-1 text-base font-extrabold tracking-[-0.02em] text-brand-secondary-700 sm:text-lg"
            animate={
              reduced || !isActive
                ? { scale: 1, opacity: 1 }
                : { scale: [1, 1.04, 1], opacity: [1, 0.92, 1] }
            }
            transition={
              reduced || !isActive
                ? { duration: 0.2 }
                : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            {formatBrl(row.installmentAfter)}
          </motion.span>
          <span
            className={cn(
              'rounded-full border border-brand-secondary/40 bg-brand-secondary/10 px-2 py-0.5 text-[0.625rem] font-bold tracking-[0.1em] text-brand-primary uppercase transition-opacity duration-(--duration-fast)',
              isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'
            )}
          >
            {discountBadge}
          </span>
        </div>
      </td>
    </motion.tr>
  );
}
