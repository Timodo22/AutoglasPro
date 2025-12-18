import React, { useEffect } from 'react';
// We veranderen HashRouter naar BrowserRouter
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { PartnerPage } from './pages/PartnerPage';
import { Careers } from './pages/Careers';
import { Contact } from './pages/Contact';
import { Werkbon } from './pages/Werkbon';

// Scroll to top helper (houdt de pagina bovenaan bij navigatie)
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* De routes zijn nu bereikbaar via /werkbon, /contact, etc. */}
          <Route path="/" element={<Home />} />
          <Route path="/over-ons" element={<About />} />
          <Route path="/123ruit" element={<PartnerPage />} />
          <Route path="/werkbon" element={<Werkbon />} />
          <Route path="/vacatures" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Fallback voor oude links of typfouten: stuurt alles onbekends naar Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;