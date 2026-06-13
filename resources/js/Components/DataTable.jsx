import { motion } from 'framer-motion';
import { fadeInUp } from '@/Hooks/usePageTransition';

export default function DataTable({ columns, rows, onRowClick }) {
    if (!rows || rows.length === 0) {
        return (
            <div className="card text-center py-12">
                <p className="text-[var(--color-muted)]">No hay datos para mostrar.</p>
            </div>
        );
    }

    return (
        <div className="card overflow-hidden p-0">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-[var(--color-border)]">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[var(--color-muted)]"
                                >
                                    {col.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-border)]">
                        {rows.map((row, i) => (
                            <motion.tr
                                key={row.id || i}
                                {...fadeInUp(i * 0.02)}
                                onClick={() => onRowClick?.(row)}
                                className={`${onRowClick ? 'cursor-pointer' : ''} hover:bg-[var(--color-surface-hover)] transition-colors`}
                            >
                                {columns.map((col) => (
                                    <td key={col.key} className="px-6 py-4 text-sm text-[var(--color-ink)]">
                                        {col.render ? col.render(row) : row[col.key]}
                                    </td>
                                ))}
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
