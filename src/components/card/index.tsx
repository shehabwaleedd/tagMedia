'use client'

import React from 'react'
import { NewsType } from '@/types/common';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from "./style.module.scss"

const NewsCard: React.FC<{ news: NewsType }> = ({ news }) => {

    const router = useRouter();

    if (!news) {
        console.error("News data is missing.");
        return null;
    }

    const handleTourClick = (slug: string) => {
        router.push(`/news/${slug}`);
    }

    return (
        <div className={styles.news__container_card} onClick={() => handleTourClick(news.slug)}>
            <div className={styles.image}>
                <Image
                    src={news.mainImg.url}
                    alt={news.title}
                    width={500}
                    height={250}
                    sizes="(min-width: 1040px) calc(30vw - 35px), (min-width: 780px) 41.25vw, 90vw"
                    priority
                />
                <div className={styles.category}>
                    <p>{news.category}</p>
                </div>
            </div>
            <div className={styles.bottom}>
                <span className={styles.date}>
                    {new Date(news.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric"})}
                </span>
                <h3>{news.title.slice(0, 50)}...</h3>
                <p className={styles.subtitle}>{news.subTitle.replace(/<[^>]*>/g, '').slice(0, 150)}...</p>
                <div className={styles.btnDiv}>
                    <button onClick={() => handleTourClick(news.slug)}>Read More</button>
                </div>
            </div>
        </div>
    )
}

export default NewsCard;
