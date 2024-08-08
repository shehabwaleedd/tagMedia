'use client'
import React, { useState, useEffect, useRef } from 'react';
import { BsYoutube, BsInstagram, BsTwitterX, BsTiktok, BsSnapchat } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import styles from "./style.module.scss"
import { gsap } from 'gsap';
import useWindowSize from '@/hooks/useWindowWidth';

const socialMediaIcons: { icon: JSX.Element; link: string }[] = [
    { icon: <FaFacebookF />, link: "https://www.facebook.com" },
    { icon: <BsYoutube />, link: "https://www.youtube.com" },
    { icon: <BsInstagram />, link: "https://www.instagram.com" },
    { icon: <BsTwitterX />, link: "https://www.twitter.com" },
    { icon: <BsTiktok />, link: "https://www.tiktok.com" },
    { icon: <FaLinkedinIn />, link: "https://www.linkedin.com" },
    { icon: <BsSnapchat />, link: "https://www.snapchat.com" },
];

const Icons = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentIconIndex, setCurrentIconIndex] = useState<number>(0);
    const iconMenuRef = useRef<HTMLDivElement>(null);
    const { isMobile, isTablet } = useWindowSize();
    const isTouchDevice = isMobile || isTablet;

    useEffect(() => {
        if (!isOpen) {
            const intervalId = setInterval(() => {
                setCurrentIconIndex((currentIconIndex + 1) % socialMediaIcons.length);
            }, 700);

            return () => clearInterval(intervalId);
        }
    }, [isOpen, currentIconIndex]);

    const handleIconClick = (link: string) => {
        if (isTouchDevice && !isOpen) {
            setIsOpen(true);
        } else {
            window.open(link, '_blank');
        }
    };

    const handleToggle = () => {
        if (isTouchDevice) {
            setIsOpen(!isOpen);
        }
    };

    const handleHover = (isEntering: boolean) => {
        if (!isTouchDevice) {
            setIsOpen(isEntering);
        }
    };

    useEffect(() => {
        if (iconMenuRef.current) {
            gsap.to(iconMenuRef.current, {
                y: isOpen ? 0 : -20,
                opacity: isOpen ? 1 : 0,
                duration: 0.3,
                ease: "power2.inOut"
            });
        }
    }, [isOpen]);

    return (
        <div 
            className={styles.iconContainer} 
            onMouseEnter={() => handleHover(true)} 
            onMouseLeave={() => handleHover(false)}
            onClick={handleToggle}
        >
            <div className={`${styles.icon} ${!isOpen ? styles.flashing : ''}`}>
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
    )
}

export default Icons;