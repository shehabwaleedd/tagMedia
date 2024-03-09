import React from 'react'
import styles from "./page.module.scss"
import ContactUpper from "./components/contactUpper"
import ContactForm from './components/contactForm'
const page = () => {
    return (
        <main className={styles.contact}>
            <ContactUpper />
            <ContactForm />
        </main>
    )
}

export default page