export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'Principiante' | 'Intermedio' | 'Avanzado' | 'Todos los niveles';
  style: 'Acústico' | 'Eléctrico' | 'Clásico' | 'Flamenco & Latino' | 'Varios Estilos' | 'Rock & Blues' | 'Jazz & Fusión';
  price: number; // in CLP
  isFree?: boolean;
  isMasterclass?: boolean;
  duration: string; // e.g. "8 semanas", "2 horas"
  lessonsCount: number;
  features: string[];
  syllabus: string[];
  bannerUrl: string;
}

export interface Booking {
  id: string;
  courseId: string;
  courseTitle: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  message?: string;
  status: 'Confirmada' | 'Pendiente' | 'Cancelada';
  zoomLink?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string; // e.g., "Alumno Intermedio - Rock & Blues"
  review: string;
  rating: number; // 1 to 5
  avatarSeed: string; // For picsum avatar URL seed
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}
