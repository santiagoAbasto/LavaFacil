import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function GestionarClientes({ clientes }) {
    return (
        <div className="p-8 max-w-7xl mx-auto">
            <Head title="Gestionar Clientes" />

            <div className="mb-10 text-center">
                <h1 className="text-5xl font-extrabold text-zinc-800 dark:text-white mb-4">
                    Clientes Registrados
                </h1>
                <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                    Gestiona los usuarios registrados en el sistema.
                </p>
            </div>

            {/* Lista de clientes */}
            {clientes.length === 0 ? (
                <p className="text-center text-zinc-500 dark:text-zinc-400 text-lg">
                    No hay clientes registrados aún.
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clientes.map((cliente) => (
                        <motion.div
                            key={cliente.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="p-6 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-md"
                        >
                            <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                                {cliente.name}
                            </h2>
                            <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                                Email: {cliente.email}
                            </p>
                            <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                                Registrado el: {new Date(cliente.created_at).toLocaleDateString()}
                            </p>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
