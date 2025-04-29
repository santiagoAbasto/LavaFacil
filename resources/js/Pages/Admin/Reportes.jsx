import { Head } from '@inertiajs/react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

export default function Reportes({ pedidosPorEstado, pedidosPorDia }) {
    const estados = Object.keys(pedidosPorEstado);
    const cantidades = Object.values(pedidosPorEstado);

    const dias = pedidosPorDia.map(p => p.dia);
    const pedidosDia = pedidosPorDia.map(p => p.total);

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <Head title="Reportes y Gráficos" />

            <div className="mb-10 text-center">
                <h1 className="text-5xl font-extrabold text-zinc-800 dark:text-white mb-4">
                    Reportes de Pedidos
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                    Visualiza el comportamiento de los pedidos realizados.
                </p>
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pedidos por Estado */}
                <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 p-6 rounded-2xl shadow-md">
                    <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 text-center mb-4">
                        Pedidos por Estado
                    </h2>
                    <Doughnut
                        data={{
                            labels: estados,
                            datasets: [{
                                data: cantidades,
                                backgroundColor: ['#60a5fa', '#facc15', '#34d399'],
                            }]
                        }}
                    />
                </div>

                {/* Pedidos por Día */}
                <div className="bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 p-6 rounded-2xl shadow-md">
                    <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400 text-center mb-4">
                        Pedidos por Día
                    </h2>
                    <Bar
                        data={{
                            labels: dias,
                            datasets: [{
                                label: 'Pedidos',
                                data: pedidosDia,
                                backgroundColor: '#6366f1',
                            }]
                        }}
                        options={{
                            scales: {
                                y: { beginAtZero: true }
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
