'use client'
import React from 'react';
import styles from './style.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RiTwitterXFill } from "react-icons/ri";
import { FaFacebookF, FaSnapchat, FaInstagram } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";
import { SettingsDocument } from '@/types/prismicio-types';
import { PrismicNextLink } from '@prismicio/next';

interface FooterProps {
    settings: SettingsDocument;
    newsCount?: number;
    clientsCount?: number;
}

const Footer = ({ settings, newsCount = 0, clientsCount = 0 }: FooterProps) => {
    const router = usePathname();
    const { site_title, social_items, footer_secondary_links } = settings.data;

    const getDocumentUrl = (linkUrl: any) => {
        if (linkUrl?.url) return linkUrl.url;

        if (linkUrl?.type === "clients") {
            return "/clients";
        }
        if (linkUrl?.type === "news_page") {
            return "/news";
        }

        if (linkUrl?.slug) {
            return `/${linkUrl.slug}`;
        }

        return "#";
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__upper}>
                <div className={styles.footer__upper_left}>
                    <h2>{site_title || 'Tag Media®'}</h2>
                </div>
                <div className={styles.footer__upper_right}>
                    <div className={styles.footer__upper_right_content}>
                        <nav aria-label="Main navigation" className={styles.footer__upper_right_content_upper}>
                            <h3 className={styles.visuallyHidden}>Main Menu</h3>
                            <ul className={styles.menuLinks}>
                                {footer_secondary_links?.map((item, index) => (
                                    <li key={index}>
                                        <Link href={getDocumentUrl(item.link)}>
                                            {item.label}
                                            {item.label === 'Clients' && (
                                                <span className={styles.count}>{clientsCount}</span>
                                            )}
                                            {item.label === 'News' && (
                                                <span className={styles.count}>{newsCount}</span>
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <div className={styles.footer__upper_right_content_lower}>
                            <nav aria-label="Secondary navigation" className={styles.menuLinks}>
                                <h3 className={styles.visuallyHidden}>Secondary Menu</h3>
                                <ul>
                                    <li>
                                        <Link href="/careers">
                                            Careers
                                            <span className={styles.count}>coming soon</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/snippets">
                                            Snippets
                                            <span className={styles.count}>coming soon</span>
                                        </Link>
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        <Link href="/privacy">
                                            Policy
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                            <div className={styles.by}>
                                <h3>Website By</h3>
                                <Link href="https://www.cairo-studio.com" target='_blank'>Cairo Studio</Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.by}>
                        <h3>Follow us</h3>
                        <div className={styles.social}>
                            {social_items?.map((item, index) => {
                                const platform = item.platform?.toLowerCase();
                                let Icon;

                                switch (platform) {
                                    case 'facebook':
                                        Icon = FaFacebookF;
                                        break;
                                    case 'instagram':
                                        Icon = FaInstagram;
                                        break;
                                    case 'twitter':
                                        Icon = RiTwitterXFill;
                                        break;
                                    case 'youtube':
                                        Icon = AiOutlineYoutube;
                                        break;
                                    case 'snapchat':
                                        Icon = FaSnapchat;
                                        break;
                                    default:
                                        return null;
                                }

                                return (
                                    <PrismicNextLink key={index} field={item.social_url} target='_blank' aria-label={`${item.platform} Page Link`}>
                                        <Icon />
                                    </PrismicNextLink>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.footer__lower}>
                <span>{new Date().getFullYear()} © {site_title || 'Tag Media'}. All rights reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;