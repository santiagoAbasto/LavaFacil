import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function GestionarClientes({ clientes }) {
    return (
        <DashboardLayout title="Clientes">
            <Head title="Gestionar Clientes" />

            {!clientes || clientes.length === 0 ? (
                <div className="card text-center py-16">
                    <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-[var(--color-muted)]/10 flex items-center justify-center">
                        <svg className="w-7 h-7 text-[var(--color-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                        </svg>
                    </div>
                    <p className="text-[var(--color-muted)] text-lg">No hay clientes registrados.</p>
                </div>
            ) : (
                <div className="mb-4">
                    <p className="text-sm text-[var(--color-muted)]">{clientes.length} clientes registrados</p>
                </div>
            )}

            {clientes?.length > 0 && (
                <div className="card overflow-hidden p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[var(--color-border)]">
                                    <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">Nombre</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">Email</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">Teléfono</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">Dirección</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">Registro</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--color-border)]">
                                {clientes.map((cliente, i) => (
                                    <motion.tr
                                        key={cliente.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.02 }}
                                        className="hover:bg-[var(--color-surface-hover)] transition-colors"
                                    >
                                        <td className="px-6 py-4 text-sm font-medium text-[var(--color-ink)]">{cliente.name}</td>
                                        <td className="px-6 py-4 text-sm text-[var(--color-muted)]">{cliente.email}</td>
                                        <td className="px-6 py-4 text-sm text-[var(--color-muted)]">{cliente.telefono || '—'}</td>
                                        <td className="px-6 py-4 text-sm text-[var(--color-muted)]">{cliente.direccion || '—'}</td>
                                        <td className="px-6 py-4 text-sm text-[var(--color-muted)]">{new Date(cliente.created_at).toLocaleDateString()}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
