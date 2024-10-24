'use client'

import React, { useRef, useEffect } from 'react';
import styles from './style.module.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { Content, isFilled, ImageField, KeyTextField, PrismicDocument } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';

type AnimatedGridProps = {
    posts: PrismicDocument<NewsItemData, string, string>[];
};

type NewsItemData = {
    image: ImageField;
    title: KeyTextField;
};

const AnimatedGrid: React.FC<AnimatedGridProps> = ({ posts }) => {
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

    const columns: PrismicDocument<NewsItemData, string, string>[][] = [[], [], []];
    posts.forEach((post, index) => {
        columns[index % 3].push(post);
    });

    return (
        <div className={styles.gridContainer}>
            <div className={styles.grid} ref={gridRef}>
                {columns.map((column, columnIndex) => (
                    <div key={columnIndex} className={`${styles.column} ${columnIndex === 1 ? styles.middleColumn : ''}`}>
                        {column.map((post, index) => {
                            return (
                                <Link className={styles.projectItem} key={index} href={`/clients/${post.uid}`}>
                                    <PrismicNextImage field={post.data.image} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                                    <div className={styles.projectItem__info}>
                                        <h3>{post.data.title}</h3>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnimatedGrid;