'use client'
import React, { useState, useEffect, useRef } from 'react';
import styles from './style.module.scss';
import { IoDiamondOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { FaGlobeAfrica, FaAsterisk, FaRegGrinStars, FaBullseye } from "react-icons/fa";
import { useScroll, motion, useTransform } from 'framer-motion';
import getChars from "@/animation/animatedHeaders/getChars"

// eslint-disable-next-line react/jsx-key
const icons = [<IoDiamondOutline />, <IoIosArrowDown />, <FaGlobeAfrica />, <FaAsterisk />, <FaBullseye />, <FaRegGrinStars />];


const Landing = () => {
    const [currentIcon, setCurrentIcon] = useState(0);
    const [windowWidth, setWindowWidth] = useState(null);
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


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIcon(currentIcon => (currentIcon + 1) % icons.length);
        }, 700);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <section className={styles.landing}>
            <motion.div className={styles.landing__content} ref={container} style={{ y: windowWidth > 1200 ? y : 0 }}>
                {windowWidth > 570 ? (
                    <>
                        <div className={styles.landing__content_title}>
                            <div>
                                {getChars("Crafting")}
                            </div>
                            <div>
                                {getChars("Tomorrow's")}
                            </div>
                        </div>
                        <div className={styles.landing__content_title}>
                            <div>
                                {icons[currentIcon]}
                            </div>
                            <div>
                                {getChars("Markets, Today.")}
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={styles.landing__content_title_mobile}>
                            <h2>Crafting <br /> Tomorrow&apos;s <br />Markets, Today.</h2>
                            <div className={styles.landing__content_icons_mobile}>
                                {icons[currentIcon]}
                            </div>
                        </div>
                    </>
                )}
            </motion.div>
            <div className={styles.stripe}>
            </div>
            <div className={styles.landing__middle}>
                <span>
                    Transforming brands for growth
                </span>
                <span>
                    What can we do for you?
                </span>
            </div>
            <div className={styles.landing__lower}>
                <video autoPlay loop muted  playsInline>
                    <source src="/mainVideo.mp4" type="video/mp4" />
                </video>
            </div>
        </section>
    )
}

export default Landing