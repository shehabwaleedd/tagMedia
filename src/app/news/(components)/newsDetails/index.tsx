import React from 'react';
import Link from 'next/link';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import { Content } from '@prismicio/client';
import styles from './style.module.scss';
import Share from '../share';
import BreadCrumbs from '../breadCrumbs/BreadCrumbs';

type NewsPostDocument = Content.NewsPostDocument;

interface NewsDetailsProps {
    news: NewsPostDocument;
    relatedArticles?: NewsPostDocument[];
}

const NewsDetails: React.FC<NewsDetailsProps> = ({ news, relatedArticles }) => {


    return (
        <article className={styles.newsDetails}>
            <section className={styles.header}>
                <BreadCrumbs newsDetails={news} />
                <h1 className={styles.title}>{news.data.title}</h1>
            </section>

            <div className={styles.mainContent}>
                {news.data.mainimage && (
                    <PrismicNextImage field={news.data.mainimage} className={styles.mainImage} />
                )}
                <aside className={styles.sidebar}>
                    <Share news={news} />
                    {news.tags && news.tags.length > 0 && (
                        <div className={styles.tags}>
                            <h3>Tags</h3>
                            {news.tags.map((tag, index) => (
                                <span key={index} className={styles.tag}>#{tag}</span>
                            ))}
                        </div>
                    )}
                </aside>
                <section className={styles.content}>
                    {news.data.description && (
                        <p className={styles.description}>{news.data.description}</p>
                    )}
                    {news.data.content && (
                        <PrismicRichText field={news.data.content} />
                    )}
                </section>
            </div>
        </article>
    );
};

export default NewsDetails;
