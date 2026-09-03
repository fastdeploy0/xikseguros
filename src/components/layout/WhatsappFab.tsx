import { useScrolled } from '@/hooks/useScrolled';
import { buildWhatsappUrl } from '@/lib/runtime-config';
import { cn } from '@/lib/cn';
import { WhatsappIcon } from '@/components/ui/WhatsappIcon';

/**
 * Floating WhatsApp entry point. Appears after the hero scroll so it never
 * competes with the primary CTA, and is omitted when no number is configured.
 */
export function WhatsappFab() {
  const url = buildWhatsappUrl();
  const visible = useScrolled(560);

  if (!url) return null;

  return (
    <div
      className={cn(
        'fixed right-4 z-40 transition-[opacity,transform] duration-(--duration-base) ease-(--ease-out-brand) sm:right-6',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      )}
      style={{ bottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        title="Falar no WhatsApp"
        className="grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lifted transition-[background-color,transform,box-shadow] duration-(--duration-base) ease-(--ease-out-brand) hover:bg-[#20bd5a] motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_4px_20px_-4px_rgb(37_211_102/0.55)]"
      >
        <WhatsappIcon className="size-7" />
        <span className="sr-only">Falar no WhatsApp</span>
      </a>
    </div>
  );
}
