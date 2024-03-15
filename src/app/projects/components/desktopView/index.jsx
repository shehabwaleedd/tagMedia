import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image';
import getChars from '@/animation/animatedHeaders/getChars';
import gsap from 'gsap';
import styles from "../../page.module.scss"


const DesktopProjects = ({ duplicatedProjects, handleProjectClick, data }) => {
    const sliderWrapperRef = useRef(null);
    const projectWidth = 1500; // Replace with actual width
    const viewWidth = window.innerWidth;

    useEffect(() => {
        const sliderWrapper = sliderWrapperRef.current;
        sliderWrapper.style.display = 'flex'; // Make sure the display is set correctly

        // Center the slider initially
        const initialOffsetX = (viewWidth / 2) - (projectWidth / 2);
        gsap.set(sliderWrapper, { x: -initialOffsetX });

        const maxScroll = projectWidth * (duplicatedProjects.length / 2); // Adjust the divisor based on duplication
        let position = initialOffsetX;

        const updatePosition = (deltaY) => {
            position -= deltaY * 2; // Speed adjustment
            if (position > 0 || Math.abs(position) >= maxScroll) {
                position = position > 0 ? -maxScroll : 0; // Reset for infinite loop
            }
            gsap.to(sliderWrapper, { x: position, ease: "none" });
        };

        const wheelHandler = (e) => {
            e.preventDefault();
            updatePosition(e.deltaY);
        };

        window.addEventListener("wheel", wheelHandler, { passive: false });

        return () => window.removeEventListener("wheel", wheelHandler);
    }, []);
    return (
        <div className={styles.slider}>
            <div className={styles.slider_wrapper} ref={sliderWrapperRef} >
                {duplicatedProjects.map((project, index) => (
                    <article key={index} className={styles.slider_wrapper_slide} onClick={() => handleProjectClick(index)}>
                        <div className={styles.slider_wrapper_slide_image}>
                            <Image src={project.image} alt={project.name} width={500} height={500} quality={100} />
                        </div>
                        <div className={styles.slider_wrapper_slide_content}>
                            <h3>{project.name}</h3>
                            <p>{project.year}</p>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default DesktopProjects