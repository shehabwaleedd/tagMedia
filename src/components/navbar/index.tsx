'use client'
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import styles from './style.module.scss';
import Image from 'next/image';
import { RiMenu4Fill, RiCloseLine } from 'react-icons/ri';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { HiOutlineChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';
import { motion, AnimatePresence } from 'framer-motion';
import { PiDiamondFill } from "react-icons/pi";

import Menu from './menu';
import axios from 'axios';
import { toast } from 'sonner';

const menuVariants = {
    closed: {
        clipPath: 'inset(0% 0% 100% 0% round 1rem)',
        transition: {
            duration: 1,
            ease: [0.16, 1, 0.3, 1]
        }
    },
    open: {
        clipPath: 'inset(0% 0% 0% 0% round 1rem)',
        transition: {
            duration: 1,
            ease: [0.16, 1, 0.3, 1]
        }
    }
};


const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [projectsCount, setProjectsCount] = useState(0);
    const [newsCount, setNewsCount] = useState(0);
    const currentPathname = usePathname();
    const router = useRouter();
    const handleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = useCallback(() => {
        setMenuOpen(false);
    }, []);

    useEffect(() => {
        closeMenu();
    }, [router, currentPathname, closeMenu]);

    useEffect(() => {
        const handleScroll = (): void => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
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
                toast.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const routeTitles: { [key: string]: string } = {
        '/': 'Home',
        '/work': 'Work',
        '/about': 'About',
        '/news': 'News',
        '/contact': 'Contact',

    };

    const getRouteTitle = (pathname: string) => {
        if (pathname.startsWith('/news/')) {
            return 'News';
        }
        if (pathname.startsWith('/work/')) {
            return 'Work';
        }
        return routeTitles[pathname] || pathname;
    };


    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.navbar__container_left}>
                <div className={styles.left}>
                    <Link href="/">
                        <Image src="/logo.png" alt="Tag Media Logo" width={75} height={75} />
                    </Link>
                </div>
                <motion.div
                    className={`${styles.menu} ${styles.menuBar}`}
                    initial={false}
                    animate={{
                        clipPath: menuOpen
                            ? 'inset(0% 0% 0% 0% round 1rem)'
                            : 'inset(0% 0% calc(100% - 58px) 0% round 1rem)'
                    }}

                    transition={{
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                >
                    <div className={styles.menuUpper} onClick={handleMenu}>
                        <h3>{getRouteTitle(currentPathname)} <PiDiamondFill /></h3>
                        <motion.div
                            className={styles.toggle}
                            animate={{ rotate: menuOpen ? 90 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {menuOpen ? <RiCloseLine /> : <RiMenu4Fill />}
                        </motion.div>
                    </div>
                    <AnimatePresence mode='wait'>
                        {menuOpen && (
                            <motion.div initial="closed" animate="open" exit="closed" variants={menuVariants} className={styles.menuItems}>
                                <Menu projectsCount={projectsCount} newsCount={newsCount} currentPathname={currentPathname} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
            <div className={styles.right}>
                <div className={`${styles.fit} ${styles.menu}`}>
                    <HiOutlineChatBubbleOvalLeftEllipsis style={{ fontSize: '1.25rem' }} />
                </div>
                <Link className={styles.contact} href='/contact'>
                    <h3>Contact us</h3>
                    <MdOutlineKeyboardArrowRight />
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;