import React from 'react'
import styles from "./page.module.scss"
import AboutUpper from './components/upper'
import AboutLower from './components/lower'
import ImagesSlider from '@/components/SlidingImages'
import ServicesCo from "@/components/servicesCo"
const page = () => {
    return (
        <main className={styles.about}>
            <AboutUpper />
            <AboutLower />
            <ImagesSlider />
            <ServicesCo />
        </main>
    )
}

export default page