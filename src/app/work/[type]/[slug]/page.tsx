import React from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { Metadata } from 'next';
import styles from './page.module.scss';
import axios from 'axios';
import { notFound } from 'next/navigation';
import { Person, CreativeWork } from 'schema-dts';
import { JsonLd } from 'react-schemaorg';

interface ItemData {
    _id: string;
    name: string;
    image?: {
        url: string;
    };
    sections?: {
        title: string;
        description: string;
        subTitle: string;
        image?: {
            url: string;
        };
    }[];
    // Add other fields as necessary
}

interface PageProps {
    params: {
        type: string;
        slug: string;
    };
}

async function fetchItems(endpoint: string) {
    try {
        const response = await axios.get(`https://tagmedia.onrender.com/${endpoint}`);
        return response.data.data;
    } catch (error) {
        console.error('Failed to fetch items:', error);
        return null;
    }
}

function slugToName(slug: string): string {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { type, slug } = params;
    const endpoint = type === 'actor' ? 'partner' : 'portfolio';
    const items: ItemData[] | null = await fetchItems(endpoint);

    if (!items) {
        return {
            title: 'Error',
            description: 'Failed to load data',
        };
    }

    const name = slugToName(slug);
    const item = items.find(item => item.name.toLowerCase() === name.toLowerCase());

    if (!item) {
        return {
            title: 'Not Found',
            description: 'The requested item was not found',
        };
    }

    const itemType = type === 'actor' ? 'Actor' : 'Series';
    const description = type === 'actor'
        ? `${name} is an actor at TAG Media Agency. Learn more about their work and achievements.`
        : `${name} is a series at TAG Media Agency. Explore their episodes and story.`;

    const imageUrl = item.image?.url || '/ob-image.jpg';

    return {
        title: `${name} | ${itemType} at TAG Media Agency`,
        description,
        openGraph: {
            title: `${name} | ${itemType} at TAG Media Agency`,
            description: `Learn more about ${name}, a talented ${itemType.toLowerCase()} at TAG Media Agency. Explore their work and achievements.`,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: `${name} at TAG Media Agency`,
                },
            ],
            type: 'profile',
        },
        twitter: {
            card: 'summary_large_image',
            title: `${name} | ${itemType} at TAG Media Agency`,
            description: `Learn more about ${name}, a talented ${itemType.toLowerCase()} at TAG Media Agency. Explore their work and achievements.`,
            images: [imageUrl],
        },
    };
}

export default async function WorkItem({ params }: PageProps) {
    const { type, slug } = params;
    const endpoint = type === 'actor' ? 'partner' : 'portfolio';

    const items: ItemData[] | null = await fetchItems(endpoint);

    if (!items) {
        return <div className={styles.error}>Failed to load data</div>;
    }

    const name = slugToName(slug);
    const item = items.find(item => item.name.toLowerCase() === name.toLowerCase());

    if (!item) {
        notFound(); // This will trigger the 404 page
    }

    const itemType = type === 'actor' ? 'Actor' : 'Portfolio Item';
    const canonicalUrl = `https://www.tagmediaagency.com/work/${type}/${slug}`;

    return (
        <>
            <Head>
                <link rel="canonical" href={canonicalUrl} />
            </Head>
            <div className={styles.itemPage}>
                <div className={styles.itemImageWrapper}>
                    <Image
                        src={item?.image?.url ?? '/noimage.png'}
                        alt={`${item.name} - ${itemType} at TAG Media Agency`}
                        width={1920}
                        height={1020}
                        priority
                    />
                </div>
                <section className={styles.lower}>
                    <h1 className={styles.itemTitle}>{item.name}</h1>
                    {item?.sections?.map((section, index) => (
                        <div key={index} className={styles.section}>
                            <h2>{section.title}</h2>
                            <p>{section.description}</p>
                            {section.image?.url && (
                                <div className={styles.sectionImageWrapper}>
                                    <Image
                                        src={section.image.url}
                                        alt={`${section.title} - ${item.name}`}
                                        width={1920}
                                        height={1020}
                                    />
                                </div>
                            )}
                            <h3>{section.subTitle}</h3>
                        </div>
                    ))}
                </section>
            </div>
            <JsonLd<Person | CreativeWork>
                item={{
                    "@context": "https://schema.org",
                    "@type": type === 'actor' ? "Person" : "CreativeWork",
                    "name": item.name,
                    "description": item.sections?.[0]?.description || `${item.name} is a ${itemType.toLowerCase()} at TAG Media Agency.`,
                    "image": item.image?.url,
                    "url": canonicalUrl,
                    ...(type === 'actor' && {
                        "jobTitle": "Actor",
                        "affiliation": {
                            "@type": "Organization",
                            "name": "TAG Media Agency"
                        }
                    })
                }}
            />
        </>
    );
}