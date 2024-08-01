'use client'
import { useRef, useEffect } from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Actor {
    image: {
        url: string;
    };
}

interface ImagesSliderProps {
    actors: Actor[];
}

export default function ImagesSlider({ actors }: ImagesSliderProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    const displayedActors = actors.slice(0, 8);
    const hasMoreActors = actors.length > 8;

    useEffect(() => {
        if (containerRef.current && sliderRef.current) {
            const slider = sliderRef.current;
            
            // Set the width of the slider to accommodate displayed images
            const totalWidth = displayedActors.length * 25; // 25vw per image
            slider.style.width = `${totalWidth}vw`;

            // Calculate dynamic height (adjust multiplier as needed)
            const dynamicHeight = `${Math.ceil(displayedActors.length / 4) * 50}vh`;
            containerRef.current.style.height = dynamicHeight;

            gsap.set(slider, {
                x: '50%', // Start from the right edge of the container
                y: '-50%',  // Center vertically
            });

            gsap.to(slider, {
                x: () => -(slider.scrollWidth - document.documentElement.clientWidth),
                ease: "none",
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
        }
    }, [displayedActors]);

    return (
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
                        </div>
                    </div>
                ))}
            </div>
            {hasMoreActors && (
                <Link href="/work" className={styles.showMore}>
                    Show More
                </Link>
            )}
        </div>
    );
}