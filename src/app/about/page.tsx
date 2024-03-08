import React from 'react'
import styles from "./page.module.scss"
import AboutUpper from './components/upper'

const page = () => {
    return (
        <main className={styles.about}>
            <AboutUpper />
        </main>
    )
}

export default page