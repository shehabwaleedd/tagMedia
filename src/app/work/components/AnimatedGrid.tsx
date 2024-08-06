'use client'

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './style.module.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface Project {
    name: string;
    image: {
        url: string;
    };
    role: string;
    year: string;
}

interface AnimatedGridProps {
    projects: Project[];
}

const AnimatedGrid: React.FC<AnimatedGridProps> = ({ projects }) => {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (typeof window !== 'undefined' && gridRef.current) {
            const columns = gsap.utils.toArray<HTMLDivElement>(`.${styles.column}`);
            
            // Create a match media instance
            let mm = gsap.matchMedia();

            mm.add("(min-width: 1024px)", () => {
                // Set initial position for middle column
                gsap.set(columns[1], { y: '5%' });

                // Animate all columns
                gsap.to(columns[0], {
                    y: '-40%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    }
                });

                gsap.to(columns[2], {
                    y: '-40%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    }
                });

                gsap.to(columns[1], {
                    y: '-55%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    }
                });
            });

            // For screens smaller than 1024px, reset the positions
            mm.add("(max-width: 1023px)", () => {
                gsap.set(columns, { clearProps: "all" });
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    // Split projects into three columns
    const columns: Project[][] = [[], [], []];
    projects.forEach((project, index) => {
        columns[index % 3].push(project);
    });

    return (
        <div className={styles.grid} ref={gridRef}>
            {columns.map((column, columnIndex) => (
                <div 
                    key={columnIndex} 
                    className={`${styles.column} ${columnIndex === 1 ? styles.middleColumn : ''}`}
                >
                    {column.map((project, index) => (
                        <div className={styles.projectItem} key={index}>
                            <div className={styles.projectItem__image}>
                                <Image 
                                    src={project.image.url} 
                                    width={800} 
                                    height={800} 
                                    alt={project.name} 
                                    placeholder='blur' 
                                    blurDataURL={project.image.url} 
                                />
                            </div>
                            <div className={styles.projectItem__info}>
                                <h3>{project.name}</h3>
                                <p>{project.role} - {project.year}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default AnimatedGrid;