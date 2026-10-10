import { useRef, useState } from 'react';
import type {
  FocusEvent as ReactFocusEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { consortiumSimulationOptions } from '@/data/consortium-simulation';
import { resolveQuickQuotes, type QuickQuoteItem, type QuickQuoteSlug } from '@/data/quick-quotes';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ConsortiumSimulationModal } from './ConsortiumSimulationModal';
import { SectionHeading } from './SectionHeading';

/**
 * Permanent home rail: cotação online.
 * All cards open their corresponding Porto quotation in a new tab.
 */
export function QuickQuoteSection() {
  const items = resolveQuickQuotes();
  const [activeSlug, setActiveSlug] = useState<QuickQuoteSlug | null>(null);

  if (items.length === 0) return null;

  return (
    <Section
      id="cotacao-rapida"
      tabIndex={-1}
      tone="surface"
      className="@container"
      edgeTop="gold-rule"
      edgeBottom="fade-to-sunken"
      aria-labelledby="cotacao-rapida-titulo"
    >
      <SectionHeading
        id="cotacao-rapida-titulo"
        eyebrow="Cotação online"
        title="Cotar Agora"
        description="Escolha o produto para cotar online na Porto. O link abre em uma nova aba."
      />

      <ConsortiumHighlight />

      <ul className="mt-10 grid list-none gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
        {items.map((item, index) => (
          <Reveal key={item.slug} index={index} as="li">
            <QuickQuoteCard
              item={item}
              position={index + 1}
              isActive={activeSlug === item.slug}
              isDimmed={activeSlug !== null && activeSlug !== item.slug}
              onActivate={() => setActiveSlug(item.slug)}
              onDeactivate={() =>
                setActiveSlug((current) => (current === item.slug ? null : current))
              }
            />
          </Reveal>
        ))}
      </ul>

    </Section>
  );
}

/**
 * Destaque de consórcio (direção 1f): faixa rebaixada que sangra até a borda
 * esquerda. `@container` na seção dá a largura real para o sangrado (cqw).
 * Cada linha abre o modal com o bem pré-selecionado; o CTA abre sem pré-seleção.
 */
function ConsortiumHighlight() {
  const [simulation, setSimulation] = useState<{ asset?: string } | null>(null);

  // Safari não foca botões no clique: focar antes de abrir garante a volta do foco.
  const openSimulation = (event: ReactMouseEvent<HTMLButtonElement>, asset?: string) => {
    event.currentTarget.focus();
    setSimulation({ asset });
  };

  return (
    <>
      <Reveal
        className={cn(
          'relative mt-10 flex flex-col gap-4 overflow-hidden rounded-r-lg border border-l-0 bg-surface-sunken',
          'ml-[calc(50%-50cqw)] pt-7 pr-5 pb-6 pl-[calc(50cqw-50%)]',
          'lg:mr-[calc(50%-50cqw)] lg:grid lg:grid-cols-[minmax(0,1fr)_25rem] lg:gap-x-12 lg:gap-y-[1.375rem] lg:rounded-r-xl lg:py-12 lg:pr-12',
          'xl:grid-cols-[minmax(0,1fr)_30rem]'
        )}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 360 300"
          fill="none"
          stroke="currentColor"
          className="pointer-events-none absolute -top-2.5 -right-10 h-[170px] w-[200px] text-brand-secondary opacity-30 [stroke-width:4] lg:-top-5 lg:right-[560px] lg:h-[300px] lg:w-[360px] lg:opacity-35 lg:[stroke-width:3]"
        >
          <path d="M40 10 190 150 40 290" />
          <path d="M120 10 270 150 120 290" />
          <path d="M200 10 350 150 200 290" />
        </svg>

        <div className="relative font-mono text-[0.6875rem] leading-[normal] font-medium tracking-[0.08em] text-brand-secondary-700 lg:text-xs">
          DESTAQUE
        </div>
        <h3 className="relative text-[3rem] leading-[0.98] font-extrabold tracking-[-0.04em] text-text lg:text-[5rem]">
          <span className="block">Consórcio</span> Xik
        </h3>
        <p className="relative text-base leading-normal text-text-muted lg:max-w-[26.25rem] lg:text-[1.1875rem]">
          <span className="hidden lg:inline">
            Planeje a compra de um bem com a orientação de um corretor. Escolha ao lado e simule.
          </span>
          <span className="lg:hidden">
            Planeje a compra de um bem com a orientação de um corretor. Escolha abaixo e simule.
          </span>
        </p>

        <div
          role="group"
          aria-label="Tipo de bem"
          className="relative border-t border-brand-secondary lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:self-start"
        >
          {consortiumSimulationOptions.asset.map((asset) => (
            <button
              key={asset}
              type="button"
              aria-haspopup="dialog"
              onClick={(event) => openSimulation(event, asset)}
              className="flex min-h-14 w-full items-center justify-between gap-4 border-b px-3.5 text-left text-[1.0625rem] font-semibold text-text transition-colors duration-(--duration-base) hover:bg-surface lg:min-h-[4.25rem] lg:px-5 lg:text-[1.375rem]"
            >
              <span>{asset}</span>
              <span className="inline-flex shrink-0 items-center gap-2 text-[0.8125rem] font-semibold lg:text-sm">
                Simular
                <ArrowRight aria-hidden="true" className="hidden size-4 lg:block" />
              </span>
            </button>
          ))}
        </div>

        <Button
          size="lg"
          withArrow
          aria-haspopup="dialog"
          onClick={(event: ReactMouseEvent<HTMLButtonElement>) => openSimulation(event)}
          className="w-full lg:col-start-1 lg:min-h-14 lg:w-auto lg:justify-self-start lg:text-[1.0625rem]"
        >
          Simular consórcio
        </Button>
      </Reveal>

      <ConsortiumSimulationModal
        open={simulation !== null}
        asset={simulation?.asset}
        onClose={() => setSimulation(null)}
      />
    </>
  );
}

