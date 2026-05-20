import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Filter, Clock, BookOpen, Sparkles, ChevronDown, ChevronUp, Music, ShieldCheck } from 'lucide-react';
import { Course } from '../types';
import { COURSES } from '../data/courses';

interface CourseCatalogProps {
  onSelectCourseForBooking: (course: Course) => void;
}

export default function CourseCatalog({ onSelectCourseForBooking }: CourseCatalogProps) {
  const [levelFilter, setLevelFilter] = useState<string>('Todos');
  const [styleFilter, setStyleFilter] = useState<string>('Todos');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  // Derive unique levels and styles
  const levels = ['Todos', 'Principiante', 'Intermedio', 'Avanzado'];
  const styles = ['Todos', 'Acústico', 'Rock & Blues', 'Clásico', 'Jazz & Fusión', 'Varios Estilos'];

  const filteredCourses = COURSES.filter((course) => {
    const matchLevel = levelFilter === 'Todos' || course.level === levelFilter || (course.level === 'Todos los niveles');
    const matchStyle = styleFilter === 'Todos' || course.style === styleFilter || (styleFilter === 'Varios Estilos' && course.style === 'Varios Estilos');
    return matchLevel && matchStyle;
  });

  const toggleExpand = (id: string) => {
    if (expandedCourseId === id) {
      setExpandedCourseId(null);
    } else {
      setExpandedCourseId(id);
    }
  };

  const formatCLP = (value: number) => {
    if (value === 0) return 'Gratis';
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <section id="cursos" className="py-24 bg-[#0B0D11] text-white relative border-b border-white/10">
      {/* Background aesthetic glow */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-yellow-500 font-mono uppercase tracking-widest bg-yellow-500/10 px-3 py-1.5 rounded-full border border-yellow-500/20">
            Nuestros Programas Académicos
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 mb-4 font-sans tracking-tight">
            Cursos Online y Masterclasses Magistrales
          </h2>
          <p className="text-neutral-400 text-sm font-sans mt-2">
            Explora nuestros niveles y estilos de guitarra. Estructurados con materiales visuales, pistas de práctica y tutorías personalizadas con Simón Mejías.
          </p>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full mt-4" />
        </div>

        {/* Filter Bar Controls (Bento Panel) */}
        <div className="bg-[#121620] border border-white/10 rounded-2xl p-6 mb-12 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-3 text-neutral-400">
            <Filter className="w-5 h-5 text-yellow-500 shrink-0" />
            <span className="text-sm font-semibold text-white font-sans">Filtrar programas:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto md:flex md:items-center md:space-x-4">
            {/* Level selector */}
            <div className="flex flex-col space-y-1 md:w-48">
              <label className="text-[10px] font-mono uppercase tracking-wider text-white/50">Nivel de Habilidad</label>
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="bg-black border border-white/10 text-neutral-200 text-xs py-2.5 px-3 rounded-xl focus:border-yellow-500 focus:outline-none font-sans cursor-pointer"
              >
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            {/* Style selector */}
            <div className="flex flex-col space-y-1 md:w-48">
              <label className="text-[10px] font-mono uppercase tracking-wider text-white/50">Estilo Musical</label>
              <select
                value={styleFilter}
                onChange={(e) => setStyleFilter(e.target.value)}
                className="bg-black border border-white/10 text-neutral-200 text-xs py-2.5 px-3 rounded-xl focus:border-yellow-500 focus:outline-none font-sans cursor-pointer"
              >
                {styles.map((styl) => (
                  <option key={styl} value={styl}>{styl}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Catalog Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 bg-[#121620] border border-white/10 rounded-2xl">
            <Music className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
            <p className="text-lg font-bold text-neutral-300 font-sans">No se encontraron cursos coincidentes</p>
            <p className="text-sm text-neutral-500 font-sans mt-1">Prueba reajustando los filtros de nivel o de estilo.</p>
            <button
              onClick={() => { setLevelFilter('Todos'); setStyleFilter('Todos'); }}
              className="mt-4 px-4 py-2 bg-yellow-500 text-black rounded-lg text-xs font-bold font-mono transition-transform duration-200 hover:scale-105"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course) => {
                const isExpanded = expandedCourseId === course.id;

                return (
                  <motion.div
                    layout
                    key={course.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`bg-[#121620]/60 border ${
                      course.isMasterclass ? 'border-yellow-500/30' : 'border-white/10'
                    } rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between transition-all duration-300 hover:border-yellow-500/20 relative group`}
                  >
                    {/* Masterclass Badge */}
                    {course.isMasterclass && (
                      <div className="absolute top-4 right-4 z-10 flex items-center space-x-1.5 px-3 py-1 bg-yellow-500 text-black font-bold text-[10px] font-mono tracking-widest uppercase rounded-full shadow-md">
                        <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-300" />
                        <span>Masterclass</span>
                      </div>
                    )}

                    {/* Normal/Free Course Badge */}
                    {course.isFree && (
                      <div className="absolute top-4 right-4 z-10 flex items-center space-x-1 px-3 py-1 bg-emerald-500 text-black font-bold text-[10px] font-mono tracking-widest uppercase rounded-full shadow-md animate-pulse">
                        <span>Curso Gratis</span>
                      </div>
                    )}

                    {/* Course Banner */}
                    <div className="h-48 relative overflow-hidden shrink-0">
                      <img
                        src={course.bannerUrl}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#121620] via-[#121620]/30 to-transparent" />
                      
                      {/* Price Badge inside cover */}
                      <div className="absolute bottom-4 left-4 flex items-baseline space-x-2">
                        <span className="font-mono text-xl font-black text-white px-2.5 py-0.5 rounded-lg backdrop-blur-md bg-black/65 border border-white/10">
                          {formatCLP(course.price)}
                        </span>
                        {course.isFree && (
                          <span className="text-emerald-400 font-bold font-mono text-[9px] uppercase bg-black/70 py-1 px-2.5 rounded-md backdrop-blur border border-emerald-500/10">Para Iniciantes</span>
                        )}
                        {!course.isFree && (
                          <span className="text-yellow-500 font-bold font-mono text-[9px] uppercase bg-black/70 py-1 px-2.5 rounded-md backdrop-blur border border-yellow-500/10">Precio Chile</span>
                        )}
                      </div>
                    </div>

                    {/* Course Content Info */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        {/* Style / Level Pill row */}
                        <div className="flex flex-wrap gap-2">
                          <span className="text-[10px] font-mono bg-black text-[#A2A4AC] border border-white/5 rounded px-2.5 py-0.5">
                            Estilo: {course.style}
                          </span>
                          <span className="text-[10px] font-mono bg-black text-[#A2A4AC] border border-white/5 rounded px-2.5 py-0.5">
                            {course.level}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-bold text-white leading-snug group-hover:text-yellow-400 transition-colors duration-200">
                          {course.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-[#A2A4AC] leading-relaxed line-clamp-3">
                          {course.description}
                        </p>
                      </div>

                      {/* Course Core Stats */}
                      <div className="grid grid-cols-2 gap-2 py-3 border-t border-b border-white/5 font-mono text-xs text-neutral-400">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-yellow-500/70" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <BookOpen className="w-4 h-4 text-yellow-500/70" />
                          <span>{course.lessonsCount === 1 ? 'Clase Única' : `${course.lessonsCount} Lecciones`}</span>
                        </div>
                      </div>

                      {/* Expandable Syllabus section */}
                      <div className="space-y-2">
                        <button
                          onClick={() => toggleExpand(course.id)}
                          className="flex items-center justify-between w-full py-1 text-xs font-mono font-medium text-yellow-500/80 hover:text-yellow-400 focus:outline-none cursor-pointer"
                        >
                          <span>{isExpanded ? 'Ocultar Temario' : 'Ver Temario del Curso'}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden bg-black/60 rounded-xl p-4 border border-white/5 mt-2 space-y-2 text-xs"
                            >
                              <div className="font-bold text-white mb-2 font-mono flex items-center space-x-1">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                <span>Contenidos de Aprendizaje:</span>
                              </div>
                              <ul className="space-y-1.5 list-disc list-inside text-neutral-300">
                                {course.syllabus.map((topic, i) => (
                                  <li key={i} className="leading-relaxed">{topic}</li>
                                ))}
                              </ul>
                              <div className="pt-2">
                                <p className="font-bold text-white mt-1 mb-1 font-mono">Diferenciales:</p>
                                <ul className="grid grid-cols-1 gap-1 text-[11px] text-yellow-400/90 font-mono">
                                  {course.features.slice(0, 3).map((feat, idx) => (
                                    <li key={idx}>✓ {feat}</li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Purchase/Scheduling Actions */}
                      <div className="pt-2 flex flex-col space-y-2">
                        <button
                          onClick={() => onSelectCourseForBooking(course)}
                          className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-xs tracking-wider uppercase rounded-xl transition-transform duration-200 active:scale-95 cursor-pointer flex items-center justify-center space-x-2"
                        >
                          <span>{course.price === 0 ? 'Agendar Cupo Gratis' : 'Agendar & Reservar Clase'}</span>
                        </button>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

      </div>
    </section>
  );
}
