import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const dark = stored === 'dark' || (!stored && prefersDark);
        setIsDark(dark);
        document.documentElement.classList.toggle('dark', dark);
        setMounted(true);
    }, []);

    const toggle = () => {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle('dark', next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
    };

    if (!mounted) return <div className="w-12 h-7" />;

    return (
        <motion.button
            onClick={toggle}
            whileTap={{ scale: 0.9 }}
            className="relative w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 bg-zinc-200 dark:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
            aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
        >
            <motion.span
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-5 h-5 bg-white dark:bg-zinc-200 rounded-full shadow-md flex items-center justify-center text-xs"
            >
                {isDark ? '🌙' : '☀️'}
            </motion.span>
        </motion.button>
    );
}
