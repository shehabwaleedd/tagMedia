'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import styles from './style.module.scss';
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Header from "./Header/index";
import { SettingsDocument, getIconComponent } from '@/types/prismicio-types';

interface NavbarProps {
    settings: SettingsDocument;
    clientsCount: number;
    newsCount: number;
}

const Navbar = ({ settings, clientsCount, newsCount }: NavbarProps) => {
    const { site_title, site_logo, nav_items, social_items } = settings.data;

    // Helper function to get the icon component
    const getDocumentUrl = (linkUrl: any) => {
        if (linkUrl?.url) return linkUrl.url;

        // Handle specific custom types
        if (linkUrl?.type === "clients") {
            return "/clients";
        }
        if (linkUrl?.type === "news_page") {
            return "/news";
        }

        // Fallback to slug-based URL if type-based doesn't exist
        if (linkUrl?.slug) {
            return `/${linkUrl.slug}`;
        }

        return "#";
    };

    return (
        <>
            <nav className={`${styles.navbar}`}>
                <div className={styles.container}>
                    <div className={styles.navbar__container_left}>
                        <div className={styles.left}>
                            <Link href="/">
                                <PrismicNextImage field={site_logo} width={75} height={75} />
                                <h2>{site_title}</h2>
                            </Link>
                        </div>
                    </div>

                    <ul className={styles.center}>
                        {nav_items?.map((item, index) => (
                            <li key={index}>
                                <Link href={getDocumentUrl(item.link_url)}>
                                    {item.link_label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <ul className={styles.right}>
                        {social_items?.map((item, index) => {
                            const IconComponent = getIconComponent(item.icon_name);
                            return IconComponent ? (
                                <li key={index}>
                                    <PrismicNextLink field={item.social_url}>
                                        <IconComponent />
                                    </PrismicNextLink>
                                </li>
                            ) : null;
                        })}
                    </ul>
                </div>
            </nav>
            <div className={`${styles.menu}`}>
                <Header settings={settings} clientsCount={clientsCount} newsCount={newsCount} />
            </div>
        </>
    );
};

export default Navbar;