import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] py-12 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-unad-primary mb-4">Bienvenido</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Selecciona tu rol para continuar. Tu participación es clave para mejorar el bienestar en la UNAD.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Card Colaborador */}
          <Link to="/formulario" className="group block p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out border-t-4 border-transparent hover:border-unad-secondary">
            <div className="flex flex-col items-center">
              <div className="bg-unad-secondary p-4 rounded-full mb-6 inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-unad-primary mb-2">Soy Colaborador</h3>
              <p className="text-gray-600 text-center">
                Realiza la autoevaluación de estrés laboral de forma anónima.
              </p>
              <span className="mt-6 font-semibold text-unad-accent">
                Comenzar Evaluación <span className="group-hover:ml-2 transition-all">&rarr;</span>
              </span>
            </div>
          </Link>

          {/* Card Administrador */}
          <Link to="/admin/login" className="group block p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out border-t-4 border-transparent hover:border-unad-primary">
            <div className="flex flex-col items-center">
              <div className="bg-unad-primary p-4 rounded-full mb-6 inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-unad-primary mb-2">Soy Administrador</h3>
              <p className="text-gray-600 text-center">
                Accede al panel de control para ver estadísticas y reportes.
              </p>
              <span className="mt-6 font-semibold text-unad-accent">
                Iniciar Sesión <span className="group-hover:ml-2 transition-all">&rarr;</span>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;