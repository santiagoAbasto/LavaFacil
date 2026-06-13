import { Head, Link } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import DashboardLayout from '@/Layouts/DashboardLayout';
import StatCard from '@/Components/StatCard';
import StatusBadge from '@/Components/StatusBadge';

Chart.register(DoughnutController, ArcElement, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function AdminDashboard({ kpi, pedidosRecientes, pedidosPorEstado, ingresosPorMes }) {
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
                        backgroundColor: [
                            'oklch(0.65 0.14 85)',
                            'oklch(0.55 0.19 248)',
                            'oklch(0.55 0.17 150)',
                        ],
                        borderWidth: 0,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: { position: 'bottom', labels: { padding: 16, usePointStyle: true } },
                    },
                    cutout: '70%',
                },
            });
        }

        if (barRef.current) {
            if (barChart.current) barChart.current.destroy();
            const ctx = barRef.current.getContext('2d');
            if (!ctx) return;
            const meses = ingresosPorMes?.map(i => i.mes) || [];
            const montos = ingresosPorMes?.map(i => Number(i.total)) || [];

            barChart.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: meses,
                    datasets: [{
                        label: 'Ingresos',
                        data: montos,
                        backgroundColor: 'oklch(0.55 0.19 248 / 0.7)',
                        borderColor: 'oklch(0.55 0.19 248)',
                        borderWidth: 1,
                        borderRadius: 4,
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { beginAtZero: true, grid: { color: 'oklch(0 0 0 / 0.06)' }, ticks: { callback: (v) => 'Bs ' + v } },
                        x: { grid: { display: false } },
                    },
                },
            });
        }

        return () => {
            if (donutChart.current) donutChart.current.destroy();
            if (barChart.current) barChart.current.destroy();
        };
    }, [pedidosPorEstado, ingresosPorMes]);

    return (
        <DashboardLayout title="Panel de Administración">
            <Head title="Panel de Administración" />

            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <StatCard label="Clientes" value={kpi?.totalClientes || 0} icon="users" color="var(--color-primary)" />
                <StatCard label="Pedidos Totales" value={kpi?.totalPedidos || 0} icon="shopping-bag" color="var(--color-primary)" delay={0.05} />
                <StatCard label="Ingresos" value={'Bs ' + (kpi?.ingresos || 0)} icon="dollar-sign" color="var(--color-success)" delay={0.1} />
                <StatCard label="Pendientes" value={kpi?.pendientes || 0} icon="clock" color="var(--color-warning)" delay={0.15} />
            </div>

            <div className="grid gap-5 lg:grid-cols-2 mb-8">
                <div className="card">
                    <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-4">Distribución de Pedidos</h3>
                    <div className="max-w-xs mx-auto">
                        <canvas ref={donutRef} />
                    </div>
                </div>

                <div className="card">
                    <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-4">Ingresos por Mes</h3>
                    <div>
                        <canvas ref={barRef} />
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[var(--color-ink)]">Pedidos Recientes</h3>
                    <Link href={route('admin.pedidos')} className="text-sm font-medium text-[var(--color-primary)] hover:underline">
                        Ver todos
                    </Link>
                </div>

                {pedidosRecientes?.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[var(--color-border)]">
                                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">#</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">Cliente</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">Total</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--color-border)]">
                                {pedidosRecientes.map((p) => (
                                    <tr key={p.id} className="hover:bg-[var(--color-surface-hover)] transition-colors">
                                        <td className="px-4 py-3 text-sm font-medium text-[var(--color-ink)]">#{p.id}</td>
                                        <td className="px-4 py-3 text-sm text-[var(--color-muted)]">{p.cliente?.name}</td>
                                        <td className="px-4 py-3 text-sm text-[var(--color-muted)]">Bs {p.total}</td>
                                        <td className="px-4 py-3"><StatusBadge estado={p.estado} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-sm text-[var(--color-muted)] py-4 text-center">No hay pedidos registrados.</p>
                )}
            </div>
        </DashboardLayout>
    );
}
