'use client'

import React from 'react'
import { NewsType } from '@/types/common';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from "./style.module.scss"
import { GoArrowUpRight } from "react-icons/go";

const NewsCard: React.FC<{ news: NewsType }> = ({ news }) => {
    const router = useRouter();

    if (!news) {
        console.error("News data is missing.");
        return null;
    }

    const handleTourClick = (slug: string) => {
        if (slug) {
            router.push(`/news/${slug}`);
        }
    }

    const formatTitle = (title: string | undefined) => {
        if (!title) return '';
        return title.length <= 15 ? title : `${title.slice(0, 15)}...`;
    }

    const formatDescription = (description: string | undefined) => {
        if (!description) return '';
        // Remove HTML tags and extra whitespace
        const cleanText = description.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
        return cleanText.length <= 150 ? cleanText : `${cleanText.slice(0, 150)}...`;
    }

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return '';
        try {
            return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
        } catch (error) {
            console.error("Error formatting date:", error);
            return '';
        }
    }

    return (
        <div className={styles.news__container_card} onClick={() => handleTourClick(news.slug || '')}>
            <div className={styles.image}>
                <Image
                    src={news?.mainImg?.url || '/placeholder-image.jpg'}
                    alt={news.title || 'News image'}
                    width={500}
                    height={250}
                    sizes="(min-width: 1040px) calc(30vw - 35px), (min-width: 780px) 41.25vw, 90vw"
                    priority
                />
                <div className={styles.category}>
                    <p>{news.category || 'Uncategorized'}</p>
                </div>
            </div>
            <div className={styles.bottom}>
                <span className={styles.date}>
                    {formatDate(news.createdAt)}
                </span>
                <h3>{formatTitle(news.title)}</h3>
                <p className={styles.subtitle}>
                    {formatDescription(news.subTitle)}
                </p>
                <div className={styles.btnDiv}>
                    <button onClick={(e) => { e.stopPropagation(); handleTourClick(news.slug || '')}}>
                        <GoArrowUpRight />
                        <span> Read More </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewsCard;