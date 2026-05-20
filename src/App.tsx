import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import CourseCatalog from './components/CourseCatalog';
import BookingCalendar from './components/BookingCalendar';
import TestimonialsSection from './components/TestimonialsSection';
import ContactForm from './components/ContactForm';
import StudentDashboard from './components/StudentDashboard';
import Footer from './components/Footer';
import { Course } from './types';
import { COURSES } from './data/courses';

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);

  const handleSelectCourseForBooking = (course: Course) => {
    setSelectedCourse(course);
    setActiveTab('agendar');
    const element = document.getElementById('agendar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBookFreeCourse = () => {
    const freeCourse = COURSES.find(c => c.isFree) || COURSES[0];
    handleSelectCourseForBooking(freeCourse);
  };

  const handleExploreCursos = () => {
    setActiveTab('cursos');
    const element = document.getElementById('cursos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-[#0B0D11] min-h-screen text-neutral-100 selection:bg-yellow-500 selection:text-black">
      
      {/* Header / Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDashboard={() => setIsDashboardOpen(true)}
      />

      {/* Main Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onExploreCursos={handleExploreCursos}
          onBookFreeCourse={handleBookFreeCourse}
        />

        {/* Courses & Classes Catalog Section */}
        <CourseCatalog
          onSelectCourseForBooking={handleSelectCourseForBooking}
        />

        {/* Biographic Simon Mejias info */}
        <About />

        {/* Active Class Booking Calendar */}
        <BookingCalendar
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          onBookingComplete={() => setIsDashboardOpen(true)}
        />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* Contact form & Questions */}
        <ContactForm />
      </main>

      {/* Footer copyright */}
      <Footer />

      {/* Slideout Student Class Dashboard Drawer */}
      <StudentDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        onGoToBooking={() => {
          setActiveTab('agendar');
          const element = document.getElementById('agendar');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      />
    </div>
  );
}
