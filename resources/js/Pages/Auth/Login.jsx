import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), { onFinish: () => reset('password') });
    };

    return (
        <GuestLayout>
            <Head title="Iniciar sesión" />

            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-[var(--color-ink)]">Bienvenido</h1>
                <p className="text-sm text-[var(--color-muted)] mt-1">Inicia sesión para continuar</p>
            </div>

            {status && (
                <div className="mb-6 px-4 py-3 rounded-lg bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 text-sm text-[var(--color-success)] text-center">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="email" value="Correo electrónico" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1.5"
                        hasError={!!errors.email}
                        autoComplete="username"
                        isFocused
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-1.5" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Contraseña" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1.5"
                        hasError={!!errors.password}
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                <div className="flex items-center">
                    <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                    />
                    <span className="ml-2 text-sm text-[var(--color-muted)]">Recordarme</span>
                </div>

                <div className="flex flex-col gap-4">
                    <motion.button
                        type="submit"
                        className="btn-primary w-full"
                        disabled={processing}
                        whileTap={{ scale: 0.97 }}
                    >
                        {processing ? 'Iniciando sesión…' : 'Iniciar sesión'}
                    </motion.button>

                    <div className="flex items-center justify-between text-sm">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-[var(--color-primary)] hover:underline font-medium"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        )}
                    </div>

                    <p className="text-center text-sm text-[var(--color-muted)]">
                        ¿No tienes una cuenta?{' '}
                        <Link href={route('register')} className="text-[var(--color-primary)] hover:underline font-medium">
                            Regístrate
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
