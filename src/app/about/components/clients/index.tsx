import React from 'react'
import styles from "./style.module.scss"
import Image from 'next/image'
import { LogoData } from '@/types/common';
import Link from 'next/link';
const Clients = ({ data }: { data: LogoData[] }) => {
    return (
        <section className={styles.clients}>
            <h3>Trusted by</h3>
            <div className={styles.content}>
                {data.map((item, index) => (
                    <Link key={index} className={styles.logo_marquee_content} href={item.link} aria-label={item.name} target="_blank">
                        <Image
                            src={item.image.url}
                            alt={item.name}
                            width={96}
                            height={96}
                            priority={true}
                            sizes="(max-width: 555px) 80px, 96px"
                            title={item.name}
                        />
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default Clients