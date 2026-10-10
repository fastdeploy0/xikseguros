import { motion, useReducedMotion } from 'motion/react';
import officeInterior from '@/assets/marketing/xik-interna.webp';
import officeInterior480 from '@/assets/marketing/xik-interna-480.webp';
import officeInterior720 from '@/assets/marketing/xik-interna-720.webp';
import { primaryCta } from '@/data/navigation';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';

/**
 * Immersive hero: the office photo fills the fold and fades into navy, copy
 * sits on the lower third. The photo is the LCP, so it loads eagerly with a
 * width-based srcset capped at the 941px source (never upscaled).
 */
export function Hero() {
  const reduced = useReducedMotion();

  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="on-invert relative isolate h-175 overflow-hidden bg-brand-primary-900 text-text-invert md:h-205">
      <img
        src={officeInterior}
        srcSet={`${officeInterior480} 480w, ${officeInterior720} 720w, ${officeInterior} 941w`}
        sizes="100vw"
        alt=""
        width={941}
        height={1672}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 size-full object-cover object-[50%_30%] md:object-[50%_40%]"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-b/srgb from-brand-primary-900/15 from-0% via-brand-primary-900/60 via-45% to-brand-primary-900 to-85% md:from-brand-primary-900/30 md:via-brand-primary-900/55 md:to-100%"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden bg-linear-to-r/srgb from-brand-primary-900/55 from-0% to-brand-primary-900/0 to-60% md:block"
      />

      <Container className="relative z-[1] flex h-full flex-col justify-end pb-9 md:pb-24">
        <div className="flex max-w-[45rem] flex-col gap-3.5 md:gap-6">
          <motion.div {...rise(0)}>
            <Eyebrow invert>Corretora de seguros · Belo Horizonte</Eyebrow>
          </motion.div>

          <motion.h1 {...rise(0.08)} className="text-hero font-extrabold text-balance">
            Seu sonho começa com o{' '}
            <span className="text-gradient-brand">consórcio Xik</span>
          </motion.h1>

          <motion.p {...rise(0.16)} className="measure-tight text-lead text-text-invert-muted">
            Planos de saúde, seguros, consórcios, previdência privada,
            gestão de riscos e a formatação correta de
            apólices e contratos para pessoas físicas e jurídicas.
          </motion.p>

          <motion.div
            {...rise(0.24)}
            className="mt-1 flex flex-col gap-2.5 md:mt-1.5 md:flex-row md:flex-wrap md:items-center md:gap-3.5"
          >
            <Button to={primaryCta.to} variant="secondary" size="lg" withArrow className="w-full md:w-auto">
              {primaryCta.label}
            </Button>
            <Button to="/a-empresa" variant="invert" size="lg" className="w-full md:w-auto">
              Conheça a Xik
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
