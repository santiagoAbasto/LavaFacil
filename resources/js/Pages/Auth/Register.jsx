import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), { onFinish: () => reset('password', 'password_confirmation') });
    };

    return (
        <GuestLayout>
            <Head title="Registrarse" />

            <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-[var(--color-ink)]">Crear cuenta</h1>
                <p className="text-sm text-[var(--color-muted)] mt-1">Regístrate para usar LavaFácil</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="name" value="Nombre" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1.5"
                        hasError={!!errors.name}
                        autoComplete="name"
                        isFocused
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-1.5" />
                </div>

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
                        onChange={(e) => setData('email', e.target.value)}
                        required
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
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-1.5" />
                </div>

                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirmar contraseña" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1.5"
                        hasError={!!errors.password_confirmation}
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-1.5" />
                </div>

                <div className="flex flex-col gap-4 pt-2">
                    <motion.button
                        type="submit"
                        className="btn-primary w-full"
                        disabled={processing}
                        whileTap={{ scale: 0.97 }}
                    >
                        {processing ? 'Registrando…' : 'Registrarse'}
                    </motion.button>

                    <p className="text-center text-sm text-[var(--color-muted)]">
                        ¿Ya tienes una cuenta?{' '}
                        <Link href={route('login')} className="text-[var(--color-primary)] hover:underline font-medium">
                            Inicia sesión
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
