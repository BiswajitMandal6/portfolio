import { Activity, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-clinic-navy-950 text-slate-400 font-sans text-sm pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-900">
          
          {/* Clinic Brand Column */}
          <div className="md:col-span-4 space-y-4 text-left">
            <a href="#home" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-clinic-navy-500 to-clinic-teal-500 flex items-center justify-center shadow-md">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-white leading-tight">
                  Dr Imran's
                </span>
                <span className="font-sans font-medium text-xs text-clinic-teal-400 tracking-wider uppercase leading-none">
                  Oro Dental Clinic
                </span>
              </div>
            </a>
            <p className="font-sans text-xs font-semibold text-slate-500 leading-relaxed max-w-sm">
              Providing premium and pain-managed oral healthcare under expert surgeon guidance. Proudly serving Kalikapur and the wider Kaliachak community.
            </p>
            {/* Socials */}
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                aria-label="Facebook Page"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-500 hover:text-white hover:border-slate-700 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="Twitter profile"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-500 hover:text-white hover:border-slate-700 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="#"
                aria-label="Instagram Profile"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-center text-slate-500 hover:text-white hover:border-slate-700 transition-colors"
              >
                <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-2 text-left space-y-4">
            <h4 className="font-display font-bold text-slate-200 text-xs uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2.5 font-semibold text-xs text-slate-500">
              <li><a href="#home" className="hover:text-clinic-teal-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-clinic-teal-400 transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-clinic-teal-400 transition-colors">Services</a></li>
              <li><a href="#reviews" className="hover:text-clinic-teal-400 transition-colors">Reviews</a></li>
              <li><a href="#gallery" className="hover:text-clinic-teal-400 transition-colors">Gallery</a></li>
            </ul>
          </div>

          {/* Treatments Column */}
          <div className="md:col-span-3 text-left space-y-4">
            <h4 className="font-display font-bold text-slate-200 text-xs uppercase tracking-wider">
              Popular Services
            </h4>
            <ul className="space-y-2.5 font-semibold text-xs text-slate-500">
              <li><a href="#services" className="hover:text-clinic-teal-400 transition-colors">Root Canal Treatment</a></li>
              <li><a href="#services" className="hover:text-clinic-teal-400 transition-colors">Teeth Cleaning & Polish</a></li>
              <li><a href="#services" className="hover:text-clinic-teal-400 transition-colors">Braces & Aligners</a></li>
              <li><a href="#services" className="hover:text-clinic-teal-400 transition-colors">Dental Implants</a></li>
              <li><a href="#services" className="hover:text-clinic-teal-400 transition-colors">Child Dental Care</a></li>
            </ul>
          </div>

          {/* Direct Info Column */}
          <div className="md:col-span-3 text-left space-y-4">
            <h4 className="font-display font-bold text-slate-200 text-xs uppercase tracking-wider">
              Contact Info
            </h4>
            <ul className="space-y-3.5 font-semibold text-xs text-slate-500">
              <li className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-clinic-teal-500 shrink-0 mt-0.5" />
                <span className="leading-tight">Near Star Cinema, Kalikapur, Kaliachak, Malda, WB - 732201</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-clinic-teal-500 shrink-0" />
                <span>+91 95936 24261</span>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-clinic-teal-500 shrink-0" />
                <span>info@drimransdental.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright area */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-semibold text-slate-600">
          <p>
            &copy; {currentYear} Dr Imran's Oro Dental Clinic. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
