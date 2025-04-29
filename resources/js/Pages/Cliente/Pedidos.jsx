import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Pedidos({ pedidos }) {
    return (
        <div className="p-8 max-w-5xl mx-auto">
            <Head title="Mis Pedidos" />

            <div className="mb-10 text-center">
                <h1 className="text-5xl font-extrabold text-zinc-800 dark:text-white mb-4">
                    Mis Pedidos
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                    Revisa tu historial de servicios realizados en LavaFácil.
                </p>
            </div>

            {/* Lista de pedidos */}
            {pedidos.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center text-zinc-500 dark:text-zinc-400 text-lg mt-10"
                >
                    No tienes pedidos registrados.
                </motion.div>
            ) : (
                <div className="space-y-8">
                    {pedidos.map((pedido) => (
                        <motion.div
                            key={pedido.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="p-6 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-lg rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-md hover:shadow-xl transition-all"
                        >
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                    Pedido #{pedido.id}
                                </h2>

                                <div className="text-sm text-zinc-700 dark:text-zinc-300 space-y-1">
                                    <p><span className="font-semibold">Estado:</span> {pedido.estado.replace('_', ' ')}</p>
                                    <p><span className="font-semibold">Fecha de Recojo:</span> {pedido.fecha_recojo}</p>
                                    <p><span className="font-semibold">Total:</span> Bs {pedido.total}</p>
                                </div>

                                {/* Servicios del pedido */}
                                <div className="pt-4">
                                    <h3 className="text-lg font-semibold text-zinc-700 dark:text-white mb-2">Servicios:</h3>
                                    <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400">
                                        {pedido.detalle_pedidos.map((detalle) => (
                                            <li key={detalle.id}>
                                                {detalle.servicio.nombre} - {detalle.cantidad} x Bs {detalle.servicio.precio}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Información de pago */}
                                {pedido.pago && (
                                    <div className="pt-4">
                                        <h3 className="text-lg font-semibold text-zinc-700 dark:text-white mb-2">Pago:</h3>
                                        <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                                            <p><span className="font-semibold">Método:</span> {pedido.pago.metodo}</p>
                                            <p><span className="font-semibold">Monto Pagado:</span> Bs {pedido.pago.monto}</p>
                                            <p>
                                                <span className="font-semibold">Confirmado:</span> {pedido.pago.confirmado ? 'Sí' : 'No'}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
