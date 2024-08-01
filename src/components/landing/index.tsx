'use client'
import React, { useState, useEffect, useRef } from 'react';
import styles from './style.module.scss';
import { BsYoutube, BsInstagram, BsTwitterX, BsTiktok, BsSnapchat } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import useWindowSize from '@/hooks/useWindowWidth';
import Trusted from '../trusted';

gsap.registerPlugin(ScrollTrigger);

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
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            gsap.to(containerRef.current, {
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom center",
                    scrub: true,
                    pin: true,
                }
            });

        }
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

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
        <section className={styles.landing} ref={containerRef}>
            <div className={styles.landing__content}>
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
            </div>
            <Trusted />
        </section>
    );
};

export default Landing;