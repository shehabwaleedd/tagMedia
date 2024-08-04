import React from 'react'
import styles from "./style.module.scss"
import { NewsType } from '@/types/common'
import { serverUseNewsQuery } from '@/lib/news/serverUseNewsQuery'

import NewsCard from '@/components/card'
interface NewsProps {
    category?: string;
    type?: string; 
}

export default async function UnifiedNewsComponent({ category, type = 'recommended' }: NewsProps) {
    const query = category ? `category=${category}` : '';
    const newsData = await serverUseNewsQuery(query);

    const shuffleAndSliceTo3 = (array: NewsType[]) => {
        if (!Array.isArray(array)) {
            console.error("Expected an array, but received:", array);
            return [];
        }
        const shuffledArray = [...array].sort(() => Math.random() - 0.5);
        return shuffledArray.slice(0, 3);
    }

    // Ensure we're working with an array
    const newsArray = Array.isArray(newsData?.data?.result) 
        ? shuffleAndSliceTo3(newsData.data.result)
        : [];

    if (newsArray.length === 0) {
        return null;
    }

    return (
        <section className={styles.recommendedTours}>
            <div className={styles.recommendedTours__container}>
                {/* <NewsCards data={newsArray} title={`${type === 'recommended' ? 'Recommended News' : 'News You Might Like'}`} /> */}

                {type === 'recommended' && (
                    <h2>Recommended News</h2>
                )}
                {type === 'similar' && (
                    <h2>News You Might Like</h2>
                )}
                
                {newsArray.map((news: NewsType, index: number) => (
                    <div key={index} className={styles.recommendedTours__container_card}>
                        <NewsCard news={news} />
                    </div>
                ))}
            </div>
        </section>
    )
}