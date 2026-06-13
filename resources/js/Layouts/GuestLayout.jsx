import { Link } from '@inertiajs/react';
import ThemeToggle from '@/Components/ThemeToggle';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[var(--color-surface)] relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[var(--color-primary)]/3 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[var(--color-accent)]/3 blur-3xl" />
            </div>

            <div className="absolute top-4 right-4 z-50">
                <ThemeToggle />
            </div>

            <div className="mb-8 relative">
                <Link href="/" className="block">
                    <img
                        src="/images/logo-lavafacil.png"
                        alt="LavaFácil"
                        className="h-28 w-auto mx-auto drop-shadow-sm"
                    />
                </Link>
            </div>

            <div className="w-full sm:max-w-md px-6 sm:px-8 py-8 mx-4 bg-white dark:bg-[var(--color-surface)] shadow-elevated rounded-lg border border-[var(--color-border)] relative animate-slide-up">
                {children}
            </div>
        </div>
    );
}
