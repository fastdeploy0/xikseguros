import { Link } from 'react-router-dom';
import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'motion/react';
import {
  Briefcase,
  Building2,
  CircleDollarSign,
  HeartPulse,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { company } from '@/data/company';
import { Logo } from '@/components/ui/Logo';

type Medallion = {
  id: string;
  label: string;
  to: string;
  icon: LucideIcon;
  /** Position inside the stage (%). */
  x: string;
  y: string;
  size: 'sm' | 'md' | 'lg';
  floatDelay: number;
};

/**
 * Five pillar / product medallions around the centered brand mark.
 * Pentagon layout (same % map on mobile and desktop).
 */
const MEDALLIONS: Medallion[] = [
  {
    id: 'planos',
    label: 'Planos de saúde',
    to: '/planos',
    icon: HeartPulse,
    x: '50%',
    y: '12%',
    size: 'lg',
    floatDelay: 0,
  },
  {
    id: 'seguros',
    label: 'Seguros',
    to: '/seguros',
    icon: Building2,
    x: '86%',
    y: '38%',
    size: 'lg',
    floatDelay: 0.3,
  },
  {
    id: 'empresarial',
    label: 'Seguro empresarial',
    to: '/seguros/seguro-empresarial',
    icon: Briefcase,
    x: '72%',
    y: '82%',
    size: 'md',
    floatDelay: 0.6,
  },
  {
    id: 'financiamento',
    label: 'Financiamento de veículos',
    to: '/seguros/financiamento-veiculos',
    icon: Wallet,
    x: '28%',
    y: '82%',
    size: 'md',
    floatDelay: 0.9,
  },
  {
    id: 'consorcios',
    label: 'Consórcios',
    to: '/seguros/consorcios',
    icon: CircleDollarSign,
    x: '14%',
    y: '38%',
    size: 'lg',
    floatDelay: 1.15,
  },
];

const SIZE_CLASS = {
  sm: 'size-[4.25rem] sm:size-[4.75rem]',
  md: 'size-[4.75rem] sm:size-[5.5rem]',
  lg: 'size-[5.5rem] sm:size-[6.25rem]',
} as const;

type HeroMedallionsProps = {
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
};

/**
 * Brand mark at center; interactive glass medallions on the ring.
 */
export function HeroMedallions({ pointerX, pointerY }: HeroMedallionsProps) {
  const reduced = useReducedMotion();

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[28rem] lg:max-w-none"
      aria-label="Atalhos para modalidades intermediadas pela Xik"
    >
      <div
        aria-hidden="true"
        className="absolute inset-[6%] rounded-full border border-border-invert bg-surface-invert-elevated/35 shadow-[inset_0_0_60px_rgb(0_0_0_/_0.25)] backdrop-blur-sm"
      />
      <div
        aria-hidden="true"
        className="absolute inset-[18%] rounded-full border border-brand-secondary/20"
      />

      <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 size-full opacity-50">
        <circle
          cx="50"
          cy="50"
          r="36"
          fill="none"
          stroke="var(--color-brand-secondary)"
          strokeWidth="0.25"
          strokeOpacity="0.4"
        />
      </svg>

      {/* Center brand */}
      <div className="absolute top-1/2 left-1/2 z-[2] flex size-[30%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brand-secondary/40 bg-brand-primary-900/80 shadow-lifted backdrop-blur-md sm:size-[32%]">
        <Link
          to="/"
          className="grid size-full place-items-center rounded-full p-[18%] transition-transform duration-(--duration-base) ease-(--ease-out-brand) motion-safe:hover:scale-105"
          aria-label={`${company.name}, página inicial`}
        >
          <Logo variant="dark" priority className="h-full max-h-14 w-auto sm:max-h-16" />
        </Link>
      </div>

      <ul className="absolute inset-0 z-[1]">
        {MEDALLIONS.map((item, index) => (
          <MedallionItem
            key={item.id}
            item={item}
            index={index}
            reduced={Boolean(reduced)}
            pointerX={pointerX}
            pointerY={pointerY}
          />
        ))}
      </ul>
    </div>
  );
}

function MedallionItem({
  item,
  index,
  reduced,
  pointerX,
  pointerY,
}: {
  item: Medallion;
  index: number;
  reduced: boolean;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
}) {
  const Icon = item.icon;
  const driftFactor = 0.85 + (index % 3) * 0.2;
  const sign = index % 2 === 0 ? 1 : -1;
  const driftX = useTransform(pointerX, (v) => v * driftFactor * sign);
  const driftY = useTransform(pointerY, (v) => v * driftFactor * -sign);

  return (
    <li
      className="absolute"
      style={{ left: item.x, top: item.y, transform: 'translate(-50%, -50%)' }}
    >
      <motion.div
        style={{ x: driftX, y: driftY }}
        initial={reduced ? false : { opacity: 0, scale: 0.65 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={
          reduced
            ? { duration: 0 }
            : { duration: 0.55, delay: 0.25 + index * 0.06, ease: [0.22, 1, 0.36, 1] }
        }
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, -8, 0] }}
          transition={
            reduced
              ? undefined
              : {
                  duration: 4.6 + item.floatDelay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: item.floatDelay,
                }
          }
          whileHover={reduced ? undefined : { scale: 1.12 }}
          whileTap={reduced ? undefined : { scale: 0.96 }}
        >
          <Link
            to={item.to}
            className={cn(
              'group relative grid place-items-center rounded-full',
              SIZE_CLASS[item.size],
              'border-2 border-brand-secondary/55 bg-surface-invert-elevated/80 text-brand-secondary',
              'shadow-[0_10px_36px_-12px_rgb(0_0_0_/_0.55),inset_0_1px_0_rgb(255_255_255_/_0.28)]',
              'backdrop-blur-md transition-[border-color,box-shadow,background-color,color] duration-(--duration-base) ease-(--ease-out-brand)',
              'hover:border-brand-secondary hover:bg-brand-primary hover:text-brand-accent',
              'hover:shadow-[0_0_0_2px_var(--color-brand-secondary),0_16px_48px_-12px_rgb(200_170_112_/_0.65)]',
              'focus-visible:border-brand-secondary focus-visible:outline-offset-4'
            )}
          >
            <span
              aria-hidden="true"
              className="absolute inset-[5px] rounded-full border border-brand-secondary/30 bg-white/5"
            />
            <Icon aria-hidden="true" className="relative size-[40%] stroke-[1.7]" />
            <span className="pointer-events-none absolute top-[calc(100%+0.65rem)] left-1/2 z-10 w-max max-w-[11rem] -translate-x-1/2 rounded-md border border-brand-secondary/35 bg-brand-primary-900 px-2.5 py-1.5 text-center text-[0.625rem] font-bold tracking-[0.14em] text-brand-secondary uppercase opacity-0 shadow-lifted transition-opacity duration-(--duration-fast) group-hover:opacity-100 group-focus-visible:opacity-100">
              {item.label}
            </span>
            <span className="sr-only">{item.label}</span>
          </Link>
        </motion.div>
      </motion.div>
    </li>
  );
}
