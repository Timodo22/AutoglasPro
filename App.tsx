import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { PartnerPage } from './pages/PartnerPage';
import { Careers } from './pages/Careers';
import { Contact } from './pages/Contact';

// Scroll to top helper
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/over-ons" element={<About />} />
          <Route path="/123ruit" element={<PartnerPage />} />
          <Route path="/vacatures" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/diensten" element={<Home />} /> {/* Fallback for anchor links if needed, actually handled by Home anchor */}
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;