import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset, setError, clearErrors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const validateEmail = (value) => {
        if (!value.includes('@')) {
            setError('email', 'Ingresa un correo electrónico válido.');
        } else {
            clearErrors('email');
        }
        setData('email', value);
    };

    const validatePassword = (value) => {
        if (value.length < 6) {
            setError('password', 'La contraseña debe tener al menos 6 caracteres.');
        } else {
            clearErrors('password');
        }
        setData('password', value);
    };

    return (
        <GuestLayout>
            <Head title="Iniciar sesión - LavaFácil" />

            <div className="flex flex-col items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Bienvenido a LavaFácil</h1>
                <p className="text-gray-500 text-sm mt-1">Inicia sesión para continuar</p>
            </div>

            {/* Estado de sesión */}
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                {/* Email */}
                <div>
                    <InputLabel htmlFor="email" value="Correo electrónico" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className={`mt-1 block w-full ${errors.email ? 'border-red-500' : ''}`}
                        autoComplete="username"
                        isFocused
                        onChange={(e) => validateEmail(e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Password */}
                <div>
                    <InputLabel htmlFor="password" value="Contraseña" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className={`mt-1 block w-full ${errors.password ? 'border-red-500' : ''}`}
                        autoComplete="current-password"
                        onChange={(e) => validatePassword(e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Recordarme */}
                <div className="flex items-center">
                    <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                    />
                    <span className="ms-2 text-sm text-gray-600">
                        Recordarme
                    </span>
                </div>

                {/* Botones */}
                <div className="flex flex-col gap-4 mt-6">
                    <div className="flex items-center justify-between">
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>

                        )}
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Iniciar sesión
                        </PrimaryButton>
                    </div>

                    {/* Agregamos abajo el link de registro */}
                    <div className="text-center">
                        <Link
                            href={route('register')}
                            className="text-sm text-gray-600 underline hover:text-gray-900"
                        >
                            ¿No tienes una cuenta? Regístrate
                        </Link>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
