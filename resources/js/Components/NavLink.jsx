import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition-all duration-200 focus:outline-none ${
                active
                    ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                    : 'border-transparent text-[var(--color-muted)] hover:border-zinc-300 dark:hover:border-zinc-600 hover:text-[var(--color-ink)]'
            } ${className}`}
        >
            {children}
        </Link>
    );
}
