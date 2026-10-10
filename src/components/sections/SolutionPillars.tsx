import { useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';
import { insurances, servicePath, type Service } from '@/data/services';
import { isInvestmentServiceSlug } from '@/data/navigation';

/** Same split as the main menu: Seguros x Investimentos (INVESTMENT_SLUGS). */
const PILLARS = [
  {
    id: 'seguros',
    label: 'Seguros',
    services: insurances.filter((service) => !isInvestmentServiceSlug(service.slug)),
  },
  {
    id: 'investimentos',
    label: 'Investimentos',
    services: insurances.filter((service) => isInvestmentServiceSlug(service.slug)),
  },
] as const;

/** Matches Tailwind `md`: pillars side by side from here, tabs below. */
const SIDE_BY_SIDE = '(min-width: 48rem)';

function subscribe(onChange: () => void) {
  const query = window.matchMedia(SIDE_BY_SIDE);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

/**
 * Família 02 em dois pilares. Cada linha é um disclosure: hover (mouse) abre,
 * clique/Enter/Espaço alternam; uma linha aberta por pilar. Abaixo de `md`,
 * os pilares viram abas para encurtar a rolagem no celular.
 */
export function SolutionPillars() {
  const sideBySide = useSyncExternalStore(subscribe, () => window.matchMedia(SIDE_BY_SIDE).matches);
  const [tab, setTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  if (sideBySide) {
    return (
      <div className="grid items-start gap-6 md:grid-cols-2">
        {PILLARS.map((pillar) => (
          <section key={pillar.id} aria-labelledby={`pilar-${pillar.id}-titulo`}>
            <h4
              id={`pilar-${pillar.id}-titulo`}
              className="mb-3 flex items-center gap-2.5 text-[0.9375rem] font-bold text-brand-primary"
            >
              {pillar.label}
              <PillarCount count={pillar.services.length} />
            </h4>
            <PillarList services={pillar.services} />
          </section>
        ))}
      </div>
    );
  }

  const onTabKey = (event: KeyboardEvent) => {
    const last = PILLARS.length - 1;
    const next =
      event.key === 'ArrowRight'
        ? (tab + 1) % PILLARS.length
        : event.key === 'ArrowLeft'
          ? (tab - 1 + PILLARS.length) % PILLARS.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    setTab(next);
    tabRefs.current[next]?.focus();
  };

  const pillar = PILLARS[tab];

  return (
    <div>
      <div
        role="tablist"
        className="mb-4 flex gap-1 rounded-xl border border-border bg-surface p-1 shadow-soft"
      >
        {PILLARS.map((item, index) => {
          const selected = index === tab;
          return (
            <button
              key={item.id}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={`pilar-${item.id}-aba`}
              aria-selected={selected}
              aria-controls={`pilar-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(index)}
              onKeyDown={onTabKey}
              className={cn(
                'flex min-h-11 flex-1 items-center justify-center gap-2 rounded-md px-3 text-sm font-semibold transition-[background-color,color] duration-(--duration-base) ease-(--ease-out-brand)',
                selected
                  ? 'bg-brand-primary text-text-invert shadow-soft'
                  : 'text-text-muted hover:bg-surface-sunken/70 hover:text-brand-primary'
              )}
            >
              {item.label}
              <PillarCount count={item.services.length} invert={selected} />
            </button>
          );
        })}
      </div>
      <div role="tabpanel" id={`pilar-${pillar.id}`} aria-labelledby={`pilar-${pillar.id}-aba`}>
        <PillarList key={pillar.id} services={pillar.services} />
      </div>
    </div>
  );
}

function PillarCount({ count, invert = false }: { count: number; invert?: boolean }) {
  return (
    <span
      className={cn(
        'rounded-full px-2 py-0.5 font-mono text-[0.625rem] font-normal tabular-nums',
        invert ? 'bg-white/15 text-brand-secondary' : 'bg-surface-sunken text-text-subtle'
      )}
    >
      {count}
    </span>
  );
}

function PillarList({ services }: { services: readonly Service[] }) {
  const reduced = useReducedMotion();
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(null);
  // Hover opens only on real mouse movement into a new row, so a layout shift
  // under a still cursor never opens anything and a click can still close.
  const hovered = useRef<number | null>(null);
  // Row the mouse just opened: its first mouse click keeps it open instead of closing it.
  const hoverOpened = useRef<number | null>(null);

  return (
    <ul
      className="rounded-xl border border-border bg-surface shadow-soft"
      onPointerLeave={() => {
        hovered.current = null;
      }}
    >
      {services.map((service, index) => {
        const Icon = service.icon;
        const isOpen = open === index;
        const buttonId = `${baseId}-${service.slug}`;
        const panelId = `${buttonId}-painel`;
        const linkId = `${buttonId}-link`;

        return (
          <li
            key={service.slug}
            onPointerMove={(event) => {
              if (event.pointerType !== 'mouse' || hovered.current === index) return;
              hovered.current = index;
              hoverOpened.current = index;
              setOpen(index);
            }}
            className={cn(
              'border-b border-border transition-colors duration-(--duration-base) ease-(--ease-out-brand) first:rounded-t-xl last:rounded-b-xl last:border-b-0',
              isOpen && 'bg-surface-sunken/60'
            )}
          >
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={(event) => {
                const keepHoverOpen = event.detail > 0 && hoverOpened.current === index;
                hoverOpened.current = null;
                if (!keepHoverOpen) setOpen(isOpen ? null : index);
              }}
              className="group flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-3 text-left sm:px-4"
            >
              <span
                aria-hidden="true"
                className={cn(
                  'w-5 shrink-0 font-mono text-[0.6875rem] tracking-widest tabular-nums transition-colors duration-(--duration-fast)',
                  isOpen ? 'text-brand-secondary-700' : 'text-text-subtle'
                )}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="grid size-9 shrink-0 place-items-center rounded-md border border-border bg-surface text-brand-primary">
                <Icon aria-hidden="true" className="size-4" strokeWidth={1.6} />
              </span>
              <span
                className={cn(
                  'min-w-0 flex-1 text-[0.9375rem] leading-snug font-bold tracking-[-0.02em] text-pretty transition-colors duration-(--duration-fast) group-hover:text-brand-primary',
                  isOpen && 'text-brand-primary'
                )}
              >
                {service.title}
              </span>
              <ChevronDown
                aria-hidden="true"
                className={cn(
                  'size-4 shrink-0 text-text-subtle transition-transform duration-(--duration-base) ease-(--ease-out-brand)',
                  isOpen && 'rotate-180 text-brand-secondary-700'
                )}
              />
            </button>

            <motion.div
              id={panelId}
              inert={!isOpen}
              initial={false}
              // Reduce: opacity stays 1 (height 0 + inert already hide it), so no faded frame.
              animate={{ height: isOpen ? 'auto' : 0, opacity: reduced || isOpen ? 1 : 0 }}
              transition={reduced ? { duration: 0 } : { duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pr-4 pb-4 pl-[4.25rem] sm:pl-[4.75rem]">
                {service.summary ? (
                  <p className="text-sm leading-relaxed text-text-muted">{service.summary}</p>
                ) : null}
                <Link
                  to={servicePath(service)}
                  id={linkId}
                  aria-labelledby={`${linkId} ${buttonId}`}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-sm text-sm font-semibold text-brand-primary transition-colors duration-(--duration-fast) hover:text-brand-secondary-700"
                >
                  Ver detalhes
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </motion.div>
          </li>
        );
      })}
    </ul>
  );
}
