'use client'
import React, { useState, useEffect } from 'react'
import Marquee from "react-fast-marquee";
import Image from 'next/image';
import styles from './style.module.scss'
import Logos from './logos';

const Trusted = ({ direction }: { direction?: "left" | "right" }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className={styles.logo_marquee}>
            <div className={styles.container}>
                {mounted && (
                    <Marquee autoFill={true} speed={40} direction={direction ?? "left"}>
                        {Logos.map((item, index) => (
                            <div key={index} className={styles.logo_marquee_content}>
                                <Image 
                                    src={item.img} 
                                    alt="logo"
                                    width={96}
                                    height={96}
                                    priority={true}
                                    sizes="(max-width: 555px) 80px, 96px"
                                />
                            </div>
                        ))}
                    </Marquee>
                )}
            </div>
        </section>
    )
}

export default Trusted