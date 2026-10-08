/**
 * Generates public/sitemap.xml and public/robots.txt from the route definitions,
 * so the sitemap can never drift away from what the router actually serves.
 * Run with: node scripts/generate-sitemap.mjs
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SITE_URL = 'https://xikseguros.com.br';

const servicesSource = await readFile(path.resolve('src/data/services.ts'), 'utf8');
const blogSource = await readFile(path.resolve('src/data/blog.ts'), 'utf8');

const entries = [...servicesSource.matchAll(/slug:\s*'([^']+)',\s*\n\s*category:\s*'([^']+)'/g)].map(
  ([, slug, category]) => `/${category}/${slug}`
);

const blogEntries = [...blogSource.matchAll(/^\s*slug:\s*'([^']+)',$/gm)].map(
  ([, slug]) => `/blog/${slug}`
);

if (entries.length === 0) {
  throw new Error('No service routes parsed from src/data/services.ts');
}

if (blogEntries.length === 0) {
  throw new Error('No blog routes parsed from src/data/blog.ts');
}

const routes = [
  { path: '/', priority: '1.0' },
  { path: '/a-empresa', priority: '0.8' },
  { path: '/planos', priority: '0.9' },
  { path: '/seguros', priority: '0.9' },
  ...entries.map((route) => ({ path: route, priority: '0.8' })),
  { path: '/blog', priority: '0.8' },
  ...blogEntries.map((route) => ({ path: route, priority: '0.7' })),
  { path: '/fale-conosco', priority: '0.8' },
  { path: '/politica-de-privacidade', priority: '0.3' },
];

const lastmod = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

await writeFile(path.resolve('public/sitemap.xml'), sitemap, 'utf8');
await writeFile(path.resolve('public/robots.txt'), robots, 'utf8');

console.log(`sitemap.xml written with ${routes.length} URLs`);
