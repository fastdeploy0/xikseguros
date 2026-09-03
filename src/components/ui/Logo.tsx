import lockupOnDark from '@/assets/brand/xik-lockup.webp';
import lockupOnLight from '@/assets/brand/xik-mark.webp';
import { company } from '@/data/company';
import { cn } from '@/lib/cn';

type LogoProps = {
  /**
   * Surface behind the logo. Picks the official wordmark variant so XIK +
   * SEGUROS stay sharp:
   * - `dark`: gold + white SEGUROS (footer, hero, invert sections)
   * - `light`: gold + navy SEGUROS (header and other light plates)
   *
   * Legacy aliases: `lockup` → dark, `mark` → light.
   */
  variant?: 'dark' | 'light' | 'lockup' | 'mark';
  /** Callers set the height (e.g. `h-10`); width follows the aspect ratio. */
  className?: string;
  priority?: boolean;
};

const SOURCE = {
  dark: { src: lockupOnDark, width: 518, height: 302, alt: company.name },
  light: { src: lockupOnLight, width: 518, height: 302, alt: company.name },
} as const;

function resolveSurface(variant: LogoProps['variant']): keyof typeof SOURCE {
  if (variant === 'light' || variant === 'mark') return 'light';
  return 'dark';
}

/**
 * Official XIK SEGUROS wordmark. The asset already includes the brand text,
 * so callers must not render a duplicate “XIK / SEGUROS” label beside it.
 */
export function Logo({ variant = 'dark', className, priority = false }: LogoProps) {
  const source = SOURCE[resolveSurface(variant)];

  return (
    <img
      src={source.src}
      alt={source.alt}
      width={source.width}
      height={source.height}
      className={cn('w-auto', className)}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  );
}
