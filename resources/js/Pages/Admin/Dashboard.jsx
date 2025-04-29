import { Head } from '@inertiajs/react';
import { motion } from "framer-motion";
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function AdminDashboard() {
    return (
        <DashboardLayout>
            <Head title="Panel de Administrador" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="p-10 max-w-3xl mx-auto mt-16 bg-white/30 dark:bg-zinc-900/30 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-zinc-700 transition-all hover:scale-105 hover:shadow-3xl"
            >
                <div className="space-y-8">
                    <h1 className="text-5xl font-extrabold text-zinc-800 dark:text-white text-center">
                        Panel de Administrador
                    </h1>
                    <h2 className="text-2xl text-center text-indigo-500 dark:text-indigo-400 font-semibold">
                        Bienvenido a tu centro de control
                    </h2>
                    <p className="text-center text-zinc-600 dark:text-zinc-400 text-lg">
                        Desde aquí puedes gestionar todos los <span className="font-semibold">pedidos, usuarios y servicios</span> del sistema <span className="text-indigo-500">LavaFácil</span>.
                    </p>
                    <p className="text-center text-zinc-600 dark:text-zinc-400">
                        Usa el menú lateral para moverte entre las secciones.
                    </p>
                </div>
            </motion.div>
        </DashboardLayout>
    );
}
