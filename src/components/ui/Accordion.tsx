import { useId, useState } from 'react';
import { Plus } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/cn';

export type AccordionItem = {
  question: string;
  answer: string;
};

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
  /** Navy closing-stage surface (FAQ on home). */
  invert?: boolean;
  /** Motion, active glow and animated panels (FAQ closing block). */
  interactive?: boolean;
};

/**
 * Disclosure list built on native buttons and `aria-expanded`/`aria-controls`.
 * Panels stay in the DOM and are hidden with `hidden`, so in-page search and
 * assistive technology behave predictably.
 */
export function Accordion({
  items,
  className,
  invert = false,
  interactive = false,
}: AccordionProps) {
  const baseId = useId();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);
  const motionPanels = interactive && !reduced;

  return (
    <div
      className={cn(
        invert ? 'divide-y divide-border-invert' : 'divide-y divide-border border-y border-border',
        className
      )}
    >
      {items.map((item, index) => {
        const isOpen = open === index;
        const buttonId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <motion.div
            key={item.question}
            layout={motionPanels ? 'position' : false}
            className={cn(
              'relative transition-[background-color,box-shadow] duration-(--duration-base)',
              interactive &&
                isOpen &&
                (invert
                  ? 'bg-brand-secondary/[0.07] shadow-[inset_3px_0_0_var(--color-brand-secondary)]'
                  : 'bg-brand-primary/[0.04] shadow-[inset_3px_0_0_var(--color-brand-primary)]')
            )}
          >
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
                className={cn(
                  'flex w-full items-start gap-4 px-5 py-5 text-left transition-colors duration-(--duration-fast) sm:gap-5 sm:px-6 sm:py-6',
                  invert ? 'hover:text-brand-secondary' : 'hover:text-brand-primary-600'
                )}
              >
                {interactive ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      'mt-1 font-mono text-[0.6875rem] tracking-widest tabular-nums transition-colors duration-(--duration-fast)',
                      invert
                        ? isOpen
                          ? 'text-brand-secondary'
                          : 'text-text-invert-muted'
                        : isOpen
                          ? 'text-brand-secondary-700'
                          : 'text-text-subtle'
                    )}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                ) : null}

                <span
                  className={cn(
                    'flex-1 text-lg font-bold tracking-[-0.015em] text-pretty sm:text-xl',
                    invert && 'text-text-invert',
                    interactive &&
                      isOpen &&
                      (invert ? 'text-brand-secondary' : 'text-brand-primary')
                  )}
                >
                  {item.question}
                </span>

                <motion.span
                  aria-hidden="true"
                  animate={
                    interactive && !reduced && isOpen
                      ? {
                          scale: [1, 1.08, 1],
                          boxShadow: [
                            '0 0 0 0 rgb(200 170 112 / 0)',
                            '0 0 0 6px rgb(200 170 112 / 0.2)',
                            '0 0 0 0 rgb(200 170 112 / 0)',
                          ],
                        }
                      : { scale: 1 }
                  }
                  transition={
                    interactive && !reduced && isOpen
                      ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
                      : { duration: 0.2 }
                  }
                  className={cn(
                    'mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-(--duration-base) ease-(--ease-out-brand) sm:size-9',
                    invert
                      ? isOpen
                        ? 'rotate-45 border-brand-secondary bg-brand-secondary text-brand-primary-900'
                        : 'border-border-invert text-brand-secondary'
                      : isOpen
                        ? 'rotate-45 border-brand-primary bg-brand-primary text-text-invert'
                        : 'border-border-strong text-brand-primary'
                  )}
                >
                  <Plus className="size-4" />
                </motion.span>
              </button>
            </h3>

            {motionPanels ? (
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p
                      className={cn(
                        'measure px-5 pb-6 sm:px-6 sm:pb-7',
                        interactive ? 'pl-14 sm:pl-16' : '',
                        invert ? 'text-text-invert-muted' : 'text-text-muted'
                      )}
                    >
                      {item.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            ) : (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className="pb-6 sm:pb-7"
              >
                <p
                  className={cn(
                    'measure px-5 sm:px-6',
                    interactive ? 'pl-14 sm:pl-16' : '',
                    invert ? 'text-text-invert-muted' : 'text-text-muted'
                  )}
                >
                  {item.answer}
                </p>
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
