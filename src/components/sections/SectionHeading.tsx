import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Reveal } from '@/components/ui/Reveal';

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Heading level: pages keep exactly one `h1`. */
  as?: 'h1' | 'h2';
  id?: string;
  invert?: boolean;
  align?: 'start' | 'between';
  actions?: ReactNode;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = 'h2',
  id,
  invert = false,
  align = 'start',
  actions,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      as="header"
      className={cn(
        'flex flex-col gap-6',
        align === 'between' && 'lg:flex-row lg:items-end lg:justify-between lg:gap-12',
        className
      )}
    >
      <div className="max-w-3xl">
        {eyebrow ? <Eyebrow invert={invert}>{eyebrow}</Eyebrow> : null}
        <Tag
          id={id}
          className={cn(
            'mt-5 text-display font-extrabold text-balance',
            invert && 'text-text-invert'
          )}
        >
          {title}
        </Tag>
        {description ? (
          <div
            className={cn(
              'measure mt-5 text-lead',
              invert ? 'text-text-invert-muted' : 'text-text-muted'
            )}
          >
            {description}
          </div>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap gap-3">{actions}</div> : null}
    </Reveal>
  );
}
