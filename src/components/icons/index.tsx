'use client'
import React, { useState, useEffect, useRef } from 'react';
import styles from "./style.module.scss"
import useWindowSize from '@/hooks/useWindowWidth';
import socialIcons from '../navbar/Header/Nav/socialIcons';
import { gsap } from 'gsap';

const Icons: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentIconIndex, setCurrentIconIndex] = useState<number>(0);
    const { isMobile, isTablet } = useWindowSize();
    const isTouchDevice = isMobile || isTablet;
    const iconMenuRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (!isOpen) {
            const intervalId = setInterval(() => {
                setCurrentIconIndex((prevIndex) => (prevIndex + 1) % socialIcons.length);
            }, 3000);

            return () => clearInterval(intervalId);
        }
    }, [isOpen]);

    useEffect(() => {
        if (iconMenuRef.current) {
            if (isOpen) {
                gsap.to(iconMenuRef.current, { 
                    opacity: 1, 
                    duration: 0.5, 
                    ease: "power2.out" 
                });
                gsap.to(iconMenuRef.current.children, { 
                    opacity: 1, 
                    duration: 0.3, 
                    stagger: 0.1, 
                    ease: "power2.out" 
                });
            } else {
                gsap.to(iconMenuRef.current, { 
                    opacity: 0, 
                    duration: 0.5, 
                    ease: "power2.in" 
                });
            }
        }
    }, [isOpen]);

    const handleIconClick = (href: string, event: React.MouseEvent) => {
        event.stopPropagation();
        if (isTouchDevice && !isOpen) {
            setIsOpen(true);
        } else {
            window.open(href, '_blank', 'noopener,noreferrer');
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

    const CurrentIcon = socialIcons[currentIconIndex].Icon;

    return (
        <div 
            className={styles.iconContainer} 
            onMouseEnter={() => handleHover(true)} 
            onMouseLeave={() => handleHover(false)}
            onClick={handleToggle}
        >
            <button className={`${styles.icon} ${styles.mainIcon}`} aria-label="Toggle social media icons">
                <CurrentIcon />
            </button>
            <ul 
                ref={iconMenuRef}
                className={styles.iconMenu}
                style={{ opacity: 0 }}
            >
                {socialIcons
                    .filter((_, index) => index !== currentIconIndex)
                    .map(({ Icon, href, label }, index) => (
                        <li 
                            key={index}
                            style={{ opacity: 0 }}
                        >
                            <a
                                href={href}
                                className={styles.icon}
                                onClick={(e) => handleIconClick(href, e)}
                                aria-label={label}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Icon />
                            </a>
                        </li>
                    ))}
            </ul>
        </div>
    )
}

export default Icons;