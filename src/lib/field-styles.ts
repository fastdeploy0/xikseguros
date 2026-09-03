import { cn } from './cn';

const CONTROL =
  'w-full min-h-12 rounded-md border bg-surface px-4 text-base text-text placeholder:text-text-subtle ' +
  'transition-[border-color,box-shadow] duration-(--duration-fast) ' +
  'hover:border-border-strong focus:border-brand-primary focus:outline-none focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 focus-visible:outline-brand-secondary-600';

export const inputClass = (invalid: boolean): string =>
  cn(CONTROL, invalid ? 'border-danger' : 'border-border');

export const textareaClass = (invalid: boolean): string =>
  cn(CONTROL, 'min-h-32 resize-y py-3 leading-relaxed', invalid ? 'border-danger' : 'border-border');
