'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './style.module.scss'
import Header from "@/components/Header"

const index = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar__container}>
                <div className={styles.navbar__container_left}>
                    <Link href="/">
                        <h2>Tag Media</h2>
                    </Link>
                </div>
                <div className={styles.navbar__container_right}>
                    <Header />
                </div>
            </div>
        </nav>
    )
}

export default index