import React from 'react'
import { serverUseNews } from '@/lib/serverAllNews';
import styles from "./page.module.scss"
import { NewsType } from '@/types/common'
import NewsCard from '@/components/card';
import UpperDivider from './components/TopDivider';
import axios from 'axios'
import { Metadata } from 'next';


interface Variables {
    newsPageSeoTitle: string;
    newsPageSeoDescription: string;
    newsPageSeoKeywords: string;
    newsPageSeoImage: string;
}

async function getVariables(): Promise<Variables> {
    try {
        const response = await axios.get<Variables>(`${process.env.NEXT_PUBLIC_BASE_URL}/variable`, {
            headers: { 'Cache-Control': 'max-age=3600' } // Cache for 1 hour
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch variables:', error);
        throw error;
    }
}


export async function generateMetadata(): Promise<Metadata> {
    let variables: Variables;
    try {
        variables = await getVariables();
    } catch (error) {
        console.error('Failed to fetch variables:', error);
        // Fallback to default values if fetch fails
        variables = {
            newsPageSeoTitle: "Latest News and Insights - Tag Media",
            newsPageSeoDescription: "Stay updated with the latest news, trends, and insights from Egypt's leading digital marketing and influencer agency, Tag Media.",
            newsPageSeoKeywords: "latest news, digital marketing news, influencer marketing updates, brand strategy news, Tag Media Egypt",
            newsPageSeoImage: "https://res.cloudinary.com/dfxz1hh8s/image/upload/v1710376514/iiqbbhbi0ccgdsm8xtl6.jpg",
        };
    }

    return {
        title: variables.newsPageSeoTitle,
        description: variables.newsPageSeoDescription,
        themeColor: "#000000",
        openGraph: {
            title: variables.newsPageSeoTitle,
            description: variables.newsPageSeoDescription,
            type: "website",
            images: {
                url: variables.newsPageSeoImage,
                alt: "Tag Media",
                width: 1200,
                height: 630,
            },
            siteName: "Tag Media",
        },
        twitter: {
            card: "summary_large_image",
            site: "@tagmediaeg",
            title: variables.newsPageSeoTitle,
            description: variables.newsPageSeoDescription,
            images: {
                url: variables.newsPageSeoImage,
                alt: "Tag Media",
                width: 1200,
                height: 630,
            },
        },
        keywords: variables.newsPageSeoKeywords,
        alternates: {
            canonical: "https://www.tagmediaeg.com/about",
        },
    };
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
