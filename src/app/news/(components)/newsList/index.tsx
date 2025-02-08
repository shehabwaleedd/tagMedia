'use client';
import React, { useState, useMemo } from 'react';
import styles from './style.module.scss';
import NewsCards from '../newsCards/NewsCards';
import { Content } from '@prismicio/client';
import { motion, AnimatePresence } from 'framer-motion';

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
            <AnimatePresence mode="wait">
                <motion.div className={styles.newsGrid} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}>
                    {filteredNews.map((newsItem, index) => (
                        <motion.div key={newsItem.id || index} layout initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: -20 }} transition={{ duration: 0.4, delay: index * 0.05, ease: [0.4, 0, 0.2, 1], layout: { duration: 0.3, ease: "easeOut" } }}>
                            <NewsCards news={newsItem} />
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </section>
    );
};

export default NewsList;