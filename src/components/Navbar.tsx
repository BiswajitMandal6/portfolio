import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Activity } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Choose Us', href: '#why-choose-us' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-md py-3 border-b border-slate-200/40'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo area */}
            <a href="#home" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-clinic-navy-500 to-clinic-teal-500 flex items-center justify-center shadow-md shadow-clinic-teal-500/20 group-hover:scale-105 transition-transform">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg sm:text-xl text-clinic-navy-800 leading-tight">
                  Dr Imran's
                </span>
                <span className="font-sans font-medium text-xs text-clinic-teal-600 tracking-wider uppercase leading-none">
                  Oro Dental Clinic
                </span>
              </div>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-sans text-sm font-semibold text-slate-600 hover:text-clinic-teal-600 transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-clinic-teal-500 after:transition-all hover:after:w-full"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Desktop Emergency CTA */}
            <div className="hidden lg:flex items-center">
              <a
                href="tel:+919593624261"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-clinic-navy-800 to-clinic-teal-600 hover:from-clinic-navy-900 hover:to-clinic-teal-700 text-white font-sans text-sm font-bold shadow-lg shadow-clinic-navy-800/10 hover:shadow-clinic-navy-800/20 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Phone className="w-4 h-4 animate-bounce" />
                <span>+91 95936 24261</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
                className="p-2 rounded-lg text-slate-600 hover:text-clinic-teal-600 hover:bg-slate-100 transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white/95 backdrop-blur-md border-b border-slate-200/60 overflow-hidden shadow-lg"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-700 hover:text-clinic-teal-600 hover:bg-slate-50 transition-all duration-200"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="pt-4 px-4">
                  <a
                    href="tel:+919593624261"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-clinic-navy-800 to-clinic-teal-600 text-white font-bold shadow-md"
                  >
                    <Phone className="w-5 h-5 animate-pulse" />
                    <span>Emergency Call</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
