import { Course } from '../types';

export const COURSES: Course[] = [
  {
    id: 'curso-gratis-principiantes',
    title: 'Guitarra desde Cero: Tu Primera Canción',
    description: 'Aprende las posturas correctas, tus primeros acordes básicos y cómo tocar tus primeras canciones de manera simple y sin frustración. Diseñado especialmente para quienes nunca antes han tomado una guitarra.',
    level: 'Principiante',
    style: 'Varios Estilos',
    price: 0,
    isFree: true,
    isMasterclass: false,
    duration: '4 Semanas',
    lessonsCount: 12,
    features: [
      'Acceso de por vida 100% online',
      'Material PDF interactivo descargable',
      'Soporte en comunidad privada de alumnos',
      'Videos explicativos en alta definición (HD)',
      'Afinación y mantenimiento básico de tu guitarra'
    ],
    syllabus: [
      'Módulo 1: Partes de la guitarra y cómo afinar correctamente.',
      'Módulo 2: Tus primeros 3 acordes mayores (Sol, Do, Re).',
      'Módulo 3: Ejercicios de ritmo básico y rasgueo 4/4.',
      'Módulo 4: Ensamblando la rítmica con acordes para tocar tu primera canción.'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'masterclass-acustica-percusiva',
    title: 'Masterclass: Técnica de Guitarra Acústica Percusiva',
    description: 'Explora y convierte tu guitarra en un instrumento de percusión y armonía al mismo tiempo. Simón te mostrará las técnicas contemporáneas del fingerstyle percusivo moderno.',
    level: 'Avanzado',
    style: 'Acústico',
    price: 30000,
    isFree: false,
    isMasterclass: true,
    duration: '2.5 Horas',
    lessonsCount: 1,
    features: [
      'Clase online en vivo y grabación de por vida',
      'Tablaturas en formato PDF y archivo Guitar Pro',
      'Patrones rítmicos percusivos diagramados',
      'Sesión de preguntas y respuestas directamente con Simón'
    ],
    syllabus: [
      'Sesión 1: El golpe de muñeca y bajo simultáneo (Thumb Slap).',
      'Sesión 2: Armónicos de golpe (Tapped Harmonics) y cascadas.',
      'Sesión 3: Independencia rítmica: Bombo, caja y melodía en una sola guitarra.'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1550985616-10810253b84d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'masterclass-armonia-moderna',
    title: 'Masterclass: Armonía Moderna y Voicings de Jazz',
    description: 'Domina los acordes extendidos y de paso. Simon te enseñará la teoría y la práctica necesarias para salir de los acordes convencionales y enriquecer tus progresiones.',
    level: 'Intermedio',
    style: 'Jazz & Fusión',
    price: 45000,
    isFree: false,
    isMasterclass: true,
    duration: '3 Horas',
    lessonsCount: 1,
    features: [
      'Transmisión HD con múltiples ángulos de cámara',
      'Guía digital "El Mapa de los Voicings Modernos"',
      'Pistas de acompañamiento (Backing Tracks) exclusivas',
      'Acceso al foro de discusión para revisión de tareas'
    ],
    syllabus: [
      'Sesión 1: Construcción de acordes Drop 2 y Drop 3.',
      'Sesión 2: Tensiones disponibles (9as, 11as, 13as) y cómo resolverlas.',
      'Sesión 3: Sustitución tritonal y dominantes secundarios aplicados.'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1445985543470-41fba5c3144a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'masterclass-expresion-solista',
    title: 'Masterclass: Expresión, Dinámicas y Fraseo Solista',
    description: 'Logra que tu guitarra hable. Simón Mejías revela las claves expresivas de los guitarristas de elite para dominar vibrato, bendings emocionales, ligados y el sentido melódico del silencio.',
    level: 'Avanzado',
    style: 'Rock & Blues',
    price: 65000,
    isFree: false,
    isMasterclass: true,
    duration: '3.5 Horas',
    lessonsCount: 1,
    features: [
      'Grabación multicámara en 4K descargable',
      'Diagramas interactivos de escalas y licks avanzados',
      'Revisión en video personalizada (Simón evalúa un video tuyo después)',
      'Certificado digital de Masterclass firmado por Simón Mejías'
    ],
    syllabus: [
      'Sesión 1: El control físico del vibrato y la afinación perfecta en bendings.',
      'Sesión 2: Cómo salirse de la caja pentatónica usando notas de paso e intervalos.',
      'Sesión 3: Dinámica de ataque: Plumilla híbrida (acústica/púa) en solos dinámicos.'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ruta-rock-blues-intermedio',
    title: 'La Ruta del Rock & Blues: Improvisación Real',
    description: 'Transforma tus escalas en solos con sentido. Conoce la rítmica síncopada de Blues, riffs legendarios del Rock y cómo conectar las posiciones del mástil sin perderte.',
    level: 'Intermedio',
    style: 'Rock & Blues',
    price: 85000,
    isFree: false,
    isMasterclass: false,
    duration: '8 Semanas',
    lessonsCount: 24,
    features: [
      '12 clases modulares grabadas en ultra-HD',
      '2 videoconferencias grupales en vivo con Simón para resolver dudas',
      'Soporte personalizado vía Whatsapp con el instructor',
      'Análisis detallado de solos de leyendas como Clapton, Gilmour y Hendrix'
    ],
    syllabus: [
      'Semana 1-2: La estructura de 12 compases de blues (12-Bar Blues) y rítmica shuffle.',
      'Semana 3-4: Conectando las 5 posiciones del sistema CAGED con la pentatónica menor.',
      'Semana 5-6: Técnica de articulación: Sliders, pull-offs, hammer-ons y vibrato expresivo.',
      'Semana 7-8: Creando tu primer solo estructurado usando motivos y desarrollo melódico.'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'fingerstyle-acustico-moderno',
    title: 'Guitarra Acústica Fingerstyle: Bajo Solista',
    description: 'Domina la técnica estrella de la guitarra acústica contemporánea. Aprende a independizar la mano derecha para llevar bajo, acordes, ritmo y melodía simultáneamente.',
    level: 'Avanzado',
    style: 'Acústico',
    price: 95000,
    isFree: false,
    isMasterclass: false,
    duration: '10 Semanas',
    lessonsCount: 30,
    features: [
      'Estudio paso a paso con tomas detalladas de la mano derecha',
      'Soporte prioritario: Respuestas en menos de 24 horas',
      'Videollamada individual de 20 minutos con Simón a mitad del curso',
      'Tablaturas exclusivas para arreglos de canciones conocidas'
    ],
    syllabus: [
      'Semana 1-2: Independencia del pulgar (Travis Picking) y compases binarios.',
      'Semana 3-5: Patrones de arpegios polirrítmicos sobre acordes complejos.',
      'Semana 6-8: Integrando la línea de canto melódico sobre el acompañamiento rítmico.',
      'Semana 9-10: Técnica percusiva sutil e interpretación dinámica y expresiva.'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'guitarra-clasica-espanola-fundamentos',
    title: 'Academia Profesional: Guitarra Clásica y Cánones',
    description: 'Consigue la técnica, postura y precisión necesarias para interpretar la música clásica y ritmos hispanos. Incluye desde la lectura de partitura hasta la interpretación de obras célebres.',
    level: 'Todos los niveles',
    style: 'Clásico',
    price: 100000,
    isFree: false,
    isMasterclass: false,
    duration: '12 Semanas',
    lessonsCount: 36,
    features: [
      'Postura ergónomica profesional con banquillo o soporte',
      '6 sesiones de retroalimentación de video personalizadas',
      'Recital de graduación en directo virtual para alumnos',
      'Bibliotecas descargables de partituras y estudios técnicos de Francisco Tárrega'
    ],
    syllabus: [
      'Semana 1-3: Postura clásica, uso del apoyado y tirado en mano derecha, escalas de iniciación.',
      'Semana 4-6: Lectura rítmica, solfeo aplicado a la guitarra y arpegios fundamentales de Carulli.',
      'Semana 7-9: La cejilla, el ligado clásico y estudios prácticos de Sor y Tárrega.',
      'Semana 10-12: Dinámicas de interpretación clásica y pulido de piezas célebres.'
    ],
    bannerUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=800'
  }
];
