import { motion } from 'framer-motion';

export default function SecondaryButton({ type = 'button', className = '', disabled, children, ...props }) {
    return (
        <motion.button
            {...props}
            type={type}
            whileTap={!disabled ? { scale: 0.97 } : undefined}
            className={`btn-secondary ${className}`}
            disabled={disabled}
        >
            {children}
        </motion.button>
    );
}
