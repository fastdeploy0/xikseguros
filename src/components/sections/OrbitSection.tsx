import type { PointerEvent } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react';
import {
  ArrowDown,
  CalendarDays,
  LayoutGrid,
  ShieldCheck,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { company } from '@/data/company';
import { healthPlans, insurances } from '@/data/services';
import { Section } from '@/components/ui/Section';
import { HeroMedallions } from './HeroMedallions';

type OrbitCard = {
  icon: LucideIcon;
  title: string;
  lines: string[];
  /** Entry offset: each corner card converges toward the orbit. */
  from: { x: number; y: number };
};

/** Every figure is a fact published by the Xik and read from the data layer. */
const CARDS: OrbitCard[] = [
  {
    icon: CalendarDays,
    title: `Desde ${company.experienceSince}`,
    lines: [
      'Início da atuação no mercado de seguros',
      `Corretora constituída em ${company.foundedYear}`,
    ],
    from: { x: -40, y: -28 },
  },
  {
    icon: LayoutGrid,
    title: `${healthPlans.length + insurances.length} modalidades`,
    lines: ['Planos de saúde e seguros'],
    from: { x: 40, y: -28 },
  },
  {
    icon: Users,
    title: 'Pessoas físicas e jurídicas',
    lines: ['Planos de saúde, seguros, consórcios e previdência privada'],
    from: { x: -40, y: 28 },
  },
  {
    icon: ShieldCheck,
    title: 'Gestão de riscos',
    lines: ['Formatação correta de apólices e contratos'],
    from: { x: 40, y: 28 },
  },
];

/**
 * The former hero fold as a section: the medallion orbit stays centered and
 * four fact cards sit at its corners (stacked under it on small screens).
 */
export function OrbitSection() {
  const reduced = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 70, damping: 16, mass: 0.35 });
  const springY = useSpring(pointerY, { stiffness: 70, damping: 16, mass: 0.35 });

  const glowLeft = useTransform(springX, (v) => `calc(50% + ${v * 2.2}px)`);
  const glowTop = useTransform(springY, (v) => `calc(45% + ${v * 2}px)`);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(nx * 28);
    pointerY.set(ny * 20);
  };

  const onPointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <Section
      tone="invert"
      edgeTop="fade-from-invert"
      edgeBottom="fade-to-base"
      innerClassName="pb-16"
      backdrop={
        <>
          <div aria-hidden="true" className="surface-grid-invert absolute inset-0 -z-10 opacity-40" />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -z-10 size-[min(38rem,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-55 blur-3xl"
            style={{
              left: glowLeft,
              top: glowTop,
              background:
                'radial-gradient(circle, color-mix(in oklab, var(--color-brand-secondary) 44%, transparent), transparent 70%)',
            }}
          />
        </>
      }
    >
      <div onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
        <div className="relative">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden place-items-center lg:grid">
            <span className="col-start-1 row-start-1 aspect-square w-[min(100%,46rem)] rounded-full border border-brand-secondary/15" />
            <span className="col-start-1 row-start-1 aspect-square w-[min(100%,62rem)] rounded-full border border-dashed border-border-invert" />
          </div>

          <div className="relative z-[1] mx-auto w-full max-w-[28rem] lg:max-w-[30rem] xl:max-w-[34rem]">
            <HeroMedallions pointerX={springX} pointerY={springY} />
          </div>

          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:pointer-events-none lg:absolute lg:inset-0 lg:mt-0 lg:grid-cols-[13.5rem_13.5rem] lg:content-between lg:justify-between xl:grid-cols-[16.5rem_16.5rem]">
            {CARDS.map((card, index) => (
              <motion.li
                key={card.title}
                className="rounded-lg border border-border-invert bg-surface-invert-elevated/70 p-5 shadow-lifted backdrop-blur-md lg:pointer-events-auto"
                {...(reduced
                  ? {}
                  : {
                      initial: { opacity: 0, x: card.from.x, y: card.from.y, scale: 0.92 },
                      whileInView: { opacity: 1, x: 0, y: 0, scale: 1 },
                      viewport: { once: true, amount: 0.4 },
                      transition: {
                        duration: 0.55,
                        delay: 0.1 + index * 0.08,
                        ease: [0.22, 1, 0.36, 1] as const,
                      },
                    })}
              >
                <span
                  aria-hidden="true"
                  className="grid size-9 place-items-center rounded-md border border-brand-secondary/30 bg-white/5 text-brand-secondary"
                >
                  <card.icon className="size-4.5 stroke-[1.7]" />
                </span>
                <p className="mt-4 text-xl font-extrabold tracking-[-0.02em] text-brand-secondary">
                  {card.title}
                </p>
                {card.lines.map((line) => (
                  <p key={line} className="mt-1.5 text-sm leading-snug text-text-invert-muted">
                    {line}
                  </p>
                ))}
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex justify-center lg:mt-14">
          <a
            href="#solucoes"
            className="inline-flex w-fit items-center gap-2.5 rounded-sm text-xs font-bold tracking-[0.18em] text-text-invert-muted uppercase transition-colors duration-(--duration-fast) hover:text-brand-secondary"
          >
            <ArrowDown aria-hidden="true" className="size-4" />
            Ver soluções
          </a>
        </div>
      </div>
    </Section>
  );
}
