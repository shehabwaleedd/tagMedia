'use client'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAllNews } from '@/lib/useAllNews';
import styles from '../../dashboardNews/style.module.scss';
import DashboardNews from '@/components/dashboardNews';
import { NewsType } from '@/types/common';

const AllTours: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { news, loading, totalPages } = useAllNews(currentPage);
    const [allNews, setAllNews] = useState<NewsType[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        if (news) {
            setAllNews((prevNews) => [...prevNews, ...news]);
        }
    }, [news]);

    useEffect(() => {
        if (currentPage >= totalPages) {
            setHasMore(false);
        }
    }, [currentPage, totalPages]);

    const observer = useRef<IntersectionObserver | null>(null);
    const lastNewsElementRef = useCallback((node: Element | null) => {
        if (loading || !hasMore) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setCurrentPage((prevPage) => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    return (
        <section>
            <DashboardNews news={allNews} title="All News" loading={loading} />
            {loading && <div>Loading...</div>}
            <div ref={lastNewsElementRef}></div>
        </section>
    );
};

export default AllTours;
