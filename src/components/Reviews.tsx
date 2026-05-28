import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Reviews() {
  const reviews = [
    {
      name: 'Bishnu Sarkar',
      role: 'Local Guide',
      avatar: 'BS',
      avatarBg: 'bg-emerald-500',
      rating: 5,
      text: 'Nice behaviour of Doctor and staff. Dr. Imran is very patient and explains each dental step clearly.',
      date: '2 weeks ago',
    },
    {
      name: 'Riya Das',
      role: 'Patient',
      avatar: 'RD',
      avatarBg: 'bg-blue-500',
      rating: 5,
      text: 'He is very gentle and funny for patients. The root canal treatment was virtually painless, which surprised me!',
      date: '1 month ago',
    },
    {
      name: 'Manirul Islam',
      role: 'Patient',
      avatar: 'MI',
      avatarBg: 'bg-purple-500',
      rating: 5,
      text: 'Professional dental treatment with care. The clinic is extremely hygienic and modern. High recommended!',
      date: '3 months ago',
    },
    {
      name: 'Prakash Roy',
      role: 'Patient',
      avatar: 'PR',
      avatarBg: 'bg-teal-500',
      rating: 5,
      text: 'Dr. Imran is excellent with children. My daughter was scared, but he handled the extraction with great humor and care.',
      date: '4 months ago',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="reviews" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-clinic-teal-50 rounded-full blur-[120px] -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-sans text-sm font-bold text-clinic-teal-600 uppercase tracking-widest"
          >
            Patient Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 mt-2"
          >
            What Our Patients Say About Us
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-clinic-teal-500 rounded-full mx-auto mt-4"
          />
        </div>

        {/* Carousel Container */}
        <div className="relative bg-white rounded-[2.5rem] border border-slate-200/60 p-8 sm:p-12 shadow-xl shadow-slate-100 flex flex-col items-center">
          
          <Quote className="w-12 h-12 text-clinic-teal-500/20 absolute top-8 left-8" />
          
          <div className="w-full min-h-[180px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-6"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1">
                  {[...Array(reviews[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="font-sans text-lg sm:text-xl text-slate-700 leading-relaxed font-semibold italic max-w-2xl mx-auto">
                  "{reviews[currentIndex].text}"
                </p>

                {/* Profile Details */}
                <div className="flex items-center justify-center gap-3">
                  <div className={`w-12 h-12 rounded-full ${reviews[currentIndex].avatarBg} text-white flex items-center justify-center font-display font-extrabold text-lg shadow-inner`}>
                    {reviews[currentIndex].avatar}
                  </div>
                  <div className="text-left">
                    <h4 className="font-display font-bold text-slate-800 leading-none">
                      {reviews[currentIndex].name}
                    </h4>
                    <span className="font-sans text-xs font-bold text-slate-400 mt-1 block">
                      {reviews[currentIndex].role} &bull; {reviews[currentIndex].date}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={handlePrev}
              aria-label="Previous review"
              className="p-3 rounded-2xl bg-slate-50 border border-slate-200/50 hover:bg-slate-100 hover:border-slate-300 text-slate-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next review"
              className="p-3 rounded-2xl bg-slate-50 border border-slate-200/50 hover:bg-slate-100 hover:border-slate-300 text-slate-600 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Google Reviews Trust Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-slate-200/60 shadow-sm">
            <span className="font-sans text-sm font-semibold text-slate-600">
              Rated <span className="font-extrabold text-slate-800">4.8 / 5.0</span> stars based on 128 Google Reviews
            </span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
