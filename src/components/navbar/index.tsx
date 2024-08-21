'use client'
import React from 'react';
import Link from 'next/link';
import styles from './style.module.scss';
import Image from 'next/image';
import Header from "./Header/index"
import routesLinks from './routes';
import socialIcons from './Header/Nav/socialIcons';

const Navbar = () => {
    return (
        <>
            <nav className={`${styles.navbar}`}>
                <div className={styles.navbar__container_left}>
                    <div className={styles.left}>
                        <Link href="/">
                            <Image src="/logo.png" alt="Tag Media Logo" width={75} height={75} />
                            <h2>Tag Media</h2>
                        </Link>
                    </div>
                </div>

                <ul className={styles.center}>
                    {routesLinks.map(({ href, label }) => (
                        <li key={href}>
                            <Link href={href}>
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
                <ul className={styles.right}>
                    {socialIcons.map(({ href, Icon, label }) => (
                        <li key={href}>
                            <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                                <Icon />
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className={`${styles.menu}`}>
                <Header />
            </div>
        </>
    );
};

export default Navbar;