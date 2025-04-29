import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function ClienteDashboard() {
    return (
        <DashboardLayout>
            <Head title="Panel de Cliente" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="p-10 max-w-4xl mx-auto bg-white/70 dark:bg-zinc-900/70 backdrop-blur-lg rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-700"
            >
                <div className="space-y-6 text-center">
                    <h1 className="text-5xl font-extrabold text-zinc-800 dark:text-white tracking-tight">
                        ¡Bienvenido Cliente!
                    </h1>

                    <h2 className="text-2xl font-semibold text-indigo-500 dark:text-indigo-400">
                        Gestiona tus servicios de lavandería
                    </h2>

                    <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
                        Desde aquí puedes <strong>registrar pedidos</strong>, 
                        <strong>seguir el estado</strong> de tus servicios, y explorar nuevas opciones que tenemos para ti.
                    </p>

                    <p className="text-zinc-600 dark:text-zinc-400">
                        Usa el <span className="font-semibold text-indigo-500 dark:text-indigo-400">menú lateral</span> para navegar rápidamente.
                    </p>
                </div>
            </motion.div>
        </DashboardLayout>
    );
}
