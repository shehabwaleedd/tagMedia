import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './style.module.scss';
import { perspective } from "./anim";
import routesLinks from '../../routes';
import socialIcons from './socialIcons';

interface MenuProps {
    projectsCount: number;
    newsCount: number;
    currentPathname: string;
}

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
                        {socialIcons.map(({ href, Icon, label }) => (
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