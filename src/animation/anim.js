const transition = { duration: 1, ease: [0.76, 0, 0.24, 1] }

export const opacity = {
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
}





export const background = {
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
}

export const blur = {
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
}

export const translate = {
    initial: {
        y: "100%",
        opacity: 0,
    },
    enter: ([i, isSubtitle]) => ({
        y: "0%",
        opacity: 1,
        transition: { duration: 1, delay: 0.02 * i }
    }),
    exit: {
        y: "100%",
        opacity: 0,
        transition: { duration: 0.5 }
    }
}

export const blur2 = {
    initial: {
        filter: "blur(2px)",  // Reduced initial blur
        opacity: 0.8,  // Increased initial opacity
    },
    open: {
        filter: "blur(0px)",
        opacity: 1,
        transition: { duration: 1.5, ease: "easeInOut" }  // Longer, smoother transition
    },
    closed: {
        filter: "blur(2px)",
        opacity: 0.8,
        transition: { duration: 0.5, ease: "easeInOut" }  // Smoother exit transition
    }
}


export const slideUp = {
    initial: {
        y: "100%",
        opacity: 0,
    },
    enter: ([i, isSubtitle]) => ({
        y: "0%",
        opacity: 1,
        transition: { duration: 1, delay: 1} // 1 second delay before subtitle starts
    }),
    exit: {
        y: "100%",
        opacity: 0,
        transition: { duration: 0.5 }
    }
}
export const menuSlide = {
    initial: { x: "calc(100% + 100px)" },
    enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: { x: "calc(100% + 100px)", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
}



export const slide = {
    initial: { x: 100 },
    enter: i => ({ x: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i } }),
    exit: i => ({ x: 100, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i } })
}

export const scale = {
    open: { scale: 1, transition: { duration: 0.3 } },
    closed: { scale: 0, transition: { duration: 0.4 } }
}


export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.5,
            staggerChildren: 0.2,
        },
    },
};

export const itemVariants = {
    hidden: { opacity: 0, filter: 'blur(4px)',  ease: [0.76, 0, 0.24, 1] },
    visible: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
            delay: 0.5,
            ease: [0.76, 0, 0.24, 1],
            duration: 0.8,
        },
    },
};


export const itemMappingVariants = {
    hidden: { opacity: 0, filter: 'blur(4px)' },
    visible: {
        opacity: 1,
        delay: 0.5,
        filter: 'blur(0px)',
        transition: {
            ease: [0.76, 0, 0.24, 1],
            duration: 0.8,
        },
    },
};