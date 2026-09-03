import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { company } from '@/data/company';
import { absoluteUrl, pageTitle } from '@/lib/seo';

/**
 * Per-route document metadata.
 *
 * React Helmet Async has no release compatible with React 19, so this is the
 * equivalent: a declarative component that owns the tags it creates and removes
 * them on unmount, leaving the head clean between route changes.
 */
export type SeoProps = {
  /** Page title without the site suffix. Omit on the home page. */
  title?: string;
  description: string;
  /** Set to `false` on pages that must not be indexed. */
  index?: boolean;
  /** JSON-LD documents to attach to this route. */
  schemas?: Array<Record<string, unknown>>;
};

const OWNED = 'data-xik-seo';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    el.setAttribute(OWNED, '');
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"][${OWNED}]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    el.setAttribute(OWNED, '');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function Seo({ title, description, index = true, schemas }: SeoProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = pageTitle(title);
    const canonical = absoluteUrl(pathname);
    const ogImage = absoluteUrl('/favicon/icon-512.png');

    document.title = fullTitle;
    document.documentElement.lang = 'pt-BR';

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', index ? 'index, follow' : 'noindex, follow');
    upsertLink('canonical', canonical);

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', company.name);
    upsertMeta('property', 'og:locale', 'pt_BR');
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', ogImage);

    upsertMeta('name', 'twitter:card', 'summary');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);
  }, [title, description, index, pathname]);

  useEffect(() => {
    if (!schemas?.length) return;
    const nodes = schemas.map((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute(OWNED, '');
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
      return script;
    });
    return () => nodes.forEach((node) => node.remove());
  }, [schemas]);

  return null;
}
