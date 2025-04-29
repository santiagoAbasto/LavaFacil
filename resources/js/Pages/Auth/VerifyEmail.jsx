import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verificar correo electrónico" />

            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-gray-800">Verifica tu correo electrónico</h1>
                <p className="mt-2 text-gray-600 text-sm">
                    Gracias por registrarte. Antes de comenzar, por favor verifica tu dirección de correo haciendo clic en el enlace que te enviamos.
                    <br />
                    Si no recibiste el correo, te podemos enviar otro.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600 text-center">
                    Se ha enviado un nuevo enlace de verificación a tu dirección de correo electrónico.
                </div>
            )}

            <form onSubmit={submit} className="flex items-center justify-between">
                <PrimaryButton disabled={processing}>
                    Reenviar correo de verificación
                </PrimaryButton>

                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Cerrar sesión
                </Link>
            </form>
        </GuestLayout>
    );
}
