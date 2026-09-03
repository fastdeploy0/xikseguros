import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Container } from './Container';

export type SectionTone = 'base' | 'sunken' | 'invert' | 'surface';

/** Visual bridge at a section boundary: keeps long-page rhythm readable. */
export type SectionEdge =
  | 'none'
  | 'hairline'
  | 'gold-rule'
  | 'fade-from-base'
  | 'fade-from-sunken'
  | 'fade-from-invert'
  | 'fade-to-base'
  | 'fade-to-sunken'
  | 'fade-to-invert';

const TONE: Record<SectionTone, string> = {
  base: 'bg-bg text-text',
  surface: 'bg-surface text-text',
  sunken: 'bg-surface-sunken text-text',
  invert: 'on-invert bg-surface-invert text-text-invert',
};

const EDGE_TOP: Record<SectionEdge, string | false> = {
  none: false,
  hairline: 'section-edge-hairline-top',
  'gold-rule': 'section-edge-gold-top',
  'fade-from-base': 'section-edge-fade-top-base',
  'fade-from-sunken': 'section-edge-fade-top-sunken',
  'fade-from-invert': 'section-edge-fade-top-invert',
  'fade-to-base': false,
  'fade-to-sunken': false,
  'fade-to-invert': false,
};

const EDGE_BOTTOM: Record<SectionEdge, string | false> = {
  none: false,
  hairline: false,
  'gold-rule': false,
  'fade-from-base': false,
  'fade-from-sunken': false,
  'fade-from-invert': false,
  'fade-to-base': 'section-edge-fade-bottom-base',
  'fade-to-sunken': 'section-edge-fade-bottom-sunken',
  'fade-to-invert': 'section-edge-fade-bottom-invert',
};

type SectionProps = {
  id?: string;
  tone?: SectionTone;
  /** Tighter vertical rhythm for supporting sections. */
  tight?: boolean;
  /** @deprecated Prefer `edgeTop="hairline"`. */
  bordered?: boolean;
  edgeTop?: SectionEdge;
  edgeBottom?: SectionEdge;
  /** Full-bleed layers (grid, glow): rendered outside `Container`, like Hero/Footer. */
  backdrop?: ReactNode;
  className?: string;
  innerClassName?: string;
  'aria-labelledby'?: string;
  children: ReactNode;
};

export function Section({
  id,
  tone = 'base',
  tight = false,
  bordered = false,
  edgeTop,
  edgeBottom = 'none',
  backdrop,
  className,
  innerClassName,
  children,
  ...rest
}: SectionProps) {
  const resolvedEdgeTop: SectionEdge = edgeTop ?? (bordered ? 'hairline' : 'none');
  const topClass = EDGE_TOP[resolvedEdgeTop];
  const bottomClass = EDGE_BOTTOM[edgeBottom];
  const hairlineInvert = resolvedEdgeTop === 'hairline' && tone === 'invert';

  return (
    <section
      id={id}
      {...rest}
      className={cn(
        'relative isolate overflow-hidden',
        TONE[tone],
        hairlineInvert && 'border-t border-border-invert',
        !hairlineInvert && topClass,
        bottomClass,
        className
      )}
      style={{ paddingBlock: tight ? 'var(--spacing-section-tight)' : 'var(--spacing-section)' }}
    >
      {backdrop}
      <Container className={cn('relative z-[1]', innerClassName)}>{children}</Container>
    </section>
  );
}
