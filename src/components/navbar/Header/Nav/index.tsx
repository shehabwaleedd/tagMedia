import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './style.module.scss';
import { perspective } from './anim';
import routesLinks from '../../routes';
import { SettingsDocument, getIconComponent } from '@/types/prismicio-types';
import { PrismicNextLink } from '@prismicio/next';
interface MenuProps {
    clientsCount: number;
    newsCount: number;
    currentPathname: string;
    settings: SettingsDocument;
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

const Menu: React.FC<MenuProps> = ({ clientsCount, newsCount, currentPathname, settings }) => {
    const { social_items } = settings.data;

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
                                {link.href === '/clients' && (
                                    <span className={styles.count}>{clientsCount}</span>
                                )}
                                {link.href === '/news' && (
                                    <span className={styles.count}>{newsCount}</span>
                                )}
                            </Link>
                        </motion.div>
                    </div>
                ))}
            </div>
            <motion.footer className={styles.footer}>
                <motion.div className={styles.by} variants={footerVariants} initial="hidden" animate="visible">
                    <h3>Follow us</h3>
                    <div className={styles.social}>
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
                    </div>
                </motion.div>
                <motion.div className={styles.by} variants={footerVariants} initial="hidden" animate="visible">
                    <h3>Website By</h3>
                    <Link href="https://www.cairo-studio.com" target='_blank'>Cairo Studio</Link>
                </motion.div>
            </motion.footer>
        </motion.nav>
    );
};

export default Menu;