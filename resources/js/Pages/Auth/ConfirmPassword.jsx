import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset, setError, clearErrors } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    // Validación en tiempo real para contraseña
    const validatePassword = (value) => {
        if (value.length < 8) {
            setError('password', 'La contraseña debe tener al menos 8 caracteres.');
        } else {
            clearErrors('password');
        }
        setData('password', value);
    };

    return (
        <GuestLayout>
            <Head title="Confirmar contraseña" />

            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-800">Confirma tu contraseña</h1>
                <p className="mt-2 text-gray-600 text-sm">
                    Por seguridad, confirma tu contraseña antes de continuar.
                </p>
            </div>

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="password" value="Contraseña" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className={`mt-1 block w-full ${errors.password ? 'border-red-500' : ''}`}
                        isFocused
                        onChange={(e) => validatePassword(e.target.value)}
                        autoComplete="current-password"
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Confirmar
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}

