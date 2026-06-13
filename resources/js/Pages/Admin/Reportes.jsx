import { Head } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import DashboardLayout from '@/Layouts/DashboardLayout';

Chart.register(DoughnutController, ArcElement, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Reportes({ pedidosPorEstado, pedidosPorDia }) {
    const donutRef = useRef(null);
    const barRef = useRef(null);
    const donutChart = useRef(null);
    const barChart = useRef(null);

    useEffect(() => {
        if (donutRef.current) {
            if (donutChart.current) donutChart.current.destroy();
            const ctx = donutRef.current.getContext('2d');
            if (!ctx) return;
            donutChart.current = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Pendientes', 'En Proceso', 'Entregados'],
                    datasets: [{
                        data: [
                            pedidosPorEstado?.pendiente || 0,
                            pedidosPorEstado?.en_proceso || 0,
                            pedidosPorEstado?.entregado || 0,
                        ],
                        backgroundColor: ['oklch(0.55 0.16 85)', 'oklch(0.55 0.19 248)', 'oklch(0.55 0.17 150)'],
                        borderWidth: 0,
                    }],
                },
                options: {
                    responsive: true,
                    plugins: { legend: { position: 'bottom', labels: { padding: 16, usePointStyle: true } } },
                    cutout: '70%',
                },
            });
        }

        if (barRef.current) {
            if (barChart.current) barChart.current.destroy();
            const ctx = barRef.current.getContext('2d');
            if (!ctx) return;
            const labels = pedidosPorDia?.map(d => d.dia) || [];
            const valores = pedidosPorDia?.map(d => d.total) || [];
            barChart.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [{
                        label: 'Pedidos',
                        data: valores,
                        backgroundColor: 'oklch(0.55 0.19 248 / 0.7)',
                        borderColor: 'oklch(0.55 0.19 248)',
                        borderWidth: 1,
                        borderRadius: 4,
                    }],
                },
                options: {
                    responsive: true,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, grid: { color: 'oklch(0 0 0 / 0.06)' } },
                        x: { grid: { display: false } },
                    },
                },
            });
        }

        return () => {
            if (donutChart.current) donutChart.current.destroy();
            if (barChart.current) barChart.current.destroy();
        };
    }, [pedidosPorEstado, pedidosPorDia]);

    return (
        <DashboardLayout title="Reportes">
            <Head title="Reportes" />

            <div className="grid gap-6 md:grid-cols-2">
                <div className="card">
                    <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-4">Distribución de Pedidos</h3>
                    <div className="aspect-square max-w-sm mx-auto">
                        <canvas ref={donutRef} />
                    </div>
                </div>

                <div className="card">
                    <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-4">Pedidos por Día</h3>
                    <div>
                        <canvas ref={barRef} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
