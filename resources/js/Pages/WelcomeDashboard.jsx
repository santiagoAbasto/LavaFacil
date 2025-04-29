import { Head, Link } from '@inertiajs/react';

export default function WelcomeDashboard() {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white px-6">
            <Head title="Bienvenido a LavaFácil" />

            {/* Logo */}
            <div className="mb-8 animate-fadeIn">
                <img
                    src="/images/logo-lavafacil.png"
                    alt="LavaFácil Logo"
                    className="h-36 w-auto mx-auto drop-shadow-2xl"
                />
            </div>

            {/* Título principal */}
            <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-center">
                Bienvenido a <span className="text-blue-300">LavaFácil</span>
            </h1>

            {/* Subtítulo */}
            <p className="text-xl text-gray-200 mb-8 text-center max-w-md">
                Servicio de lavado de ropa con recojo y entrega a domicilio, rápido y confiable.
            </p>

            {/* Botón de acceso */}
            <Link
                href={route('login')}
                className="px-8 py-4 bg-white text-blue-700 font-bold rounded-full shadow-lg hover:bg-blue-100 transition duration-300 ease-in-out"
            >
                Iniciar sesión
            </Link>
        </div>
    );
}

