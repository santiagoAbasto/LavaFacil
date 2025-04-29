import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Leer el tema guardado en localStorage al cargar
        const darkMode = localStorage.getItem('theme') === 'dark';
        setIsDark(darkMode);
        document.documentElement.classList.toggle('dark', darkMode);
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        document.documentElement.classList.toggle('dark', newTheme);
        localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    };

    return (
        <button
            onClick={toggleTheme}
            className={`relative w-14 h-8 flex items-center bg-gray-300 dark:bg-zinc-600 rounded-full p-1 transition-colors duration-300 ${
                isDark ? 'justify-end' : 'justify-start'
            }`}
        >
            <span className="w-6 h-6 bg-white dark:bg-zinc-300 rounded-full shadow-md transform transition-transform duration-300" />
        </button>
    );
}
