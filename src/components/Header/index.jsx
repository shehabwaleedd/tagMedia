import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './style.module.scss';
import Button from './Button';
import Nav from './Nav';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const aspectRatio = 480 / 650;

const getResponsiveSize = (width) => {
    let menuWidth, menuHeight, right, top;

    if (width <= 480) {
        // Mobile phones
        menuWidth = width * 0.8; // 80% of viewport width
        menuHeight = menuWidth / aspectRatio;
        right = -menuWidth * 0.01; // 10% of width
        top = -menuHeight * 0.03; // 10% of height


    } else if (width <= 768) {
        // Tablets
        menuWidth = width * 0.6; // 60% of viewport width
        menuHeight = menuWidth / aspectRatio;
        right = -menuWidth * 0.05; // 10% of width
        top = -menuHeight * 0.05; // 10% of height
    } else {
        // Desktop
        menuWidth = 480;
        menuHeight = 500;   
        right = -25;
        top = -25;
    }
    return {
        width: `${menuWidth}px`,
        height: `${menuHeight}px`,
        right: `${right}px`,
        top: `${top}px`
    };
};

export default function Index() {
    const [isActive, setIsActive] = useState(false);
    const [responsiveSize, setResponsiveSize] = useState({
        width: '480px', // Default size
        height: '650px',
        right: '-25px',
        top: '-25px',
        borderRadius: "0px"
    });

    const router = usePathname();


    useEffect(() => {
        const handleResize = () => {
            setResponsiveSize(getResponsiveSize(window.innerWidth));
        };

        // Set initial size
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setIsActive(false);
    }, [router]);

    const menu = {
        open: {
            ...responsiveSize,
            transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] }
        },
        closed: {
            width: "50px",
            height: "50px",
            top: "2px",
            right: "2px",
            borderRadius: "2rem",
            transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1] }
        }
    };

    return (
        <>
            <div className={styles.header}>
                <motion.div className={styles.menu} variants={menu} animate={isActive ? "open" : "closed"} initial="closed">
                    <AnimatePresence>
                        {isActive && <Nav />}
                    </AnimatePresence>
                </motion.div>
                <Button isActive={isActive} toggleMenu={() => setIsActive(!isActive)} />
            </div>
        </>
    );
}
