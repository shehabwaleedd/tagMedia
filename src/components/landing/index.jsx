'use client'
import React, { useState, useEffect, useRef } from 'react';
import styles from './style.module.scss';
import { BsYoutube, BsInstagram, BsTwitterX, BsTiktok, BsSnapchat } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { useScroll, motion, useTransform, AnimatePresence } from 'framer-motion';
import getChars from "@/animation/animatedHeaders/getChars";
import useWindowWidth from '@/hooks/useWindowWidth';
import gsap from 'gsap';

// Define the social media icons and their links
const socialMediaIcons = [
    { icon: <FaFacebookF />, link: "https://www.facebook.com" },
    { icon: <BsYoutube />, link: "https://www.youtube.com" },
    { icon: <BsInstagram />, link: "https://www.instagram.com" },
    { icon: <BsTwitterX />, link: "https://www.twitter.com" },
    { icon: <BsTiktok />, link: "https://www.tiktok.com" },
    { icon: <FaLinkedinIn />, link: "https://www.linkedin.com" },
    { icon: <BsSnapchat />, link: "https://www.snapchat.com" },
];

const scaleAnimation = {
    initial: { scale: 0, x: "-50%", y: "-50%" },
    enter: { scale: 1, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
    closed: { scale: 0, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } }
};

const Landing = () => {
    const [currentIconIndex, setCurrentIconIndex] = useState(0);
    const windowWidth = useWindowWidth();
    const container = useRef(null);
    const videoRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const cursor = useRef(null);
    const cursorLabel = useRef(null);
    const [videoOpen, setVideoOpen] = useState(false);

    const handleVideoOpen = () => {
        setVideoOpen(!videoOpen);
    };

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["end start", "end center"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [400, 0]);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        videoElement.addEventListener('mouseenter', handleMouseEnter);
        videoElement.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            videoElement.removeEventListener('mouseenter', handleMouseEnter);
            videoElement.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    useEffect(() => {
        let xMoveCursor = gsap.quickTo(cursor.current, "left", { duration: 0.5, ease: "power3" });
        let yMoveCursor = gsap.quickTo(cursor.current, "top", { duration: 0.5, ease: "power3" });
        let xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", { duration: 0.45, ease: "power3" });
        let yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", { duration: 0.45, ease: "power3" });

        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const videoContainerRef = videoRef.current;
            const videoContainerPosition = videoContainerRef.getBoundingClientRect();
            const y = clientY - videoContainerPosition.top;
            const x = clientX - videoContainerPosition.left;
            xMoveCursor(x);
            yMoveCursor(y);
            xMoveCursorLabel(x);
            yMoveCursorLabel(y);
        });
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIconIndex(currentIconIndex => (currentIconIndex + 1) % socialMediaIcons.length);
        }, 700);
        return () => clearInterval(intervalId);
    }, []);

    const handleIconClick = (link) => {
        window.open(link, '_blank');
    };

    return (
        <AnimatePresence mode="wait">
            <>
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
                                    <div onClick={() => handleIconClick(socialMediaIcons[currentIconIndex].link)}>
                                        {socialMediaIcons[currentIconIndex].icon}
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
                                    <div className={styles.landing__content_icons_mobile} onClick={() => handleIconClick(socialMediaIcons[currentIconIndex].link)}>
                                        {socialMediaIcons[currentIconIndex].icon}
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                    <div className={styles.stripe}></div>
                    <div className={styles.landing__middle}>
                        <span>
                            Transforming brands for growth
                        </span>
                        <span>
                            What can we do for you?
                        </span>
                    </div>
                    <div className={styles.landing__lower} ref={videoRef} onClick={handleVideoOpen} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                        <video src="https://res.cloudinary.com/dfxz1hh8s/video/upload/v1710317866/mainVideo_br5ern.mp4" loop autoPlay muted playsInline security='restricted' preload="metadata" />
                        <motion.div ref={cursor} className={styles.cursor} variants={scaleAnimation} initial="initial" animate={isHovering ? "enter" : "closed"}></motion.div>
                        <motion.div ref={cursorLabel} className={styles.cursorLabel} variants={scaleAnimation} initial="initial" animate={isHovering ? "enter" : "closed"}>View</motion.div>
                    </div>
                </section>
                {videoOpen && (
                    <motion.div key="videoOpenedId" className={styles.videoModal} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <video src="https://res.cloudinary.com/dfxz1hh8s/video/upload/v1710317866/mainVideo_br5ern.mp4" controls autoPlay playsInline security='restricted' preload="metadata" />
                        <div className={styles.videoModal__close} onClick={handleVideoOpen}>
                            <span>X</span>
                        </div>
                    </motion.div>
                )}
            </>
        </AnimatePresence>
    );
};

export default Landing;
