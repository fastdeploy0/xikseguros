import { cn } from '@/lib/cn';
import type { Partner } from '@/data/partners';
import { PartnerLogo } from './PartnerLogo';
import { Reveal } from './Reveal';

type PartnerLogoGridProps = {
  partners: Partner[];
  className?: string;
  /** Accessible label for the list. */
  labelledBy?: string;
};

/** Logo grid used on `/planos`, `/seguros` and service detail pages. */
export function PartnerLogoGrid({ partners, className, labelledBy }: PartnerLogoGridProps) {
  if (!partners.length) return null;

  return (
    <ul
      aria-labelledby={labelledBy}
      className={cn(
        'grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
        className
      )}
    >
      {partners.map((partner, index) => (
        <Reveal as="li" key={partner.id} index={index % 8} className="flex">
          <PartnerLogo partner={partner} size="md" className="w-full min-h-[5.5rem]" />
        </Reveal>
      ))}
    </ul>
  );
}
