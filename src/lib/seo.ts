import { company, socialLinks } from '@/data/company';
import { faq } from '@/data/faq';

export const SITE_URL = 'https://xikseguros.com.br';

export const absoluteUrl = (path: string): string =>
  `${SITE_URL}${path === '/' ? '/' : path.replace(/\/$/, '')}`;

export const pageTitle = (title?: string): string =>
  title ? `${title} | ${company.name}` : `${company.name} | ${company.tagline}`;

/** Organization schema, built only from channels verified on the official site. */
export function organizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'InsuranceAgency',
    name: company.legalName,
    alternateName: company.name,
    url: SITE_URL,
    logo: absoluteUrl('/favicon/icon-512.png'),
    foundingDate: String(company.foundedYear),
    description: company.mission,
    taxID: company.cnpj,
    telephone: company.phones.map((p) => p.tel),
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${company.address.street}, ${company.address.district}`,
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      addressCountry: company.address.country,
      ...(company.address.postalCode ? { postalCode: company.address.postalCode } : {}),
    },
    ...(company.email ? { email: company.email } : {}),
    sameAs: socialLinks.map((s) => s.href),
  };
}

export function breadcrumbSchema(trail: Array<{ name: string; path: string }>): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Only emitted on the page where the same questions are visibly rendered. */
export function faqSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}
