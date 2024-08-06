import React from 'react'
import Logos from '@/components/trusted/logos'
import styles from "./style.module.scss"
import Image from 'next/image'
const Clients = () => {
    return (
        <section className={styles.clients}>
            <h3>Trusted by</h3>
            <div className={styles.content}>
                {Logos.map((logo, index) => (
                    <div key={index} className={styles.logo}>
                        <Image src={logo.img} alt={'Client'} width={500} height={500}/>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Clients