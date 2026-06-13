import { Head, Link } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { Chart, DoughnutController, ArcElement, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import DashboardLayout from '@/Layouts/DashboardLayout';
import StatCard from '@/Components/StatCard';

Chart.register(DoughnutController, ArcElement, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function SuperAdminDashboard({ kpi, pedidosPorEstado, ingresosPorMes, usuariosRecientes, pedidosRecientes }) {
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
                        backgroundColor: ['oklch(0.65 0.14 85)', 'oklch(0.55 0.19 248)', 'oklch(0.55 0.17 150)'],
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
        <DashboardLayout title="Panel Super Admin">
            <Head title="Panel Super Admin" />

            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 mb-8">
                <StatCard label="Usuarios Totales" value={kpi?.totalUsuarios || 0} icon="users" color="var(--color-primary)" />
                <StatCard label="Clientes" value={kpi?.totalClientes || 0} icon="users" color="var(--color-primary)" delay={0.05} />
                <StatCard label="Administradores" value={kpi?.totalAdmins || 0} icon="shield" color="var(--color-primary)" delay={0.1} />
                <StatCard label="Pedidos Totales" value={kpi?.totalPedidos || 0} icon="shopping-bag" color="var(--color-primary)" delay={0.15} />
                <StatCard label="Ingresos" value={'Bs ' + (kpi?.ingresosTotales || 0)} icon="dollar-sign" color="var(--color-success)" delay={0.2} />
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

            <div className="grid gap-5 lg:grid-cols-2">
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-[var(--color-ink)]">Usuarios Recientes</h3>
                        <Link href={route('super-admin.usuarios')} className="text-sm font-medium text-[var(--color-primary)] hover:underline">
                            Gestionar
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {usuariosRecientes?.map(u => (
                            <div key={u.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-[var(--color-surface-hover)]">
                                <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-xs font-semibold">
                                    {u.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-[var(--color-ink)] truncate">{u.name}</p>
                                    <p className="text-xs text-[var(--color-muted)]">{u.rol}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card">
                    <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-4">Pedidos Recientes</h3>
                    <div className="space-y-3">
                        {pedidosRecientes?.map(p => (
                            <div key={p.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--color-surface-hover)]">
                                <div>
                                    <p className="text-sm font-medium text-[var(--color-ink)]">Pedido #{p.id}</p>
                                    <p className="text-xs text-[var(--color-muted)]">{p.cliente?.name}</p>
                                </div>
                                <span className="text-sm font-semibold text-[var(--color-ink)]">Bs {p.total}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
