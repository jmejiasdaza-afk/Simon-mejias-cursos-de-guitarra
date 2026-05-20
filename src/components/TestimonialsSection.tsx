import { motion } from 'motion/react';
import { Star, Quote, Heart } from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonials';

export default function TestimonialsSection() {
  return (
    <section id="testimonios" className="py-24 bg-[#0B0D11] border-t border-b border-white/10 text-white relative">
      <div className="absolute top-10 left-10 w-96 h-96 bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-yellow-500 font-mono uppercase tracking-widest bg-yellow-500/10 px-3 py-1.5 rounded-full border border-yellow-500/20">
            Comunidad y Resultados
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 mb-4 font-sans tracking-tight">
            Qué Dicen Mis Alumnos
          </h2>
          <p className="text-neutral-400 text-sm font-sans">
            Descubre las historias de virtuosismo y superación personal de quienes confiaron en el método online de Simón Mejías para potenciar su destreza en la guitarra.
          </p>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full mt-4" />
        </div>

        {/* Testimonials Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-8 bg-[#121620]/60 border border-white/10 rounded-2xl relative flex flex-col justify-between shadow-xl shadow-black/40 hover:border-yellow-500/20 transition-all duration-300 group"
            >
              {/* Quotes Icon */}
              <Quote className="absolute right-6 top-6 w-12 h-12 text-white/5 group-hover:text-yellow-500/10 transition-colors duration-300 pointer-events-none" />

              {/* Main review content */}
              <div className="space-y-4">
                {/* Visual stars rating */}
                <div className="flex items-center space-x-1 text-yellow-500">
                  {Array.from({ length: test.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 stroke-none" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm font-sans text-neutral-300 leading-relaxed font-normal italic">
                  "{test.review}"
                </p>
              </div>

              {/* Student info footer */}
              <div className="flex items-center space-x-4 pt-6 mt-6 border-t border-white/5">
                {/* Mini avatar representation with letters inside dynamic colored backdrop */}
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-yellow-500/20 to-yellow-600/10 border border-yellow-500/25 flex items-center justify-center font-bold text-sm text-yellow-400 font-mono">
                  {test.name.split(' ').map(n => n[0]).join('')}
                </div>

                <div className="text-left font-sans">
                  <h4 className="text-sm font-bold text-white leading-none">
                    {test.name}
                  </h4>
                  <span className="text-[11px] text-yellow-500/85 font-mono leading-relaxed block mt-1">
                    {test.role}
                  </span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Additional guarantee trust bar */}
        <div className="mt-16 bg-[#121620]/60 border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-500/15 rounded-xl flex items-center justify-center text-yellow-400">
              <Heart className="w-5 h-5 fill-yellow-400 stroke-none" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-white">Satisfacción Absoluta</h4>
              <p className="text-xs text-[#A2A4AC]">Clases orientadas a resultados rápidos con soporte ilimitado.</p>
            </div>
          </div>
          <div className="font-mono text-xs text-yellow-500 bg-black/60 px-4 py-2.5 rounded-xl border border-white/5">
            ★ Valoración media: 5.0 / 5.0 en Chile
          </div>
        </div>

      </div>
    </section>
  );
}
