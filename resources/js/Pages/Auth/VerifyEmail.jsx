import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verificar correo" />

            <div className="text-center mb-8">
                <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                    <svg className="w-7 h-7 text-[var(--color-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-[var(--color-ink)]">Verifica tu correo</h1>
                <p className="text-sm text-[var(--color-muted)] mt-2">
                    Gracias por registrarte. Te hemos enviado un enlace de verificación a tu correo electrónico.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-6 px-4 py-3 rounded-lg bg-[var(--color-success)]/10 border border-[var(--color-success)]/20 text-sm text-[var(--color-success)] text-center">
                    Se ha enviado un nuevo enlace de verificación.
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <motion.button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={processing}
                    whileTap={{ scale: 0.97 }}
                >
                    {processing ? 'Enviando…' : 'Reenviar correo de verificación'}
                </motion.button>

                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="block w-full text-center text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
                >
                    Cerrar sesión
                </Link>
            </form>
        </GuestLayout>
    );
}
