import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',

    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                brand: {
                    50: 'oklch(0.95 0.04 248)',
                    100: 'oklch(0.90 0.08 248)',
                    200: 'oklch(0.82 0.12 248)',
                    300: 'oklch(0.72 0.16 248)',
                    400: 'oklch(0.63 0.18 248)',
                    500: 'oklch(0.55 0.19 248)',
                    600: 'oklch(0.47 0.18 248)',
                    700: 'oklch(0.38 0.16 248)',
                    800: 'oklch(0.28 0.12 248)',
                    900: 'oklch(0.18 0.08 248)',
                    950: 'oklch(0.10 0.04 248)',
                },
                surface: {
                    DEFAULT: 'oklch(0.97 0.008 260)',
                    hover: 'oklch(0.94 0.012 260)',
                },
            },
            borderRadius: {
                sm: '6px',
                md: '10px',
                lg: '16px',
            },
            boxShadow: {
                subtle: '0 1px 2px oklch(0 0 0 / 0.06)',
                card: '0 2px 8px oklch(0 0 0 / 0.08)',
                elevated: '0 4px 24px oklch(0 0 0 / 0.10)',
            },
            animation: {
                'fade-in': 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                'scale-in': 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(12px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
        },
    },

    plugins: [forms],
};
