'use client'
import React, { useState, useEffect, useRef } from 'react';
import styles from "./style.module.scss"
import { gsap } from 'gsap';
import useWindowSize from '@/hooks/useWindowWidth';
import socialIcons from '../navbar/Header/Nav/socialIcons';

const Icons: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentIconIndex, setCurrentIconIndex] = useState<number>(0);
    const iconMenuRef = useRef<HTMLDivElement>(null);
    const { isMobile, isTablet } = useWindowSize();
    const isTouchDevice = isMobile || isTablet;

    useEffect(() => {
        if (!isOpen) {
            const intervalId = setInterval(() => {
                setCurrentIconIndex((prevIndex) => (prevIndex + 1) % socialIcons.length);
            }, 700);

            return () => clearInterval(intervalId);
        }
    }, [isOpen]);

    const handleIconClick = (href: string) => {
        if (isTouchDevice && !isOpen) {
            setIsOpen(true);
        } else {
            window.open(href, '_blank');
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

    const CurrentIcon = socialIcons[currentIconIndex].Icon;

    return (
        <div 
            className={styles.iconContainer} 
            onMouseEnter={() => handleHover(true)} 
            onMouseLeave={() => handleHover(false)}
            onClick={handleToggle}
        >
            <div className={`${styles.icon} ${!isOpen ? styles.flashing : ''}`}>
                <CurrentIcon />
            </div>
            <div className={styles.iconMenu} ref={iconMenuRef}>
                {socialIcons
                    .filter((_, index) => index !== currentIconIndex)
                    .map(({ Icon, href, label }, index) => (
                        <div
                            key={index}
                            className={styles.icon}
                            onClick={() => handleIconClick(href)}
                            aria-label={label}
                        >
                            <Icon />
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Icons;