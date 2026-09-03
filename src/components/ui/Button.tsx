import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'invert';
export type ButtonSize = 'md' | 'lg';

const BASE =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-md font-semibold ' +
  'transition-[background-color,color,border-color,box-shadow,transform] duration-(--duration-base) ' +
  'ease-(--ease-out-brand) select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-55';

const VARIANT: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-primary text-text-invert shadow-soft hover:bg-brand-primary-600 hover:shadow-lifted',
  secondary:
    'bg-brand-secondary text-brand-primary-900 shadow-soft hover:bg-brand-secondary-300 hover:shadow-lifted',
  ghost:
    'border border-border-strong bg-transparent text-text hover:border-brand-primary hover:bg-brand-primary/5',
  invert:
    'border border-border-invert bg-white/5 text-text-invert hover:border-brand-secondary/70 hover:bg-white/10',
};

const SIZE: Record<ButtonSize, string> = {
  md: 'min-h-11 px-5 text-[0.9375rem]',
  lg: 'min-h-13 px-7 text-base',
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Appends an arrow that shifts on hover: reinforces "next step". */
  withArrow?: boolean;
  children: ReactNode;
};

type AsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { to?: never; href?: never };

type AsLink = CommonProps & { to: string; href?: never };

type AsAnchor = CommonProps & {
  href: string;
  to?: never;
  /** External destinations open in a new tab. */
  external?: boolean;
  'aria-label'?: string;
};

export type ButtonProps = AsButton | AsLink | AsAnchor;

function Inner({ withArrow, children }: Pick<CommonProps, 'withArrow' | 'children'>) {
  return (
    <>
      <span>{children}</span>
      {withArrow ? (
        <ArrowRight
          aria-hidden="true"
          className="size-4 shrink-0 transition-transform duration-(--duration-base) ease-(--ease-out-brand) motion-safe:group-hover:translate-x-1"
        />
      ) : null}
    </>
  );
}

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className, withArrow, children } = props;
  const classes = cn(BASE, VARIANT[variant], SIZE[size], className);

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        <Inner withArrow={withArrow}>{children}</Inner>
      </Link>
    );
  }

  if ('href' in props && props.href) {
    const { href, external = true, ...rest } = props;
    return (
      <a
        href={href}
        className={classes}
        aria-label={rest['aria-label']}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <Inner withArrow={withArrow}>{children}</Inner>
      </a>
    );
  }

  const buttonProps: ButtonHTMLAttributes<HTMLButtonElement> = { ...(props as AsButton) };
  delete (buttonProps as Record<string, unknown>).variant;
  delete (buttonProps as Record<string, unknown>).size;
  delete (buttonProps as Record<string, unknown>).withArrow;
  delete buttonProps.className;
  delete buttonProps.children;

  return (
    <button type="button" {...buttonProps} className={classes}>
      <Inner withArrow={withArrow}>{children}</Inner>
    </button>
  );
}
