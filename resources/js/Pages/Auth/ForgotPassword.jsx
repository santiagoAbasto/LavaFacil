import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({ email: '' });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Recuperar contraseña" />

            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-[var(--color-ink)]">¿Olvidaste tu contraseña?</h1>
                <p className="text-sm text-[var(--color-muted)] mt-2">
                    Ingresa tu correo y te enviaremos un enlace para restablecerla.
                </p>
            </div>

            {status && (
                <div className="mb-6 px-4 py-3 rounded-lg bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 text-sm text-[var(--color-success)] text-center">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1.5"
                        hasError={!!errors.email}
                        placeholder="correo@ejemplo.com"
                        isFocused
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                <motion.button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={processing}
                    whileTap={{ scale: 0.97 }}
                >
                    {processing ? 'Enviando…' : 'Enviar enlace'}
                </motion.button>
            </form>
        </GuestLayout>
    );
}
