import React from 'react'
import { serverUseNews } from '@/lib/serverAllNews';
import styles from "./page.module.scss"
import { NewsType } from '@/types/common'
import NewsCard from '@/components/card';
import UpperDivider from './components/TopDivider';

export async function generateMetadata() {
    return {
        title: "News - Tag Media",
        description: "Explore the latest news and updates from TAG Media. Stay informed with our in-depth articles covering industry trends, company updates, and more.",
        images: "/assets/covers/news_cover.webp",
        url: "https://tagmedia.me/news",
        type: "website",
        openGraph: {
            type: "website",
            url: "https://tagmedia.me/news",
            title: "News",
            description: "Explore the latest news and updates from TAG Media. Stay informed with our in-depth articles covering industry trends, company updates, and more.",
            images: "/assets/covers/news_cover.webp",
        },
        twitter: {
            title: "News",
            description: "Explore the latest news and updates from TAG Media. Stay informed with our in-depth articles covering industry trends, company updates, and more.",
            images: "/assets/covers/news_cover.webp",
            url: "https://tagmedia.me/news",
        }

    }
}


export default async function News() {
    const data = await serverUseNews()



    return (
        <main className={styles.news}>
            <UpperDivider main="News" />

            <section className={styles.news__container}>
                {data.map((news: NewsType, index: number) => (
                    <div key={index} className={styles.news__container_card}>
                        <NewsCard news={news} />
                    </div>
                ))}
            </section>
        </main>
    )
}
