import { useEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { company } from '@/data/company';
import { cn } from '@/lib/cn';
import { Container } from '@/components/ui/Container';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

const CHAPTERS = ['Missão', 'Visão', 'Valores'] as const;

/** Faixa de leitura usada para decidir qual capítulo domina a viewport. */
const READING_BAND = '-45% 0px -45% 0px';

const ordinal = (index: number) => String(index + 1).padStart(2, '0');

/**
 * Princípios de `/a-empresa`: missão, visão e valores lidos como três capítulos
 * de um mesmo manifesto, costurados por um eixo vertical único cujo
 * preenchimento em ouro acompanha a progressão de leitura.
 *
 * Usa `<section>` puro em vez de `Section` porque a coluna de orientação é
 * `sticky` e `Section` aplica `overflow-hidden`, que anula sticky nos filhos.
 * Tonalidade, borda, container e ritmo vertical seguem os tokens do sistema.
 */
export function PrinciplesSection() {
  const reduced = useReducedMotion();
  const narrativeRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLElement>(null);
  const visionRef = useRef<HTMLElement>(null);
  const valuesRef = useRef<HTMLElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  const { scrollYProgress } = useScroll({
    target: narrativeRef,
    offset: ['start 85%', 'end 65%'],
  });
  const axisFill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.35 });

  useEffect(() => {
    if (reduced) return;

    // Ordem fixa: o índice no array é o número do capítulo.
    const nodes = [missionRef.current, visionRef.current, valuesRef.current];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = nodes.indexOf(entry.target as HTMLElement);
          if (index >= 0) setActiveChapter(index);
        }
      },
      { rootMargin: READING_BAND }
    );

    for (const node of nodes) {
      if (node) observer.observe(node);
    }

    return () => observer.disconnect();
  }, [reduced]);

  return (
    <section
      aria-labelledby="principios-titulo"
      className="relative isolate overflow-x-clip border-t border-border bg-surface-sunken text-text"
      style={{ paddingBlock: 'var(--spacing-section)' }}
    >
      <Container>
        <div className="lg:grid lg:grid-cols-[20rem_minmax(0,1fr)] lg:items-start lg:gap-x-16 xl:grid-cols-[22rem_minmax(0,1fr)] xl:gap-x-24">
          {/* Coluna de orientação: título da seção e índice dos capítulos. */}
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <Eyebrow>Princípios</Eyebrow>
              <h2 id="principios-titulo" className="mt-5 text-display font-extrabold text-balance">
                Missão, visão e valores
              </h2>

              <ol aria-hidden="true" className="mt-12 hidden lg:flex lg:flex-col">
                {CHAPTERS.map((label, index) => {
                  const current = !reduced && index === activeChapter;
                  return (
                    <li key={label} className="flex items-center gap-4 py-2.5">
                      <span
                        className={cn(
                          'h-px shrink-0 transition-[width,background-color] duration-(--duration-base) ease-(--ease-out-brand)',
                          current ? 'w-9 bg-brand-secondary-600' : 'w-4 bg-border-strong'
                        )}
                      />
                      <span
                        className={cn(
                          'text-[0.6875rem] font-bold tracking-[0.16em] tabular-nums transition-colors duration-(--duration-base)',
                          current ? 'text-brand-secondary-700' : 'text-text-subtle'
                        )}
                      >
                        {ordinal(index)}
                      </span>
                      <span
                        className={cn(
                          'text-sm font-semibold transition-colors duration-(--duration-base)',
                          current ? 'text-brand-primary' : 'text-text-subtle'
                        )}
                      >
                        {label}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </Reveal>
          </div>

          {/* Coluna narrativa: os três capítulos sobre um único eixo. */}
          <div ref={narrativeRef} className="relative mt-14 lg:mt-0">
            <div aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-border-strong">
              <motion.span
                className="block h-full w-px origin-top bg-brand-secondary-600"
                style={{ scaleY: reduced ? 1 : axisFill }}
              />
              <span className="absolute bottom-0 left-1/2 size-[7px] -translate-x-1/2 translate-y-1/2 rotate-45 border border-border-strong bg-surface-sunken" />
            </div>

            <Chapter ref={missionRef} index={0} label="Missão" reached>
              <p className="mt-5 max-w-[46ch] text-lead leading-relaxed lg:mt-6">
                {company.mission}
              </p>
            </Chapter>

            <Chapter
              ref={visionRef}
              index={1}
              label="Visão"
              reached={reduced || activeChapter >= 1}
            >
              <p className="mt-5 max-w-[58ch] text-lead leading-relaxed lg:mt-6">
                {company.vision}
              </p>
            </Chapter>

            <Chapter
              ref={valuesRef}
              index={2}
              label="Valores"
              reached={reduced || activeChapter >= 2}
            >
              <ol className="mt-6 border-t border-border-strong lg:mt-8">
                {company.values.map((value, index) => (
                  <li
                    key={value}
                    className="group relative flex gap-3.5 border-b border-border py-4 sm:gap-5 sm:py-5 lg:gap-7 lg:py-6"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.3rem] shrink-0 text-[0.6875rem] font-bold tracking-[0.16em] text-text-subtle tabular-nums transition-colors duration-(--duration-base) group-hover:text-brand-secondary-700 lg:mt-[0.4rem]"
                    >
                      {ordinal(index)}
                    </span>
                    <span className="max-w-[54ch] text-[1.0625rem] leading-relaxed text-text transition-transform duration-(--duration-base) ease-(--ease-out-brand) group-hover:translate-x-1 lg:text-lg">
                      {value}
                    </span>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-px left-0 h-px w-0 bg-brand-secondary-600 transition-[width] duration-(--duration-base) ease-(--ease-out-brand) group-hover:w-full"
                    />
                  </li>
                ))}
              </ol>
            </Chapter>
          </div>
        </div>
      </Container>
    </section>
  );
}

type ChapterProps = {
  ref: RefObject<HTMLElement | null>;
  index: number;
  label: string;
  /** Capítulo já alcançado pela leitura: acende o nó no eixo e o ordinal. */
  reached: boolean;
  children: ReactNode;
};

function Chapter({ ref, index, label, reached, children }: ChapterProps) {
  return (
    <article ref={ref} className="relative pb-14 pl-6 last:pb-0 sm:pb-16 sm:pl-9 lg:pb-24 lg:pl-16">
      <span
        aria-hidden="true"
        className={cn(
          'absolute top-[0.45rem] left-0 size-[7px] -translate-x-1/2 rotate-45 border transition-colors duration-(--duration-base)',
          reached
            ? 'border-brand-secondary-600 bg-brand-secondary-600'
            : 'border-border-strong bg-surface-sunken'
        )}
      />
      <Reveal>
        <div className="flex items-center gap-3.5">
          <span
            aria-hidden="true"
            className={cn(
              'text-[0.6875rem] font-bold tracking-[0.16em] tabular-nums transition-colors duration-(--duration-base)',
              reached ? 'text-brand-secondary-700' : 'text-text-subtle'
            )}
          >
            {ordinal(index)}
          </span>
          <h3 className="text-[0.6875rem] font-bold tracking-[0.2em] text-text uppercase">
            {label}
          </h3>
        </div>
        {children}
      </Reveal>
    </article>
  );
}
