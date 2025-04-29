import { Head, router } from '@inertiajs/react'; // ✅ Import correcto


export default function Pedidos({ pedidos, estadoActual }) { // ✅ Recibe estadoActual correctamente
    const cambiarEstado = (pedidoId) => {
        router.put(route('admin.pedidos.actualizarEstado', pedidoId));
    };

    const filtrarPorEstado = (e) => {
        router.get(route('admin.pedidos'), { estado: e.target.value });
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <Head title="Gestionar Pedidos" />
            <h1 className="text-2xl font-bold mb-4">Pedidos Registrados</h1>

            {/* 🔵 Selector de filtro por estado */}
            <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Filtrar por estado:</label>
                <select
                    className="border rounded px-3 py-2 w-full max-w-xs"
                    value={estadoActual || ''}
                    onChange={filtrarPorEstado}
                >
                    <option value="">Todos</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="en_proceso">En Proceso</option>
                    <option value="entregado">Entregado</option>
                </select>
            </div>

            {/* 🔵 Lista de pedidos */}
            {pedidos.length === 0 ? (
                <p className="text-gray-600">No hay pedidos registrados.</p>
            ) : (
                pedidos.map((pedido) => (
                    <div key={pedido.id} className="mb-6 p-4 border rounded shadow">
                        <h2 className="text-lg font-semibold mb-2">
                            Pedido #{pedido.id} - Estado: {pedido.estado}
                        </h2>
                        <p className="text-sm">Cliente: {pedido.cliente.name}</p>
                        <p className="text-sm">Fecha de Recojo: {pedido.fecha_recojo}</p>
                        <p className="text-sm mb-2">Total: Bs {pedido.total}</p>

                        <h3 className="font-semibold mt-3">Servicios:</h3>
                        <ul className="list-disc list-inside">
                            {pedido.detalle_pedidos.map((detalle) => (
                                <li key={detalle.id}>
                                    {detalle.servicio.nombre} - {detalle.cantidad} x Bs {detalle.servicio.precio}
                                </li>
                            ))}
                        </ul>

                        {pedido.pago && (
                            <>
                                <h3 className="font-semibold mt-3">Pago:</h3>
                                <p className="text-sm">Método: {pedido.pago.metodo}</p>
                                <p className="text-sm">Monto: Bs {pedido.pago.monto}</p>
                                <p className="text-sm">
                                    Confirmado: {pedido.pago.confirmado ? 'Sí' : 'No'}
                                </p>
                            </>
                        )}

                        {/* Botón para cambiar estado, sólo si no está entregado */}
                        {pedido.estado !== 'entregado' && (
                            <div className="mt-4">
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        cambiarEstado(pedido.id);
                                    }}
                                >
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                    >
                                        Cambiar Estado
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
