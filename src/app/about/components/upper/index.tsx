'use client'
import React, { useState, useEffect, useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import styles from "./style.module.scss"
import getChars from "@/animation/animatedHeaders/getChars"


const AboutUpper = () => {
    const [windowWidth, setWindowWidth] = useState<number | null>(null);
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["end start", "end center"]
    })
    const y = useTransform(scrollYProgress, [0, 1], [400, 0])

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
        <section className={styles.about__upper} ref={container} style={{ y: windowWidth > 1200 ? y : 0 }}>
            <div className={styles.about__upper_title}>
                {getChars("We Transform")}
            </div>
            <div className={styles.about__upper_title}>
                {getChars("Brands To Power")}
            </div>
            <div className={styles.about__upper_title}>
                {getChars("Growth")}
            </div>
        </section>
    )
}

export default AboutUpper