type QuickQuoteCardProps = {
  item: QuickQuoteItem;
  position: number;
  isActive: boolean;
  isDimmed: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
};

function QuickQuoteCard({
  item,
  position,
  isActive,
  isDimmed,
  onActivate,
  onDeactivate,
}: QuickQuoteCardProps) {
  const Icon = item.icon;
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const trackPointer = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
    node.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
  };

  const handleBlur = (event: ReactFocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
      onDeactivate();
    }
  };

  return (
    <article
      ref={ref}
      onPointerEnter={onActivate}
      onPointerLeave={onDeactivate}
      onPointerMove={trackPointer}
      onFocus={onActivate}
      onBlur={handleBlur}
      className={cn(
        'relative isolate flex h-full flex-col overflow-hidden rounded-lg border bg-surface',
        'transition-[border-color,box-shadow,transform,opacity] duration-(--duration-base) ease-(--ease-out-brand)',
        isActive ? 'border-brand-primary-400 shadow-lifted' : 'border-border',
        'focus-within:border-brand-primary-400 focus-within:shadow-soft',
        !reduced && isActive && 'motion-safe:-translate-y-1',
        !reduced && isDimmed && 'motion-safe:scale-[0.985] motion-safe:opacity-70'
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-(--duration-base) pointer-coarse:hidden',
          isActive && 'opacity-100'
        )}
        style={{
          background:
            'radial-gradient(340px circle at var(--pointer-x, 50%) var(--pointer-y, 0%), color-mix(in oklab, var(--color-brand-secondary) 20%, transparent), transparent 64%)',
        }}
      />

        <a
          href={item.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary"
          aria-label={`Cotar ${item.title} online`}
        />

      <div className="relative z-10 flex flex-1 flex-col gap-4 p-5 pointer-events-none sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <motion.span
            animate={reduced ? undefined : { scale: isActive ? 1.1 : 1, rotate: isActive ? -5 : 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            className={cn(
              'grid size-12 place-items-center rounded-lg border-2 border-brand-secondary/55 bg-brand-primary text-brand-secondary',
              'transition-[background-color,color,border-color,box-shadow] duration-(--duration-base) ease-(--ease-out-brand)',
              isActive && 'border-brand-secondary bg-brand-primary-600 text-brand-accent shadow-lifted'
            )}
          >
            <Icon aria-hidden="true" className="size-6" strokeWidth={1.75} />
          </motion.span>
          <span
            aria-hidden="true"
            className={cn(
              'font-mono text-xs tracking-widest transition-colors duration-(--duration-base)',
              isActive ? 'text-brand-primary-400' : 'text-text-subtle'
            )}
          >
            {String(position).padStart(2, '0')}
          </span>
        </div>

        <h3 className="text-lg leading-tight font-bold tracking-[-0.02em] sm:text-xl">
          {item.label}
        </h3>

        <span className="mt-auto inline-flex items-center gap-2 pt-1 text-sm font-semibold text-brand-primary">
          Cotar agora
          <motion.span
            animate={reduced ? undefined : { x: isActive ? 4 : 0, y: isActive ? -2 : 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            className="inline-flex"
          >
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </motion.span>
        </span>

        <Link
          to={item.internalPath}
          className="pointer-events-auto relative z-20 min-h-6 w-fit text-sm font-medium text-text-muted underline-offset-4 transition-colors hover:text-brand-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary"
          onClick={(event) => event.stopPropagation()}
        >
          Saber mais
        </Link>
      </div>
    </article>
  );
}
