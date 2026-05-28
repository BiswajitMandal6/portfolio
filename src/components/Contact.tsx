import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';

export default function Contact() {
  const contactDetails = [
    {
      icon: MapPin,
      title: 'Our Location',
      info: 'Near Star Cinema Hall, Kalikapur, Kaliachak, West Bengal 732201',
      subInfo: 'Google Map Code: V288+XC Kaliachak',
      ctaText: 'Get Directions',
      ctaLink: 'https://maps.google.com/?q=Star+Cinema+Hall+Kalikapur+Kaliachak+West+Bengal+732201',
    },
    {
      icon: Phone,
      title: 'Contact Number',
      info: '+91 95936 24261',
      subInfo: 'Available for calls & WhatsApp daily',
      ctaText: 'Call Now',
      ctaLink: 'tel:+919593624261',
    },
    {
      icon: Clock,
      title: 'Clinic Timings',
      info: 'Open Daily: 9:00 AM - 7:00 PM',
      subInfo: 'Closes promptly at 7 PM',
      ctaText: 'Book Slot',
      ctaLink: '#appointment',
    },
  ];

  return (
    <section id="contact" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-clinic-navy-50 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-sans text-sm font-bold text-clinic-teal-600 uppercase tracking-widest"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 mt-2"
          >
            Visit Our Clinic Or Call Us Today
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-clinic-teal-500 rounded-full mx-auto mt-4"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Contact Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {contactDetails.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl p-6 border border-slate-200/50 shadow-md flex items-start gap-4 text-left group hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-clinic-teal-500/10 flex items-center justify-center text-clinic-teal-600 shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-grow space-y-1">
                    <h3 className="font-display font-black text-slate-800 text-base leading-tight">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm font-bold text-slate-700 leading-snug">
                      {item.info}
                    </p>
                    <p className="font-sans text-xs font-semibold text-slate-400">
                      {item.subInfo}
                    </p>
                    
                    <div className="pt-2">
                      <a
                        href={item.ctaLink}
                        target={item.ctaLink.startsWith('http') ? '_blank' : undefined}
                        className="inline-flex items-center gap-1.5 font-sans text-xs font-bold text-clinic-teal-600 uppercase tracking-wider hover:text-clinic-teal-700 transition-colors"
                      >
                        {item.title === 'Our Location' && <Navigation className="w-3 h-3" />}
                        <span>{item.ctaText}</span>
                        <span>→</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Embedded Google Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-[2.5rem] overflow-hidden border border-slate-200/60 shadow-xl min-h-[350px] relative bg-slate-100"
          >
            {/* Fallback load screen */}
            <div className="absolute inset-0 bg-slate-200 animate-pulse z-0 flex items-center justify-center font-sans text-slate-400 text-sm">
              Loading Google Maps...
            </div>
            
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3615.1118182962774!2d88.0163351!3d24.8600492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fa345244b7d159%3A0xe54e38c9fe16f06a!2sKaliachak%2C%20West%20Bengal%20732201!5e0!3m2!1sen!2sin!4v1716900000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="relative z-10 w-full h-full"
              onLoad={(e) => {
                const target = e.target as HTMLElement;
                if (target.previousSibling) {
                  (target.previousSibling as HTMLElement).style.display = 'none';
                }
              }}
            ></iframe>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
