import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Video, Trash2, ShieldCheck, BookOpen, ExternalLink, HelpCircle } from 'lucide-react';
import { Booking } from '../types';

interface StudentDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToBooking: () => void;
}

export default function StudentDashboard({ isOpen, onClose, onGoToBooking }: StudentDashboardProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const fetchBookings = () => {
    try {
      const stored = localStorage.getItem('guitar_academy_bookings');
      if (stored) {
        setBookings(JSON.parse(stored));
      } else {
        setBookings([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchBookings();
    }
  }, [isOpen]);

  const handleCancelBooking = (id: string) => {
    const confirmCancel = window.confirm('¿Estás seguro de que deseas cancelar esta reserva de clase?');
    if (!confirmCancel) return;

    try {
      const stored = localStorage.getItem('guitar_academy_bookings');
      if (stored) {
        const current: Booking[] = JSON.parse(stored);
        const updated = current.filter(b => b.id !== id);
        localStorage.setItem('guitar_academy_bookings', JSON.stringify(updated));
        setBookings(updated);
        
        // Dispatch custom storage event so other components receive updates
        window.dispatchEvent(new Event('storage'));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const activeBookings = bookings.filter(b => b.status === 'Confirmada');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#0D0F14] border-l border-white/10 text-white shadow-2xl flex flex-col justify-between"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/40">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-yellow-500" />
                <div className="text-left animate-fade-in">
                  <h3 className="text-base font-black text-white font-sans uppercase tracking-wider">Mis Clases</h3>
                  <span className="text-[10px] font-mono text-neutral-400">Portal del Estudiante • Simón Mejías</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-white/5 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeBookings.length === 0 ? (
                // Empty Space
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-[#121620]/60 border border-white/10 rounded-2xl flex items-center justify-center mx-auto text-neutral-500">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-neutral-300 font-sans">No tienes clases reservadas</h4>
                    <p className="text-xs text-neutral-450 mt-1 max-w-xs mx-auto font-sans leading-relaxed">
                      Elige un curso en nuestro catálogo, escoge un horario disponible y agenda tu clase en vivo para empezar a tocar.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onGoToBooking();
                    }}
                    className="px-5 py-2.5 bg-yellow-505 bg-yellow-500 text-black font-black text-xs uppercase tracking-wider rounded-xl hover:bg-yellow-600 transition-colors cursor-pointer"
                  >
                    Agendar Primera Clase
                  </button>
                </div>
              ) : (
                // Bookings Cards List
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-yellow-500 uppercase tracking-wider">Tus Reservas Activas</span>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">{activeBookings.length} agendada(s)</span>
                  </div>

                  {activeBookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-5 bg-black/40 border border-white/10 hover:border-yellow-500/20 rounded-2xl space-y-4 relative overflow-hidden group shadow-lg transition-colors duration-300"
                    >
                      <div className="flex justify-between items-start">
                        <div className="space-y-1 text-left">
                          <span className="text-[9px] font-mono text-yellow-505 font-bold uppercase tracking-widest block text-yellow-500">MATRÍCULA CONFIRMADA</span>
                          <h4 className="text-sm font-bold text-white pr-6 leading-tight font-sans">{b.courseTitle}</h4>
                        </div>
                        {/* Cancel/Trash button */}
                        <button
                          onClick={() => handleCancelBooking(b.id)}
                          className="p-1 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer shrink-0"
                          title="Cancelar Reserva"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Schedule info row */}
                      <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-white/5 text-[11px] font-mono text-neutral-400">
                        <div className="text-left">
                          <span className="text-[9px] text-neutral-500 uppercase">Día:</span>
                          <span className="block text-neutral-200 mt-0.5">{b.date}</span>
                        </div>
                        <div className="text-left">
                          <span className="text-[9px] text-neutral-500 uppercase">Hora de Chile:</span>
                          <span className="block text-neutral-200 mt-0.5">{b.time} hrs</span>
                        </div>
                      </div>

                      {/* Custom Simulated virtual videocall salon row */}
                      {b.zoomLink && (
                        <div className="mt-3 bg-black/60 border border-white/5 p-3 rounded-xl flex items-center justify-between gap-2">
                          <div className="flex items-center space-x-2 text-neutral-300">
                            <Video className="w-4.5 h-4.5 text-yellow-500 shrink-0" />
                            <div className="text-left">
                              <span className="text-[8px] font-mono text-neutral-500 uppercase block leading-none">Canal de Clases</span>
                              <span className="text-[11px] font-mono text-yellow-500 block">Google Meet en Vivo</span>
                            </div>
                          </div>
                          <a
                            href={b.zoomLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-black font-bold font-mono text-[10px] rounded-lg transition-all duration-300 flex items-center space-x-1 uppercase"
                          >
                            <span>Unirme</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Technical instructions box */}
              {activeBookings.length > 0 && (
                <div className="p-4 bg-black/40 border border-white/5 rounded-xl space-y-2">
                  <h4 className="text-xs font-bold text-white font-mono uppercase flex items-center space-x-1.5 text-left">
                    <HelpCircle className="w-4 h-4 text-yellow-500" />
                    <span>¿Cómo ingresar a mi clase?</span>
                  </h4>
                  <p className="text-[11px] text-neutral-400 leading-relaxed font-sans text-left">
                    Haz clic en el botón <strong>"Unirme"</strong> para ingresar al salón virtual Meet a la hora preestablecida de tu clase. Recuerda silenciar tu micrófono al ingresar y tener tu guitarra debidamente afinada de antemano.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-black/40 text-center text-[10px] font-mono text-neutral-500 flex justify-between items-center">
              <span>ACADEMIA ONLINE • CHILE</span>
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">SEGURA</span>
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
