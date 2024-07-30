'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './style.module.scss'
import Header from "@/components/Header"
import Image from 'next/image'
import { gsap } from 'gsap'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const tagRef = useRef(null);
    const mediaRef = useRef(null);

    useEffect(() => {
        const handleScroll = (): void => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (isScrolled) {
            gsap.to(tagRef.current, { opacity: 0, duration: 0.5, ease: "power2.inOut" });
        } else {
            gsap.to(tagRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" });
        }
    }, [isScrolled]);

    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navbar__container}>
                    <div className={styles.navbar__container_left}>
                        <Link href="/">
                            <div className={styles.branding}>
                                <Image src="/logo.png" alt="Tag Media Logo" width={75} height={75} />
                                <h2 ref={tagRef}>Tag Media</h2>
                            </div>
                        </Link>
                    </div>
                </div>
            </nav >
            <div className={styles.navbar__container_right}>
                <Header />
            </div>
        </>
    )
}

export default Navbar
