'use client'
import React, { useRef } from 'react'
import { useScroll, motion, useTransform } from 'framer-motion';
import styles from './style.module.scss'
import Link from 'next/link';

const Footer = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    })
    const y = useTransform(scrollYProgress, [0, 1], [-500, 0])



    return (
        <motion.footer className={styles.footer} ref={container} style={{y}}>
            <div className={styles.footer__upper}>
                <h2>
                    TAG MEDIA
                </h2>
            </div>
            <div className={styles.footer__lower}>
                <ul>
                    <li>
                        <span>
                            Tag Media @2024
                        </span>
                    </li>
                    <li>
                        <Link href="https://www.facebook.com/TagMediaeg" target='_blank' aria-label="Facebook Page Link">Facebook </Link>
                    </li>
                    <li>
                        <Link href= "https://www.instagram.com/tagmediaeg" target='_blank' aria-label="Instagram Page Link">Instagram </Link>
                    </li>
                    <li>
                        <Link href="https://twitter.com/TagMediaEg" target='_blank' aria-label="Twitter Page Link">Twitter </Link>
                    </li>
                    <li>
                        <span>
                            Made by <Link aria-label="Cairo Studio Link" target='_blank' href="https://www.cairo-studio.com"> Cairo Studio</Link>
                        </span>
                    </li>
                </ul>
            </div>
        </motion.footer>
    )
}

export default Footer