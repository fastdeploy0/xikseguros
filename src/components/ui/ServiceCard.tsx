import { useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { servicePath, type Service } from '@/data/services';

type ServiceCardProps = {
  service: Service;
  /** Editorial index shown in the corner, e.g. "03". */
  position: number;
  className?: string;
};

/**
 * Editorial product card: index + icon + title + factual summary, with a
 * pointer-tracked radial highlight applied only on fine pointers.
 */
export function ServiceCard({ service, position, className }: ServiceCardProps) {
  const ref = useRef<HTMLElement>(null);
  const Icon = service.icon;

  const trackPointer = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return;
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
    node.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
  };

  return (
    <article
      ref={ref}
      onPointerMove={trackPointer}
      className={cn(
        'group relative isolate flex flex-col overflow-hidden border border-border bg-surface',
        'rounded-lg transition-[border-color,box-shadow,transform] duration-(--duration-base) ease-(--ease-out-brand)',
        'hover:border-border-strong hover:shadow-soft motion-safe:hover:-translate-y-0.5',
        'focus-within:border-brand-primary focus-within:shadow-soft',
        className
      )}
    >
      {/* Radial highlight: decorative, pointer-fine only, ignores touch. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-(--duration-base) group-hover:opacity-100 pointer-coarse:hidden"
        style={{
          background:
            'radial-gradient(320px circle at var(--pointer-x, 50%) var(--pointer-y, 0%), color-mix(in oklab, var(--color-brand-secondary) 16%, transparent), transparent 62%)',
        }}
      />

      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="grid size-11 place-items-center rounded-md border border-border bg-surface-sunken text-brand-primary transition-[color,transform] duration-(--duration-base) ease-(--ease-out-brand) group-hover:text-brand-secondary-600 motion-safe:group-hover:-translate-y-0.5">
            <Icon aria-hidden="true" className="size-5" strokeWidth={1.6} />
          </span>
          <span aria-hidden="true" className="font-mono text-xs tracking-widest text-text-subtle">
            {String(position).padStart(2, '0')}
          </span>
        </div>

        <h3 className="text-xl leading-tight font-bold tracking-[-0.02em]">
          <Link
            to={servicePath(service)}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {service.title}
          </Link>
        </h3>

        {service.summary ? (
          <p className="line-clamp-4 flex-1 text-[0.9375rem] leading-relaxed text-text-muted">
            {service.summary}
          </p>
        ) : null}

        <span className="mt-auto inline-flex items-center gap-2 pt-1 text-sm font-semibold text-brand-primary">
          Ver detalhes
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-(--duration-base) ease-(--ease-out-brand) motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </article>
  );
}
