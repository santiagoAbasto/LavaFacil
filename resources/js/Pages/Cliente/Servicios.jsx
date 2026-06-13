import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Servicios({ servicios }) {
    return (
        <DashboardLayout title="Servicios">
            <Head title="Servicios" />

            {!servicios || servicios.length === 0 ? (
                <div className="card text-center py-16">
                    <p className="text-[var(--color-muted)] text-lg">No hay servicios disponibles por el momento.</p>
                </div>
            ) : (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {servicios.map((servicio, i) => (
                        <motion.div
                            key={servicio.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="card card-interactive"
                        >
                            <h3 className="text-xl font-bold text-[var(--color-ink)] mb-2">{servicio.nombre}</h3>
                            <p className="text-2xl font-bold text-[var(--color-primary)] mt-4">Bs {servicio.precio}</p>
                        </motion.div>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}
