import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Guitar, Calendar, Menu, X, Users, MessageSquare } from 'lucide-react';
import { Booking } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenDashboard: () => void;
}

export default function Header({ activeTab, setActiveTab, onOpenDashboard }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [bookingsCount, setBookingsCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const updateBookingsCount = () => {
      try {
        const stored = localStorage.getItem('guitar_academy_bookings');
        if (stored) {
          const bookings: Booking[] = JSON.parse(stored);
          const activeBookings = bookings.filter(b => b.status === 'Confirmada').length;
          setBookingsCount(activeBookings);
        } else {
          setBookingsCount(0);
        }
      } catch (e) {
        console.error(e);
      }
    };

    window.addEventListener('scroll', handleScroll);
    updateBookingsCount();

    // Check for changes on storage
    window.addEventListener('storage', updateBookingsCount);
    const interval = setInterval(updateBookingsCount, 2000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', updateBookingsCount);
      clearInterval(interval);
    };
  }, []);

  const menuItems = [
    { id: 'cursos', label: 'Cursos & Clases' },
    { id: 'historia', label: 'Mi Historia' },
    { id: 'agendar', label: 'Agendar Clase' },
    { id: 'testimonios', label: 'Testimonios' },
    { id: 'contacto', label: 'Contacto' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0D11]/90 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
          : 'bg-gradient-to-b from-[#0B0D11]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('inicio')}
            className="flex items-center space-x-3 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center text-black shadow-md shadow-yellow-500/20 group-hover:scale-105 transition-transform duration-300">
              <Guitar className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-wider font-sans leading-none uppercase">
                Simón Mejías <span className="text-yellow-500">Guitar</span>
              </h1>
              <span className="text-[10px] text-white/50 font-mono tracking-widest uppercase">
                Guitarra Online
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium tracking-wide transition-colors relative py-1 cursor-pointer hover:text-yellow-400 ${
                  activeTab === item.id ? 'text-yellow-500 font-semibold' : 'text-neutral-300'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Bookings Dashboard & Action */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onOpenDashboard}
              className="flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 hover:border-yellow-500/30 text-neutral-300 hover:text-white rounded-xl text-xs font-medium font-mono transition-all duration-300 cursor-pointer relative"
            >
              <Calendar className="w-4 h-4 text-yellow-500" />
              <span>Mis Clases</span>
              {bookingsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 text-[10px] font-bold text-black animate-pulse">
                  {bookingsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => handleNavClick('agendar')}
              className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-xs rounded-xl shadow-lg shadow-yellow-500/10 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              Reservar Cupo
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={onOpenDashboard}
              className="p-2 text-neutral-300 hover:text-white bg-white/5 border border-white/10 rounded-lg relative"
            >
              <Calendar className="w-4 h-4" />
              {bookingsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-yellow-500 text-[8px] font-bold text-black">
                  {bookingsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-neutral-300 hover:text-white bg-white/5 border border-white/10 rounded-lg focus:outline-none"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#0B0D11] border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-3">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-yellow-500/10 text-yellow-500'
                      : 'text-neutral-300 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-3 border-t border-white/10 flex flex-col space-y-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenDashboard();
                  }}
                  className="flex items-center justify-center space-x-2 w-full py-2.5 px-3 bg-white/5 text-neutral-300 rounded-lg text-sm border border-white/5"
                >
                  <Calendar className="w-4 h-4 text-yellow-500" />
                  <span>Ver Mis Clases Reservadas</span>
                </button>
                <button
                  onClick={() => handleNavClick('agendar')}
                  className="w-full py-3 bg-yellow-500 text-black font-bold text-center rounded-lg text-sm shadow-md"
                >
                  Agendar Cupo de Clase
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
