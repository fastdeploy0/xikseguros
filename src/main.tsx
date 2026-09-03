import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/manrope';
import '@/styles/globals.css';
import App from '@/App';

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root not found in index.html');

createRoot(container).render(
  <StrictMode>
    {/* BrowserRouter: clean URLs, no hash routing. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
