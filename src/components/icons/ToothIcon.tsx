import { forwardRef } from 'react';
import type { LucideProps } from 'lucide-react';

/**
 * Classic molar silhouette (stroke) for planos odontológicos: replaces
 * decorative “sparkles” so the modality reads as dental, not generic AI.
 */
export const ToothIcon = forwardRef<SVGSVGElement, LucideProps>(
  ({ color = 'currentColor', size = 24, strokeWidth = 2, className, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={props['aria-hidden'] ?? true}
      {...props}
    >
      {/* Crown */}
      <path d="M8.2 3.8c-1.9 0-3.4 1.7-3.2 3.6.2 1.4.8 2.6 1.1 4 .2 1 .1 2-.3 2.9-.5 1.1-1.1 2.2-1.1 3.5 0 1.4 1 2.4 2.3 2.4 1.1 0 1.8-.7 2.2-1.7.4-1 .7-2.1 1.4-2.1s1 .1 1.4 2.1c.4 1 1.1 1.7 2.2 1.7 1.3 0 2.3-1 2.3-2.4 0-1.3-.6-2.4-1.1-3.5-.4-.9-.5-1.9-.3-2.9.3-1.4.9-2.6 1.1-4 .2-1.9-1.3-3.6-3.2-3.6-1.1 0-2 .5-2.6 1.3C10.2 4.3 9.3 3.8 8.2 3.8Z" />
    </svg>
  )
);

ToothIcon.displayName = 'ToothIcon';
