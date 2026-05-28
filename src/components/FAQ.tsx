import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      q: 'Do you accept walk-in patients?',
      a: 'Yes, we welcome walk-ins! However, because our appointment slots fill up quickly, we highly recommend booking an appointment beforehand via call or WhatsApp to avoid waiting times.',
    },
    {
      q: 'Is a Root Canal Treatment (RCT) painful?',
      a: 'No! With modern anesthetics and Dr. Imran’s experienced, gentle treatment methods, RCT is highly comfortable and feels similar to receiving a standard dental filling. We prioritize your comfort throughout the procedure.',
    },
    {
      q: 'How often should I get teeth cleaning (scaling)?',
      a: 'We recommend scheduling a professional dental scaling and cleaning session every 6 months to prevent plaque accumulation, tartar buildup, gum disease, and surface staining.',
    },
    {
      q: 'How can I reschedule or cancel my appointment?',
      a: 'Rescheduling is simple! You can click the floating WhatsApp button or call our contact number directly (+91 95936 24261) to let us know, and we will update your time slot immediately.',
    },
    {
      q: 'Are child dental services available at the clinic?',
      a: 'Yes, child dental care is one of our specialties. Dr. Imran maintains a very gentle, friendly, and funny approach to ensure kids are relaxed, cooperative, and comfortable during tooth extractions or cavity fillings.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-clinic-navy-50 rounded-full blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-sans text-sm font-bold text-clinic-teal-600 uppercase tracking-widest"
          >
            FAQ Section
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 mt-2"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-clinic-teal-500 rounded-full mx-auto mt-4"
          />
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="border border-slate-200/60 rounded-2xl overflow-hidden bg-slate-50 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-clinic-teal-500' : 'text-slate-400'}`} />
                    <span className="font-display font-bold text-slate-800 text-sm sm:text-base leading-tight">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-clinic-teal-500' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-2 pl-14 font-sans text-xs sm:text-sm font-semibold text-slate-500 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
