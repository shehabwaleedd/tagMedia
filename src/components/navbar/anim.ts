import { Transition, Variants } from 'framer-motion';

const transition: Transition = { duration: 1, ease: [0.76, 0, 0.24, 1] };

export const opacity: Variants = {
    initial: {
        opacity: 0
    },
    open: {
        opacity: 1,
        transition: { duration: 0.35 }
    },
    closed: {
        opacity: 0,
        transition: { duration: 0.35 }
    }
};

export const height: Variants = {
    initial: {
        height: 0
    },
    enter: {
        height: "110vh",
        transition
    },
    exit: {
        height: 0,
        transition
    }
};

export const contactPageHeight: Variants = {
    initial: {
        height: 0
    },
    enter: {
        height: "75vh",
        transition
    },
    exit: {
        height: 0,
        transition
    }
};

export const background: Variants = {
    initial: {
        height: 0
    },
    open: {
        height: "110vh",
        transition
    },
    closed: {
        height: 0,
        transition
    }
};

export const blur: Variants = {
    initial: {
        filter: "blur(0px)",
        opacity: 1
    },
    open: {
        filter: "blur(4px)",
        opacity: 0.6,
        transition: { duration: 0.3 }
    },
    closed: {
        filter: "blur(0px)",
        opacity: 1,
        transition: { duration: 0.3 }
    }
};

interface TranslateCustom extends Variants {
    enter: (i: number[]) => {
        y: string | number;
        transition: Transition;
    };
    exit: (i: number[]) => {
        y: string | number;
        transition: Transition;
    };
}

export const translate: TranslateCustom = {
    initial: {
        y: "100%",
    },
    enter: (i) => ({
        y: 0,
        transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: i[0] }
    }),
    exit: (i) => ({
        y: "100%",
        transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: i[1] }
    })
};