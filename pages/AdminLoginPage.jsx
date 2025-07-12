import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

const AdminLoginPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin');
    } else {
      setError('Contraseña incorrecta.');
      setPassword('');
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center">
            <svg className="mx-auto h-12 w-auto text-unad-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
            <h2 className="mt-6 text-3xl font-extrabold text-unad-dark-gray">
                Acceso de Administrador
            </h2>
            <p className="mt-2 text-sm text-gray-600">
                Ingresa la contraseña para ver el dashboard.
            </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="sr-only">Contraseña</label>
            <div className="relative">
                <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="appearance-none rounded-md relative block w-full px-4 py-3 pr-12 border border-gray-600 bg-unad-dark-gray placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-unad-accent focus:border-unad-accent focus:z-10 sm:text-sm"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-unad-secondary focus:outline-none"
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                    {showPassword ? (
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>

                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a10.05 10.05 0 013.543-5.118l-1.42-1.42A11.95 11.95 0 001 12c1.274 4.057 5.064 7 11 7a11.934 11.934 0 005.875-1.575l-1.42-1.42zM12 15a3 3 0 01-3-3l6 6a3 3 0 01-3-3z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.882 4.118A10.05 10.05 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.05 10.05 0 01-1.543 3.392l-1.42-1.42A7.96 7.96 0 0021 12c-1.274-4.057-5.064-7-9-7a11.934 11.934 0 00-3.118.618l-1.42-1.42zM4.93 4.93l14.14 14.14" />
                        </svg>
                    )}
                </button>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-unad-primary hover:bg-unad-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-unad-accent transition-colors"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;