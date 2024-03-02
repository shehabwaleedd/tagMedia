'use client'
import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { IoDiamondOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { FaGlobeAfrica, FaAsterisk, FaRegGrinStars, FaBullseye } from "react-icons/fa";

// eslint-disable-next-line react/jsx-key
const icons = [<IoDiamondOutline />, <IoIosArrowDown />, <FaGlobeAfrica />, <FaAsterisk />, <FaBullseye />, <FaRegGrinStars />];


const Landing = () => {
    const [currentIcon, setCurrentIcon] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIcon(currentIcon => (currentIcon + 1) % icons.length);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <section className={styles.landing}>
            <div className={styles.landing__content}>
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
            </div>
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