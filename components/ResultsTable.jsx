import React, { useState } from 'react';

const ResultsTable = ({ submissions }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(submissions.length / itemsPerPage);
  const paginatedSubmissions = submissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStressLevelColor = (level) => {
    switch(level) {
        case 'Bajo estrés': return 'bg-green-100 text-green-800';
        case 'Estrés moderado': return 'bg-yellow-100 text-yellow-800';
        case 'Estrés alto': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-unad-light-gray">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sede</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha y Hora</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puntaje Total</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nivel de Estrés</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedSubmissions.length > 0 ? paginatedSubmissions.map((s) => (
            <tr key={s.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{s.sede}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(s.timestamp).toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{s.totalScore}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStressLevelColor(s.stressLevel)}`}>
                  {s.stressLevel}
                </span>
              </td>
            </tr>
          )) : (
            <tr>
                <td colSpan={4} className="text-center py-10 text-gray-500">No hay datos para mostrar con los filtros actuales.</td>
            </tr>
          )}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="no-print px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
                <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Anterior</button>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Siguiente</button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Mostrando <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> a <span className="font-medium">{Math.min(currentPage * itemsPerPage, submissions.length)}</span> de <span className="font-medium">{submissions.length}</span> resultados
                    </p>
                </div>
                 <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button onClick={() => setCurrentPage(p => Math.max(1, p-1))} disabled={currentPage === 1} className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                            Anterior
                        </button>
                        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p+1))} disabled={currentPage === totalPages} className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50">
                            Siguiente
                        </button>
                    </nav>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;