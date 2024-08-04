'use client'
import React, { useState, useEffect, useRef } from 'react';
import styles from './style.module.scss';
import { BsYoutube, BsInstagram, BsTwitterX, BsTiktok, BsSnapchat } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import useWindowSize from '@/hooks/useWindowWidth';
import Trusted from '../trusted';
import Link from 'next/link';

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
    const [isHovered, setIsHovered] = useState(false);
    const [currentIconIndex, setCurrentIconIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const iconMenuRef = useRef<HTMLDivElement>(null);

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
        if (!isHovered) {
            const intervalId = setInterval(() => {
                setCurrentIconIndex((currentIconIndex + 1) % socialMediaIcons.length);
            }, 700);

            return () => clearInterval(intervalId);
        }
    }, [isHovered, currentIconIndex]);

    const handleIconClick = (link: string) => {
        window.open(link, '_blank');
    };

    const handleHover = (isEntering: boolean) => {
        setIsHovered(isEntering);
        if (iconMenuRef.current) {
            gsap.to(iconMenuRef.current, {
                y: isEntering ? 0 : -20,
                opacity: isEntering ? 1 : 0,
                duration: 0.3,
                ease: "power2.inOut"
            });
        }
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
                    <h2>Markets, <span>Today</span></h2>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.button}>
                        <Link href="/contact">
                            About us
                        </Link>
                    </div>
                    <div className={`${styles.button} ${styles.contact}`}>
                        <Link href="/contact" >
                            Contact us
                        </Link>
                    </div>
                </div>
                <div className={styles.iconContainer} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
                    <div className={`${styles.icon} ${!isHovered ? styles.flashing : ''}`}>
                        {socialMediaIcons[currentIconIndex].icon}
                    </div>
                    <div className={styles.iconMenu} ref={iconMenuRef}>
                        {socialMediaIcons
                            .filter((_, index) => index !== currentIconIndex)
                            .map((iconObj, index) => (
                                <div
                                    key={index}
                                    className={styles.icon}
                                    onClick={() => handleIconClick(iconObj.link)}
                                >
                                    {iconObj.icon}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <Trusted />
        </section>
    );
};

export default Landing;
