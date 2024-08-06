import React from 'react';
import Image from 'next/image';
import { serverDynamicFetch } from '@/lib/serverDynamicFetch';
import styles from "./page.module.scss";
import Link from 'next/link';
import ImageSlider from '@/components/imageSlider/ImageSlider';
import UnifiedNewsComponent from '../components/unifiedNewsComponent';
import Navigation from "../components/Navigation"
export async function generateMetadata({ params }: { params: { slug: string } }) {
    const query = `blog/${decodeURIComponent(params.slug)}`;
    const newsDetails = await serverDynamicFetch(query);
    if (!newsDetails) {
        return null;
    }

    const title = newsDetails?.seoTitle
    const description = newsDetails?.seoDescription
    const images = newsDetails?.seoImage.url || "/assets/covers/news cover 2.webp"
    const keywords = newsDetails?.seoKeywords
    const url = `https://tagmedia.me/news/${params.slug}`

    return {
        title,
        description,
        images,
        keywords,
        url,
        type: "article",
        openGraph: {
            type: "article",
            url,
            title,
            description,
            images,
        },
        twitter: {
            title,
            description,
            images,
            url,
        }
    }

}


export default async function NewsDetails({ params }: { params: { slug: string } }) {
    const query = `blog/${decodeURIComponent(params.slug)}`;
    const newsDetails = await serverDynamicFetch(query);
    if (!newsDetails) {
        return null;
    }

    return (
        <main className={styles.details}>
            <section className={styles.details__upper}>
                <Image src={newsDetails?.mainImg?.url} alt="news" width={1920} height={1080} />
            </section>
            <section className={styles.details__content}>
                <Navigation newsDetails={newsDetails} />
                <h1>{newsDetails?.title}</h1>
                <p>{newsDetails?.date}</p>
            </section>
            <section className={styles.details__upper_content}>
                <div>
                    {newsDetails?.sections.map((section: any, index: number) => {
                        return (
                            <div key={index} className={styles.blog_content}>
                                <h2>{section.title}</h2>
                                <p className={styles.subtitle}>{section.subTitle}</p>
                                <p>{section.description}</p>
                                {section?.image && <Image src={section.image?.url} alt="news" width={1920} height={1080} />}
                            </div>
                        )
                    })}
                </div>
                {newsDetails?.images && <ImageSlider images={newsDetails.images} name='slider' />}
            </section>
            <UnifiedNewsComponent type='recommended' />
            <UnifiedNewsComponent type='like' />
        </main>
    );
}
