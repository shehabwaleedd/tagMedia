'use client'
import { useState } from 'react';
import Image from 'next/image';
import styles from './style.module.scss';

const BentoGrid = ({ actors }: { actors: any[] }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className={styles.bentoGrid}>
            {actors.map((actor, index) => (
                <div
                    key={index}
                    className={`${styles.bentoItem} ${styles[`item${index + 1}`]}`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <div className={styles.imageWrapper}>
                        <Image
                            src={actor.image.url}
                            alt={actor.name}
                            layout="fill"
                            objectFit="cover"
                            className={styles.actorImage}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                    <div className={`${styles.actorInfo} ${hoveredIndex === index ? styles.active : ''}`}>
                        <h3>{actor.name}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BentoGrid;