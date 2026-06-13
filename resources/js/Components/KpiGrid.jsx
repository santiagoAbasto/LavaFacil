import StatCard from '@/Components/StatCard';

export default function KpiGrid({ items, columns = 4 }) {
    return (
        <div className={`grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns} mb-8`}>
            {items.map((item, i) => (
                <StatCard key={item.label} {...item} delay={i * 0.05} />
            ))}
        </div>
    );
}
