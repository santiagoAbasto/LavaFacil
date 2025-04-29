import { Head, router } from '@inertiajs/react';
import { motion } from "framer-motion";
import { useState } from 'react';

export default function Pedidos({ pedidos, estadoActual }) {
    const [cambiandoPedidoId, setCambiandoPedidoId] = useState(null);

    const cambiarEstado = (pedidoId) => {
        setCambiandoPedidoId(pedidoId);

        router.put(route('admin.pedidos.actualizarEstado', pedidoId), {
            onSuccess: () => {
                // ✅ visit asegura que se ejecute onFinish correctamente
                router.visit(route('admin.pedidos'), {
                    method: 'get',
                    data: { estado: estadoActual },
                    preserveScroll: true,
                    only: ['pedidos'],
                    onFinish: () => setCambiandoPedidoId(null),
                });
            },
            onError: () => setCambiandoPedidoId(null),
        });
    };

    const filtrarPorEstado = (e) => {
        router.get(route('admin.pedidos'), { estado: e.target.value });
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <Head title="Gestionar Pedidos" />

            {/* Título */}
            <div className="mb-10 text-center">
                <h1 className="text-5xl font-black text-zinc-800 dark:text-white mb-4">
                    Pedidos
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                    Filtra y actualiza los estados de los pedidos registrados.
                </p>
            </div>

            {/* Filtro */}
            <div className="flex justify-center mb-12">
                <div className="w-full max-w-xs">
                    <select
                        value={estadoActual || ''}
                        onChange={filtrarPorEstado}
                        className="w-full rounded-xl border-2 border-zinc-300 dark:border-zinc-700 bg-white/20 dark:bg-zinc-900/20 backdrop-blur-lg text-zinc-800 dark:text-white py-3 px-5 focus:ring-2 focus:ring-indigo-400 transition"
                    >
                        <option value="">Todos</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="en_proceso">En Proceso</option>
                        <option value="entregado">Entregado</option>
                    </select>
                </div>
            </div>

            {/* Lista de pedidos */}
            {pedidos.length === 0 ? (
                <p className="text-center text-zinc-500 dark:text-zinc-400 text-lg">
                    No hay pedidos registrados.
                </p>
            ) : (
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {pedidos.map((pedido) => (
                        <motion.div
                            key={pedido.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="p-6 bg-white/30 dark:bg-zinc-900/30 backdrop-blur-2xl rounded-3xl border border-white/20 dark:border-zinc-700 shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                        Pedido #{pedido.id}
                                    </h2>

                                    <span
                                        className={`
                                            ml-2 px-3 py-1 text-xs font-bold rounded-full
                                            ${pedido.estado === 'pendiente' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : ''}
                                            ${pedido.estado === 'en_proceso' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300' : ''}
                                            ${pedido.estado === 'entregado' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' : ''}
                                        `}
                                    >
                                        {pedido.estado.replace('_', ' ')}
                                    </span>
                                </div>

                                <p className="text-sm text-zinc-700 dark:text-zinc-300">Cliente: {pedido.cliente.name}</p>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300">Fecha Recojo: {pedido.fecha_recojo}</p>
                                <p className="text-sm text-zinc-700 dark:text-zinc-300">Total: <strong>Bs {pedido.total}</strong></p>

                                {/* Servicios */}
                                <div className="pt-2">
                                    <h3 className="text-sm font-bold text-zinc-700 dark:text-white">Servicios:</h3>
                                    <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400">
                                        {pedido.detalle_pedidos.map((detalle) => (
                                            <li key={detalle.id}>
                                                {detalle.servicio.nombre} - {detalle.cantidad} x Bs {detalle.servicio.precio}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Pago */}
                                {pedido.pago && (
                                    <div className="pt-2">
                                        <h3 className="text-sm font-bold text-zinc-700 dark:text-white">Pago:</h3>
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">Método: {pedido.pago.metodo}</p>
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">Monto: Bs {pedido.pago.monto}</p>
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                            Confirmado: {pedido.pago.confirmado ? 'Sí' : 'No'}
                                        </p>
                                    </div>
                                )}

                                {/* Botón Cambiar Estado */}
                                {pedido.estado !== 'entregado' && (
                                    <form
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                            cambiarEstado(pedido.id);
                                        }}
                                        className="pt-4"
                                    >
                                        <button
                                            type="submit"
                                            disabled={cambiandoPedidoId === pedido.id}
                                            className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
                                        >
                                            {cambiandoPedidoId === pedido.id ? (
                                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                            ) : (
                                                'Cambiar Estado'
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
