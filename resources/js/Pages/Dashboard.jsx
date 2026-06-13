import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-[var(--color-ink)]">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="card">
                        <p className="text-[var(--color-ink)]">¡Has iniciado sesión!</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
