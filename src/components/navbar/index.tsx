'use client'

import React, { useEffect } from 'react';
import Link from 'next/link';
import styles from './style.module.scss';
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import Header from "./Header/index";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube, FaTiktok } from "react-icons/fa6";

import { KeyTextField, ImageField, LinkField, SelectField } from "@prismicio/types";

export interface SettingsDocumentData {
    site_title: KeyTextField;
    site_logo: ImageField;
    nav_items: {
        link_label: KeyTextField;
        link_url: LinkField;
    }[];
    social_items: {
        platform: SelectField;
        social_url: LinkField;
        icon_name: SelectField;
    }[];
}

export interface SettingsDocument extends Document {
    data: SettingsDocumentData;
}


const ICON_MAP = {
    'Instagram': FaInstagram,
    'Facebook': FaFacebookF,
    'Twitter': FaTwitter,
    'LinkedIn': FaLinkedinIn,
    'YouTube': FaYoutube,
    'TikTok': FaTiktok
};

interface NavbarProps {
    settings: SettingsDocument;
}

const Navbar = ({ settings }: NavbarProps) => {
    const { site_title, site_logo, nav_items, social_items } = settings.data;

    // Helper function to get the icon component
    const getIconComponent = (icon_name: string | null) => {
        if (!icon_name) return null;
        return ICON_MAP[icon_name as keyof typeof ICON_MAP];
    };

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
                <Header />
            </div>
        </>
    );
};

export default Navbar;