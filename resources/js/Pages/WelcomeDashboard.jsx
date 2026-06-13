import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
});

const servicios = [
    { nombre: 'Lavado común', precio: 'Bs 10/kg', desc: 'Lavado estándar para ropa de uso diario. Detergente neutro, secado y doblado.' },
    { nombre: 'Lavado delicado', precio: 'Bs 15/kg', desc: 'Para prendas finas que requieren cuidado especial. Agua fría y ciclo suave.' },
    { nombre: 'Edredones', precio: 'Bs 25/unidad', desc: 'Lavado de edredones, acolchados y cobertores grandes con espacio extra.' },
    { nombre: 'Planchado', precio: 'Bs 5/kg', desc: 'Planchado profesional con vapor. Camisas, pantalones y ropa formal impecable.' },
];

const pasos = [
    { icon: 'phone', titulo: 'Solicita', desc: 'Pides desde tu celular. Elegís servicio, día y hora de recojo.' },
    { icon: 'truck', titulo: 'Recogemos', desc: 'Pasamos por tu domicilio en la hora acordada. Sin filas, sin esperas.' },
    { icon: 'check', titulo: 'Disfruta', desc: 'Te devolvemos tu ropa limpia, planchada y lista para usar.' },
];

export default function WelcomeDashboard() {
    return (
        <>
            <Head title="LavaFácil — Lavandería a domicilio" />

            {/* Nav */}
            <nav className="fixed top-0 inset-x-0 z-50 h-16 bg-white/80 dark:bg-[var(--color-bg)]/80 backdrop-blur-lg border-b border-[var(--color-border)]">
                <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img src="/images/logo-lavafacil.png" alt="" className="h-8 w-auto" />
                        <span className="text-lg font-bold text-[var(--color-primary)]">LavaFácil</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href={route('login')} className="btn-secondary btn-sm">Ingresar</Link>
                        <Link href={route('register')} className="btn-primary btn-sm">Registrarse</Link>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section className="min-h-[100dvh] flex items-center bg-[var(--color-bg)] pt-16">
                <div className="max-w-6xl mx-auto px-6 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div {...fadeUp(0)}>
                            <span className="text-xs uppercase tracking-[0.15em] text-[var(--color-primary)] font-semibold">Lavandería a domicilio</span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--color-ink)] mt-3 mb-5 leading-[1.1] tracking-tight">
                                Tu lavandería,{' '}
                                <span className="text-[var(--color-primary)]">sin moverte de casa</span>
                            </h1>
                            <p className="text-lg text-[var(--color-muted)] max-w-lg leading-relaxed mb-8">
                                Recogemos tu ropa, la lavamos y te la devolvemos limpia y planchada. Rápido, confiable y sin complicaciones.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <Link href={route('register')} className="btn-primary btn-lg">
                                    Comenzar ahora
                                </Link>
                                <Link href={route('login')} className="btn-secondary btn-lg">
                                    Ya tengo cuenta
                                </Link>
                            </div>
                        </motion.div>
                        <motion.div
                            {...fadeUp(0.1)}
                            className="relative hidden lg:block"
                        >
                            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/5 border border-[var(--color-border)] flex items-center justify-center overflow-hidden">
                                <img
                                    src="/images/logo-lavafacil.png"
                                    alt=""
                                    className="h-48 w-auto opacity-40"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Servicios */}
            <section className="py-24 bg-white dark:bg-[var(--color-surface)]">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div {...fadeUp(0)} className="text-center mb-16">
                        <span className="text-xs uppercase tracking-[0.15em] text-[var(--color-primary)] font-semibold">Servicios</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-ink)] mt-3">Lo que lavamos por vos</h2>
                        <p className="text-[var(--color-muted)] mt-3 max-w-lg mx-auto">Precios fijos y transparentes. Sin sorpresas.</p>
                    </motion.div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {servicios.map((s, i) => (
                            <motion.div
                                key={s.nombre}
                                {...fadeUp(i * 0.08)}
                                className="card card-interactive"
                            >
                                <h3 className="text-lg font-bold text-[var(--color-ink)] mb-1">{s.nombre}</h3>
                                <p className="text-sm text-[var(--color-muted)] mb-4">{s.desc}</p>
                                <p className="text-2xl font-bold text-[var(--color-primary)]">{s.precio}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cómo funciona */}
            <section className="py-24 bg-[var(--color-bg)]">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div {...fadeUp(0)} className="text-center mb-16">
                        <span className="text-xs uppercase tracking-[0.15em] text-[var(--color-primary)] font-semibold">Proceso</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-ink)] mt-3">Tres pasos simples</h2>
                        <p className="text-[var(--color-muted)] mt-3 max-w-lg mx-auto">Usar LavaFácil es más fácil que llevar la ropa a la lavandería.</p>
                    </motion.div>
                    <div className="grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {pasos.map((p, i) => (
                            <motion.div
                                key={p.titulo}
                                {...fadeUp(i * 0.1)}
                                className="text-center"
                            >
                                <div className="w-14 h-14 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mx-auto mb-5">
                                    <svg className="w-6 h-6 text-[var(--color-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        {p.icon === 'phone' && <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></>}
                                        {p.icon === 'truck' && <><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></>}
                                        {p.icon === 'check' && <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>}
                                    </svg>
                                </div>
                                <span className="text-sm font-semibold text-[var(--color-primary)]">Paso {i + 1}</span>
                                <h3 className="text-xl font-bold text-[var(--color-ink)] mt-1 mb-2">{p.titulo}</h3>
                                <p className="text-sm text-[var(--color-muted)]">{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Por qué */}
            <section className="py-24 bg-white dark:bg-[var(--color-surface)]">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div {...fadeUp(0)} className="text-center mb-16">
                        <span className="text-xs uppercase tracking-[0.15em] text-[var(--color-primary)] font-semibold">Por qué LavaFácil</span>
                        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-ink)] mt-3">Más tiempo para vos</h2>
                    </motion.div>
                    <div className="grid sm:grid-cols-3 gap-5">
                        {[
                            { label: 'Recojo y entrega', desc: 'Sin moverte de tu casa u oficina. Elegís el horario que te queda cómodo.', icon: 'clock' },
                            { label: 'Precio fijo', desc: 'Sabés cuánto pagás antes de pedir. Sin cargos ocultos ni sorpresas.', icon: 'dollar' },
                            { label: 'Cuidado profesional', desc: 'Separamos por color y tejido. Productos de calidad para cada tipo de prenda.', icon: 'heart' },
                        ].map((item, i) => (
                            <motion.div key={item.label} {...fadeUp(i * 0.08)} className="card">
                                <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
                                    <svg className="w-5 h-5 text-[var(--color-primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        {item.icon === 'clock' && <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>}
                                        {item.icon === 'dollar' && <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>}
                                        {item.icon === 'heart' && <><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></>}
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-[var(--color-ink)] mb-1">{item.label}</h3>
                                <p className="text-sm text-[var(--color-muted)]">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-24 bg-[var(--color-bg)]">
                <motion.div {...fadeUp(0)} className="max-w-2xl mx-auto px-6 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-ink)] mb-4">
                        ¿Listo para dejar la ropa en{' '}
                        <span className="text-[var(--color-primary)]">nuestras manos</span>?
                    </h2>
                    <p className="text-lg text-[var(--color-muted)] mb-8 max-w-md mx-auto">
                        Registrate gratis y empezá a disfrutar de más tiempo libre.
                    </p>
                    <Link href={route('register')} className="btn-primary btn-lg">
                        Crear cuenta gratis
                    </Link>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-[var(--color-border)] bg-white dark:bg-[var(--color-surface)]">
                <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <img src="/images/logo-lavafacil.png" alt="" className="h-7 w-auto" />
                        <span className="text-sm font-bold text-[var(--color-primary)]">LavaFácil</span>
                    </div>
                    <p className="text-xs text-[var(--color-muted)]">
                        © {new Date().getFullYear()} LavaFácil. Todos los derechos reservados.
                    </p>
                </div>
            </footer>
        </>
    );
}
