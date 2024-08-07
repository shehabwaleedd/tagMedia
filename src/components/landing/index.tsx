'use client'
import React, { useEffect, useRef } from 'react';
import styles from './style.module.scss';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Trusted from '../trusted';
import Link from 'next/link';
import Icons from '../icons';
import { GoArrowUpRight } from "react-icons/go";
import global from "@/app/page.module.scss"

gsap.registerPlugin(ScrollTrigger);


const Landing: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     if (containerRef.current) {
    //         gsap.to(containerRef.current, {
    //             opacity: 0,
    //             ease: "none",
    //             scrollTrigger: {
    //                 trigger: containerRef.current,
    //                 start: "top top",
    //                 end: "bottom center",
    //                 scrub: true,
    //                 pin: true,
    //             }
    //         });
    //     }
    //     return () => {
    //         ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    //     };
    // }, []);




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
                    <Link href='/about' className={global.button}>
                        <span>
                            About us
                        </span>
                        <GoArrowUpRight />
                    </Link>
                    <Link href='/about' className={global.button}>
                        <span>
                            Contact us
                        </span>
                        <GoArrowUpRight />
                    </Link>
                </div>
                <Icons />
            </div>
            <Trusted />
        </section>
    );
};

export default Landing;
