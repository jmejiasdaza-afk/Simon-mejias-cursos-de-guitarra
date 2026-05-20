import { motion } from 'motion/react';
import { Award, Music, BookOpen, HeartPulse } from 'lucide-react';
import simonPortrait from '../assets/images/simon_mejias_portrait_1779242442349.png';

export default function About() {
  const points = [
    {
      icon: <Award className="w-5 h-5 text-yellow-500" />,
      title: 'Maestría Académica',
      desc: 'Más de 15 años de perfeccionamiento en estilos que abarcan desde el Flamenco y la Guitarra Clásica hasta el Jazz Fusión, Rock y Blues contemporáneo.'
    },
    {
      icon: <BookOpen className="w-5 h-5 text-yellow-500" />,
      title: 'Pedagogía Inclusiva',
      desc: 'Nuestra filosofía rompe con el método aburrido de la repetición ciega. Estrechamos la relación entre la biomecánica corporal y los sentimientos.'
    },
    {
      icon: <Music className="w-5 h-5 text-yellow-500" />,
      title: 'Masterclasses de Alto Nivel',
      desc: 'Clases maestras concentradas sobre problemas técnicos recurrentes del guitarrista moderno, acelerando tu aprendizaje mediante hacks biomecánicos prácticos.'
    },
    {
      icon: <HeartPulse className="w-5 h-5 text-yellow-500" />,
      title: 'Comunidad Chilena y Global',
      desc: 'Un espacio digital vibrante donde alumnos de Chile y toda Latinoamérica comparten grabaciones, resuelven dudas y debaten progresiones.'
    }
  ];

  return (
    <section id="historia" className="py-24 bg-[#0B0D11] border-t border-b border-white/10 relative overflow-hidden">
      {/* Decorative vector shapes */}
      <div className="absolute top-1/2 -left-64 w-96 h-96 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-yellow-500 font-mono uppercase tracking-widest bg-yellow-500/10 px-3 py-1.5 rounded-full border border-yellow-500/20">
            Detrás de las Cuerdas
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 mb-4 font-sans tracking-tight">
            Quién es Simón Mejías
          </h2>
          <div className="h-1 w-20 bg-yellow-500 mx-auto rounded-full" />
        </div>

        {/* Content Section - Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Biography Card & Image */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group max-w-md w-full"
            >
              {/* Golden Accent Border Frame */}
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />
              
              <div className="relative bg-[#121620] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={simonPortrait}
                  alt="Simón Mejías con Guitarra Acústica"
                  className="w-full aspect-square object-cover object-center grayscale drop-shadow-md hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="p-6 bg-gradient-to-t from-black via-black/90 to-black/35">
                  <h4 className="text-lg font-bold text-white font-sans">Simón Mejías</h4>
                  <p className="text-xs font-mono text-yellow-500">Instructor & Concertista de Guitarra</p>
                  <p className="text-xs text-neutral-400 mt-2 font-sans">
                    "Creo fervientemente que no existen malos estudiantes de guitarra, sino enfoques estresantes que matan la pasión."
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: History & Philosophy Texts */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            
            {/* Biography */}
            <div className="space-y-4 bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold font-sans text-white border-l-4 border-yellow-500 pl-3">
                Mi Historia
              </h3>
              <p className="text-sm font-sans text-neutral-300 leading-relaxed font-normal">
                Nací en Chile rodeado de la sonoridad de guitarras acústicas y música andina, pero pronto descubrí que las fronteras musicales se cruzan con la teoría y la introspección. Tras años de estudios formales, conciertos en teatros y grabaciones de sesión en diversos géneros musicales, me di cuenta de una gran carencia: la educación formal suele ser fría y la autodidacta suele frustrar por falta de técnica limpia.
              </p>
              <p className="text-sm font-sans text-neutral-300 leading-relaxed font-normal">
                En 2018 decidí fundar esta academia online para unir el rigor técnico de la guitarra clásica española con las libertades armónicas modernas del Jazz y la rítmica visceral del Rock & Blues. Mi meta es darte las herramientas reales para componer e improvisar de forma libre.
              </p>
            </div>

            {/* Philosophy of Teaching */}
            <div className="space-y-4 bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold font-sans text-white border-l-4 border-yellow-500 pl-3">
                Filosofía de Enseñanza
              </h3>
              <p className="text-sm font-sans text-neutral-300 leading-relaxed font-normal italic font-serif">
                “Tocar la guitarra no es memorizar ciegamente patrones gráficos en el mástil. Es conectar el oído con los dedos a través de una tensión muscular saludable.”
              </p>
              <p className="text-sm font-sans text-[#A2A4AC] leading-relaxed font-normal">
                Mi método prioriza la ergonomía: estudiamos cómo descansa el pulgar, cómo funciona el pivote del brazo y la colocación exacta de la cejilla para evitar contracturas. Ahorramos tiempo enseñando teoría aplicada de forma práctica desde el primer día: no memorizamos progresiones; aprendemos por qué funcionan para que puedas recrear la atmósfera que desees.
              </p>
            </div>

          </div>

        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-16 mt-16 border-t border-white/10">
          {points.map((pt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 bg-[#121620]/60 border border-white/10 rounded-2xl hover:border-yellow-500/25 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/5 group"
            >
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 text-yellow-500">
                {pt.icon}
              </div>
              <h4 className="text-sm font-bold text-white mb-2 font-sans group-hover:text-yellow-400 transition-colors">
                {pt.title}
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                {pt.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
