import { motion } from 'framer-motion';
import { 
  Smile, 
  Sparkles, 
  Layers, 
  Trash2, 
  ShieldAlert, 
  Baby, 
  HeartPulse,
  Hammer,
  Grid
} from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Trash2,
      title: 'Tooth Extraction',
      description: 'Gentle, pain-managed extractions for severely decayed, broken, or wisdom teeth.',
      color: 'from-blue-500 to-indigo-500',
    },
    {
      icon: HeartPulse,
      title: 'Root Canal Treatment',
      description: 'Advanced endodontic care to save infected teeth and eliminate toothache pain.',
      color: 'from-teal-500 to-emerald-500',
    },
    {
      icon: Sparkles,
      title: 'Teeth Cleaning & Polish',
      description: 'Comprehensive scaling to remove plaque, tartar, and surface stains for fresh breath.',
      color: 'from-cyan-500 to-blue-500',
    },
    {
      icon: Layers,
      title: 'Dental Filling',
      description: 'High-quality composite fillings that blend seamlessly with your natural tooth color.',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      icon: Grid,
      title: 'Braces & Alignment',
      description: 'Traditional and modern alignment solutions to correct bites and straighten smiles.',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: Smile,
      title: 'Cosmetic Dentistry',
      description: 'Smile design, teeth whitening, and veneer treatments to enhance your confidence.',
      color: 'from-amber-500 to-orange-500',
    },
    {
      icon: Hammer,
      title: 'Dental Implants',
      description: 'Permanent, natural-looking tooth replacement solutions with high-quality implants.',
      color: 'from-indigo-500 to-clinic-navy-800',
    },
    {
      icon: Baby,
      title: 'Child Dental Care',
      description: 'Specialized, friendly pediatric dentistry to protect young smiles in a fun environment.',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: ShieldAlert,
      title: 'Emergency Dental Treatment',
      description: 'Immediate relief for severe toothaches, dental trauma, bleeding, or broken restorations.',
      color: 'from-red-500 to-rose-500',
    },
  ];

  return (
    <section id="services" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-clinic-navy-50 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-sans text-sm font-bold text-clinic-teal-600 uppercase tracking-widest"
          >
            Our Dental Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 mt-2"
          >
            Comprehensive Care for Every Smile
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-clinic-teal-500 rounded-full mx-auto mt-4"
          />
        </div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 35 },
                  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
                }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative bg-white rounded-3xl p-8 border border-slate-200/60 shadow-lg shadow-slate-100 hover:shadow-xl hover:shadow-clinic-navy-800/5 transition-all duration-300 flex flex-col items-start text-left"
              >
                {/* Decorative border highlight */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-clinic-teal-500/10 transition-colors pointer-events-none" />

                {/* Icon wrapper with gradient background */}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${service.color} p-[1px] flex items-center justify-center shadow-md mb-6 group-hover:scale-105 transition-transform duration-300`}>
                  <div className="w-full h-full rounded-[15px] bg-white flex items-center justify-center group-hover:bg-transparent transition-colors duration-300">
                    <IconComponent className={`w-6 h-6 text-slate-800 group-hover:text-white transition-colors duration-300`} />
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="font-display font-extrabold text-xl text-slate-800 group-hover:text-clinic-teal-600 transition-colors duration-300 mb-3">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="font-sans text-sm text-slate-600 leading-relaxed font-medium mb-6 flex-grow">
                  {service.description}
                </p>

                {/* Quick Link/CTA */}
                <a
                  href="#appointment"
                  className="font-sans text-xs font-bold text-clinic-teal-600 uppercase tracking-wider flex items-center gap-1 group-hover:text-clinic-teal-700 transition-colors"
                >
                  <span>Book Consult</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>

              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="font-sans text-slate-600 text-sm font-semibold">
            Need urgent treatment?{' '}
            <a href="tel:+919593624261" className="text-red-500 hover:text-red-600 underline font-bold">
              Call us immediately for Emergency Dental Care
            </a>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
