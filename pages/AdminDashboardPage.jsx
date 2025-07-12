import React, { useState, useMemo } from 'react';
import { useData } from '../hooks/useData.js';
import { useAuth } from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard.jsx';
import { StressLevel } from '../types.js';
import ResultsTable from '../components/ResultsTable.jsx';
import { BarChartComponent, PieChartComponent } from '../components/Charts.jsx';
import { generatePdfReport } from '../services/pdfGenerator.js';
import { SEDES_UNAD } from '../constants.js';

const AdminDashboardPage = () => {
    const { submissions } = useData();
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

    // Filters
    const [sedeFilter, setSedeFilter] = useState('all');
    const [stressLevelFilter, setStressLevelFilter] = useState('all');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const handleGeneratePdf = async () => {
        setIsGeneratingPdf(true);
        await generatePdfReport('pdf-report-content', `Reporte_Estres_Laboral_${new Date().toISOString().split('T')[0]}.pdf`);
        setIsGeneratingPdf(false);
    };

    const filteredSubmissions = useMemo(() => {
        return submissions.filter(s => {
            if (!s.timestamp) return false;
            const submissionDate = new Date(s.timestamp);
            const startDate = dateRange.start ? new Date(dateRange.start + 'T00:00:00') : null;
            const endDate = dateRange.end ? new Date(dateRange.end + 'T23:59:59') : null;
            
            if (startDate && submissionDate < startDate) return false;
            if (endDate && submissionDate > endDate) return false;
            if (sedeFilter !== 'all' && s.sede !== sedeFilter) return false;
            if (stressLevelFilter !== 'all' && s.stressLevel !== stressLevelFilter) return false;
            return true;
        });
    }, [submissions, sedeFilter, stressLevelFilter, dateRange]);

    const totalSubmissions = filteredSubmissions.length;

    const stressLevelDistribution = useMemo(() => {
        const counts = { [StressLevel.Bajo]: 0, [StressLevel.Moderado]: 0, [StressLevel.Alto]: 0 };
        filteredSubmissions.forEach(s => {
            if (counts[s.stressLevel] !== undefined) {
               counts[s.stressLevel]++;
            }
        });
        return [
            { name: StressLevel.Bajo, value: counts[StressLevel.Bajo], fill: '#4CAF50' },
            { name: StressLevel.Moderado, value: counts[StressLevel.Moderado], fill: '#FFC107' },
            { name: StressLevel.Alto, value: counts[StressLevel.Alto], fill: '#F44336' },
        ];
    }, [filteredSubmissions]);

    const sedeDistribution = useMemo(() => {
        const counts = {};
        filteredSubmissions.forEach(s => {
            counts[s.sede] = (counts[s.sede] || 0) + 1;
        });
        return Object.entries(counts)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    }, [filteredSubmissions]);

    const hourDistribution = useMemo(() => {
        const counts = Array(24).fill(0);
        filteredSubmissions.forEach(s => {
            if (s.timestamp) {
                const hour = new Date(s.timestamp).getHours();
                counts[hour]++;
            }
        });
        return counts.map((value, index) => ({ name: `${index}:00`, value }));
    }, [filteredSubmissions]);


    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold text-unad-primary">Dashboard de Administrador</h1>
                <div className="flex items-center gap-4">
                    <button onClick={handleGeneratePdf} disabled={isGeneratingPdf} className="no-print px-4 py-2 bg-unad-accent text-white rounded-lg hover:bg-opacity-90 transition-colors disabled:bg-gray-400">
                        {isGeneratingPdf ? 'Generando PDF...' : 'Generar Reporte PDF'}
                    </button>
                    <button onClick={handleLogout} className="no-print px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Cerrar Sesión
                    </button>
                </div>
            </div>

            {/* Filters Section */}
            <div className="no-print grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-white rounded-lg shadow">
                 <div>
                    <label htmlFor="date-start" className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio</label>
                    <input
                        type="date"
                        id="date-start"
                        value={dateRange.start}
                        onChange={e => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                        className="mt-1 block w-full p-3 rounded-md bg-unad-dark-gray text-white border border-gray-600 focus:ring-2 focus:ring-unad-accent focus:border-unad-accent transition [color-scheme:dark]"
                    />
                </div>
                <div>
                    <label htmlFor="date-end" className="block text-sm font-medium text-gray-700 mb-1">Fecha Fin</label>
                    <input
                        type="date"
                        id="date-end"
                        value={dateRange.end}
                        onChange={e => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                        className="mt-1 block w-full p-3 rounded-md bg-unad-dark-gray text-white border border-gray-600 focus:ring-2 focus:ring-unad-accent focus:border-unad-accent transition [color-scheme:dark]"
                    />
                </div>
                <div>
                    <label htmlFor="sede-filter" className="block text-sm font-medium text-gray-700 mb-1">Sede</label>
                    <select
                        id="sede-filter"
                        value={sedeFilter}
                        onChange={e => setSedeFilter(e.target.value)}
                        className="mt-1 block w-full p-3 rounded-md bg-unad-dark-gray text-white border border-gray-600 focus:ring-2 focus:ring-unad-accent focus:border-unad-accent transition"
                    >
                        <option value="all" className="bg-unad-dark-gray text-white">Todas las Sedes</option>
                        {SEDES_UNAD.map(sede => <option key={sede} value={sede} className="bg-unad-dark-gray text-white">{sede}</option>)}
                    </select>
                </div>
                 <div>
                    <label htmlFor="stress-filter" className="block text-sm font-medium text-gray-700 mb-1">Nivel de Estrés</label>
                    <select
                        id="stress-filter"
                        value={stressLevelFilter}
                        onChange={e => setStressLevelFilter(e.target.value)}
                        className="mt-1 block w-full p-3 rounded-md bg-unad-dark-gray text-white border border-gray-600 focus:ring-2 focus:ring-unad-accent focus:border-unad-accent transition"
                    >
                        <option value="all" className="bg-unad-dark-gray text-white">Todos los Niveles</option>
                        {Object.values(StressLevel).map(level => <option key={level} value={level} className="bg-unad-dark-gray text-white">{level}</option>)}
                    </select>
                </div>
            </div>

            <div id="pdf-report-content" className="p-6 bg-white rounded-xl shadow-lg space-y-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <StatCard title="Total de Formularios" value={totalSubmissions.toString()} />
                    <StatCard title="Sede más Activa" value={sedeDistribution.length > 0 ? sedeDistribution[0].name : 'N/A'} />
                    <StatCard title="Nivel de Estrés Predominante" value={stressLevelDistribution.sort((a,b) => b.value - a.value)[0]?.name || 'N/A'} />
                </div>
                
                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
                    <div className="bg-unad-light-gray p-4 rounded-lg shadow-inner">
                        <h3 className="text-xl font-semibold text-center mb-4 text-unad-primary">Distribución por Nivel de Estrés</h3>
                        <PieChartComponent data={stressLevelDistribution} />
                    </div>
                    <div className="bg-unad-light-gray p-4 rounded-lg shadow-inner">
                        <h3 className="text-xl font-semibold text-center mb-4 text-unad-primary">Envíos por Sede (Top 10)</h3>
                        <BarChartComponent data={sedeDistribution.slice(0, 10)} dataKey="value" nameKey="name" />
                    </div>
                    <div className="bg-unad-light-gray p-4 rounded-lg shadow-inner col-span-1 lg:col-span-2">
                         <h3 className="text-xl font-semibold text-center mb-4 text-unad-primary">Horas Pico de Uso</h3>
                         <BarChartComponent data={hourDistribution} dataKey="value" nameKey="name" />
                    </div>
                </div>

                {/* Detailed Table */}
                <div className="pt-6">
                    <h3 className="text-2xl font-semibold mb-4 text-unad-primary">Vista Detallada de Envíos</h3>
                    <ResultsTable submissions={filteredSubmissions} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;