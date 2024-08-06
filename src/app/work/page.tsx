import React from 'react';
import styles from './page.module.scss';
import { serverDynamicFetch } from '@/lib/serverDynamicFetch';
import UpperDivider from '../news/components/TopDivider';
import AnimatedGrid from './components/AnimatedGrid';

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
}

async function fetchData() {
    try {
        const partners = await serverDynamicFetch('partner');
        const work = await serverDynamicFetch('portfolio');
        return { partners, work };
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return { partners: null, work: null };
    }
}

export default async function WorkPage({ searchParams }: PageProps) {
    const { partners, work } = await fetchData();

    if (!partners || !work) {
        return <div className={styles.error}>Failed to load data</div>;
    }

    const formattedPartners: Project[] = partners.map((partner: any) => ({
        name: partner.name,
        image: partner.image,
        role: 'Partner',
        year: partner.year || new Date().getFullYear().toString()
    }));

    const formattedWork: Project[] = work.map((item: any) => ({
        name: item.name,
        image: item.image,
        role: 'Portfolio',
        year: item.year || new Date().getFullYear().toString()
    }));

    const combinedData: Project[] = [...formattedPartners, ...formattedWork];

    return (
        <div className={styles.workPage}>
            <UpperDivider main="All Work" />
            <AnimatedGrid projects={combinedData} />
        </div>
    );
}