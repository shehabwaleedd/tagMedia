import React from 'react'
import styles from "./page.module.scss"
import ContactUpper from "./components/contactUpper"
import ContactForm from './components/contactForm'
import ServicesCo from '@/components/servicesCo'

const page = () => {
    return (
        <>
            <main className={styles.contact}>
                <section className={styles.contact_container}>
                    <ContactUpper />
                    <ContactForm />
                </section>
                <ServicesCo />
            </main>
        </>
    )
}

export default page