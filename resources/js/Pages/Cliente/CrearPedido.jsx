import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/Layouts/DashboardLayout';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function CrearPedido({ servicios }) {
    const { data, setData, post, processing, errors } = useForm({
        servicio_id: '',
        cantidad: 1,
        fecha_recojo: '',
        hora_recojo: '',
        direccion_recojo: '',
        notas: '',
    });

    const servicioSeleccionado = servicios?.find(s => s.id == data.servicio_id);
    const precioTotal = servicioSeleccionado ? servicioSeleccionado.precio * data.cantidad : 0;

    const submit = (e) => {
        e.preventDefault();
        post(route('cliente.pedido.store'));
    };

    return (
        <DashboardLayout title="Crear Pedido">
            <Head title="Crear Pedido" />

            <div className="max-w-2xl mx-auto">
                <form onSubmit={submit} className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="card"
                    >
                        <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-5">Servicio</h3>

                        <div className="space-y-5">
                            <div>
                                <InputLabel htmlFor="servicio_id" value="Tipo de servicio" />
                                <select
                                    id="servicio_id"
                                    value={data.servicio_id}
                                    onChange={(e) => setData('servicio_id', e.target.value)}
                                    className="select-field mt-1.5"
                                    required
                                >
                                    <option value="">Selecciona un servicio</option>
                                    {servicios?.map(s => (
                                        <option key={s.id} value={s.id}>
                                            {s.nombre} — Bs {s.precio}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.servicio_id} className="mt-1.5" />
                            </div>

                            <div>
                                <InputLabel htmlFor="cantidad" value="Cantidad (kg)" />
                                <input
                                    id="cantidad"
                                    type="number"
                                    min="1"
                                    value={data.cantidad}
                                    onChange={(e) => setData('cantidad', e.target.value)}
                                    className="input-field mt-1.5"
                                    required
                                />
                                <InputError message={errors.cantidad} className="mt-1.5" />
                            </div>

                            {precioTotal > 0 && (
                                <div className="px-4 py-3 rounded-lg bg-[var(--color-primary)]/5 border border-[var(--color-primary)]/10 flex items-center justify-between">
                                    <span className="text-sm font-medium text-[var(--color-ink)]">Precio estimado</span>
                                    <span className="text-xl font-bold text-[var(--color-primary)]">Bs {precioTotal}</span>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="card"
                    >
                        <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-5">Recojo</h3>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <InputLabel htmlFor="fecha_recojo" value="Fecha" />
                                <input
                                    id="fecha_recojo"
                                    type="date"
                                    value={data.fecha_recojo}
                                    onChange={(e) => setData('fecha_recojo', e.target.value)}
                                    className="input-field mt-1.5"
                                    required
                                />
                                <InputError message={errors.fecha_recojo} className="mt-1.5" />
                            </div>

                            <div>
                                <InputLabel htmlFor="hora_recojo" value="Hora" />
                                <input
                                    id="hora_recojo"
                                    type="time"
                                    value={data.hora_recojo}
                                    onChange={(e) => setData('hora_recojo', e.target.value)}
                                    className="input-field mt-1.5"
                                />
                                <InputError message={errors.hora_recojo} className="mt-1.5" />
                            </div>
                        </div>

                        <div className="mt-5">
                            <InputLabel htmlFor="direccion_recojo" value="Dirección de recojo" />
                            <input
                                id="direccion_recojo"
                                type="text"
                                value={data.direccion_recojo}
                                onChange={(e) => setData('direccion_recojo', e.target.value)}
                                className="input-field mt-1.5"
                                placeholder="Calle, número, referencia"
                                required
                            />
                            <InputError message={errors.direccion_recojo} className="mt-1.5" />
                        </div>

                        <div className="mt-5">
                            <InputLabel htmlFor="notas" value="Notas (opcional)" />
                            <textarea
                                id="notas"
                                value={data.notas}
                                onChange={(e) => setData('notas', e.target.value)}
                                className="input-field mt-1.5 min-h-[80px] resize-y"
                                placeholder="Instrucciones especiales, tipo de tela, etc."
                            />
                            <InputError message={errors.notas} className="mt-1.5" />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="flex justify-end gap-3"
                    >
                        <a href={route('cliente.pedidos')} className="btn-secondary">
                            Cancelar
                        </a>
                        <button type="submit" disabled={processing} className="btn-primary">
                            {processing ? 'Creando…' : 'Crear Pedido'}
                        </button>
                    </motion.div>
                </form>
            </div>
        </DashboardLayout>
    );
}
