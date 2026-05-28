import { Phone, MessageSquare } from 'lucide-react';

export default function FloatingElements() {
  const whatsappUrl = 'https://wa.me/919593624261?text=Hello%20Dr.%20Imran%27s%20Clinic%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.';

  return (
    <>
      {/* Floating WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact on WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
      >
        {/* Pulsing indicator */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25 group-hover:opacity-40" />
        {/* Lucide icon */}
        <MessageSquare className="w-7 h-7 relative z-10 fill-white" />
      </a>

      {/* Mobile-Only Bottom Sticky Call Action Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200/80 p-3 flex gap-3 shadow-2xl">
        <a
          href="tel:+919593624261"
          className="flex-1 py-3.5 rounded-xl bg-red-500 text-white font-sans font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-500/10 active:scale-98 transition-all"
        >
          <Phone className="w-4 h-4 animate-bounce" />
          <span>Emergency Call</span>
        </a>
        <a
          href="#appointment"
          className="flex-1 py-3.5 rounded-xl bg-clinic-teal-500 text-white font-sans font-extrabold text-sm flex items-center justify-center gap-2 active:scale-98 transition-all"
        >
          <span>Book Online</span>
        </a>
      </div>
    </>
  );
}
