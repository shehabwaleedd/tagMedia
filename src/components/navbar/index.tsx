'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import styles from './style.module.scss'
import Header from "@/components/Header"
import Image from 'next/image'
import { gsap } from 'gsap'
import { RiMenu4Fill } from "react-icons/ri";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

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
                <div className={styles.navbar__container_left}>
                    <div className={styles.left}>
                        <Link href="/">
                            <Image src="/logo.png" alt="Tag Media Logo" width={75} height={75} />
                        </Link>
                        <h2 ref={tagRef}>Tag Media</h2>
                    </div>
                    <div className={`${styles.menu} ${styles.menuBar}`}>
                        <h3>
                            Home
                        </h3>
                        <div className={styles.toggle}>
                            <RiMenu4Fill />
                        </div>
                    </div>

                </div>
                <div className={styles.right}>
                    <div className={`${styles.fit} ${styles.menu}`}>
                        <HiOutlineChatBubbleOvalLeftEllipsis style={{fontSize: "1.25rem"}}/>
                    </div>
                    <div className={`${styles.fit} ${styles.menu}`}>
                        <h3>Contact us</h3>
                        <MdOutlineKeyboardArrowRight />
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
