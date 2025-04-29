import { Link, usePage } from '@inertiajs/react';
import ThemeToggle from '@/Components/ThemeToggle'; // ✅ import del botón

export default function DashboardLayout({ children }) {
    const { auth, csrf_token } = usePage().props;
    const { user } = auth;
    const rol = user.rol;

    const menuCliente = [
        { name: 'Servicios', href: route('cliente.servicios') },
        { name: 'Mis Pedidos', href: route('cliente.pedidos') },
        { name: 'Crear Pedido', href: route('cliente.pedido.create') },
    ];

    const menuAdmin = [
        { name: 'Gestionar Pedidos', href: route('admin.pedidos') },
    ];

    const menu = rol === 'admin' ? menuAdmin : menuCliente;

    return (
        <div className="min-h-screen flex bg-gray-100 dark:bg-zinc-900 relative">
            {/* ✅ Botón de cambio de tema arriba a la derecha */}
            <div className="absolute top-4 right-4 z-50">
                <ThemeToggle />
            </div>

            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-zinc-800 border-r p-6 space-y-6 flex flex-col justify-between">
                <div>
                    <div className="text-2xl font-bold text-center mb-6 text-zinc-800 dark:text-white">
                        LavaFácil
                    </div>

                    <div className="text-center mb-6">
                        <p className="text-sm text-zinc-600 dark:text-zinc-300">Bienvenido 👋</p>
                        <p className="font-semibold text-zinc-800 dark:text-white">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{rol}</p>
                    </div>

                    <nav className="space-y-2">
                        {menu.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.href}
                                className="block py-2 px-3 rounded hover:bg-gray-200 dark:hover:bg-zinc-700 font-medium text-zinc-800 dark:text-zinc-100"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <form method="POST" action={route('logout')} className="pt-6">
                    <input type="hidden" name="_token" value={csrf_token} />
                    <button
                        type="submit"
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                    >
                        Cerrar sesión
                    </button>
                </form>
            </aside>

            {/* Contenido principal */}
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
