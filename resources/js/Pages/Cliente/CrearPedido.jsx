import { useForm, Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'; // 👈 Importamos SweetAlert2

export default function CrearPedido({ servicios }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        fecha_recojo: '',
        servicios: [],
        metodo_pago: '',
        monto: '',
    });

    const [montoCalculado, setMontoCalculado] = useState(0);

    const toggleServicio = (id, cantidad = 1) => {
        const existe = data.servicios.find(s => s.id === id);
        if (existe) {
            setData('servicios', data.servicios.filter(s => s.id !== id));
        } else {
            setData('servicios', [...data.servicios, { id, cantidad }]);
        }
    };

    const actualizarCantidad = (id, nuevaCantidad) => {
        setData('servicios', data.servicios.map(s => 
            s.id === id ? { ...s, cantidad: nuevaCantidad } : s
        ));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('cliente.pedido.store'), {
            onSuccess: () => {
                // 🎉 Alerta SweetAlert2 al éxito
                Swal.fire({
                    title: '¡Pedido registrado!',
                    text: 'Tu pedido fue registrado exitosamente.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#3085d6',
                });

                reset(); // 🔵 Limpia el formulario después de registrar
            },
            onError: () => {
                // (Opcional) Podrías mostrar error en SweetAlert si quieres
            }
        });
    };

    useEffect(() => {
        let total = 0;
        for (const servicioSeleccionado of data.servicios) {
            const servicioInfo = servicios.find(s => s.id === servicioSeleccionado.id);
            if (servicioInfo) {
                total += servicioInfo.precio * servicioSeleccionado.cantidad;
            }
        }
        setMontoCalculado(total);
        setData('monto', total);
    }, [data.servicios, servicios]);

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <Head title="Crear Pedido" />
            <h1 className="text-2xl font-bold mb-6">Registrar nuevo pedido</h1>

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Fecha de recojo */}
                <div>
                    <label className="block text-sm font-medium mb-1">Fecha de recojo:</label>
                    <input 
                        type="date" 
                        className="border rounded px-3 py-2 w-full"
                        value={data.fecha_recojo}
                        onChange={(e) => setData('fecha_recojo', e.target.value)}
                    />
                    {errors.fecha_recojo && (
                        <div className="text-red-500 text-sm mt-1">{errors.fecha_recojo}</div>
                    )}
                </div>

                {/* Servicios */}
                <div>
                    <h2 className="text-lg font-semibold mb-2">Selecciona los servicios:</h2>
                    {servicios.map(servicio => (
                        <div key={servicio.id} className="flex items-center mb-2 gap-4">
                            <input
                                type="checkbox"
                                checked={data.servicios.some(s => s.id === servicio.id)}
                                onChange={() => toggleServicio(servicio.id)}
                            />
                            <span>{servicio.nombre} - Bs {servicio.precio}</span>
                            {data.servicios.some(s => s.id === servicio.id) && (
                                <input
                                    type="number"
                                    min="1"
                                    className="w-20 border rounded px-2 py-1"
                                    value={data.servicios.find(s => s.id === servicio.id)?.cantidad || 1}
                                    onChange={(e) => actualizarCantidad(servicio.id, parseInt(e.target.value))}
                                />
                            )}
                        </div>
                    ))}
                    {errors.servicios && (
                        <div className="text-red-500 text-sm mt-1">{errors.servicios}</div>
                    )}
                </div>

                {/* Método de pago */}
                <div>
                    <label className="block text-sm font-medium mb-1">Método de pago:</label>
                    <select
                        className="border rounded px-3 py-2 w-full"
                        value={data.metodo_pago}
                        onChange={(e) => setData('metodo_pago', e.target.value)}
                    >
                        <option value="">-- Selecciona método --</option>
                        <option value="efectivo">Efectivo</option>
                        <option value="qr">QR</option>
                        <option value="transferencia">Transferencia</option>
                    </select>
                    {errors.metodo_pago && (
                        <div className="text-red-500 text-sm mt-1">{errors.metodo_pago}</div>
                    )}
                </div>

                {/* Monto Calculado */}
                <div>
                    <label className="block text-sm font-medium mb-1">Monto a pagar:</label>
                    <input
                        type="number"
                        className="border rounded px-3 py-2 w-full bg-gray-100"
                        value={montoCalculado}
                        disabled
                    />
                </div>

                {/* Botón de enviar */}
                <div className="flex justify-end">
                    <button 
                        type="submit" 
                        disabled={processing} 
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
                    >
                        Confirmar pedido
                    </button>
                </div>

            </form>
        </div>
    );
}
