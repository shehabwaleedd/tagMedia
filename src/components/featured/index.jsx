import React from 'react'
import styles from "./style.module.scss"
import Image from 'next/image'
import Magnetic from '@/animation/Magnetic'

const index = () => {

    const data = [
        {
            name: "Azmet Montasaf El3omr",
            image: "/assets/featured/Azma.webp",
            role: "Social Media Management",
            year: "2021"
        },
        {
            name: "Al Da7ek Al Baki",
            image: "/assets/featured/Baki.webp",
            role: "Social Media Management",
            year: "2023"
        },
        {
            name: "Al Aghar",
            image: "/assets/featured/Aghar.webp",
            role: "Social Media Management",
            year: "2023"
        },
        {
            name: "Btlou3 Al Rou7",
            image: "/assets/featured/Rouh.webp",
            role: "Social Media Management",
            year: "2022"
        }
    ]
    const miniServices = [
        {
            name: "Social Media Management",
        },
        {
            name: "Influencer Marketing"
        },
        {
            name: "Analytics and Reporting"
        },
        {
            name: "Web Development"
        },
        {
            name: "Pay-Per-Click Advertising"
        },
        {
            name: "Content Marketing"
        },
        {
            name: "Search Engine Optimization"
        },
    ]

    return (
        <section className={styles.featured}>
            <div className={styles.featured__container}>
                {data.map((item, index) => (
                    <div key={index} className={styles.featured__item}>
                        <Image src={item.image} alt={item.name}
                            width={500}
                            height={500}
                            placeholder='blur'
                            blurDataURL={item.image}
                        />
                        <div className={styles.featured__item__content}>
                            <h3>{item.name}</h3>
                            <p>{item.role}</p>
                            <p>{item.year}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={styles.featured__miniServices}>
                <div className={styles.featured__miniServices__container}>
                    {miniServices.map((item, index) => (
                        <Magnetic key={index}>
                            <div className={styles.featured__miniServices__item}>
                                <p>{item.name}</p>
                            </div>
                        </Magnetic>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default index