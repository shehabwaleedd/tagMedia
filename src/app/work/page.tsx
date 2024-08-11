import React from 'react';
import { Metadata } from 'next';
import Head from 'next/head';
import styles from './page.module.scss';
import { serverDynamicFetch } from '@/lib/serverDynamicFetch';
import UpperDivider from '../news/components/TopDivider';
import AnimatedGrid from './components/AnimatedGrid';
import { JsonLd } from 'react-schemaorg';
import { CreativeWork } from 'schema-dts';
import axios from 'axios'


interface Project {
    name: string;
    image: {
        url: string;
    };
    slug: string;
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

interface Variables {
    servicesSeoTitle: string;
    servicesSeoDescription: string;
    servicesSeoKeywords: string;
    servicesSeoImage: string;
}

async function getVariables(): Promise<Variables> {
    try {
        const response = await axios.get<Variables>(`${process.env.NEXT_PUBLIC_BASE_URL}/variable`, {
            headers: { 'Cache-Control': 'max-age=3600' }
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
        variables = {
            servicesSeoTitle: "Work | Tag Media",
            servicesSeoDescription: "Explore the innovative projects and success stories by Tag Media, Egypt's leader in digital and influencer marketing.",
            servicesSeoKeywords: "Tag Media portfolio, digital marketing case studies, influencer marketing projects, Tag Media Egypt",
            servicesSeoImage: "https://res.cloudinary.com/dfxz1hh8s/image/upload/v1710376514/iiqbbhbi0ccgdsm8xtl6.jpg",
        };

    }

    return {
        title: variables.servicesSeoTitle,
        description: variables.servicesSeoDescription,
        themeColor: "#000000",
        openGraph: {
            title: variables.servicesSeoTitle,
            description: variables.servicesSeoDescription,
            type: "website",
            images: {
                url: variables.servicesSeoImage,
                alt: "Tag Media",
                width: 1200,
                height: 630,
            },
            siteName: "Tag Media",
        },
        twitter: {
            card: "summary_large_image",
            site: "@tagmediaeg",
            title: variables.servicesSeoTitle,
            description: variables.servicesSeoDescription,
            images: {
                url: variables.servicesSeoImage,
                alt: "Tag Media",
                width: 1200,
                height: 630,
            },
        },
        keywords: variables.servicesSeoKeywords,
        alternates: {
            canonical: "https://www.tagmediaeg.com/about",
        },
    };
}

export default async function WorkPage() {
    const { partners, work, production } = await fetchData();

    if (!partners || !work) {
        return <div className={styles.error}>Failed to load data</div>;
    }

    const formattedPartners: Project[] = partners.map((partner: any) => ({
        name: partner.name,
        image: partner.image,
        role: 'Partner',
        slug: partner.slug,
        year: partner.year || new Date().getFullYear().toString(),
        type: 'partner'
    }));

    const formattedProductionCombines: Project[] = production.map((item: any) => ({
        name: item.name,
        image: item.image,
        role: 'Production Company',
        slug: item.slug,
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
                <AnimatedGrid projects={combinedData} title="All Work" 
                typeUrlMap={{
                    partner: 'actors',
                    portfolio: 'series',
                    production: 'production-companies'
                }}
                />
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