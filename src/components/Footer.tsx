import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, Instagram, Linkedin, Twitter, Facebook, ArrowUp } from 'lucide-react';
import { personalInfo } from '../data';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-black pt-20 pb-10 border-t border-gray-900">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <img 
                src="https://imglink.cc/cdn/0EgwvsVzUv.png" 
                alt="Sadik Hasan" 
                className="w-12 h-12 object-contain"
              />
              <span className="text-white font-display text-2xl font-bold tracking-tight">
                Sadik Hasan
              </span>
            </Link>
            <h2 className="text-3xl font-display font-bold mb-6">
              Get Ready <span className="text-gray-500">To Create Great</span>
            </h2>
            <div className="relative max-w-sm">
              <input 
                type="email" 
                placeholder="Email Adress" 
                className="w-full bg-transparent border-b border-gray-800 py-3 pr-10 focus:border-brand outline-none transition-colors"
                id="footer-email-input"
              />
              <Mail className="absolute right-0 top-3 text-gray-500" size={18} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-8">Quick Link</h3>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/about" className="hover:text-brand transition-colors">About Me</Link></li>
              <li><Link to="/services" className="hover:text-brand transition-colors">Service</Link></li>
              <li><Link to="/contact" className="hover:text-brand transition-colors">Contact Us</Link></li>
              <li><Link to="/project" className="hover:text-brand transition-colors">All Projects</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-8">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 text-gray-400">
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                  <Mail size={18} />
                </div>
                <span>{personalInfo.email}</span>
              </li>
              <li className="flex items-center gap-4 text-gray-400">
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                  <MapPin size={18} />
                </div>
                <span>{personalInfo.address}</span>
              </li>
              <li className="flex items-center gap-4 text-gray-400">
                <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand">
                  <Phone size={18} />
                </div>
                <span>{personalInfo.phone}</span>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div className="flex flex-col items-start lg:items-end">
            <div className="flex gap-4 mb-auto">
              {[Instagram, Linkedin, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-bg-card flex items-center justify-center text-gray-400 hover:bg-brand hover:text-white transition-all shadow-lg border border-gray-800">
                  <Icon size={18} />
                </a>
              ))}
            </div>
            
            <button 
              onClick={scrollToTop}
              className="mt-12 w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,45,85,0.4)]"
              id="scroll-to-top-btn"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {personalInfo.name} 2026 | All Rights Reserved</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white transition-colors">Terms & Condition</Link>
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
