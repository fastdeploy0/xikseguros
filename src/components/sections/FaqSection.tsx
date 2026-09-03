import { faq } from '@/data/faq';
import { primaryCta } from '@/data/navigation';
import { company } from '@/data/company';
import { buildWhatsappUrl } from '@/lib/runtime-config';
import { motion, useReducedMotion } from 'motion/react';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';

export function FaqSection() {
  const reduced = useReducedMotion();
  const whatsappUrl = buildWhatsappUrl();

  return (
    <Section
      id="faq"
      tone="sunken"
      edgeTop="hairline"
      edgeBottom="fade-to-invert"
      aria-labelledby="faq-titulo"
    >
      <div className="relative z-[1] flex flex-col gap-10 lg:gap-12">
        <div
          aria-hidden="true"
          className="mx-auto flex w-full max-w-md items-center gap-3 px-4"
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-border-strong to-border" />
          <span className="size-1 shrink-0 rotate-45 bg-brand-secondary/75" />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-border-strong to-border" />
        </div>

        <Reveal as="header" className="mx-auto max-w-3xl text-center">
          <motion.p
            className="inline-flex items-center justify-center gap-3 text-[0.6875rem] font-bold tracking-[0.28em] text-brand-secondary-700 uppercase"
            animate={reduced ? undefined : { opacity: [0.85, 1, 0.85] }}
            transition={
              reduced ? undefined : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            <span aria-hidden="true" className="h-px w-8 bg-brand-secondary-600/50" />
            FAQ
            <span aria-hidden="true" className="h-px w-8 bg-brand-secondary-600/50" />
          </motion.p>
          <h2
            id="faq-titulo"
            className="mt-6 text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.02] font-extrabold tracking-[-0.04em] text-balance text-brand-primary"
          >
            Dúvidas{' '}
            <span className="bg-gradient-to-r from-brand-secondary-700 via-brand-accent to-brand-secondary-700 bg-clip-text text-transparent">
              frequentes
            </span>
          </h2>
          <p className="measure mx-auto mt-5 text-lead text-text-muted">
            O que a Xik responde antes de você contratar: valores, coberturas e condições dependem
            da operadora escolhida e são apresentados por um consultor.
          </p>
        </Reveal>

        <Reveal index={1} className="flex flex-wrap items-center justify-center gap-3">
          <Button to={primaryCta.to} variant="primary" size="lg" withArrow>
            {primaryCta.label}
          </Button>
          {whatsappUrl ? (
            <Button href={whatsappUrl} variant="ghost" size="lg">
              Falar no WhatsApp
            </Button>
          ) : (
            <Button href={`tel:${company.phones[0].tel}`} external={false} variant="ghost" size="lg">
              {company.phones[0].display}
            </Button>
          )}
          <Button to="/fale-conosco" variant="ghost" withArrow>
            Falar com um consultor
          </Button>
        </Reveal>

        <Reveal index={2} className="mx-auto w-full max-w-4xl">
          <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-soft">
            <Accordion items={faq} interactive />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
