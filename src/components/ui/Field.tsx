import type { ReactNode } from 'react';
import { CircleAlert } from 'lucide-react';

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  /** Render prop so each control keeps its own native element and attributes. */
  children: (props: { id: string; describedBy: string | undefined; invalid: boolean }) => ReactNode;
};

/** Label + hint + error shell shared by every form control. */
export function Field({ id, label, error, hint, required, children }: FieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-text">
        {label}
        {required ? (
          <span className="ml-1 text-brand-secondary-700" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1.5 text-xs font-medium text-text-subtle">(opcional)</span>
        )}
      </label>

      {children({ id, describedBy, invalid: Boolean(error) })}

      {/* Hint sits below the control so fields stay baseline-aligned in a grid. */}
      {hint ? (
        <p id={hintId} className="text-xs text-text-subtle">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="flex items-center gap-1.5 text-sm font-medium text-danger">
          <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}
