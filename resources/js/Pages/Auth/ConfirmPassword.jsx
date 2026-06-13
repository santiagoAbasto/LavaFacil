import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors } = useForm({ password: '' });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'));
    };

    return (
        <GuestLayout>
            <Head title="Confirmar contraseña" />

            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-[var(--color-ink)]">Confirma tu contraseña</h1>
                <p className="text-sm text-[var(--color-muted)] mt-2">
                    Por seguridad, confirma tu contraseña antes de continuar.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="password" value="Contraseña" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1.5"
                        hasError={!!errors.password}
                        isFocused
                        onChange={(e) => setData('password', e.target.value)}
                        autoComplete="current-password"
                        required
                    />
                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                <motion.button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={processing}
                    whileTap={{ scale: 0.97 }}
                >
                    {processing ? 'Confirmando…' : 'Confirmar'}
                </motion.button>
            </form>
        </GuestLayout>
    );
}
