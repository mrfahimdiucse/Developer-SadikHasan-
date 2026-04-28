import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Service', path: '/services' },
  { name: 'Project', path: '/project' },
  { name: 'Contact', path: '/contact' },
];

const socialLinks = [
  { icon: Instagram, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Facebook, href: '#' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            {/* Animated Gradient Border using Masking for Transparency */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-[2px] md:-inset-[3px] rounded-full opacity-70 group-hover:opacity-100 transition-opacity"
              style={{
                background: 'linear-gradient(to right, #ff2d55, #ff5c7c, #ff2d55)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                padding: '2px'
              }}
            />
            {/* Logo Image */}
            <img 
              src="https://imglink.cc/cdn/0EgwvsVzUv.png" 
              alt="SADIK HASAN" 
              className="w-9 h-9 md:w-12 md:h-12 object-contain relative z-10 p-0.5 md:p-1 group-hover:scale-105 transition-transform"
            />
          </div>
          <span className="text-white font-display text-xl md:text-2xl font-bold tracking-tight uppercase">
            Sadik Hasan
          </span>
        </Link>

        {/* Desktop Nav & Action Button */}
        <div className="flex items-center gap-4 lg:gap-8">
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-brand ${
                  location.pathname === link.path ? 'text-brand' : 'text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/proposal"
              className="bg-brand hover:bg-brand-hover text-white px-5 lg:px-7 py-2.5 rounded-xl text-sm font-bold transition-all shadow-[0_10px_20px_rgba(255,45,85,0.2)] active:scale-95"
            >
              Get In Touch
            </Link>
            
            <button 
              id="menu-toggle-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center text-white hover:bg-brand transition-all border border-white/5"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-[#0a0a0a] border-b border-white/5 overflow-hidden z-[40]"
          >
            <div className="container-custom py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-xl font-medium tracking-tight ${
                    location.pathname === link.path ? 'text-brand' : 'text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-white/5 my-2" />
              <div className="flex gap-4">
                {socialLinks.map((link, i) => (
                  <a key={i} href={link.href} className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-brand">
                    <link.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
