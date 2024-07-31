'use client'
import React from 'react'
import Marquee from "react-fast-marquee";
import Image from 'next/image';
import styles from './style.module.scss'
import Logos from './logos';

const Trusted = ({ direction }: { direction?: "left" | "right" }) => {
    return (
        <section className={styles.logo_marquee}>

            <div className={styles.container}>
                <Marquee autoFill={true} speed={40} direction={direction ?? "left"}>
                    {Logos.map((item, index) => (
                        <div key={index} className={styles.logo_marquee_content}>
                            <Image src={item.img} alt="logo"
                                width={200}
                                height={200}
                            />
                        </div>
                    ))}
                </Marquee>
            </div>
        </section>
    )
}

export default Trusted