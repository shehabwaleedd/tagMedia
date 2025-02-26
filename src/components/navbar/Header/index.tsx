import React, { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import styles from './style.module.scss';
import Button from "./Button";
import Nav from "./Nav";
import { toast } from 'sonner';
import { SettingsDocument } from '@/types/prismicio-types';

interface ResponsiveSize {
    width: string;
    height: string;
    right: string;
    top: string;

}

const getResponsiveSize = (width: number): ResponsiveSize => {
    let menuWidth: number, menuHeight: number, right: number, top: number;

    if (width <= 380) {
        menuWidth = width * 0.9;
        menuHeight = width * 1.35;
        right = -menuWidth * 0.022;
        top = -menuHeight * 0.015;
    } else if (width <= 480) {
        menuWidth = width * 0.8;
        menuHeight = width * 1.2;
        right = -menuWidth * 0.022;
        top = -menuHeight * 0.015;
    } else if (width <= 777) {
        menuWidth = width * 0.7;
        menuHeight = 495;
        right = -menuWidth * 0.022;
        top = -menuHeight * 0.015;
    } else if (width <= 1067) {
        menuWidth = width * 0.6;
        menuHeight = 495;
        right = -menuWidth * 0.022;
        top = -menuHeight * 0.015;
    } else {
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

const Header: React.FC<{ settings: SettingsDocument, clientsCount: number, newsCount: number }> = ({ settings, clientsCount, newsCount }) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);

    const pathname = usePathname();

    const responsiveSize = useMemo(() => getResponsiveSize(windowWidth), [windowWidth]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        setIsActive(false);
    }, [pathname]);

    const menu = {
        open: {
            ...responsiveSize,
            transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] }
        },
        closed: {
            width: "100px",
            height: "55px",
            top: "0px",
            right: "0px",
            transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1] }
        }
    };

    const toggleMenu = () => setIsActive(prev => !prev);

    return (
        <header className={styles.header}>
            <motion.div className={styles.menu} variants={menu} animate={isActive ? "open" : "closed"} initial="closed">
                <AnimatePresence mode='wait'>
                    {isActive && (
                        <Nav clientsCount={clientsCount} newsCount={newsCount} currentPathname={pathname} settings={settings} />
                    )}
                </AnimatePresence>
            </motion.div>
            <Button isActive={isActive} toggleMenu={toggleMenu} />
        </header>
    );
};

export default Header;