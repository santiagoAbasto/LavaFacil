import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/Layouts/DashboardLayout'; // ✅ Importaciones limpias

export default function ClienteDashboard() {
    return (
        <DashboardLayout>
            <Head title="Panel de Cliente" />

            {/* Animación de bienvenida */}
            <motion.div
                className="p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-extrabold text-zinc-800 dark:text-white mb-4">
                    👋 ¡Hola Cliente!
                </h1>
                <p className="text-zinc-600 dark:text-zinc-300 text-lg mb-2">
                    Bienvenido al <strong>sistema de lavandería</strong>. 
                    Aquí podrás gestionar tus pedidos, seguir tus servicios y explorar nuevas opciones disponibles.
                </p>
                <p className="text-gray-700 dark:text-gray-400 text-base">
                    Utiliza el menú lateral para explorar los servicios o ver el estado de tus pedidos.
                </p>
            </motion.div>
        </DashboardLayout>
    );
}
