import { useRef, useState } from 'react';
import type { FocusEvent as ReactFocusEvent, PointerEvent as ReactPointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { quickQuoteUsesLeadForm } from '@/data/quick-quote-forms';
import { resolveQuickQuotes, type QuickQuoteItem, type QuickQuoteSlug } from '@/data/quick-quotes';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from './SectionHeading';
import { QuickQuoteLeadModal } from './QuickQuoteLeadModal';

/**
 * Permanent home rail: cotação online.
 * Most cards open a WhatsApp lead form; Cartão / Conta digital keep the Porto link.
 */
export function QuickQuoteSection() {
  const items = resolveQuickQuotes();
  const [activeSlug, setActiveSlug] = useState<QuickQuoteSlug | null>(null);
  const [leadItem, setLeadItem] = useState<QuickQuoteItem | null>(null);

  if (items.length === 0) return null;

  return (
    <Section
      id="cotacao-rapida"
      tone="surface"
      edgeTop="gold-rule"
      edgeBottom="fade-to-sunken"
      aria-labelledby="cotacao-rapida-titulo"
    >
      <SectionHeading
        id="cotacao-rapida-titulo"
        eyebrow="Cotação online"
        title="Cotar agora, direto na parceira"
        description="Escolha o produto, preencha o formulário e abra a conversa no WhatsApp. Cartão e Conta Digital seguem para a cotação online da Porto."
      />

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
              onOpenLead={() => setLeadItem(item)}
            />
          </Reveal>
        ))}
      </ul>

      <QuickQuoteLeadModal item={leadItem} onClose={() => setLeadItem(null)} />
    </Section>
  );
}

type QuickQuoteCardProps = {
  item: QuickQuoteItem;
  position: number;
  isActive: boolean;
  isDimmed: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  onOpenLead: () => void;
};

function QuickQuoteCard({
  item,
  position,
  isActive,
  isDimmed,
  onActivate,
  onDeactivate,
  onOpenLead,
}: QuickQuoteCardProps) {
  const Icon = item.icon;
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const usesLeadForm = quickQuoteUsesLeadForm(item.slug);

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

      {usesLeadForm ? (
        <button
          type="button"
          onClick={onOpenLead}
          className="absolute inset-0 z-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary"
          aria-label={`Preencher cotação de ${item.title}`}
        />
      ) : (
        <a
          href={item.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary"
          aria-label={`Cotar ${item.title} online`}
        />
      )}

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
          {usesLeadForm ? 'Solicitar cotação' : 'Cotar agora'}
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
          className="pointer-events-auto relative z-20 w-fit text-sm font-medium text-text-muted underline-offset-4 transition-colors hover:text-brand-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary"
          onClick={(event) => event.stopPropagation()}
        >
          Saber mais
        </Link>
      </div>
    </article>
  );
}
