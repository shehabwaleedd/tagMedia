import React from 'react';
import axios from 'axios';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';
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
}

interface Project {
    name: string;
    image: {
        url: string;
    };
    role: string;
    year: string;
    type: 'partner' | 'portfolio';

}


interface PageProps {
    params: {
        type: string;
    };
}

async function fetchItems(type: string) {
    const endpoint = type === 'actors' ? 'partner' : 'portfolio';
    try {
        const response = await axios.get(`https://tagmedia.onrender.com/${endpoint}`);
        return response.data.data;
    } catch (error) {
        console.error(`Failed to fetch ${type}:`, error);
        return [];
    }
}

export async function generateMetadata(
    { params }: PageProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const type = params.type;
    const title = type.charAt(0).toUpperCase() + type.slice(1);

    return {
        title: `${title} | Your Company Name`,
        description: `Explore our talented ${type} and their work.`,
        openGraph: {
            title: `${title} | Your Company Name`,
            description: `Discover our amazing ${type} and their projects.`,
            type: 'website',
            url: `https://yourwebsite.com/work/${type}`,
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | Your Company Name`,
            description: `Check out our incredible ${type} and their achievements.`,
        },
    };
}

export default async function WorkListPage({ params }: PageProps) {
    const { type } = params;
    const items: Item[] = await fetchItems(type);

    if (type !== 'actors' && type !== 'series') {
        notFound();
    }

    if (!items) {
        return <div className={styles.error}>Failed to load data</div>;
    }

    const title = type.charAt(0).toUpperCase() + type.slice(1);
    const projects: Project[] = items.map((item: Item) => ({
        name: item.name,
        image: item.image || { url: '/placeholder-image.jpg' },
        role: title,
        year: item.year || new Date().getFullYear().toString(),
        type: type === 'actors' ? 'partner' : 'portfolio'
    }));

    return (
        <div className={styles.listPage}>
            <UpperDivider main={title} />
            <AnimatedGrid 
                projects={projects} 
                title={title} 
                typeUrlMap={{ partner: 'actor', portfolio: 'series' }}
            />
        </div>
    );
}