import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mail, Phone, MapPin, CheckCircle2, ShieldAlert } from 'lucide-react';
import { ContactMessage } from '../types';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [sentMessage, setSentMessage] = useState<ContactMessage | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Por favor escribe tu nombre completo.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Por favor escribe tu correo electrónico de contacto.');
      return;
    }
    if (!subject.trim()) {
      setErrorMsg('Por favor selecciona o especifica el asunto.');
      return;
    }
    if (!message.trim() || message.trim().length < 10) {
      setErrorMsg('Tu mensaje debe contener al menos 10 caracteres.');
      return;
    }

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name,
      email,
      phone,
      subject,
      message,
      createdAt: new Date().toISOString()
    };

    // Store message locally
    try {
      const stored = localStorage.getItem('guitar_academy_messages');
      const messages = stored ? JSON.parse(stored) : [];
      messages.push(newMessage);
      localStorage.setItem('guitar_academy_messages', JSON.stringify(messages));
      
      setSentMessage(newMessage);
      
      // Clear inputs
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (e) {
      console.error(e);
      setErrorMsg('Ocurrió un inconveniente al procesar tu mensaje.');
    }
  };

  const contactOptions = [
    {
      icon: <Mail className="w-5 h-5 text-yellow-500" />,
      title: 'Correo Académico',
      value: 'contacto@simonmejiasguitarra.cl',
      desc: 'Soporte, dudas y cotizaciones adicionales.'
    },
    {
      icon: <Phone className="w-5 h-5 text-yellow-500" />,
      title: 'Helpline & WhatsApp Chile',
      value: '+56 9 8837 4421',
      desc: 'Atención personalizada de Lunes a Sábado.'
    },
    {
      icon: <MapPin className="w-5 h-5 text-yellow-500" />,
      title: 'Ubicación Académica',
      value: 'Santiago, Chile',
      desc: 'Disponible para masterclasses presenciales de Simón.'
    }
  ];

  return (
    <section id="contacto" className="py-24 bg-[#0B0D11] border-b border-white/10 text-white relative">
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-yellow-500 font-mono uppercase tracking-widest bg-yellow-500/10 px-3 py-1.5 rounded-full border border-yellow-500/20">
            ¿Tienes Preguntas Adicionales?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 mb-4 font-sans tracking-tight">
            Escríbele Directamente a Simón
          </h2>
          <p className="text-neutral-400 text-sm font-sans mt-2">
            ¿Tienes dudas sobre los métodos de pago, la rítmica que estudiamos o el curso para principiantes? Rellena el formulario y te responderemos en pocas horas.
          </p>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto">
          
          {/* Left info cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <h3 className="text-lg font-bold font-sans text-white border-l-4 border-yellow-500 pl-3 mb-6">
                Canales oficiales de comunicación
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {contactOptions.map((opt, i) => (
                  <div key={i} className="p-5 bg-[#121620]/60 border border-white/10 rounded-2xl flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0 border border-yellow-500/25">
                      {opt.icon}
                    </div>
                    <div className="text-left w-full">
                      <h4 className="text-[10px] font-bold font-mono tracking-wide text-neutral-400 uppercase">{opt.title}</h4>
                      <p className="text-sm font-bold text-white mt-1 font-sans">{opt.value}</p>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed font-sans">{opt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Simulated FAQ trust section */}
            <div className="p-5 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl">
              <h4 className="text-xs font-bold text-yellow-400 font-mono uppercase flex items-center space-x-1.5">
                <ShieldAlert className="w-4 h-4" />
                <span>¿Cómo funciona el pago?</span>
              </h4>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed font-sans">
                Para tu comodidad, la matrícula final se realiza de forma directa mediante transferencia bancaria chilena o tarjetas de débito/crédito. Simón Mejías te enviará el link de pago formal una vez acordados los horarios.
              </p>
            </div>
          </div>

          {/* Right contact form card */}
          <div className="lg:col-span-7">
            <div className="bg-[#121620]/60 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
              <AnimatePresence mode="wait">
                {!sentMessage ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5 text-left"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-white/50">Nombre Completo *</label>
                        <input
                          type="text"
                          required
                          placeholder="Tu nombre"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-black border border-white/10 text-neutral-200 text-xs py-3.5 px-4 rounded-xl w-full focus:border-yellow-500 focus:outline-none font-sans"
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-white/50">Correo Electrónico *</label>
                        <input
                          type="email"
                          required
                          placeholder="ejemplo@correo.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-black border border-white/10 text-neutral-200 text-xs py-3.5 px-4 rounded-xl w-full focus:border-yellow-500 focus:outline-none font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone */}
                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-white/50">Teléfono Chileno o Internacional</label>
                        <input
                          type="tel"
                          placeholder="+56 9 XXXX XXXX"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="bg-black border border-white/10 text-neutral-200 text-xs py-3.5 px-4 rounded-xl w-full focus:border-yellow-500 focus:outline-none font-sans"
                        />
                      </div>

                      {/* Subject */}
                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] font-mono uppercase tracking-wider text-white/50">Asunto de Consulta *</label>
                        <select
                          required
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="bg-black border border-white/10 text-neutral-300 text-xs py-3.5 px-4 rounded-xl w-full focus:border-yellow-500 focus:outline-none font-sans cursor-pointer"
                        >
                          <option value="">-- Elige una opción --</option>
                          <option value="Inscripción Curso Principiante">Inscripción Curso Gratis Principiantes</option>
                          <option value="Compra Masterclass">Matrícula Masterclass ($30k - $65k)</option>
                          <option value="Curso de 8/12 Semanas">Cursos Completos de Larga Duración</option>
                          <option value="Clases Particulares 1-a-1">Coaching 1-a-1 Personalizado</option>
                          <option value="Duda General / Facturación">Otros Asuntos administrativos</option>
                        </select>
                      </div>
                    </div>

                    {/* Message Box */}
                    <div className="flex flex-col space-y-1">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-white/50">Escribe tu Consulta *</label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Escribe tus dudas, nivel actual de guitarra y tus metas para el próximo mes..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="bg-black border border-white/10 text-neutral-200 text-xs py-3.5 px-4 rounded-xl w-full focus:border-yellow-500 focus:outline-none font-sans resize-none"
                      />
                    </div>

                    {/* Error container */}
                    {errorMsg && (
                      <div className="p-3 bg-red-500/10 border border-red-500/25 rounded-xl text-red-400 text-xs flex items-center space-x-2 font-medium">
                        <ShieldAlert className="w-4 h-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-black text-xs uppercase tracking-widest rounded-xl shadow-lg hover:shadow-yellow-500/15 transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Enviar Mensaje</span>
                    </button>
                  </motion.form>
                ) : (
                  // Success contact banner
                  <motion.div
                    key="sent-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-12 px-4 text-center space-y-4"
                  >
                    <div className="w-14 h-14 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-bold text-white font-sans">¡Mensaje Recibido!</h4>
                      <p className="text-xs text-neutral-400 max-w-sm mx-auto font-sans leading-relaxed">
                        Muchas gracias, <span className="text-white font-bold">{sentMessage.name}</span>. Simón Mejías revisará tu consulta académica para resolverla en las próximas 12 horas hábiles.
                      </p>
                    </div>
                    <div className="p-4 bg-black/60 rounded-xl max-w-xs mx-auto text-left border border-white/5 text-[11px] font-sans">
                      <span className="text-neutral-500 block uppercase font-mono text-[9px]">Resumen de ticket:</span>
                      <p className="text-white font-bold mt-1 font-sans">Asunto: {sentMessage.subject}</p>
                      <p className="text-neutral-400 mt-1 truncate font-sans">Email: {sentMessage.email}</p>
                    </div>
                    <button
                      onClick={() => setSentMessage(null)}
                      className="px-5 py-2.5 bg-black hover:bg-black/80 border border-white/5 text-xs font-mono font-medium text-yellow-500 hover:text-white rounded-xl cursor-pointer"
                    >
                      Enviar otra duda
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
