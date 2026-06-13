const defaultEase = [0.16, 1, 0.3, 1];

export function usePageTransition(delay = 0) {
    return {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay, duration: 0.35, ease: defaultEase },
    };
}

export const staggerContainer = {
    initial: {},
    animate: {
        transition: { staggerChildren: 0.05 },
    },
};

export const fadeInUp = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.35, ease: defaultEase },
});
