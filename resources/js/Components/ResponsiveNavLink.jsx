import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 text-base font-medium transition-all duration-200 focus:outline-none ${
                active
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)]'
                    : 'border-transparent text-[var(--color-muted)] hover:border-zinc-300 dark:hover:border-zinc-600 hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-ink)]'
            } ${className}`}
        >
            {children}
        </Link>
    );
}
