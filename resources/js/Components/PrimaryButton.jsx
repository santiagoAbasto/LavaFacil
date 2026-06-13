import { motion } from 'framer-motion';

export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <motion.button
            {...props}
            whileHover={!disabled ? { y: -1 } : undefined}
            whileTap={!disabled ? { scale: 0.97 } : undefined}
            className={`btn-primary ${className}`}
            disabled={disabled}
        >
            {children}
        </motion.button>
    );
}
