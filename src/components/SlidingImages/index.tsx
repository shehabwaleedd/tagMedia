'use client'
import { useRef } from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface Actor {
    image: {
        url: string;
    };
    name: string
}

interface ImagesSliderProps {
    actors: Actor[];
}

export default function ImagesSlider({ actors }: ImagesSliderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    const displayedActors = actors.slice(0, 8);
    const hasMoreActors = actors.length > 8;

    useGSAP(() => {
        if (containerRef.current && sliderRef.current) {
            const slider = sliderRef.current;

            // Set the width of the slider to accommodate displayed images
            const totalWidth = displayedActors.length * 25; // 25vw per image
            gsap.set(slider, {
                width: `${totalWidth}vw`,
                x: '50%', // Start from the right edge of the container
                y: '-50%',  // Center vertically
            });

            // Calculate dynamic height (adjust multiplier as needed)
            const dynamicHeight = `${Math.ceil(displayedActors.length / 4) * 50}vh`;
            gsap.set(containerRef.current, { height: dynamicHeight });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 50%",
                    end: "bottom bottom",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                }
            });

            tl.to(slider, {
                x: () => -(slider.scrollWidth - document.documentElement.clientWidth),
                ease: "none",
            });
        }
    }, { scope: containerRef, dependencies: [displayedActors] });

    return (
        <>
            <div ref={containerRef} className={styles.slidingImages}>
                <div ref={sliderRef} className={styles.slider}>
                    {displayedActors.map((actor, index) => (
                        <div key={index} className={styles.project}>
                            <div className={styles.imageContainer}>
                                <Image
                                    alt={"image"}
                                    src={actor.image.url}
                                    width={1000}
                                    height={1000}
                                />
                                <p>
                                    {actor.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}