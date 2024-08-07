import React from 'react'
import styles from "./style.module.scss"
import global from "@/app/page.module.scss"

type MiniService = {
    name: string;
}


const miniServices: MiniService[] = [
    {
        name: "Content Creation",
    },
    {
        name: "Marketing Strategy"
    },
    {
        name: "Media Production"
    },
    {
        name: "Influencer Management"
    },
    {
        name: "Media Buying"
    },
]


const MiniServices = () => {
    return (
        <section className={styles.miniServices}>
            <div className={styles.miniServices__container}>
                {miniServices.map((item, index) => (
                    <p key={index} className={global.button}>{item.name}</p>
                ))}
            </div>
        </section>
    )
}

export default MiniServices