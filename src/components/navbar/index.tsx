'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './style.module.scss';
import Image from 'next/image';
import { RiMenu4Fill } from 'react-icons/ri';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { HiOutlineChatBubbleOvalLeftEllipsis } from 'react-icons/hi2';
import useWindowSize from '@/hooks/useWindowWidth';
import Menu from './menu';
import axios from 'axios';
import { toast } from 'sonner';
import { gsap } from 'gsap';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [projectsCount, setProjectsCount] = useState(0);
    const [newsCount, setNewsCount] = useState(0);
    const currentPathname = usePathname();
    
    const menuRef = useRef(null);
    const menuContentRef = useRef(null);

    const handleMenu = () => {
        setMenuOpen(!menuOpen);
    };

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
                setNewsCount(newsRes.data.length);
            } catch (error: any) {
                toast.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (menuRef.current && menuContentRef.current) {
            const menuHeight = (menuContentRef.current as HTMLElement)?.offsetHeight || 0;
            gsap.to(menuRef.current, {
                height: menuOpen ? `${menuHeight + 58}px` : '48px', 
                duration: 0.5,
                ease: 'power3.inOut',
            });
        }
    }, [menuOpen]);

    const routeTitles: { [key: string]: string } = {
        '/': 'Home',
        '/work': 'Work',
        '/about': 'About',
        '/services': 'Services',
        '/news': 'News',
        '/contact': 'Contact',
    };

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
            <div className={styles.navbar__container_left}>
                <div className={styles.left}>
                    <Link href="/">
                        <Image src="/logo.png" alt="Tag Media Logo" width={75} height={75} />
                    </Link>
                    <h2 style={{ opacity: isScrolled ? 0 : 1, transition: 'opacity 0.3s' }}>
                        Tag Media
                    </h2>
                </div>
                <div className={`${styles.menu} ${styles.menuBar}`} ref={menuRef}>
                    <div className={styles.menuUpper} onClick={handleMenu}>
                        <h3>{routeTitles[currentPathname]}</h3>
                        <div className={styles.toggle} style={{ transform: `rotate(${menuOpen ? 180 : 0}deg)`, transition: 'transform 0.3s' }}>
                            <RiMenu4Fill />
                        </div>
                    </div>
                    <div ref={menuContentRef}>
                        <Menu menuOpen={menuOpen} projectsCount={projectsCount} newsCount={newsCount} />
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={`${styles.fit} ${styles.menu}`}>
                    <HiOutlineChatBubbleOvalLeftEllipsis style={{ fontSize: '1.25rem' }} />
                </div>
                <div className={`${styles.fit} ${styles.menu}`}>
                    <h3>Contact us</h3>
                    <MdOutlineKeyboardArrowRight />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;