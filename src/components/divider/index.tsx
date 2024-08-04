'use client'
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from "./style.module.scss"
import useWindowSize from '@/hooks/useWindowWidth';

const Divider = ({ main }: { main: string }) => {

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            gsap.to(containerRef.current, {
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom 40%",
                    scrub: true,
                    pin: true,
                }
            });
        }
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);


    return (
        <section className={styles.divider} ref={containerRef}>
            <h2>
                {main}
            </h2>
        </section>
    )
}

export default Divider