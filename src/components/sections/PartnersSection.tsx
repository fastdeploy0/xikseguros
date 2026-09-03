import { partnersForCategory, type Partner } from '@/data/partners';
import { cn } from '@/lib/cn';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

type PartnerGroup = {
  id: string;
  label: string;
  partners: Partner[];
};

const groups: PartnerGroup[] = [
  {
    id: 'seguros',
    label: 'Seguros e produtos',
    partners: partnersForCategory('seguros'),
  },
  {
    id: 'planos',
    label: 'Planos de saúde',
    partners: partnersForCategory('planos'),
  },
];

/** Display: mobile 106×60 · desktop (`md+`) 185×106: native art from `source_assets/`. */
const LOGO_DESKTOP = { w: 185, h: 106 } as const;

/**
 * Partner logo wall under the hero: dense tiled table inspired by the Elytron
 * customers grid (4+ logos per row on mobile, category bands, hairline cells).
 */
export function PartnersSection() {
  return (
    <section
      aria-labelledby="parceiros-titulo"
      className="relative isolate overflow-hidden border-y border-border bg-bg section-edge-fade-bottom-sunken"
      style={{ paddingBlock: 'var(--spacing-section)' }}
    >
      <Container>
        <Reveal as="header" className="mx-auto max-w-2xl text-center">
          <p className="inline-flex rounded-full bg-surface-sunken px-3.5 py-1.5 text-[0.6875rem] font-bold tracking-[0.2em] text-text-muted uppercase">
            Parceiros
          </p>
          <h2
            id="parceiros-titulo"
            className="mt-5 text-title font-extrabold text-balance sm:text-display"
          >
            Seguradoras e operadoras no portfólio da Xik
          </h2>
        </Reveal>
      </Container>

      <div className="mt-10 space-y-0 sm:mt-12">
        {groups.map((group, groupIndex) => (
          <Reveal key={group.id} index={groupIndex} as="div">
            <div
              id={`${group.id}-banda`}
              className="flex items-center justify-center border-y border-border bg-surface-sunken px-[var(--spacing-gutter)] py-2.5 sm:py-3"
            >
              <p className="text-[0.625rem] font-bold tracking-[0.32em] text-text-muted uppercase sm:text-[0.6875rem]">
                {group.label}
              </p>
            </div>

            <PartnerLogoTileGrid
              partners={group.partners}
              labelledBy={`${group.id}-banda`}
              eagerCount={groupIndex === 0 ? 12 : 6}
              prioritizeFirst={groupIndex === 0}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PartnerLogoTileGrid({
  partners,
  labelledBy,
  eagerCount,
  prioritizeFirst,
}: {
  partners: Partner[];
  labelledBy: string;
  eagerCount: number;
  prioritizeFirst: boolean;
}) {
  if (!partners.length) return null;

  return (
    <div className="border-b border-border bg-surface px-[var(--spacing-gutter)]">
      <ul
        aria-labelledby={labelledBy}
        className={cn(
          'mx-auto grid w-full max-w-[var(--container-page)] border-l border-t border-border bg-surface',
          /* Elytron-like density: 4 cols on narrow mobile, scaling up on wider viewports */
          'grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8'
        )}
      >
        {partners.map((partner, index) => (
          <li
            key={partner.id}
            className={cn(
              'flex items-center justify-center border-r border-b border-border bg-surface',
              'min-h-[4.75rem] px-1.5 py-3 transition-colors duration-(--duration-fast)',
              'hover:bg-surface-sunken/70',
              'md:min-h-[8.25rem] md:px-2.5 md:py-4'
            )}
          >
            <img
              src={partner.logo}
              alt={partner.name}
              width={LOGO_DESKTOP.w}
              height={LOGO_DESKTOP.h}
              loading={index < eagerCount ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={prioritizeFirst && index < 8 ? 'high' : undefined}
              className="h-[60px] w-[106px] shrink-0 object-contain md:h-[106px] md:w-[185px]"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
