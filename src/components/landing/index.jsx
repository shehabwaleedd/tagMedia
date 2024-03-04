'use client'
import React, { useState, useEffect, useRef } from 'react';
import styles from './style.module.scss';
import { IoDiamondOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { FaGlobeAfrica, FaAsterisk, FaRegGrinStars, FaBullseye } from "react-icons/fa";
import { useScroll, motion, useTransform } from 'framer-motion';

// eslint-disable-next-line react/jsx-key
const icons = [<IoDiamondOutline />, <IoIosArrowDown />, <FaGlobeAfrica />, <FaAsterisk />, <FaBullseye />, <FaRegGrinStars />];


const Landing = () => {
    const [currentIcon, setCurrentIcon] = useState(0);
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["end start", "end center"]
    })
    const y = useTransform(scrollYProgress, [0, 1], [400, 0])


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIcon(currentIcon => (currentIcon + 1) % icons.length);
        }, 700);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <section className={styles.landing}>
            <motion.div className={styles.landing__content} ref={container} style={{ y }}>
                <div className={styles.landing__content_title}>
                    <h2>Crafting</h2>
                    <h2>Tomorrow&apos;s</h2>
                </div>
                <div className={styles.landing__content_title}>
                    <div>
                        {icons[currentIcon]}
                    </div>
                    <h2>Markets, Today.</h2>
                </div>
            </motion.div>
            <div className={styles.stripe}>
                <div className={styles.landing__middle}>
                    <span>
                        Transforming brands for growth
                    </span>
                    <span>
                        What can we do for you?
                    </span>
                </div>
            </div>
            <div className={styles.landing__lower}>
                <video src="/mainVideo.mp4" autoPlay loop muted type="video/mp4" playsInline></video>
            </div>
        </section>
    )
}

export default Landing