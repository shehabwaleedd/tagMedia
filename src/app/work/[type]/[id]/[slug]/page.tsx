// app/work/[type]/[id]/[slug]/page.tsx
import React from 'react';
import Image from 'next/image';
import styles from './page.module.scss';
import axios from 'axios';

interface ItemData {
    _id: string;
    name: string;
    image?: {
        url: string;
    };
    sections?: {
        title: string;
        description: string;
        image?: {
            url: string;
        };
    }[];
    // Add other fields as necessary
}

interface PageProps {
    params: {
        type: string;
        id: string;
        slug: string;
    };
}

async function fetchItemData(endpoint: string, id: string) {
    try {
        const response = await axios.get(`https://tagmedia.onrender.com/${endpoint}/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Failed to fetch item data:', error);
        return null;
    }
}

export default async function WorkItem({ params }: PageProps) {
    const { type, id } = params;
    const endpoint = type === 'actor' ? 'partner' : 'portfolio';

    const item: ItemData | null = await fetchItemData(endpoint, id);

    if (!item) {
        return <div className={styles.error}>Failed to load data</div>;
    }

    return (
        <div className={styles.itemPage}>
            <div className={styles.itemImageWrapper}>
                <Image
                    src={item?.image?.url ?? '/noimage.png'}
                    alt={item.name}
                    width={1920}
                    height={1020}
                />
            </div>
            <section className={styles.lower}>
                <h2 className={styles.itemTitle}>{item.name}</h2>
                {item?.sections?.map((section, index) => (
                    <div key={index} className={styles.section}>
                        <h3>{section.title}</h3>
                        <p>{section.description}</p>
                        {section.image?.url && (
                            <div className={styles.sectionImageWrapper}>
                                <Image
                                    src={section.image.url}
                                    alt={section.title}
                                    width={1920}
                                    height={1020}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </section>

        </div>
    );
}