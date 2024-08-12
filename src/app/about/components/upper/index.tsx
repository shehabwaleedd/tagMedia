'use client'
import React, { useState, useEffect, useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import styles from "./style.module.scss"
import GetChars from '@/animation/animatedHeaders/getChars';


const AboutUpper: React.FC = () => {
    const [windowWidth, setWindowWidth] = useState<number>(0); // Initialize as 0 or another non-null value
    const container = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["end start", "end center"]
    })
    const y = useTransform(scrollYProgress, [0, 1], [300, 0])

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth);
        });

        return () => {
            window.removeEventListener('resize', () => {
                setWindowWidth(window.innerWidth);
            });
        }
    }, []);

    return (
        <motion.section className={styles.about__upper} ref={container} style={{ y: windowWidth > 1200 ? y : 0 }}>
            <div className={styles.about__upper_content}>
                <div className={styles.about__upper_content_title}>
                    <GetChars word="We Transform" />
                </div>
                <div className={styles.about__upper_content_title}>
                    <GetChars word="Brands To Power" />
                </div>
                <div className={styles.about__upper_content_title}>
                    <GetChars word="Growth" />
                </div>
            </div>
        </motion.section>
    )
}

export default AboutUpper