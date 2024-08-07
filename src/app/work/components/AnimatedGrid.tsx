'use client'

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './style.module.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { slugify } from '@/utils/slugify';

interface Project {
    name: string;
    image: {
        url: string;
    };
    role: string;
    year: string;
    type: 'partner' | 'portfolio';
}

interface AnimatedGridProps {
    projects: Project[];
    title: string;
    typeUrlMap: Record<'partner' | 'portfolio', string>;
}

const AnimatedGrid: React.FC<AnimatedGridProps> = ({ projects, title, typeUrlMap }) => {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (typeof window !== 'undefined' && gridRef.current) {
            const columns = gsap.utils.toArray<HTMLDivElement>(`.${styles.column}`);

            let mm = gsap.matchMedia();

            mm.add("(min-width: 1024px)", () => {
                gsap.set(columns[1], { y: '2.5%' });

                columns.forEach((column, index) => {
                    gsap.to(column, {
                        y: index === 1 ? '-10%' : '-5%',
                        ease: 'none',
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        }
                    });
                });
            });

            mm.add("(max-width: 1023px)", () => {
                gsap.set(columns, { clearProps: "all" });
            });
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const columns: Project[][] = [[], [], []];
    projects.forEach((project, index) => {
        columns[index % 3].push(project);
    });

    return (
        <div className={styles.gridContainer}>
            <div className={styles.grid} ref={gridRef}>
                {columns.map((column, columnIndex) => (
                    <div key={columnIndex} className={`${styles.column} ${columnIndex === 1 ? styles.middleColumn : ''}`}>
                        {column.map((project, index) => (
                            <Link className={styles.projectItem} key={index} href={`/work/${typeUrlMap[project.type]}/${slugify(project.name)}`}>
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
                                </div>
                            </Link>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnimatedGrid;