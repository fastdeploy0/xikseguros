import { useMemo } from 'react';
import { company } from '@/data/company';
import { breadcrumbSchema } from '@/lib/seo';
import { Seo } from '@/components/Seo';
import { PageHero } from '@/components/sections/PageHero';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

const trail = [
  { name: 'Home', path: '/' },
  { name: 'Política de Privacidade', path: '/politica-de-privacidade' },
];

/**
 * Legal text reproduced from the policy published by the Xik. Only the
 * reference to the old "CONTATO" menu was adjusted to the current page name : 
 * no clause was added, removed or reinterpreted.
 *
 * TODO(jurídico): revisar esta política com a Xik para adequação à LGPD
 * (base legal, prazo de retenção, encarregado de dados e direitos do titular).
 */
const paragraphs = [
  'Caro visitante, sua privacidade é importante para nós. No nosso site reconhecemos a importância da privacidade e tudo faremos para respeitá-la. A seguir apresentamos o tipo de informação pessoal que podemos receber quando você visita este site, bem como a forma como guardamos essa informação.',
  'Na página “Fale Conosco” você pode entrar em contato com a nossa equipe, e responderemos o mais breve possível. Após respondermos de forma satisfatória às suas dúvidas, críticas ou sugestões enviadas pelo formulário da página “Fale Conosco”, todas as informações fornecidas por você neste formulário serão apagadas permanentemente do nosso banco de informações.',
  'Nunca venderemos as suas informações para terceiros, sejam eles particulares ou empresas, evitando assim eventuais aborrecimentos oriundos de mensagens de terceiros.',
];

export default function PrivacyPage() {
  const schemas = useMemo(() => [breadcrumbSchema(trail)], []);
  const supportPhones = company.phones.slice(0, 2);

  return (
    <>
      <Seo
        title="Política de Privacidade"
        description={`Como a ${company.legalName} trata as informações pessoais recebidas através deste site.`}
        schemas={schemas}
      />

      <PageHero
        eyebrow="Documento legal"
        title="Política de Privacidade"
        description="Como tratamos as informações pessoais recebidas através deste site."
        trail={trail}
      />

      <Section tone="base" aria-labelledby="politica-titulo">
        <h2 id="politica-titulo" className="sr-only">
          Texto da política de privacidade
        </h2>
        <Reveal className="measure flex flex-col gap-6 text-lead leading-relaxed">
          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}

          <p>
            Dispomos de atendimento via telefone{' '}
            {supportPhones.map((phone, index) => (
              <span key={phone.tel}>
                {index > 0 ? ' ou ' : ''}
                <a
                  href={`tel:${phone.tel}`}
                  className="font-semibold text-brand-primary underline underline-offset-4"
                >
                  {phone.display}
                </a>
              </span>
            ))}{' '}
            para sanar quaisquer dúvidas referentes à nossa política de privacidade.
          </p>

          <p className="text-text-muted">Atenciosamente, {company.name}.</p>
        </Reveal>
      </Section>
    </>
  );
}
