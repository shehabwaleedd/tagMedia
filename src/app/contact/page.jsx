import React from 'react'
import styles from "./page.module.scss"
import ContactUpper from "./components/contactUpper"
import ContactForm from './components/contactForm'
import ServicesCo from '@/components/servicesCo'
import Icons from '@/components/icons';

const page = () => {
    return (
        <>
            <main className={styles.contact}>
                <Icons />
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