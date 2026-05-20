import { Guitar, Copyright, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B0D11] border-t border-white/10 py-12 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-3 text-left">
            <div className="w-9 h-9 bg-yellow-500 rounded-lg flex items-center justify-center text-black">
              <Guitar className="w-5 h-5 fill-black stroke-black" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-wider uppercase">SIMÓN MEJÍAS</h1>
              <span className="text-[9px] text-yellow-500 font-mono tracking-widest uppercase block mt-0.5">Guitarra Online • Desde Chile</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-neutral-400 font-mono">
            <a href="#cursos" className="hover:text-yellow-500 transition-colors">Programas</a>
            <a href="#historia" className="hover:text-yellow-500 transition-colors">Historia</a>
            <a href="#agendar" className="hover:text-yellow-500 transition-colors">Agendar</a>
            <a href="#testimonios" className="hover:text-yellow-500 transition-colors">Testimonios</a>
            <a href="#contacto" className="hover:text-yellow-500 transition-colors">Contacto</a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 bg-[#121620] hover:bg-[#121620]/80 text-neutral-300 hover:text-white border border-white/10 hover:border-yellow-500/20 rounded-xl transition-all duration-300 cursor-pointer flex items-center space-x-1 font-mono text-xs"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Legal disclosures & rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 font-mono gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-1">
            <Copyright className="w-3.5 h-3.5" />
            <span>2026 Academia de Guitarra Simón Mejías. Todos los derechos reservados.</span>
          </div>

          <div className="flex items-center space-x-1 justify-center sm:justify-start">
            <span>Creado con</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>para guitarristas de Chile y el Mundo.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
