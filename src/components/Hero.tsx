import { motion } from 'framer-motion';
import { Calendar, Phone, Star, ShieldCheck, Heart } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-slate-50">
      {/* Background gradients and shapes */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-clinic-teal-100 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-clinic-navy-100 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
            
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 shadow-sm w-fit"
            >
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-clinic-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-clinic-teal-500"></span>
              </span>
              <span className="font-sans text-xs font-bold text-slate-700 uppercase tracking-wider">
                Now Accepting New Patients
              </span>
            </motion.div>

            {/* Title / Names */}
            <div className="space-y-3">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-tight tracking-tight"
              >
                Dr Imran's <br />
                <span className="bg-gradient-to-r from-clinic-navy-500 to-clinic-teal-500 bg-clip-text text-transparent">
                  Oro Dental Clinic
                </span>
              </motion.h1>
            </div>

            {/* Tagline & description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-sans text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-medium"
            >
              “Advanced Dental Care With Trust & Comfort.” Experience professional oral healthcare in a patient-friendly environment equipped with state-of-the-art technology.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#appointment"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-clinic-teal-500 hover:bg-clinic-teal-600 text-white font-sans font-bold shadow-lg shadow-clinic-teal-500/20 hover:shadow-clinic-teal-500/35 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </a>
              <a
                href="tel:+919593624261"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white border border-slate-200 shadow-md hover:shadow-lg hover:border-slate-300 text-clinic-navy-800 font-sans font-bold hover:-translate-y-0.5 transition-all duration-200"
              >
                <Phone className="w-5 h-5 text-clinic-navy-500" />
                <span>Call Now</span>
              </a>
            </motion.div>

            {/* Micro details / Trust points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200/80 max-w-md"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-clinic-teal-500 shrink-0" />
                <span className="font-sans text-xs font-semibold text-slate-600">100% Sterile & Hygienic</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-clinic-teal-500 shrink-0" />
                <span className="font-sans text-xs font-semibold text-slate-600">Gentle & Painless Care</span>
              </div>
            </motion.div>
          </div>

          {/* Image & Floating elements */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[480px] aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-clinic-navy-800/10 border-4 border-white"
            >
              {/* Fallback pattern and image overlay */}
              <div className="absolute inset-0 bg-slate-200 animate-pulse z-0" />
              <img
                src="/dental_clinic_interior.png"
                alt="Dr Imran's Oro Dental Clinic Interior"
                className="w-full h-full object-cover relative z-10 transition-transform duration-700 hover:scale-105"
                onLoad={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.previousSibling) {
                    (target.previousSibling as HTMLElement).style.display = 'none';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-clinic-navy-950/40 via-transparent to-transparent z-20 pointer-events-none" />
            </motion.div>

            {/* Floating Review Badge */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute top-6 -right-4 sm:-right-8 z-30 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/50 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-extrabold text-slate-800 text-base leading-tight">⭐ 4.8 Rating</span>
                <span className="font-sans font-medium text-slate-500 text-xs leading-none">128 Google Reviews</span>
              </div>
            </motion.div>

            {/* Floating Patient Satisfaction Badge */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute bottom-10 -left-4 sm:-left-8 z-30 bg-white/90 backdrop-blur-md px-5 py-3.5 rounded-2xl shadow-xl shadow-slate-900/5 border border-slate-200/50 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-clinic-teal-500/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-clinic-teal-500 fill-clinic-teal-500" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-extrabold text-slate-800 text-base leading-tight">100% Happy</span>
                <span className="font-sans font-medium text-slate-500 text-xs leading-none">Patient Centric Care</span>
              </div>
            </motion.div>

            {/* Decorative background shape */}
            <div className="absolute inset-0 border-[3px] border-dashed border-clinic-teal-200/60 rounded-[3rem] -m-4 -z-10 pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}
