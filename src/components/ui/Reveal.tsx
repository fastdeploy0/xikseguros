import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';

/** Static map: creating motion components during render would remount children. */
const MOTION = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  header: motion.header,
  p: motion.p,
} as const;

type RevealProps = {
  as?: keyof typeof MOTION;
  /** Stagger index: keeps groups of cards from animating in lockstep. */
  index?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Scroll reveal: content stays visually hidden until it enters the reading
 * band, then fades/slides in once. Under `prefers-reduced-motion` it renders
 * statically (always visible).
 */
export function Reveal({ as = 'div', index = 0, className, children }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const Component = MOTION[as];

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22, margin: '0px 0px -8% 0px' }}
      transition={{
        duration: 0.6,
        delay: Math.min(index, 8) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Component>
  );
}
