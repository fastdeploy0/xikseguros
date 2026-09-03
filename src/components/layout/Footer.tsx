import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, MessageCircle, Phone } from 'lucide-react';
import { company, socialLinks } from '@/data/company';
import { healthPlans, servicePath } from '@/data/services';
import {
  insuranceNavServices,
  investmentNavChildren,
  primaryCta,
} from '@/data/navigation';
import { buildWhatsappUrl } from '@/lib/runtime-config';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';

function ColumnHeading({ children }: { children: string }) {
  return (
    <h2 className="mb-4 text-[0.6875rem] font-bold tracking-[0.2em] text-brand-secondary uppercase">
      {children}
    </h2>
  );
}

const linkClass =
  'inline-block rounded-sm py-1 text-sm text-text-invert-muted transition-colors duration-(--duration-fast) hover:text-text-invert';

export function Footer() {
  const whatsappUrl = buildWhatsappUrl();
  const year = new Date().getFullYear();

  return (
    <footer className="on-invert relative overflow-hidden bg-surface-invert text-text-invert">
      <div aria-hidden="true" className="surface-grid-invert absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-24 size-96 opacity-25 brand-glow"
      />

      <Container className="relative">
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_repeat(4,minmax(0,1fr))] lg:gap-8 lg:py-20">
          <div className="flex flex-col gap-6">
            <Link to="/" aria-label={`${company.name}, página inicial`} className="w-fit rounded-sm">
              <Logo variant="dark" className="h-14" />
            </Link>
            <p className="measure-tight text-sm leading-relaxed text-text-invert-muted">
              Corretora de seguros em Belo Horizonte, atuando desde {company.foundedYear} na
              intermediação de planos de saúde, seguros, consórcios e previdência privada.
            </p>
            <ul className="flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-11 items-center gap-2 rounded-md border border-border-invert px-4 text-sm font-semibold transition-colors duration-(--duration-fast) hover:border-brand-secondary/70 hover:bg-white/10"
                  >
                    {social.name}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-3.5 text-brand-secondary transition-transform duration-(--duration-base) ease-(--ease-out-brand) motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                    />
                    <span className="sr-only">
                      {company.name} no {social.name} ({social.handle})
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Planos de saúde">
            <ColumnHeading>Planos de saúde</ColumnHeading>
            <ul>
              {healthPlans.map((service) => (
                <li key={service.slug}>
                  <Link to={servicePath(service)} className={linkClass}>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Seguros">
            <ColumnHeading>Seguros</ColumnHeading>
            <ul>
              {insuranceNavServices.map((service) => (
                <li key={service.slug}>
                  <Link to={servicePath(service)} className={linkClass}>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Investimentos">
            <ColumnHeading>Investimentos</ColumnHeading>
            <ul>
              {investmentNavChildren.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <ColumnHeading>Contato</ColumnHeading>
            <ul className="flex flex-col gap-1">
              {company.phones.map((phone) => (
                <li key={phone.tel}>
                  <a href={`tel:${phone.tel}`} className={`${linkClass} inline-flex items-center gap-2.5`}>
                    <Phone aria-hidden="true" className="size-4 shrink-0 text-brand-secondary" />
                    {phone.display}
                  </a>
                </li>
              ))}

              {whatsappUrl ? (
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClass} inline-flex items-center gap-2.5`}
                  >
                    <MessageCircle aria-hidden="true" className="size-4 shrink-0 text-brand-secondary" />
                    WhatsApp
                  </a>
                </li>
              ) : null}

              {/* TODO(content): renderizar e-mail e horário de atendimento quando a
                  Xik confirmar os valores oficiais em src/data/company.ts. */}
              {company.email ? (
                <li>
                  <a href={`mailto:${company.email}`} className={linkClass}>
                    {company.email}
                  </a>
                </li>
              ) : null}

              <li className="flex items-start gap-2.5 pt-2 text-sm leading-relaxed text-text-invert-muted">
                <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-secondary" />
                <span>{company.address.full}</span>
              </li>

              {company.businessHours ? (
                <li className="pt-1 text-sm text-text-invert-muted">{company.businessHours}</li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border-invert py-7 text-xs text-text-invert-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}. CNPJ {company.cnpj}. Todos os direitos reservados.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link to={primaryCta.to} className="rounded-sm hover:text-text-invert">
                {primaryCta.label}
              </Link>
            </li>
            <li>
              <Link to="/politica-de-privacidade" className="rounded-sm hover:text-text-invert">
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
