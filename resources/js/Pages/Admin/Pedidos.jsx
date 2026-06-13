import { Head, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import StatusBadge from '@/Components/StatusBadge';

export default function Pedidos({ pedidos, estadoActual }) {
    const [cambiandoId, setCambiandoId] = useState(null);

    const cambiarEstado = (id) => {
        setCambiandoId(id);
        router.put(route('admin.pedidos.actualizarEstado', id), {}, {
            preserveScroll: true,
            onFinish: () => setCambiandoId(null),
        });
    };

    const filtrar = (e) => {
        router.get(route('admin.pedidos'), { estado: e.target.value });
    };

    return (
        <DashboardLayout title="Pedidos">
            <Head title="Gestionar Pedidos" />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <p className="text-sm text-[var(--color-muted)]">
                    {pedidos.length} pedido{pedidos.length !== 1 ? 's' : ''}
                    {estadoActual ? ` (${estadoActual.replace('_', ' ')})` : ''}
                </p>
                <div className="w-full sm:w-56">
                    <select value={estadoActual || ''} onChange={filtrar} className="select-field">
                        <option value="">Todos</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="en_proceso">En Proceso</option>
                        <option value="entregado">Entregado</option>
                    </select>
                </div>
            </div>

            {pedidos.length === 0 ? (
                <div className="card text-center py-16">
                    <p className="text-[var(--color-muted)] text-lg">No hay pedidos registrados.</p>
                </div>
            ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {pedidos.map((pedido, i) => (
                        <motion.div
                            key={pedido.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                            className="card card-interactive"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-lg font-bold text-[var(--color-ink)]">Pedido #{pedido.id}</h3>
                                <StatusBadge estado={pedido.estado} />
                            </div>

                            <div className="space-y-2 text-sm text-[var(--color-muted)] mb-5">
                                <p><span className="font-medium text-[var(--color-ink)]">Cliente:</span> {pedido.cliente?.name}</p>
                                <p><span className="font-medium text-[var(--color-ink)]">Recojo:</span> {pedido.fecha_recojo} {pedido.hora_recojo || ''}</p>
                                <p><span className="font-medium text-[var(--color-ink)]">Dirección:</span> {pedido.direccion_recojo || '—'}</p>
                                <p><span className="font-medium text-[var(--color-ink)]">Total:</span> Bs {pedido.total}</p>
                                {pedido.pago && <p><span className="font-medium text-[var(--color-success)]">Pagado:</span> Bs {pedido.pago.monto} ({pedido.pago.metodo})</p>}
                                {pedido.notas && <p className="italic text-xs">"{pedido.notas}"</p>}
                            </div>

                            {pedido.estado !== 'entregado' && (
                                <button
                                    onClick={() => cambiarEstado(pedido.id)}
                                    disabled={cambiandoId === pedido.id}
                                    className="btn-secondary btn-sm w-full"
                                >
                                    {cambiandoId === pedido.id ? 'Actualizando…' : 'Avanzar estado'}
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}
