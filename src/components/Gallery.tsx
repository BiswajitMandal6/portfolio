import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye } from 'lucide-react';

export default function Gallery() {
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', name: 'All Photos' },
    { id: 'interior', name: 'Clinic Interior' },
    { id: 'equipment', name: 'Equipment & Tech' },
    { id: 'patients', name: 'Happy Patients' },
    { id: 'comparison', name: 'Before & After' },
  ];

  const items = [
    {
      id: 1,
      category: 'interior',
      title: 'Modern Clinic Interior',
      desc: 'Elegant reception and comfortable patient waiting area.',
      img: '/dental_clinic_interior.png',
    },
    {
      id: 2,
      category: 'equipment',
      title: 'State-of-the-Art Treatment Chair',
      desc: 'Ergonomic layouts ensuring sterile diagnostics.',
      img: '/treatment_room.png',
    },
    {
      id: 3,
      category: 'patients',
      title: 'Smiling Patient Care',
      desc: 'Happy and stress-free dental consultations.',
      img: '/happy_patient.png',
    },
    {
      id: 4,
      category: 'interior',
      title: 'Clean Consultation Desk',
      desc: 'Where Dr. Imran details treatment plans with clarity.',
      img: '/doctor_portrait.png',
    },
  ];

  // Before & After comparison data
  const comparisons = [
    {
      title: 'Teeth Alignment (Braces)',
      before: 'Crowded and misaligned teeth layout.',
      after: 'Perfectly aligned and straightened teeth.',
      beforeText: 'Before Treatment',
      afterText: 'After 12 Months',
      color: 'from-blue-500/10 to-clinic-teal-500/10',
    },
    {
      title: 'Teeth Scaling & Whitening',
      before: 'Plaque buildup and standard yellow discoloration.',
      after: 'Bright, stainless, and clean white teeth.',
      beforeText: 'Before Cleaning',
      afterText: 'After 45 Mins',
      color: 'from-clinic-teal-500/10 to-cyan-500/10',
    },
  ];

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.category === filter);

  return (
    <section id="gallery" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative SVG shapes */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-clinic-teal-50 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-sans text-sm font-bold text-clinic-teal-600 uppercase tracking-widest"
          >
            Clinic Gallery
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 mt-2"
          >
            A Visual Tour of Our Clinic & Results
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-1 bg-clinic-teal-500 rounded-full mx-auto mt-4"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-5 py-2.5 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                filter === cat.id
                  ? 'bg-clinic-teal-500 text-white shadow-md shadow-clinic-teal-500/20'
                  : 'bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid / Content */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {/* Standard Images Grid */}
            {filter !== 'comparison' && (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative rounded-3xl overflow-hidden shadow-lg border border-slate-200/40 bg-slate-50 aspect-[4/3]"
                  >
                    {/* Placeholder loading */}
                    <div className="absolute inset-0 bg-slate-200 animate-pulse z-0" />
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-105"
                      onLoad={(e) => {
                        const target = e.target as HTMLElement;
                        if (target.previousSibling) {
                          (target.previousSibling as HTMLElement).style.display = 'none';
                        }
                      }}
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-clinic-navy-950 via-clinic-navy-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-end p-6 text-left">
                      <div className="w-8 h-8 rounded-lg bg-clinic-teal-500/20 flex items-center justify-center mb-3">
                        <Eye className="w-4 h-4 text-clinic-teal-300" />
                      </div>
                      <h4 className="font-display font-extrabold text-base text-white">
                        {item.title}
                      </h4>
                      <p className="font-sans text-xs font-semibold text-slate-300 mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Before / After Comparison Cards */}
            {(filter === 'comparison' || filter === 'all') && (
              <motion.div
                key="comparison-grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${filter !== 'all' ? 'mt-0' : 'mt-12 pt-12 border-t border-slate-100'}`}
              >
                {filter === 'all' && (
                  <div className="md:col-span-2 text-left mb-4">
                    <h3 className="font-display font-black text-2xl text-slate-800">
                      Featured Treatment Comparisons
                    </h3>
                    <p className="font-sans text-sm text-slate-500 font-semibold mt-1">
                      Before and after results demonstrating clinical excellence.
                    </p>
                  </div>
                )}

                {comparisons.map((comp, idx) => (
                  <div
                    key={idx}
                    className="rounded-[2rem] border border-slate-200/60 bg-white p-6 shadow-xl flex flex-col justify-between"
                  >
                    <h4 className="font-display font-extrabold text-lg text-slate-800 text-left mb-6">
                      {comp.title}
                    </h4>

                    {/* Comparison Cards Layout */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Before State */}
                      <div className={`p-5 rounded-2xl bg-gradient-to-tr ${comp.color} border border-slate-100 flex flex-col justify-center min-h-[140px] text-center relative overflow-hidden group`}>
                        <span className="font-sans text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-50 border border-red-200/50 px-2 py-0.5 rounded-full w-fit mx-auto mb-3">
                          {comp.beforeText}
                        </span>
                        <p className="font-sans text-xs font-bold text-slate-600 leading-relaxed">
                          {comp.before}
                        </p>
                      </div>

                      {/* After State */}
                      <div className="p-5 rounded-2xl bg-clinic-teal-500 text-white flex flex-col justify-center min-h-[140px] text-center relative overflow-hidden">
                        <span className="font-sans text-[10px] font-bold text-white uppercase tracking-widest bg-white/20 border border-white/30 px-2 py-0.5 rounded-full w-fit mx-auto mb-3">
                          {comp.afterText}
                        </span>
                        <p className="font-sans text-xs font-bold text-white leading-relaxed">
                          {comp.after}
                        </p>
                      </div>
                    </div>

                    <p className="font-sans text-xs font-semibold text-slate-400 mt-6 text-center">
                      Disclaimer: Individual results may vary based on dental conditions.
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
