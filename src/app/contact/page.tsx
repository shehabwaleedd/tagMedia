import React from 'react'
import styles from "./page.module.scss"
import ContactUpper from "./components/contactUpper"
import ContactForm from './components/contactForm'
import ServicesCo from '@/components/servicesCo'
import { serverDynamicFetch } from '@/lib/serverDynamicFetch';
import axios from 'axios'
import { Metadata } from 'next';

interface Variables {
    contactPageSeoTitle: string;
    contactPageSeoDescription: string;
    contactPageSeoKeywords: string;
    contactPageSeoImage: string;
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
            contactPageSeoTitle: "Contact Us - Tag Media",
            contactPageSeoDescription: "Get in touch with Tag Media, Egypt's leading digital and influencer marketing agency. We're here to answer your questions and help your brand grow.",
            contactPageSeoKeywords: "contact Tag Media, digital marketing inquiries, influencer marketing contact, Tag Media Egypt",
            contactPageSeoImage: "https://res.cloudinary.com/dfxz1hh8s/image/upload/v1710376514/iiqbbhbi0ccgdsm8xtl6.jpg",
        };
    }

    return {
        title: variables.contactPageSeoTitle,
        description: variables.contactPageSeoDescription,
        themeColor: "#000000",
        openGraph: {
            title: variables.contactPageSeoTitle,
            description: variables.contactPageSeoDescription,
            type: "website",
            images: {
                url: variables.contactPageSeoImage,
                alt: "Tag Media",
                width: 1200,
                height: 630,
            },
            siteName: "Tag Media",
        },
        twitter: {
            card: "summary_large_image",
            site: "@tagmediaeg",
            title: variables.contactPageSeoTitle,
            description: variables.contactPageSeoDescription,
            images: {
                url: variables.contactPageSeoImage,
                alt: "Tag Media",
                width: 1200,
                height: 630,
            },
        },
        keywords: variables.contactPageSeoKeywords,
        alternates: {
            canonical: "https://www.tagmediaeg.com/about",
        },
    };
}




const Contact: React.FC = async () => {
    const services = await serverDynamicFetch('service');



    return (
        <>
            <main className={styles.contact}>
                <ContactUpper />
                <ContactForm />
            </main>
            <ServicesCo data={services} />
        </>
    )
}

export default Contact