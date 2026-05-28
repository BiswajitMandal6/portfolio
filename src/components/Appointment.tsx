import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, ClipboardList, Calendar, Send, CheckCircle2 } from 'lucide-react';

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    problem: '',
    date: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validations
    if (!formData.name.trim() || !formData.phone.trim() || !formData.date) {
      setError('Please fill in all required fields (Name, Phone, Preferred Date).');
      return;
    }

    // Format WhatsApp message
    const clinicNumber = '919593624261'; // Doctor Imran's number
    const message = `Hello Dr. Imran's Clinic,\n\nI would like to book an appointment:\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Preferred Date:* ${formData.date}\n*Problem Description:* ${formData.problem || 'Routine Checkup'}\n\nSubmitted via Website.`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${clinicNumber}?text=${encodedMessage}`;

    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');

    setIsSubmitted(true);
    // Reset Form
    setFormData({
      name: '',
      phone: '',
      problem: '',
      date: '',
    });
  };

  return (
    <section id="appointment" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-clinic-teal-50 rounded-full blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[3rem] border border-slate-200/60 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
          
          {/* Left panel info */}
          <div className="md:col-span-5 bg-gradient-to-tr from-clinic-navy-800 to-clinic-teal-600 p-8 sm:p-12 text-white flex flex-col justify-between text-left">
            <div className="space-y-6">
              <span className="font-sans text-[10px] font-extrabold uppercase tracking-widest bg-white/20 border border-white/30 px-3 py-1 rounded-full w-fit">
                Quick Booking
              </span>
              <h3 className="font-display font-black text-2xl sm:text-3xl leading-tight">
                Schedule Your Consultation
              </h3>
              <p className="font-sans text-xs sm:text-sm text-slate-100 font-semibold leading-relaxed">
                Fill out the booking form to reserve your date. Your inquiry will automatically compile and format into a direct WhatsApp message to Dr. Imran's Clinic team for instant confirmation.
              </p>
            </div>

            <div className="space-y-4 pt-8 border-t border-white/20">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-clinic-teal-200 shrink-0 mt-0.5" />
                <span className="font-sans text-xs font-bold text-slate-100">Direct confirmation via WhatsApp</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-clinic-teal-200 shrink-0 mt-0.5" />
                <span className="font-sans text-xs font-bold text-slate-100">Flexible timings (cl. 7 PM daily)</span>
              </div>
            </div>
          </div>

          {/* Right panel form */}
          <div className="md:col-span-7 p-8 sm:p-12 text-left flex flex-col justify-center">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-clinic-teal-500/10 flex items-center justify-center mx-auto text-clinic-teal-600 mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-display font-black text-2xl text-slate-800">
                  Request Compiled!
                </h4>
                <p className="font-sans text-sm font-semibold text-slate-500 leading-relaxed max-w-sm mx-auto">
                  We have forwarded your booking details to WhatsApp. If the chat window didn't open automatically, please click below to send the message.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-sans font-bold text-xs transition-colors"
                >
                  Book Another Appointment
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Error Banner */}
                {error && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200/50 text-red-600 font-sans text-xs font-semibold">
                    {error}
                  </div>
                )}

                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="font-sans text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 focus:outline-none focus:border-clinic-teal-500 bg-slate-50 font-sans text-sm font-semibold transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="font-sans text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 95936 24261"
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 focus:outline-none focus:border-clinic-teal-500 bg-slate-50 font-sans text-sm font-semibold transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Preferred Date */}
                <div className="space-y-2">
                  <label htmlFor="date" className="font-sans text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 focus:outline-none focus:border-clinic-teal-500 bg-slate-50 font-sans text-sm font-semibold transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Problem Description */}
                <div className="space-y-2">
                  <label htmlFor="problem" className="font-sans text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Problem Description / Symptoms
                  </label>
                  <div className="relative">
                    <ClipboardList className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
                    <textarea
                      id="problem"
                      name="problem"
                      rows={3}
                      value={formData.problem}
                      onChange={handleChange}
                      placeholder="Briefly describe your toothache, routine clean request, braces consultation, etc."
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-200 hover:border-slate-300 focus:outline-none focus:border-clinic-teal-500 bg-slate-50 font-sans text-sm font-semibold transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-clinic-teal-500 hover:bg-clinic-teal-600 text-white font-sans font-bold flex items-center justify-center gap-2 shadow-lg shadow-clinic-teal-500/20 hover:shadow-clinic-teal-500/35 transition-all duration-200"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Appointment Request via WhatsApp</span>
                </button>

              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
