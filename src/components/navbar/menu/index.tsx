import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './style.module.scss';

interface MenuProps {
    menuOpen: boolean;
    projectsCount: number;
    newsCount: number;
}

const Menu = ({ menuOpen, projectsCount, newsCount }: MenuProps) => {
    return (
        <motion.div
            className={styles.menuLinks}
            initial={{ opacity: 0 }}
            animate={{ opacity: menuOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
        >
            <Link href="/">Home</Link>
            <Link href="/work">
                <h4>Work</h4>
                <div className={styles.count}>{projectsCount}</div>
            </Link>
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/news">
                <h4>News</h4>
                <div className={styles.count}>{newsCount ?? 0}</div>
            </Link>
            <Link href="/contact">Contact</Link>
        </motion.div>
    );
};

export default Menu;