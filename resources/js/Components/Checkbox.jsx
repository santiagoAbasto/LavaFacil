export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={`rounded border-[var(--color-border)] text-[var(--color-primary)] shadow-sm focus:ring-[var(--color-primary)] focus:ring-offset-0 ${className}`}
        />
    );
}
