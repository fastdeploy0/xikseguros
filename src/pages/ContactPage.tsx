import { useMemo } from 'react';
import { ArrowUpRight, MapPin, MessageCircle, Phone } from 'lucide-react';
import { company, socialLinks } from '@/data/company';
import { breadcrumbSchema, organizationSchema } from '@/lib/seo';
import { buildWhatsappUrl } from '@/lib/runtime-config';
import { Seo } from '@/components/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { QuoteForm } from '@/components/sections/QuoteForm';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';

const trail = [
  { name: 'Home', path: '/' },
  { name: 'Fale Conosco', path: '/fale-conosco' },
];

export default function ContactPage() {
  const schemas = useMemo(() => [organizationSchema(), breadcrumbSchema(trail)], []);
  const whatsappUrl = buildWhatsappUrl();

  return (
    <>
      <Seo
        title="Fale Conosco"
        description={`Canais de atendimento da ${company.legalName}: telefones, WhatsApp e endereço em ${company.address.city}.`}
        schemas={schemas}
      />

      <PageHero
        eyebrow="Entre em contato conosco"
        title="Fale com um consultor da Xik"
        description="Escolha o canal mais prático para você ou preencha o formulário informando o que precisa. O atendimento é feito por pessoas, não por robô."
        trail={trail}
      />

      <Section tone="base" aria-labelledby="canais-titulo">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal className="flex flex-col gap-10">
            <div>
              <Eyebrow>Canais de atendimento</Eyebrow>
              <h2 id="canais-titulo" className="mt-5 text-title font-extrabold text-balance">
                Telefone, WhatsApp e escritório
              </h2>
            </div>

            <div className="flex flex-col divide-y divide-border border-y border-border">
              <div className="py-6">
                <h3 className="text-[0.6875rem] font-bold tracking-[0.2em] text-text-subtle uppercase">
                  Telefones
                </h3>
                <ul className="mt-4 flex flex-col gap-1">
                  {company.phones.map((phone) => (
                    <li key={phone.tel}>
                      <a
                        href={`tel:${phone.tel}`}
                        className="inline-flex min-h-11 items-center gap-3 rounded-sm text-lg font-semibold text-brand-primary transition-colors duration-(--duration-fast) hover:text-brand-primary-600"
                      >
                        <Phone aria-hidden="true" className="size-4 text-brand-secondary-600" />
                        {phone.display}
                        <span className="text-xs font-medium text-text-subtle">{phone.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {whatsappUrl ? (
                <div className="py-6">
                  <h3 className="text-[0.6875rem] font-bold tracking-[0.2em] text-text-subtle uppercase">
                    WhatsApp
                  </h3>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-11 items-center gap-3 rounded-sm text-lg font-semibold text-brand-primary transition-colors duration-(--duration-fast) hover:text-brand-primary-600"
                  >
                    <MessageCircle aria-hidden="true" className="size-4 text-brand-secondary-600" />
                    Iniciar conversa
                  </a>
                </div>
              ) : null}

              <div className="py-6">
                <h3 className="text-[0.6875rem] font-bold tracking-[0.2em] text-text-subtle uppercase">
                  Endereço
                </h3>
                <p className="mt-4 flex items-start gap-3 text-lead">
                  <MapPin aria-hidden="true" className="mt-1.5 size-5 shrink-0 text-brand-secondary-600" />
                  <span>{company.address.full}</span>
                </p>
                {/* TODO(content): exibir mapa e horário de atendimento após a Xik
                    confirmar CEP e horários oficiais (src/data/company.ts). */}
              </div>

              <div className="py-6">
                <h3 className="text-[0.6875rem] font-bold tracking-[0.2em] text-text-subtle uppercase">
                  Redes sociais
                </h3>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {socialLinks.map((social) => (
                    <li key={social.href}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex min-h-11 items-center gap-2.5 rounded-md border border-border px-4 text-sm font-semibold text-text-muted transition-colors duration-(--duration-fast) hover:border-border-strong hover:text-brand-primary"
                      >
                        {social.name}
                        <span className="text-text-subtle">{social.handle}</span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-3.5 text-brand-secondary-600 transition-transform duration-(--duration-base) ease-(--ease-out-brand) motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal index={1} className="lg:pt-2">
            <h2 className="text-title font-extrabold text-balance">Envie sua mensagem</h2>
            <p className="measure mt-4 text-text-muted">
              Preencha os dados e revise a mensagem antes de enviar pelo WhatsApp.
            </p>
            <div className="mt-8 rounded-xl border border-border bg-surface p-6 shadow-soft sm:p-9">
              <QuoteForm sourceLabel="Fale Conosco" />
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
