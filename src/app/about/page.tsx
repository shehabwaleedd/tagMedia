import React from 'react'
import styles from "./page.module.scss"
import AboutUpper from './components/upper'
import AboutLower from './components/lower'
import { serverDynamicFetch } from '@/lib/serverDynamicFetch'
import Team from './components/team'
import Clients from './components/clients'
import Video from '@/components/video'
import WorkWithUs from '@/components/workWithUs'
import axios from 'axios'
import { Metadata } from 'next';


interface Variables {
    aboutSeoTitle: string;
    aboutSeoDescription: string;
    aboutSeoKeywords: string;
    aboutSeoImage: string;
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
        variables = {
            aboutSeoTitle: "About Us - Tag Media",
            aboutSeoDescription: "Discover the story behind Tag Media, Egypt's leading digital and influencer marketing agency. Learn about our mission, values, and the team that drives our success.",
            aboutSeoKeywords: "Tag Media about us, digital marketing agency Egypt, influencer marketing team, Tag Media mission",
            aboutSeoImage: "https://res.cloudinary.com/dfxz1hh8s/image/upload/v1710376514/iiqbbhbi0ccgdsm8xtl6.jpg",
        };

    }

    return {
        title: variables.aboutSeoTitle,
        description: variables.aboutSeoDescription,
        themeColor: "#000000",
        openGraph: {
            title: variables.aboutSeoTitle,
            description: variables.aboutSeoDescription,
            type: "website",
            images: {
                url: variables.aboutSeoImage,
                alt: "Tag Media",
                width: 1200,
                height: 630,
            },
            siteName: "Tag Media",
        },
        twitter: {
            card: "summary_large_image",
            site: "@tagmediaeg",
            title: variables.aboutSeoTitle,
            description: variables.aboutSeoDescription,
            images: {
                url: variables.aboutSeoImage,
                alt: "Tag Media",
                width: 1200,
                height: 630,
            },
        },
        keywords: variables.aboutSeoKeywords,
        alternates: {
            canonical: "https://www.tagmediaeg.com/about",
        },
    };
}


export default async function About() {
    const team = await serverDynamicFetch('team');
    const logos = await serverDynamicFetch('logo');

    return (
        <main className={styles.about}>
            <AboutUpper />
            <AboutLower />
            <Video />
            <Clients data={logos} />
            <Team team={team} />
            <WorkWithUs />
        </main>
    )
}

