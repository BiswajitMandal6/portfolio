import { motion } from 'framer-motion';
import { Award, Cpu, DollarSign, Smile, ShieldCheck, Zap } from 'lucide-react';

export default function WhyChooseUs() {
  const benefits = [
    {
      icon: Award,
      title: 'Experienced Dentist',
      description: 'Dr. Imran has years of experience in performing intricate dental surgeries and standard dental treatments.',
    },
    {
      icon: Cpu,
      title: 'Modern Equipment',
      description: 'We use advanced oral diagnostic systems and high-end dental tooling to ensure quick, accurate treatments.',
    },
    {
      icon: DollarSign,
      title: 'Affordable Treatment',
      description: 'We believe dental hygiene is a right. We provide cost-effective treatments for all clinical procedures.',
    },
    {
      icon: Smile,
      title: 'Friendly Staff',
      description: 'Our staff are highly welcoming and ensure patients are relaxed and free of any dental anxiety.',
    },
    {
      icon: ShieldCheck,
      title: 'Hygienic Environment',
      description: 'We adhere to international standards of sterilization, cleaning, and autoclave procedures for all instruments.',
    },
    {
      icon: Zap,
      title: 'Fast & Efficient Service',
      description: 'Minimal waiting times and streamlined appointment schedules to respect your valuable time.',
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-clinic-teal-50 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-clinic-navy-50 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-sans text-sm font-bold text-clinic-teal-600 uppercase tracking-widest"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 mt-2"
          >
            Setting Standards in Dental Care
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-clinic-teal-500 rounded-full mx-auto mt-4"
          />
        </div>

        {/* Benefits Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08 }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-200/50 flex flex-col items-center text-center hover:bg-white hover:shadow-xl hover:shadow-clinic-navy-800/5 transition-all duration-300"
              >
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-clinic-teal-500/10 flex items-center justify-center mb-6 text-clinic-teal-600">
                  <Icon className="w-7 h-7" />
                </div>

                {/* Title */}
                <h3 className="font-display font-extrabold text-lg text-slate-900 mb-3">
                  {benefit.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-sm font-semibold text-slate-500 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
