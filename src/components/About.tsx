import { motion } from 'framer-motion';
import { CheckCircle2, Award, Users, Shield } from 'lucide-react';

export default function About() {
  const stats = [
    { icon: Award, value: '8+', label: 'Years Experience' },
    { icon: Users, value: '5,000+', label: 'Happy Patients' },
    { icon: Shield, value: '100%', label: 'Hygiene Certified' },
  ];

  const highlights = [
    'Sterilized & hygienic environment meeting ISO standards',
    'State-of-the-art diagnostic equipment & modern dental chairs',
    'Gentle and funny doctor behaviour, especially helpful for children',
    'Affordable treatment options tailored to your family needs',
    'Comprehensive oral health diagnostics and follow-up support',
  ];

  return (
    <section id="about" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative vector elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-clinic-teal-50 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-sans text-sm font-bold text-clinic-teal-600 uppercase tracking-widest"
          >
            About Dr Imran & Clinic
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 mt-2"
          >
            Providing Trustworthy & Gentle Dental Care
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-clinic-teal-500 rounded-full mx-auto mt-4"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Doctor Profile Card / Image */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200"
            >
              <div className="absolute inset-0 bg-slate-200 animate-pulse z-0" />
              <img
                src="/doctor_portrait.png"
                alt="Dr Imran"
                className="w-full aspect-[4/5] object-cover relative z-10 hover:scale-102 transition-transform duration-500"
                onLoad={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.previousSibling) {
                    (target.previousSibling as HTMLElement).style.display = 'none';
                  }
                }}
              />
              
              {/* Profile details overlap */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-clinic-navy-950 via-clinic-navy-950/80 to-transparent text-white z-20">
                <h3 className="font-display font-bold text-xl">Dr. Imran</h3>
                <p className="font-sans text-xs text-clinic-teal-300 font-semibold tracking-wider uppercase mt-1">
                  BDS | Consultant Surgeon & Oral Care Expert
                </p>
              </div>
            </motion.div>

            {/* Decorative background outline */}
            <div className="absolute inset-0 border-2 border-clinic-teal-500/20 rounded-3xl translate-x-4 translate-y-4 -z-10" />
          </div>

          {/* Right Column: Introduction Text */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="font-display font-extrabold text-2xl text-slate-800">
                Welcome to Dr Imran's Oro Dental Clinic
              </h3>
              <p className="font-sans text-slate-600 leading-relaxed font-medium">
                At our clinic, we are dedicated to providing the highest standards of modern dental healthcare. Guided by Dr. Imran's patient-friendly approach, we specialize in offering gentle, comfortable, and painless dental procedures for all age groups.
              </p>
              <p className="font-sans text-slate-600 leading-relaxed">
                Whether you need a routine dental cleanup, standard fillings, or advanced procedures like dental implants and root canals, our clinic provides top-tier diagnostic care. We ensure our treatment is friendly, relaxing, and tailored to reduce patient anxiety.
              </p>
            </motion.div>

            {/* Highlighted bullets */}
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.1 }
                }
              }}
              className="space-y-3"
            >
              {highlights.map((highlight, idx) => (
                <motion.li
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-clinic-teal-500 shrink-0 mt-0.5" />
                  <span className="font-sans text-sm font-semibold text-slate-700 leading-tight">
                    {highlight}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Quick stats grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col items-center sm:items-start text-center sm:text-left"
                  >
                    <div className="w-9 h-9 rounded-xl bg-clinic-teal-500/10 flex items-center justify-center mb-2">
                      <Icon className="w-5 h-5 text-clinic-teal-600" />
                    </div>
                    <span className="font-display font-black text-xl sm:text-2xl text-slate-800 leading-none">
                      {stat.value}
                    </span>
                    <span className="font-sans text-xs font-semibold text-slate-500 mt-1">
                      {stat.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
