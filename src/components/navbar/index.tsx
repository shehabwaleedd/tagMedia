'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './style.module.scss'
import Header from "@/components/Header"
import { motion, AnimatePresence } from 'framer-motion'

const letters = ["T", "a", "g", "M", "e", "d", "i", "a"];


const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    const letterVariants = {
        visible: (i: number) => ({
            x: 0,
            opacity: 1,
            transition: { delay: i * 0.05 },
        }),
        hidden: (i: number) => ({
            opacity: 0,
            transition: { delay: i * -0.014 },
        })
    };

    useEffect(() => {
        const handleScroll = (): void => {
            if (window.scrollY > 50) { // Adjust the value as needed
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Add event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up function
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.navbar__container}>
                    <div className={styles.navbar__container_left}>
                        <Link href="/">
                            <AnimatePresence mode='wait'>
                                <motion.div className={styles.branding} initial="hidden" animate="visible">
                                    {letters.map((letter, i) => (
                                        <motion.h2
                                            key={i}
                                            custom={i}
                                            variants={letterVariants}
                                        >
                                            {letter}
                                        </motion.h2>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </Link>
                    </div>
                </div>
            </nav>
            <div className={styles.navbar__container_right}>
                <Header />
            </div>
        </>
    )
}

export default Navbar