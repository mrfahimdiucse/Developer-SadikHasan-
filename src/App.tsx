/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import ServicesPage from './pages/ServicesPage';
import VideoResume from './pages/VideoResume';
import Proposal from './pages/Proposal';

// Smooth scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const NotFound = () => (
  <div className="pt-40 pb-20 container-custom min-h-[70vh] flex flex-col items-center justify-center text-center">
    <h1 className="text-9xl font-display font-bold text-brand mb-4">404</h1>
    <h2 className="text-4xl font-display font-bold mb-8">Page Not Found</h2>
    <p className="text-gray-400 max-w-md mb-12">
      The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
    </p>
    <Navigate to="/" />
  </div>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg-dark text-white selection:bg-brand selection:text-white">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/video-resume" element={<VideoResume />} />
          <Route path="/projects" element={<Navigate to="/project" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/proposal" element={<Proposal />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
