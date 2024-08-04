import React from 'react'
import styles from "./page.module.scss"
import AboutUpper from './components/upper'
import AboutLower from './components/lower'
import ImageSlider from "@/components/SlidingImages";
import ServicesCo from "@/components/servicesCo"
import { serverDynamicFetch } from '@/lib/serverDynamicFetch'

export default async function About() {
    const partners = await serverDynamicFetch('partner');


    return (
        <main className={styles.about}>
            <AboutUpper />
            <AboutLower />
            <ImageSlider actors={partners} />
            <ServicesCo />
        </main>
    )
}

