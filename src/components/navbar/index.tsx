'use client'
import React  from 'react';
import Link from 'next/link';
import styles from './style.module.scss';
import Image from 'next/image';
import Header from "./Header/index"
import routesLinks from './routes';

const Navbar = () => {
    return (
        <nav className={`${styles.navbar}`}>
            <div className={styles.navbar__container_left}>
                <div className={styles.left}>
                    <Link href="/">
                        <Image src="/logo.png" alt="Tag Media Logo" width={75} height={75} />
                        <h2>Tag Media</h2>
                    </Link>
                </div>
                <div className={`${styles.menu}`}>
                    <Header />
                </div>
            </div>
            <ul className={styles.right}>
                {routesLinks.map(({ href, label }) => (
                    <li key={href}>
                        <Link href={href}>
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;