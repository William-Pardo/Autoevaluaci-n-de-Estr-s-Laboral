import React from 'react';
import { firebaseError } from './services/firebase';
import MainRouter from './router/MainRouter';

function App() {
  if (firebaseError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-red-700 text-center">
          <h1 className="text-2xl font-bold mb-4">Error de configuración</h1>
          <p>Ocurrió un problema al conectar con Firebase. Por favor revisa la configuración.</p>
        </div>
      </div>
    );
  }

  return <MainRouter />;
}

export default App;
