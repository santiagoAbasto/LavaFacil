export function useFormatMoney() {
    return (amount) => {
        const num = Number(amount);
        if (isNaN(num)) return 'Bs 0';
        return 'Bs ' + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
}
