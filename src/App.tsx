import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { legacyRoutes } from '@/data/navigation';
import { Layout } from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';

// Route-level splitting: the home page ships in the initial bundle, the rest
// loads on navigation.
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'));
const CategoryPage = lazy(() => import('@/pages/CategoryPage'));
const ServicePage = lazy(() => import('@/pages/ServicePage'));
const QuotePage = lazy(() => import('@/pages/QuotePage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

/** Reserves vertical space during chunk loading so the layout does not jump. */
function RouteFallback() {
  return <div className="min-h-[70vh]" aria-busy="true" />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route
          path="a-empresa"
          element={
            <Suspense fallback={<RouteFallback />}>
              <AboutPage />
            </Suspense>
          }
        />

        <Route
          path="planos"
          element={
            <Suspense fallback={<RouteFallback />}>
              <CategoryPage category="planos" />
            </Suspense>
          }
        />
        <Route
          path="planos/plano-de-saude-individual"
          element={<Navigate to="/planos" replace />}
        />
        <Route
          path="planos/plano-de-saude-por-adesao"
          element={<Navigate to="/planos" replace />}
        />
        <Route
          path="planos/:slug"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ServicePage category="planos" />
            </Suspense>
          }
        />

        <Route
          path="seguros"
          element={
            <Suspense fallback={<RouteFallback />}>
              <CategoryPage category="seguros" />
            </Suspense>
          }
        />
        <Route
          path="seguros/:slug"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ServicePage category="seguros" />
            </Suspense>
          }
        />

        <Route
          path="blog"
          element={
            <Suspense fallback={<RouteFallback />}>
              <BlogPage />
            </Suspense>
          }
        />
        <Route
          path="blog/plano-de-saude-individual-empresarial-ou-por-adesao-qual-escolher"
          element={<Navigate to="/blog" replace />}
        />
        <Route
          path="blog/:slug"
          element={
            <Suspense fallback={<RouteFallback />}>
              <BlogPostPage />
            </Suspense>
          }
        />

        <Route
          path="faca-sua-cotacao"
          element={
            <Suspense fallback={<RouteFallback />}>
              <QuotePage />
            </Suspense>
          }
        />
        <Route
          path="fale-conosco"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ContactPage />
            </Suspense>
          }
        />
        <Route
          path="politica-de-privacidade"
          element={
            <Suspense fallback={<RouteFallback />}>
              <PrivacyPage />
            </Suspense>
          }
        />

        {/* Legacy WordPress URLs keep resolving instead of dropping their SEO equity. */}
        {legacyRoutes.map((route) => (
          <Route
            key={route.from}
            path={route.from.replace(/^\//, '')}
            element={<Navigate to={route.to} replace />}
          />
        ))}

        <Route
          path="*"
          element={
            <Suspense fallback={<RouteFallback />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
