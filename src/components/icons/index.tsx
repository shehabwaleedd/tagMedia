'use client'
import React, { useState, useEffect, useRef } from 'react';
import { BsYoutube, BsInstagram, BsTwitterX, BsTiktok, BsSnapchat } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import styles from "./style.module.scss"
import { gsap } from 'gsap';

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
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [currentIconIndex, setCurrentIconIndex] = useState<number>(0);
    const iconMenuRef = useRef<HTMLDivElement>(null);


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
        <div className={styles.iconContainer} onMouseEnter={() => handleHover(true)} onMouseLeave={() => handleHover(false)}>
            <div className={`${styles.icon} ${!isHovered ? styles.flashing : ''}`}>
                {socialMediaIcons[currentIconIndex].icon}
            </div>
            <div className={styles.iconMenu}  ref={iconMenuRef}>
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
        </div>)
}

export default Icons