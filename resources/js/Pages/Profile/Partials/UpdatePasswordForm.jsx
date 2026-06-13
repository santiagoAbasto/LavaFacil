import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function UpdatePasswordForm({ className = '' }) {
    const { data, setData, put, errors, processing, reset, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            onFinish: () => reset('current_password', 'password', 'password_confirmation'),
        });
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            <header className="mb-6">
                <h2 className="text-lg font-semibold text-[var(--color-ink)]">Actualizar contraseña</h2>
                <p className="mt-1 text-sm text-[var(--color-muted)]">Usa una contraseña larga y segura.</p>
            </header>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="current_password" value="Contraseña actual" />
                    <TextInput
                        id="current_password"
                        type="password"
                        value={data.current_password}
                        className="mt-1.5"
                        hasError={!!errors.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        autoComplete="current-password"
                    />
                    <InputError message={errors.current_password} className="mt-1.5" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Nueva contraseña" />
                    <TextInput
                        id="password"
                        type="password"
                        value={data.password}
                        className="mt-1.5"
                        hasError={!!errors.password}
                        onChange={(e) => setData('password', e.target.value)}
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirmar contraseña" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        className="mt-1.5"
                        hasError={!!errors.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password_confirmation} className="mt-1.5" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Guardar</PrimaryButton>
                    {recentlySuccessful && (
                        <p className="text-sm text-[var(--color-success)]">Guardado.</p>
                    )}
                </div>
            </form>
        </motion.section>
    );
}
