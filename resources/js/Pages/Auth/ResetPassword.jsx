import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset, setError, clearErrors } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    // Funciones para validaciones en tiempo real
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
            <Head title="Restablecer contraseña" />

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
                        onChange={(e) => validateEmail(e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Nueva contraseña */}
                <div>
                    <InputLabel htmlFor="password" value="Nueva contraseña" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className={`mt-1 block w-full ${errors.password ? 'border-red-500' : ''}`}
                        autoComplete="new-password"
                        isFocused
                        onChange={(e) => validatePassword(e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirmar nueva contraseña */}
                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirmar nueva contraseña" />
                    <TextInput
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className={`mt-1 block w-full ${errors.password_confirmation ? 'border-red-500' : ''}`}
                        autoComplete="new-password"
                        onChange={(e) => validatePasswordConfirmation(e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                {/* Botón */}
                <div className="flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Restablecer contraseña
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
