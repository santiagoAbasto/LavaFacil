import DangerButton from '@/Components/DangerButton';
import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function DeleteUserForm({ className = '' }) {
    const { data, setData, delete: destroy, processing, reset, errors } = useForm({
        password: '',
    });

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            onFinish: () => reset(),
        });
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`${className} p-6 rounded-lg border border-[var(--color-danger)]/20 bg-[var(--color-danger)]/5`}
        >
            <header className="mb-6">
                <h2 className="text-lg font-semibold text-[var(--color-danger)]">Eliminar cuenta</h2>
                <p className="mt-1 text-sm text-[var(--color-muted)]">
                    Una vez eliminada, toda la información se perderá permanentemente.
                </p>
            </header>

            <form onSubmit={deleteUser} className="space-y-5">
                <div>
                    <input
                        id="password"
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="input-field mt-1.5"
                        placeholder="Tu contraseña"
                        autoComplete="current-password"
                    />
                    {errors.password && (
                        <p className="mt-1.5 text-sm text-[var(--color-danger)]">{errors.password}</p>
                    )}
                </div>

                <DangerButton disabled={processing}>Eliminar cuenta</DangerButton>
            </form>
        </motion.section>
    );
}
