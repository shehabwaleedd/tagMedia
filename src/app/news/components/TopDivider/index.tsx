'use client'
import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from "@/components/divider/style.module.scss";
import { usePathname } from 'next/navigation';

const UpperDivider = ({ main }: { main: string }) => {
    const pathname = usePathname();
    const containerRef = useRef<HTMLDivElement>(null);
    const [topOffset, setTopOffset] = useState(0);

    const isHomePage = pathname === '/';

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const calculateTopOffset = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setTopOffset(rect.top + window.scrollY);
            }
        };

        calculateTopOffset();
        window.addEventListener('resize', calculateTopOffset);

        if (containerRef.current) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: () => `top+=${topOffset}px top`,
                    end: () => isHomePage ? `bottom+=${topOffset}px 30%` : `bottom+=${topOffset}px 50%`,
                    scrub: true,
                    pin: true,
                    pinSpacing: false,
                    invalidateOnRefresh: true,
                }
            });

            tl.to(containerRef.current, {
                opacity: 0,
                ease: "none",
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            window.removeEventListener('resize', calculateTopOffset);
        };
    }, [isHomePage, topOffset]);

    return (
        <section className={styles.divider} ref={containerRef}>
            <h2>
                {main}
            </h2>
        </section>
    )
}

export default UpperDivider