import React from 'react';
import Link from 'next/link';
import styles from './style.module.scss';
import { PrismicNextImage } from '@prismicio/next';
import { Content } from '@prismicio/client';

type NewsPostDocument = Content.NewsPostDocument;

interface NewsCardProps {
    news: NewsPostDocument;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
    return (
        <Link className={styles.newsCard} href={`/news/${news.uid}`}>
            <PrismicNextImage field={news.data.mainimage} className={styles.image} />
            <div className={styles.content}>
                <div className={styles.tags}>
                    {news.data.tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>{tag.tag}</span>
                    ))}
                </div>
                <h2 className={styles.title}>{news.data.title?.slice(0, 30)}...</h2>
                <p className={styles.description}>{news.data.description?.slice(0, 100)}...</p>
            </div>
        </Link>
    );
};

export default NewsCard;