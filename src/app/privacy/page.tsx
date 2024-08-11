import React from 'react'
import styles from "./page.module.scss"
import Data from './Data'
import { Metadata } from 'next'


export async function generateMetadata() {
    return {
        title: "Privacy Policy | Tag Media",
        description: "Tag Media Privacy Policy",
        keywords: ["Tag Media", "Privacy Policy"],
        openGraph: {
            title: "Privacy Policy | Tag Media",
            description: "Tag Media Privacy Policy",
            url: "https://www.tagmedia.eg/privacy",
            siteName: "Tag Media",
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: "Privacy Policy | Tag Media",
            description: "Tag Media Privacy Policy",
        },
        robots: {
            index: true,
            follow: true,
        },
        alternates: {
            canonical: "https://www.tagmedia.eg/privacy",
        },
    }
}
const Privacy = () => {
    return (
        <section className={styles.privacy}>
            <div className={styles.privacy__title}>
                <h1>
                    Privacy Policy
                </h1>
            </div>
            <div className={styles.privacy__container}>
                {Data.map((item, index) => {
                    return (
                        <div className={styles.privacy__container__item} key={index}>
                            <h2> {item.title} </h2>
                            <p> {item.text} </p>
                        </div>
                    )
                })
                }
            </div>
        </section>
    )
}

export default Privacy