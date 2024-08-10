import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { AiOutlineYoutube } from "react-icons/ai";
import { FaFacebookF, FaSnapchat, FaInstagram } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import styles from './style.module.scss';
import { perspective, slideIn } from "./anim";
import routesLinks from '../../routes';

interface MenuProps {
    projectsCount: number;
    newsCount: number;
    currentPathname: string;
}

interface MenuItem {
    href: string;
    label: string;
}

const menuItems: MenuItem[] = [
    { href: '/', label: 'Home' },
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/news', label: 'News' },
];

const socialLinks = [
    { href: "https://www.facebook.com/TagMediaeg", Icon: FaFacebookF, label: "Facebook Page Link" },
    { href: "https://www.instagram.com/tagmediaeg", Icon: FaInstagram, label: "Instagram Page Link" },
    { href: "https://twitter.com/TagMediaEg", Icon: RiTwitterXFill, label: "Twitter Page Link" },
    { href: "https://www.youtube.com/channel/UCZv3g6bq9P7wU5KZn6a3v8A", Icon: AiOutlineYoutube, label: "Youtube Page Link" },
    { href: "https://www.snapchat.com/add/tagmediaeg", Icon: FaSnapchat, label: "Snapchat Page Link" },
];

const menuItemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.1 * i,
            duration: 0.5,
            ease: [0.215, 0.61, 0.355, 1],
        },
    }),
};

const footerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delay: 1,
            duration: 0.5,
            ease: [0.215, 0.61, 0.355, 1],
        },
    },
};

const Menu: React.FC<MenuProps> = ({ projectsCount, newsCount, currentPathname }) => {
    return (
        <motion.nav className={styles.nav} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className={styles.body}>
                {routesLinks.map((link, i) => (
                    <div key={`b_${i}`} className={styles.linkContainer}>
                        <motion.div
                            custom={i}
                            variants={perspective}
                            initial="initial"
                            animate="enter"
                            exit="exit"
                        >
                            <Link
                                href={link.href}
                                className={`${styles.menuItem} ${currentPathname === link.href ? styles.active : ''}`}
                            >
                                {link.label}
                                {link.href === '/work' && (
                                    <span className={styles.count}>{projectsCount}</span>
                                )}
                                {link.href === '/news' && (
                                    <span className={styles.count}>{newsCount}</span>
                                )}
                            </Link>
                        </motion.div>
                    </div>
                ))}
            </div>
            <motion.footer
                className={styles.footer}
                variants={footerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className={styles.by}>
                    <h3>Follow us</h3>
                    <div className={styles.social}>
                        {socialLinks.map(({ href, Icon, label }) => (
                            <Link key={href} href={href} target='_blank' aria-label={label}>
                                <Icon />
                            </Link>
                        ))}
                    </div>
                </div>
                <div className={styles.by}>
                    <h3>Website By</h3>
                    <Link href="https://www.cairo-studio.com" target='_blank'>Cairo Studio</Link>
                </div>
            </motion.footer>
        </motion.nav>
    );
};

export default Menu;