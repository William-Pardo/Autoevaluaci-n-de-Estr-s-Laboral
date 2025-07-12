import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="bg-unad-primary shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-4 group">
            <svg className="w-10 h-10 text-unad-secondary group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            <h1 className="text-xl md:text-2xl font-bold text-white group-hover:text-unad-secondary transition-colors">
            Autoevaluación de Estrés Laboral – UNAD
            </h1>
        </Link>
        <nav>
          {location.pathname !== '/' && (
            <Link to="/" className="text-white hover:text-unad-secondary transition-colors duration-300 flex items-center gap-2 px-4 py-2 rounded-md hover:bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="hidden sm:inline">Inicio</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
