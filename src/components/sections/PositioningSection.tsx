import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import campaignVisual from '@/assets/marketing/como-a-xik-trabalha.webp';
import { resolveHomeCampaign, type CampaignOrbitItem } from '@/data/campaigns';
import { cn } from '@/lib/cn';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';

/** Mobile strip: Porto no centro para tooltip legível. */
const MOBILE_STRIP_ORDER = ['telefone', 'porto', 'instagram'] as const;

const SIZE_CLASS = {
  sm: 'min-h-10 min-w-10 px-2.5 py-1.5 text-[0.625rem]',
  md: 'min-h-11 min-w-11 px-3 py-2 text-[0.6875rem]',
  lg: 'min-h-12 min-w-12 px-3.5 py-2 text-xs sm:text-sm',
} as const;

const STRIP_SIZE_CLASS =
  'min-h-10 w-full px-2 py-2 text-[0.625rem] leading-tight sm:min-h-11 sm:text-[0.6875rem]';

/**
 * Home campaign: three gold bullets around the product visual (left);
 * headline, subheadline and CTA on the right.
 */
export function PositioningSection() {
  const reduced = useReducedMotion();
  const campaign = resolveHomeCampaign();
  const [activeOrbitId, setActiveOrbitId] = useState<string | null>(null);

  if (!campaign) return null;

  return (
    <Section
      tone="invert"
      edgeTop="hairline"
      edgeBottom="fade-to-base"
      aria-labelledby="posicionamento-titulo"
      backdrop={
        <>
          <div aria-hidden="true" className="absolute inset-0 bg-brand-primary-900" />
          <div aria-hidden="true" className="surface-grid-invert absolute inset-0 opacity-50" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[18%] left-[6%] aspect-square w-[min(28rem,55vw)] opacity-25 brand-glow"
          />
        </>
      }
    >
      <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] lg:gap-14 xl:gap-16">
        <Reveal index={0} className="order-2 lg:order-1">
          <div className="flex flex-col gap-4 lg:hidden">
            <CampaignVisualStage reduced={Boolean(reduced)} showOrbit={false} />
            <CampaignOrbitStrip
              items={campaign.orbit}
              reduced={Boolean(reduced)}
              activeOrbitId={activeOrbitId}
              setActiveOrbitId={setActiveOrbitId}
            />
          </div>

          <div className="hidden lg:block">
            <CampaignVisualStage
              reduced={Boolean(reduced)}
              showOrbit
              orbitItems={campaign.orbit}
              activeOrbitId={activeOrbitId}
              setActiveOrbitId={setActiveOrbitId}
            />
          </div>
        </Reveal>

        <div className="order-1 flex flex-col justify-center lg:order-2">
          <Reveal as="header">
            {campaign.eyebrow ? <Eyebrow invert>{campaign.eyebrow}</Eyebrow> : null}
            <h2
              id="posicionamento-titulo"
              className={cn(
                'text-display font-extrabold text-balance text-text-invert',
                campaign.eyebrow ? 'mt-5' : 'mt-0'
              )}
            >
              {campaign.headline}
            </h2>
            <p className="measure mt-5 text-lead text-text-invert-muted">{campaign.subheadline}</p>
            <Button to={campaign.ctaTo} variant="secondary" size="lg" withArrow className="mt-8 w-full sm:w-auto">
              {campaign.ctaLabel}
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function CampaignVisualStage({
  reduced,
  showOrbit,
  orbitItems = [],
  activeOrbitId,
  setActiveOrbitId,
}: {
  reduced: boolean;
  showOrbit: boolean;
  orbitItems?: CampaignOrbitItem[];
  activeOrbitId?: string | null;
  setActiveOrbitId?: (id: string | null | ((current: string | null) => string | null)) => void;
}) {
  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-xl lg:max-w-none',
        showOrbit ? 'aspect-[5/4]' : 'aspect-[4/3]'
      )}
      aria-label="Destaques da campanha Porto Seguro"
    >
      {showOrbit ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          className="pointer-events-none absolute inset-[4%] z-[1] size-[92%] opacity-60"
          preserveAspectRatio="xMidYMid meet"
        >
          <ellipse
            cx="50"
            cy="48"
            rx="42"
            ry="38"
            fill="none"
            stroke="var(--color-brand-secondary)"
            strokeWidth="0.35"
            strokeOpacity="0.45"
            strokeDasharray="2 3"
          />
        </svg>
      ) : null}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[10%] bottom-[4%] z-0"
      >
        <div className="relative mx-auto aspect-[2.2/1] w-full">
          <span className="absolute inset-x-[8%] top-[42%] h-[55%] rounded-[100%] bg-black/45 blur-2xl" />
          <span className="absolute inset-0 rounded-[100%] border border-brand-secondary/25 bg-[radial-gradient(ellipse_at_center,var(--color-surface-invert-elevated)_0%,var(--color-brand-primary-900)_72%)] shadow-[0_18px_40px_-18px_rgb(0_0_0_/_0.65)]" />
          <span className="absolute inset-[7%] rounded-[100%] border border-white/5 bg-brand-primary/40" />
          <span
            className={cn(
              'absolute inset-[18%] rounded-[100%] bg-brand-secondary/20 blur-md',
              !reduced && 'motion-safe:animate-pulse'
            )}
          />
          <span className="absolute inset-x-[22%] top-[28%] h-px bg-gradient-to-r from-transparent via-brand-secondary/50 to-transparent" />
        </div>
      </div>

      <motion.div
        className="absolute inset-x-[8%] top-[8%] bottom-[10%] z-[2]"
        animate={
          reduced
            ? undefined
            : {
                y: [0, -8, 0],
                scale: [1, 1.01, 1],
              }
        }
        transition={
          reduced
            ? undefined
            : {
                duration: 6.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
      >
        <img
          src={campaignVisual}
          alt="Casa e automóvel ilustrando a campanha de consórcio Porto Seguro intermediada pela Xik"
          width={1536}
          height={1024}
          loading="lazy"
          decoding="async"
          className="relative mx-auto h-full w-full object-contain object-bottom drop-shadow-[0_32px_48px_rgb(0_0_0_/_0.42)]"
        />
      </motion.div>

      {showOrbit && setActiveOrbitId ? (
        <ul className="absolute inset-0 z-[3]">
          {orbitItems.map((item, index) => (
            <CampaignOrbitBullet
              key={item.id}
              item={item}
              index={index}
              layout="orbit"
              reduced={reduced}
              isActive={activeOrbitId === item.id}
              onActivate={() => setActiveOrbitId(item.id)}
              onDeactivate={() =>
                setActiveOrbitId((current) => (current === item.id ? null : current))
              }
            />
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function CampaignOrbitStrip({
  items,
  reduced,
  activeOrbitId,
  setActiveOrbitId,
}: {
  items: CampaignOrbitItem[];
  reduced: boolean;
  activeOrbitId: string | null;
  setActiveOrbitId: (id: string | null | ((current: string | null) => string | null)) => void;
}) {
  const byId = Object.fromEntries(items.map((item) => [item.id, item]));
  const ordered = MOBILE_STRIP_ORDER.map((id) => byId[id]).filter(Boolean) as CampaignOrbitItem[];
  const stripAligns: Array<'start' | 'center' | 'end'> = ['start', 'center', 'end'];

  return (
    <ul
      className={cn(
        'relative grid grid-cols-3 gap-2 overflow-visible',
        activeOrbitId === 'porto' && 'pb-[7.5rem]'
      )}
      aria-label="Destaques da campanha"
    >
      {ordered.map((item, index) => (
        <CampaignOrbitBullet
          key={item.id}
          item={item}
          index={index}
          layout="strip"
          stripAlign={stripAligns[index] ?? 'center'}
          reduced={reduced}
          isActive={activeOrbitId === item.id}
          onActivate={() => setActiveOrbitId(item.id)}
          onDeactivate={() =>
            setActiveOrbitId((current) => (current === item.id ? null : current))
          }
        />
      ))}
    </ul>
  );
}

function CampaignOrbitBullet({
  item,
  index,
  layout,
  stripAlign = 'center',
  reduced,
  isActive,
  onActivate,
  onDeactivate,
}: {
  item: CampaignOrbitItem;
  index: number;
  layout: 'orbit' | 'strip';
  stripAlign?: 'start' | 'center' | 'end';
  reduced: boolean;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const size = item.size ?? 'md';
  const isStrip = layout === 'strip';
  const showTooltip = Boolean(item.detail || item.partnerHref);
  const showDetail = showTooltip && isActive;

  const shellClass = cn(
    'group relative flex flex-col items-center justify-center rounded-full text-center font-bold uppercase',
    isStrip
      ? STRIP_SIZE_CLASS
      : cn('max-w-[9.5rem] tracking-[0.08em]', SIZE_CLASS[size]),
    'border-2 border-brand-secondary/60 bg-brand-primary-900/85 text-brand-secondary',
    'shadow-[0_8px_28px_-10px_rgb(0_0_0_/_0.55),inset_0_1px_0_rgb(255_255_255_/_0.22)]',
    'backdrop-blur-md transition-[border-color,box-shadow,background-color,color,transform] duration-(--duration-base) ease-(--ease-out-brand)',
    'hover:border-brand-secondary hover:bg-brand-primary hover:text-brand-accent',
    'hover:shadow-[0_0_0_2px_var(--color-brand-secondary),0_14px_40px_-12px_rgb(200_170_112_/_0.55)]',
    'focus-visible:border-brand-secondary focus-visible:outline-offset-4',
    showDetail && 'border-brand-secondary bg-brand-primary text-brand-accent',
    isStrip && 'tracking-[0.06em]'
  );

  const detailPanel = showTooltip ? (
    <span
      role="tooltip"
      className={cn(
        'absolute z-20 w-max max-w-[min(14rem,calc(100vw-2.5rem))] rounded-lg border border-brand-secondary/40 bg-brand-primary-900/95 px-3 py-2 text-left text-[0.6875rem] leading-snug font-normal tracking-normal text-text-invert-muted normal-case shadow-lifted backdrop-blur-md transition-[opacity,transform] duration-(--duration-fast)',
        isStrip
          ? stripAlign === 'start'
            ? 'top-[calc(100%+0.45rem)] left-0 translate-x-0'
            : stripAlign === 'end'
              ? 'top-[calc(100%+0.45rem)] right-0 left-auto translate-x-0'
              : 'top-[calc(100%+0.45rem)] left-1/2 -translate-x-1/2'
          : 'top-[calc(100%+0.55rem)] left-1/2 -translate-x-1/2',
        item.partnerHref ? 'pointer-events-auto' : 'pointer-events-none',
        showDetail ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0'
      )}
    >
      {item.detail}
      {item.partnerHref ? (
        <a
          href={item.partnerHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 block font-semibold text-brand-secondary underline-offset-2 transition-colors duration-(--duration-fast) hover:text-brand-accent hover:underline"
          onClick={(event) => event.stopPropagation()}
        >
          {item.partnerLabel ?? 'Saiba mais'}
        </a>
      ) : null}
    </span>
  ) : null;

  const inner = (
    <>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[3px] rounded-full border border-brand-secondary/25 bg-white/5"
      />
      <span className="relative leading-tight">{item.label}</span>
      {detailPanel}
    </>
  );

  const control =
    item.href && item.href.startsWith('/') ? (
      <Link
        to={item.href}
        className={shellClass}
        onMouseEnter={showTooltip ? onActivate : undefined}
        onMouseLeave={showTooltip ? onDeactivate : undefined}
        onFocus={showTooltip ? onActivate : undefined}
        onBlur={showTooltip ? onDeactivate : undefined}
      >
        {inner}
      </Link>
    ) : item.href ? (
      <a
        href={item.href}
        className={shellClass}
        {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        aria-label={item.label}
      >
        {inner}
      </a>
    ) : (
      <button
        type="button"
        className={shellClass}
        aria-expanded={showDetail}
        onMouseEnter={onActivate}
        onMouseLeave={onDeactivate}
        onFocus={onActivate}
        onBlur={onDeactivate}
        onClick={() => (isActive ? onDeactivate() : onActivate())}
      >
        {inner}
      </button>
    );

  const motionWrap = (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.6 }}
      whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={
        reduced
          ? { duration: 0 }
          : { duration: 0.5, delay: 0.15 + index * 0.07, ease: [0.22, 1, 0.36, 1] }
      }
      whileHover={reduced || isStrip ? undefined : { scale: 1.08 }}
      whileTap={reduced ? undefined : { scale: 0.94 }}
    >
      <motion.div
        animate={reduced || isStrip ? undefined : { y: [0, -7, 0] }}
        transition={
          reduced || isStrip
            ? undefined
            : {
                duration: 4.8 + item.floatDelay,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: item.floatDelay,
              }
        }
      >
        {control}
      </motion.div>
    </motion.div>
  );

  if (isStrip) {
    return <li className="min-w-0">{motionWrap}</li>;
  }

  return (
    <li
      className="absolute"
      style={{ left: item.x, top: item.y, transform: 'translate(-50%, -50%)' }}
    >
      {motionWrap}
    </li>
  );
}
