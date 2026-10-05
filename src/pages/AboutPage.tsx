import { useMemo } from 'react';
import { Phone } from 'lucide-react';
import ceoPortrait from '@/assets/marketing/foto-institucinal-ceo.webp';
import ceoPortraitSm from '@/assets/marketing/foto-institucinal-ceo-sm.webp';
import officeFacadeNight from '@/assets/marketing/xik-noturna.webp';
import { company, socialLinks } from '@/data/company';
import { breadcrumbSchema, organizationSchema } from '@/lib/seo';
import { Seo } from '@/components/Seo';
import { AboutPageHero } from '@/components/sections/AboutPageHero';
import { PrinciplesSection } from '@/components/sections/PrinciplesSection';
import { RecentBlogPostsSection } from '@/components/sections/RecentBlogPostsSection';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { FacebookIcon, InstagramIcon } from '@/components/ui/SocialIcons';

const trail = [
  { name: 'Home', path: '/' },
  { name: 'A Empresa', path: '/a-empresa' },
];

const mapsQuery = `${company.address.full}, Brasil`;
const mapsEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&z=16&hl=pt-BR&output=embed`;
const mapsOpenHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;

function SocialGlyph({ name }: { name: string }) {
  if (name === 'Instagram') return <InstagramIcon className="size-5" />;
  if (name === 'Facebook') return <FacebookIcon className="size-5" />;
  return null;
}

export default function AboutPage() {
  const schemas = useMemo(() => [organizationSchema(), breadcrumbSchema(trail)], []);

  return (
    <>
      <Seo
        title="A Empresa"
        description={`Conheça a ${company.legalName}: história, missão, visão, valores e onde encontrar a corretora em Belo Horizonte.`}
        schemas={schemas}
      />

      <AboutPageHero
        eyebrow="Conheça a XIK SEGUROS"
        title={`Mais do que seguros, confiança construída desde ${company.foundedYear}.`}
        description="Há quase duas décadas, a Xik ajuda pessoas e empresas a proteger o que importa, com atendimento próximo e soluções pensadas para cada necessidade."
        trail={trail}
      />

      {/* Nossa história */}
      <Section tone="base" aria-labelledby="historia-titulo">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-20">
          <Reveal className="lg:sticky lg:top-28">
            <figure>
              <div className="overflow-hidden rounded-xl border border-border bg-surface-sunken shadow-soft">
                <picture>
                  <source media="(min-width: 1024px)" srcSet={ceoPortrait} />
                  <img
                    src={ceoPortraitSm}
                    alt={`${company.managingPartner}, sócia administradora da ${company.name}`}
                    width={900}
                    height={1125}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover object-[center_18%]"
                  />
                </picture>
              </div>
              <figcaption className="mt-5">
                <p className="text-lg font-extrabold tracking-[-0.02em] text-brand-primary">
                  {company.managingPartner}
                </p>
                <p className="mt-1 text-sm text-text-muted">CEO</p>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal index={1} className="flex flex-col">
            <Eyebrow>Nossa história</Eyebrow>
            <h2 id="historia-titulo" className="mt-5 text-title font-extrabold text-balance">
              Uma vocação: a melhor relação entre custo e benefício
            </h2>
            <p className="mt-7 text-lead leading-relaxed">{company.history}</p>
          </Reveal>
        </div>
      </Section>

      {/* Missão, visão e valores */}
      <PrinciplesSection />

      {/* Onde estamos */}
      <Section tone="base" bordered tight aria-labelledby="onde-titulo">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>Onde estamos</Eyebrow>
            <h2 id="onde-titulo" className="mt-5 text-title font-extrabold text-balance">
              Escritório em Belo Horizonte
            </h2>
            <figure className="mt-6 overflow-hidden rounded-xl border border-border bg-surface-sunken shadow-soft">
              <iframe
                title={`Localização da ${company.name}: ${company.address.full}`}
                src={mapsEmbedSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="aspect-[4/3] w-full border-0"
              />
              <figcaption className="border-t border-border bg-surface px-4 py-3">
                <a
                  href={mapsOpenHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-brand-primary underline-offset-4 transition-colors duration-(--duration-fast) hover:underline"
                >
                  {company.address.full}
                </a>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal index={1} className="flex flex-col gap-8">
            <div>
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
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-[0.6875rem] font-bold tracking-[0.2em] text-text-subtle uppercase">
                Siga-nos
              </h3>
              <ul className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.name} ${social.handle}`}
                      title={social.name}
                      className="inline-flex size-11 items-center justify-center rounded-md border border-border bg-surface text-brand-primary transition-colors duration-(--duration-fast) hover:border-brand-secondary-600/40 hover:bg-surface-sunken hover:text-brand-secondary-700"
                    >
                      <SocialGlyph name={social.name} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <figure className="overflow-hidden rounded-xl border border-border bg-surface shadow-soft">
              <img
                src={officeFacadeNight}
                alt="Fachada noturna da XIK SEGUROS com letreiro iluminado"
                width={2160}
                height={2880}
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover object-[center_62%]"
              />
              <figcaption className="border-t border-border bg-surface px-4 py-3 text-sm font-semibold text-brand-primary">
                A XIK SEGUROS em Belo Horizonte.
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Section>

      <RecentBlogPostsSection />
    </>
  );
}
