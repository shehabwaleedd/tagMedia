'use client'
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import styles from './style.module.scss';
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { SettingsDocument, getIconComponent } from '@/types/prismicio-types';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import useWindowSize from '@/hooks/useWindowWidth';
import Nav from "./Header/Nav";
import { usePathname } from 'next/navigation';

interface NavbarProps {
    settings: SettingsDocument;
    clientsCount: number;
    newsCount: number;
}

const Navbar = ({ settings, clientsCount, newsCount }: NavbarProps) => {
    const { site_title, site_logo, nav_items, social_items } = settings.data;
    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname();
    const { windowWidth } = useWindowSize();
    const isTablet = useMemo(() => windowWidth < 1088, [windowWidth]);
    const [navbarVisible, setNavbarVisible] = useState(true);
    const { scrollY } = useScroll();
    const [lastScrollY, setLastScrollY] = useState(0);

    const toggleMenu = useCallback(() => setIsActive(prev => !prev), []);

    const getDocumentUrl = useCallback((linkUrl: any) => {
        if (linkUrl?.url) return linkUrl.url;
        if (linkUrl?.type === "clients") return "/clients";
        if (linkUrl?.type === "news_page") return "/news";
        if (linkUrl?.slug) return `/${linkUrl.slug}`;
        return "#";
    }, []);

    useEffect(() => {
        const unsubscribe = scrollY.onChange(current => {
            if (isActive) return;
            const isScrollingDown = current > lastScrollY;
            const hasScrolledPastThreshold = current > 50;
            setNavbarVisible(!isScrollingDown || !hasScrolledPastThreshold);
            setLastScrollY(current);
        });
        return () => unsubscribe();
    }, [scrollY, lastScrollY, isActive]);

    useEffect(() => setIsActive(false), [pathname]);

    useEffect(() => {
        if (isActive) {
            const scrollY = window.scrollY;
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = "100%";
            return () => {
                document.body.style.overflow = "";
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.width = "";
                window.scrollTo(0, scrollY);
            };
        }
    }, [isActive]);

    const transition = useMemo(() => ({
        duration: 0.6,
        ease: [0.6, 0.01, 0.05, 0.95]
    }), []);

    const Logo = useCallback(({ size = 75 }: { size?: number }) => (
        <div className={styles.left}>
            <Link href="/">
                <PrismicNextImage field={site_logo} width={size} height={size} />
                <h2>{site_title}</h2>
            </Link>
        </div>
    ), [site_logo, site_title]);

    const NavLinks = useMemo(() => (
        <ul className={styles.center}>
            {nav_items?.map((item, index) => (
                <li key={index}>
                    <Link href={getDocumentUrl(item.link_url)}>{item.link_label}</Link>
                </li>
            ))}
        </ul>
    ), [nav_items, getDocumentUrl]);

    const SocialLinks = useMemo(() => (
        <ul className={styles.right}>
            {social_items?.map((item, index) => {
                const IconComponent = getIconComponent(item.icon_name);
                return IconComponent ? (
                    <li key={index}>
                        <PrismicNextLink field={item.social_url}><IconComponent /></PrismicNextLink>
                    </li>
                ) : null;
            })}
        </ul>
    ), [social_items]);

    const DesktopNavbar = useMemo(() => (
        <nav className={styles.navbar}>
            <motion.div className={`${styles.container} regular-container`} animate={{ y: navbarVisible ? 0 : -100 }} transition={transition}>
                <Logo />
                {NavLinks}
                {SocialLinks}
            </motion.div>
        </nav>
    ), [navbarVisible, transition, Logo, NavLinks, SocialLinks]);

    const MobileNavbar = useMemo(() => (
        <div className={styles.mobileMenuContainer}>
            <motion.div className={`${styles.navbarContainer} navbar-container`} animate={{ y: (navbarVisible || isActive) ? 0 : -100, height: isActive ? (windowWidth < 1000 ? "80vh" : "calc(100vh - 4em)") : "64px" }} transition={transition}>
                <div className={styles.navbarBar}>
                    <Logo size={40} />
                    <div className={styles.menuToggle}>
                        <button className={`${styles.hamburgerIcon} ${isActive ? styles.active : ''}`} onClick={toggleMenu} />
                    </div>
                </div>
                <motion.div className={`${styles.menuContent} menu-content`} animate={{ clipPath: isActive ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" : "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }} transition={transition}>
                    <AnimatePresence>
                        {isActive && (
                            <Nav clientsCount={clientsCount} newsCount={newsCount} currentPathname={pathname} settings={settings} />)}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </div>
    ), [navbarVisible, isActive, windowWidth, transition, Logo, toggleMenu, clientsCount, newsCount, pathname, settings]);

    return isTablet ? MobileNavbar : DesktopNavbar;
};

export default React.memo(Navbar);