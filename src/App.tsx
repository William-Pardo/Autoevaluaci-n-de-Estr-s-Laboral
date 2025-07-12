import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';
import { AuthProvider } from './contexts/AuthContext';
import { useData } from './hooks/useData';

import UserFormPage from './pages/UserFormPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import AiHelpPage from './pages/AiHelpPage';

const AppContent: React.FC = () => {
  const { firebaseError } = useData();

  return (
      <HashRouter>
          <div className="min-h-screen bg-unad-light-gray text-unad-dark-gray font-sans">
              <Header />
              {firebaseError && (
                  <div role="alert" className="bg-red-600 text-white p-4 fixed top-[80px] left-0 right-0 z-50 shadow-lg text-center animate-pulse">
                      <p className="font-bold">¡Error de Configuración de Firebase!</p>
                      <p className="text-sm">{firebaseError.message}. Por favor, revisa tus variables de entorno en el archivo .env.local</p>
                  </div>
              )}
              <main className={`container mx-auto p-4 md:p-8 transition-all ${firebaseError ? 'pt-28' : ''}`}>
                  <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/formulario" element={<UserFormPage />} />
                      <Route path="/ayuda-ia" element={<AiHelpPage />} />
                      <Route path="/admin/login" element={<AdminLoginPage />} />
                      <Route
                          path="/admin"
                          element={
                              <PrivateRoute>
                                  <AdminDashboardPage />
                              </PrivateRoute>
                          }
                      />
                  </Routes>
              </main>
          </div>
      </HashRouter>
  );
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
