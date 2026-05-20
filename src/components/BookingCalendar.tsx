import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, AlertCircle, CheckCircle2, ArrowRight, Video, Sparkles } from 'lucide-react';
import { Course, Booking } from '../types';
import { COURSES } from '../data/courses';

interface BookingCalendarProps {
  selectedCourse: Course | null;
  setSelectedCourse: (course: Course | null) => void;
  onBookingComplete?: () => void;
}

export default function BookingCalendar({ selectedCourse, setSelectedCourse, onBookingComplete }: BookingCalendarProps) {
  const [availableDays, setAvailableDays] = useState<{ dateString: string; labelDay: string; labelDate: string; weekday: string }[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  
  // Form fields
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentMessage, setStudentMessage] = useState('');
  
  const [errorMsg, setErrorMsg] = useState('');
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);

  const availableHours = ['10:00', '12:00', '15:30', '17:30', '19:00', '20:30'];

  // Generate 10 days starting from May 20, 2026 (or current date if later)
  useEffect(() => {
    const list = [];
    let current = new Date(2026, 4, 20); // May 20, 2026
    const today = new Date();
    if (today > current) {
      current = today;
    }

    let count = 0;
    const weekdays_es = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const months_es = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    while (count < 10) {
      const dayOfWeek = current.getDay();
      
      // Skip Sundays for lessons
      if (dayOfWeek !== 0) {
        const year = current.getFullYear();
        const month = String(current.getMonth() + 1).padStart(2, '0');
        const dayNum = String(current.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${dayNum}`;
        
        list.push({
          dateString,
          labelDay: weekdays_es[dayOfWeek],
          labelDate: `${current.getDate()} ${months_es[current.getMonth()]}`,
          weekday: weekdays_es[dayOfWeek]
        });
        count++;
      }
      current.setDate(current.getDate() + 1);
    }
    setAvailableDays(list);
    if (list.length > 0) {
      setSelectedDay(list[0].dateString);
    }
  }, []);

  // Pre-fill course if none selected
  useEffect(() => {
    if (!selectedCourse && COURSES.length > 0) {
      setSelectedCourse(COURSES[0]);
    }
  }, [selectedCourse, setSelectedCourse]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!selectedCourse) {
      setErrorMsg('Por favor selecciona un curso o masterclass.');
      return;
    }
    if (!selectedDay) {
      setErrorMsg('Por favor selecciona un día disponible.');
      return;
    }
    if (!selectedTime) {
      setErrorMsg('Por favor selecciona una hora de clase.');
      return;
    }
    if (!studentName.trim() || studentName.trim().length < 3) {
      setErrorMsg('Por favor ingresa tu nombre completo.');
      return;
    }
    if (!studentEmail.trim() || !studentEmail.includes('@')) {
      setErrorMsg('Por favor ingresa un correo electrónico válido.');
      return;
    }
    if (!studentPhone.trim() || studentPhone.length < 7) {
      setErrorMsg('Por favor ingresa un número de teléfono de contacto.');
      return;
    }

    // Process Booking
    const zoomMeetings = [
      'https://meet.google.com/gog-guit-sim',
      'https://meet.google.com/mst-meji-abc',
      'https://meet.google.com/clase-guitar-xyz'
    ];
    const pickedZoom = zoomMeetings[Math.floor(Math.random() * zoomMeetings.length)];

    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      courseId: selectedCourse.id,
      courseTitle: selectedCourse.title,
      date: selectedDay,
      time: selectedTime,
      studentName,
      studentEmail,
      studentPhone,
      message: studentMessage,
      status: 'Confirmada',
      zoomLink: pickedZoom,
      createdAt: new Date().toISOString()
    };

    try {
      const stored = localStorage.getItem('guitar_academy_bookings');
      const currentBookings = stored ? JSON.parse(stored) : [];
      currentBookings.push(newBooking);
      localStorage.setItem('guitar_academy_bookings', JSON.stringify(currentBookings));

      // Show Success view
      setSuccessBooking(newBooking);
      if (onBookingComplete) onBookingComplete();
    } catch (err) {
      setErrorMsg('Ocurrió un error guardando tu reserva. Por favor intenta otra vez.');
      console.error(err);
    }
  };

  const resetAfterSuccess = () => {
    setSuccessBooking(null);
    setSelectedTime('');
    setStudentName('');
    setStudentEmail('');
    setStudentPhone('');
    setStudentMessage('');
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
    <section id="agendar" className="py-24 bg-[#0B0D11] border-b border-white/10 text-white relative">
      <div className="absolute top-1/4 left-1/2 w-80 h-80 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-yellow-500 font-mono uppercase tracking-widest bg-yellow-500/10 px-3 py-1.5 rounded-full border border-yellow-500/20">
            Agenda Tu Masterclass o Curso
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 mb-4 font-sans tracking-tight">
            Agenda Totalmente Online
          </h2>
          <p className="text-neutral-400 text-sm font-sans leading-relaxed mt-2">
            Reserva tus días y horas inmediatamente. Al agendar, recibirás tu acceso virtual al salón de clases de Simón Mejías y el material temático respectivo.
          </p>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full mt-4" />
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!successBooking ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="bg-[#121620]/60 border border-white/10 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0"
              >
                
                {/* Left Visual Summary Side */}
                <div className="lg:col-span-4 bg-gradient-to-b from-black/40 via-black/80 to-black/90 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-black text-yellow-500 font-sans tracking-tight uppercase">Programa</h3>
                      <div className="mt-3">
                        <label className="text-[10px] font-mono tracking-wider text-white/50 uppercase">Selecciona el Curso</label>
                        <select
                          value={selectedCourse?.id || ''}
                          onChange={(e) => {
                            const found = COURSES.find(c => c.id === e.target.value);
                            if (found) setSelectedCourse(found);
                          }}
                          className="mt-1 w-full bg-black border border-white/10 text-neutral-200 text-xs py-2.5 px-3 rounded-xl focus:border-yellow-500 focus:outline-none font-sans cursor-pointer"
                        >
                          {COURSES.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {selectedCourse && (
                      <div className="p-4 bg-black/40 rounded-xl border border-white/5 space-y-3">
                        <div className="text-[10px] font-mono font-bold text-yellow-500 uppercase tracking-widest">{selectedCourse.level}</div>
                        <h4 className="text-sm font-bold text-white line-clamp-2 font-sans">{selectedCourse.title}</h4>
                        <div className="text-xs text-neutral-400 font-sans leading-relaxed line-clamp-3">{selectedCourse.description}</div>
                        
                        <div className="pt-2 border-t border-white/5 flex justify-between items-center text-xs font-mono">
                          <span className="text-neutral-500 uppercase">Duración:</span>
                          <span className="text-white font-bold">{selectedCourse.duration}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {selectedCourse && (
                    <div className="pt-6 border-t border-white/5 flex justify-between items-center bg-black/40 p-3 rounded-xl mt-6">
                      <div>
                        <span className="text-[10px] font-mono text-neutral-500 uppercase block">Valor</span>
                        <span className="text-xl font-mono font-black text-yellow-500">{formatCLP(selectedCourse.price)}</span>
                      </div>
                      <div className="text-[10px] text-right font-mono text-neutral-400">
                        {selectedCourse.price === 0 ? (
                          <span className="text-emerald-400 font-bold uppercase">Acceso Libre</span>
                        ) : (
                          <span>Garantizado</span>
                        )}
                      </div>
                    </div>
                  )}

                </div>

                {/* Right Scheduler Form Side */}
                <form onSubmit={handleBookingSubmit} className="lg:col-span-8 p-6 sm:p-8 space-y-6 text-left">
                  
                  {/* Step 1: Date Carousel */}
                  <div className="space-y-3">
                    <label className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-widest flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>1. Elige una fecha</span>
                    </label>

                    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                      {availableDays.map((day) => {
                        const isChosen = selectedDay === day.dateString;
                        return (
                          <button
                            key={day.dateString}
                            type="button"
                            onClick={() => setSelectedDay(day.dateString)}
                            className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center shrink-0 w-20 cursor-pointer transition-all duration-300 ${
                              isChosen
                                ? 'bg-yellow-500 border-yellow-600 text-black font-bold shadow-lg shadow-yellow-500/10'
                                : 'bg-black hover:bg-neutral-900 border-white/10 text-neutral-300'
                            }`}
                          >
                            <span className={`text-[10px] font-mono tracking-wider uppercase ${isChosen ? 'text-black/80' : 'text-neutral-500'}`}>
                              {day.labelDay}
                            </span>
                            <span className="text-sm font-black mt-1 font-sans">
                              {day.labelDate.split(' ')[0]}
                            </span>
                            <span className={`text-[9px] font-mono uppercase mt-0.5 ${isChosen ? 'text-black/80' : 'text-neutral-500'}`}>
                              {day.labelDate.split(' ')[1]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Hour Chips */}
                  <div className="space-y-3">
                    <label className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-widest flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>2. Elige un horario</span>
                    </label>

                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {availableHours.map((hour) => {
                        const isChosen = selectedTime === hour;
                        return (
                          <button
                            key={hour}
                            type="button"
                            onClick={() => setSelectedTime(hour)}
                            className={`py-2.5 text-center rounded-xl border text-xs font-mono font-medium cursor-pointer transition-all duration-200 ${
                              isChosen
                                ? 'bg-yellow-500 border-yellow-600 text-black font-bold shadow-lg'
                                : 'bg-black hover:bg-neutral-900 border-white/10 text-neutral-400 hover:text-white'
                            }`}
                          >
                            {hour}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3: Student Details */}
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <label className="text-xs font-mono font-bold text-yellow-500 uppercase tracking-widest flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>3. Tus datos de contacto</span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-white/50">Nombre Completo</label>
                        <div className="relative">
                          <User className="absolute left-3 top-3.5 w-4 h-4 text-neutral-500" />
                          <input
                            type="text"
                            required
                            placeholder="Ej. Juan Pérez"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            className="bg-black border border-white/10 text-neutral-200 text-xs py-3.5 pl-10 pr-4 rounded-xl w-full focus:border-yellow-500 focus:outline-none font-sans"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-white/50">Correo Electrónico</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3.5 w-4 h-4 text-neutral-500" />
                          <input
                            type="email"
                            required
                            placeholder="tu@correo.com"
                            value={studentEmail}
                            onChange={(e) => setStudentEmail(e.target.value)}
                            className="bg-black border border-white/10 text-neutral-200 text-xs py-3.5 pl-10 pr-4 rounded-xl w-full focus:border-yellow-500 focus:outline-none font-sans"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-white/50">Teléfono Móvil (WhatsApp)</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3.5 w-4 h-4 text-neutral-500" />
                          <input
                            type="tel"
                            required
                            placeholder="Ej: +56 9 1234 5678"
                            value={studentPhone}
                            onChange={(e) => setStudentPhone(e.target.value)}
                            className="bg-black border border-white/10 text-neutral-200 text-xs py-3.5 pl-10 pr-4 rounded-xl w-full focus:border-yellow-500 focus:outline-none font-sans"
                          />
                        </div>
                      </div>

                      {/* Extra Message */}
                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-white/50">Mensaje a Simón (Opcional)</label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3.5 w-4 h-4 text-neutral-500" />
                          <input
                            type="text"
                            placeholder="Coméntame tu nivel o qué guitarra tienes..."
                            value={studentMessage}
                            onChange={(e) => setStudentMessage(e.target.value)}
                            className="bg-black border border-white/10 text-neutral-200 text-xs py-3.5 pl-10 pr-4 rounded-xl w-full focus:border-yellow-500 focus:outline-none font-sans"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Errors display */}
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-medium flex items-center space-x-2"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 px-6 bg-yellow-500 hover:bg-yellow-600 text-black font-black text-sm tracking-wide uppercase rounded-xl shadow-lg hover:shadow-yellow-500/10 active:scale-98 transition-all duration-300 cursor-pointer flex items-center justify-center space-x-3"
                    >
                      <span>Confirmar Reserva de la Clase</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <p className="text-[11px] text-neutral-500 text-center mt-3 font-sans">
                      La reserva se agendará localmente en la solapa "Mis Clases" para visualización directa.
                    </p>
                  </div>

                </form>

              </motion.div>
            ) : (
              // Success Receipt screen
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#121620] border border-emerald-500/20 rounded-3xl p-8 shadow-2xl text-center max-w-lg mx-auto space-y-6"
              >
                <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner border border-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white font-sans tracking-tight">¡Tu Clase ha sido Agendada!</h3>
                  <p className="text-neutral-400 text-sm font-sans">
                    Excelente elección, <span className="font-bold text-white">{successBooking.studentName}</span>. Tu reserva con Simón Mejías fue procesada exitosamente.
                  </p>
                </div>

                {/* Receipt Card */}
                <div className="bg-black/40 rounded-2xl p-6 text-left border border-white/5 space-y-4 font-sans">
                  <div className="pb-3 border-b border-white/5 text-center">
                    <div className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest">CÓDIGO DE RESERVA</div>
                    <div className="text-yellow-500 font-mono text-xs font-bold">{successBooking.id}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-neutral-500 block uppercase font-mono text-[9px] tracking-wider">Curso / Módulo</span>
                      <span className="text-white font-bold block mt-0.5">{successBooking.courseTitle}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block uppercase font-mono text-[9px] tracking-wider">Fecha de la Clase</span>
                      <span className="text-white font-bold block mt-0.5">{successBooking.date}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                    <div>
                      <span className="text-neutral-500 block uppercase font-mono text-[9px] tracking-wider">Horario (Chile)</span>
                      <span className="text-white font-bold block mt-0.5">{successBooking.time} hrs</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block uppercase font-mono text-[9px] tracking-wider">Estado</span>
                      <span className="text-emerald-400 font-mono font-bold block mt-0.5">● CONFIRMADA</span>
                    </div>
                  </div>

                  {/* Simulated Zoom Call Link */}
                  {successBooking.zoomLink && (
                    <div className="pt-4 mt-2 border-t border-white/5 bg-black/60 p-3.5 rounded-xl border border-white/5 flex items-center justify-between">
                      <div className="flex items-center space-x-2.5">
                        <Video className="w-4.5 h-4.5 text-yellow-500 shrink-0" />
                        <div>
                          <span className="text-[9px] font-mono text-neutral-500 uppercase block">Enlace Virtual (Google Meet)</span>
                          <a href={successBooking.zoomLink} target="_blank" rel="noopener noreferrer" className="text-xs text-yellow-500 font-mono underline hover:text-yellow-400">
                            Ir al Salón Virtual
                          </a>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono bg-neutral-900 border border-white/10 text-neutral-400 rounded px-1.5 py-0.5">VIRTUAL</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={resetAfterSuccess}
                    className="flex-1 py-3 bg-black hover:bg-neutral-900 border border-white/5 text-neutral-300 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer"
                  >
                    Agendar otra clase
                  </button>
                  <button
                    onClick={() => {
                      resetAfterSuccess();
                      if (onBookingComplete) onBookingComplete();
                    }}
                    className="flex-1 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer flex items-center justify-center space-x-1"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Ver Mis Reservas Activas</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
