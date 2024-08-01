import React from 'react'
import RoundedButton from '@/animation/RoundedButton'
import styles from "./style.module.scss"

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
        name: "Branding"
    },
    {
        name: "Media Production"
    },
    {
        name: "Community Management"
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
                    <RoundedButton key={index}>
                        <p>{item.name}</p>
                    </RoundedButton>
                ))}
            </div>
        </section>
    )
}

export default MiniServices