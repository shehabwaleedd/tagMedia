import React from 'react'
import styles from "./page.module.scss"
import ContactUpper from "./components/contactUpper"
import ContactForm from './components/contactForm'
import ServicesCo from '@/components/servicesCo'
import Icons from '@/components/icons';
import { Metadata } from 'next'
import { serverDynamicFetch } from '@/lib/serverDynamicFetch';


export const metadata: Metadata = {
    title: 'Contact Tag Media | Egypt\'s Digital & Influencer Marketing Pioneer',
    description: 'Get in touch with Tag Media, Egypt\'s leader in digital and influencer marketing. Transform your brand and power growth with our expertise.',
    keywords: ['Tag Media', 'digital marketing', 'influencer marketing', 'Egypt', 'brand growth', 'contact'],
    openGraph: {
        title: 'Contact Tag Media | Egypt\'s Digital & Influencer Marketing Pioneer',
        description: 'Transform your brand and power growth with Tag Media, Egypt\'s leader in digital and influencer marketing. Contact us today!',
        url: 'https://www.tagmedia.eg/contact',
        siteName: 'Tag Media',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Tag Media | Egypt\'s Digital Marketing Experts',
        description: 'Reach out to Tag Media, Egypt\'s pioneer in digital and influencer marketing. Let\'s power your brand\'s growth together!',
    },
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: 'https://www.tagmedia.eg/contact',
    },
}


const Contact: React.FC = async () => {
    const services = await serverDynamicFetch('service');



    return (
        <>
            <main className={styles.contact}>
                <Icons />
                <section className={styles.contact_container}>
                    <ContactUpper />
                    <ContactForm />
                </section>
                <ServicesCo data={services} />
            </main>
        </>
    )
}

export default Contact