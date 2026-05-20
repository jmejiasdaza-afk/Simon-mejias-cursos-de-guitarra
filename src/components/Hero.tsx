import { motion } from 'motion/react';
import { Play, Star, CheckCircle, Sparkles, Guitar, Trophy, ArrowRight, Flame } from 'lucide-react';
import guitarHero from '../assets/images/guitar_hero_banner_1779242460322.png';

interface HeroProps {
  onExploreCursos: () => void;
  onBookFreeCourse: () => void;
}

export default function Hero({ onExploreCursos, onBookFreeCourse }: HeroProps) {
  return (
    <section id="inicio" className="relative min-h-[92vh] flex items-center justify-center bg-[#0B0D11] pt-28 pb-16 overflow-hidden">
      {/* Background Graphic elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src={guitarHero}
          alt="Clases de Guitarra Simon Mejias"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0B0D11]/90 to-[#0B0D11]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D11] via-[#0B0D11]/40 to-[#0B0D11]/20" />
      </div>

      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-yellow-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          
          {/* Bento Card 1: Main Hero & Philosophy (Spans 8 cols on large screens, rows 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-12 lg:col-span-8 bg-gradient-to-br from-[#121620] to-black border border-white/10 rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[460px]"
          >
            {/* Ambient vector mark watermark */}
            <div className="absolute top-0 right-0 p-6 text-yellow-500/5 select-none pointer-events-none">
              <Guitar className="w-60 h-60 rotate-45" />
            </div>

            <div className="space-y-6 max-w-2xl relative z-10">
              {/* Tagline */}
              <div className="inline-flex items-center space-x-2 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-full">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-[11px] font-bold text-yellow-500 font-mono tracking-wider uppercase">
                  Instructor Profesional
                </span>
              </div>

              {/* Title */}
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05] font-sans">
                Técnica, Sentimiento <br className="hidden sm:inline" />
                y <span className="text-yellow-500">Disciplina.</span>
              </h2>

              {/* Description */}
              <p className="text-[#A2A4AC] text-base sm:text-lg font-sans font-normal leading-relaxed">
                "Mi filosofía no es solo tocar notas de memoria; es entender el lenguaje real del instrumento para que hable por ti de forma natural. Llevo 15 años transformando guitarristas amateur en músicos versátiles."
              </p>

              {/* Quick checks list */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
                <div className="flex items-center space-x-2 text-white/80">
                  <CheckCircle className="w-4.5 h-4.5 text-yellow-500 shrink-0" />
                  <span className="text-xs font-medium font-sans">Teoría Aplicada</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <CheckCircle className="w-4.5 h-4.5 text-yellow-500 shrink-0" />
                  <span className="text-xs font-medium font-sans">Pedagogía Práctica</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <CheckCircle className="w-4.5 h-4.5 text-yellow-500 shrink-0" />
                  <span className="text-xs font-medium font-sans">Soporte Continuo</span>
                </div>
              </div>
            </div>

            {/* Actions Area */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 relative z-10">
              <button
                onClick={onExploreCursos}
                className="px-6 py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-black text-xs tracking-wider uppercase rounded-xl shadow-lg shadow-yellow-500/10 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Ver Catálogo de Cursos</span>
                <Play className="w-3.5 h-3.5 fill-black stroke-none" />
              </button>

              <button
                onClick={onBookFreeCourse}
                className="px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs tracking-wider uppercase rounded-xl transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Iniciar Curso Gratis</span>
              </button>
            </div>
          </motion.div>

          {/* Bento Card 2: Free Course CTA block (Spans 4 cols on large, custom styling) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-6 lg:col-span-4 bg-yellow-500 text-black rounded-3xl p-7 flex flex-col justify-between min-h-[460px] hover:scale-[1.01] transition-transform duration-300 shadow-xl"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold uppercase border border-black/25 px-2.5 py-1 rounded-md">
                  Nivel Inicial gratis
                </span>
                <Flame className="w-5 h-5 text-black/80" />
              </div>
              <h3 className="text-3xl font-black tracking-tight leading-none mt-4">
                Curso Inicial <br />
                Gratuito
              </h3>
              <p className="text-black/80 text-sm font-medium leading-relaxed font-sans pt-1">
                Empieza hoy mismo sin costo alguno. Todo sobre fundamentos biomecánicos, colocación ergonométrica de dedos y primeras tablaturas.
              </p>
            </div>

            <div className="space-y-4 pt-6">
              <div className="p-3 bg-black/5 rounded-xl border border-black/10">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#2D2E32]">NIVEL 0</div>
                <div className="text-xs font-bold font-sans">Ideal si nunca has tocado antes.</div>
              </div>
              <button
                onClick={onBookFreeCourse}
                className="w-full bg-black hover:bg-neutral-900 text-white py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5"
              >
                Inscribirme Gratis
              </button>
            </div>
          </motion.div>

          {/* Bento Card 3: Quick Stats (Spans 4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-6 lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-around text-center"
          >
            <div>
              <div className="text-4xl font-black text-white font-sans tracking-tight">500+</div>
              <div className="text-[10px] text-white/50 uppercase tracking-widest font-mono mt-1">Alumnos Activos</div>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div>
              <div className="text-4xl font-black text-white font-sans tracking-tight">12</div>
              <div className="text-[10px] text-white/50 uppercase tracking-widest font-mono mt-1">Estilos y Técnicas</div>
            </div>
          </motion.div>

          {/* Bento Card 4: Masterclass Highlight (Spans 4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-6 lg:col-span-4 bg-[#121620] border border-yellow-500/20 rounded-2xl p-6 flex items-center space-x-4"
          >
            <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center text-yellow-500 shrink-0 border border-yellow-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest font-mono">Masterclass Highlight</div>
              <div className="text-base font-black text-white leading-tight font-sans mt-0.5">Soloing & Improvisación</div>
              <span className="text-xs text-white/60 font-sans block mt-0.5">Aprende los secretos del mástil</span>
            </div>
          </motion.div>

          {/* Bento Card 5: Biography snippet / Quote (Spans 4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-6 lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col justify-center overflow-hidden"
          >
            <div className="flex items-center space-x-2 mb-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <div className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest font-mono">Mi Historia</div>
            </div>
            <p className="text-[12px] leading-relaxed text-[#A2A4AC] font-sans">
              Con más de 15 años de concertismo nacional e internacional, Simón fundó esta academia online para unir el rigor de la guitarra clásica con la libertad del Jazz y la pasión del Blues.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
