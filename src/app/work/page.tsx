import React from 'react';
import { Metadata } from 'next';
import Head from 'next/head';
import styles from './page.module.scss';
import { serverDynamicFetch } from '@/lib/serverDynamicFetch';
import UpperDivider from '../news/components/TopDivider';
import AnimatedGrid from './components/AnimatedGrid';
import { JsonLd } from 'react-schemaorg';
import { CreativeWork } from 'schema-dts';


interface PageProps {
    searchParams: { type?: string };
}

interface Project {
    name: string;
    image: {
        url: string;
    };
    role: string;
    year: string;
    type: 'partner' | 'portfolio' | 'production'; 

}

async function fetchData() {
    try {
        const partners = await serverDynamicFetch('partner');
        const work = await serverDynamicFetch('portfolio');
        const production = await serverDynamicFetch('workedWith');
        return { partners, work, production };
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return { partners: null, work: null, production: null };
    }
}

export const metadata: Metadata = {
    title: 'Our Work and Partners | TAG Media Agency',
    description: 'Explore our portfolio of creative projects and meet our talented partners. Discover how TAG Media Agency delivers exceptional media solutions.',
    openGraph: {
        title: 'Our Work and Partners | TAG Media Agency',
        description: 'Explore our portfolio of creative projects and meet our talented partners. Discover how TAG Media Agency delivers exceptional media solutions.',
        images: [
            {
                url: 'https://example.com/ob-image.jpg',
                width: 1200,
                height: 630,
                alt: 'TAG Media Agency Work and Partners',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Our Work and Partners | TAG Media Agency',
        description: 'Explore our portfolio of creative projects and meet our talented partners. Discover how TAG Media Agency delivers exceptional media solutions.',
        images: ['https://example.com/twitter-image.jpg'],
    },
};

export default async function WorkPage() {
    const { partners, work, production } = await fetchData();

    if (!partners || !work) {
        return <div className={styles.error}>Failed to load data</div>;
    }

    const formattedPartners: Project[] = partners.map((partner: any) => ({
        name: partner.name,
        image: partner.image,
        role: 'Partner',
        year: partner.year || new Date().getFullYear().toString(),
        type: 'partner'
    }));

    const formattedProductionCombines: Project[] = production.map((item: any) => ({
        name: item.name,
        image: item.image,
        role: 'Production Company',
        year: item.year || new Date().getFullYear().toString(),
        type: 'production'
    }));



    const combinedData: Project[] = [...formattedPartners, ...formattedProductionCombines];

    return (
        <>
            <Head>
                <link rel="canonical" href="https://www.tagmediaagency.com/work" />
            </Head>
            <div className={styles.workPage}>
                <h1 className={styles.visually_hidden}>Our Work and Partners at TAG Media Agency</h1>
                <UpperDivider main="All Work" />
                <AnimatedGrid projects={combinedData} title="All Work" typeUrlMap={{ partner: 'actor', portfolio: 'series', production: 'production-companies' }} />
            </div>
            <JsonLd<CreativeWork>
                item={{
                    "@context": "https://schema.org",
                    "@type": "CreativeWork",
                    "name": "TAG Media Agency Portfolio",
                    "description": "Explore our portfolio of creative projects and meet our talented partners.",
                    "creator": {
                        "@type": "Organization",
                        "name": "TAG Media Agency"
                    }
                }}
            />
        </>
    );
}