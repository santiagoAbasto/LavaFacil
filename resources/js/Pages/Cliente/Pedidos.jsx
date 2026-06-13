import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/Layouts/DashboardLayout';
import StatusBadge from '@/Components/StatusBadge';

export default function ClientePedidos({ pedidos }) {
    return (
        <DashboardLayout title="Mis Pedidos">
            <Head title="Mis Pedidos" />

            {!pedidos || pedidos.length === 0 ? (
                <div className="card text-center py-16">
                    <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-[var(--color-muted)]/10 flex items-center justify-center">
                        <svg className="w-7 h-7 text-[var(--color-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                            <rect x="9" y="3" width="6" height="4" rx="1" />
                        </svg>
                    </div>
                    <p className="text-[var(--color-muted)] text-lg mb-4">No tienes pedidos aún.</p>
                    <a href={route('cliente.pedido.create')} className="btn-primary">Crear primer pedido</a>
                </div>
            ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {pedidos.map((pedido, i) => (
                        <motion.div
                            key={pedido.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="card card-interactive"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-lg font-bold text-[var(--color-ink)]">Pedido #{pedido.id}</h3>
                                <StatusBadge estado={pedido.estado} />
                            </div>
                            <div className="space-y-1 text-sm text-[var(--color-muted)]">
                                <p>Recojo: {pedido.fecha_recojo} {pedido.hora_recojo || ''}</p>
                                <p>Dirección: {pedido.direccion_recojo || '—'}</p>
                                <p>Entrega: {pedido.fecha_entrega || '—'}</p>
                                {pedido.notas && <p className="italic">"{pedido.notas}"</p>}
                                <p className="text-base font-semibold text-[var(--color-ink)] mt-3">Total: Bs {pedido.total}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}
