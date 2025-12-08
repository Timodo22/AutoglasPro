import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, MapPin, Menu, X, Clock, Mail, MessageCircle } from 'lucide-react';
import LogoGroot from '../assets/AutoglasPRO-logo-2.svg'

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: '123Ruit.nl', path: '/123ruit' },
    { label: 'Diensten', path: '/#diensten' },
    { label: 'Over Ons', path: '/over-ons' },
    { label: 'Vacatures', path: '/vacatures' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Bar - Contact Info */}
      <div className="bg-slate-900 text-white py-2 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 hover:text-agp-red transition cursor-pointer">
              <Phone size={14} /> 0413 331 619
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={14} /> Oostwijk 1C, 5406 XT Uden
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} /> Ma-Vr: 08:30 - 17:30
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-24">
            {/* Logo Area */}
            <Link to="/" className="flex items-center">
              <img 
                src={LogoGroot} 
                alt="Autoglas Pro Logo" 
                className="h-12 md:h-16 w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className={`font-semibold text-sm uppercase tracking-wide transition duration-300 relative py-2 ${
                    isActive(link.path) ? 'text-agp-red' : 'text-slate-700 hover:text-agp-blue'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-agp-red"></span>
                  )}
                </Link>
              ))}
              <a 
                href="tel:0413331619" 
                className="bg-agp-red text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-agp-red/30 hover:bg-red-700 transition transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <Phone size={18} />
                <span>Bel Direct</span>
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden text-slate-800"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 absolute w-full left-0 top-full shadow-xl">
            <div className="flex flex-col p-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="py-3 px-4 text-slate-800 font-semibold hover:bg-gray-50 rounded-lg hover:text-agp-blue transition"
                >
                  {link.label}
                </Link>
              ))}
              <a 
                href="tel:0413331619"
                className="mt-4 py-3 text-center bg-agp-red text-white font-bold rounded-lg shadow-md"
              >
                Bel Direct: 0413 331 619
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          <div>
             <img 
                src={LogoGroot}
                alt="Autoglas Pro Logo" 
                className="h-12 w-auto object-contain mb-6 "
              />
            <p className="text-gray-400 leading-relaxed mb-6">
              Wij zijn de specialist in autoruit reparatie en vervanging in Uden en omstreken. 
              Snel, vakkundig en erkend door verzekeraars.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-6 border-b-2 border-agp-blue inline-block pb-1">Snel Navigeren</h3>
            <ul className="space-y-3">
              <li><Link to="/#schade-melden" className="text-gray-300 hover:text-white hover:underline decoration-agp-red">Schade Melden</Link></li>
              <li><Link to="/diensten" className="text-gray-300 hover:text-white hover:underline decoration-agp-red">Onze Diensten</Link></li>
              <li><Link to="/123ruit" className="text-gray-300 hover:text-white hover:underline decoration-agp-red">123Ruit.nl</Link></li>
              <li><Link to="/vacatures" className="text-gray-300 hover:text-white hover:underline decoration-agp-red">Werken bij ons</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 border-b-2 border-agp-red inline-block pb-1">Contactgegevens</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-agp-red mt-1 shrink-0" size={20} />
                <span className="text-gray-300">
                  Oostwijk 1C<br />
                  5406 XT Uden
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-agp-red shrink-0" size={20} />
                <a href="tel:0413331619" className="text-gray-300 hover:text-white transition">0413 331 619</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-agp-red shrink-0" size={20} />
                <a href="mailto:info@autoglaspro.nl" className="text-gray-300 hover:text-white transition">info@autoglaspro.nl</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-slate-950 py-6 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} Autoglas Pro Uden. Alle rechten voorbehouden.</p>
        </div>
      </footer>

      {/* WhatsApp Widget */}
      <a 
        href="https://wa.me/31413331619" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
      >
        <div className="relative">
          <div className="absolute -top-3 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-white animate-bounce">
            1
          </div>
          <div className="bg-[#25D366] p-4 rounded-full shadow-2xl hover:bg-[#20bd5a] transition-all duration-300 hover:scale-110 flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-white fill-white" />
          </div>
          {/* Pulse effect */}
          <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping -z-10"></div>
        </div>
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-lg shadow-lg text-sm font-semibold text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Stuur ons een appje!
        </div>
      </a>
    </div>
  );
};