import { Link, usePage } from '@inertiajs/react';
import ThemeToggle from '@/Components/ThemeToggle';

function SidebarIcon({ icon }) {
    return (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {icon === 'servicios' && <><path d="M4 6h16M4 12h16M4 18h16" /></>}
            {icon === 'pedidos' && <><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /><path d="M9 14l2 2 4-4" /></>}
            {icon === 'clientes' && <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>}
            {icon === 'reportes' && <><path d="M3 3v18h18" /><path d="M7 16l4-8 4 4 4-6" /></>}
            {icon === 'crear' && <><circle cx="12" cy="12" r="10" /><path d="M12 8v8M8 12h8" /></>}
            {icon === 'dashboard' && <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="4" rx="1" /><rect x="14" y="10" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="4" rx="1" /></>}
        </svg>
    );
}

export default function DashboardLayout({ children, title }) {
    const { auth } = usePage().props;
    const { user } = auth;
    const rol = user.rol;

    const menuCliente = [
        { name: 'Dashboard', href: route('cliente.dashboard'), icon: 'dashboard' },
        { name: 'Servicios', href: route('cliente.servicios'), icon: 'servicios' },
        { name: 'Mis Pedidos', href: route('cliente.pedidos'), icon: 'pedidos' },
        { name: 'Crear Pedido', href: route('cliente.pedido.create'), icon: 'crear' },
    ];

    const menuAdmin = [
        { name: 'Dashboard', href: route('admin.dashboard'), icon: 'dashboard' },
        { name: 'Pedidos', href: route('admin.pedidos'), icon: 'pedidos' },
        { name: 'Clientes', href: route('admin.clientes'), icon: 'clientes' },
        { name: 'Reportes', href: route('admin.reportes'), icon: 'reportes' },
    ];

    const menuSuperAdmin = [
        { name: 'Dashboard', href: route('super-admin.dashboard'), icon: 'dashboard' },
        { name: 'Usuarios', href: route('super-admin.usuarios'), icon: 'clientes' },
        { name: 'Pedidos', href: route('admin.pedidos'), icon: 'pedidos' },
        { name: 'Reportes', href: route('admin.reportes'), icon: 'reportes' },
    ];

    const menu = rol === 'super_admin' ? menuSuperAdmin : (rol === 'admin' ? menuAdmin : menuCliente);

    return (
        <div className="min-h-screen flex bg-[var(--color-surface)] dark:bg-[var(--color-bg)]">
            <aside className="hidden lg:flex lg:flex-col w-64 bg-white dark:bg-[var(--color-surface)] border-r border-[var(--color-border)]">
                <div className="p-6 border-b border-[var(--color-border)]">
                    <div className="flex items-center gap-3">
                        <img src="/images/logo-lavafacil.png" alt="LavaFácil" className="h-9 w-auto" />
                        <span className="text-lg font-bold text-[var(--color-primary)]">LavaFácil</span>
                    </div>
                </div>

                <div className="px-4 py-4 border-b border-[var(--color-border)]">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-9 h-9 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-semibold">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-medium text-[var(--color-ink)] truncate">{user.name}</p>
                            <p className="text-xs text-[var(--color-muted)] capitalize">{rol === 'super_admin' ? 'Super Admin' : rol}</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {menu.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                route().current(undefined, item.href)
                                    ? 'bg-[var(--color-primary)] text-white shadow-sm'
                                    : 'text-[var(--color-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-ink)]'
                            }`}
                        >
                            <SidebarIcon icon={item.icon} />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-[var(--color-border)]">
                    <form method="POST" action={route('logout')}>
                        <input type="hidden" name="_token" value={usePage().props.csrf_token} />
                        <button
                            type="submit"
                            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-[var(--color-muted)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-danger)] transition-all duration-200"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Cerrar sesión
                        </button>
                    </form>
                </div>
            </aside>

            <div className="flex-1 flex flex-col min-w-0">
                <header className="lg:hidden sticky top-0 z-40 bg-white/80 dark:bg-[var(--color-surface)]/80 backdrop-blur-lg border-b border-[var(--color-border)]">
                    <div className="flex items-center justify-between px-4 h-14">
                        <div className="flex items-center gap-2">
                            <img src="/images/logo-lavafacil.png" alt="LavaFácil" className="h-7 w-auto" />
                            <span className="text-base font-bold text-[var(--color-primary)]">LavaFácil</span>
                        </div>
                        <ThemeToggle />
                    </div>
                </header>

                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    {title && (
                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-[var(--color-ink)]">{title}</h1>
                        </div>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
