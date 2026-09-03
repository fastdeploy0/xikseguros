import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsappFab } from './WhatsappFab';

/** Resets scroll on navigation, matching the expectation of a document site. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

export function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main id="conteudo">
        <Outlet />
      </main>
      <Footer />
      <WhatsappFab />
    </>
  );
}
