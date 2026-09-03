export type ClassValue = string | false | null | undefined;

/** Minimal class joiner: avoids pulling clsx/tailwind-merge for this scope. */
export const cn = (...classes: ClassValue[]): string => classes.filter(Boolean).join(' ');
