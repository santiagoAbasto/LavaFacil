import { Head } from '@inertiajs/react';
import { motion } from "framer-motion";
import DashboardLayout from '@/Layouts/DashboardLayout'; // ✅ Import limpio y ordenado

export default function AdminDashboard() {
    return (
        <DashboardLayout>
            <Head title="Panel de Administrador" />

            {/* Animación al cargar el panel */}
            <motion.div
                className="p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-extrabold text-zinc-800 dark:text-white mb-4">
                    🛠️ Panel del Administrador
                </h1>
                <p className="text-zinc-600 dark:text-zinc-300 text-lg mb-2">
                    Accede a la <strong>gestión de pedidos, usuarios y servicios</strong>. Supervisá y controlá todo desde aquí.
                </p>
                <p className="text-zinc-600 dark:text-zinc-300 text-base">
                    Utiliza el menú lateral para navegar entre las diferentes secciones del sistema.
                </p>
            </motion.div>
        </DashboardLayout>
    );
}

