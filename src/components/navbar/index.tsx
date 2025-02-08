'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './style.module.scss';
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Header from "./Header/index";
import { SettingsDocument, getIconComponent } from '@/types/prismicio-types';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import useWindowSize from '@/hooks/useWindowWidth';

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


    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const getDocumentUrl = (linkUrl: any) => {
        if (linkUrl?.url) return linkUrl.url;
        if (linkUrl?.type === "clients") return "/clients";
        if (linkUrl?.type === "news_page") return "/news";
        if (linkUrl?.slug) return `/${linkUrl.slug}`;
        return "#";
    };

    const containerVariants = {
        default: {
            width: isTablet ? "fit-content" : "95%",
            margin: !isTablet ? "0 auto" : "0",
            transition: { duration: 0.5, ease: "easeInOut" }
        },
        scrolled: {
            width: !isTablet ? "55%" : "100%",
            margin: !isTablet ? "0 auto" : "0",
            transition: { duration: 0.5, ease: "easeInOut" }
        }
    };


    return (
        <>
            <nav className={styles.navbar}>
                <motion.div className={styles.container} initial="default" animate={!isTablet && isScrolled ? "scrolled" : "default"} variants={containerVariants} transition={{ duration: 0.5, ease: "easeInOut" }}>
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
            <div className={styles.menu}>
                <Header settings={settings} clientsCount={clientsCount} newsCount={newsCount} />
            </div>
        </>
    );
};

export default Navbar;