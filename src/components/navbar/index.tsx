'use client'

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './style.module.scss';
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { SettingsDocument, getIconComponent } from '@/types/prismicio-types';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import useWindowSize from '@/hooks/useWindowWidth';
import Nav from "./Header/Nav";
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

interface NavbarProps {
    settings: SettingsDocument;
    clientsCount: number;
    newsCount: number;
}

const Navbar = ({ settings, clientsCount, newsCount }: NavbarProps) => {
    const { site_title, site_logo, nav_items, social_items } = settings.data;
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const { windowWidth } = useWindowSize();
    const isTablet = windowWidth < 1088;
    const [isActive, setIsActive] = useState<boolean>(false);
    const pathname = usePathname();

    const menuAnimation = useRef<gsap.core.Timeline | null>(null);
    const menuBarAnimation = useRef<gsap.core.Timeline | null>(null);
    const lastScrollY = useRef<number>(0);
    const scrollPositionRef = useRef<number>(0);

    const toggleMenu = () => {
        const newMenuState = !isActive;
        setIsActive(newMenuState);
        toggleBodyScroll(newMenuState);
    };

    const toggleBodyScroll = (disableScroll: boolean) => {
        if (disableScroll) {
            scrollPositionRef.current = window.pageYOffset;
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollPositionRef.current}px`;
            document.body.style.width = "100%";
        } else {
            document.body.style.removeProperty("overflow");
            document.body.style.removeProperty("position");
            document.body.style.removeProperty("top");
            document.body.style.removeProperty("width");
            window.scrollTo(0, scrollPositionRef.current);
        }
    };

    useEffect(() => {
        setIsActive(false);
        toggleBodyScroll(false);
    }, [pathname]);

    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);

        if (isActive) return;

        if (latest > lastScrollY.current) {
            gsap.to(".navbar-container, .regular-container", {
                y: -100,
                duration: 0.5,
                ease: "power2.out",
            });
        } else {
            gsap.to(".navbar-container, .regular-container", {
                y: 0,
                duration: 0.5,
                ease: "power2.out",
            });
        }

        lastScrollY.current = latest;
    });

    useEffect(() => {
        if (isTablet) {
            menuAnimation.current = gsap.timeline({ paused: true })
                .to(".menu-content", {
                    duration: 1,
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    ease: "power4.inOut",
                });

            menuBarAnimation.current = gsap.timeline({ paused: true })
                .to(".navbar-container", {
                    duration: 1,
                    height: windowWidth < 1000 ? "80vh" : "calc(100vh - 4em)",
                    ease: "power4.inOut",
                });
        }

        return () => {
            if (menuAnimation.current) menuAnimation.current.kill();
            if (menuBarAnimation.current) menuBarAnimation.current.kill();
        };
    }, [isTablet, windowWidth]);

    useEffect(() => {
        if (isTablet) {
            if (isActive) {
                if (menuAnimation.current) menuAnimation.current.play();
                if (menuBarAnimation.current) menuBarAnimation.current.play();
            } else {
                if (menuAnimation.current) menuAnimation.current.reverse();
                if (menuBarAnimation.current) menuBarAnimation.current.reverse();
            }
        }
    }, [isActive, isTablet]);

    useEffect(() => {
        return () => {
            if (document.body.style.position === "fixed") {
                toggleBodyScroll(false);
            }
        };
    }, []);

    const containerVariants = {
        default: {
            width: isTablet ? "calc(100% - 0.5em)" : "95%",
            margin: isTablet ? "1.25em" : "0 auto",
            transition: { duration: 0.5, ease: "easeInOut" }
        },
        scrolled: {
            width: !isTablet ? "55%" : "calc(100% - 0.5em)",
            margin: !isTablet ? "0 auto" : "1.25em",
            transition: { duration: 0.5, ease: "easeInOut" }
        }
    };

    const getDocumentUrl = (linkUrl: any) => {
        if (linkUrl?.url) return linkUrl.url;
        if (linkUrl?.type === "clients") return "/clients";
        if (linkUrl?.type === "news_page") return "/news";
        if (linkUrl?.slug) return `/${linkUrl.slug}`;
        return "#";
    };

    return (
        <>
            {!isTablet ? (
                <nav className={styles.navbar}>
                    <motion.div className={`${styles.container} regular-container`} initial="default" animate={!isTablet && isScrolled ? "scrolled" : "default"} variants={containerVariants}>
                        <div className={styles.navbar__container_left}>
                            <div className={styles.left}>
                                <Link href="/" aria-label="Home Button" role="button">
                                    <PrismicNextImage field={site_logo} width={75} height={75} />
                                    <h2>{site_title}</h2>
                                </Link>
                            </div>
                        </div>

                        <ul className={styles.center} aria-label="Navigation Links" role="navigation">
                            {nav_items?.map((item, index) => (
                                <li key={index}>
                                    <Link href={getDocumentUrl(item.link_url)} aria-label={item.link_label || ""} role="link">
                                        {item.link_label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <ul className={styles.right} aria-label="Social Links" role="navigation">
                            {social_items?.map((item, index) => {
                                const IconComponent = getIconComponent(item.icon_name);
                                return IconComponent ? (
                                    <li key={index}>
                                        <PrismicNextLink field={item.social_url} aria-label={item.platform || ""} role="link">
                                            <IconComponent />
                                        </PrismicNextLink>
                                    </li>
                                ) : null;
                            })}
                        </ul>
                    </motion.div>
                </nav>
            ) : (
                <div className={styles.mobileMenuContainer}>
                    <div className={`${styles.navbarContainer} navbar-container`}>
                        <div className={styles.navbarBar}>
                            <div className={styles.left}>
                                <Link href="/" aria-label="Home Button" role="button">
                                    <PrismicNextImage field={site_logo} width={40} height={40} />
                                    <h2>{site_title}</h2>
                                </Link>
                            </div>

                            <div className={styles.menuToggle}>
                                <button className={`${styles.hamburgerIcon} ${isActive ? styles.active : ''}`} onClick={toggleMenu}></button>
                            </div>
                        </div>

                        <div className={`${styles.menuContent} menu-content`}>
                            <AnimatePresence>
                                {isActive && (
                                    <Nav clientsCount={clientsCount} newsCount={newsCount} currentPathname={pathname} settings={settings} />
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;