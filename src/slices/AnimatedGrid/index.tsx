'use client'
import React, { useMemo } from 'react';
import styles from './style.module.scss';
import Link from 'next/link';
import { ImageField, KeyTextField, PrismicDocument } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { motion, useScroll, useTransform } from 'framer-motion';
import useWindowSize from '@/hooks/useWindowWidth';

type AnimatedGridProps = {
    posts: PrismicDocument<NewsItemData, string, string>[];
};

type NewsItemData = {
    image: ImageField;
    title: KeyTextField;
};

const AnimatedGrid = ({ posts }: AnimatedGridProps) => {
    const { windowWidth } = useWindowSize();
    const isDesktop = windowWidth >= 1221;

    const { scrollYProgress } = useScroll();
    const column1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);
    const column2Y = useTransform(scrollYProgress, [0, 1], ['2.5%', '-10%']);
    const column3Y = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);

    const columns = useMemo(() => {
        const cols: PrismicDocument<NewsItemData, string, string>[][] = [[], [], []];
        posts.forEach((post, index) => {
            if (isDesktop) {
                cols[index % 3].push(post);
            } else {
                cols[0].push(post);
            }
        });
        return cols;
    }, [posts, isDesktop]);

    const renderPost = (post: PrismicDocument<NewsItemData, string, string>, index: number) => (
        <Link className={styles.projectItem} key={index} href={`/clients/${post.uid}`}>
            <PrismicNextImage field={post.data.image} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            <div className={styles.projectItem__info}>
                <h3>{post.data.title}</h3>
            </div>
        </Link>
    );

    if (!isDesktop) {
        return (
            <div className={styles.gridContainer}>
                <div className={styles.grid}>
                    <div className={styles.column}>
                        {posts.map((post, index) => renderPost(post, index))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.gridContainer}>
            <div className={styles.grid}>
                <motion.div className={styles.column} style={{ y: column1Y }}>
                    {columns[0].map((post, index) => renderPost(post, index))}
                </motion.div>
                <motion.div className={`${styles.column} ${styles.middleColumn}`} style={{ y: column2Y }}>
                    {columns[1].map((post, index) => renderPost(post, index))}
                </motion.div>
                <motion.div className={styles.column} style={{ y: column3Y }}>
                    {columns[2].map((post, index) => renderPost(post, index))}
                </motion.div>
            </div>
        </div>
    );
};

export default React.memo(AnimatedGrid);