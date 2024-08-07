import React from 'react';
import { serverUseNews } from '@/lib/serverAllNews';
import "@/components/news/NewsHomePage.scss";
import { NewsType } from '@/types/common';
import NewsCard from '../card';
import Slider from '../swiper';
import Link from 'next/link';
import { slugify } from '@/utils/slugify';

const NewsContent: React.FC<{ news: NewsType[] }> = ({ news }) => (
    <>
        {news.map((newsItem) => (
            <div key={newsItem._id} className="keen-slider__slide">
                <Link href={`/news/${slugify(newsItem.title)}`}>
                    <NewsCard news={newsItem} />
                </Link>
            </div>
        ))}
    </>
);

const NewsHomePage: React.FC = async () => {
    const news = await serverUseNews();

    if (!news) {
        return null;
    }

    const spliceNews = news.slice(0, 6);

    return (
        <section className="newsHomePage">
            <Slider content={<NewsContent news={spliceNews} />} type='news' />
        </section>
    );
};

export default NewsHomePage;