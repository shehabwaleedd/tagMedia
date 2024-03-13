'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './style.module.scss'
import Header from "@/components/Header"
import { motion, AnimatePresence } from 'framer-motion'

const word1 = ["T", "a", "g"];
const word2 = ["M", "e", "d", "i", "a"];


const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    const containerVariants = {
        visible: {
            transition: {
                staggerChildren: 0.05,
            },
        },
        hidden: {
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1, // Reverse the animation order on hide
            },
        },
    };

    const letterVariants = {
        initial: {
            opacity: 0,
            x: -20
        },
        enter: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.1, duration: 0.4 }
        }),
        exit: (i: number) => ({
            opacity: i === 0 ? 1 : 0, // Keep the first letter visible
            x: i === 0 ? 0 : -20, // Move others out of view
            transition: { duration: 0.2 }
        }),
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
                                <motion.div
                                    className={styles.branding}
                                    initial="initial"
                                    animate="enter"
                                    exit="exit"
                                    variants={containerVariants}>
                                    {word1.map((letter, index) => (
                                        <motion.h2
                                            key={`word1-${index}`}
                                            custom={[index, word1.length]}
                                            variants={letterVariants}
                                            animate={isScrolled && index !== 0 ? "exit" : "enter"}
                                        >
                                            {letter}
                                        </motion.h2>
                                    ))}
                                    {word2.map((letter, index) => (
                                        <motion.h2
                                            key={`word2-${index}`}
                                            custom={[index, word2.length]}
                                            variants={letterVariants}
                                            animate={isScrolled ? "exit" : "enter"}
                                        >
                                            {letter}
                                        </motion.h2>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
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