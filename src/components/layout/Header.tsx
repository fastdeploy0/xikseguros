import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Phone } from 'lucide-react';
import { cn } from '@/lib/cn';
import { company } from '@/data/company';
import { mainNav, primaryCta, type NavItem } from '@/data/navigation';
import { useScrolled } from '@/hooks/useScrolled';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { MobileNav } from './MobileNav';

function navItemIsActive(item: NavItem, pathname: string): boolean {
  if (item.children?.length) {
    if (item.children.some((child) => pathname === child.to)) return true;
    // Hub pages (`/planos`, `/seguros`) without matching a sibling menu's children.
    if (pathname === item.to) return true;
    return false;
  }
  return pathname === item.to;
}

function DesktopDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const { pathname } = useLocation();
  const active = navItemIsActive(item, pathname);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const scheduleClose = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 120);
  };

  const cancelClose = () => window.clearTimeout(closeTimer.current);

  return (
    <div
      ref={wrapperRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={scheduleClose}
      onFocus={() => {
        cancelClose();
        setOpen(true);
      }}
      onBlur={(event) => {
        if (!wrapperRef.current?.contains(event.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setOpen(false);
          wrapperRef.current?.querySelector<HTMLAnchorElement>('a')?.focus();
        }
      }}
    >
      <NavLink
        to={item.to}
        aria-expanded={open}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-sm px-1 py-2 text-[0.9375rem] font-semibold transition-colors duration-(--duration-fast)',
          active ? 'text-brand-primary' : 'text-text-muted hover:text-brand-primary'
        )}
      >
        {item.label}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            'size-4 transition-transform duration-(--duration-base) ease-(--ease-out-brand)',
            open && 'rotate-180'
          )}
        />
      </NavLink>

      <div
        className={cn(
          'absolute top-full left-0 z-50 pt-3 transition-[opacity,transform] duration-(--duration-base) ease-(--ease-out-brand)',
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0'
        )}
        // Keep dropdown links out of the tab order while collapsed.
        {...(open ? {} : { inert: true })}
      >
        <ul className="min-w-72 overflow-hidden rounded-lg border border-border bg-surface p-1.5 shadow-lifted">
          {item.children?.map((child) => (
            <li key={child.to}>
              <Link
                to={child.to}
                className="flex flex-col gap-0.5 rounded-md px-3.5 py-2.5 transition-colors duration-(--duration-fast) hover:bg-surface-sunken"
              >
                <span className="text-[0.9375rem] font-semibold text-text">{child.label}</span>
                {child.description ? (
                  <span className="text-xs text-text-subtle">{child.description}</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Header() {
  const scrolled = useScrolled(24);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const primaryPhone = company.phones[0];
  const { pathname } = useLocation();

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-(--duration-base) ease-(--ease-out-brand)',
          scrolled
            ? 'border-border bg-bg/85 shadow-soft backdrop-blur-md supports-[backdrop-filter]:bg-bg/75'
            : 'border-transparent bg-bg'
        )}
      >
        <Container
          className={cn(
            'flex items-center justify-between gap-6 transition-[padding] duration-(--duration-base) ease-(--ease-out-brand)',
            scrolled ? 'py-2.5' : 'py-4'
          )}
        >
          <Link
            to="/"
            className="flex shrink-0 items-center rounded-sm"
            aria-label={`${company.name}, página inicial`}
          >
            <Logo
              variant="light"
              priority
              className={cn(
                'transition-[height] duration-(--duration-base) ease-(--ease-out-brand)',
                scrolled ? 'h-9' : 'h-11'
              )}
            />
          </Link>

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {mainNav.map((item) => (
                <li key={`${item.label}-${item.to}`}>
                  {item.children?.length ? (
                    <DesktopDropdown item={item} />
                  ) : (
                    <NavLink
                      to={item.to}
                      className={() =>
                        cn(
                          'rounded-sm px-1 py-2 text-[0.9375rem] font-semibold transition-colors duration-(--duration-fast)',
                          navItemIsActive(item, pathname)
                            ? 'text-brand-primary'
                            : 'text-text-muted hover:text-brand-primary'
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${primaryPhone.tel}`}
              className="hidden items-center gap-2 rounded-sm text-sm font-semibold text-text-muted transition-colors duration-(--duration-fast) hover:text-brand-primary xl:inline-flex"
            >
              <Phone aria-hidden="true" className="size-4" />
              {primaryPhone.display}
            </a>

            {/* Wrapper, not a `hidden` class on the Button: the Button base sets
                `inline-flex`, which would win over `hidden` at equal specificity. */}
            <div className="hidden sm:block">
              <Button to={primaryCta.to} variant="primary" withArrow>
                {primaryCta.label}
              </Button>
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              className="grid size-11 place-items-center rounded-md border border-border text-brand-primary transition-colors duration-(--duration-fast) hover:bg-surface-sunken lg:hidden"
            >
              <Menu aria-hidden="true" className="size-5" />
              <span className="sr-only">Abrir menu de navegação</span>
            </button>
          </div>
        </Container>
      </header>

      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        returnFocusTo={menuButtonRef}
      />
    </>
  );
}
