import { useRef, type PointerEvent } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { company } from '@/data/company';
import { primaryCta } from '@/data/navigation';
import { healthPlans, insurances } from '@/data/services';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { HeroMedallions } from './HeroMedallions';

/** Every figure below is a fact published by the Xik: nothing is estimated. */
const stats = [
  {
    value: String(company.experienceSince),
    label: 'Início da atuação no mercado de seguros',
    srLabel: `Atuação no mercado de seguros desde ${company.experienceSince}`,
  },
  {
    value: String(company.foundedYear),
    label: 'Constituição da corretora',
    srLabel: `Corretora constituída em ${company.foundedYear}`,
  },
  {
    value: String(healthPlans.length + insurances.length),
    label: 'Modalidades de planos e seguros',
    srLabel: `${healthPlans.length + insurances.length} modalidades de planos e seguros`,
  },
];

/**
 * Neutral interactive hero (no photograph): grid + gold ambient that tracks
 * the pointer: finish inspired by Digital Signs’ dark stage, Xik tokens only.
 * Medallions live in a dedicated stage so they stay sharp and reactive.
 */
export function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 36]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.45]);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 70, damping: 16, mass: 0.35 });
  const springY = useSpring(pointerY, { stiffness: 70, damping: 16, mass: 0.35 });

  const glowLeft = useTransform(springX, (v) => `calc(58% + ${v * 2.2}px)`);
  const glowTop = useTransform(springY, (v) => `calc(40% + ${v * 2}px)`);

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

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
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="on-invert relative isolate min-h-[min(100svh,58rem)] overflow-hidden bg-surface-invert text-text-invert"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-brand-primary-900" />
      <div aria-hidden="true" className="surface-grid-invert absolute inset-0 opacity-40" />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute size-[min(38rem,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-55 blur-3xl"
        style={{
          left: glowLeft,
          top: glowTop,
          background:
            'radial-gradient(circle, color-mix(in oklab, var(--color-brand-secondary) 44%, transparent), transparent 70%)',
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-0 h-px w-[70%] origin-left rotate-[14deg] bg-gradient-to-r from-transparent via-brand-secondary/35 to-transparent blur-[1px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-0 h-px w-[65%] origin-right -rotate-[12deg] bg-gradient-to-l from-transparent via-brand-secondary/28 to-transparent blur-[1px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[18%] left-1/2 h-px w-[min(36rem,80%)] -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-secondary/40 to-transparent"
      />

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-[2] h-32 bg-gradient-to-b from-transparent via-bg/50 to-bg"
      />

      <Container className="relative z-[3] grid min-h-[min(100svh,58rem)] items-start gap-10 pt-20 pb-20 sm:pt-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12 lg:pt-28 lg:pb-24">
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-[4] max-w-xl lg:max-w-lg xl:max-w-xl">
          <motion.div {...rise(0)}>
            <Eyebrow invert>Corretora de seguros · Belo Horizonte</Eyebrow>
          </motion.div>

          <motion.h1 {...rise(0.08)} className="mt-5 text-hero font-extrabold text-balance sm:mt-6">
            Seu sonho começa com o{' '}
            <span className="text-gradient-brand">consórcio Xik</span>
          </motion.h1>

          <motion.p {...rise(0.16)} className="measure mt-7 text-lead text-text-invert-muted">
            Planos de saúde, seguros, consórcios, previdência privada, 
            gestão de riscos e a formatação correta de
            apólices e contratos para pessoas físicas e jurídicas.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-9 flex flex-wrap items-center gap-3">
            <Button to={primaryCta.to} variant="secondary" size="lg" withArrow>
              {primaryCta.label}
            </Button>
            <Button to="/a-empresa" variant="invert" size="lg">
              Conheça a Xik
            </Button>
          </motion.div>

          <motion.dl
            {...rise(0.32)}
            className="mt-14 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-8 border-t border-border-invert pt-8 sm:grid-cols-3"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.srLabel}</dt>
                <dd>
                  <span className="block text-3xl font-extrabold tracking-[-0.03em] text-brand-secondary sm:text-4xl">
                    {stat.value}
                  </span>
                  <span className="mt-1.5 block text-xs leading-snug text-text-invert-muted">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>

          <motion.a
            {...rise(0.4)}
            href="#solucoes"
            className="mt-10 inline-flex w-fit items-center gap-2.5 rounded-sm text-xs font-bold tracking-[0.18em] text-text-invert-muted uppercase transition-colors duration-(--duration-fast) hover:text-brand-secondary lg:mt-12"
          >
            <ArrowDown aria-hidden="true" className="size-4" />
            Ver soluções
          </motion.a>
        </motion.div>

        <motion.div {...rise(0.18)} className="relative z-[3] mx-auto w-full max-w-md lg:max-w-none">
          <HeroMedallions pointerX={springX} pointerY={springY} />
        </motion.div>
      </Container>
    </section>
  );
}
