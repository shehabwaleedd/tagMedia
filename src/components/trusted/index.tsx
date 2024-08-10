'use client'
import React, { useState, useEffect } from 'react'
import Marquee from "react-fast-marquee";
import Image from 'next/image';
import styles from './style.module.scss'
import Link from 'next/link';
import { LogoData } from '@/types/common';

const Trusted = ({ direction, data }: { direction?: "left" | "right", data: LogoData[] }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className={styles.logo_marquee}>
            <div className={styles.container}>
                {mounted && (
                    <Marquee autoFill={true} speed={40} direction={direction ?? "left"}>
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
                    </Marquee>
                )}
            </div>
        </section>
    )
}

export default Trusted