import { useEffect, useRef, type RefObject } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { company, socialLinks } from '@/data/company';
import { mainNav, primaryCta, type NavItem } from '@/data/navigation';
import { useScrollLock } from '@/hooks/useScrollLock';
import { buildWhatsappUrl } from '@/lib/runtime-config';
import { Button } from '@/components/ui/Button';

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  /** Focus returns here when the panel closes. */
  returnFocusTo: RefObject<HTMLButtonElement | null>;
};

const FOCUSABLE = 'a[href], button:not([disabled])';

function navItemIsActive(item: NavItem, pathname: string): boolean {
  if (item.children?.length) {
    if (item.children.some((child) => pathname === child.to)) return true;
    if (pathname === item.to) return true;
    return false;
  }
  return pathname === item.to;
}

export function MobileNav({ open, onClose, returnFocusTo }: MobileNavProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const whatsappUrl = buildWhatsappUrl();
  const { pathname } = useLocation();

  useScrollLock(open);

  // Move focus into the panel on open and restore it on close.
  useEffect(() => {
    if (!open) return;
    const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();
    const trigger = returnFocusTo.current;
    return () => trigger?.focus({ preventScroll: true });
  }, [open, returnFocusTo]);

  // Escape closes; Tab is trapped inside the panel while it is open.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const nodes = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes?.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-90 lg:hidden"
          initial={reduced ? undefined : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-brand-primary-900/55 backdrop-blur-[2px]"
            tabIndex={-1}
          />

          <motion.div
            ref={panelRef}
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className="on-invert absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-surface-invert text-text-invert"
            initial={reduced ? undefined : { x: '100%' }}
            animate={reduced ? undefined : { x: 0 }}
            exit={reduced ? undefined : { x: '100%' }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-border-invert px-6 py-4">
              <span className="text-[0.6875rem] font-bold tracking-[0.24em] text-brand-secondary uppercase">
                Navegação
              </span>
              <button
                type="button"
                onClick={onClose}
                className="grid size-11 place-items-center rounded-md border border-border-invert transition-colors duration-(--duration-fast) hover:bg-white/10"
              >
                <X aria-hidden="true" className="size-5" />
                <span className="sr-only">Fechar menu</span>
              </button>
            </div>

            <nav aria-label="Navegação principal (mobile)" className="flex-1 px-6 py-6">
              <ul className="flex flex-col gap-1">
                {mainNav.map((item) => (
                  <li key={`${item.label}-${item.to}`} className="py-1">
                    <NavLink
                      to={item.to}
                      onClick={onClose}
                      className={() =>
                        cn(
                          'block rounded-sm py-2 text-2xl font-bold tracking-[-0.025em] transition-colors duration-(--duration-fast)',
                          navItemIsActive(item, pathname)
                            ? 'text-brand-secondary'
                            : 'hover:text-brand-secondary'
                        )
                      }
                    >
                      {item.label}
                    </NavLink>

                    {item.children?.length ? (
                      <ul className="mt-1 flex flex-col border-l border-border-invert pl-4">
                        {item.children.map((child) => (
                          <li key={child.to}>
                            <Link
                              to={child.to}
                              onClick={onClose}
                              className="block min-h-11 rounded-sm py-2.5 text-[0.9375rem] text-text-invert-muted transition-colors duration-(--duration-fast) hover:text-text-invert"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-3 border-t border-border-invert px-6 py-6">
              <Button to={primaryCta.to} onClick={onClose} variant="secondary" size="lg" withArrow>
                {primaryCta.label}
              </Button>

              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2.5 rounded-md border border-border-invert px-4 text-sm font-semibold transition-colors duration-(--duration-fast) hover:bg-white/10"
                >
                  <MessageCircle aria-hidden="true" className="size-4 text-brand-secondary" />
                  Falar no WhatsApp
                </a>
              ) : null}

              <ul className="flex flex-col gap-1 pt-1">
                {company.phones.map((phone) => (
                  <li key={phone.tel}>
                    <a
                      href={`tel:${phone.tel}`}
                      className="inline-flex min-h-11 items-center gap-2.5 rounded-sm text-sm text-text-invert-muted transition-colors duration-(--duration-fast) hover:text-text-invert"
                    >
                      <Phone aria-hidden="true" className="size-4 text-brand-secondary" />
                      {phone.display}
                    </a>
                  </li>
                ))}
              </ul>

              <ul className="flex flex-wrap gap-x-4 gap-y-1 pt-2">
                {socialLinks.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-sm text-xs font-semibold tracking-wide text-text-invert-muted uppercase transition-colors duration-(--duration-fast) hover:text-brand-secondary"
                    >
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
