'use client'
import { useEffect } from "react";
import styles from "./page.module.scss";
import { animatePageIn } from "@/animation/transition";




export default function Template({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        animatePageIn()
    }, [])

    return (
        <div>
            <div className={styles.banner} id="banner"/>
            {children}
        </div>
    );
}
