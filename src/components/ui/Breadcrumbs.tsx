import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

export type Crumb = {
  name: string;
  path: string;
};

type BreadcrumbsProps = {
  /** Full trail including Home; the last entry renders as the current page. */
  trail: Crumb[];
  invert?: boolean;
  className?: string;
};

export function Breadcrumbs({ trail, invert = false, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Trilha de navegação" className={className}>
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.8125rem]">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {index > 0 ? (
                <ChevronRight
                  aria-hidden="true"
                  className={cn('size-3.5', invert ? 'text-text-invert-muted/60' : 'text-text-subtle')}
                />
              ) : null}
              {isLast ? (
                <span
                  aria-current="page"
                  className={cn('font-semibold', invert ? 'text-text-invert' : 'text-text')}
                >
                  {crumb.name}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className={cn(
                    'rounded-xs underline-offset-4 transition-colors duration-(--duration-fast) hover:underline',
                    invert
                      ? 'text-text-invert-muted hover:text-text-invert'
                      : 'text-text-muted hover:text-brand-primary'
                  )}
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
