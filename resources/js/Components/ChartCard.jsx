import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function ChartCard({ title, children, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="card"
        >
            {title && <h3 className="text-lg font-semibold text-[var(--color-ink)] mb-4">{title}</h3>}
            {children}
        </motion.div>
    );
}
