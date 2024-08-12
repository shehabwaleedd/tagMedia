'use client'
import React, { useState, useEffect } from 'react';
import styles from "./style.module.scss"
import { motion, AnimatePresence } from 'framer-motion';
import useWindowSize from '@/hooks/useWindowWidth';
import socialIcons from '../navbar/Header/Nav/socialIcons';

const Icons: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentIconIndex, setCurrentIconIndex] = useState<number>(0);
    const { isMobile, isTablet } = useWindowSize();
    const isTouchDevice = isMobile || isTablet;

    useEffect(() => {
        if (!isOpen) {
            const intervalId = setInterval(() => {
                setCurrentIconIndex((prevIndex) => (prevIndex + 1) % socialIcons.length);
            }, 3000);

            return () => clearInterval(intervalId);
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
        <motion.div 
            className={styles.iconContainer} 
            onMouseEnter={() => handleHover(true)} 
            onMouseLeave={() => handleHover(false)}
            onClick={handleToggle}
        >
            <button  className={`${styles.icon} ${styles.mainIcon}`}  aria-label="Toggle social media icons">
                <CurrentIcon />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul 
                        className={styles.iconMenu}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1}}
                        exit={{ opacity: 0 }}
                        transition={{ staggerChildren: 0.05, delayChildren: 0.2 }}
                    >
                        {socialIcons
                            .filter((_, index) => index !== currentIconIndex)
                            .map(({ Icon, href, label }, index) => (
                                <motion.li 
                                    key={index}
                                    initial={{ opacity: 0}}
                                    animate={{ opacity: 1}}
                                    exit={{ opacity: 0}}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.a
                                        href={href}
                                        className={styles.icon}
                                        onClick={(e) => handleIconClick(href, e)}
                                        aria-label={label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Icon />
                                    </motion.a>
                                </motion.li>
                            ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default Icons;