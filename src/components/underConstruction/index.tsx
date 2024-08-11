import React from 'react'
import styles from "./style.module.scss"
import Link from 'next/link'
import common from "@/app/page.module.scss"
const Soon = () => {
    return (
        <main className={styles.soon}>
            <section className={styles.soon_container}>
                <h1>Under Construction</h1>
                <p>This page is currently under construction</p>
                <Link href="/" className={common.button}>
                    Go back to home
                </Link>
            </section>
        </main>
    )
}

export default Soon