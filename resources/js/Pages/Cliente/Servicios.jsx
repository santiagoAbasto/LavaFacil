import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Servicios({ servicios }) {
    return (
        <>
            <Head title="Servicios disponibles" />

            <div className="p-8 max-w-6xl mx-auto">
                <div className="mb-10 text-center">
                    <h1 className="text-5xl font-extrabold text-zinc-800 dark:text-white mb-4">
                        Servicios Disponibles
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                        Elige el servicio que más se ajuste a tus necesidades.
                    </p>
                </div>

                {servicios.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-center text-zinc-500 dark:text-zinc-400 text-lg mt-10"
                    >
                        No hay servicios disponibles actualmente.
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {servicios.map((servicio) => (
                            <motion.div
                                key={servicio.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                whileHover={{ scale: 1.03 }}
                                className="p-6 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-lg border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-md hover:shadow-lg transition-all"
                            >
                                <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                                    {servicio.nombre}
                                </h2>

                                <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                                    <span className="font-semibold">Precio:</span> Bs {servicio.precio}
                                </p>

                                <p className="text-zinc-700 dark:text-zinc-300 text-sm mt-1">
                                    <span className="font-semibold">¿Requiere peso?</span> {servicio.requiere_peso ? 'Sí' : 'No'}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
