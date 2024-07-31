'use client'
import React, { useState, useEffect, useRef } from 'react';
import styles from './style.module.scss';
import { BsYoutube, BsInstagram, BsTwitterX, BsTiktok, BsSnapchat } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { useScroll, motion, useTransform } from 'framer-motion';
import getChars from "@/animation/animatedHeaders/getChars";
import useWindowSize from '@/hooks/useWindowWidth';
import Video from '../video';

// Define the social media icons and their links
const socialMediaIcons: { icon: JSX.Element; link: string }[] = [
    { icon: <FaFacebookF />, link: "https://www.facebook.com" },
    { icon: <BsYoutube />, link: "https://www.youtube.com" },
    { icon: <BsInstagram />, link: "https://www.instagram.com" },
    { icon: <BsTwitterX />, link: "https://www.twitter.com" },
    { icon: <BsTiktok />, link: "https://www.tiktok.com" },
    { icon: <FaLinkedinIn />, link: "https://www.linkedin.com" },
    { icon: <BsSnapchat />, link: "https://www.snapchat.com" },
];



const Landing: React.FC = () => {
    const [currentIconIndex, setCurrentIconIndex] = useState(0);
    const { isMobile, isDesktop } = useWindowSize();
    const container = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["end start", "end center"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [400, 0]);


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIconIndex(currentIconIndex => (currentIconIndex + 1) % socialMediaIcons.length);
        }, 700);
        return () => clearInterval(intervalId);
    }, []);

    const handleIconClick = (link: string) => {
        window.open(link, '_blank');
    };

    return (
        <section className={styles.landing}>
            <motion.div className={styles.landing__content} ref={container} style={{ y: isDesktop ? y : 0 }}>
                <div className={styles.left}>
                    <h2>Crafting</h2>
                </div>
                <div className={styles.middle}>
                    <h2>Tomorrow&apos;s</h2>
                </div>
                <div className={styles.right}>
                    <h2>Markets, Today</h2>
                </div>
                <div onClick={() => handleIconClick(socialMediaIcons[currentIconIndex].link)} className={styles.icon}>
                    {socialMediaIcons[currentIconIndex].icon}
                </div>

            </motion.div>
        </section>
    );
};

export default Landing;
