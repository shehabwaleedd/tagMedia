import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import styles from './style.module.scss';
import Button from "./Button";
import Nav from "./Nav";
import axios from 'axios';
import { toast } from 'sonner';

const aspectRatio = 480 / 600;

interface ResponsiveSize {
    width: string;
    height: string;
    right: string;
    top: string;
}

interface HeaderProps {
    projectsCount: number;
    newsCount: number;
}

const getResponsiveSize = (width: number): ResponsiveSize => {
    let menuWidth: number, menuHeight: number, right: number, top: number;

    if (width <= 380) {
        // Tablets
        menuWidth = width * 0.9; // 60% of viewport width
        menuHeight = 450;
        right = -menuWidth * 0.022; // 5% of widt
        top = -menuHeight * 0.015; // 5% of height
    } else if (width <= 420) {
        // Tablets
        menuWidth = width * 0.9; // 60% of viewport width
        menuHeight = 425;
        right = -menuWidth * 0.022; // 5% of widt
        top = -menuHeight * 0.015; // 5% of height

    } else if (width <= 480) {
        // Mobile phones
        menuWidth = width * 0.8; // 80% of viewport width
        menuHeight = menuWidth / aspectRatio;
        right = -menuWidth * 0.02; // 2% of width
        top = -menuHeight * 0.02; // 2% of height
    } else if (width <= 1067) {
        // Tablets
        menuWidth = width * 0.7; // 60% of viewport width
        menuHeight = 430;
        right = -menuWidth * 0.022; // 5% of widt
        top = -menuHeight * 0.015; // 5% of height
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

const Header: React.FC = () => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [projectsCount, setProjectsCount] = useState<number>(0);
    const [newsCount, setNewsCount] = useState<number>(0);

    const [responsiveSize, setResponsiveSize] = useState<ResponsiveSize>({
        width: '480px',
        height: '650px',
        right: '-25px',
        top: '-25px'
    });

    const pathname = usePathname();

    useEffect(() => {
        const handleResize = () => {
            setResponsiveSize(getResponsiveSize(window.innerWidth));
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [partnersRes, portfolioRes, newsRes] = await Promise.all([
                    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/partner`),
                    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/portfolio`),
                    axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/blog`)
                ]);

                setProjectsCount(partnersRes.data.data.length + portfolioRes.data.data.length);
                setNewsCount(newsRes.data.data.result.length);
            } catch (error: any) {
                toast.error('Error fetching data:', error.message);
            }
        };

        fetchData();
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
            height: "40px",
            top: "0px",
            right: "0px",
            transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1] }
        }
    };

    const toggleMenu = () => setIsActive(!isActive);

    return (
        <header className={styles.header}>
            <motion.div
                className={styles.menu}
                variants={menu}
                animate={isActive ? "open" : "closed"}
                initial="closed"
            >
                <AnimatePresence mode='wait'>
                    {isActive && (
                        <Nav
                            projectsCount={projectsCount}
                            newsCount={newsCount}
                            currentPathname={pathname}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
            <Button isActive={isActive} toggleMenu={toggleMenu} />
        </header>
    );
};

export default Header;