import { cn } from '@/lib/cn';
import type { Partner } from '@/data/partners';

type PartnerLogoProps = {
  partner: Partner;
  className?: string;
  /** Visual scale of the mark. `xl` is for the home logo wall. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Logo only: no bordered plate (used inside already framed cells). */
  bare?: boolean;
  priority?: boolean;
};

const SIZE = {
  sm: 'h-10 max-w-[7.5rem]',
  md: 'h-12 max-w-[9rem]',
  lg: 'h-16 max-w-[11rem] sm:h-[4.5rem]',
  xl: 'h-14 max-w-full sm:h-16 md:h-[4.75rem]',
} as const;

/**
 * Renders a partner logo inside a tonal plate. The image always has an alt
 * with the brand name; decorative wrappers stay aria-hidden at the call site
 * when the name is already visible nearby.
 */
export function PartnerLogo({
  partner,
  className,
  size = 'md',
  bare = false,
  priority = false,
}: PartnerLogoProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center',
        !bare && 'rounded-md border border-border bg-surface px-4 py-3',
        className
      )}
    >
      <img
        src={partner.logo}
        alt={partner.name}
        width={240}
        height={120}
        className={cn('w-auto object-contain', SIZE[size])}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </span>
  );
}
