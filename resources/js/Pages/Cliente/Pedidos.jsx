import { Head } from '@inertiajs/react';

export default function Pedidos({ pedidos }) {
    return (
        <div className="p-6 max-w-5xl mx-auto">
            <Head title="Mis Pedidos" />
            <h1 className="text-2xl font-bold mb-4">Historial de Pedidos</h1>

            {pedidos.length === 0 ? (
                <p className="text-gray-600">No tienes pedidos registrados.</p>
            ) : (
                pedidos.map((pedido) => (
                    <div key={pedido.id} className="mb-6 p-4 border rounded shadow">
                        <h2 className="text-lg font-semibold mb-2">
                            Pedido #{pedido.id} - Estado: {pedido.estado}
                        </h2>
                        <p className="text-sm mb-2">Fecha de Recojo: {pedido.fecha_recojo}</p>
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
                                <p className="text-sm">Monto pagado: Bs {pedido.pago.monto}</p>
                                <p className="text-sm">
                                    Confirmado: {pedido.pago.confirmado ? 'Sí' : 'No'}
                                </p>
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}
