'use client';
import React, { useState, useMemo } from 'react';
import styles from './style.module.scss';
import NewsCards from '../newsCards/NewsCards';
import { Content } from '@prismicio/client';

type NewsPostDocument = Content.NewsPostDocument;

interface NewsListProps {
    initialNews: NewsPostDocument[];
}

const TABS = ['All', 'Most Popular', 'Hot right now', 'Most recent', 'Most read'];

const NewsList: React.FC<NewsListProps> = ({ initialNews }) => {
    const [activeTab, setActiveTab] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredNews = useMemo(() => {
        return initialNews.filter(newsItem => {
            const matchesSearch = newsItem.data.title?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesTag = activeTab === 'All' || (newsItem.data.tags || []).some(tagGroup => tagGroup.tag === activeTab);
            return matchesSearch && matchesTag;
        });
    }, [initialNews, searchTerm, activeTab]);

    return (
        <section className={styles.newsList}>
            <div className={styles.newsList__upper}>
                <h1 className={styles.title}>Browse by topic</h1>
                <div className={styles.searchBar}>
                    <input
                        type="text"
                        placeholder="Search for news..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className={styles.tabs}>
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.newsGrid}>
                {filteredNews.map((newsItem, index) => (
                    <NewsCards key={index} news={newsItem} />
                ))}
            </div>
        </section>
    );
};

export default NewsList;