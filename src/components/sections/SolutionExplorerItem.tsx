import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { servicePath, type Service } from '@/data/services';

type SolutionExplorerItemProps = {
  service: Service;
  /** Editorial index within the full solutions catalogue (01-12). */
  position: number;
  /**
   * `feature`: navy plates for the 4 health plans (home explorer).
   * `compact`: denser horizontal scan row for the 8 insurance products.
   */
  variant: 'feature' | 'compact';
  className?: string;
};

/**
 * Home-only solution explorer item. Kept separate from `ServiceCard` so the
 * category hubs can keep their denser catalogue treatment unchanged.
 * The parent owns the `<li>` for correct list semantics with `Reveal`.
 */
export function SolutionExplorerItem({
  service,
  position,
  variant,
  className,
}: SolutionExplorerItemProps) {
  const Icon = service.icon;
  const index = String(position).padStart(2, '0');
  const href = servicePath(service);

  if (variant === 'compact') {
    return (
      <Link
        to={href}
        className={cn(
          'group relative flex items-start gap-4 overflow-hidden rounded-xl border border-border bg-surface px-3 py-4 text-text shadow-soft sm:gap-5 sm:px-5 sm:py-5',
          'transition-[background-color,border-color,box-shadow,transform,color] duration-(--duration-base) ease-(--ease-out-brand)',
          'hover:border-brand-primary hover:bg-brand-primary hover:text-text-invert',
          'hover:shadow-[0_0_0_1px_var(--color-brand-secondary),0_18px_44px_-24px_rgb(21_51_88_/_0.35)]',
          'focus-visible:border-brand-primary focus-visible:bg-brand-primary focus-visible:text-text-invert',
          'motion-safe:hover:-translate-y-0.5',
          className
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-brand-secondary via-brand-accent to-brand-secondary/40 transition-transform duration-(--duration-base) ease-(--ease-out-brand) group-hover:scale-x-100 group-focus-visible:scale-x-100"
        />

        <span
          aria-hidden="true"
          className="mt-1 font-mono text-[0.6875rem] tracking-widest text-text-subtle tabular-nums transition-colors duration-(--duration-fast) group-hover:text-brand-secondary"
        >
          {index}
        </span>

        <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-md border border-border bg-surface text-brand-primary transition-[color,transform,border-color] duration-(--duration-base) ease-(--ease-out-brand) group-hover:border-brand-secondary/40 motion-safe:group-hover:-translate-y-0.5">
          <Icon aria-hidden="true" className="size-4" strokeWidth={1.6} />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-base leading-snug font-bold tracking-[-0.02em] sm:text-lg">
            {service.title}
          </span>
          {service.summary ? (
            <span className="mt-1.5 line-clamp-2 block text-sm leading-relaxed text-text-muted transition-colors duration-(--duration-fast) group-hover:text-text-invert-muted">
              {service.summary}
            </span>
          ) : null}
        </span>

        <span className="mt-1 inline-flex shrink-0 items-center gap-1.5 self-center text-sm font-semibold text-brand-primary transition-colors duration-(--duration-fast) group-hover:text-brand-secondary">
          <span className="hidden sm:inline">Ver detalhes</span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-(--duration-base) ease-(--ease-out-brand) motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
          />
        </span>
      </Link>
    );
  }

  return (
    <Link
      to={href}
      className={cn(
        'group relative flex h-full w-full flex-col overflow-hidden rounded-xl',
        'border border-border bg-surface p-6 text-text shadow-soft sm:p-8',
        'transition-[border-color,box-shadow,transform,background-color,color] duration-(--duration-base) ease-(--ease-out-brand)',
        'hover:border-brand-primary hover:bg-brand-primary hover:text-text-invert',
        'hover:shadow-[0_0_0_1px_var(--color-brand-secondary),0_18px_44px_-24px_rgb(21_51_88_/_0.35)]',
        'focus-visible:border-brand-primary focus-visible:bg-brand-primary focus-visible:text-text-invert',
        'motion-safe:hover:-translate-y-1 motion-safe:focus-visible:-translate-y-1',
        className
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-secondary via-brand-accent to-brand-secondary/40 transition-transform duration-(--duration-base) ease-(--ease-out-brand) group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />

      <span className="relative flex items-start justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-md border border-border bg-surface text-brand-primary shadow-hairline transition-[transform,border-color] duration-(--duration-base) ease-(--ease-out-brand) group-hover:border-brand-secondary/40 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:scale-105">
          <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
        </span>
        <span
          aria-hidden="true"
          className="font-mono text-xs tracking-widest text-text-subtle transition-colors duration-(--duration-fast) group-hover:text-brand-secondary"
        >
          {index}
        </span>
      </span>

      <span className="relative mt-6 block text-2xl leading-tight font-extrabold tracking-[-0.02em] text-balance sm:text-[1.75rem]">
        {service.label}
      </span>

      <span className="relative mt-2 block text-sm font-medium text-text-muted transition-colors duration-(--duration-fast) group-hover:text-text-invert-muted">
        {service.title}
      </span>

      {service.summary ? (
        <span className="relative mt-3 line-clamp-3 flex-1 text-[0.9375rem] leading-relaxed text-text-muted transition-colors duration-(--duration-fast) group-hover:text-text-invert-muted">
          {service.summary}
        </span>
      ) : null}

      <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-primary transition-colors duration-(--duration-fast) group-hover:text-brand-secondary">
        Ver detalhes
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform duration-(--duration-base) ease-(--ease-out-brand) motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}
