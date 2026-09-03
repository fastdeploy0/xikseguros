import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type EyebrowProps = {
  children: ReactNode;
  invert?: boolean;
  className?: string;
};

export function Eyebrow({ children, invert = false, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'flex items-center gap-3 text-[0.6875rem] font-bold tracking-[0.2em] uppercase',
        invert ? 'text-brand-secondary' : 'text-brand-secondary-700',
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn('h-px w-6 shrink-0', invert ? 'bg-brand-secondary/60' : 'bg-brand-secondary-600/50')}
      />
      {children}
    </p>
  );
}
