import { useForm, Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion'; // 🎯 Importamos Framer Motion para animaciones

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
                Swal.fire({
                    title: '✅ Pedido registrado',
                    text: 'Tu pedido fue registrado exitosamente.',
                    icon: 'success',
                    confirmButtonColor: '#6366f1', // Indigo elegante
                    background: '#f9fafb',
                    color: '#374151',
                    timer: 2000,
                    showConfirmButton: false,
                });
                reset();
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
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="p-8 max-w-4xl mx-auto"
        >
            <Head title="Crear Pedido" />

            <div className="mb-8 text-center">
                <h1 className="text-4xl font-extrabold text-zinc-800 dark:text-white mb-2">Crear Pedido</h1>
                <p className="text-zinc-500 dark:text-zinc-400">
                    Completa el formulario para registrar tu pedido.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-zinc-200 dark:border-zinc-700 transition-all">
                
                {/* Fecha de recojo */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-300">Fecha de Recojo:</label>
                    <input
                        type="date"
                        className="w-full py-2 px-4 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                        value={data.fecha_recojo}
                        onChange={(e) => setData('fecha_recojo', e.target.value)}
                    />
                    {errors.fecha_recojo && (
                        <p className="text-red-500 text-sm">{errors.fecha_recojo}</p>
                    )}
                </div>

                {/* Servicios */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-zinc-700 dark:text-zinc-200">Selecciona los Servicios:</h2>
                    <div className="space-y-3">
                        {servicios.map(servicio => (
                            <div key={servicio.id} className="flex items-center gap-4">
                                <input
                                    type="checkbox"
                                    checked={data.servicios.some(s => s.id === servicio.id)}
                                    onChange={() => toggleServicio(servicio.id)}
                                    className="rounded text-indigo-600 focus:ring-indigo-400"
                                />
                                <span className="text-zinc-700 dark:text-zinc-300">{servicio.nombre} - Bs {servicio.precio}</span>

                                {data.servicios.some(s => s.id === servicio.id) && (
                                    <input
                                        type="number"
                                        min="1"
                                        className="w-20 py-1 px-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-center"
                                        value={data.servicios.find(s => s.id === servicio.id)?.cantidad || 1}
                                        onChange={(e) => actualizarCantidad(servicio.id, parseInt(e.target.value))}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    {errors.servicios && (
                        <p className="text-red-500 text-sm">{errors.servicios}</p>
                    )}
                </div>

                {/* Método de pago */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-300">Método de Pago:</label>
                    <select
                        value={data.metodo_pago}
                        onChange={(e) => setData('metodo_pago', e.target.value)}
                        className="w-full py-2 px-4 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition"
                    >
                        <option value="">-- Selecciona método --</option>
                        <option value="efectivo">Efectivo</option>
                        <option value="qr">QR</option>
                        <option value="transferencia">Transferencia</option>
                    </select>
                    {errors.metodo_pago && (
                        <p className="text-red-500 text-sm">{errors.metodo_pago}</p>
                    )}
                </div>

                {/* Monto a pagar */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-300">Monto a pagar:</label>
                    <input
                        type="number"
                        value={montoCalculado}
                        disabled
                        className="w-full py-2 px-4 rounded-lg bg-gray-100 dark:bg-zinc-700 text-zinc-700 dark:text-white border border-zinc-300 dark:border-zinc-700 text-center"
                    />
                </div>

                {/* Botón enviar */}
                <div className="flex justify-end">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={processing}
                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition disabled:opacity-50"
                    >
                        {processing ? 'Registrando...' : 'Confirmar Pedido'}
                    </motion.button>
                </div>

            </form>
        </motion.div>
    );
}
