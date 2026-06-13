import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/Layouts/DashboardLayout';
import StatCard from '@/Components/StatCard';
import StatusBadge from '@/Components/StatusBadge';

export default function ClienteDashboard({ ultimoPedido, stats }) {
    return (
        <DashboardLayout title="Mi Panel">
            <Head title="Panel de Cliente" />

            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <StatCard label="Pedidos Totales" value={stats?.total || 0} icon="shopping-bag" color="var(--color-primary)" />
                <StatCard label="Pendientes" value={stats?.pendientes || 0} icon="clock" color="var(--color-warning)" delay={0.05} />
                <StatCard label="En Proceso" value={stats?.en_proceso || 0} icon="trending-up" color="var(--color-primary)" delay={0.1} />
                <StatCard label="Entregados" value={stats?.entregados || 0} icon="check-circle" color="var(--color-success)" delay={0.15} />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="card"
                >
                    <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-4">Acciones rápidas</h3>
                    <div className="flex flex-wrap gap-3">
                        <Link href={route('cliente.pedido.create')} className="btn-primary">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 8v8M8 12h8" />
                            </svg>
                            Nuevo Pedido
                        </Link>
                        <Link href={route('cliente.pedidos')} className="btn-secondary">
                            Ver mis pedidos
                        </Link>
                    </div>
                </motion.div>

                {ultimoPedido && (
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="card"
                    >
                        <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-4">Último pedido</h3>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-[var(--color-ink)]">Pedido #{ultimoPedido.id}</p>
                                <p className="text-sm text-[var(--color-muted)]">Total: Bs {ultimoPedido.total}</p>
                                {ultimoPedido.fecha_recojo && (
                                    <p className="text-xs text-[var(--color-muted)] mt-1">
                                        Recojo: {ultimoPedido.fecha_recojo} {ultimoPedido.hora_recojo || ''}
                                    </p>
                                )}
                            </div>
                            <StatusBadge estado={ultimoPedido.estado} />
                        </div>
                    </motion.div>
                )}
            </div>
        </DashboardLayout>
    );
}
