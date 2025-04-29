import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset, setError, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    // Funciones para validaciones en tiempo real
    const validateName = (value) => {
        if (value.trim().length < 2) {
            setError('name', 'El nombre debe tener al menos 2 caracteres.');
        } else {
            clearErrors('name');
        }
        setData('name', value);
    };

    const validateEmail = (value) => {
        if (!value.includes('@') || !value.includes('.')) {
            setError('email', 'Ingresa un correo electrónico válido.');
        } else {
            clearErrors('email');
        }
        setData('email', value);
    };

    const validatePassword = (value) => {
        if (value.length < 8) {
            setError('password', 'La contraseña debe tener al menos 8 caracteres.');
        } else {
            clearErrors('password');
        }
        setData('password', value);
    };

    const validatePasswordConfirmation = (value) => {
        if (value !== data.password) {
            setError('password_confirmation', 'Las contraseñas no coinciden.');
        } else {
            clearErrors('password_confirmation');
        }
        setData('password_confirmation', value);
    };

    return (
        <GuestLayout>
            <Head title="Registrarse" />

            <form onSubmit={submit} className="space-y-6">
                {/* Nombre */}
                <div>
                    <InputLabel htmlFor="name" value="Nombre" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className={`mt-1 block w-full ${errors.name ? 'border-red-500' : ''}`}
                        autoComplete="name"
                        isFocused
                        onChange={(e) => validateName(e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                {/* Correo electrónico */}
                <div>
                    <InputLabel htmlFor="email" value="Correo electrónico" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className={`mt-1 block w-full ${errors.email ? 'border-red-500' : ''}`}
                        autoComplete="username"
                        onChange={(e) => validateEmail(e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Contraseña */}
                <div>
                    <InputLabel htmlFor="password" value="Contraseña" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className={`mt-1 block w-full ${errors.password ? 'border-red-500' : ''}`}
                        autoComplete="new-password"
                        onChange={(e) => validatePassword(e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirmar contraseña */}
                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirmar contraseña" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className={`mt-1 block w-full ${errors.password_confirmation ? 'border-red-500' : ''}`}
                        autoComplete="new-password"
                        onChange={(e) => validatePasswordConfirmation(e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                {/* Botones */}
                <div className="flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        ¿Ya tienes una cuenta?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Registrarse
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
