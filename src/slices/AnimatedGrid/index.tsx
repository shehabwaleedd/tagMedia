'use client'
import React, { useState, useMemo, useCallback } from 'react';
import styles from './style.module.scss';
import Link from 'next/link';
import { PrismicDocument } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';

type ProjectGridProps = {
    posts: PrismicDocument<any, string, string>[];
};

type FilterCategory = 'all' | 'actor' | 'serie';


const AnimatedGrid = ({ posts }: ProjectGridProps) => {
    const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const handleFilterChange = useCallback((filter: FilterCategory) => {
        setActiveFilter(filter);
    }, []);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    }, []);

    const filteredPosts = useMemo(() => {
        let results = [...posts];

        if (activeFilter !== 'all') {
            results = results.filter(post => {
                return post.data.type === activeFilter;
            });
        }

        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            results = results.filter(post => {
                const title = typeof post.data.title === 'string'
                    ? post.data.title.toLowerCase()
                    : '';
                return title.includes(query);
            });
        }

        return results;
    }, [activeFilter, searchQuery, posts]);

    return (
        <div className={styles.projectContainer}>
            <div className={styles.searchBar}>
                <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
            </div>

            <div className={styles.tabs}>
                <button className={`${styles.tab} ${activeFilter === 'all' ? styles.active : ''}`} onClick={() => handleFilterChange('all')}>All Clients</button>
                <button className={`${styles.tab} ${activeFilter === 'actor' ? styles.active : ''}`} onClick={() => handleFilterChange('actor')}>Actors</button>
                <button className={`${styles.tab} ${activeFilter === 'serie' ? styles.active : ''}`} onClick={() => handleFilterChange('serie')}>Series</button>
            </div>

            <div className={styles.gridContainer}>
                {filteredPosts.length === 0 ? (
                    <div className={styles.noResults}>
                        <p>No clients found in this category</p>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {filteredPosts.map((post, index) => (
                            <ProjectCard key={`${post.uid}-${index}`} post={post} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const ProjectCard = React.memo(({ post }: { post: PrismicDocument<any, string, string> }) => {
    return (
        <Link href={`/clients/${post.uid}`} className={styles.newsCard}>
            <div className={styles.imageContainer}>
                <PrismicNextImage field={post.data.image} className={styles.image} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{post.data.title}</h3>
                {post.data.description && (
                    <div className={styles.description}>
                        <PrismicRichText field={post.data.description} />
                    </div>
                )}
            </div>
        </Link>
    );
});

ProjectCard.displayName = 'ProjectCard';

export default AnimatedGrid;