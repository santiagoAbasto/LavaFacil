import { Head, router, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import DashboardLayout from '@/Layouts/DashboardLayout';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function SuperAdminUsuarios({ admins, clientes }) {
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        rol: 'admin',
    });

    const abrirCrear = () => {
        setEditing(null);
        reset();
        setShowForm(true);
    };

    const abrirEditar = (user) => {
        setEditing(user);
        setData({ name: user.name, email: user.email, password: '', rol: user.rol });
        setShowForm(true);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editing) {
            put(route('super-admin.usuarios.update', editing.id), {
                onSuccess: () => { setShowForm(false); setEditing(null); reset(); },
            });
        } else {
            post(route('super-admin.usuarios.store'), {
                onSuccess: () => { setShowForm(false); reset(); },
            });
        }
    };

    const eliminar = (id) => {
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            router.delete(route('super-admin.usuarios.destroy', id));
        }
    };

    return (
        <DashboardLayout title="Gestión de Usuarios">
            <Head title="Usuarios" />

            <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-[var(--color-muted)]">{admins.length} administradores, {clientes.length} clientes</p>
                <button onClick={abrirCrear} className="btn-primary btn-sm">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" />
                    </svg>
                    Nuevo Usuario
                </button>
            </div>

            {showForm && (
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card mb-8"
                >
                    <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-5">
                        {editing ? 'Editar Usuario' : 'Crear Usuario'}
                    </h3>
                    <form onSubmit={submit} className="space-y-5 max-w-lg">
                        <div>
                            <InputLabel htmlFor="name" value="Nombre" />
                            <input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="input-field mt-1.5" required />
                            <InputError message={errors.name} className="mt-1.5" />
                        </div>
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} className="input-field mt-1.5" required />
                            <InputError message={errors.email} className="mt-1.5" />
                        </div>
                        <div>
                            <InputLabel htmlFor="password" value={editing ? 'Contraseña (dejar vacío para no cambiar)' : 'Contraseña'} />
                            <input id="password" type="password" value={data.password} onChange={(e) => setData('password', e.target.value)} className="input-field mt-1.5" />
                            <InputError message={errors.password} className="mt-1.5" />
                        </div>
                        <div>
                            <InputLabel htmlFor="rol" value="Rol" />
                            <select id="rol" value={data.rol} onChange={(e) => setData('rol', e.target.value)} className="select-field mt-1.5" required>
                                <option value="admin">Administrador</option>
                                <option value="cliente">Cliente</option>
                            </select>
                            <InputError message={errors.rol} className="mt-1.5" />
                        </div>
                        <div className="flex gap-3">
                            <button type="submit" disabled={processing} className="btn-primary">
                                {processing ? 'Guardando…' : editing ? 'Actualizar' : 'Crear'}
                            </button>
                            <button type="button" onClick={() => { setShowForm(false); setEditing(null); reset(); }} className="btn-secondary">
                                Cancelar
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}

            <div className="card mb-8">
                <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-4">Administradores</h3>
                {admins.length === 0 ? (
                    <p className="text-sm text-[var(--color-muted)]">No hay administradores.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[var(--color-border)]">
                                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">Nombre</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">Email</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">Rol</th>
                                    <th className="text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--color-border)]">
                                {admins.map((u) => (
                                    <tr key={u.id} className="hover:bg-[var(--color-surface-hover)] transition-colors">
                                        <td className="px-4 py-3 text-sm font-medium text-[var(--color-ink)]">{u.name}</td>
                                        <td className="px-4 py-3 text-sm text-[var(--color-muted)]">{u.email}</td>
                                        <td className="px-4 py-3">
                                            <span className={`badge border text-xs ${
                                                u.rol === 'super_admin'
                                                    ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20'
                                                    : 'bg-[var(--color-muted)]/10 text-[var(--color-muted)] border-[var(--color-muted)]/20'
                                            }`}>
                                                {u.rol === 'super_admin' ? 'Super Admin' : 'Admin'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            {u.rol !== 'super_admin' && (
                                                <div className="flex gap-2 justify-end">
                                                    <button onClick={() => abrirEditar(u)} className="text-xs font-medium text-[var(--color-primary)] hover:underline">Editar</button>
                                                    <button onClick={() => eliminar(u.id)} className="text-xs font-medium text-[var(--color-danger)] hover:underline">Eliminar</button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="card">
                <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-4">Clientes</h3>
                {clientes.length === 0 ? (
                    <p className="text-sm text-[var(--color-muted)]">No hay clientes.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[var(--color-border)]">
                                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">Nombre</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">Email</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">Teléfono</th>
                                    <th className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]">Pedidos</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--color-border)]">
                                {clientes.map((c) => (
                                    <tr key={c.id} className="hover:bg-[var(--color-surface-hover)] transition-colors">
                                        <td className="px-4 py-3 text-sm font-medium text-[var(--color-ink)]">{c.name}</td>
                                        <td className="px-4 py-3 text-sm text-[var(--color-muted)]">{c.email}</td>
                                        <td className="px-4 py-3 text-sm text-[var(--color-muted)]">{c.telefono || '—'}</td>
                                        <td className="px-4 py-3 text-sm text-[var(--color-muted)]">{c.pedidos_count || 0}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
