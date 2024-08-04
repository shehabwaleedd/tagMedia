import React from 'react';
import Link from 'next/link';
import styles from './style.module.scss';
import { RiTwitterXFill } from "react-icons/ri";
import { FaFacebookF, FaSnapchat, FaInstagram } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";

interface MenuProps {
    projectsCount: number;
    newsCount: number;
    currentPathname: string;
}

const Menu = ({ projectsCount, newsCount, currentPathname }: MenuProps) => {
    const menuItems = [
        { path: '/', label: 'Home' },
        { path: '/work', label: 'Work' },
        { path: '/about', label: 'About' },
        { path: '/news', label: 'News' },
        { path: '/contact', label: 'Contact' },
    ];

    return (
        <>
            <ul className={styles.menuItems}>
                {menuItems.map((item) => (
                    <li key={item.path}>
                        <Link
                            href={item.path}
                            className={`${styles.menuItem} ${currentPathname === item.path ? styles.active : ''}`}
                        >
                            {item.label}
                            {item.path === '/work' && (
                                <span className={styles.count}>{projectsCount}</span>
                            )}
                            {item.path === '/news' && (
                                <span className={styles.count}>{newsCount ?? 0}</span>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className={styles.lower}>
                <div className={styles.secondaryLinks}>
                    <ul>
                        <li>
                            <Link href="/work">
                                <h4>Careers</h4>
                                <span className={styles.count}>coming soon</span>
                            </Link>
                        </li>
                        <li>
                            <Link href="/snippets" aria-disabled>
                                <h4>Snippets</h4>
                                <span className={styles.count}>coming soon</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.by}>
                    <h3>Website By</h3>
                    <Link href="https://www.cairo-studio.com" target='_blank'>Cairo Studio</Link>
                </div>
                <div className={styles.by}>
                    <h3>Follow us</h3>
                    <div className={styles.social}>
                        <Link href="https://www.facebook.com/TagMediaeg" target='_blank' aria-label="Facebook Page Link">
                            <FaFacebookF />
                        </Link>
                        <Link href="https://www.instagram.com/tagmediaeg" target='_blank' aria-label="Instagram Page Link">
                            <FaInstagram />
                        </Link>
                        <Link href="https://twitter.com/TagMediaEg" target='_blank' aria-label="Twitter Page Link">
                            <RiTwitterXFill />
                        </Link>
                        <Link href="https://www.youtube.com/channel/UCZv3g6bq9P7wU5KZn6a3v8A" target='_blank' aria-label="Youtube Page Link">
                            <AiOutlineYoutube />
                        </Link>
                        <Link href="https://www.snapchat.com/add/tagmediaeg" target='_blank' aria-label="Snapchat Page Link">
                            <FaSnapchat />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Menu;