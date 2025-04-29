import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors, setError, clearErrors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    // Función para validación en tiempo real del email
    const validateEmail = (value) => {
        if (!value.includes('@') || !value.includes('.')) {
            setError('email', 'Ingresa un correo electrónico válido.');
        } else {
            clearErrors('email');
        }
        setData('email', value);
    };

    return (
        <GuestLayout>
            <Head title="Recuperar contraseña" />

            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-800">¿Olvidaste tu contraseña?</h1>
                <p className="mt-2 text-gray-600 text-sm">
                    No te preocupes. Ingresa tu correo electrónico y te enviaremos un enlace para restablecerla.
                </p>
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 text-center">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                {/* Email */}
                <div>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className={`mt-1 block w-full ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="correo@ejemplo.com"
                        isFocused
                        onChange={(e) => validateEmail(e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Enviar enlace
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
