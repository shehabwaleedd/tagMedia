'use client'
import React, { useEffect, useRef } from 'react';
import styles from "./style.module.scss"
import MiniServices from '../miniServices'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Brief = () => {
    const briefContainerRef = useRef(null);

    // useEffect(() => {
    //     if (briefContainerRef.current) {
    //         const tl = gsap.timeline({
    //             scrollTrigger: {
    //                 trigger: briefContainerRef.current,
    //                 start: "top top",
    //                 end: "bottom 50%",
    //                 scrub: true,
    //                 pin: true,
    //                 pinSpacing: false,
    //                 anticipatePin: 1
    //             }
    //         });

    //         tl.fromTo(briefContainerRef.current, { opacity: 1 }, { opacity: 0 });
    //     }

    //     return () => {
    //         ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    //     };
    // }, []);

    return (
        <section className={styles.brief} ref={briefContainerRef}>
            <div className={styles.content}>
                <h2 className={styles.brief__title}>Tag Media</h2>
                <span>
                    We are one of the marketing and creative consultancy agencies in Egypt and the Middle East. We work closely with our partners to manage their publicity and social media presence. We build awareness campaigns for our clients that drive more traffic and engagement.
                </span>
                <MiniServices />
            </div>
        </section>
    )
}

export default Brief