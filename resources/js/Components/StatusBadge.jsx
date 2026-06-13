const estados = {
    pendiente: { label: 'Pendiente', color: 'bg-[var(--color-warning)]/10 text-[var(--color-warning)] border-[var(--color-warning)]/20' },
    en_proceso: { label: 'En Proceso', color: 'bg-[var(--color-primary)]/10 text-[var(--color-primary)] border-[var(--color-primary)]/20' },
    entregado: { label: 'Entregado', color: 'bg-[var(--color-success)]/10 text-[var(--color-success)] border-[var(--color-success)]/20' },
};

export default function StatusBadge({ estado, className = '' }) {
    const config = estados[estado] || estados.pendiente;
    return (
        <span className={`badge border ${config.color} ${className}`}>
            {config.label}
        </span>
    );
}
