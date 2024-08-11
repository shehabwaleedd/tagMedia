import React from 'react';
import { serverUseNews } from '@/lib/serverAllNews';
import "@/components/news/NewsHomePage.scss";
import { NewsType } from '@/types/common';
import NewsCard from '../card';
import Slider from '../swiper';
import Link from 'next/link';

const NewsContent: React.FC<{ news: NewsType[] }> = ({ news }) => (
    <>
        {news.map((newsItem) => (
            <div key={newsItem._id} className="keen-slider__slide">
                <Link href={`/news/${newsItem.slug}`}>
                    <NewsCard news={newsItem} />
                </Link>
            </div>
        ))}
    </>
);

const NewsHomePage = async () => {
    const news = await serverUseNews();

    if (!news) {
        return null;
    }

    return (
        <section className="newsHomePage">
            <Slider content={<NewsContent news={news} />} type='news' />
        </section>
    );
};

export default NewsHomePage;