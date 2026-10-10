import { useState } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import { consortiumSimulationOptions } from '@/data/consortium-simulation';
import { cn } from '@/lib/cn';
import { hasWhatsapp } from '@/lib/runtime-config';
import { Button } from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ConsortiumSimulationModal } from './ConsortiumSimulationModal';

/**
 * Destaque de consórcio (direção 1f): faixa rebaixada que sangra até a borda
 * esquerda. `@container` na seção dá a largura real para o sangrado (cqw).
 * Cada linha abre o modal com o bem pré-selecionado; o CTA abre sem pré-seleção.
 * Seção própria, logo antes do Cotar Agora; sem WhatsApp, não renderiza.
 */
export function ConsortiumSection() {
  const [simulation, setSimulation] = useState<{ asset?: string } | null>(null);

  // Safari não foca botões no clique: focar antes de abrir garante a volta do foco.
  const openSimulation = (event: ReactMouseEvent<HTMLButtonElement>, asset?: string) => {
    event.currentTarget.focus();
    setSimulation({ asset });
  };

  if (!hasWhatsapp()) return null;

  return (
    <Section
      id="consorcio"
      tone="surface"
      className="@container pb-0!"
      edgeTop="gold-rule"
      aria-labelledby="consorcio-titulo"
    >
      <Reveal
        className={cn(
          'relative flex flex-col gap-4 overflow-hidden rounded-r-lg border border-l-0 bg-surface-sunken',
          'ml-[calc(50%-50cqw)] pt-7 pr-5 pb-6 pl-[calc(50cqw-50%)]',
          'lg:mr-[calc(50%-50cqw)] lg:grid lg:grid-cols-[minmax(0,1fr)_25rem] lg:gap-x-12 lg:gap-y-[1.375rem] lg:rounded-r-xl lg:py-12 lg:pr-12',
          'xl:grid-cols-[minmax(0,1fr)_30rem]'
        )}
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 360 300"
          fill="none"
          stroke="currentColor"
          className="pointer-events-none absolute -top-2.5 -right-10 h-[170px] w-[200px] text-brand-secondary opacity-30 [stroke-width:4] lg:-top-5 lg:right-[560px] lg:h-[300px] lg:w-[360px] lg:opacity-35 lg:[stroke-width:3]"
        >
          <path d="M40 10 190 150 40 290" />
          <path d="M120 10 270 150 120 290" />
          <path d="M200 10 350 150 200 290" />
        </svg>

        <div className="relative font-mono text-[0.6875rem] leading-[normal] font-medium tracking-[0.08em] text-brand-secondary-700 uppercase lg:text-xs">
          Destaque
        </div>
        <h2
          id="consorcio-titulo"
          className="relative text-[3rem] leading-[0.98] font-extrabold tracking-[-0.04em] text-text lg:text-[5rem]"
        >
          <span className="block">Consórcio</span> Xik
        </h2>
        <p className="relative text-base leading-normal text-text-muted lg:max-w-[26.25rem] lg:text-[1.1875rem]">
          <span className="hidden lg:inline">
            Planeje a compra de um bem com a orientação de um corretor. Escolha ao lado e simule.
          </span>
          <span className="lg:hidden">
            Planeje a compra de um bem com a orientação de um corretor. Escolha abaixo e simule.
          </span>
        </p>

        <div
          role="group"
          aria-label="Tipo de bem"
          className="relative border-t border-brand-secondary lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:self-start"
        >
          {consortiumSimulationOptions.asset.map((asset) => (
            <button
              key={asset}
              type="button"
              aria-haspopup="dialog"
              onClick={(event) => openSimulation(event, asset)}
              className="flex min-h-14 w-full items-center justify-between gap-4 border-b px-3.5 text-left text-[1.0625rem] font-semibold text-text transition-colors duration-(--duration-base) hover:bg-surface lg:min-h-[4.25rem] lg:px-5 lg:text-[1.375rem]"
            >
              <span>{asset}</span>
              <span className="inline-flex shrink-0 items-center gap-2 text-[0.8125rem] font-semibold lg:text-sm">
                Simular
                <ArrowRight aria-hidden="true" className="hidden size-4 lg:block" />
              </span>
            </button>
          ))}
        </div>

        <Button
          size="lg"
          withArrow
          aria-haspopup="dialog"
          onClick={(event: ReactMouseEvent<HTMLButtonElement>) => openSimulation(event)}
          className="w-full lg:col-start-1 lg:min-h-14 lg:w-auto lg:justify-self-start lg:text-[1.0625rem]"
        >
          Simular consórcio
        </Button>
      </Reveal>

      <ConsortiumSimulationModal
        open={simulation !== null}
        asset={simulation?.asset}
        onClose={() => setSimulation(null)}
      />
    </Section>
  );
}
