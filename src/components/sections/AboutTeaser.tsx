import { company } from '@/data/company';
import fachadaXik from '@/assets/marketing/xik-fachada.webp';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Institutional block. The lead paragraph is the Xik's own history text, split
 * so the first sentence can carry editorial weight. Facade photo anchors the
 * block as a mobile-first institutional portrait.
 */
export function AboutTeaser() {
  return (
    <Section tone="base" bordered aria-labelledby="sobre-titulo">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
        <Reveal className="flex flex-col gap-7 lg:sticky lg:top-28 lg:self-start">
          <div>
            <Eyebrow>A empresa</Eyebrow>
            <h2 id="sobre-titulo" className="mt-5 text-title font-extrabold text-balance">
              Uma corretora conduzida por quem está no mercado desde {company.experienceSince}
            </h2>
            <p className="mt-6 text-sm text-text-subtle">
              Sócia administradora: {company.managingPartner}
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-border bg-surface-sunken lg:hidden">
            <img
              src={fachadaXik}
              alt="Fachada noturna da XIK SEGUROS com letreiro iluminado"
              width={900}
              height={1200}
              className="aspect-[3/4] w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>

          <p className="text-lead leading-relaxed text-text">{company.history}</p>

          <dl className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            <div className="bg-surface p-6">
              <dt className="text-xs font-bold tracking-[0.14em] text-text-subtle uppercase">
                Constituição
              </dt>
              <dd className="mt-2 text-2xl font-extrabold tracking-[-0.03em] text-brand-primary">
                {company.foundedYear}
              </dd>
            </div>
            <div className="bg-surface p-6">
              <dt className="text-xs font-bold tracking-[0.14em] text-text-subtle uppercase">
                Experiência no mercado desde
              </dt>
              <dd className="mt-2 text-2xl font-extrabold tracking-[-0.03em] text-brand-primary">
                {company.experienceSince}
              </dd>
            </div>
          </dl>

          <Button to="/a-empresa" variant="ghost" className="mt-1 w-fit" withArrow>
            Ver a página institucional
          </Button>
        </Reveal>

        <Reveal index={1} className="relative hidden overflow-hidden rounded-lg border border-border bg-surface-sunken lg:block">
          <img
            src={fachadaXik}
            alt="Fachada noturna da XIK SEGUROS com letreiro iluminado"
            width={900}
            height={1200}
            className="aspect-[3/4] max-h-[min(42rem,80vh)] w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </Reveal>
      </div>
    </Section>
  );
}
