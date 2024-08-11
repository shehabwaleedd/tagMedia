import React from 'react';
import axios from 'axios';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';
import { JsonLd } from 'react-schemaorg';
import styles from './page.module.scss';
import AnimatedGrid from '../components/AnimatedGrid';
import UpperDivider from '@/app/news/components/TopDivider';

interface Item {
    _id: string;
    name: string;
    image?: {
        url: string;
    };
    year?: string;
    description?: string;
}

interface Project {
    name: string;
    image: {
        url: string;
    };
    role: string;
    year: string;
    type: 'partner' | 'portfolio' | 'production';
    description?: string;
}

interface PageProps {
    params: {
        type: string;
    };
}

async function fetchItems(type: string) {
    let endpoint;
    switch (type) {
        case 'actors':
            endpoint = 'partner';
            break;
        case 'series':
            endpoint = 'portfolio';
            break;
        case 'production-companies':
            endpoint = 'workedWith';
            break;
        default:
            throw new Error(`Invalid type: ${type}`);
    }

    try {
        const response = await axios.get(`https://tagmedia.onrender.com/${endpoint}`);
        return response.data.data;
    } catch (error) {
        console.error(`Failed to fetch ${type}:`, error);
        return [];
    }
}

function getTitle(type: string): string {
    switch (type) {
        case 'production-companies':
            return 'Production Companies';
        case 'actors':
            return 'Influencers';
        case 'series':
            return 'Digital Campaigns';
        default:
            return type.charAt(0).toUpperCase() + type.slice(1);
    }
}

function getDescription(type: string): string {
    switch (type) {
        case 'production-companies':
            return 'Discover the innovative production companies partnering with Tag Media to create groundbreaking digital content in Egypt.';
        case 'actors':
            return 'Meet the influential personalities working with Tag Media to shape digital marketing trends in Egypt and beyond.';
        case 'series':
            return 'Explore Tag Media\'s portfolio of successful digital campaigns transforming brands and driving growth in Egypt.';
        default:
            return 'Tag Media: Egypt\'s pioneer in digital and influencer marketing, transforming brands to power growth.';
    }
}

export async function generateMetadata(
    { params }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const type = params.type;
    const title = getTitle(type);
    const description = getDescription(type);

    return {
        title: `${title} | Tag Media - Egypt's Digital Marketing Pioneer`,
        description,
        keywords: ['Tag Media', 'Egypt', 'digital marketing', 'influencer marketing', title, 'brand growth'],
        openGraph: {
            title: `${title} | Tag Media - Transforming Brands in Egypt`,
            description,
            type: 'website',
            url: `https://www.tagmediaagency.com/work/${type}`,
            images: [
                {
                    url: 'https://www.tagmediaagency.com/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'Tag Media - Egypt\'s Digital Marketing Pioneer',
                }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | Tag Media - Egypt's Digital Marketing Leader`,
            description,
            images: ['https://www.tagmediaagency.com/twitter-image.jpg'],
        },
        alternates: {
            canonical: `https://www.tagmediaagency.com/work/${type}`,
        },
    };
}

export default async function WorkListPage({ params }: PageProps) {
    const { type } = params;
    const items: Item[] = await fetchItems(type);

    if (type !== 'actors' && type !== 'series' && type !== 'production-companies') {
        notFound();
    }

    if (!items) {
        return <div className={styles.error}>Failed to load data</div>;
    }

    const title = getTitle(type);
    const description = getDescription(type);
    const projects: Project[] = items.map((item: Item) => ({
        name: item.name,
        image: item.image || { url: '/placeholder-image.jpg' },
        role: title,
        year: item.year || new Date().getFullYear().toString(),
        type: type === 'actors' ? 'partner' : type === 'series' ? 'portfolio' : 'production',
        description: item.description || `${item.name} is part of Tag Media's ${title.toLowerCase()} network, contributing to digital marketing excellence in Egypt.`
    }));

    return (
        <div className={styles.listPage}>
            <header style={{ display: "none" }}>
                <h1 className={styles.mainTitle}>{title} at Tag Media</h1>
                <p className={styles.description}>{description}</p>
            </header>
            <UpperDivider main={title} />
            <main>
                <AnimatedGrid
                    projects={projects}
                    title={title}
                    typeUrlMap={{ partner: 'actor', portfolio: 'series', production: 'production-companies' }}
                />
            </main>
            <footer style={{ display: "none" }}>
                <p>Tag Media - Egypt&apos;s pioneer in digital and influencer marketing. Transforming brands to power growth.</p>
            </footer>
            <JsonLd<any>
                item={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": `${title} | Tag Media`,
                    "description": description,
                    "url": `https://www.tagmediaagency.com/work/${type}`,
                    "inLanguage": "en",
                    "isPartOf": {
                        "@type": "WebSite",
                        "name": "Tag Media",
                        "url": "https://www.tagmediaagency.com"
                    },
                    "about": {
                        "@type": "Organization",
                        "name": "Tag Media",
                        "description": "Egypt's pioneer in digital and influencer marketing",
                        "url": "https://www.tagmediaagency.com"
                    },
                    "itemListElement": projects.map((project, index) => ({
                        "@type": type === 'actors' ? "Person" : "CreativeWork",
                        "position": index + 1,
                        "name": project.name,
                        "image": project.image.url,
                        "description": project.description
                    }))
                }}
            />
        </div>
    );
}