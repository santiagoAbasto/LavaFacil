import { Link } from '@inertiajs/react';
import ThemeToggle from '@/Components/ThemeToggle'; // ✅ Importamos el botón

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
            
            {/* ✅ Botón para cambiar tema */}
            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>

            {/* Logo */}
            <div className="mb-8">
                <Link href="/">
                    <img
                        src="/images/logo-lavafacil.png"
                        alt="LavaFácil"
                        className="h-24 w-auto mx-auto"
                    />
                </Link>
            </div>

            {/* Formulario u otro contenido */}
            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
