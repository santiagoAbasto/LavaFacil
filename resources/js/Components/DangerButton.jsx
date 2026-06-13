import { motion } from 'framer-motion';

export default function DangerButton({ className = '', disabled, children, ...props }) {
    return (
        <motion.button
            {...props}
            whileTap={!disabled ? { scale: 0.97 } : undefined}
            className={`btn-danger ${className}`}
            disabled={disabled}
        >
            {children}
        </motion.button>
    );
}
